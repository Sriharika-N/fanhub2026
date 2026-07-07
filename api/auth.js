import Ably from 'ably';

export default async function handler(req, res) {
    const apiKey = process.env.ABLY_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ error: "Ably API key missing on server." });
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
