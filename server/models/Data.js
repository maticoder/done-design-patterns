const mongoose = require("mongoose");
const { projectSchema } = require("./Project");

const dataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    projects: {
        type: [projectSchema],
        default: [],
    },
});

module.exports = mongoose.model("Data", dataSchema);
