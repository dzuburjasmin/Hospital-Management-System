const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController")

// <>

router.get('/', controller.user_display_all);

router.post('/register',controller.user_register)

router.post("/login", controller.user_login)

router.post("/update",controller.user_update_profile)

router.post("/password",controller.user_update_password)


// </>


module.exports = router