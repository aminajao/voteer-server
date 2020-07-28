const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
   fullName:{
       type:String
   },
   email:{
       type:String
   },
   department:{
       type:String
   },
   level:{
       type:String
   },
   image:{
       type:String
   },
   created:{
       type:Date,
       default: Date.now()
   }
})
const Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;