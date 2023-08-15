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