const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    name: String,
    description: String,
})

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };