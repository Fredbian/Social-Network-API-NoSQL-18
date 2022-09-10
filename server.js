// import
const mongoose = require('mongoose')
const express = require('express')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})



app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`))