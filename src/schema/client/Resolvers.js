const {
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql')
const Client = require('../../models/Client')
const ClientType = require('./TypeDefs')

const clients = {
	type: new GraphQLList(ClientType),
	resolve(parent, args) {
		return Client.find()
	},
}

const client = {
	type: ClientType,
	args: { id: { type: GraphQLID } },
	resolve(parent, args) {
		return Client.findById(args.id)
	},
}

const addClient = {
	type: ClientType,
	args: {
		name: { type: GraphQLNonNull(GraphQLString) },
		email: { type: GraphQLNonNull(GraphQLString) },
		phone: { type: GraphQLNonNull(GraphQLString) },
	},
	resolve(parent, args) {
		const client = new Client({
			name: args.name,
			email: args.email,
			phone: args.phone,
		})

		return client.save()
	},
}

const updateClient = {
	type: ClientType,
	args: {
		id: { type: GraphQLNonNull(GraphQLID) },
		name: { type: GraphQLNonNull(GraphQLString) },
		email: { type: GraphQLNonNull(GraphQLString) },
		phone: { type: GraphQLNonNull(GraphQLString) },
	},
	resolve(parent, args) {
		return Client.findByIdAndUpdate(
			args.id,
			{
				$set: {
					name: args.name,
					email: args.email,
					phone: args.phone,
				},
			},
			{ new: true }
		)
	},
}

const deleteClient = {
	type: ClientType,
	args: { id: { type: GraphQLNonNull(GraphQLID) } },
	resolve(parent, args) {
		return Client.findByIdAndRemove(args.id)
	},
}

module.exports = { clients, client, addClient, updateClient, deleteClient }
