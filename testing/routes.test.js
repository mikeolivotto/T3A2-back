const {app} = require("../src/index")
const request = require("supertest");

beforeEach(() => {
  setTestData();
});

afterEach(() => {
  clearTestData();
});

describe('Profiles routes', function() {
    it(' GET / responds with json & status 200', function(done) {
      request(app)
        .get('/profiles')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it("GET /:id responds with json & status 200", (done) => {
        request(app)
            .get('/profiles')
            .expect('Content-Type', /json/)
            .expect(200, done); 
    })
  });