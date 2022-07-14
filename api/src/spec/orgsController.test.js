const request = require('supertest');
const { orgsRoutes } = require("../routes/index.js");
const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);
const express = require('express');
const app = express();
app.use(express.json());

jest.useFakeTimers();
jest.setTimeout(10 *1000);

knex.raw("SELECT VERSION()")
  .catch(err => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
    return;
  })

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