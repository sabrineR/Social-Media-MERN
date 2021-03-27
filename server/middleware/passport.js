
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// importer User : model
const User = require("../models/User");
//importer passport
const passport = require('passport');
require('dotenv').config({path:'./config/.env'});
const secretOrKey = process.env.secretOrKey;
const opts ={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : secretOrKey
}

//initialisation passport :
passport.initialize();
//jwt_payload : prend payload de token genere lors de login

passport.use(new JwtStrategy(opts,async(jwt_payload,done)=>{

const {id} = jwt_payload;
// chercher id user dans database
const user =await User.findById((id));
console.log(user)
try{

user ? done (null,user) : done(null,false);

}
catch(error){ console.log('error',error)}}))
 
module.exports = isAuth = () => passport.authenticate('jwt', { session: false })
