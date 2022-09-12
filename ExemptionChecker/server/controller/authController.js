const { SHA256 } = require("crypto-js");
const knex = require("../database.js");

exports.allUsers = async (req, res) => {
    knex.select("*").from("Users").then(data =>{
        res.json({success:true, data, message: "Users fetched!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    const {username, password} = req.body;
    knex.insert({username: username, password: SHA256(password), role: "user"}).into("Users").then(data =>{
        knex.select("*").from("Users").where({username:username}).then(data =>{
        res.json({success:true, data, message: "User created!"});
        }).catch(err => {
            res.json({success:false, message: err.message});
        })
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.deleteUser = async (req, res) => {
    const {username} = req.body;
    knex.delete().from("Users").where({username: username}).then(data =>{
        res.json({success:true, data, message: "User deleted!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.updateUser = async (req, res) => {
    const {uid, username, password, role, polytechnicCourse} = req.body;
    knex.update({uid: uid, username:username, password: password, role: role, polytechnicCourse: req.body["Polytechnic Course"]}).from("Users").where({uid: uid}).then(data =>{
        knex.select("*").from("Users").then(data =>{ 
            res.json({success:true, data, message: "Users fetched!"});
        })
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.login = async (req, res) => {
    const {username, password} = req.body;
    knex.select("*").from("Users").where({username: username, password: SHA256(password)}).then(data =>{
        if(data.length == 0){
            res.json({success:false, message: "Username or password is incorrect!"});
        }else{
            res.json({success:true, data, message: "Login successful!"});
        }
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
    polytechnicCourses = await knex.select("*").from("PolytechnicCourses").then(polyCourseData =>{
        var tempCourseList = [];
        console.log(polyCourseData);
        for(polycourse in polyCourseData){
            tempCourseList.push({label: polyCourseData[polycourse]["course code"] + " - " +  polyCourseData[polycourse]["course name"], value:  polyCourseData[polycourse]["cid"]});
        }
        console.log(tempCourseList)
        return tempCourseList;
    });

    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: [
            "uid",
            "username",
            "role",
            "password"
        ]
    }

    const fieldSettings = {
        // Configures the datatype of the fields and their editablility
        "uid":{
            type: "number",
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
        }
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings
    }

    res.json({success : true, settings: settings, message: "Settings fetched!"});
}