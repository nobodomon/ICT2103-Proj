const db = require('../database.js');
const skills = db.collection("Skills");
const mongodb = require('mongodb');

exports.allSkills = async (req, res) => {
    skills.find({}).toArray((err, data) => {
        res.json({success: true, data, message: "Skills fetched!"});
    })
}

exports.allSkillsFromPolytechnicCourse = async (req, res) => {
    const { courseID } = req.body;

    skills.aggregate([{ 
        $lookup: { 
            from: "SkillPolytechnicModuleMap", 
            localField: "_id", 
            foreignField: "skillID", 
            as: "SkillPolytechnicModuleMap" 
        },
        $lookup: {
            from:"PolytechnicModuleCourseMap",
            localField: "SkillPolytechnicModuleMap.moduleID",
            foreignField: "moduleID",
            as: "PolytechnicModuleCourseMap"
        },
        $match: { "PolytechnicModuleCourseMap.courseID": courseID }
        }]).toArray((err, data) => {
            res.json({success: true, data, message: "Skills fetched!"});
    })
    // knex.select('sid', 'skill', 'polytechnicCourse').from('Skills')
    //.join('SkillPolytechnicModuleMap', function(){
    //     this.on('Skills.sid', '=', 'SkillPolytechnicModuleMap.skillID')
    // }).join("PolytechnicModuleCourseMap", function(){
    //     this.on("SkillPolytechnicModuleMap.moduleID", "=", "PolytechnicModuleCourseMap.polytechnicModule")
    // }).where({polytechnicCourse: courseID}).then(data =>{
    //     res.json({success:true, data, message: 'Skills fetched!'});
    // }
    // ).catch(err => {
    //     res.json({success:false, message: err.message});
    // });
}

exports.allSkillsFromUniversityCourse = async (req, res) => {
    const { courseID } = req.body;

    skills.aggregate([{
        $lookup: {
            from: "SkillUniversityModuleMap",
            localField: "_id",
            foreignField: "skillID",
            as: "SkillUniversityModuleMap"
        },
        
        $lookup: {
            from: "UniversityModuleCourseMap",
            localField: "SkillUniversityModuleMap.moduleID",
            foreignField: "moduleID",
            as: "UniversityModuleCourseMap"
        },
        $match: { "UniversityModuleCourseMap.courseID": courseID }
        }]).toArray((err, data) => {
            res.json({success: true, data, message: "Skills fetched!"});
    })
}

exports.allSKillFromUser = async (req, res) => {
    const { userID } = req.body;
    // knex.select('sid', 'skill').from('Skills').join('UserSkillMap', function(){
    //     this.on('Skills.sid', '=', 'UserSkillMap.skillID')
    // }).where({userID: userID}).then(data =>{
    //     res.json({success:true, data, message: 'Skills fetched!'});
    // }
    // ).catch(err => {
    //     res.json({success:false, message: err.message});
    // });
}


exports.create = async (req, res) => {
    const {skill} = req.body;
    skills.insertOne({skill: skill}).then(data =>{
        res.json({success:true, data, message: 'Skill created!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.update = async (req, res) => {
    const {_id, skill} = req.body;
    skills.updateOne({_id: mongodb.ObjectId(_id)}, {$set: {skill: skill}}).then(data =>{
        res.json({success:true, data, message: 'Skill updated!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {_id,skill} = req.body;
    skills.deleteOne({_id: mongodb.ObjectId(_id)}).then(data =>{
        res.json({success:true, data, message: 'Skill deleted!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
   
    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: {
            "_id":{
                displayHeader: "Skill ID",
            },
            "skill":{
                displayHeader: "Skill",
            },
        }
    }

    const fieldSettings = {
        // Configures the fields of the table
        // Pls match field names with column names (case sensitive!)
        "_id": {
            type: "number",
            editable: false,
            primaryKey: true,
            displayLabel: "Skill ID"
        },
        "skill": {
            type: "text",
            editable: true,
            displayLabel: "Skill"
        },
    }

    const listViewSettings = {
        "PolytechnicCourseSkills":{
            fieldSettings:{
                "_id":{
                    displayLabel: "Skill ID",
                    foreignKey:true,
                },
                "skill":{
                    displayLabel: "Skill",
                },
            }
        },
        "UniversityCourseSkills": {
            fieldSettings:{
                "_id":{
                    displayLabel: "Skill ID",
                    foreignKey:true,
                },
                "skill":{
                    displayLabel: "Skill",
                },
            }
        }
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings,
        listViewSettings: listViewSettings,
    }

    res.json({success : true, settings: settings, message: "Settings fetched!"});
}

