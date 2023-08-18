require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


// routes import
const routes = require('./routes/routes');
const bookRoutes = require('./routes/book-routes');
const userRoutes = require('./routes/user.routes');

// init app
const app = express();

// connect to db & port
const port = process.env.PORT || 3001;
const db_uri = process.env.DB_URI;
mongoose.connect(db_uri)
    .then(() => {
        app.listen(port, () => console.log(`listening on port ${port}`));
    })
    .catch(err => console.log(err));

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// view engine
app.set('view engine', 'ejs')

// routes
app.use('/', routes);
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

// error
app.use((req, res) => res.redirect('/'));