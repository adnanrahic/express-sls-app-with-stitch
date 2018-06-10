const sls = require('serverless-http')
const app = require('./app')
module.exports.run = sls(app)
// app.listen(3000, () => console.log('Server running on port ', 3000))
