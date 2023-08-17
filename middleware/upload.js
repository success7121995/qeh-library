const multer = require('multer');
const path = require('path');
const fs = require('fs');

// img type
const matchType = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};

// upload img
const storage = multer.diskStorage({ // still got issues
    destination: (req, file, cb) => {        
        cb(null, 'public/img/book-covers')
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.replace(' ', '-');
        const ext = matchType[file.mimetype];
        cb(null, `${filename}'-'${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage });

// remove whimg from folder
const removeFileFromFolder = (filename) => {
    filePath = path.join(__dirname, '../public', `/img/book-covers/${filename}`);
    fs.unlink(filePath, err => err);
};

// replace img
const replaceImg = (filename) => {
    filePath = path.join(__dirname, '../public', filename);
    fs.unlink(filePath, err => err);
};

// exports
module.exports = { upload, matchType, removeFileFromFolder, replaceImg };

