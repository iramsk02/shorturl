const express = require('express');
const Url = require('../models/Url');
const router = express.Router();

// Function to generate a short URL
function generateShortUrl() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortUrl = '';
  for (let i = 0; i < 6; i++) {
    shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shortUrl;
}

// Route to shorten URL
router.post('/shorten', async (req, res) => {
  const { originalUrl, shortUrl } = req.body;
  console.log('Received data:', { originalUrl, shortUrl });

  let newShortUrl = shortUrl;

  try {
      // Check if originalUrl already exists
      const existingUrl = await Url.findOne({ originalUrl });

      if (existingUrl) {
          return res.json({ originalUrl: existingUrl.originalUrl, shortUrl: existingUrl.shortUrl });
      }

      // Check if the preferred short URL is already taken
      if (newShortUrl) {
          const existingShort = await Url.findOne({ shortUrl: newShortUrl });
          if (existingShort) {
              return res.status(400).json({ error: 'Preferred short URL is already taken. Please choose another one.' });
          }
      } else {
          newShortUrl = generateShortUrl();
      }

      // Save the new URL
      const url = new Url({ originalUrl, shortUrl: newShortUrl });
      await url.save();

      return res.json(url);

  } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: 'Error saving to the database.' });
  }
});

// Route to handle redirection using short URL
router.get('/:shortUrl', async (req, res) => {

  const { shortUrl } = req.params;
  console.log("Requested Short URL:", shortUrl);

  try {
      const url = await Url.findOne({ shortUrl });

      if (!url) {
          return res.status(404).send('Short URL not found');
      }

      res.redirect(301, url.originalUrl);


  } catch (error) {
      return res.status(500).send('Error finding the URL.');
  }
});

module.exports = router;
