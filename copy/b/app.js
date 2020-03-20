
const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')


logger.info('connecting to',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI,{useNewUrlParser: true})
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((err) => {
    logger.err('error connecting to MongoDB',err.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)




module.exports = app

