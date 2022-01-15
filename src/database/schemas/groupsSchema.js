const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupName: String,
    adminId: ObjectId,
    joinCode: String,
    members: Array,
    pendingMembers: Array
})

const Group = mongoose.model("Groups", groupSchema)

module.exports = {Group}