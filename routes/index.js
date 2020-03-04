const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/login', (req, res, next) => {
    const {username, password} = req.body;

        const promise = User.findOne({username: username});
        promise.then((user) => {
            if (!user) {
                res.json({
                    status: -1,
                    message: 'Autentication failed, user no found!'
                });
            }else{
                bcrypt.compare(password,user.password).then((result)=>{
                    if(result) {
                        const payload = {
                            username,
                        };
                        const token = jwt.sign(payload,req.app.get('api_secret_key'),{
                           expiresIn:720
                        });
                        res.json({status: 1, token: token});
                    }else{
                        res.json({
                            status: -1,
                            message: 'Autentication failed, user no found!'
                        });
                    }
                });
            }
        }).catch((err) => {
            res.json({
                status: -1,
                message: 'Autentication failed, user no found'
            });
    });

});

/* GET register page. */
router.post('/register', (req, res, next) => {
    const {username, password} = req.body;

    bcrypt.hash(password, 10, function (err, hash) {
        const user = new User({
            username,
            password: hash
        });
        const promise = user.save();
        promise.then((data) => {
            res.json({status: 1, data: data});
        }).catch((err) => {
            res.json({status: 0, error: err});
        });
    });
});


module.exports = router;
