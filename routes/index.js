const express  = require("express")
const router = express.Router()
const { auth, guest } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc Login landing page
// @route GET /
router.get("/", guest, (req, res) => {
    res.render("login")
})

// @desc Dashboard
// @route GET /dashboard
router.get("/dashboard",auth,  async (req, res) => {
    try{
        const stories = await Story.find({user: req.user.id})
            .sort([["createAt", 'desc']])
        res.render("dashboard", {
            name: req.user.firstName,
            stories
        })
    }catch(err){
        console.error(err);
        
    }
    
    
    
})


module.exports = router