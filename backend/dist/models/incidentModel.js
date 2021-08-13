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
        require: [true, 'information must have a type']
    },
    formattedname: {
        type: String,
        require: [true, 'information must have a formattedname']
    },
    content: {
        type: String,
        require: [true, 'information must have a content']
    },
    link: {
        type: String,
        require: [true, 'information must have a link']
    },
    date: {
        type: Date,
        require: [true, 'information must have a date']
    },
    from: {
        type: String,
        require: [true, 'information must have a from']
    },
    province: {
        type: String,
        require: [true, 'information must have aprovince']
    },
    latitude: {
        type: Number,
        require: [true, 'information must have a latitude']
    },
    longitude: {
        type: Number,
        require: [true, 'information must have a longitude']
    }
});
var Incident = mongoose_1["default"].model('Incident', incidentSchema);
exports.Incident = Incident;
