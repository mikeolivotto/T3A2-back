const { Profile } = require("../database/schemas/profilesSchema");
const { Game } = require("../database/schemas/gamesSchema");
const { Group } = require("../database/schemas/groupsSchema")

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
  console.log(queryData)
  let newProfile = new Profile({
    username: queryData.username,
    firstName: queryData.firstName || null,
    lastName: queryData.lastName || null,
    firebaseUserID: queryData.firebaseUserID
  });
  let newProfileResult = await newProfile.save();
  return newProfileResult;
}

// async function updateProfile(queryData) {
//   let profile = new Profile({
//     username: queryData.userName,
//     firstName: queryData.firstName || null,
//     lastName: queryData.lastName || null,
//     firebaseUserID: queryData.firebaseUserID
//   });
//   let newProfileResult = await newProfile.save();
//   return newProfileResult;
// }


// The ".exec()" helps the query just run instead of saving it for re-use.
async function getSpecificProfile(profileID) {
  let specificProfileQuery = await Profile.findById(profileID).exec();
  return specificProfileQuery;
}

// returns array of games where the input profile is a player.
async function getGamesByProfile(profileID) {
  let profile = await getSpecificProfile(profileID)
  let id = profile._id
  let profileGames = await Game.find({ players: id }); // Find games where "players" includes the specific player
  return profileGames;
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
  getGamesByProfile
};
