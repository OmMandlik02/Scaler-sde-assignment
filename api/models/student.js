const mongoose = require('mongoose');
const student = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentors'
    },
    email: {
        type: String,
        required: true
    },
    Ideation: {
        type: Number,
    },
    Execution: {
        type: Number
    },
    Viva: {
        type: Number
    },
    editable: {
        type: Boolean,
        default: true
    }
})
const students = mongoose.model('Students', student);
module.exports = students;