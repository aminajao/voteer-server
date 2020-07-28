var express = require('express');
var router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY || 'secret'
var bcrypt = require('bcrypt')
router.use(cors())
const User = require('../models/user')
const Candidate = require('../models/Candidate')


router.get('/',async(req,res)=>{
    try {
        const candidates = await Candidate.find();
        if (!candidates) throw Error('No candidate registered yet');
    
        res.status(200).json(candidates);
      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
})
router.get('/candidates',async(req,res)=>{
    try {
        const candidates = await Candidate.find();
        if (!candidates) throw Error('No candidate registered yet');
    
        res.status(200).json(candidates);
      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
})

router.post('/candidate', async (req, res) => {
    const newCandidate = new Candidate({
      fullName: req.body.fullName,
      email:req.body.email,
    department:req.body.department,
    level:req.body.level,
    image:req.body.image
    });
  
    try {
      const candidate = await newCandidate.save();
      if (!candidate) throw Error('Something went wrong when registering the candidate');
  
      res.status(200).json(candidate);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
  
  
  router.get('/candidate/:id', async(req,res)=>{
      const candidate = await Candidate.findById({_id:req.params.id})
      res.status(200).json(candidate)
  })
  router.delete('/candidate/:id',  async (req, res) => {
    try {
      const candidate = await Candidate.findById(req.params.id);
      if (!candidate) throw Error('No candidate found');
  
      const removed = await candidate.remove();
      if (!removed)
        throw Error('Something went wrong while trying to delete the candidate');
  
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

  router.post('/signup', async(req,res)=>{
    const today = new Date()
    const userData ={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        created:today
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
                        name: user.name,
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



module.exports = router;
