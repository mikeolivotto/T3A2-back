const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    GroupName: String,
    AdminID: ObjectId,
    Members: Array,
})

const Group = mongoose.model("Game", groupSchema)

module.exports = {Group}