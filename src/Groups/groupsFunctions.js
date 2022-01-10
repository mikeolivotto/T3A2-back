const { Group } = require("../database/schemas/groupsSchema")

const {
    getSpecificProfile,
  } = require("../Profiles/profilesFunctions"); 

async function getAllGroups() {
    let allGroups = await Group.find()
    return allGroups
}

async function createNewGroup(queryData) {
    let newGroup = new Group({
        groupName: queryData.groupName,
        adminId: queryData.adminId,
        members: queryData.members
    })

    let newGroupResult = await newGroup.save();
    return newGroupResult
}

async function getSpecificGroup(groupId) {
    let specificGroupQuery = await Group.findById(groupId).exec()
    return specificGroupQuery
}

async function updateSpecificGroup(groupId, requestBody) {
    console.log(groupId)
    console.log(requestBody)
    let updatedGroup = await Group.updateOne(
        // find the group with the Group ID in the query data
        { _id: groupId },
        // update/set the group object with all the query data
        { $set: requestBody }
    )
    return updatedGroup
}

async function deleteGroup(groupId) {
    let deletedGroup = await Group.deleteOne({ "_id": groupId })
    return deletedGroup
}

// returns array of groups where the input profile is a member.
async function getJoinedGroupsByProfile(profileID) {
    let profile = await getSpecificProfile(profileID)
    let id = profile._id
    let profileJoinedGroups = await Group.find({ members: id }); // Find Groups where "members" includes the specific profile
    return profileJoinedGroups
}

// returns array of groups where input profile is the group admin
async function getAdminGroupsByProfile(profileID) {
    let profile = await getSpecificProfile(profileID)
    let id = profile._id
    let profileAdministeredGroups = await Group.find({ adminID: id });
    return profileAdministeredGroups
}


module.exports = { getAllGroups, createNewGroup, getSpecificGroup, updateSpecificGroup, deleteGroup, getJoinedGroupsByProfile, getAdminGroupsByProfile } 