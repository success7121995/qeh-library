const express = require('express');
const Book = require('../models/Books');
const fs = require('fs');
const path = require('path');
const { upload, matchType } = require('../middleware/upload');
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
    const fileName = req.file && matchType[req.file.mimetype] ? 
        `/img/book-covers/${req.file.filename}` : '';

    // remove wrong type file from folder
    if (fileName === '') {
        const filePath = path.join(__dirname, '../public/img/book-covers', req.file.filename);
        fs.unlink(filePath, err => err);
    };

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
            // remove img from folder if the book is unsuccessfully created.
            const imgPath = path.join(__dirname, '../public', fileName);
            fs.unlink(imgPath, err => err);

            // handle errors
            const errors = handleError(err);
            res.json({ errors });
        });
});

// update book (from POE)
router.put('/:id', upload.single('img'), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        // check if new img, return default img if not
        const fileName = req.file && matchType[req.file.mimetype] ? 
            `/img/book-covers/${req.file.filename}` : book.img;
        
        // delete the old img if a new one is uploaded
        if (fileName !== book.img) {
            const imgPath = path.join(__dirname, '../public', book.img);
            fs.unlink(imgPath, err => err)
        };

        // update data
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                author: req.body.author,
                isbn: req.body.isbn,
                callNo: req.body.callNo,
                description: req.body.description,
                img: fileName,
                isNewAddition: req.body.isNewAddition,
                loanable: req.body.loanable
            }, { new: true }
        );

        await updatedBook.validate(); // Trigger schema validation
        const savedBook = await updatedBook.save();
        res.json({ book: savedBook });
    } catch (err) {
        // remove img from folder if the book is unsuccessfully updated.
        if (req.file) {
            const imgPath = path.join(__dirname, '../public', `/img/book-covers/${req.file.filename}`);
            fs.unlink(imgPath, err => err)
        }

        // handle errors
        const errors = handleError(err);
        res.status(400).json({ errors });
    };
});

router.delete('/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
        then(() => res.status(200).json({ redirect: 'books' }) )    
        .catch(err => {
            // del img from folder
            const imgPath = path.join(__dirname, '../public', book.img);
            fs.unlink(imgPath, err => err);

            console.log(err);
        });
});

// exports
module.exports = router;