const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const userController = require('../controllers/userController');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
router.get('/create-password', userController.generateUserPassword);
const key = process.env.SECRET_KEY || 'secret'
router.post('/register', (req,res)=>{
    const today = new Date()
    const userData ={
        email:req.body.email,
        department:req.body.department,
        password:req.body.password
    }
    User.findOne({
        email:req.body.email
    })
        .then(user=>{
            if(!user){
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    userData.password=hash
                    User.create(userData)
                        .then(user=>{
                            res.json({status:user.email + ' registered'})
                        })
                        .catch(err=>{
                            res.send('error' + err)
                        })
                })
            }else{
                res.json({error:'User Already exist'})
            }
        })
        .catch(err=>{
            res.send('error' + err)
        })
  })
  
  router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const payload = {
                        _id : user._id,
                        department: user.department,
                        email: user.email
                    }
                    let token = jwt.sign(payload, key,{
                        expiresIn: 86400
                    })
                    // module.exports = token
                    res.send(token)
                }else{
                    res.json({error: 'User does not exist'})
                }
            }else{
                res.json({error: 'User does not exist'})
            }
        })
        .catch(err=>{
            res.send('error' + err)
        })
  })
  router.get('/test',(req,res)=>{
    var decode = jwt.verify(req.headers['authorization'], key)
    User.findOne({_id:decode._id})
        .then(user=>{
            if(user){
                res.json(user)
                console.log(user)
            }else{
                res.send('User doesnt exist')
                console.log('User doesnt exist')
            }
        })
        .catch(err=>{
            res.send('error:' + err)
        })
  })
module.exports = router;