const express = require("express"),
    app = express(),
    cors = require("cors"), 
    pool = require("./APIs/database"),
    path = require("path"),
    PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

/* If in production mode, load the static content from 'player_client/build' */
if (process.env.NODE_ENV === "production") {
    console.log("In Production Mode");

    /* Serve our static content */
    app.use(express.static(path.join(__dirname, "player_client/build")));
} else {
    console.log("In Developer Mode");
}


require("./APIs/lobbys_API")(app, pool, path);
require("./APIs/games_API")(app, pool, path);
require("./APIs/quiz_API")(app, pool, path);

//WARNING: This is really important, do not remove it
// Without it, refreshing the page fails to reload it
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'player_client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})