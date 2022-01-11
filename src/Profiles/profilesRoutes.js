const express = require("express");
const firebaseAdmin = require("firebase-admin")
const { getMultiFactorResolver, getAuth } = require("firebase/auth");
const { Profile } = require("../database/schemas/profilesSchema");
const {
  createNewProfile,
  getSpecificProfile,
  signUpUser,
  signInUser,
  getAllProfiles,
  getGamesByProfile,
  tokenAuth
} = require("./profilesFunctions"); 

const {getJoinedGroupsByProfile, getAdminGroupsByProfile} = require("../Groups/groupsFunctions")

const routes = express.Router();

// SIGN UP - NB: FRONT END MUST REQUEST userName, firstName, lastName
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
    username: request.body.username,
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

// SIGN IN TO A PROFILE
routes.post("/sign-in", async (request, response) => {
  let existingProfileDetail = {
    email: request.body.email,
    password: request.body.password,
  };
  let signInResult = await signInUser(existingProfileDetail);
  
  // uses admin sdk to decode idToken JWT that is returned from signInUser and query database for profile matching uid
  let userProfile = await tokenAuth(signInResult.idToken)

  if(userProfile) {
    response.json([signInResult, userProfile]);
  } else {
    response.json({message: "Invalid ID token"})
  }
  
});

// GET ALL PROFILES
routes.get("/", async (request, response) => {
  let allProfiles = await getAllProfiles()
  response.json(allProfiles);
});

// GET A SPECIFIC PROFILE
routes.get("/:id", async (request, response) => {
  // verify the id token
  let userProfile = await tokenAuth(request.headers.authorization)
  console.log(userProfile)

  // if token verified, check the user id matches the parameter id to get profile data
  if (request.params.id === userProfile[0]._id.toString()) {
    let profileResult = await getSpecificProfile(request.params.id);
    let games = await getGamesByProfile(request.params.id);
    let groups = await getJoinedGroupsByProfile(request.params.id)
    let adminOf = await getAdminGroupsByProfile(request.params.id)

    response.json([
      profileResult,
      games,
      groups,
      adminOf
    ])
    // else send some kind of rejection
  } else {
    response.json({message: "You are not authorised to access that profile"})
  }




});

// UPDATE A SPECIFIC PROFILE
// routes.put("/:id", async (request, response) => {
//   let profile = await getSpecificProfile(request.params.id);
//   updateProfile(profile, request) //need to create an updateProfile helper function for this to work
//   response.json({
//     message: `PUT - profile with id ${request.params.id} updated`,
//   });
// });

// DELETE A SPECIFIC PROFILE
// routes.delete("/:id", async (request, response) => {
//   response.json({
//     message: `DELETE - profile with id ${request.params.id} deleted`,
//   });
// });

// GET A SPECIFIC PROFILE'S ASSOCIATED GAMES - DEACTIVATING UNTIL A SPECIFIC ROUTE IS NECESSARY
// routes.get("/:id/games", async (request, response) => {
//   let games = await getGamesByProfile(request.params.id);
//   response.json(games);
// });

module.exports = routes;
