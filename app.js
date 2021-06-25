const express = require("express");
const mongoose = require("mongoose");
const route = require('./app/routes/route');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('Database Connected'))
.catch((err)=>console.log(err));

const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
  res.send("Your API is Started")
});

app.use('/auth',route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);
