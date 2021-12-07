// import and initialize express as app.
const express = require("express");
require('dotenv').config()

const app = express();

PORT = process.env.PORT || 3000;
HOST = "0.0.0.0";

// Import the database connection function
const { databaseConnector } = require('./database/database');
// Establish what the database URL is going to be
const DATABASE_URI = process.env.DATABASE_URI;
// Connect to the database using the URL
databaseConnector(DATABASE_URI).then(() => {
    console.log("Database connected successfully!");
}).catch(error => {
    console.log(`
    Some error occured connecting to the database! It was: 
    ${error}
    `)
});

// allows app to use 
app.use(express.json());
// Same as above but for form data
app.use(express.urlencoded({extended:true}));

app.get("/", (request, response) => {
  response.json({ message: "This is the home route" });
});

const importedProfileRouting = require("./Profiles/profilesRoutes");
app.use("/profiles", importedProfileRouting);

const importedGroupsRouting = require("./Groups/groupsRoutes");
app.use("/Groups", importedGroupsRouting);

const importedGamesRouting = require("./Games/gamesRoutes");
const { request } = require("express");
app.use("/Games", importedGamesRouting);

app.listen(PORT, HOST, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
