const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  pseudo: String,
  email: String,
  password: String,
  phoneNumber : Number,
  citation:String,
  photoProfil:String,

  
});

module.exports = User = mongoose.model("user", userSchema);
