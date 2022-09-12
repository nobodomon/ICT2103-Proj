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
const polytechnicMethods = require('./routes/polytechnics.js');
const polytechnicCourseMethods = require('./routes/polytechnicCourse.js');
const polytechnicModuleMethods = require('./routes/polytechnicModule.js');

const universityMethods = require('./routes/university.js');
const universityCourseMethods = require('./routes/universityCourse.js');
const universityModuleMethods = require('./routes/universityModule.js');


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
app.use("/polytechnics", polytechnicMethods);
app.use("/polytechnicCourses", polytechnicCourseMethods);
app.use("/polytechnicModules", polytechnicModuleMethods);
app.use("/universities", universityMethods);
app.use("/universityCourses", universityCourseMethods);
app.use("/universityModules", universityModuleMethods);


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});