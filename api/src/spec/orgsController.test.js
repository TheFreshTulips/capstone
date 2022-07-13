const request = require('supertest');
const { orgsRoutes } = require("../routes/index.js");

const express = require('express');
const app = express();
app.use(express.json());

describe("all orgs endpoints", () => {
  beforeAll(() => {
    app.use('/', orgsRoutes);
  });
  describe('/orgs', () => {
    test('GET: should return a list of orgs', async (done) => {
      await request(app)
        .get('/orgs')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          done();
        })
    })

    afterAll(() => {
      app.listen().close();
    });

  });
})