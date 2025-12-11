export default async function handler(req, res) {
  // CORS pentru site-ul tău PrestaShop
  res.setHeader("Access-Control-Allow-Origin", "https://clone.medaz.ro");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const payload = req.body;

    const anafRes = await fetch(
      "https://webservicesp.anaf.ro/PlatitorTvaRest/api/v1/platitor_tva",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0" // obligatoriu, ANAF refuză altfel
        },
        body: JSON.stringify(payload)
      }
    );

    const text = await anafRes.text();

    res.setHeader("Content-Type", "application/json");
    return res.status(anafRes.status).send(text);

  } catch (e) {
    return res.status(500).json({
      error: "Proxy error",
      details: e.message
    });
  }
}

