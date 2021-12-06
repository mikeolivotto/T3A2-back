const express = require("express");

const routes = express.Router();

routes.get("/", async (request, response) => {
    response.json({ message: "GET - all games" });
});

routes.get("/:id", async (request, response) => {
    response.json({ message: `GET - game with id ${request.params.id}` });
});

routes.post("/", async (request, response) => {
    response.json({ message: "POST - game created" });
});

routes.put("/:id", async (request, response) => {
    response.json({ message: `PUT - game with id ${request.params.id} edited` });
});

routes.delete("/:id", async (request, response) => {
    response.json({ message: `DELETE - game with id ${request.params.id} deleted` });
});


module.exports = routes;
