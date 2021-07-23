"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var router = express_1.Router();
router.post('/signUp', authController_1.signUp);
router.post('/login', authController_1.login);
exports["default"] = router;
