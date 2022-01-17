const { server } = require("../src/index")
const request = require("supertest");
const mongoose = require("mongoose");
const { setTestData, clearTestData, logInTest, closeDbConnection } = require('./testHelpers')



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



describe('CRUD routes', function () {

  let uid;
  let idToken;
  let profileId;

  beforeAll(async () => {
    const logInResponse = await setTestData()
    console.log(logInResponse.profileData)
    uid = logInResponse.profileData.firebaseUserID
    idToken = logInResponse.idToken
    profileId = logInResponse.profileData._id
    return logInResponse
  });

  afterAll( async (done) => {
    clearTestData(uid).then(() => {
      closeDbConnection().then(connectionStatus => {
        done()
        server.close()
      })
    });
  });

  describe("Profile Routes", function () {

    it(' GET /profiles/ responds with json & status 200', function (done) {
      request(app)
        .get('/profiles')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it("POST /profiles/sign-in responds with sign-in result and profileData", async function () {
      const response = await request(app)
        .post("/profiles/sign-in")
        .send({ email: "supertesting6@email.com", password: "testing" })

      expect(response.statusCode).toEqual(200);
      expect(response.body.length).toEqual(2);
      expect(response.body[0].idToken).toBeTruthy();
    }, 10000)

    it("GET /profiles/ responds with all usernames of profiles", async () => {
      const response = await request(app)
        .get("/profiles/")
      
      expect(response.statusCode).toEqual(200);
      expect(response.body.usernames).toBeTruthy();
      expect(response.body.usernames).toContain("supertesting6");
    
    }, 10000)

  })

  // describe("Group Routes", function () {
  //   it("POST /group/ responds with json of newly created group", async () => {
  //     const response = await request(app)
  //       .post("/group/")
  //       .set("authorization", idToken)
  //       .send({
  //         groupName: "super group",
  //         adminId: profileId,
  //         joinCode: "testcode",
  //         members: ["supertesting5"],
  //         pendingMembers: []
  //       })
  //     expect(response.statusCode).toEqual(200);
  //   }, 10000)

  // });

  // describe("Game Routes", function () {

  // });

});