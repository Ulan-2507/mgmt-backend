require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/index.js')
const connectDB = require('./config/db.js')

connectDB()

const app = express()

app.use(bodyParser.json())
app.use(
	'/',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
)

module.exports = app
module.exports.handler = serverless(app)
