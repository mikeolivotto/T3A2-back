
// import and initialize express as app.
const express = require("express");

const app = express();

PORT = process.env.PORT || 3000
HOST = "0.0.0.0"


const importedProfileRouting = require("./Profiles/profilesRoutes")
app.use("/Profiles", importedProfileRouting)

app.listen(PORT, HOST, () => {
    console.log(`Server running on PORT: ${PORT}`)
})