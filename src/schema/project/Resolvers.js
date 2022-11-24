const {
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType,
} = require('graphql')
const Project = require('../../models/Project.js')
const ProjectType = require('./TypeDefs.js')

const projects = {
	type: ProjectType,
	resolve(parent, args) {
		return Project.find()
	},
}

const project = {
	type: ProjectType,
	args: { id: { type: GraphQLID } },
	resolve(parent, args) {
		return Project.findById(args.id)
	},
}

const addProject = {
	type: ProjectType,
	args: {
		name: { type: GraphQLNonNull(GraphQLString) },
		description: { type: GraphQLNonNull(GraphQLString) },
		link: { type: GraphQLNonNull(GraphQLString) },
		status: {
			type: new GraphQLEnumType({
				name: 'ProjectStatus',
				values: {
					new: { value: 'Not Started' },
					progress: { value: 'In Progress' },
					completed: { value: 'Completed' },
				},
			}),
			defaultValue: 'Not Started',
		},
		clientId: { type: GraphQLNonNull(GraphQLID) },
	},

	resolve(parent, args) {
		const project = new Project({
			name: args.name,
			description: args.description,
			status: args.status,
			link: args.link,
			clientId: args.clientId,
		})

		return project.save()
	},
}

const updateProject = {
	type: ProjectType,
	args: {
		id: { type: GraphQLNonNull(GraphQLID) },
		name: { type: GraphQLNonNull(GraphQLString) },
		description: { type: GraphQLNonNull(GraphQLString) },
		link: { type: GraphQLNonNull(GraphQLString) },
		status: {
			type: new GraphQLEnumType({
				name: 'ProjectStatusUpdate',
				values: {
					new: { value: 'Not Started' },
					progress: { value: 'In Progress' },
					completed: { value: 'Completed' },
				},
			}),
		},
	},
}

const deleteProject = {
	type: ProjectType,
	args: { id: { type: GraphQLNonNull(GraphQLID) } },
	resolve(parent, args) {
		return Project.findByIdAndRemove(args.id)
	},
}

module.exports = { projects, project, addProject, updateProject, deleteProject }
