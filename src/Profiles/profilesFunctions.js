const {Profile} = require("../database/schemas/profilesSchema");

async function createNewProfile(queryData){
    let newProfile = new Profile({
        username: queryData.username
    });
    let newProfileResult = await newProfile.save()
    return newProfileResult
};


// The ".exec()" helps the query just run instead of saving it for re-use.
async function getSpecificProfile(profileID){
    let specificProfileQuery = await Profile.findById(profileID).exec();
    return specificProfileQuery;
}

module.exports ={
    createNewProfile, getSpecificProfile
}