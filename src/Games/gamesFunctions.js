const { request } = require("express");
const { Game } = require("../database/schemas/gamesSchema");
const { getSpecificGroup } = require("../Groups/groupsFunctions")

// Returns All games from Game collection
const getAllGames = async () => {
    let allGames = await Game.find()
    return allGames
};

// Returns specific game from Game collection via query params
const getSpecificGame = async (gameId) => {
    let specificGame = await Game.findById(gameId).exec();
    return specificGame;
};

// Returns result of entering new game into Game collection based on body json.
const createNewGame = async (requestBody) => {
    let newGame = new Game({
        gameName: requestBody.gameName,
        groupId: requestBody.groupId,
        gameRules: requestBody.gameRules,
        players: requestBody.players,
        // datePlayed: requestBody.datePlayed
    });
    let newGameResult = await newGame.save();
    return newGameResult;

};

const updateGame = async (gameId, requestBody) => {
    let updatedGame = Game.updateOne(
        { _id: gameId },
        { $set: requestBody }
    )
    return updatedGame
};

async function getGamesByGroup(groupID) {
    let group = await getSpecificGroup(groupID)
    let id = group._id
    let groupGames = await Game.find({ groupID: id }); // Find games where "players" includes the specific player
    return groupGames;
}

module.exports = {
    getAllGames,
    getSpecificGame,
    createNewGame,
    updateGame,
    getGamesByGroup
}