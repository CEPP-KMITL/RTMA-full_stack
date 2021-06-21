"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var router = express_1.Router();
router.post('/signUp', authController_1.signUp);
exports.default = router;
