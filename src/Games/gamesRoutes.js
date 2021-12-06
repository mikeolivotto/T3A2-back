const express = require("express");

const routes = express.Router();

routes.get("/", async (request, response) => {});

routes.post("/", async (request, response) => {
    response.json({ message: "POST - game created" });
});

routes.put("/", async (request, response) => {
    response.json({ message: "PUT - game edited" });
});

routes.delete("/", async (request, response) => {
    response.json({ message: "DELETE - game deleted" });
});


module.exports = routes;
