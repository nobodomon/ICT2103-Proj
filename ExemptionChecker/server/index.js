// server/index.js

const express = require("express");

var sqlite3 = require('sqlite3').verbose();
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 3001;

const cors = require('cors');
const app = express();
var server = http.createServer(app);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

var db = new sqlite3.Database('./database/users.db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './public')));
app.use(helmet());
app.use(cors());
app.use(limiter);


db.run('CREATE TABLE IF NOT EXISTS Users(username TEXT, password TEXT)');

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/attemptLogin", async (req, res) => {
    const {username, password} = req.body;
    db.serialize(() => {
        db.each('SELECT username, password FROM Users WHERE username =? AND password =?', [username, password], function (err, row) {     //db.each() is only one which is funtioning while reading data from the DB
            if (err) {
                res.send("Error encountered while displaying");
                return console.error(err.message);
            }
            console.log("Entry displayed successfully");
            return res.send({ username: row.username, password: row.password })
        });
    });
});


app.post("/attemptRegister", (req, res) => {
    db.serialize(() => {
        db.run('INSERT INTO Users(username,password) VALUES(?,?)', [req.body.Username, req.body.Password], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log("New user has been added");
            res.send("New user has been added into the database with username = " + req.body.Username + " and password = " + req.body.Password);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});