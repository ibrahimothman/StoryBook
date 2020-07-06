import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from "./config/db"
import morgan from "morgan"
import ejs from "ejs"
import path from "path"
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

// listen to PORT port
app.listen(process.env.PORT,
     console.log(`The server running in the ${process.env.NODE_ENV} mode on ${process.env.PORT} port`))