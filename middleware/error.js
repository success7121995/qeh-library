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

        // users
        titles: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        hospital: '',
        dept: '',
        position: '',

        // login
        loginFailed: '',
    };

    // book validator
    if (err.message.includes('books validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
           errors[properties.path] = properties.message;
        });
        return errors;
    };

    // check duplicate email
    if (err.code === 11000) {
        errors.email = 'Email has been registered, please try to login.';
        return errors;
    };

    // user validator
    if(err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
        return errors;
    };

    // login
    if (err.message === 'invalid email or password') {
        errors.loginFailed = 'Email or password is invalid.';
        return errors;
    };
};

// exports
module.exports = handleError;