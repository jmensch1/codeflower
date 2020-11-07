////////////////////// IMPORTS /////////////////////////

const express = require('express')
const cors = require('cors')
const http = require('http')
const config = require('@config')

////////////////////// PRIVATE /////////////////////////

function createServer(server) {
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.get('*', server)
  app.post('*', server)

  app.use((req, res, next) => {
    res.send({
      type: config.responseTypes.error,
      data: config.errors.MethodNotAllowed,
    })
  })

  app.use((err, req, res, next) => {
    res.send({
      type: config.responseTypes.error,
      data: config.errors.ParseError,
    })
  })

  return http.createServer(app)
}

////////////////////// EXPORTS /////////////////////////

module.exports = createServer
