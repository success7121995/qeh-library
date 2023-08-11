const express = require('express');
const Book = require('../models/Books');
const upload = require('../middleware/upload');
const { render } = require('ejs');

// init router
const router = express.Router();

// view new addition
router.get('/new-additions', async (req, res) => {
    await Book.find({ isNewAddition: true })
        .then(books => {

            res.render('new-additions', {
                title: 'New Additions',
                books
            });
        })
        .catch(err => console.log(err));
});

// upload page
router.get('/upload', (req, res) => {
    res.render('upload', {
        title: 'Upload a new books'
    });
});

// add new books
router.post('/upload', upload.single('img'), async (req, res) => {
    // set up file path
    const fileName = `../img/book-covers/${req.file.filename}`;

    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        callNo: req.body.callNo,
        description: req.body.description,
        img: fileName,
        isNewAddition: req.body.isNewAddition,
        loanable: req.body.loanable
    });

    book = await book.save()
        .then(book => res.status(201).json({ book }))
        .catch(err => console.log(err));
});

// exports
module.exports = router;