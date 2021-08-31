const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    name: String,
    description: String,
    
    assigneeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    assignedPersonnel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },

    priority: String,
    status: String,
    
    dateCreated: String,
    dateUpdated: String,
    dueDate: String,

    icon: String
})

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket };