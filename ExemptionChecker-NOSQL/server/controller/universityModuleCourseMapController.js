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

    universityModuleCourseMap.aggregate([
    {
        $match: {universityCourse: universityCourse}
    },{
        $project:{
            "universityModuleObjID": {
                "$toObjectId": "$universityModule"
            },
            "universityCourse": 1,
            "universityModule": 1,
        }
    },{
        $lookup: {
            from: 'UniversityModules',
            localField: 'universityModuleObjID',
            foreignField: '_id',
            as: 'universityModule'
        },
    },{
        $unwind: "$universityModule"
    },{
        $project: {
            _id: "$universityModule._id",
            universityModule: 1,
            universityCourse: 1,
            moduleCode: "$universityModule.moduleCode",
            moduleName: "$universityModule.moduleName",
            yearOffered: "$universityModule.yearOffered",
            period: "$universityModule.period",
            credits: "$universityModule.credits",
        }
    }]).toArray().then(data =>{
        res.json({success: true, data, message: 'Maps fetched!'});
    })
}


exports.create = async (req, res) => {
    const {universityCourse, universityModule} = req.body;
    universityModuleCourseMap.find({universityCourse: universityCourse, universityModule: universityModule}).toArray().then(data =>{
        if(data.length == 0){
            universityModuleCourseMap.insertOne({universityCourse: universityCourse, universityModule: universityModule}).then(data =>{
                res.json({success: true, data, message: 'Map created!'});
            }).catch(err => {
                res.json({success: false, message: err.message});
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
