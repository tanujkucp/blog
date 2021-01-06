const jwt = require('jsonwebtoken');
const saltRounds = 8;
const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');
let Configs = require('../config');


module.exports = (app) => {

    app.post('/signup', (req, res) => {
        var data = req.body;

        //now generate a hash of password and store in database
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            if (!err) {
                //todo Store hash in your password DB.
                console.log(hash);
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(FAIL.INTERNAL_ERROR);
            }
        });
    });

    app.post('/login', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        if (!username || !password) {
            res.status(HttpStatus.UNAUTHORIZED).send(FAIL.INVALID_INPUTS);
            return;
        }
        //todo check in database, if found true generate a JWT
        bcrypt.compare(password, user.password, (err, result) => {
            if (!err) {
                if (result) {
                    // console.log("password matched");
                    jwt.sign({
                        username: user.username
                    }, Configs.JWT_PRIVATE_KEY, {
                        algorithm: 'RS256',
                        expiresIn: '15d'
                    }, (err, token) => {
                        if (!err) {
                            //  console.log(token);
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
    });

    //This is a protected route
    app.get('/profile', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.token, Configs.JWT_PUBLIC_KEY, (err, authorizedData) => {
            if(err){
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                //If token is successfully verified, we can send the authorized data
                //todo fetch profile data from DB
                //todo fetch articles from DB
                res.json({
                    message: 'Successful log in',
                    authorizedData
                });
                console.log('SUCCESS: Connected to protected route');
            }
        })
    });


}

//Check to make sure header is not undefined, if so, return Forbidden (403)
let checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
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
