const express = require('express');
const User = require('../models/User');
const correspond = require('../middleware/correspond');

// init router
const router = express.Router();

// login page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

//sign up page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});


// sign up
router.post('/signup', async (req, res) => {
    try {
        // correspond values
        const titleValue = correspond.title[req.body.title];
        const hospitalValue = correspond.hospital[req.body.hospital];
        const deptValue = correspond.dept[req.body.dept];

        let user = await new User({
            title: titleValue,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            hospital: hospitalValue,
            dept: deptValue,
            position: req.body.position,
        });

        user.save();
        res.status(201).send(user);
    } catch (err) {
        console.log(err);
    };
});

// exports
module.exports = router;