// api/index.js
import express from 'express';
import fetch from 'node-fetch';
import https from 'https';

const app = express();
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

// Serve static files from the "public" directory (including index.html)
app.use(express.static('public'));

// Route to fetch events from external API
app.get('/api/get-events', async (req, res) => {
    const eventURL = 'https://ehfg.org/programme.json?year=2024';

    try {
        const response = await fetch(eventURL, { agent: httpsAgent });
        const data = await response.json();
        res.json(data); // Send the fetched data as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});

// Export the app as a Vercel-compatible function
export default app;
