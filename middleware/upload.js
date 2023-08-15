const multer = require('multer');

const storage = multer.diskStorage({ // still got issues
    destination: (req, file, cb) => {    
        cb(null, 'public/img/book-covers');
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.replace(' ', '-');
        // const ext = match[file.mimetype];
        cb(null, `${filename}'-'${Date.now()}`);
    }
});

const upload = multer({ storage });

// exports
module.exports = upload;

