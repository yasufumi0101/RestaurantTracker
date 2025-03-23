require('dotenv').config(); // これで .env ファイルが読み込まれる
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const cors = require('cors')
app.use(cors());
app.use(express.static('.'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});

app.get('/signup', (_, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/login', (_, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/map', (_, res) => {
  res.render(`mypage`, { googleMapsApiKey });
});

const startServer = async () => {
  app.listen(port, async () => {
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