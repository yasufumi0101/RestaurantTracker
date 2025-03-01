require('dotenv').config(); // これで .env ファイルが読み込まれる
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const cors = require('cors')
app.use(cors());
app.use(express.static('.'))

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/map', (_, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <title>Wifi Radar</title>
        <link rel="stylesheet" href="/css/map.css">
        <!-- Google Maps API キーを埋め込む -->
        <script async src="https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&language=ja&libraries=geometry"></script>
        <script src="/app.js" defer></script>
    </head>
    <body>
        <div id="container">
            <div id="sidebar">
            </div>
            <div id="map"></div>
        </div>
    </body>
    </html>
    `);
});

const startServer = async () => {
  app.listen(port, async () =>{
    console.log('Server running on http://localhost:${port}');
    try {
      const open = (await import('open')).default;
      open(`http://localhost:${port}`);
    } catch (error) {
      console.error("Failed to open browser:", error);
    }
  });
};

startServer();