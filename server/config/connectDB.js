const mongoose = require('mongoose');
require('dotenv').config({path:"./config/.env"});

const connectDB = async()=>{
    try{
await mongoose.connect(process.env.MONGOURI,{ useNewUrlParser: true,
    useUnifiedTopology: true,
  useFindAndModify:false
})
console.log('database connected succesfully')
}
catch (err){
    console.log("data base connection failed",err);
}
}

//exporter la fonction de connection 
module.exports=connectDB;