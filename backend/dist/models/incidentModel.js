"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Incident = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var incidentSchema = new mongoose_1["default"].Schema({
    title: {
        type: String,
        require: [true, 'Incident must have title']
    },
    body: {
        type: String,
        require: [true, 'Incident must have body']
    }
});
var Incident = mongoose_1["default"].model('Incident', incidentSchema);
exports.Incident = Incident;
