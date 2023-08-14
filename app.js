require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override')
const mongoose = require('mongoose');


// routes import
const routes = require('./routes/routes');
const bookRoutes = require('./routes/book-routes');

// init app
const app = express();

// connect to db & port
const port = process.env.PORT;
const db_uri = process.env.DB_URI;
mongoose.connect(db_uri)
    .then(() => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// view engine
app.set('view engine', 'ejs')

// routes
app.use('/', routes);
app.use('/books', bookRoutes);

// error
app.use((req, res) => {
    res.redirect('/');
});