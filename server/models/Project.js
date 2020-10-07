const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 20,
        unique: true,
    },
    todos: [
        {
            data: Date,
            time: Date,
            task: String,
        },
    ],
});

module.exports = mongoose.model("Project", projectSchema);
