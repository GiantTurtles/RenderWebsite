const mongoose = require('mongoose')

if (process.argv < 3) {
    console.log('Please provide passwrod: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@protobase.ie9mqhx.mongodb.net/Note?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note',noteSchema)

console.log('PPPPP');

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')})

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

// mongoose
//     .connect(url)
//     .then((result) => {
//         console.log('connected')

//         const note = new Note({
//             content: 'Don\'t try this at the orphanarium',
//             date: new Date(),
//             important: true,
//         })

//         return note.save()
//     })
//     .then((result) => {
//         console.log('connected 2')

//         const note = new Note({
//             content: 'Don\'t try this at the sanitarium',
//             date: new Date(),
//             important: true,
//         })

//         return note.save()
//     })
//     .then((result) => {
//         console.log('connected 3')

//         const note = new Note({
//             content: 'Don\'t try this at the aquarium',
//             date: new Date(),
//             important: true,
//         })

//         return note.save()
//     })
//     .then(() => {
//         console.log('note saaved')
//         return mongoose.connection.close()
//     })
//     .catch((err) => console.log(err))

