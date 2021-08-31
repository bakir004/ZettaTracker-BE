const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,

    email: String,
    password: String,
    
    assignedTickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }],
    assignedProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
})

const User = mongoose.model("User", userSchema);

module.exports = { User };