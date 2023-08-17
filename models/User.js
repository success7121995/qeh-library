const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// check email
const isEmail = (val) => {
    const regex = /[a-z0-9]+@ha\.org\.hk/
    return regex.test(val);
}

const userSchema = mongoose.Schema({
    title: {
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
        required: [true, 'Password is required.']
    },
    phone: {
        type: String,
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
}, { validateBeforeSave: true });

// get virtual id
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('users', userSchema);

// exports
module.exports = User;