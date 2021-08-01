"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteIncident = exports.updateIncident = exports.getIncident = exports.getAllIncidents = exports.createIncident = void 0;
var incidentRawModel_1 = require("../models/incidentRawModel");
function ObjectLength(object) {
    var length = 0;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            ++length;
        }
    }
    return length;
}
var createIncident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var from, search_keyword, id, date, body, link, type, create_at, newIncident, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                create_at = new Date();
                if (req.body.from != undefined) {
                    from = req.body.from;
                    search_keyword = req.body.search_keyword;
                    id = req.body.body.id;
                    date = req.body.body.date + req.body.body.time;
                    body = req.body.body.tweet;
                    link = req.body.body.link;
                    create_at = new Date();
                    if (req.body.search_keyword.includes('ชน')) {
                        type = 'รถชน';
                    }
                    else if (req.body.search_keyword.includes('ไหม้')) {
                        type = 'ไฟไหม้';
                    }
                    else {
                        type = 'อุบัติเหตุอื่นๆ';
                    }
                }
                else {
                    from = 'ไทยรัฐ';
                    search_keyword = req.body.metaScrape.description;
                    id = req.body.metaScrape.title;
                    date = req.body.deepScrape.date;
                    body = req.body.deepScrape.body;
                    link = req.body.metaScrape.url;
                    create_at = new Date();
                    if (req.body.deepScrape.body.includes('ชน')) {
                        type = 'รถชน';
                    }
                    else if (req.body.deepScrape.body.includes('ไหม้')) {
                        type = 'ไฟไหม้';
                    }
                    else {
                        type = 'อุบัติเหตุอื่นๆ';
                    }
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, incidentRawModel_1.IncidentRaw.create({
                        from: from,
                        search_keyword: search_keyword,
                        id: id,
                        date: date,
                        body: body,
                        link: link,
                        type: type,
                        check: false,
                        create_at: create_at
                    })];
            case 2:
                newIncident = _a.sent();
                res.status(201).json({
                    message: 'Create incident successfully.',
                    createdIncident: newIncident
                });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                res.status(400).json({
                    message: 'Fail to create incident' + ' : ' + e_1
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createIncident = createIncident;
var getAllIncidents = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allIncidents, incidentIdList, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, incidentRawModel_1.IncidentRaw.find({ check: false })];
            case 1:
                allIncidents = _a.sent();
                incidentIdList = allIncidents.map(function (e) { return e._id; });
                console.log(incidentIdList);
                return [4 /*yield*/, Promise.all(incidentIdList.map(function (element) {
                        return incidentRawModel_1.IncidentRaw.findByIdAndUpdate(String(element), { check: true });
                    }))];
            case 2:
                _a.sent();
                res.status(201).json({
                    message: 'Get all current incidents successfully.',
                    results: ObjectLength(allIncidents),
                    getIncidents: allIncidents
                });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.status(400).json({
                    message: 'Fail to get all current incidents ' + ' : ' + e_2
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllIncidents = getAllIncidents;
var getIncident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var targetIncident, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, incidentRawModel_1.IncidentRaw.findById(req.params.id)];
            case 1:
                targetIncident = _a.sent();
                res.status(201).json({
                    message: 'Get the incidents successfully.',
                    getIncident: targetIncident
                });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(400).json({
                    message: 'Fail to get the incidents' + ' : ' + e_3
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getIncident = getIncident;
var updateIncident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var targetIncident, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, incidentRawModel_1.IncidentRaw.findByIdAndUpdate(req.params.id, req.body, { "new": true, runValidators: true })];
            case 1:
                targetIncident = _a.sent();
                res.status(201).json({
                    message: 'Update the incident successfully.',
                    updateTarget: targetIncident
                });
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(400).json({
                    message: 'Fail to update the incident' + ' : ' + e_4
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateIncident = updateIncident;
var deleteIncident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var targetIncident, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, incidentRawModel_1.IncidentRaw.findByIdAndDelete(req.params.id)];
            case 1:
                targetIncident = _a.sent();
                res.status(201).json({
                    message: 'Delete the incident successfully.',
                    deleteTarget: targetIncident
                });
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.status(400).json({
                    message: 'Fail to delete the incident' + ' : ' + e_5
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteIncident = deleteIncident;