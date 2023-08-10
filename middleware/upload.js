const multer = require('multer');

const match = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // check if valid img type
        const isValid = match[file.mimetype];
        let uploadError = new Error('Invalid image type')
        if (isValid){
            uploadError = null;
        };
        cb(uploadError, 'public/img/book-cover');
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

