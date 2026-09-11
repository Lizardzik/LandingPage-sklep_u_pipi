export default async function handler(req, res) {
  try {
    const url = process.env.GALLERY_CSV_URL;

    if (!url) {
      return res
        .status(500)
        .json({ error: "Brak zmiennej GALLERY_CSV_URL w .env" });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Google odpowiedziało błędem: ${response.status}`);
    }

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    console.error("Błąd api gallery:", error);
    res
      .status(500)
      .json({
        error: "Nie udało się pobrać danych galerii",
        details: error.message,
      });
  }
}
