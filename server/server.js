import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// nowe zapytanie co 24 godziny
const calculateDailyExpiry = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.getTime();
};

const cache = {
  reviews: { data: null, expiry: 0 },
  hours: { data: null, expiry: 0 },
};

app.use(cors());

app.get("/api/google-reviews", async (req, res) => {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  const now = Date.now();

  if (cache.reviews.data && cache.reviews.expiry > now) {
    return res.json(cache.reviews.data);
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}&reviews_sort=newest&reviews_no_translations=true`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      console.error("BŁĄD GOOGLE API (Reviews):", data);
      return res.status(500).json({ error: "Błąd Google API", details: data });
    }

    const filteredReviews = data.result.reviews
      .filter((r) => r.rating >= 3)
      .slice(0, 3)
      .map((r) => ({
        name: r.author_name,
        rating: r.rating,
        comment: r.text,
        date: new Date(r.time * 1000).toLocaleDateString("pl-PL"),
        avatar: r.author_name
          .split(" ")
          .map((word) => word[0])
          .join(""),
      }));

    const result = {
      averageRating: data.result.rating,
      reviews: filteredReviews,
    };

    cache.reviews.data = result;
    cache.reviews.expiry = calculateDailyExpiry();

    res.json(result);
  } catch (error) {
    console.error("BŁĄD SERWERA (Reviews):", error);
    res.status(500).json({ error: "Błąd serwera", details: error.message });
  }
});

app.get("/api/google-hours", async (req, res) => {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  const now = Date.now();

  if (cache.hours.data && cache.hours.expiry > now) {
    return res.json(cache.hours.data);
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&language=pl&region=pl&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      console.error("BŁĄD GOOGLE API (Hours):", data);
      return res.status(500).json({ error: "Błąd Google API", details: data });
    }

    const hours = data.result.opening_hours?.weekday_text || [];
    const openNow = data.result.opening_hours?.open_now ?? null;

    const result = {
      openNow,
      hours,
    };

    cache.hours.data = result;
    cache.hours.expiry = calculateDailyExpiry();

    res.json(result);
  } catch (error) {
    console.error("BŁĄD SERWERA (Hours):", error);
    res.status(500).json({ error: "Błąd serwera", details: error.message });
  }
});

app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
