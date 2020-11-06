require('module-alias/register')

const config = require('@config')
const express = require('express')
const serveClocData = require('@controllers/cloc')
const responder = require('./HTTP/Responder')

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()
app.get('/', (req, res) => {
  res.send('Hello World 4')
})

app.get('/cloc', (req, res) => {
  serveClocData({
    resp: responder(res),
    params: req.query,
  })
})


app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
