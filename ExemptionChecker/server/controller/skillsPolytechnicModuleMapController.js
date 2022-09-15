const knex = require('../database.js');

exports.allMaps = async (req, res) => {
    knex.select('*').from('SkillPolytechnicModuleMap').then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromSkill = async (req, res) => {
    const {skillID} = req.body;
    knex.select('*').from('SkillPolytechnicModuleMap').where({skillID: skillID}).then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromModule = async (req, res) => {
    console.log(req.body)
    const {moduleID} = req.body;
    knex.select('*').from('SkillPolytechnicModuleMap').join("Skills", function(){
        this.on("Skills.sid", "=", "SkillPolytechnicModuleMap.skillID")
    }).where({moduleID: moduleID}).then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}



exports.create = async (req, res) => {
    const {skillID, moduleID} = req.body;
    knex('SkillPolytechnicModuleMap').insert({skillID: skillID, moduleID: moduleID}).then(data =>{
        res.json({success:true, data, message: 'Map created!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {skillID, moduleID} = req.body;
    knex('SkillPolytechnicModuleMap').where({skillID : skillID, moduleID: moduleID}).del().then(data =>{
        res.json({success:true, data, message: 'Map deleted!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {

    const settings = {
        matchingHeaders : [
            'moduleID',
            'mid',
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

            "sid":{
                displayLabel: "Skill ID",
                foreignKey:true,
            }
        },
    }
    res.json({success:true, settings, message: 'Settings fetched!'});
}