const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql')
const Client = require('../../models/Client')
const ClientType = require('../client/TypeDefs')

//Project Type

const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		link: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return Client.findById(parent.clientId)
			},
		},
	}),
})

module.exports = ProjectType
