import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'

chai.use(chaiHttp)
chai.should()

const expect = chai.expect

describe('API endpoints', () => {
  describe('GET /files/data', () => {
    it('should return an array of files data', (done) => {
      chai
        .request(app)
        .get('/files/data')
        .end((err, res) => {
          if (err) throw err
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })

    it('should return and object with particular file data', (done) => {
      chai
        .request(app)
        .get('/files/data?fileName=test1.csv')
        .end((err, res) => {
          if (err) throw err
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
    })
  })

  describe('GET /files/names', () => {
    it('should return an array of files names', (done) => {
      chai
        .request(app)
        .get('/files/names')
        .end((err, res) => {
          if (err) throw err
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })
})
