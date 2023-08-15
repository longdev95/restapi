const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use('/images', express.static(path.join(__dirname, 'images')))

// set cors header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', require('./routes/feed'));

app.use((error, req, res, next) => {
    console.log(error.message, error.statusCode)
    const message = error.message
    const status = error.statusCode || 500
    res.status(status).json({ message: message })
})

mongoose.connect('mongodb+srv://longngthanh95:XtTCyPd08RcnRfB9@cluster0.hweirbv.mongodb.net/messages?retryWrites=true&w=majority')
    .then(_ => {
        app.listen(8080);
    })
    .catch(err => console.log(err))
