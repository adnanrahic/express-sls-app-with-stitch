const stitch = require('./stitch')
const mongoose = require('./mongoose')
const mongo = require('./mongo')
let db

switch (process.env.NODE_ENV) {
  case 'MONGO':
    db = mongo
    break

  case 'MONGOOSE':
    db = mongoose
    break

  case 'STITCH':
    db = stitch
    break

  default:
    db = stitch
    break
}

module.exports = db
