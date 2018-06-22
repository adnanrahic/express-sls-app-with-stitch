const express = require('express')
const router = express.Router()
const notesController = require('./notes/notes.controller')
router.use('/notes', notesController)
module.exports = router
