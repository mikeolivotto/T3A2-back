const {app} = require("../src/index")
const request = require("supertest");
const {setTestData, clearTestData} = require('./testHelpers')

// let testId

// beforeAll(async () => {
//   let testDataResponse = await setTestData()
//   testId = testDataResponse._id.valueOf()
  
//   return testDataResponse
// });


// afterAll(() => {
//   clearTestData();
// });



describe('CRUD', function() {
    it(' GET /profiles/ responds with json & status 200', function(done) {
      request(app)
        .get('/profiles')
        .expect('Content-Type', /json/)
        .expect(200, done);
    }, 10000);

    it(' GET /group/ responds with json & status 200', function(done) {
      request(app)
        .get('/group')
        .expect('Content-Type', /json/)
        .expect(200, done);
    },10000);

    it(' GET /game/ responds with json & status 200', function(done) {
      request(app)
        .get('/game')
        .expect('Content-Type', /json/)
        .expect(200, done);
    },10000);
    
  });