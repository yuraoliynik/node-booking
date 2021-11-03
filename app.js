const express = require('express');
const mongoose = require('mongoose');

const {
    APP_PORT,
    MONGO_CONNECT_URL
} = require('./configs/config');
const {
    errorStatuses
} = require('./constants');
const {
    placeRouter,
    userRouter
} = require('./routers');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connected successfully');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/places', placeRouter);
app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    const {message, status} = err;

    res
        .status(status || errorStatuses.code_500)
        .json({msg: message});
});

app.listen(APP_PORT, () => {
    console.log(`Example app listening at http://localhost:${APP_PORT}`);
});
