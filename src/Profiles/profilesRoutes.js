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
  tokenAuth,
  checkUnique
} = require("./profilesFunctions"); 

const {getJoinedGroupsByProfile, getAdminGroupsByProfile} = require("../Groups/groupsFunctions")

const routes = express.Router();

// SIGN UP - NB: FRONT END MUST REQUEST userName, firstName, lastName
routes.post("/sign-up", async (request, response) => {
  console.log("hit /sign-up route <-------------")
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
  response.json([signInResult, [newProfile]]);

});

// SIGN IN TO A PROFILE
routes.post("/sign-in", async (request, response) => {
  let existingProfileDetail = {
    email: request.body.email,
    password: request.body.password,
  };
  let signInResult = await signInUser(existingProfileDetail);
  
  // uses admin sdk to decode idToken JWT that is returned from signInUser and query database for profile matching uid
  console.log("checking token Validity")
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
  let allUsernames = []
  allProfiles.map(username => allUsernames.push(username.username))
  response.json({usernames: allUsernames});
});

// GET a boolean response based on uniqueness of input username
routes.get("/unique", async (request, response) => {
  console.log("Hit /unique route <-----------------")
  let username = request.body.username;
  console.log(username)
  let unique = await checkUnique(username)
  if (unique) {
    response.json({unique: true})
  } else {
    response.json({unique: false})
  }
})

// GET A SPECIFIC PROFILE
routes.get("/:id", async (request, response) => {
  console.log("hit the profile/:id route <================")
  // verify the id token
  let userProfile = await tokenAuth(request.headers.authorization)
  console.log(userProfile)

  // if token verified, check the user id matches the parameter id to get profile data
  if (request.params.id === userProfile[0]._id.toString()) {
    let profileResult = await getSpecificProfile(request.params.id);
    let games = await getGamesByProfile(userProfile[0].username);
    let groups = await getJoinedGroupsByProfile(request.params.id)
    let adminOf = await getAdminGroupsByProfile(request.params.id)
  
    response.json([
      profileResult,
      games,
      groups, // groups user is a part of but NOT an admin
      adminOf, // groups user in admin of
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
