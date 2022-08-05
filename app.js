require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors')
const Note = require('./models/note');
const { response } = require('express');




app.use(cors())
app.use(express.static('build'))
app.use(express.json())



// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2022-05-30T17:30:31.098Z",
//       important: true
//     },]

app.get('/', (request, response) => {
    console.log('PPPPPPO')
    response.send('<h1>Hello sup</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
  .then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/notes', (request,response,next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
  .catch(error => next(error))
})


app.put('/api/notes/:id', (request,response,next) => {
  const {content,important} = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    {content,important},
     {new: true,runValidators:true,context:'query'})
  .then(updatedNote => {
    response.json(updatedNote)
  })
  .catch(error => next(error))
})


app.delete('/api/notes/:id', (request,response) => {
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})







app.listen(port,() => {
    console.log(`server be running and running on ${port}`)
})

const errorHandler = (error,request,response,next) => {
  console.error(error.message)


  if (error.name === 'CastError') {
    return response.status(400).send({error: 'wrong id format'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
    next(error)
}

app.use(errorHandler)