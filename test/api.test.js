const request = require('supertest');

const app = require('../src/app');

const mongodb = require('../src/helpers/mongodb');
const { expect } = require('chai')

beforeEach(() => {
  mongodb.connect();
});

describe('GET /api/v1/records/filter', () => {
  it('request with invalid params', (done) => {
    request(app)
      .post('/api/v1/records/filter')
      .set('Accept', 'application/json')
      .send({
        startDate: '',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: ''
      })
      .then(response => {
        expect(response.statusCode).to.equal(400);
        expect(response.body.code).to.equal(5);
        done();
      })

  });
});

describe('GET /api/v1/records/filter', () => {
  it('request with another invalid params', (done) => {
    request(app)
      .post('/api/v1/records/filter')
      .set('Accept', 'application/json')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 2500
      })
      .then(response => {
        expect(response.statusCode).to.equal(400);
        expect(response.body.code).to.equal(5);
        done();
      })

  });
});

describe('GET /api/v1/records/filter', () => {
  it('request with a valid params', (done) => {
    request(app)
      .post('/api/v1/records/filter')
      .set('Accept', 'application/json')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000
      })
      .then(response => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.code).to.equal(0);
        done();
      });

  });
});
