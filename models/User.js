const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// validators
const isEmail = (val) => {
    const regex = /[a-z0-9]+@ha\.org\.hk/;
    return regex.test(val);
};

const isValidPassword = (val) => {
    const regex = /(?=.*[a-zA-Z0-9])/;
    return regex.test(val);
};

// schema
const userSchema = mongoose.Schema({
    titles: {
        type: String,
        default: 'Mr.',
        required: [true, 'Title is required.']
    },
    firstName: {
        type: String,
        required: [true, 'First name cannot be empty.']
    },
    lastName: {
        type: String,
        required: [true, 'Last name cannot be empty.']
    },
    email: {
        type: String,
        unique: true,
        validate: [isEmail, 'Email is not valid.'],
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        validate: [isValidPassword, 'Password must contain both uppercase, lowercase and numbers.'],
        maxlength: [12, 'Maximum password length is 12.'],
        required: [true, 'Password is required.'],
    },
    phone: {
        type: String,
        maxlength: [8, 'Phone number length must be 8.'],
        minlength: [8, 'Phone number length must be 8.'],
        required: [true, 'Phone Number cannot be empty.']
    },
    hospital: {
        type: String,
        required: [true, 'Please select your work place.'],
    },
    dept: {
        type: String,
        required: [true, 'Phone Number cannot be empty.']
    },
    position: {
        type: String,
        required: [true, 'Position cannot be empty.']
    },
    role: {
        type: String,
        default: 'USER'
    }
}, { validateBeforeSave: true });

// get virtual id
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', { virtuals: true });

// hash password
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('users', userSchema);

// exports
module.exports = User;