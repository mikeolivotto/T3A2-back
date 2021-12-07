const express = require("express");
const { createNewProfile, getSpecificProfile } = require("./profilesFunctions")
const routes = express.Router();

routes.get("/", async (request, response) => {
  response.json({ message: "GET - all profiles" });
});

routes.get("/:id", async (request, response) => {
  let profileResult = await getSpecificProfile(request.params.id)
  response.json(profileResult);
});

routes.post("/", async (request, response) => {
    console.log("route matched post profile")
    console.log(request.body)
    let postResult = await createNewProfile(request.body)
  response.json({ message: `POST - profile created: \n${postResult}` });
});

routes.put("/:id", async (request, response) => {
  response.json({ message: `PUT - profile with id ${request.params.id} edited` });
});

routes.delete("/:id", async (request, response) => {
  response.json({ message: `DELETE - profile with id ${request.params.id} deleted` });
});

module.exports = routes;
