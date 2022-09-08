require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const {PORT, SESSION_SECRET, DATABASE_URL} = process.env

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

//use masive here if i end up wanting to connect a database to save player information
massive({
    connectionString: DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
}).then((db)=>{
    app.set('db',db)
    console.log('database up!')
}).catch((err) => console.log(err))
//middleware vv

//middleware ^^

//
app.listen(PORT, console.log(`You are on Port: ${PORT} `))