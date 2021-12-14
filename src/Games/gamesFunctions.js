const { request } = require("express");
const {Game} = require("../database/schemas/gamesSchema");

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
        // groupID: requestBody.groupID,
        gameRules: requestBody.gameRules,
        players: requestBody.players,
        // datePlayed: requestBody.datePlayed
    });
    let newGameResult = await newGame.save();
    return newGameResult;

};

const updateGame = async (gameId, requestBody) => {
    let updatedGame = Game.updateOne(
        {_id: gameId},
        {$set: requestBody}
    )
    return updatedGame
};

module.exports = {
    getAllGames,
    getSpecificGame,
    createNewGame,
    updateGame
}