const mongoose = require('mongoose');


const attendanceSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['present', 'absent'],
        default: 'present'
    },
    date: {
        type: Date,
        default: Date.now(),
        unique: true
    }
})

const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    attendances: [attendanceSchema]
}, { "timestamps": true });

module.exports = mongoose.model('user', User)