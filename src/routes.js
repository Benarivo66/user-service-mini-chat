const express = require('express');
const router = express.Router();

const { signup, login } = require("./controller");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", (req, res) => res.send("Welcome to User Mini Chat Service"));

module.exports = router;
