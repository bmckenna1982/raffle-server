require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const TicketService = require('./ticket-service')

// const bodyParser = require('body-parser')
const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
const bodyParser = express.json()

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/api/tickets', (req, res, next) => {
  console.log(req.app)
  TicketService.getTickets(req.app.get('db'))
    .then(tickets => {
      if (!tickets) {
        return res.status(404).send('No tickets not found');
      }
      console.log('tickets', tickets);
      res.json(tickets);
    })
    .catch(next)
})

app.post('/api/tickets', bodyParser, (req, res, next) => {
  console.log('add ticket', req)
  TicketService.addTicket(req.app.get('db'), req.body)
    .then(ticket => {
      if(!ticket) {
        return res.status(404).send('Ticket not posted successfully');
      }
      console.log('ticket', ticket);
      res.json(ticket);
    })
    .catch(next)
})

app.use(function errorHandler(error, req, res, next) {
  let response
    console.error(error)
    response = { message: error.message, error }
  res.status(500).json(response)
})

module.exports = app