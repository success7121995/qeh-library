const mongoose = require('mongoose');

// validators
const isNum = (val) => {
    const regex = /[0-9]+/i;
    return regex.test(val);
};

const isCallNo = (val) => {
    const regex = /[A-Za-z]+([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?\s\.[A-Za-z]+[0-9]+\s[0-9]+/i;
    return regex.test(val); // WY18.2 .R68 2019
};

// schema
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: [200, 'Maximum length is 200.'],
        required: [true, 'Title is required.']
    },
    author: {
        type: String,
        maxlength: [100, 'Maximum length is 100.'],
        required: [true, 'Authors or editors are required.']
    },
    isbn: {
        type: String,
        maxlength: [20, 'Maximum length is 20.'],
        validate: [isNum, 'Accept numbers only.'],
        required: [true, 'ISBN is required.']
    },
    callNo: {
        type: String,
        maxlength: [20, 'Maximum length is 20.'],
        validate: [isCallNo, 'Invalid call number.'],
        uppercase: true,
        required: [true, 'Call number is required.']
    },
    description: {
        type: String,
        maxlength: [500, 'Description must be less then 500'],
        required: [true, 'Description is required.']
    },
    img: {
        type: String,
    },
    isNewAddition: {
        type: Boolean,
        default: false
    },
    loanable: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

bookSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

bookSchema.set('toJSON', { virtuals: true })

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