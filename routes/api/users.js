
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');


// @route  GET api/users/test
// @desc   Test Users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users works"}));


// @route  GET api/users/register
// @desc   Test Register User
// @access Public
router.post('/register', (req, res) => {

    // Validations:
    const { errors, isValid } = validateRegisterInput(req.body);
    //checking 
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //------------


    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){

                errors.email = 'Email already exist';

                return res.status(400).json(errors)
            } else {

                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', // Rating
                    d: 'mm'  //default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) =>{
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})





// @route  GET api/users/login
// @desc   Login User / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {

    // Validations:
    const { errors, isValid } = validateLoginInput(req.body);
    //checking 
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //------------    

    const email = req.body.email;
    const password = req.body.password;

    //
    User.findOne({email})
    .then(user =>{
        // check for user
        if(!user){
            errors.email = 'User email not found';
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password)
            .then(isMatch => {

                if(isMatch){
                    //res.json({msg: 'Success'});
                    const payload = { id: user.id, name: user.name, avatar: user.avatar } // create JWT Payload

                    // User match - JWT 
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                    });

                }else{
                    errors.password = 'Password incorrect'
                    return res.status(400).json(errors);
                }
            })
    });
});


// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false}),
    (req, res) => {
        //res.json({msg: 'Success'});
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            av: req.user.avatar
        });
    }
);


module.exports = router;