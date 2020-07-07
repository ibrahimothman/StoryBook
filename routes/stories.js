const express  = require("express")
const router = express.Router()
const { auth } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc Create a story
// @route GET /stories/create
router.get("/create", auth, (req, res) => {
    res.render("stories/create", {
        story: null
    })
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
        res.render('errors/500')
    }
    
})

// @desc Get All Stories
// @route GET /stories
router.get("/", auth, async (req, res) => {
    try{
        const stories = await Story.find({ status: 'public' })
                .populate('user')
                .sort([["createAt", 'desc']])        
        res.render("stories/index",{
            stories,
            loggedUser: req.user 
        })
    }catch(err){
        console.error(err);
        res.render('errors/500')
    }
   
})

// @desc Get a single Story
// @route GET /stories/:id
router.get("/:id", auth, async (req, res) => {
    try{
        const story = await Story.findById({ _id: req.params.id })
                .populate('user')       
        res.render("stories/show",{
            story,
            loggedUser: req.user 
        })
    }catch(err){
        console.error(err);
        res.render('errors/500')
    }
   
})


// @desc Get all user stories
// @route GET /stories/user/user_id
router.get("/user/:id", auth, async (req, res) => {
    try{
        const stories = await Story.find({ user: req.params.id, status: 'public' })
                .populate('user')
                .sort([['createAt', 'desc']]) 
                      
        res.render("stories/index",{
            stories,
            loggedUser: req.user 
        })
    }catch(err){
        console.error(err);
        res.render('errors/500')
    }
   
})

// @desc Edit a story
// @route GET /stories/:id/edit
router.get("/:id/edit", auth, async (req, res) => {
    try{
        const story = await Story.findById(req.params.id)
        console.log(req.user);
        
        if(story.user != req.user.id){
            return res.render('errors/404')
        }

        res.render("stories/edit", {
            story
        })
    }catch(err){
        console.error(err);
        res.render('errors/500')
    }
    
})

// @desc Update a story
// @route GET /stories/:id/edit
router.put("/:id", auth, async (req, res) => {
    try{
        let story = await Story.findById(req.params.id)
        
        if(story.user != req.user.id){
            return res.render('errors/404')
        }
        story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body,{
            new: true,
            runValidators: true
        })
        res.redirect('/dashboard')
    }catch(err){
        console.error(err);
        res.render('errors/500')
    }
    
})

// @desc deleta a story
// @route GET /stories/:id
router.delete("/:id", auth, async (req, res) => {
    try{
        let story = await Story.findById(req.params.id)
        
        if(story.user != req.user.id){
            return res.render('errors/404')
        }
        story = await Story.findOneAndDelete({ _id: req.params.id })
        res.redirect('/dashboard')
    }catch(err){
        console.error(err);
        res.render('errors/500')
    }
    
})

module.exports = router