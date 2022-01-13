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

    let uniqueJoinCode = await checkJoinCodeUnique(request.body.joinCode)
    if (!uniqueJoinCode) return response.json({message: "Join code is not unqiue, please choose another"});


    // check admin id passed in from react state === auth user id
    if (request.body.adminId === userProfile[0]._id.toString()){
        let newGroup = await createNewGroup(request.body)
        console.log(`Join Token of new group = ${newGroup.joinCode}`)
        response.json(newGroup);
    } else {
        response.json({message: "You are not authorised to create a group"})
    }


});

// PUT - update group with member via joincode.
routes.put("/join", async (request, response) => {
    console.log("Hit group/join route <-------------------")
    let userProfile = await tokenAuth(request.headers.authorization);
    if (!userProfile) return response.json({message: "Invalid Credentials, Please sign-in"});

    let groupMatch = await getGroupByJoinCode(request.body.joinCode);
    
    if (groupMatch) {
        let groupId = groupMatch._id;
        groupMatch.members.push(String(userProfile[0]._id));
        let updatedGroup = await updateSpecificGroup(groupId,groupMatch);
        response.json(updatedGroup);
    } else {
        response.json({message: "Error: Could not find group using that join code"});
    }
    
});

routes.get("/:id", async (request, response) => {
    // get specific group only if you belong to that group
    let userProfile = await tokenAuth(request.headers.authorization)
    console.log(userProfile)

    let groupResult = await getSpecificGroup(request.params.id)
    let games = await getGamesByGroup(request.params.id)
 
    // // check if current user is admin || member, return group data
    if ((groupResult.adminId.toString() === userProfile[0]._id.toString()) || groupResult.members.includes(userProfile[0]._id.toString())) {
        response.json(groupResult);
    } else {
        response.json({message: "You are not authorised to get a group"})
    }
});

routes.get("/:id/games", async (request, response) => {
    // get specific group only if you belong to that group
    // let userProfile = await tokenAuth(request.headers.authorization)
    // console.log(userProfile)

    let games = await getGamesByGroup(request.params.id)
    response.json(games);

});


routes.put("/:id", async (request, response) => {
    let updateResult = await updateSpecificGroup(request.params.id, request.body)
    response.json({ message: `SUCCESS: PUT - group with id`,
                    groupDetails: updateResult });
});


// DISABLING THE DELETE ROUTE UNTIL DELETE PERMISSIONS ARE ENABLED

// routes.delete("/:id", async (request, response) => {
//     let deleteResult = await deleteGroup(request.params.id)
//     response.json({ message: `DELETE - group with id ${request.params.id} deleted` });
// });

module.exports = routes;
