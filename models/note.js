const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to',url)


if (process.argv < 3) {
    console.log('Please provide password: node mongo.js <password>')
    process.exit(1)
}

const password = process.env.REACT_APP_MONGO_PASSWORD

//const url = `mongodb+srv://admin:${password}@protobase.ie9mqhx.mongodb.net/Note?retryWrites=true&w=majority`

mongoose.connect(url)
    .then(result => {
        console.log('connectoed to MongoDB')
    })
    .catch((error) => {
        console.log('ERROR ERROR ERROR MongoDB', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note',noteSchema)