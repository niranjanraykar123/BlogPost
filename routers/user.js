const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");


//Router for signup, authentication part.
router
  .route("/signup")
  .get(userController.getsignupForm)
  .post(userController.signup);

//Router for login, authentication part.
router
  .route("/login")
  .get(userController.getLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

//Router for logout, authentication part.
router.get("/logout", userController.logout);
module.exports = router;
