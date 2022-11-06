const db = require("../database.js");
const SkillUniversityModuleMap = db.collection("SkillUniversityModuleMap");
const mongodb = require("mongodb");

exports.allMaps = async (req, res) => {
    SkillUniversityModuleMap.find({}).toArray((err, data) => {
        if(err){
            return res.json({success: false, message: err.message}); 
        }
        res.json({success: true, data, message: "Maps fetched!"});
    })
}

exports.allMapsFromSkill = async (req, res) => {
    const {skillID} = req.body;

    SkillUniversityModuleMap.aggregate([{
        $lookup: {
            from: "Skill",
            localField: "skillID",
            foreignField: "_id",
            as: "skill"
        }
    },{
        $replaceRoot:{
            newRoot: {
                $mergeObjects: [ { $arrayElemAt: [ "$skill", 0 ] }, "$$ROOT" ]
            }
        }
    },{
        $project: {
            skill: 0,
        }
    },{
        $match: {
            skillID: skillID
        }
    }]).toArray((err, data) => {
        if(err){
            return res.json({success: false, message: err.message});
        }
        res.json({success: true, data, message: "Maps fetched!"});
    })
}

exports.allMapsFromModule = async (req, res) => {
    const {moduleID} = req.body;

    SkillUniversityModuleMap.aggregate([{
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
    const { skillID, moduleID } = req.body;
    console.log(req.body);
    SkillUniversityModuleMap.find({
        skillID: skillID,
        moduleID: moduleID
    }).toArray((err, data) => {
        if(err){
            return res.json({success: false, message: err.message});
        }
        if(data.length > 0){
            return res.json({success: false, message: "This skill is already mapped to this module!"});
        }
        SkillUniversityModuleMap.insertOne({
            skillID: skillID,
            moduleID: moduleID
        }).then((data) => {
            res.json({success: true, data, message: "Map created!"});
        }).catch(err => {
            res.json({success: false, message: err.message});
        })
    })
}

exports.delete = async (req, res) => {
    const { skillID, moduleID } = req.body;
    SkillUniversityModuleMap.deleteOne({ skillID: skillID, moduleID: moduleID }).then((data) => {
        res.json({ success: true, data, message: "Map deleted!" });
    }).catch(err => {
        res.json({ success: false, message: err.message });
    });
}

exports.settings = async (req, res) => {
    const settings = {
        matchingHeaders: [
            "moduleID",
            "_id",
        ],
        tableHeaders: [
            "moduleID",
            "skillID",
        ],
        
        //Used for ListMapView
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
            
        }
    };
    res.json({ success: true, settings , message: "Settings fetched!" });
}