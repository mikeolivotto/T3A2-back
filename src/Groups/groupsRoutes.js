const express = require("express");
const {getAllGroups, createNewGroup, getSpecificGroup, updateSpecificGroup, deleteGroup, getGamesByGroup, checkJoinCodeUnique, getGroupByJoinCode} = require("./groupsFunctions");

const {
    tokenAuth
  } = require("../Profiles/profilesFunctions"); 

const routes = express.Router();

// COMMENT OUT THIS CODE BEFORE PRODUCTION
routes.get("/", async (request, response) => {
    let groups = await getAllGroups()
    response.json(groups);
});

// POST - Create new group
routes.post("/", async (request, response) => {
    // check that user is logged in - can only create group if a valid user
    let userProfile = await tokenAuth(request.headers.authorization)

    // Validation check for joinCode uniqueness
    let uniqueJoinCode = await checkJoinCodeUnique(request.body.joinCode)
    if (!uniqueJoinCode) return response.json({message: "Join code is not unqiue, please choose another"});


    // check admin id passed in from react state === auth user id
    if (request.body.adminId === userProfile[0]._id.toString()){
        let newGroup = await createNewGroup(request.body)
        response.json(newGroup);
    } else {
        response.json({message: "You are not authorised to create a group"})
    }

});

// PUT - update group with member via joincode.
routes.put("/join", async (request, response) => {
    // Validate token and return error message if invalid
    let userProfile = await tokenAuth(request.headers.authorization);
    if (!userProfile) return response.json({message: "Invalid Credentials, Please sign-in"});

    // Get group via joincode, return error if user is already a member of group
    let groupMatch = await getGroupByJoinCode(request.body.joinCode);
    if (groupMatch.members.includes(userProfile[0].username)) return response.json({message: "Error: You are already a member of this group"});

    // if successful joinCode match, add username to members and update group, else could not find group error message.
    if (groupMatch) {
        let groupId = groupMatch._id;
        groupMatch.members.push(String(userProfile[0].username));
        let updatedGroup = await updateSpecificGroup(groupId,groupMatch);
        response.json({groupId: groupId});
    } else {
        response.json({message: "Error: Could not find group using that join code"});
    }
    
});

routes.get("/:id", async (request, response) => {
    // get specific group only if you belong to that group
    let userProfile = await tokenAuth(request.headers.authorization)

    let groupResult = await getSpecificGroup(request.params.id)
    let games = await getGamesByGroup(request.params.id)
    let userId = userProfile[0]._id.toString()
    let username = userProfile[0].username

    // check if current user is member || pendingMember, return group data
    if (groupResult.members.includes(username) || groupResult.pendingMembers.includes(username)) {
        response.json(groupResult);
    } else {
        response.json({message: "You are not authorised to get a group"})
    }
});

routes.get("/:id/games", async (request, response) => {
    // get specific group only if you belong to that group

    let games = await getGamesByGroup(request.params.id)
    response.json(games);

});


routes.put("/:id", async (request, response) => {
    
    let groupResult = await updateSpecificGroup(request.params.id, request.body.groupDetails)

 
    response.json({ message: `SUCCESS: PUT - group with id`,
                    groupDetails: groupResult });

});


// DISABLING THE DELETE ROUTE UNTIL DELETE PERMISSIONS ARE ENABLED

// routes.delete("/:id", async (request, response) => {
//     let deleteResult = await deleteGroup(request.params.id)
//     response.json({ message: `DELETE - group with id ${request.params.id} deleted` });
// });

module.exports = routes;
