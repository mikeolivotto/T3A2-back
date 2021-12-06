const express = require("express");

const routes = express.Router();

routes.get("/", async (request, response) => {});

routes.post("/", async (request, response) => {
    response.json({ message: "POST - group created" });
});

routes.put("/", async (request, response) => {
    response.json({ message: "PUT - group edited" });
});

routes.delete("/", async (request, response) => {
    response.json({ message: "DELETE - group deleted" });
});

module.exports = routes;
