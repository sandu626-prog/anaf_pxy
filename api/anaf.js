export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "https://clone.medaz.ro");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Body parsing corect
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const cui = body.cui;

    if (!cui) {
      return res.status(400).json({ error: "Missing CUI" });
    }

    // 🔥 OpenAPI folosește GET, nu POST!
    const openApiUrl = `https://api.openapi.ro/api/firm/${cui}`;

    const apiResponse = await fetch(openApiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAPI_KEY}`,
        "Accept": "application/json"
      }
    });

    const text = await apiResponse.text();

    res.setHeader("Content-Type", "application/json");
    return res.status(apiResponse.status).send(text);

  } catch (e) {
    return res.status(500).json({
      error: "Proxy error",
      details: e.message
    });
  }
}
