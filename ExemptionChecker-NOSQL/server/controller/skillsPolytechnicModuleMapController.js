const db = require('../database.js');
const skillPolytechnicModuleMap = db.collection("SkillPolytechnicModuleMap");
const skills = db.collection("Skills");
const polytechnicModules = db.collection("PolytechnicModules");
const mongodb = require('mongodb');
exports.allMaps = async (req, res) => {
    await skillPolytechnicModuleMap.find({}).toArray((err, data) => {
        if(err){
            return res.json({success:false, message: err.message});
        }
        res.json({success:true, data, message: 'Map fetched!'});
    })
}

exports.allMapsFromSkill = async (req, res) => {
    const {skillID} = req.body;
    await skillPolytechnicModuleMap.find({skillID: skillID}).toArray((err, data) => {
        if(err){
            return res.json({success:false, message: err.message});
        }
        res.json({success:true, data, message: 'Map fetched!'});
    })
}

exports.allMapsFromModule = async (req, res) => {
    const {moduleID} = req.body;
    await skillPolytechnicModuleMap.aggregate([{
        $project : {
            "skillObjID": {
                "$toObjectId": "$skillID"
            },
            "moduleID": 1,
            "skillID": 1,
        }
    },{
        $lookup: {
            from: "Skills",
            localField: "skillObjID",
            foreignField: "_id",
            as: "skill"
        }
    },{
        $unwind: "$skill"
    },{
        $project: {
            "_id": 1,
            skillID: 1,
            moduleID: 1,
            "skill": "$skill.skill",
        }
    },{
        $match: {
            moduleID: moduleID
        }
    },]).toArray((err, data) => {
        if(err){
            return res.json({success: false, message: err.message});
        }
        res.json({success: true, data, message: "Maps fetched!"});
    })
}



exports.create = async (req, res) => {
    const {skillID, moduleID} = req.body;
    // if the skill and module exist then insert the map
    await skillPolytechnicModuleMap.find({skillID: skillID, moduleID: moduleID}).toArray((err, data) => {
        if(data.length == 0){
            skillPolytechnicModuleMap.insertOne({skillID: skillID, moduleID: moduleID}).then((data) => {
                res.json({success:true, data, message: 'Map created!'});
            }).catch(err => {
                res.json({success:false, message: err.message});
            });
        }else{
            res.json({success:false, message: 'Map already exists!'});
        }
    });
}

exports.delete = async (req, res) => {
    const {skillID, moduleID} = req.body;
    await skillPolytechnicModuleMap.deleteOne({skillID: skillID, moduleID: moduleID}).then(data =>{
        res.json({success:true, data, message: 'Map deleted!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {

    const settings = {
        matchingHeaders : [
            'moduleID',
            '_id',
        ],

        tableHeaders: [
            'moduleID',
            'skillID'
        ],

        fieldSettings: {
            "moduleID":{
                displayLabel: "Module",
                foreignKey:true,
            },
            "skillID":{

                displayLabel: "Skill",
                foreignKey:true,
            },
            "skill":{
                displayLabel: "Skills",
            },

            "_id":{
                displayLabel: "Skill ID",
                foreignKey:true,
            }
        },
    }
    res.json({success:true, settings, message: 'Settings fetched!'});
}