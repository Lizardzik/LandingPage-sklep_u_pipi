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
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&language=pl&region=pl&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(500).json({ error: "Błąd Google API", details: data });
    }

    const hours = data.result.opening_hours?.weekday_text || [];
    const openNow = data.result.opening_hours?.open_now ?? null;

    res.setHeader("Cache-Control", "public, max-age=86400, must-revalidate");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json({
      openNow,
      hours,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Błąd serwera", details: error.message });
  }
}
