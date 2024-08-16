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

app.get('/go/:encodedUrl', (req, res) => {
    const encodedUrl = req.params.encodedUrl;
    const decodedUrl = Buffer.from(encodedUrl, 'base64').toString('ascii');

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script>
        (function() {
          var redirectUrl = "${decodedUrl}";
          window.location.replace(redirectUrl);
        })();
      </script>
    </head>
    <body>
      <p>Redirecting to ${decodedUrl}...</p>
      <p>If you are not redirected, <a href="${decodedUrl}">click here</a>.</p>
    </body>
    </html>
  `;

    res.send(html);
});
app.listen(10000, () => {
    console.log(`Server listening at http://localhost:${10000}`);
});