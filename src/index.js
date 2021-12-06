// import and initialize express as app.
const express = require("express");

const app = express();

PORT = process.env.PORT || 3000;
HOST = "0.0.0.0";

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
