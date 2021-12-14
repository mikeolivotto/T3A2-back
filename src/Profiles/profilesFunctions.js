const { Profile } = require("../database/schemas/profilesSchema");

const firebaseClient = require("firebase/app");
firebaseClient.initializeApp(JSON.parse(process.env.CLIENT_KEY_FIREBASE));
const firebaseAdmin = require("firebase-admin");

async function signUpUser(userDetails) {
  return firebaseAdmin
    .auth()
    .createUser({
      email: userDetails.email,
      password: userDetails.password,
      emailVerified: true,
    })
    .then(async (UserRecord) => {
      return UserRecord;
    })
    .catch((error) => {
      console.log(`Internal function error is: ${error}`);
      return { error: error };
    });
}

async function createNewProfile(queryData) {
  let newProfile = new Profile({
    username: queryData.username,
    firstName: queryData.firstName || null,
    lastName: queryData.lastName || null
  });
  let newProfileResult = await newProfile.save();
  return newProfileResult;
}

// The ".exec()" helps the query just run instead of saving it for re-use.
async function getSpecificProfile(profileID) {
  let specificProfileQuery = await Profile.findById(profileID).exec();
  return specificProfileQuery;
}

module.exports = {
  createNewProfile,
  getSpecificProfile,
  signUpUser,
};
