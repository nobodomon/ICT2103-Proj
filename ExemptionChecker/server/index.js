// server/index.js


const express = require("express");

var http = require('http');
var path = require("path");
var sha256 = require("crypto-js/sha256");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 3001;

const cors = require('cors');
const { randomUUID } = require("crypto");

//import routes
const userMethods = require('./routes/auth.js');

const app = express();
var server = http.createServer(app);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(helmet());
app.use(cors());
app.use(limiter);


//Use methods
app.use("/users", userMethods);

// app.post("/attemptLogin", async (req, res) => {
//     const {username, password} = req.body;
//     console.log(sha256(password).toString())
//     db.serialize(() => {
//         db.get('SELECT username, password FROM Users WHERE username =?', [username], function (err, row) {     //db.each() is only one which is funtioning while reading data from the DB
//             if(row == undefined){
//                 res.send({success:false, message: "Username or password is incorrect!"});
//                 return console.log("Username or password is incorrect!");
//             }
//             if (row.password != sha256(password).toString()) {
//                 res.send({success:false, message: "Username or password is incorrect!"});
//                 return console.log("Username or password is incorrect!");
//             }
//             if(err){
//                 res.send({success:false, message: err.message});
//                 return console.log(err.message);
//             }

//             console.log("Entry displayed successfully");
//             return res.send({success:true, username: row.username, password: row.password })
//         });
//     });
// });


// app.post("/attemptRegister", (req, res) => {
//     const {username, password} = req.body;
//     hashedpw = sha256(password).toString();
//     db.serialize(() => {
//         db.run('INSERT INTO Users(username,password,role) VALUES(?,?,?)', [username, hashedpw,"user"], function (err) {
//             if (err) {
//                 return res.send({success:false, message: "Username already exists!"});
//             }
//             console.log("New user has been added");
//             db.run("SELECT * FROM Users WHERE username = ?", [username], function (err, row) {
//                 if (err) {
//                     return res.send({success:false, message: err.message});
//                 }
//                 return res.send({success:true, username: row.username, password: row.password, role: row.role})
//             })
//         });
//     });
// });

// app.post("*",function(req,res,next){
//     try {
//         req.pipe(request.post({url: ipconfig.devIP+req.url, form: req.body , headers:{
//             "X-Forwarded-For" : req.connection.remoteAddress
//         } , callback:function(error,response,body){
//             if(error) {
//                 console.log("\nError:");
//                 console.log(error);
//                 res.status(400).send("Critical Server Error: " + error.code);
//             }
//         }}), {end: true}).pipe(res);
//     }
//     catch(err){
//         console.log(err);
//         res.status(400).send(err);
//     }
// });
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});