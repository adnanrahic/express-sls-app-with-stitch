const mongoose = require('mongoose')
const url = process.env.DB_URL
const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> using existing mongoose connection')
    return connection
  }

  console.log('=> using new mongoose connection')
  const db = await mongoose.connect(url)
  connection.isConnected = db.connections[0].readyState
  connection.db = db
  return connection
}
