require('dotenv').config();
const express = require('express');
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

// view engine
app.set('view engine', 'ejs')

//router
app.use('/', routes);
app.use('/books', bookRoutes);