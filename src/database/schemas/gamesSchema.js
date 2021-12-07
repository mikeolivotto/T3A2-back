const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({


})

const Game = mongoose.model("Game", gamesSchema)

module.exports = {Game}