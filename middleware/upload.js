const multer = require('multer');
const handleError = require('../middleware/error');

const match = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // check if valid img type
        const isValid = match[file.mimetype];

        if (isValid){
            cb(null, 'public/img/book-covers');
        } else {
            const uploadError = new Error('Invalid image type')
            const error = handleError(uploadError);
            cb(error, 'public/img/book-covers');
        };
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.replace(' ', '-');
        const ext = match[file.mimetype];
        cb(null, `${filename}'-'${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage });

// exports
module.exports = upload;

