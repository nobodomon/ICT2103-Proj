const { SHA256 } = require("crypto-js");
const { collection } = require("../database.js");
const db = require("../database.js");
const mongodb = require("mongodb");

exports.allUsers = async (req, res) => {
    const collection = db.collection("users");

    collection.find({}).toArray((err, data) => {
        res.json({success:true, data, message: "Users fetched!"});
    });
}

exports.create = async (req, res) => {
    const {username, password} = req.body;

    const collection = db.collection("users");

    await collection.insertOne({username: username, password: SHA256(password).toString(), role: "user"}, async (err, result) => {
        await collection.find({username:username}).toArray((err, data) => {
            console.log(data);
            res.json({success:true, data, message: "User created!"});
        });
    });
}

exports.delete = async (req, res) => {
    const {_id} = req.body;

    const collection = db.collection("users");

    await collection.deleteOne({_id: mongodb.ObjectId(_id)}, async (err, result) => {
        res.json({success:true, message: "User deleted!"});
    });
}

exports.update = async (req, res) => {
    const collection = db.collection("users");
    const {_id, username, password, role, polytechnicCourse,universityCourse} = req.body;
    if(polytechnicCourse == null){
        return res.json({success:false, message: "Polytechnic course cannot be empty!"});
    }

    await collection.updateOne({_id:  mongodb.ObjectId(_id)}, {$set: 
        {
            username: username,
            password: password, 
            role: role, polytechnicCourse: 
            polytechnicCourse, 
            universityCourse: 
            universityCourse}}, async (err, result) => {
            await collection.find({_id: mongodb.ObjectId(_id)}).toArray((err, data) => {
                res.json({success:true, data, message: "User updated!"});
            });
    });
}

exports.login = async (req, res) => {
    const {username, password} = req.body;

    const collection = db.collection("users");

    await collection.find({username:username, password: SHA256(password).toString()}).toArray((err, data) => {
        if(data.length == 0){
            return res.json({success:false, message: "Invalid username or password!"});
        }
        console.log(data);
        res.json({success:true, data, message: "Login successful!"});
    });
}

exports.getUserByID = async (req, res) => {
    const {_id} = req.body;

    const collection = db.collection("users");

    await collection.find({_id:  mongodb.ObjectId(_id)}).toArray((err, data) => {
        res.json({success:true, data, message: "User fetched!"});
    })
}

exports.settings = async (req, res) => {
    const {uid} = req.body;
    const polytechnicCourse = db.collection("polytechnicCourses");
    const universityCourse = db.collection("universityCourses");


    var polytechnicCourses = [];

    var polytechnicCourseList = await polytechnicCourse.find({}).toArray();

    polytechnicCourseList.map((item) => {
        polytechnicCourses.push({label: item.courseCode + " - " + item.courseName, value: String(item._id)});
    });

    universityCourses = [];

    var universityCourseList = await universityCourse.find({}).toArray();

    universityCourseList.map((item) => {
        universityCourses.push({label: item.courseCode + " - " + item.courseName, value: String(item._id)});
    });

    

    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: {
            "_id" : {
                displayHeader: "User ID",
            },
            "username" : {
                displayHeader: "Username",
            },
            "password" : {
                displayHeader: "Password",
            },
            "role" : {
                displayHeader: "Role",
            },
        }
    }

    const fieldSettings = {
        // Configures the datatype of the fields and their editablility
        "_id":{
            type: "text",
            editable:false,
            displayLabel: "User ID",
            primaryKey: true
        },
        "username":{
            type: "text",
            editable:true,
            displayLabel: "Username",
        },
        "role":{
            type: "text",
            editable:true,
            displayLabel: "Role",
        },
        "password":{
            type: "password",
            editable:false,
            displayLabel: "Password",
        },
        "polytechnicCourse":{
            type: "dropdown",
            editable:true,
            displayLabel: "Polytechnic Course",
            options: polytechnicCourses,
        },
        "universityCourse":{
            type: "dropdown",
            editable:true,
            displayLabel: "University Course",
            options: universityCourses,
        },
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings
    }

    res.json({success : true, settings: settings, message: "Settings fetched!"});
}