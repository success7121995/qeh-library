const express = require('express');
const Book = require('../models/Books');

// init router
const router = express.Router();

// home page
router.get('/', async (req, res) => {
    await Book.find({ isNewAddition: true })
        .sort({ 'title': -1 })
        .then(books => {
            res.render('index', {
                title: 'Library',
                books
            });
        })
        .catch(err => console.log(err));
});

// about
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us'
    });
});

// service
router.get('/service', (req, res) => {
    res.render('service', {
        title: 'Service'
    });
});

// exports
module.exports = router;