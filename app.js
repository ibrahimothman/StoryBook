import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from "./config/db"
import morgan from "morgan"
import ejs from "ejs"
import path from "path"
const MethodOverride = require('method-override')
const passport = require("passport")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

// load dotevn config
dotenv.config({ path: "./config/config.env" })

// passport config
require('./config/passport')(passport)

// connect to db
connectDB()

// init express app
const app = express()

// body parse
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// use method override
app.use(MethodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// add some helper methods
const { formatDate, stripeTags, truncate, editable } = require('./helpers/ejs')
app.locals = {
  formatDate,
  stripeTags,
  truncate, 
  editable
}


// use dev morgan to log HTTP requests
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// use exoress-handlebars as view engine
app.set('view engine', "ejs")

// use static folder
app.use(express.static(path.join(__dirname, 'public')))




// express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
  }))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())



// routes
app.use("/", require('./routes/index'))
app.use("/auth", require('./routes/auth'))
app.use("/stories", require('./routes/stories'))

// listen to PORT port
app.listen(process.env.PORT,
     console.log(`The server running in the ${process.env.NODE_ENV} mode on ${process.env.PORT} port`))