const db = require('../database.js');
const mongodb = require("mongodb");
const polytechnicModuleCourseMap = db.collection("PolytechnicModuleCourseMap");

exports.allMaps = async (req, res) => {
    polytechnicModuleCourseMap.find({}).toArray().then(data =>{
        res.json({success:true, data, message: 'Map fetched!'});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.allMapsFromCourse = async (req, res) => {
    const {polytechnicCourse} = req.body;
    polytechnicModuleCourseMap.find({polytechnicCourse: polytechnicCourse}).toArray().then(data =>{
        res.json({success: true, data, message: "Maps fetched!"});
    })
}
exports.allMapsFromModule = async (req, res) => {
    const {polytechnicModule} = req.body;
    polytechnicModuleCourseMap.find({polytechnicModule: polytechnicModule}).toArray().then(data =>{
        res.json({success: true, data, message: "Maps fetched!"});
    })
}

exports.create = async (req, res) => {
    const {polytechnicCourse, polytechnicModule} = req.body;
    // Check if the course and module exist if not insert them
    polytechnicModuleCourseMap.find({polytechnicCourse: polytechnicCourse, polytechnicModule: polytechnicModule}).toArray().then(data =>{
        if(data.length == 0){
            polytechnicModuleCourseMap.insertOne({
                "polytechnicCourse": polytechnicCourse,
                "polytechnicModule": polytechnicModule,
            })
        }
    })
}

exports.delete = async (req, res) => {
    const {polytechnicCourse, polytechnicModule} = req.body;
    polytechnicModuleCourseMap.deleteOne({polytechnicCourse: polytechnicCourse, polytechnicModule: polytechnicModule}).then(data =>{
        res.json({success: true, data, message: "Map deleted!"});
    });
}

exports.settings = async (req, res) => {
    const settings = {
        matchingHeaders : [
            'polytechnicCourse',
            '_id',
        ],

        tableHeaders: [
            'polytechnicCourse',
            'polytechnicModule'
        ]
    }
    res.json({success:true, settings, message: 'Settings fetched!'});
}
