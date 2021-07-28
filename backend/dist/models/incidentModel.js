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
        require: [true, 'Incident must have title'],
        unique: true
    },
    information: {
        type: String,
        require: [true, 'Incident must have information']
    },
    type: {
        type: String,
        require: [true, 'Incident must have type']
    },
    source: {
        type: String,
        require: [true, 'Incident must have source']
    },
    location: {
        type: String,
        require: [true, 'Incident must have location']
    },
    date: {
        type: Date,
        "default": new Date()
    }
});
var Incident = mongoose_1["default"].model('Incident', incidentSchema);
exports.Incident = Incident;
