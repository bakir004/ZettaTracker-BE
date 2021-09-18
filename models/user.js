const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,

    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo"
    }
})

const User = mongoose.model("User", userSchema);

module.exports = { User };