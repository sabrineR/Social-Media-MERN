const {check,validationResult} = require ('express-validator');
const { default: validator } = require('validator');
exports.registerRules= () =>[
    check('pseudo', 'Pseudo is required').notEmpty(),
    check('pseudo', 'This fiels max have 20 caracters').isLength({max:20}),
    check('email', 'This field is require').notEmpty(),
    check('password', 'This field is require').notEmpty(),
    check('email', 'This email not valid').isEmail(),
    check('password', 'Your password need to be at least 6 characters long').isLength({min:6}),
    check('citation', 'max 200 caracter').isLength({max:200}),

]

exports.validator=(req,res,next)=>{
    const errors = validationResult(req);
    errors.isEmpty()? next () : res.status(403).json({
        errors:errors.array()
    }

     )

}