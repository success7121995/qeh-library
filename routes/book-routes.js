const express = require('express');
const Book = require('../models/Books');
const fs = require('fs');
const path = require('path');
const { upload, matchType, removeFileFromFolder, removeImgFromFolder } = require('../middleware/upload');
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


// 
router.post('/upload', upload.single('img'), async (req, res) => {
    try {
        // check if valid img, remove from folder if invalid.
        let fileName = null;

        if (req.file) {
            if (!matchType[req.file.mimetype]) {
                removeFileFromFolder(req.file.filename);
            } else {
                fileName = `/img/book-covers/${req.file.filename}`;
            };
        };

        // 
        const book = await Book.create({
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            callNo: req.body.callNo,
            description: req.body.description,
            img: fileName,
            isNewAddition: req.body.isNewAddition,
            loanable: req.body.loanable
        });

        res.status(201).json({ book });
    } catch (err) {
        // remove img from folder if the book is unsuccessfully updated.
        if (req.file) {
            removeFileFromFolder(req.file.filename);
        };

        // handle errors
        const errors = handleError(err);
        res.status(400).json({ errors });

    };
});

// update book (from POE)
router.put('/:id', upload.single('img'), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        let fileName = book.img;

        if (req.file) {
            if (!matchType[req.file.mimetype]) {
                removeFileFromFolder(req.file.filename);
                fileName = null;
            } else {
                fileName = `/img/book-covers/${req.file.filename}`
            };
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

        await updatedBook.validate();
        const savedBook = await updatedBook.save();
        
        // remove img
        if (req.file) {
            removeImgFromFolder(book.img);
        };
        res.json({ book: savedBook });
    } catch (err) {
        // remove img from folder if the book is unsuccessfully updated.
        if (req.file) {
            removeFileFromFolder(req.file.filename);
        }; 

        // handle errors
        const errors = handleError(err);
        res.status(400).json({ errors });
    };
});

router.delete('/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id)
        .then((book) => {
            // del img from folder
            if(book.img) {
                removeImgFromFolder(book.img);
            };
            
            res.status(200).json({ redirect: '/books' })
        })    
        .catch(err => {
            console.log(err);
        });
});

// exports
module.exports = router;