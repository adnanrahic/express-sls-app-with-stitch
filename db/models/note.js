const mongoose = require('mongoose')
const NoteSchema = new mongoose.Schema({
  title: String,
  description: String
}, {
  versionKey: false
})
module.exports = mongoose.model('Note', NoteSchema)
