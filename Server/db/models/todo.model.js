const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    _id: String,
    title:  String,
    isDone: Boolean,
    isRejected:   Boolean,
    desc: String,
});

module.exports = mongoose.model('Todo', todoSchema);