     const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Basque1Cheese2Cake3",
    host: "localhost",
    port: 5432,
    database: "planetarium_uri_db"
});

module.exports = pool;