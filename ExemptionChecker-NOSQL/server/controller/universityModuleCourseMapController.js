const db = require('../database.js');
const mongodb = require('mongodb');
const universityModuleCourseMap = db.collection('UniversityModuleCourseMap');

exports.allMaps = async (req, res) => {
    universityModuleCourseMap.find({}).toArray().then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromCourse = async (req, res) => {
    const {universityCourse} = req.body;
    universityModuleCourseMap.find({universityCourse: universityCourse}).toArray().then(data =>{
        res.json({success: true, data, message: 'Maps fetched!'});
    })
}

exports.allMapsFromModule = async (req, res) => {
    const {universityModule} = req.body;
    universityModuleCourseMap.find({universityModule: universityModule}).toArray().then(data =>{
        res.json({success: true, data, message: 'Maps fetched!'});
    })
}


exports.allModulesForCourse = async (req, res) => {
    const {universityCourse} = req.body;

    universityModuleCourseMap.aggregate([{
        $lookup: {
            from: 'UniversityModule',
            localField: 'universityModule',
            foreignField: '_id',
            as: 'universityModule'
        },
        $match : {
            universityCourse: universityCourse
        }
    }]).toArray().then(data =>{
        res.json({success: true, data, message: 'Maps fetched!'});
    })
}


exports.create = async (req, res) => {
    const {universityCourse, universityModule} = req.body;
    universityModuleCourseMap.find({universityCourse: universityCourse, universityModule: universityModule}).toArray().then(data =>{
        if(data.length == 0){
            knex('UniversityModuleCourseMap').insert({universityCourse: universityCourse, universityModule: universityModule}).then(data =>{
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
    const {universityCourse, universityModule} = req.body;
    universityModuleCourseMap.deleteOne({universityCourse: universityCourse, universityModule: universityModule}).then(data =>{
        res.json({success:true, data, message: 'Map deleted!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
    const settings = {
        matchingHeaders : [
            'universityCourse',
            '_id',
        ],

        tableHeaders: [
            'universityCourse',
            'universityModule'
        ]
    }
    res.json({success:true, settings, message: 'Settings fetched!'});
}
