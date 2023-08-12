const multer = require('multer');

const match = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};

const storage = multer.diskStorage({ // still got issues
    destination: (req, file, cb) => {
        const isValid = match[file.mimetype];
        const uploadError = (!isValid) ?
            new Error('Invalid Image Type'):
            null;

        cb(uploadError, 'public/img/book-covers');
    },
    filename: (req, file, cb) => {
        // console.log(file.mimetype);
        const filename = file.originalname.replace(' ', '-');
        const ext = match[file.mimetype];
        cb(null, `${filename}'-'${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage });

// exports
module.exports = upload;

