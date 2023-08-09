const express = require('express');
const Book = require('../models/Books');

// init router
const router = express.Router();

// view new addition
router.get('/new-additions', async (req, res) => {
    await Book.find()
        .then(books => {
            res.render('new-additions', {
                title: 'New Additions',
                books
            });
        })
        .catch(err => console.log(err));
});

// add new books
router.post('/add', async (req, res) => {
    const book = new Book.create({
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