const express = require('express')
const router = express.Router()
const notesController = require('./notes/notes.controller')
router.use('/notes', notesController)
const tasksController = require('./tasks/tasks.controller')
router.use('/tasks', tasksController)
const postitsController = require('./postits/postits.controller')
router.use('/postits', postitsController)
module.exports = router
