const { ObjectID, ObjectId } = require("bson");
const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
  gameName: String,
  groupId: ObjectId,
  gameRules: Object,
  players: Array,
  datePlayed: Date,
});

const Game = mongoose.model("Game", gamesSchema);

module.exports = { Game };
