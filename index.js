const express = require("express"),
    app = express(),
    cors = require("cors"), 
    pool = require("./APIs/database");

// middleware
app.use(cors());
app.use(express.json());

require("./APIs/games_API")(app, pool);
require("./APIs/lobbys_API")(app, pool);

app.listen(5000, () => {
    console.log("Server has started on port 5000");
})