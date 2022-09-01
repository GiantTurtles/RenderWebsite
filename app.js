const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors()) //use different ports between front % backend
app.use(express.static('build')) //use frontend build from server
app.use(express.json()) //json REST application
app.use(middleware.requestLogger) //logs requests
app.use('/api/users',usersRouter)

app.use('/api/notes', notesRouter) //endpoints
app.use(middleware.unknownEndpoint) //unknwon endpoint error
app.use(middleware.errorHandler)

module.exports = app