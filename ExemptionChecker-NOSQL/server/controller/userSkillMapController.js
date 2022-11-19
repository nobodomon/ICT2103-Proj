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
    userSkillMap.aggregate([{
        $project:{
            "skillObjID": {
                "$toObjectId": "$skillID"
            },
            "userID": 1,
            "skillID": 1,
        }
    },{
        $lookup: {
            from: "Skills",
            localField: "skillObjID",
            foreignField: "_id",
            as: "skill"
        }
    },{
        $unwind:"$skill"
    },{
        $project:{
            "_id":1,
            skillID:1,
            userID:1,
            "skill":"$skill.skill"
        }
    },{
        $match: {
            userID: userID
        }
    }]).toArray((err, data) => {
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
    userSkillMap.find({
        userID: userID,
        skillID: skillID
    }).toArray((err, data) => {
        if(err){
            return res.json({success: false, message: err.message});
        }
        if(data.length > 0){
            return res.json({success: false, message: 'You already have this skill!'});
        }
        userSkillMap.insertOne({
            userID: userID,
            skillID: skillID
        }).then((data) => {
            res.json({success: true, data, message: 'Map created!'});
        }).catch(err => {
            res.json({success: false, message: err.message});
        })
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
