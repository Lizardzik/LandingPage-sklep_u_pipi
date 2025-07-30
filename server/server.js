// server/server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/api/google-reviews", async (req, res) => {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}&reviews_sort=newest&reviews_no_translations=true`
    );

    const data = await response.json();

    if (data.status !== "OK") {
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

    res.json({
      averageRating: data.result.rating,
      reviews: filteredReviews,
    });
  } catch (error) {
    res.status(500).json({ error: "Błąd serwera", details: error.message });
  }
});
console.log("API KEY:", process.env.GOOGLE_API_KEY);

app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
