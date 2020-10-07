const mongoose = require("mongoose");
const { todoSchema } = require("./Todo");

const projectSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true,
        maxlength: 1,
    },
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    todos: {
        type: [todoSchema],
        default: [],
    },
});

module.exports.projectSchema = projectSchema;
module.exports = mongoose.model("Project", projectSchema);
