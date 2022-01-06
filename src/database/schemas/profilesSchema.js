const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    username: {type: String, required: true},
    firstName: String,
    lastName: String,
    photo: String,
    firebaseUserID: String
})

const Profile = mongoose.model("Profiles", profileSchema)

module.exports = { Profile }