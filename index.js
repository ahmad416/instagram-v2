import express from 'express';
const app = express();
const port = 3000;

app.get('/redirect', (req, res) => {
    const googleUrl = req.query.url;

    if (!googleUrl || !googleUrl.includes('google.com')) {
        return res.status(400).send('Invalid or missing Google URL');
    }

    // Microsoft URL to redirect to
    const microsoftUrl = 'https://www.microsoft.com';

    // Construct the custom URL scheme for Android
    const androidRedirect = `intent://${microsoftUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;

    // Construct the custom URL scheme for iOS
    const iosRedirect = `googlechromes://${microsoftUrl.replace(/^https?:\/\//, '')}`;

    // Detect the user agent to determine the platform
    const userAgent = req.headers['user-agent'].toLowerCase();

    if (userAgent.includes('android')) {
        res.redirect(androidRedirect);
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        res.redirect(iosRedirect);
    } else {
        // For desktop or unknown devices, redirect directly
        res.redirect(microsoftUrl);
    }
});

app.listen(10000, () => {
    console.log(`Server listening at http://localhost:${10000}`);
});