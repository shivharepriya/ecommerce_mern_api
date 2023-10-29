const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
const connectDB = require('./db/connectDB')
const fileUpload = require("express-fileupload");
const API = require('./routers/api')
const cookieParser = require('cookie-parser')
// const cloudinary = require('cloudinary');
const cors = require('cors')

// for security
app.use(cookieParser())

// for api communication in react

app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }));





app.use(fileUpload({ useTempFiles: true }));

app.use('/api', API)

connectDB()






app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})