const { MongoClient, ObjectID } = require('mongodb')
const url = process.env.DB_URL
const database = process.env.DB_NAME
const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('[MongoDB Atlas] Using existing connection to Atlas')
    return connection
  }

  try {
    const client = await MongoClient.connect(url)
    const db = client.db(database)
    console.log('[MongoDB Atlas] Created connection to Atlas')

    connection.isConnected = true
    connection.db = db
    connection.ObjectId = ObjectID
    return connection
  } catch (err) {
    console.error(err)
  }
}
