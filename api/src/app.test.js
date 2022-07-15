const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

describe('baseline test', () => {
  test('should return a message saying that the API is running', () => {
    request(app)
        .get('/')
        .expect(200, "Taskify API is reachable, navigate to proper endpoint")
        .end((err) => {
          if (err) throw err;
          done();
        })
  })
})