const handleError = (err) => {
    // reset error
    const errors = {
        // books
        title: '',
        author: '',
        isbn: '',
        callNo: '',
        description: '',
        img: '',
    };

    // image type error
    if (err.message === 'invalid image type') {
        errors.img = 'Invalid Image Type.';
        return errors
    };

    // book validator
    if (err.message.includes('Books validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
           errors[properties.path] = properties.message;
        });
        return errors;
    };
};

// exports
module.exports = handleError;