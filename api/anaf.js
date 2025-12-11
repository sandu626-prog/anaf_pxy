export default async function handler(req, res) {
  // CORS - permite site-ului tău să apeleze API-ul Vercel
  res.setHeader("Access-Control-Allow-Origin", "https://clone.medaz.ro");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { cui } = req.body;

    const r = await fetch(`https://api.openapi.ro/api/firm/${cui}`, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAPI_KEY}`,
        "Accept": "application/json"
      }
    });

    const data = await r.text();

    res.setHeader("Content-Type", "application/json");
    return res.status(r.status).send(data);

  } catch (e) {
    return res.status(500).json({
      error: "Proxy error",
      details: e.message
    });
  }
}
