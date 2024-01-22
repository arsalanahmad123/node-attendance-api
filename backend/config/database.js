const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');


const connectDb = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch((err) => {
            console.log(err.message);
        });
}

module.exports = connectDb