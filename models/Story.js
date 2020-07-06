const mongoose = require("mongoose")

const StoryShcema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    body:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    user:{
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Story", StoryShcema)