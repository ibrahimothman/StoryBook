const express  = require("express")
const router = express.Router()
const { auth } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc Create a story
// @route GET /stories/create
router.get("/create", auth, (req, res) => {
    res.render("stories/create")
})

// @desc Dashboard
// @route GET /dashboard


module.exports = router