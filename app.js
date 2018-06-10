const express = require('express')
const app = express()
const initDb = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', async (req, res, next) => {
  const { db, ownerId } = await initDb()
  const { insertedId } = await db.collection('notes')
    .insertOne({ owner_id: ownerId, ...req.body })

  const addedNote = await db.collection('notes')
    .findOne({ _id: insertedId })

  res.status(200).send(addedNote)
})

app.put('/:id', async (req, res, next) => {
  const { db, ownerId } = await initDb()
  const { insertedId } = await db.collection('notes')
    .updateOne({ owner_id: ownerId, _id: req.params.id }, req.body, { upsert: true })

  const updatedNote = await db.collection('notes')
    .findOne({ _id: insertedId })

  res.status(200).send(updatedNote)
})

app.get('/', async (req, res, next) => {
  const { db } = await initDb()
  const foundNotes = await db.collection('notes')
    .find({})
    .execute()

  res.status(200).send(foundNotes)
})

app.get('/:id', async (req, res, next) => {
  const { db, ObjectId } = await initDb()
  const foundNote = await db.collection('notes')
    .findOne({ _id: ObjectId(req.params.id) })

  res.status(200).send(foundNote)
})

app.delete('/:id', async (req, res, next) => {
  const { db, ObjectId } = await initDb()
  const deletedNote = await db.collection('notes')
    .deleteOne({ _id: ObjectId(req.params.id) })

  res.status(200).send(deletedNote)
})

module.exports = app
