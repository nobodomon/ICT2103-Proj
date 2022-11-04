const knex = require('../database.js');

exports.allMaps = async (req, res) => {
    knex.select('*').from('PolytechnicModuleCourseMap').then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromCourse = async (req, res) => {
    const {polytechnicCourse} = req.body;
    knex.select('*').from('PolytechnicModuleCourseMap').where({polytechnicCourse: polytechnicCourse}).then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}
exports.allMapsFromModule = async (req, res) => {
    const {polytechnicModule} = req.body;
    knex.select('*').from('PolytechnicModuleCourseMap').where({polytechnicModule: polytechnicModule}).then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    const {polytechnicCourse, polytechnicModule} = req.body;
    knex('PolytechnicModuleCourseMap').insert({polytechnicCourse: polytechnicCourse, polytechnicModule: polytechnicModule}).then(data =>{
        res.json({success:true, data, message: 'Map created!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {polytechnicCourse, polytechnicModule} = req.body;
    knex('PolytechnicModuleCourseMap').where({polytechnicCourse : polytechnicCourse, polytechnicModule: polytechnicModule}).del().then(data =>{
        res.json({success:true, data, message: 'Map deleted!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
    const settings = {
        matchingHeaders : [
            'polytechnicCourse',
            'cid',
        ],

        tableHeaders: [
            'polytechnicCourse',
            'polytechnicModule'
        ]
    }
    res.json({success:true, settings, message: 'Settings fetched!'});
}
