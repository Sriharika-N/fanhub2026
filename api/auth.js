import Ably from 'ably';

export default async function handler(req, res) {
    // 1. Force explicit global browser safety headers (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 2. Handle browser security pre-flight checks instantly
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const apiKey = process.env.ABLY_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ error: "Ably API key missing on Vercel dashboard." });
    }

    try {
        const client = new Ably.Rest({ key: apiKey });
        const tokenParams = { 
            clientId: `fan-${Math.random().toString(36).substring(2, 9)}` 
        };
        const tokenData = await client.auth.createTokenRequest(tokenParams);
        return res.status(200).json(tokenData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
