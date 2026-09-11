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
  occasions: { data: null, expiry: 0 },
  gallery: { data: null, expiry: 0 },
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
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}&reviews_sort=newest&reviews_no_translations=true`,
    );

    const data = await response.json();

    if (data.status !== "OK") {
      console.error("BŁĄD GOOGLE API (Reviews):", data);
      return res.status(500).json({ error: "Błąd Google API", details: data });
    }

    const filteredReviews = (data.result.reviews || [])
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
      totalReviews: data.result.user_ratings_total || 0,
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
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&language=pl&region=pl&key=${apiKey}`,
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

app.get("/api/occasions", async (req, res) => {
  const now = Date.now();

  if (cache.occasions.data && cache.occasions.expiry > now) {
    return res.status(200).send(cache.occasions.data);
  }

  try {
    const url = process.env.CSV_URL;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      if (cache.occasions.data) {
        return res.status(200).send(cache.occasions.data);
      }
      throw new Error(`Google odpowiedziało błędem: ${response.status}`);
    }

    const text = await response.text();

    // Cache na 10 minut
    cache.occasions.data = text;
    cache.occasions.expiry = now + 10 * 60 * 1000;

    res.status(200).send(text);
  } catch (error) {
    console.error("BŁĄD SERWERA (Occasions):", error.message);

    if (cache.occasions.data) {
      return res.status(200).send(cache.occasions.data);
    }

    res.status(500).json({
      error: "Błąd serwera przy pobieraniu arkusza",
      details: error.message,
    });
  }
});

app.get("/api/gallery", async (req, res) => {
  const now = Date.now();

  if (cache.gallery.data && cache.gallery.expiry > now) {
    return res.status(200).send(cache.gallery.data);
  }

  try {
    const url = process.env.GALLERY_CSV_URL;
    if (!url) {
      return res
        .status(500)
        .json({ error: "Brak GALLERY_CSV_URL w pliku server/.env" });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      if (cache.gallery.data) return res.status(200).send(cache.gallery.data);
      throw new Error(`Google odpowiedziało błędem: ${response.status}`);
    }

    const text = await response.text();
    cache.gallery.data = text;
    cache.gallery.expiry = now + 10 * 60 * 1000;

    res.status(200).send(text);
  } catch (error) {
    console.error("BŁĄD SERWERA (Gallery):", error.message);
    if (cache.gallery.data) return res.status(200).send(cache.gallery.data);
    res.status(500).json({ error: "Błąd serwera przy pobieraniu galerii" });
  }
});

app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
