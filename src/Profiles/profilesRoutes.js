const express = require("express");
const { getMultiFactorResolver } = require("firebase/auth");
const {
  createNewProfile,
  getSpecificProfile,
  signUpUser,
  signInUser,
  getAllProfiles
} = require("./profilesFunctions"); 

const routes = express.Router();

routes.post("/sign-up", async (request, response) => {
  let signUpDetails = {
    email: request.body.email,
    password: request.body.password,
  };

  let signUpResult = await signUpUser(signUpDetails);

  if (signUpResult.error != null) {
    console.log("Sign-up error");
    response.json(signUpResult);
    return;
  }

  let {uid, email} = signUpResult

  let newProfileDetails = {
    userName: request.body.userName,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    firebaseUserID: uid
  }


  console.log(newProfileDetails)

  let newProfile = await createNewProfile(newProfileDetails)

  if (newProfile.error != null) {
    console.log("New profile error");
    response.json(newProfile);
    return;
  }

  

  let signInResult = await signInUser(signUpDetails);

  if (signInResult.error != null) {
    console.log("Sign-in error");
    response.json(signInResult);
    return;
  }
  response.json([signUpResult, signInResult]);

});

routes.post("/sign-in", async (request, response) => {
  let existingProfileDetail = {
    email: request.body.email,
    password: request.body.password,
  };
  let signInResult = await signInUser(existingProfileDetail);

  response.json(signInResult);
});

routes.get("/", async (request, response) => {
  let allProfiles = await getAllProfiles()
  response.json(allProfiles);
});

routes.get("/:id", async (request, response) => {
  let profileResult = await getSpecificProfile(request.params.id);
  response.json(profileResult);
});

routes.post("/", async (request, response) => {
  console.log("route matched post profile");
  console.log(request.body);
  let postResult = await createNewProfile(request.body);
  response.json({ message: `POST - profile created: \n${postResult}` });
});

routes.put("/:id", async (request, response) => {
  response.json({
    message: `PUT - profile with id ${request.params.id} edited`,
  });
});

routes.delete("/:id", async (request, response) => {
  response.json({
    message: `DELETE - profile with id ${request.params.id} deleted`,
  });
});

module.exports = routes;
