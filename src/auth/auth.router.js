const router = require("express").Router();

const authServices = require("./auth.http");
const userServies = require("../users/users.http");

router.post("/login", authServices.login);
router.post("/register", userServies.register);

exports.router = router;