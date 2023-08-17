const express = require('express');

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



// exports
module.exports = router;