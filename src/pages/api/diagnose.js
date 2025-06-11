export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { query } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a plant disease expert." },
          { role: "user", content: `Diagnose this issue: ${query}` }
        ]
      })
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || 'No diagnosis returned.';
    res.status(200).json({ result: message });
  } catch (error) {
    res.status(500).json({ error: 'API request failed.' });
  }
}
