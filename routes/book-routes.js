const express = require('express');
const Book = require('../models/Books');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/upload');
const handleError = require('../middleware/error');

// init router
const router = express.Router();

// view all books
router.get('/', async (req, res) => {
    await Book.find()
        .sort({ 'title': 1 })
        .then(books => {
            res.render('books', {
                title: 'Library Catalogue',
                books
            });
        });
});

// view new addition
router.get('/new-additions', async (req, res) => {
    await Book.find({ isNewAddition: true })
        .sort({ 'title': 1 })
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

// edit page
router.get('/:id', async (req, res) => {
    await Book.findById(req.params.id)
        .then(book => {
            res.render('edit', {
                title: 'Edit',
                book
            });
        })
        .catch(err => console.log(err));
});

// add new books
router.post('/upload', upload.single('img'), async (req, res) => {
    // check if img
    let fileName = (req.file) ? 
        `/img/book-covers/${req.file.filename}`:
        '/img/others/no-image-item.png';

    let book = await new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        callNo: req.body.callNo,
        description: req.body.description,
        img: fileName,
        isNewAddition: req.body.isNewAddition,
        loanable: req.body.loanable
    });

    book.save()
        .then(book => res.status(201).json({ book }))
        .catch(err => {
            const errors = handleError(err);
            res.json({ errors });
        });
});

// update book
router.put('/:id', upload.single('img'), async (req, res) => {
    // check if new img, return default img if no
    const fileName = await Book.findById(req.params.id)
        .then(book => {
            const isNewImg = (req.file) ? 
            `/img/book-covers/${req.file.filename}`:
            book.img;

            // delete the old img
            if (isNewImg !== book.img) {
                const imgPath = path.join(__dirname, '../public', book.img);
                fs.unlink(imgPath, err => err);
            }
            return isNewImg;
        })
        .catch(err => console.log(err));
    
    // update data
    await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        callNo: req.body.callNo,
        description: req.body.description,
        img: fileName,
        isNewAddition: req.body.isNewAddition,
        loanable: req.body.loanable
    }, { new: true })
        .then(book => res.send({ book }))
        .catch(err => console.log(err));
});

// delete book
router.delete('/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id)
        .then(book => {
            const imgPath = path.join(__dirname, '../public', book.img); // get the entire path of the img
            fs.unlink(imgPath, err => err); // delete the img
            res.json({ redirect: '/books' });
        })
        .catch(err => console.log(err));
});

// exports
module.exports = router;