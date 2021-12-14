const express = require("express");
const {getAllGroups, createNewGroup} = require("./groupsFunctions");

const routes = express.Router();

routes.get("/", async (request, response) => {
    let groups = await getAllGroups()
    // response.json({ message: "GET - all groups" });
    response.json(groups);
});

routes.get("/:id", async (request, response) => {
    response.json({ message: `GET - group with id ${request.params.id}` });
});




routes.post("/", async (request, response) => {
    let newGroup = await createNewGroup(request.body)
    response.json({ message: `POST - group created: \n ${newGroup}` });
});

routes.put("/:id", async (request, response) => {
    response.json({ message: `PUT - group with id ${request.params.id} edited` });
});

routes.delete("/:id", async (request, response) => {
    response.json({ message: `DELETE - group with id ${request.params.id} deleted` });
});

module.exports = routes;
