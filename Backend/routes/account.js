const express = require("express");
const router = express.Router();
const {changePassword,deleteAccount} = require("../controllers/accountController")


router.post("/changePassword", changePassword);
router.post("/deleteAccount", deleteAccount);

module.exports = router
