import express from 'express';
const app = express();

app.get('/redirect', (req, res) => {
    const sourceUrl = req.query.url;

    if (!sourceUrl) {
        return res.status(400).send('Missing source URL');
    }

    // URL to redirect to (in this case, Microsoft)
    const targetUrl = 'https://www.microsoft.com';

    // HTML with meta refresh and JavaScript redirect
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="refresh" content="0;url=${targetUrl}">
      <script>
        window.location.href = "${targetUrl}";
      </script>
    </head>
    <body>
      <p>Redirecting to ${targetUrl}...</p>
      <p>If you are not redirected, <a href="${targetUrl}">click here</a>.</p>
    </body>
    </html>
  `;

    res.send(html);
});
app.listen(10000, () => {
    console.log(`Server listening at http://localhost:${10000}`);
});