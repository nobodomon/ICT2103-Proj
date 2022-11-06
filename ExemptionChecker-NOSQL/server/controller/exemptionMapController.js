const knex = require('../database.js');

exports.allMaps = async (req, res) => {
    knex.select('*').from('SkillPolytechnicModuleMap').then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}
