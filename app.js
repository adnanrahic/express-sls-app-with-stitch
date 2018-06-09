// const sls = require('serverless-http')
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
  console.log(addedNote)

  res.status(200).send(addedNote)
})

app.put('/:id', async (req, res, next) => {
  const { db } = await initDb()
  const { insertedId } = await db.collection('notes')
    .updateOne({ _id: req.params.id }, req.body, { upsert: true })

  const updatedNote = await db.collection('notes')
    .findOne({ _id: insertedId })
  console.log(updatedNote)

  res.status(200).send(updatedNote)
})

app.get('/', async (req, res, next) => {
  const { db } = await initDb()
  const foundNotes = await db.collection('notes')
    .find({})
    .execute()
  console.log(foundNotes)

  res.status(200).send(foundNotes)
})

app.get('/:id', async (req, res, next) => {
  const { db } = await initDb()
  const foundNote = await db.collection('notes')
    .findOne({ _id: req.params.id })
  console.log(foundNote)

  res.status(200).send(foundNote)
})

// module.exports.run = sls(app)
app.listen(3000)
