const express = require("express");
const { getAllGames, getSpecificGame, createNewGame, updateGame } = require("./gamesFunctions");

const routes = express.Router();
// Get all Games
routes.get("/", async (request, response) => {
    let allGamesResults = await getAllGames();
    response.json(allGamesResults);
});
// Get Specific Game
routes.get("/:id", async (request, response) => {
    let specificGameResult = await getSpecificGame(request.params.id);
    response.json(specificGameResult);
});
// Create New Game
routes.post("/", async (request, response) => {
    let newGameResult = await createNewGame(request.body);
    response.json(newGameResult);
});
// Edit Game
routes.put("/:id", async (request, response) => {
    let updatedGameResult = await updateGame(request.params.id, request.body);
    response.json(updatedGameResult);
});

routes.delete("/:id", async (request, response) => {
    response.json({ message: `DELETE - game with id ${request.params.id} deleted` });
});


module.exports = routes;
