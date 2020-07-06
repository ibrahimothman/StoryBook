const mongoose = require("mongoose")

const UserShcema = new mongoose.Schema({
    googleID: String,
    firstName: String,
    lastName: String,
    displayName: String,
    image: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", UserShcema)