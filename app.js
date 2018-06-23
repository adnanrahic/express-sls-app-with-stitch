const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
global.__root = __dirname

const routes = require('./routes')
app.use('/api', routes)

module.exports = app
