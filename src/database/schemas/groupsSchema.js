const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupName: String,
    adminID: ObjectId,
    members: Array,
})

const Group = mongoose.model("Groups", groupSchema)

module.exports = {Group}