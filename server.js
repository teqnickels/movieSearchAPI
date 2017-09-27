const express = require('express');
const app = express();
const bodyParser = require('body-parser')// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const rp = require('request-promise');
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/api/imdb/search/:movie', (request, response, next) => {
  response.set('content-type', 'application/json')

  const movie = request.params.movie
  const options = {
    uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${movie}&s=all`,
    transform: function (body) {
      return cheerio.load(body)
    }
  }
  console.log(movie)

  const resultPromise = rp(options);

  resultPromise.then(function ($) {
    cheerioTableparser($);
    var data = $('.findList').parsetable()
    var newArr = data.reduce((acc, cur) => acc.concat(cur), []);
    newArr = newArr.map((movie) => $(movie).text())
    newestArr = newArr.reduce((a, b) => {
      if (b.length <= 2) {
        return a
      } else {
        return a.concat(b)
      }
    }, [])
    let stuff = newestArr
    response.send(stuff);
  })

  resultPromise.catch(function (error) {
    console.log(error)
  })
})


app.listen(3000, () => {
  console.log('Server Working')
});