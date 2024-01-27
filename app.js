require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

require('./models/connection');

var indexRouter = require('./routes/index');
var weatherRouter = require('./routes/weather');
var userRouter = require('./routes/users');

var app = express();
const cors = require('cors');

// Autoriser uniquement les requêtes depuis votre domaine front-end
const corsOptions = {
    origin: 'https://weatherapp-frontend-sigma-henna.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

// Utilisez le middleware cors avec les options spécifiées
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/weather', weatherRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
