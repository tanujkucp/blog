const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
let Configs = require('../config');
var ObjectId = require('mongodb').ObjectId;


module.exports = (app, db) => {
////////////////////////////////// GET LATEST API //////////////////////////////////////////
    app.post('/latest', (req, res) => {
        let tag = req.body.tag;
        let filters = {};
        if (tag) {
            filters = {tags: tag}
        }
        db.collection("posts").find(filters).limit(20).sort({created_at: -1}).toArray(function (err, result) {
            if (err || result == null) {
                res.status(HttpStatus.UNAUTHORIZED).send({success: false, message: 'Posts not found!'});
            } else {
                console.log(result);
                res.status(HttpStatus.OK).send({success: true, posts: result})
            }
        });
    });

    app.post('/post', (req, res) => {
        let id = req.body.id;
        //console.log(id);
        db.collection("posts").findOne({"_id": ObjectId(id)}, function (err, result) {
            //console.log(err);
            //console.log(result);
            if (err || result == null) {
                res.status(HttpStatus.UNAUTHORIZED).send({success: false, message: 'Posts not found!'});
            } else {
                console.log(result);
                res.status(HttpStatus.OK).send({success: true, post: result})
            }
        });
    });


}

var FAIL = {
    INVALID_INPUTS: {
        success: false,
        message: "Invalid inputs"
    },
    INVALID_USER_KEY: {
        success: false,
        message: "User secret key is invalid or has expired"
    },
    MISSING_USER_KEY: {
        success: false,
        message: "User secret not found in request"
    },
    INTERNAL_ERROR: {
        success: false,
        message: 'An internal error occurred'
    },
    MISSING_MEDIA_ID: {
        success: false,
        message: 'Media ID is not found in request'
    },
    NOT_FOUND: {
        success: false,
        message: "Data not found"
    }
};

