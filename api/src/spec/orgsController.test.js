const request = require('supertest');
const { orgsRoutes } = require("../routes/index.js");

const express = require('express');
const app = express();
app.use(express.json());






describe("Orgs endpoint", () => {
  beforeAll(() => {
    app.use('/', orgsRoutes);
  });
  describe('/orgs', () => {
    test('GET: should respond with a 200 and a content-type of json', (done) => {
      request(app)
        .get('/orgs')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) throw err;
          done();
        })
    })
  });

  afterAll(() => {
    app.listen().close();
  });
})