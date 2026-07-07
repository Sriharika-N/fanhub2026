// Vercel handles standard Request/Response objects natively
import Ably from 'ably';

export default async function handler(req, res) {
    // 1. Grab your secret key safely from Vercel's environment variables
    const apiKey = process.env.ABLY_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ error: "Ably API key is missing on the server side." });
    }

    try {
        const client = new Ably.Rest({ key: apiKey });
        
        // 2. Generate a temporary token request for the client browser
        const tokenParams = { 
            clientId: `fan-${Math.random().toString(36).substring(2, 9)}` 
        };
        
        const tokenData = await client.auth.createTokenRequest(tokenParams);
        
        // 3. Return the token data to the frontend
        return res.status(200).json(tokenData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
