const stitch = require('mongodb-stitch')

module.exports = async () => {
  try {
    const client = await stitch.StitchClientFactory.create('test-stitch-dejsq')
    const db = client.service('mongodb', 'mongodb-atlas').db('test')
    await client.login()
    const ownerId = client.authedId()
    console.log('[MongoDB Stitch] Connected to Stitch')

    return { db, ownerId }
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
