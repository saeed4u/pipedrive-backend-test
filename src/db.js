const mongoose = require('mongoose');

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME
} = process.env;

const url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const mongooseOptions = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
};

mongoose.connect(url, mongooseOptions).then(() => {
    console.log('connected to db!!')
}).catch((err) => console.log(err));