"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.IncidentRaw = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var incidentRawSchema = new mongoose_1["default"].Schema({
    from: {
        type: String
    },
    search_keyword: {
        type: String
    },
    id: {
        type: String,
        unique: true
    },
    date: {
        type: String
    },
    body: {
        type: String
    },
    link: {
        type: String
    },
    tag: {
        type: String
    },
    type: {
        type: String
    },
    create_at: {
        type: Date
    }
}, { strict: false });
var IncidentRaw = mongoose_1["default"].model('IncidentRaw', incidentRawSchema);
exports.IncidentRaw = IncidentRaw;
