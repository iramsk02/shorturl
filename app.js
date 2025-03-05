const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); 
const urlRoutes = require('./routes/urlRoutes');  // Ensure this is correctly defined
const cors = require('cors');

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";  // Change this for production




const app = express();


dotenv.config();


const PORT = process.env.PORT || 3001;


mongoose.connect('mongodb://localhost:27017/urlshortener')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));


app.set('view engine', 'ejs');

app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', urlRoutes);  // The URL routes defined in urlRoutes.js
app.use('/', require('./routes'));  // Ensure this is defined correctly in routes/index.js


app.listen(PORT, () => console.log(`Server running on ${PORT}`));
