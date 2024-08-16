import express from 'express';
const app = express();

app.get('/redirect', (req, res) => {
    const sourceUrl = req.query.url;

    if (!sourceUrl) {
        return res.status(400).send('Missing source URL');
    }

    // URL to redirect to (in this case, Microsoft)
    const targetUrl = 'https://www.microsoft.com';

    // Detect the user agent to determine the platform
    const userAgent = req.headers['user-agent'].toLowerCase();

    if (userAgent.includes('android')) {
        // Android-specific redirect
        const androidIntent = `intent://${targetUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        res.redirect(androidIntent);
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        // iOS-specific redirect (less likely to work, but we can try)
        res.redirect(`x-web-search://${targetUrl}`);
    } else {
        // For desktop or unknown devices, redirect directly
        res.redirect(targetUrl);
    }
});
app.listen(10000, () => {
    console.log(`Server listening at http://localhost:${10000}`);
});