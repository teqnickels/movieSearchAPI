const chai = require('chai')
const { assert, expect } = require('chai'),
chaiHTTP = require('chai-http')
const server = require('../server')
const http = require('http')

chai.use(chaiHTTP);

describe('server', () => {
  context('homepage, onload', () => {
    it('Should respond with a status code of 200', (done) => {
      chai.request('http://localhost:3000')
      .get('/api/imdb/search/superman')
      .end((error, response) => {
        expect(response).to.have.status(200)
        expect(response).to.have.header('content-type', 'application/json; charset=utf-8')
        expect(JSON.parse(response.text)).to.deep.equal([' Mary (Three-Fingered Kate: The Case of the Chemical Fumes (1912))',
          ' Mary (The Adventures of Little Lord Fauntleroy (1982))',
          ' Mary [it] (Production) ',
          ' Primary Wave Entertainment [us] (Management) ',
          ' Mary Elizabeth Winstead (Actress, 10 Cloverfield Lane (2016))',
          ' Meredith Anne Bull (Actress, Strange Magic (2015)) nickname "Mary" ',
          ' Mary Allin Travers (Self, 50 Years with Peter Paul and Mary (2014))',
          ' Gifted (2017) aka "Mary" ',
          ' Mary (III) ',
          ' Mary (I) (2005) '])
          done()
        })
    })
  })
})
