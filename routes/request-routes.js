const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');

// init router
const router = express.Router();

const cart = [];

// cart
router.get('/cart', (req, res) => {
    res.render('cart', { title: 'Cart', cart: req.session.cart });
});

// add to cart
router.get('/add-to-cart/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        // push book to cart
        cart.push(book);
        req.session.cart = cart;
        res.json({ redirect: '/books/new-additions'});
    } catch (err) {
        console.log(err);
    };
});

// // remove from cart
// router.delete('/requests/:id', (req, res) => {
//     const cart = req.session.cart

//     if(cart) {
//         cart.forEach(item => {
            
//         });
//     };
// });

// exports
module.exports = router;