const {app} = require("../src/index")
const request = require("supertest");
const {setTestData, clearTestData} = require('./testHelpers')

let testId

beforeAll(async () => {
  let testDataResponse = await setTestData()
  // let {_id} = testDataResponse
  testId = testDataResponse._id.valueOf()
  console.log(testDataResponse._id.valueOf())
  
  return testDataResponse
});


afterAll(() => {
  clearTestData();
});

// PROFILES ROUTES to test:
// POST /profiles/sign-up
// POST /profiles/sign-in
// GET /
// POST /
// GET /:id
// PUT /:id
// DELETE /:id (not MVP)


// GROUPS ROUTES to test:
// GET /
// GET /:id
// POST /
// PUT /:id
// DELETE /:id (not MVP)

// GAMES ROUTES to test:
// GET /
// GET /:id
// POST /
// PUT /:id
// DELETE /:id (not MVP)



describe('Profiles routes', function() {
    it(' GET /profiles/ responds with json & status 200', function(done) {
      request(app)
        .get('/profiles')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it("GET /profiles/:id responds with json & status 200", (done) => {
        request(app)
            .get(`/profiles/${testId}`)
            .expect('Content-Type', /json/)
            .expect(200, {
              _id: testId,
              username: "blah",
              firstName: "Testy",
              lastName: "McTestFace",
              __v: 0
            }, done); 
    })
  });