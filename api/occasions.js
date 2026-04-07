export default async function handler(req, res) {
  try {
    const url = process.env.CSV_URL;

    const response = await fetch(url);
    const text = await response.text();

    res.status(200).send(text);
  } catch (error) {
    console.error("Błąd api:", error);
    res.status(500).json({ error: "Nie udało się pobrać danych" });
  }
}
