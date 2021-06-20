"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentObject = exports.Incident = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var incidentSchema = new mongoose_1.default.Schema({
    uid: {
        type: String,
        require: [true, 'Incident must have uid'],
    },
    title: {
        type: String,
        require: [true, 'Incident must have title'],
    },
    body: {
        type: String,
        require: [true, 'Incident must have body'],
    },
});
var Incident = mongoose_1.default.model('Incident', incidentSchema);
exports.Incident = Incident;
var IncidentObject = /** @class */ (function () {
    function IncidentObject(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
    return IncidentObject;
}());
exports.IncidentObject = IncidentObject;
