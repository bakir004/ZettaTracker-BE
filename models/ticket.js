const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    name: String,
    description: String,

    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },

    subtasks: [{
        name: String,
        status: String
    }],

    priority: String,
    status: String,
    
    dateCreated: String,
    dateUpdated: String,
    dueDate: String,
})

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket };