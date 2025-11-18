export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!placeId || !apiKey) {
    return res.status(500).json({
      error: "Brak konfiguracji",
      details: "GOOGLE_PLACE_ID lub GOOGLE_API_KEY nie są ustawione",
    });
  }

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

    res.setHeader("Cache-Control", "public, max-age=86400, must-revalidate");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json({
      averageRating: data.result.rating,
      reviews: filteredReviews,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Błąd serwera", details: error.message });
  }
}
