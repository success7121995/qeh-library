const mongoose = require('mongoose');

// validator
isNum = (val) => {
    const regex = /(?=.*[0-9])/;
    return regex.test(val);
};

isCallNo = (val) => {
    const regex = /[A-Za-z]+([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?\s\.[A-Za-z]+[0-9]+\s[0-9]+/i;
    return regex.test(val);
}


// schema
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: [1, 'Maximum length is 50.'],
        required: [true, 'Please fill in the blank.']
    },
    author: {
        type: String,
        maxlength: [1, 'Maximum length is 50.'],
        required: [true, 'Please fill in the blank.']
    },
    isbn: {
        type: String,
        maxlength: [1, 'Maximum length is 20.'],
        valiate: [isNum, 'Accept numbers only.'],
        required: [true, 'Please fill in the blank.']
    },
    callNo: {
        type: String,
        maxlength: [1, 'Maximum length is 20.'],
        valiate: [isCallNo, 'Invalid call number.'],
        uppercase: true,
        required: [true, 'Please fill in the blank.']
    },
    description: {
        type: String,
        maxlength: [1, 'Description must be less then 300'],
        required: [true, 'Please fill in the blank.']
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