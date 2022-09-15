const knex = require('../database.js');

exports.allSkills = async (req, res) => {
    knex.select('*').from('Skills').then(data =>{
        res.json({success:true, data, message: 'Skills fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allSkillsFromPolytechnicCourse = async (req, res) => {
    const { courseID } = req.body;
    knex.select('sid', 'skill', 'polytechnicCourse').from('Skills').join('SkillPolytechnicModuleMap', function(){
        this.on('Skills.sid', '=', 'SkillPolytechnicModuleMap.skillID')
    }).join("PolytechnicModuleCourseMap", function(){
        this.on("SkillPolytechnicModuleMap.moduleID", "=", "PolytechnicModuleCourseMap.polytechnicModule")
    }).where({polytechnicCourse: courseID}).then(data =>{
        res.json({success:true, data, message: 'Skills fetched!'});
    }
    ).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allSkillsFromUniversityCourse = async (req, res) => {
    const { courseID } = req.body;
    knex.select('sid', 'skill', 'universityCourse').from('Skills').join('SkillUniversityModuleMap', function(){
        this.on('Skills.sid', '=', 'SkillUniversityModuleMap.skillID')
    }).join("UniversityModuleCourseMap", function(){
        this.on("SkillUniversityModuleMap.moduleID", "=", "UniversityModuleCourseMap.universityModule")
    }).where({universityCourse: courseID}).then(data =>{
        res.json({success:true, data, message: 'Skills fetched!'});
    }
    ).catch(err => {
        res.json({success:false, message: err.message});
    });
}


exports.create = async (req, res) => {
    const {skill} = req.body;
    knex('Skills').insert({skill: skill}).then(data =>{
        res.json({success:true, data, message: 'Skill created!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.update = async (req, res) => {
    const {sid, skill} = req.body;
    knex('Skills').where({sid : sid}).update({skill: skill}).then(data =>{
        res.json({success:true, data, message: 'Skill updated!'});
    }
    ).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {sid,skill} = req.body;
    knex('Skills').where({sid : sid}).del().then(data =>{
        res.json({success:true, data, message: 'Skill deleted!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
   
    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: [
            "sid",
            "skill",
        ],
    }

    const fieldSettings = {
        // Configures the fields of the table
        // Pls match field names with column names (case sensitive!)
        "sid": {
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
                "sid":{
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
                "sid":{
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

