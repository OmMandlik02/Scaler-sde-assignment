const mongoose = require('mongoose');
const mentor = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students'
    }]
})
const mentors = mongoose.model('Mentors', mentor);
module.exports = mentors;