const { Profile } = require('../src/database/schemas/profilesSchema');
const firebaseAdmin = require("firebase-admin")
const {createNewProfile, signUpUser, signInUser} = require('../src/Profiles/profilesFunctions');
const mongoose = require('mongoose');

const setTestData = async () => {
    let signUpData = {
        email: "supertesting6@email.com",
        password: "testing"
    }
    let signUpResult = await signUpUser(signUpData)
        .catch(err => console.log(err));

    let signInResult = await signInUser(signUpData);

    let testProfile = {
        username: "supertesting6",
        firstName: "Testy",
        lastName: "McTestFace",
        firebaseUserID: signUpResult.uid
    }

    let profileResult = await createNewProfile(testProfile)
    // console.log(`${profileResult} < ============ profile result`)
    return {
        idToken: signInResult.idToken,
        profileData: profileResult
    }
}

const logInTest = async () => {

}

const clearTestData = async (uid) => {
    console.log(uid)
    Profile.collection.drop();
    firebaseAdmin.auth().deleteUser(uid);
};

const closeDbConnection = async () => {
    return mongoose.connection.close()
}


module.exports = {setTestData, clearTestData, logInTest, closeDbConnection}