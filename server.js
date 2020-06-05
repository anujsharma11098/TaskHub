if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const cors = require('cors')

const port = process.env.PORT
const app = express()

const mongodb = require('./db/MongoDB')

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,CHECKOUT,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/', require('./routes/routes'))

app.listen(port, () => {
    console.log(`Server Started on Port ${port}...`)
})
