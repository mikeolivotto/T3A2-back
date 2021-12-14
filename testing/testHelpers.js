const { Profile } = require('../src/database/schemas/profilesSchema');
const {createNewProfile} = require('../src/Profiles/profilesFunctions')

const setTestData = async () => {
    let testProfile = {
        username: "blah",
        firstName: "Testy",
        lastName: "McTestFace",
    }

    let response = await createNewProfile(testProfile)
    return response
}

const clearTestData = () => {
    Profile.collection.drop()
};


module.exports = {setTestData, clearTestData}