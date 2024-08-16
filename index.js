import express from 'express';
const app = express();

app.get('/redirect', (req, res) => {
    const sourceUrl = req.query.url;

    if (!sourceUrl) {
        return res.status(400).send('Missing source URL');
    }

    // URL to redirect to (in this case, Microsoft)
    const targetUrl = 'https://www.microsoft.com';

    // Detect if the user is on a mobile device
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (isMobile) {
        // Mobile-specific solution
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
          (function() {
            var targetUrl = "${targetUrl}";
            var openedWindow;
            
            function tryOpen() {
              openedWindow = window.open(targetUrl, '_system');
              if (!openedWindow || openedWindow.closed || typeof openedWindow.closed == 'undefined') {
                window.location.href = targetUrl;
              }
            }

            // Try multiple times
            tryOpen();
            setTimeout(tryOpen, 100);
            setTimeout(tryOpen, 500);
            setTimeout(tryOpen, 1000);

            // Fallback
            setTimeout(function() {
              window.location.href = targetUrl;
            }, 2000);
          })();
        </script>
      </head>
      <body>
        <p>Redirecting to ${targetUrl}...</p>
        <p>If you are not redirected, <a href="${targetUrl}">click here</a>.</p>
      </body>
      </html>
    `;
        res.send(html);
    } else {
        // Non-mobile solution
        res.redirect(targetUrl);
    }
});
app.listen(10000, () => {
    console.log(`Server listening at http://localhost:${10000}`);
});