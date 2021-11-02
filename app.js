const express = require('express');
const mongoose = require('mongoose');

const {
    APP_PORT,
    MONGO_CONNECT_URL
} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connected successfully');
});

app.listen(APP_PORT, () => {
    console.log(`Example app listening at http://localhost:${APP_PORT}`);
});
