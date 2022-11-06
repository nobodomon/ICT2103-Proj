const db = require('../database.js');

const userSkillMap = db.collection('UserSkillMap');

exports.allMaps = async (req, res) => {
    userSkillMap.find({}).toArray((err, data) => {
        if(err){
            return res.json({success: false, message: err.message});
        }
        res.json({success: true, data, message: 'Maps fetched!'});
    })
}

exports.allMapsFromUser = async (req, res) => {
    const {userID} = req.body;
    userSkillMap.find({
        userID: userID
    }).toArray((err, data) => {
        console.log(data);
        if(err){
            return res.json({success: false, message: err.message});
        }
        res.json({success: true, data, message: 'Maps fetched!'});
    })
}

exports.allMapsFromSkill = async (req, res) => {
    const {skillID} = req.body;
    userSkillMap.find({
        skillID: skillID
    }).toArray((err, data) => {
        if(err){
            return res.json({success: false, message: err.message});
        }
        res.json({success: true, data, message: 'Maps fetched!'});
    })
}

exports.create = async (req, res) => {
    const {userID, skillID} = req.body;
    userSkillMap.insertOne({userID: userID, skillID: skillID}).then((data) => {
        res.json({success: true, data, message: 'Map created!'});
    }).catch(err => {
        res.json({success: false, message: err.message});
    })
}

exports.delete = async (req, res) => {
    const {userID, skillID} = req.body;
    userSkillMap.deleteOne({userID: userID, skillID: skillID}).then((data) => {
        res.json({success: true, data, message: 'Map deleted!'});
    }).catch(err => {
        res.json({success: false, message: err.message});
    })
}

exports.settings = async (req, res) => {
    
        const settings = {
            matchingHeaders : [
                //fk skillID from userskillMap
                'skillID',
                //pk sid from users
                '_id',
            ],
    
            tableHeaders: [
                'skillID',
                'userID'
            ]
        }
    
        res.json({success:true, settings, message: 'Settings fetched!'});
    }
