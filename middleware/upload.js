const multer = require('multer');

const matchType = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};

const storage = multer.diskStorage({ // still got issues
    destination: (req, file, cb) => {
        // check if img
        const isValid = matchType[file.mimetype];
        const uploadError = !isValid ? undefined : null;

        cb(uploadError, 'public/img/book-covers');
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.replace(' ', '-');
        const ext = matchType[file.mimetype];
        cb(null, `${filename}'-'${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage });

// exports
module.exports = { upload, matchType };

