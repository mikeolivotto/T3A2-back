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


module.exports = {getAllGroups, createNewGroup} 