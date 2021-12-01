const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');
require('dotenv').config();
const MYSQL_API_USER = process.env.MYSQL_API_USER;
const MYSQL_API_PASS = process.env.MYSQL_API_PASS;

const connection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: MYSQL_API_USER,
    password: MYSQL_API_PASS,
    database: 'heroku_7e34334c857eca2d'
});

//app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    res.send("This is the user " + process.env.MYSQL_API_USER);
    //res.render('pages/home/index.html');
    // let myQuery = 'SELECT * FROM users;';
    // connection.query(myQuery, (err, rows) => {
    //     if (err) { 
    //         throw err;
    //         console.log(err + " and " + process.env.MYSQL_API_USER);
    //     }
    //     else {
    //         console.log(rows);
    //         //res.render('pages/index.ejs', { rows });
    //     }
    // });
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});