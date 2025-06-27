
const express = require('express')
const router=express.Router();
// const loginOwner=require("../controllers/authController");
// const NewUser = require('../controllers/registerControlle');
const RefreshToken = require('../controllers/refreshTokenController');
// const {registerUserValidation,loginUserValidation}=require("../middleware/validation/");
const { registerUserValidation,loginUserValidation}=require("../validation/userValidation")
const validate=require("../middleware/validate")
const {sign_up,login,logout}=require("../controllers/userControllers")


router.post("/Sign_up",validate(registerUserValidation), sign_up)
router.post("/login",validate(loginUserValidation), login)
router.post("/logout",logout)
// router.post('/register', NewUser);
router.get('/refresh', RefreshToken);



module.exports=router;