const { ObjectID, ObjectId } = require("bson");
const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
    GameName: String,
    GroupID: ObjectId,
    GameRules: Object,
    Players: Array,
    DatePlayed: Date
})

const Game = mongoose.model("Game", gamesSchema)

module.exports = {Game}