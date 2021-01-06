const jwt = require('jsonwebtoken');
const saltRounds = 8;
const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');
let Configs = require('../config');
let User = require('../models/User');
let Post = require('../models/Post');


module.exports = (app, db) => {
    ////////////////////////////////// SIGN UP API //////////////////////////////////////////
    app.post('/signup', (req, res) => {
        var data = req.body;
        console.log(data);
        //now generate a hash of password and store in database
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            if (!err) {
                //Store hash in your password DB.
                var template = User.getUserTemplate(data, {password: hash, created_at: Date.now()});
                if (!template) {
                    res.status(HttpStatus.BAD_REQUEST).send(FAIL.INVALID_INPUTS);
                    return;
                }
                db.collection("users").insertOne(template, function (err, res2) {
                    if (err) throw err;
                    console.log("USER: 1 document inserted");
                    //console.log(res2);
                    res.status(HttpStatus.OK).send({success: true});
                });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(FAIL.INTERNAL_ERROR);
            }
        });
    });

    ////////////////////////////////// LOG IN API //////////////////////////////////////////
    app.post('/login', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        if (!username || !password) {
            res.status(HttpStatus.UNAUTHORIZED).send(FAIL.INVALID_INPUTS);
            return;
        }
        //check in database, if found true generate a JWT
        db.collection("users").findOne({username: username}, function (err, result) {
            if (err || result == null) {
                res.status(HttpStatus.UNAUTHORIZED).send({success: false, message: 'User not found!'});
            } else {
                console.log('some result present');
                console.log(result);

                //match hash of password
                bcrypt.compare(password, result.password, (err, result) => {
                    if (!err) {
                        if (result) {
                            console.log("password matched");
                            jwt.sign({username: username}, Configs.JWT_PRIVATE_KEY, {
                                algorithm: 'RS256',
                                expiresIn: '15d'
                            }, (err, token) => {
                                if (!err) {
                                    console.log(token);
                                    res.status(HttpStatus.OK).send({success: true, jwt: token})
                                } else {
                                    console.log(err);
                                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(FAIL.INTERNAL_ERROR);
                                }
                            });
                        } else {
                            //wrong password
                            res.status(HttpStatus.UNAUTHORIZED).send(FAIL.INVALID_INPUTS);
                        }
                    } else {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(FAIL.INTERNAL_ERROR);
                    }
                });
            }
        });
    });

    ////////////////////////////////// GET PROFILE API //////////////////////////////////////////
    //This is a protected route
    app.post('/profile', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        //console.log(req.token);
        jwt.verify(req.token, Configs.JWT_PUBLIC_KEY, (err, authorizedData) => {
            if (err) {
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                //If token is successfully verified, we can send the authorized data
                //fetch profile data from DB
                console.log(authorizedData);
                db.collection("users").findOne({username: authorizedData.username}, function (err, result) {
                    if (err || result == null) {
                        res.status(HttpStatus.UNAUTHORIZED).send({success: false, message: 'User not found!'});
                    } else {
                        db.collection("posts").find({username: authorizedData.username}).limit(10).toArray(function (err2, result2) {
                            if (err2 || result2 == null) {
                                res.status(HttpStatus.OK).send({success: true, user: result});
                            } else {
                                console.log(result2);
                                delete result['password'];
                                res.status(HttpStatus.OK).send({success: true, user: result, posts: result2});
                            }
                        });
                    }
                });
                console.log('SUCCESS: Connected to protected route');
            }
        });
    });

    ////////////////////////////////// PUBLISH API //////////////////////////////////////////
    //This is a protected route
    app.post('/publish', checkToken, (req, res) => {
        var data = req.body;
        console.log(data);
        //verify the JWT token generated for the user
        jwt.verify(req.token, Configs.JWT_PUBLIC_KEY, (err, authorizedData) => {
            if (err) {
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                //If token is successfully verified, we can send the authorized data
                console.log(authorizedData);
                //Store post in your DB
                var template = Post.getPostTemplate(data, {username: authorizedData.username, created_at: Date.now()});
                if (!template) {
                    res.status(HttpStatus.BAD_REQUEST).send(FAIL.INVALID_INPUTS);
                    return;
                }
                db.collection("posts").insertOne(template, function (err, res2) {
                    if (err) throw err;
                    console.log("POST: 1 document inserted");
                    //console.log(res2);
                    res.status(HttpStatus.OK).send({success: true});
                });

            }
        });
    });

}

//Check to make sure header is not undefined, if so, return Forbidden (403)
let checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
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
