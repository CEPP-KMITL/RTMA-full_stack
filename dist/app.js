"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = require("body-parser");
var config_1 = require("./config/config");
var incidentsRoute_1 = __importDefault(require("./routes/incidentsRoute"));
var userRoute_1 = __importDefault(require("./routes/userRoute"));
var PORT = Number(process.env.PORT) || 3000;
var mongoURL = 'mongodb://' +
    config_1.CONFIG.MONGO_USER +
    ':' +
    config_1.CONFIG.MONGO_PASSWORD +
    '@' +
    config_1.CONFIG.MONGO_IP +
    ':' +
    config_1.CONFIG.MONGO_PORT +
    '/?authSource=admin';
var app = express_1.default();
var connectWithRetry = function () {
    mongoose_1.default
        .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .then(function () { return console.log('Successfully connected to MongoDB'); })
        .catch(function (e) {
        console.log(e);
        setTimeout(connectWithRetry, 5000);
    });
};
app.use(body_parser_1.json());
app.use(function (err, req, res, next) {
    //Error handling middleware.
    res.status(500).json({
        message: err.message,
    });
});
app.use('/api/v1/incidents', incidentsRoute_1.default);
app.use('/api/v1/auth', userRoute_1.default);
app.listen(PORT, function () { return console.log("It's alive on http://localhost:" + PORT); });
connectWithRetry();
