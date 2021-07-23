"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1["default"].Schema({
    username: {
        type: String,
        require: [true, 'User must have a username'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'User must have a password']
    }
});
var User = mongoose_1["default"].model('User', userSchema);
exports.User = User;
