const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const auth = require("../middleware/auth");

router.post("/reg", user.Register);
router.post("/login", user.Login);

module.exports = router;