const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/index')

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
