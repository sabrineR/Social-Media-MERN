const express = require ('express');
const { register,login, getAllUSers, getInfoUser, updateInfoUser, deleteUser } = require('../controllers/user.controller');
const { registerRules,validator } = require('../middleware/validator');
const isAuth= require('../middleware/passport')

const router = express.Router();

router.post('/register', registerRules(),validator,register );
router.post('/login',login);
router.get("/profil",isAuth(), (req,res)=>{res.send(req.user);})
router.put('/:_id',updateInfoUser)

router.get('/',getAllUSers);
// pousr consulter autre profil:
router.get('/:_id',getInfoUser)

router.delete('/:_id',deleteUser)

module.exports = router
