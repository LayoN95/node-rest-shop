const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getTemp = require('../middleware/get-temp');
const ds18b20 = require('ds18b20-raspi');

const test = require('../middleware/test');



const User = require('../models/user');

router.post('/signup', (req, res, next) =>{
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Mail exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                        });
                        user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User created'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }
        
            })
        }
    })
    .catch();
    
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return result.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                const token = jwt.sign(
                    {
                      email: user[0].email,
                      userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                  );
                  return res.status(200).json({
                    message: "Auth successful",
                    token: token
                  });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


router.get('/gettepm', (req, res, next) => {
    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {
            res.status(200).json({
                message: `${temperature} degC`
            });
            
        }
    });
});


router.get('/render', (req, res, next) => {
   /*ds18b20.readSimpleC(2, (err, temps) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {
            res.render('index', {temp: temps});
            
        }
    });*/
    //getTemp.temp;
    console.log(getTemp.temp);
    res.render('index', {temp: getTemp.temp});
    
});

module.exports = router;