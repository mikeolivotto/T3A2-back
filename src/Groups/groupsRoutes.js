const express = require("express");
const {getAllGroups, createNewGroup, getSpecificGroup, updateSpecificGroup, deleteGroup} = require("./groupsFunctions");

const routes = express.Router();

routes.get("/", async (request, response) => {
    let groups = await getAllGroups()
    response.json(groups);
});

routes.post("/", async (request, response) => {
    let newGroup = await createNewGroup(request.body)
    response.json(newGroup);
});

routes.get("/:id", async (request, response) => {
    let groupResult = await getSpecificGroup(request.params.id)
    response.json(groupResult);
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
