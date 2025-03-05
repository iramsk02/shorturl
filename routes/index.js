const express = require('express');
// const User = require('../models/user');
const Url = require('../models/Url');
const router = express.Router();

// 🌟 Main Routes
router.get('/', (req, res) => {
    res.render('index', { title: "Home Page" });
});

router.get('/about', (req, res) => {
    res.render('about', { title: "About Us" });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: "Contact us" });
});

router.get('/shorten', (req, res) => {
    res.render('shorten', { title: "shorten url" });
});

router.get('/:shortUrl', async (req, res) => {

    const { shortUrl } = req.params;
    console.log("Requested Short URL:", shortUrl);
  
    try {
        const url = await Url.findOne({ shortUrl });
  
        if (!url) {
            return res.status(404).send('Short URL not found');
        }
  
        return res.redirect(url.originalUrl);
  
    } catch (error) {
        return res.status(500).send('Error finding the URL.');
    }
  });


module.exports = router;
