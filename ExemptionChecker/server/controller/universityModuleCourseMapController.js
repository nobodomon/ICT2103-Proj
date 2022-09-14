const knex = require('../database.js');

exports.allMaps = async (req, res) => {
    knex.select('*').from('UniversityModuleCourseMap').then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromCourse = async (req, res) => {
    const {universityCourse} = req.body;
    knex.select('*').from('UniversityModuleCourseMap').where({universityCourse: universityCourse}).then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromModule = async (req, res) => {
    const {universityModule} = req.body;
    knex.select('*').from('UniversityModuleCourseMap').where({universityModule: universityModule}).then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    const {universityCourse, universityModule} = req.body;
    knex('UniversityModuleCourseMap').insert({universityCourse: universityCourse, universityModule: universityModule}).then(data =>{
        res.json({success:true, data, message: 'Map created!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {universityCourse, universityModule} = req.body;
    knex('UniversityModuleCourseMap').where({universityCourse : universityCourse, universityModule: universityModule}).del().then(data =>{
        res.json({success:true, data, message: 'Map deleted!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
    const settings = {
        matchingHeaders : [
            'universityCourse',
            'cid',
        ],

        tableHeaders: [
            'universityCourse',
            'universityModule'
        ]
    }
    res.json({success:true, settings, message: 'Settings fetched!'});
}
