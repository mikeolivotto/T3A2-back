const express = require("express");
const routes = express.Router();

routes.get("/", async (request, response) => {
  response.json({ message: "This is all the profiles" });
});

routes.post("/", async (request, response) => {
  response.json({ message: "POST - profile created" });
});

routes.put("/", async (request, response) => {
  response.json({ message: "PUT - profile edited" });
});

routes.delete("/", async (request, response) => {
  response.json({ message: "DELETE - profile deleted" });
});

module.exports = routes;
