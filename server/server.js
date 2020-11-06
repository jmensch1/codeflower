require('module-alias/register')

const express = require('express')
const cors = require('cors')
const config = require('@config')
const responder = require('./HTTP/Responder')
const connPool = require('@util/connectionPool')(process.pid)
const ctrl = require('@controllers')

const PORT = config.ports.HTTP

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World 4')
})

app.get('/ping', (req, res) => {
  ctrl.ping({
    resp: responder(res)
  })
})

app.get('/cloc', (req, res) => {
  ctrl.cloc({
    resp: responder(res),
    params: req.query,
    uid: connPool.addConn(),
  })
})

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
})
