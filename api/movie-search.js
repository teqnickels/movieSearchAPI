const rp = require('request-promise');
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser');
const http = require('http')
const searchTerm = process.argv[2]
const fs = ('fs')

const options = {
  uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchTerm}&s=all`,
  transform: function (body) {
    return cheerio.load(body)
  }
}

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
  return format(newestArr)
}).then(stuff => {
  //THIS IS WHERE I HANDLED THE LOGIC OF THE RESOLUTION OF MY FUNC.
  console.log(stuff);
})

resultPromise.catch(function (error) {
  console.log(error)
})


var format = (array) => {
  let str = ''
  for (var i = 0; i < array.length; i++) {
    str += array[i] + '\n'
  }
  // console.log(str);
  return str
}

// if(require.main === module) {
//   search(searchTerm, () => {})
// }

// module.exports = search
