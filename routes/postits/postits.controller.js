/* global __root */
const express = require('express')
const postitsController = express.Router()
const initDb = require(__root + '/db')
const Note = require(__root + '/db/models/note')

postitsController
  .get('/status', async (req, res, next) => {
    const { db } = await initDb()
    console.log(db)
    res.status(200).send('OK')
  })

postitsController
  .post('/', async (req, res, next) => {
    await initDb()
    const note = await Note.create(req.body)
    res.status(200).send(note)
  })

postitsController
  .put('/:id', async (req, res, next) => {
    await initDb()
    const note = await Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { $upsert: true })
    res.status(200).send(note)
  })

postitsController
  .get('/', async (req, res, next) => {
    await initDb()
    const notes = await Note.find()
    res.status(200).send(notes)
  })

postitsController
  .get('/:id', async (req, res, next) => {
    await initDb()
    const note = await Note.findById(req.params.id)
    res.status(200).send(note)
  })

postitsController
  .delete('/:id', async (req, res, next) => {
    await initDb()
    const note = await Note.deleteOne({ _id: req.params.id })
    res.status(200).send(note)
  })

module.exports = postitsController
