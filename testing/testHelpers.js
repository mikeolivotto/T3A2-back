const { Profile } = require('../src/database/schemas/profilesSchema');
const {createNewProfile} = require('../src/Profiles/profilesFunctions')

const setTestData = () => {
    let testProfile = {
        username: "blah",
        firstName: "Testy",
        lastName: "McTestFace",
    }
    createNewProfile(testProfile)
}

const clearTestData = () => {
    Profile.collection.drop()
};


module.exports = {setTestData, clearTestData}