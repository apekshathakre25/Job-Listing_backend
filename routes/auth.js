const express = require("express");
const router = express.Router();
const { register } = require("../controller/user");
const {login} = require ("../controller/user")

router.post("/register", register);
router.post("/login", login)

module.exports = router;
