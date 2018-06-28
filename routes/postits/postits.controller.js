/* global __root */
const express = require('express')
const tasksController = express.Router()
const initDb = require(__root + '/db')
const Note = require(__root + '/db/models/note')

tasksController
  .get('/status', async (req, res, next) => {
    const { db } = await initDb()
    console.log(db)
    res.status(200).send('OK')
  })

tasksController
  .post('/', async (req, res, next) => {
    await initDb()
    const note = await Note.create(req.body)
    res.status(200).send(note)
  })

tasksController
  .put('/:id', async (req, res, next) => {
    await initDb()
    const note = await Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { $upsert: true })
    res.status(200).send(note)
  })

tasksController
  .get('/', async (req, res, next) => {
    await initDb()
    const notes = await Note.find()
    res.status(200).send(notes)
  })

tasksController
  .get('/:id', async (req, res, next) => {
    await initDb()
    const note = await Note.findById(req.params.id)
    res.status(200).send(note)
  })

tasksController
  .delete('/:id', async (req, res, next) => {
    await initDb()
    const note = await Note.deleteOne({ _id: req.params.id })
    res.status(200).send(note)
  })

module.exports = tasksController
