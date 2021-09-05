const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    name: String,
    description: String,

    projectManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    personnelIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    ticketIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }],

    dateCreated: String
})

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };