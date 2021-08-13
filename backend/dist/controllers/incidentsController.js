"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteIncident = exports.updateIncident = exports.getIncident = exports.get8hoursincident = exports.getonedayincident = exports.getfiveprovince = exports.getAllIncidents = exports.createIncident = void 0;
var incidentModel_1 = require("../models/incidentModel");
function ObjectLength(object) {
    var length = 0;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            ++length;
        }
    }
    return length;
}
function heapify(count_province, province_name, n, i) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;
    if (l < n && count_province[l] > count_province[largest])
        largest = l;
    if (r < n && count_province[r] > count_province[largest])
        largest = r;
    if (largest != i) {
        var swap = count_province[i];
        var swap2 = province_name[i];
        province_name[i] = province_name[largest];
        count_province[i] = count_province[largest];
        count_province[largest] = swap;
        province_name[largest] = swap2;
        heapify(count_province, province_name, n, largest);
    }
}
var createIncident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var date, temp, check, allIncidents, i, R, dLat, dLon, a, c, d, newIncident, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = new Date();
                temp = new Date();
                check = 1;
                temp.setHours(temp.getHours() - 1);
                return [4 /*yield*/, incidentModel_1.Incident.find().where('date').gt(temp.toISOString())];
            case 1:
                allIncidents = _a.sent();
                for (i in allIncidents) {
                    R = 6371;
                    dLat = (allIncidents[i].latitude - req.body.latitude) * (Math.PI / 180);
                    dLon = (allIncidents[i].longitude - req.body.longitude) * (Math.PI / 180);
                    a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(req.body.latitude * (Math.PI / 180)) * Math.cos(allIncidents[i].latitude * (Math.PI / 180)) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    d = R * c;
                    if (d < 0.4) {
                        check = 2;
                    }
                    else {
                        check = 3;
                    }
                }
                if (!(check == 3)) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, incidentModel_1.Incident.create(__assign(__assign({}, req.body), { date: date }))];
            case 3:
                newIncident = _a.sent();
                res.status(201).json({
                    message: 'Create incident successfully.',
                    createdIncident: newIncident
                });
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                res.status(400).json({
                    message: 'Fail to create incident' + ' : ' + e_1
                });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                if (check == 2) {
                    res.status(400).json({
                        message: 'Fail to create incident' + ' :  location duplicate information'
                    });
                }
                else if (check == 1) {
                    res.status(400).json({
                        message: 'Fail to create incident' + ' :  ไม่มีโลเคชั่น'
                    });
                }
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createIncident = createIncident;
var getAllIncidents = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allIncidents, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, incidentModel_1.Incident.find()];
            case 1:
                allIncidents = _a.sent();
                res.status(201).json({
                    message: 'Get all current incidents successfully.',
                    results: ObjectLength(allIncidents),
                    getIncidents: allIncidents
                });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(400).json({
                    message: 'Fail to get all current incidents ' + ' : ' + e_2
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllIncidents = getAllIncidents;
var getfiveprovince = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var province_counter, count_province, province_name, top5, i, addcount, count, i_1, j, gettop, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                province_counter = [{ "province": "จ.กรุงเทพมหานคร" }, { "province": "จ.กระบี่" }, { "province": "จ.กาญจนบุรี" }, { "province": "จ.กาฬสินธุ์" }, { "province": "จ.กำแพงเพชร" },
                    { "province": "จ.ขอนแก่น" }, { "province": "จ.จันทบุรี" }, { "province": "จ.ฉะเชิงเทรา" }, { "province": "จ.ชลบุรี" }, { "province": "จ.ชัยนาท" },
                    { "province": "จ.ชัยภูมิ" }, { "province": "จ.ชุมพร" }, { "province": "จ.เชียงราย" }, { "province": "จ.เชียงใหม่" }, { "province": "จ.ตรัง" },
                    { "province": "จ.ตราด" }, { "province": "จ.ตาก" }, { "province": "จ.นครนายก" }, { "province": "จ.นครปฐม" }, { "province": "จ.นครพนม" },
                    { "province": "จ.นครราชสีมา" }, { "province": "จ.นครศรีธรรมราช" }, { "province": "จ.นครสวรรค์" }, { "province": "จ.นนทบุรี" }, { "province": "จ.นราธิวาส" },
                    { "province": "จ.น่าน" }, { "province": "จ.บึงกาฬ" }, { "province": "จ.บุรีรัมย์" }, { "province": "จ.ปทุมธานี" }, { "province": "จ.ประจวบคีรีขันธ์" },
                    { "province": "จ.ปราจีนบุรี" }, { "province": "จ.ปัตตานี" }, { "province": "จ.พระนครศรีอยุธยา" }, { "province": "จ.พังงา" }, { "province": "จ.พัทลุง" },
                    { "province": "จ.พิจิตร" }, { "province": "จ.พิษณุโลก" }, { "province": "จ.เพชรบุรี" }, { "province": "จ.เพชรบูรณ์" }, { "province": "จ.แพร่" },
                    { "province": "จ.พะเยา" }, { "province": "จ.ภูเก็ต" }, { "province": "จ.มหาสารคาม" }, { "province": "จ.มุกดาหาร" }, { "province": "จ.แม่ฮ่องสอน" },
                    { "province": "จ.ยะลา" }, { "province": "จ.ยโสธร" }, { "province": "จ.ร้อยเอ็ด" }, { "province": "จ.ระนอง" }, { "province": "จ.ระยอง" },
                    { "province": "จ.ราชบุรี" }, { "province": "จ.ลพบุรี" }, { "province": "จ.ลำปาง" }, { "province": "จ.ลำพูน" }, { "province": "จ.เลย" },
                    { "province": "จ.ศรีสะเกษ" }, { "province": "จ.สกลนคร" }, { "province": "จ.สงขลา" }, { "province": "จ.สตูล" }, { "province": "จ.สมุทรปราการ" },
                    { "province": "จ.สมุทรสงคราม" }, { "province": "จ.สมุทรสาคร" }, { "province": "จ.สระแก้ว" }, { "province": "จ.สระบุรี" }, { "province": "จ.สิงห์บุรี" },
                    { "province": "จ.สุโขทัย" }, { "province": "จ.สุพรรณบุรี" }, { "province": "จ.สุราษฎร์ธานี" }, { "province": "จ.สุรินทร์" }, { "province": "จ.หนองคาย" },
                    { "province": "จ.หนองบัวลำภู" }, { "province": "จ.อ่างทอง" }, { "province": "จ.อุดรธานี" }, { "province": "จ.อุทัยธานี" }, { "province": "จ.อุตรดิตถ์" },
                    { "province": "จ.อุบลราชธานี" }, { "province": "จ.อำนาจเจริญ" }];
                count_province = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0];
                province_name = ["จ.กรุงเทพมหานคร", "จ.กระบี่", "จ.กาญจนบุรี", "จ.กาฬสินธุ์", "จ.กำแพงเพชร",
                    "จ.ขอนแก่น", "จ.จันทบุรี", "จ.ฉะเชิงเทรา", "จ.ชลบุรี", "จ.ชัยนาท",
                    "จ.ชัยภูมิ", "จ.ชุมพร", "จ.เชียงราย", "จ.เชียงใหม่", "จ.ตรัง",
                    "จ.ตราด", "จ.ตาก", "จ.นครนายก", "จ.นครปฐม", "จ.นครพนม",
                    "จ.นครราชสีมา", "จ.นครศรีธรรมราช", "จ.นครสวรรค์", "จ.นนทบุรี", "จ.นราธิวาส",
                    "จ.น่าน", "จ.บึงกาฬ", "จ.บุรีรัมย์", "จ.ปทุมธานี", "จ.ประจวบคีรีขันธ์",
                    "จ.ปราจีนบุรี", "จ.ปัตตานี", "จ.พระนครศรีอยุธยา", "จ.พังงา", "จ.พัทลุง",
                    "จ.พิจิตร", "จ.พิษณุโลก", "จ.เพชรบุรี", "จ.เพชรบูรณ์", "จ.แพร่",
                    "จ.พะเยา", "จ.ภูเก็ต", "จ.มหาสารคาม", "จ.มุกดาหาร", "จ.แม่ฮ่องสอน",
                    "จ.ยะลา", "จ.ยโสธร", "จ.ร้อยเอ็ด", "จ.ระนอง", "จ.ระยอง",
                    "จ.ราชบุรี", "จ.ลพบุรี", "จ.ลำปาง", "จ.ลำพูน", "จ.เลย",
                    "จ.ศรีสะเกษ", "จ.สกลนคร", "จ.สงขลา", "จ.สตูล", "จ.สมุทรปราการ",
                    "จ.สมุทรสงคราม", "จ.สมุทรสาคร", "จ.สระแก้ว", "จ.สระบุรี", "จ.สิงห์บุรี",
                    "จ.สุโขทัย", "จ.สุพรรณบุรี", "จ.สุราษฎร์ธานี", "จ.สุรินทร์", "จ.หนองคาย",
                    "จ.หนองบัวลำภู", "จ.อ่างทอง", "จ.อุดรธานี", "จ.อุทัยธานี", "จ.อุตรดิตถ์",
                    "จ.อุบลราชธานี", "จ.อำนาจเจริญ"];
                top5 = [[], [], [], [], []];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < province_counter.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, incidentModel_1.Incident.where(province_counter[i]).count()];
            case 2:
                addcount = _a.sent();
                count_province[i] += addcount;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                count = Array.from(new Set(count_province)).sort().reverse();
                for (i_1 = 0; i_1 < province_name.length; i_1++) {
                    for (j = 0; j < count.length; j++) {
                        if (j >= 5) {
                            break;
                        }
                        if (count_province[i_1] == count[j] && count_province[i_1] != 0) {
                            top5[j].push(province_name[i_1]);
                        }
                    }
                }
                gettop = {
                    "st1": top5[0],
                    "nd2": top5[1],
                    "rd3": top5[2],
                    "th4": top5[3],
                    "th5": top5[4]
                };
                console.log(count);
                res.status(201).json({
                    message: 'Get all current incidents successfully.',
                    getIncidents: gettop
                });
                return [3 /*break*/, 6];
            case 5:
                e_3 = _a.sent();
                res.status(400).json({
                    message: 'Fail to get all current incidents ' + ' : ' + e_3
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getfiveprovince = getfiveprovince;
var getonedayincident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var temp, allIncidents, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                temp = new Date();
                temp.setDate(temp.getDate() - 1);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, incidentModel_1.Incident.find().where('date').gt(temp.toISOString())];
            case 2:
                allIncidents = _a.sent();
                res.status(201).json({
                    message: 'Get all current incidents successfully.',
                    results: ObjectLength(allIncidents),
                    getIncidents: allIncidents
                });
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                res.status(400).json({
                    message: 'Fail to get all current incidents ' + ' : ' + e_4
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getonedayincident = getonedayincident;
var get8hoursincident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var temp, allIncidents, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                temp = new Date();
                temp.setHours(temp.getHours() - 8);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, incidentModel_1.Incident.find().where('date').gt(temp.toISOString())];
            case 2:
                allIncidents = _a.sent();
                res.status(201).json({
                    message: 'Get all current incidents successfully.',
                    results: ObjectLength(allIncidents),
                    getIncidents: allIncidents
                });
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.status(400).json({
                    message: 'Fail to get all current incidents ' + ' : ' + e_5
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.get8hoursincident = get8hoursincident;
var getIncident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var targetIncident, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, incidentModel_1.Incident.findById(req.params.id)];
            case 1:
                targetIncident = _a.sent();
                res.status(201).json({
                    message: 'Get the incidents successfully.',
                    getIncident: targetIncident
                });
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.status(400).json({
                    message: 'Fail to get the incidents' + ' : ' + e_6
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getIncident = getIncident;
var updateIncident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var targetIncident, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, incidentModel_1.Incident.findByIdAndUpdate(req.params.id, req.body, { "new": true, runValidators: true })];
            case 1:
                targetIncident = _a.sent();
                res.status(201).json({
                    message: 'Update the incident successfully.',
                    updateTarget: targetIncident
                });
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                res.status(400).json({
                    message: 'Fail to update the incident' + ' : ' + e_7
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateIncident = updateIncident;
var deleteIncident = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var targetIncident, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, incidentModel_1.Incident.findByIdAndDelete(req.params.id)];
            case 1:
                targetIncident = _a.sent();
                res.status(201).json({
                    message: 'Delete the incident successfully.',
                    deleteTarget: targetIncident
                });
                return [3 /*break*/, 3];
            case 2:
                e_8 = _a.sent();
                res.status(400).json({
                    message: 'Fail to delete the incident' + ' : ' + e_8
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteIncident = deleteIncident;
