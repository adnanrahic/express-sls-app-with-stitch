/* global __root */
const express = require('express')
const tasksController = express.Router()
const initDb = require(__root + '/db')

tasksController
  .get('/status', async (req, res, next) => {
    const { db } = await initDb()
    console.log(db)
    res.status(200).send('OK')
  })

tasksController
  .post('/', async (req, res, next) => {
    const { db } = await initDb()
    const { insertedId } = await db.collection('notes')
      .insertOne(req.body)

    const addedNote = await db.collection('notes')
      .findOne({ _id: insertedId })

    res.status(200).send(addedNote)
  })

tasksController
  .put('/:id', async (req, res, next) => {
    const { db } = await initDb()
    const { insertedId } = await db.collection('notes')
      .updateOne({ _id: req.params.id }, req.body, { upsert: true })

    const updatedNote = await db.collection('notes')
      .findOne({ _id: insertedId })

    res.status(200).send(updatedNote)
  })

tasksController
  .get('/', async (req, res, next) => {
    const { db } = await initDb()
    const foundNotes = await db.collection('notes')
      .find({}).toArray()

    console.log(foundNotes)

    res.status(200).send(foundNotes)
  })

tasksController
  .get('/:id', async (req, res, next) => {
    const { db, ObjectId } = await initDb()
    const foundNote = await db.collection('notes')
      .findOne({ _id: ObjectId(req.params.id) })

    res.status(200).send(foundNote)
  })

tasksController
  .delete('/:id', async (req, res, next) => {
    const { db, ObjectId } = await initDb()
    const deletedNote = await db.collection('notes')
      .deleteOne({ _id: ObjectId(req.params.id) })

    res.status(200).send(deletedNote)
  })

module.exports = tasksController
