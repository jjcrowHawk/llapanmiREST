'use strict';

const mongoose = require('mongoose'),
    conf = require('./config');
var url = `mongodb:\/\/${conf.mongo.user}:${conf.mongo.password}@${conf.mongo.host}/${conf.mongo.db}`;

mongoose.connect(url)
    .then(() => {
        console.log("CONNECTION TO MONGO SUCESS!")

    })
    .catch((err) => {
        console.log(err);
    });

console.log("mongooose connection " + mongoose.connection);

module.exports = {
    "mongoose": mongoose,
};