const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    name: String,
    description: String,

    assigneeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reporterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },

    priority: String,
    status: String,
    
    dateCreated: String,
    dateUpdated: String,
    dueDate: String,
})

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket };