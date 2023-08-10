const express = require('express');
const Book = require('../models/Books');
const upload = require('../middleware/upload');

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

// add new books
router.post('/add', upload.single('img'), async (req, res) => {
    // set up file path
    const fileName = req.file.filename;
    const basePath = `  `

    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        callNo: req.body.callNo,
        description: req.body.description,
        img: req.body.img,
        isNewAddition: req.body.isNewAddition,
        loanable: req.body.loanable
    });

    book = await book.save()
        .then(book => res.status(201).json(book))
        .catch(err => console.log(err));
});

// exports
module.exports = router;