const express  = require("express")
const router = express.Router()
const { auth } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc Create a story
// @route GET /stories/create
router.get("/create", auth, (req, res) => {
    res.render("stories/create")
})

// @desc Save the story
// @route post /stories
router.post('/',auth, async (req, res) => {
    try{
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    }catch(err){
        console.error(err);
    }
    
})


module.exports = router