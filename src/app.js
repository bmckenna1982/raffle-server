require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/api/tickets', (req, res) => {
  TicketService.getTickets(req.app.get('db'))
    .then(tickets => {
      if (!tickets) {
        return res.status(404).send('Latest comment not found');
      }
      console.log('tickets', tickets);
      res.json(tickets);
    })
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app