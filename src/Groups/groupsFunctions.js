const {Group} = require("../database/schemas/groupsSchema")

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
        {_id: groupId},
        // update/set the group object with all the query data
        { $set: requestBody }
    )
    return updatedGroup
}

async function deleteGroup(groupId) {
    let deletedGroup = await Group.deleteOne({"_id": groupId})
    return deletedGroup
}


module.exports = {getAllGroups, createNewGroup, getSpecificGroup, updateSpecificGroup, deleteGroup} 