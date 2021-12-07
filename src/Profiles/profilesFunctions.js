const {Profile} = require("../database/schemas/profilesSchema");

async function createNewProfile(queryData){
    let newProfile = new Profile({
        username: queryData.username
    });
    let newProfileResult = await newProfile.save()
    return newProfileResult
};

module.exports ={
    createNewProfile
}