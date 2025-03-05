
// Route to create short URL
router.post('/shorten', async (req, res) => {
    const { originalUrl, shortUrl } = req.body;

    // Validate that both URLs are provided
    if (!originalUrl || !shortUrl) {
        return res.status(400).json({ error: 'Both original URL and short URL are required.' });
    }

    try {
        // Check if the short URL already exists
        const existingUrl = await Url.findOne({ shortUrl });
        if (existingUrl) {
            return res.status(400).json({ error: 'This short URL is already taken.' });
        }

        // Create a new document
        const newUrl = new Url({
            originalUrl,
            shortUrl
        });

        // Save the document to the database
        await newUrl.save();

        // Render the shorten page with the new short URL
 
        res.render('shorten', { shortUrl: newUrl.shortUrl });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while shortening the URL' });
    }
});
