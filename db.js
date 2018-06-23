const { StitchClientFactory, BSON } = require('mongodb-stitch')
const { ObjectId } = BSON
const appId = 'notes-stitch-xwvtw'
const database = 'stitch-db'
const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('[MongoDB Stitch] Using existing connection to Stitch')
    return connection
  }

  try {
    const client = await StitchClientFactory.create(appId)
    const db = client.service('mongodb', 'mongodb-atlas').db(database)
    await client.login()
    const ownerId = client.authedId()
    console.log('[MongoDB Stitch] Created connection to Stitch')

    connection.isConnected = true
    connection.db = db
    connection.ownerId = ownerId
    connection.ObjectId = ObjectId
    return connection
  } catch (err) {
    console.error(err)
  }
}

/*
▸ insertOne(doc)
▸ insertMany(docs)
▸ deleteOne(query)
▸ deleteMany(query)
▸ updateOne(query, update, options = {})
▸ updateMany(query, update, options?)
▸ find(query, project?)
▸ findOne(query, project?)
▸ aggregate(pipeline)
▸ count(query, options)
*/

// https://s3.amazonaws.com/stitch-sdks/js/docs/master/index.html#mongodbservicedb
