const express = require("express");
const routes = express.Router();

routes.get("/", async (request, response) => {
  response.json({ message: "This is all the profiles" });
});

module.exports = routes;
