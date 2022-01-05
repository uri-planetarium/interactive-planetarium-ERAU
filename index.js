const express = require("express"),
    app = express(),
    cors = require("cors"), 
    pool = require("./APIs/database"),
    path = require("path"),
    PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    /* Serve our static content */
    console.log("In Production mode");
    app.use(express.static(path.join(__dirname, "player_client/build")));
} else {
    console.log("Not in Production mode");
}

require("./APIs/games_API")(app, pool);
require("./APIs/lobbys_API")(app, pool);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})