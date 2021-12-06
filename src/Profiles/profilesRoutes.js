const express = require("express");
const routes = express.Router();

routes.get("/", async (request, response) => {
  response.json({ message: "GET - all profiles" });
});

routes.get("/:id", async (request, response) => {
  response.json({ message: `GET - profile with id ${request.params.id}` });
});

routes.post("/", async (request, response) => {
  response.json({ message: "POST - profile created" });
});

routes.put("/:id", async (request, response) => {
  response.json({ message: `PUT - profile with id ${request.params.id} edited` });
});

routes.delete("/:id", async (request, response) => {
  response.json({ message: `DELETE - profile with id ${request.params.id} deleted` });
});

module.exports = routes;
