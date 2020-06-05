const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    taskType: {
        type: String,
        required: true

    },
    dueDate: {
        type: Date,
        required: true
    },
    status:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema)