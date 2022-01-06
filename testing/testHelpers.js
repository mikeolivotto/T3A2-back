const { Profile } = require('../src/database/schemas/profilesSchema');
const {createNewProfile} = require('../src/Profiles/profilesFunctions')

const setTestData = async () => {
    let testProfile = {
        userName: "blah",
        firstName: "Testy",
        lastName: "McTestFace",
        // firebaseUserID: "yNR9dQYWZZMLDgAiw2cuSlO5g8r1"
    }

    let response = await createNewProfile(testProfile)
    return response
}

const clearTestData = () => {
    Profile.collection.drop()
};


module.exports = {setTestData, clearTestData}