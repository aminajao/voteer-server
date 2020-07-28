const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
var indexRouter = require('./routes/admin');
const mongoose = require("mongoose");
mongoURI = process.env.ATLAS_URI
 mongoose.connect(mongoURI,
  {
    useNewUrlParser: true,
  useCreateIndex:true,
   useUnifiedTopology:true,
   useFindAndModify: false
 })
const connection = mongoose.connection
connection.once('open', ()=>{
 console.log('MongoDB database connected succesfully')
},function(err, db) {  
  if (err) throw err;  
  var admins = [     
  { name: "Jubril Musa", email: "jewbreel1@gmail.com", password: "Jubril123"},  
  { name: "Ajao Amin", email: "aminajao96@gmail.com", password: "Ajao123"} 
  ];  
  db.collection("users").insert(admins, function(err, res) {  
  if (err) throw err;  
  console.log("Number of records inserted: " + res.insertedCount);  
  db.close()
}  )})

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', indexRouter);


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});