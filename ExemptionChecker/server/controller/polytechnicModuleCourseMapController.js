const knex = require('../database.js');

exports.allMaps = async (req, res) => {
    knex.select('*').from('PolytechnicModules').then(data =>{
        res.json({success:true, data, message: 'Polytechnics fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromCourse = async (req, res) => {
    const {polytechnicCourse} = req.body;
    knex.select('*').from('PolytechnicModules').where({polytechnicCourse: polytechnicCourse}).then(data =>{
        res.json({success:true, data, message: 'Polytechnics fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromModule = async (req, res) => {
    const {polytechnicModule} = req.body;
    knex.select('*').from('PolytechnicModules').where({polytechnicModule: polytechnicModule}).then(data =>{
        res.json({success:true, data, message: 'Polytechnics fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}
