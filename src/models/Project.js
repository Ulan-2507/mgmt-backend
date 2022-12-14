const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
	name: { type: String },
	description: { type: String },
	link: { type: String },
	status: { type: String, enum: ['Not Started', 'In Progress', ' Completed'] },
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
	},
})

module.exports =
	mongoose.models.Project || mongoose.model('Project', ProjectSchema)
