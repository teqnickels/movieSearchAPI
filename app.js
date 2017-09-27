const express = require('express');
const app = express();
const bodyParser = require('body-parser')// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const scrape = require('./scrape')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response, next) => {
  response.send('Hello World!')
})

 app.get('/api/imdb/search/:movie', (request, response, next) => {
  response.set('content-type', 'application/json')
  let movie = request.params.movie
  scrape(movie).then((result) => {
    response.send(result)
  })
})
module.exports = app