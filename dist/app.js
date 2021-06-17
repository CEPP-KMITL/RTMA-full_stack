"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var incidents_1 = __importDefault(require("./routes/incidents"));
var PORT = Number(process.env.PORT) || 3000;
var app = express_1.default();
app.use(body_parser_1.json());
app.use(function (err, req, res, next) {
    //Error handling middleware.
    res.status(500).json({
        message: err.message,
    });
});
app.use('/incidents', incidents_1.default);
app.listen(PORT, function () { return console.log("It's alive on http://localhost:" + PORT); });
