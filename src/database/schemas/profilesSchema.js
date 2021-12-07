const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    Username: {type: String, required: true},
    FirstName: String,
    LastName: String,
    Photo: String,
    FirebaseUserID: String
})

const Profile = mongoose.model("Game", profileSchema)

module.exports = {Profile}