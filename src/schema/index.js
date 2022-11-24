const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const {
	clients,
	client,
	addClient,
	updateClient,
	deleteClient,
} = require('./client/Resolvers')

const query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		clients,
		client,
	},
})

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addClient,
		updateClient,
		deleteClient,
	},
})

const schema = new GraphQLSchema({
	query,
	mutation,
})

module.exports = schema
