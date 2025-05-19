export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { businessName, website, dataTypes } = req.body;

  if (!businessName || !website || !dataTypes) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const prompt = `Generate a GDPR- and CCPA-compliant Privacy Policy for a business named ${businessName} with the website ${website}. The business collects the following types of user data: ${dataTypes}. Return the policy in plain text.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // DEBUG: Show the full OpenAI response
    console.log('OpenAI response:', JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return res.status(500).json({ error: 'Invalid response from OpenAI', data });
    }

    const content = data.choices[0].message.content;
    res.status(200).json({ policy: content });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Failed to generate policy' });
  }
}
