const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const {
	clients,
	client,
	addClient,
	updateClient,
	deleteClient,
} = require('./client/Resolvers')
const {
	projects,
	project,
	addProject,
	updateProject,
	deleteProject,
} = require('./project/Resolvers')

const query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		clients,
		client,
		projects,
		project,
	},
})

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addClient,
		updateClient,
		deleteClient,
		addProject,
		updateProject,
		deleteProject,
	},
})

const schema = new GraphQLSchema({
	query,
	mutation,
})

module.exports = schema
