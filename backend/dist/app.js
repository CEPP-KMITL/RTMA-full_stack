"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = require("body-parser");
var config_1 = require("./config/config");
var incidentsRoute_1 = __importDefault(require("./routes/incidentsRoute"));
var incidentsRawRoute_1 = __importDefault(require("./routes/incidentsRawRoute"));
var userRoute_1 = __importDefault(require("./routes/userRoute"));
var redis = require('redis');
var session = require('express-session');
var cors = require('cors');
var RedisStore = require('connect-redis')(session);
var redisClient = redis.createClient({
    host: config_1.CONFIG.REDIS_URL,
    port: config_1.CONFIG.REDIS_PORT
});
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
var app = express_1["default"]();
app.enable('trust proxy');
app.use(cors({}));
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: config_1.CONFIG.SESSION_SECRET,
    cookie: {
        cookieName: 'sessioncookie',
        resave: false,
        saveUninitialized: false,
        secure: false,
        httpOnly: true,
        maxAge: 3000000
    }
}));
var connectWithRetry = function () {
    mongoose_1["default"]
        .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(function () { return console.log('Successfully connected to MongoDB'); })["catch"](function (e) {
        console.log(e);
        setTimeout(connectWithRetry, 5000);
    });
};
app.use(body_parser_1.json());
app.use(function (err, req, res, next) {
    //Error handling middleware.
    res.status(500).json({
        message: err.message
    });
});
app.use('/api/v1/incidents', incidentsRoute_1["default"]);
app.use('/api/v1/incidentsRaw', incidentsRawRoute_1["default"]);
app.use('/api/v1/auth', userRoute_1["default"]);
app.listen(PORT, function () { return console.log("It's alive on http://localhost:" + PORT); });
connectWithRetry();
