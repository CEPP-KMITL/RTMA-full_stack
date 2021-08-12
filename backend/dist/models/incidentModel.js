"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Incident = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var incidentSchema = new mongoose_1["default"].Schema({
    type: {
        type: String,
        require: [true, 'User must have a username']
    },
    formattedname: {
        type: String,
        require: [true, 'User must have a username']
    },
    content: {
        type: String,
        require: [true, 'User must have a username']
    },
    link: {
        type: String,
        require: [true, 'User must have a username']
    },
    date: {
        type: Date,
        require: [true, 'User must have a username']
    },
    from: {
        type: String,
        require: [true, 'User must have a username']
    },
    province: {
        type: String,
        require: [true, 'User must have a username']
    },
    latitude: {
        type: Number,
        require: [true, 'User must have a username']
    },
    longitude: {
        type: Number,
        require: [true, 'User must have a username']
    }
});
var Incident = mongoose_1["default"].model('Incident', incidentSchema);
exports.Incident = Incident;
