const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    time: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    content: {
        type: String,
        required: true,
        default: "",
    },
});

module.exports.todoSchema = todoSchema;

module.exports = mongoose.model("Todo", todoSchema);
