const server = require('./server')
const rp = require('request-promise');
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser');

const scrape = (movie) => {
  const options = {
    uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${movie}&s=all`,
    transform: function (body) {
      return cheerio.load(body)
    }
  }

  const resultPromise = rp(options);
  return resultPromise
  .then(function ($) {
    cheerioTableparser($);
    var data = $('.findList').parsetable()
    var newArr = data.reduce((acc, cur) => acc.concat(cur), []);
    newArr = newArr.map((movie) => $(movie).text())
    newArr = newArr.reduce((a, b) => {
      if (b.length <= 2) {
        return a
      } else {
        return a.concat(b)
      }
    }, [])
    let stuff = newArr
    return stuff
  })
  resultPromise.catch(function (error) {
    console.log(error)
  })
}
module.exports = scrape