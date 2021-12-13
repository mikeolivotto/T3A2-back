const {createNewProfile} = require('../src/Profiles/profilesFunctions')

const setTestData = () => {
    let testProfile = {
        username: "Test Username",
        firstName: "Testy",
        lastName: "McTestFace",
    }
    createNewProfile(testProfile)
}

const clearTestData = () => {

};
