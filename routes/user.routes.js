const express = require('express');
const User = require('../models/User');
const correspond = require('../middleware/correspond');
const handleError = require('../middleware/error');

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

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        res.status(200).json({ user });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    };
});

// sign up
router.post('/signup', async (req, res) => {
    try {
        // correspond values
        const titlesValue = correspond.titles[req.body.titles];
        const hospitalValue = correspond.hospital[req.body.hospital];
        const deptValue = correspond.dept[req.body.dept];

        console.log(req.body);

        const user = await User.create({
            titles: titlesValue,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            hospital: hospitalValue,
            dept: deptValue,
            position: req.body.position,
        });

        res.status(201).json({ user });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    };
});

// exports
module.exports = router;