const express = require("express");
const { getSpecificGroup } = require("../Groups/groupsFunctions");
const {
  getAllGames,
  getSpecificGame,
  createNewGame,
  updateGame,
  getGamesByGroup,
} = require("./gamesFunctions");
const { tokenAuth } = require("../Profiles/profilesFunctions")

const routes = express.Router();
// Get all Games
routes.get("/", async (request, response) => {
  let allGamesResults = await getAllGames();
  response.json(allGamesResults);
});


// Create New Game
routes.post("/", async (request, response) => {
  let userProfile = await tokenAuth(request.headers.authorization);
  
  // check if player is part of the group
  let specificGroup = await getSpecificGroup(request.body.groupId);
  if (
    // specificGroup.members.includes(userProfile[0]._id.toString()) || specificGroup.adminId.toString() === userProfile[0]._id.toString()
    specificGroup.members.includes(userProfile[0].username)
    ) {
      let newGameResult = await createNewGame(request.body);
      response.json(newGameResult);
    } else {
      response.json({
        message: "You cannot create a game, as you are not a part of the group",
      });
    }
  });
  
// Get Specific Game
routes.get("/:id", async (request, response) => {
  let userProfile = await tokenAuth(request.headers.authorization);

  let specificGameResult = await getSpecificGame(request.params.id);
  
  //check if user profile is included in players
  if (specificGameResult.players.includes(userProfile[0].username)) {
    response.json(specificGameResult);
  } else {
    response.json({ message: "You're not a player in this game" });
  }
});

// Edit Game
routes.put("/:id", async (request, response) => {
  let updatedGameResult = await updateGame(request.params.id, request.body);
  response.json(updatedGameResult);
});

routes.delete("/:id", async (request, response) => {
  response.json({
    message: `DELETE - game with id ${request.params.id} deleted`,
  });
});

module.exports = routes;
