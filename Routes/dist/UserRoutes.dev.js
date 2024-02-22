"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../Controllers/UserController"),
    SignUp = _require.SignUp,
    Login = _require.Login,
    EditAcc = _require.EditAcc,
    getCurrentUser = _require.getCurrentUser;

var VerifyToken = require("../Middlewares/VerifyToken");

router.post("/sign-up", SignUp);
router.post("/login", Login); // Private Route
// router.post("/editAcc", verifyToken, editacc)

router.get("/currentUser", VerifyToken, getCurrentUser);
router.put("/editProfile", VerifyToken, EditAcc);
module.exports = router;