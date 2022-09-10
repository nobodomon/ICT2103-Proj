const { SHA256 } = require("crypto-js");
const knex = require("../database.js");

exports.allUsers = async (req, res) => {
    knex.select("*").from("Users").then(userData =>{
        res.json({success:true, userData, message: "Users fetched!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    const {username, password} = req.body;
    knex.insert({username: username, password: SHA256(password), role: "user"}).into("Users").then(userData =>{
        res.json({success:true, userData, message: "User created!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.deleteUser = async (req, res) => {
    const {username} = req.body;
    knex.delete().from("Users").where({username: username}).then(userData =>{
        res.json(userData)
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.updateUser = async (req, res) => {
    const {uid, username, password, role} = req.body;
    knex.update({uid: uid, username:username, password: password, role: role}).from("Users").where({uid: uid}).then(userData =>{
        knex.select("*").from("Users").then(userData =>{ 
            res.json({success:true, userData, message: "Users fetched!"});
        })
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.login = async (req, res) => {
    const {username, password} = req.body;
    knex.select("*").from("Users").where({username: username, password: SHA256(password)}).then(userData =>{
        if(userData.length == 0){
            res.json({success:false, message: "Username or password is incorrect!"});
        }else{
            res.json({success:true, userData, message: "Login successful!"});
        }
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
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
            primaryKey: true
        },
        "username":{
            type: "text",
            editable:true,
        },
        "role":{
            type: "text",
            editable:true,
        },
        "password":{
            type: "text",
            editable:false,
        }
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings
    }

    res.json({success : true, settings: settings, message: "Settings fetched!"});
}