const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

// routes import
const userAuthRoute = require('./api/Routes/UserManagement/auth')
const userRoute = require('./api/Routes/UserManagement/user')
const productRoute = require('./api/Routes/Projects/projects')


app.use(morgan('dev'));


//db connection
mongoose.connect(process.env.ConnectionString).then(() => {
    console.log('Connected to Database')
})
    .catch((err) => console.log(err))
mongoose.Promise = global.Promise;


// CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // wildcard (whitelisting the api)
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Methods', 'POST', 'GET', 'PATCH', 'DELETE', 'PUT')
        return res.status(200).json({});
    }
    next();
})

// parsing the body

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Settng Routes

app.use('/api/users/auth', userAuthRoute)
app.use('/api/users', userRoute);
app.use('/api/projects', productRoute)

//Error Hadling

// if no paths matched
app.use((req, res, next) => {
    const error = new Error('No matching paths')
    error.status = 404;
    next(error);
})

// if methods not matched

app.use((error, req, res, next) => {
    res.status(error.status || 500)[
        res.json({
            error: {
                message: error.message,
            }
        })
    ]
})

module.exports = app;