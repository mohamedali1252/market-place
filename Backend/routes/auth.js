const router = require("express").Router();
const authController = require('../controllers/authController');

//REGISTER

router.post("/register",authController.register_post);


//LOGIN
router.post("/login",authController.login_post);


//LOGOUT
router.get("/logout",authController.logout_get);



module.exports = router ;