const router = require("express").Router();
const authController = require('../controllers/authController');

//REGISTER
router.get("/register",authController.register_get);
router.post("/register",authController.register_post);


//LOGIN
// router.get("/login",authController.login_get);
// router.get("/login",(req,res)=>{
//     res.render('page');
// });
router.post("/login",authController.login_post);


//LOGOUT
router.get("/logout",authController.logout_get);



module.exports = router ;