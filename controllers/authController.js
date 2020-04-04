const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Defining methods for the authController
module.exports = {
    login: async function (req, res, next) {
        try{
            console.log("login", req.body)
            const user = await User.findOne({email: req.body.email});
            if(!user){
                throw new Error('User does not exist!')
            }
            const isEqual = await bcrypt.compare(req.body.password, user.password);
            if(!isEqual){
                throw new Error('Password is incorrect!');
            }
            const token = await jwt.sign({
                userId: user.id,
                email: user.email,
            }, 
            `abc`,
            {
                expiresIn: '1h'
            });
            return res.json({
                userId: user.id,
                token: token,
                tokenExpiration: 1,
            })
        }
        catch (err){
            console.log({err});
            next(err)
        }   
       
    },
    signup: async function (req, res, next) {
        console.log(req.name)
        try{
            console.log("signup", req.body)
              const result = await User.findOne({email: req.body.email});
              if(result){
                  throw new Error('User already exists.')
              }
              console.log(req.body.email);
              const hashedPassword = await bcrypt.hash(req.body.password, 12)
              const user = new User({
                  email: req.body.email,
                  password: hashedPassword,
              });  
              const savedUser = await user.save();
              return res.json({email: savedUser.email, password: null, _id: savedUser.id});
          }
          catch (err){
              console.log({err});
              next(err)
          }   
        
    }
};