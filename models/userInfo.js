const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userInfoSchema = mongoose.Schema({
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

userInfoSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = { UserInfo };