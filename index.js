require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');
const MYSQL_API_USER = process.env.MYSQL_API_USER;
const MYSQL_API_PASS = process.env.MYSQL_API_PASS;
const test = process.env.test;

const connection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: MYSQL_API_USER,
    password: MYSQL_API_PASS,
    database: 'heroku_7e34334c857eca2d'
});

connection.connection(function(err) {
    if (err) {
        console.log("Not Connected");
        throw err;
    } 
    console.log("Connected!");
});

//app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    //res.send("This is the user test " + test);
    res.render('pages/home/index.html');
    let myQuery = 'SELECT * FROM users;';
    connection.query(myQuery, (err, rows) => {
        if (err) { 
            throw err;
        }
        else {
            console.log(rows);
            //res.render('pages/index.ejs', { rows });
        }
    });
});

app.get('/', (req, res) => {
    res.send("This is the user test " + test);
    //res.render('pages/home/index.html');
    let myQuery = 'SELECT * FROM users;';
    connection.query(myQuery, (err, rows) => {
        if (err) { 
            throw err;
            console.log(err + " and " + process.env.MYSQL_API_USER);
        }
        else {
            console.log(rows);
            //res.render('pages/index.ejs', { rows });
        }
    });
});


app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});