const express = require("express");
const {getAllGroups, createNewGroup, getSpecificGroup, updateSpecificGroup, deleteGroup} = require("./groupsFunctions");

const {
    tokenAuth
  } = require("../Profiles/profilesFunctions"); 

const routes = express.Router();

// COMMENT OUT THIS CODE BEFORE PRODUCTION
routes.get("/", async (request, response) => {
    let groups = await getAllGroups()
    response.json(groups);
});


routes.post("/", async (request, response) => {
    // check that user is logged in - can only create group if a valid user
    let userProfile = await tokenAuth(request.headers.bearer)

    // check admin id passed in from react state === auth user id
    if (request.body.adminId === userProfile[0]._id.toString()){
        let newGroup = await createNewGroup(request.body)
        response.json(newGroup);
    } else {
        response.json({message: "You are not authorised to create a group"})
    }


});

routes.get("/:id", async (request, response) => {
    // get specific group only if you belong to that group
    let userProfile = await tokenAuth(request.headers.authorization)

    let groupResult = await getSpecificGroup(request.params.id)
 
    // check if current user is admin || member, return group data
    if ((groupResult.adminId.toString() === userProfile[0]._id.toString()) || groupResult.members.includes(userProfile[0]._id.toString())) {
        response.json(groupResult);
    } else {
        response.json({message: "You are not authorised to get a group"})
    }


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
