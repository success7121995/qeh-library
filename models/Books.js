const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    callNo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: Buffer,
        contentType: String,
        default: ''
    },
    isNewAddition: {
        type: Boolean,
        default: false
    },
    loanable: {
        type: Boolean,
        default: false
    }
});

const Book = mongoose.model('Books', bookSchema);

// exports
module.exports = Book;

// json template

// {
//     "title": "book",
//     "author": "author",
//     "isbn": "1234",
//     "callNo": "1234",
//     "description": "a Book",
//     "isNewAddition": true,
//     "loanable": true
// }