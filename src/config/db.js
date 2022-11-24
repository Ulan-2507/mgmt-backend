const mongoose = require('mongoose')

const connectDB = async () => {
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => console.log('DB connected!'))
		.catch(err => console.log(`DB connect failed ${err}`))
}

module.exports = connectDB
