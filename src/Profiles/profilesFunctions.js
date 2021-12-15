const { Profile } = require("../database/schemas/profilesSchema");

const firebaseClient = require("firebase/app");
firebaseClient.initializeApp(JSON.parse(process.env.CLIENT_KEY_FIREBASE));
const firebaseAdmin = require("firebase-admin");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

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

async function getAllProfiles() {
  let allProfiles = await Profile.find()
  return allProfiles
}

async function createNewProfile(queryData) {
  let newProfile = new Profile({
    username: queryData.userName,
    firstName: queryData.firstName || null,
    lastName: queryData.lastName || null,
    firebaseUserID: queryData.firebaseUserID
  });
  let newProfileResult = await newProfile.save();
  return newProfileResult;
}

// The ".exec()" helps the query just run instead of saving it for re-use.
async function getSpecificProfile(profileID) {
  let specificProfileQuery = await Profile.findById(profileID).exec();
  return specificProfileQuery;
}

async function signInUser(queryData) {
  const firebaseClientAuth = getAuth();

  let signInResult = signInWithEmailAndPassword(
    firebaseClientAuth,
    queryData.email,
    queryData.password
  ).then(async (userCredential) => {
    let userIdToken = await firebaseClientAuth.currentUser.getIdTokenResult(
      false
    );
    // console.log(`userIdToken is \n ${JSON.stringify(userIdToken)}`);
    return {
      idToken: userIdToken.token,
      refreshToken: userCredential.user.token,
      email: userCredential.user.email,
      emailVerified: userCredential.user.emailVerified,
      userName: userCredential.user.userName,
      uid: userCredential.user.id,
    };
  });
  return signInResult;
}

module.exports = {
  createNewProfile,
  getAllProfiles,
  getSpecificProfile,
  signUpUser,
  signInUser,
};
