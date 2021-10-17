const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:"User"},
    task:{type: String,trim: true, required: true},
    note:{type: String,trim: true, required: true},
    // deadline:{type: Date,trim: true, required: true},
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;