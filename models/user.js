const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,

    email: String,
    password: {
        type: String,
        minlength: 8
    },
    
    assignedTickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    }],
    assignedProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],

    role: String,
    permissions: Object
})

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model("User", userSchema);

module.exports = { User };