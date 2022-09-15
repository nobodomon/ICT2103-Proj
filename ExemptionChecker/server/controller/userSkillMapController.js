const knex = require('../database.js');

exports.allMaps = async (req, res) => {
    knex.select('*').from('UserSkillMap').then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromUser = async (req, res) => {
    const {userID} = req.body;
    knex.select('*').from('UserSkillMap').where({userID: userID}).then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromSkill = async (req, res) => {
    const {skillID} = req.body;
    knex.select('*').from('UserSkillMap').where({skillID: skillID}).then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    const {userID, skillID} = req.body;
    knex('UserSkillMap').insert({userID: userID, skillID: skillID}).then(data =>{
        res.json({success:true, data, message: 'Map created!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {userID, skillID} = req.body;
    knex('UserSkillMap').where({userID : userID, skillID: skillID}).del().then(data =>{
        res.json({success:true, data, message: 'Map deleted!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
    
        const settings = {
            matchingHeaders : [
                //fk skillID from userskillMap
                'skillID',
                //pk sid from users
                'sid',
            ],
    
            tableHeaders: [
                'skillID',
                'userID'
            ]
        }
    
        res.json({success:true, settings, message: 'Settings fetched!'});
    }
