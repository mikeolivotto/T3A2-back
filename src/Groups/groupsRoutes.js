const express = require("express");

const routes = express.Router();

routes.get("/", async (request, response) => {
    response.json({ message: "GET - all groups" });
});

routes.get("/:id", async (request, response) => {
    response.json({ message: `GET - group with id ${request.params.id}` });
});

routes.post("/", async (request, response) => {
    response.json({ message: "POST - group created" });
});

routes.put("/:id", async (request, response) => {
    response.json({ message: `PUT - group with id ${request.params.id} edited` });
});

routes.delete("/:id", async (request, response) => {
    response.json({ message: `DELETE - group with id ${request.params.id} deleted` });
});

module.exports = routes;
