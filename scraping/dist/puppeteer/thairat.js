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
exports.scrapeThairatNews = void 0;
var scrapeMetatags_1 = require("../scrapeMetatags");
var puppeteer = require('puppeteer-extra');
var selector_1 = require("../share/selector");
function extractLink(rawHTML) {
    var listString = rawHTML.split(' ');
    var newList = [];
    var arrayLength = listString.length;
    for (var i = 0; i < arrayLength; i++) {
        if (String(listString[i]).includes('href=')) {
            var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
            var rawLink = listString[i];
            var match = rawLink.match(expression);
            if (match !== null) {
                match[0] = match[0].replace('"', '');
                if (!newList.includes(match[0])) {
                    newList.push(match[0]);
                }
            }
        }
    }
    newList.splice(0, 1);
    return newList;
}
var AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin());
var scrapeThairatNews = function (targetURL) { return __awaiter(void 0, void 0, void 0, function () {
    var allScrapeNews, browser_1, page, links_news, allTargetNews, i, meta, title, e_1, body, e_2, date, e_3, tag, e_4, trimBody, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 33, , 34]);
                allScrapeNews = [];
                return [4 /*yield*/, puppeteer.launch({ headless: true })];
            case 1:
                browser_1 = _a.sent();
                return [4 /*yield*/, browser_1.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(targetURL)];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.waitFor(500)];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.click(selector_1.THAIRAT.SEE_MORE)];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.waitFor(500)];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.screenshot({ path: 'response.png', fullPage: true })];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.$eval(selector_1.THAIRAT.HREF_NEWS, function (elem) { return elem.innerHTML; })];
            case 8:
                links_news = _a.sent();
                allTargetNews = extractLink(links_news);
                i = 0;
                _a.label = 9;
            case 9:
                if (!(i < allTargetNews.length)) return [3 /*break*/, 31];
                return [4 /*yield*/, scrapeMetatags_1.scrapeMetatags(allTargetNews[i])];
            case 10:
                meta = _a.sent();
                return [4 /*yield*/, page.waitFor(500)];
            case 11:
                _a.sent();
                return [4 /*yield*/, page.goto(allTargetNews[i])];
            case 12:
                _a.sent();
                return [4 /*yield*/, page.waitFor(500)];
            case 13:
                _a.sent();
                title = '';
                _a.label = 14;
            case 14:
                _a.trys.push([14, 16, , 17]);
                return [4 /*yield*/, page.$eval(selector_1.THAIRAT.TITLE, function (elem) { return elem.innerText; })];
            case 15:
                title = _a.sent();
                return [3 /*break*/, 17];
            case 16:
                e_1 = _a.sent();
                return [3 /*break*/, 17];
            case 17:
                body = '';
                _a.label = 18;
            case 18:
                _a.trys.push([18, 20, , 21]);
                return [4 /*yield*/, page.$eval(selector_1.THAIRAT.BODY, function (elem) { return elem.innerText; })];
            case 19:
                body = _a.sent();
                return [3 /*break*/, 21];
            case 20:
                e_2 = _a.sent();
                return [3 /*break*/, 21];
            case 21:
                date = '';
                _a.label = 22;
            case 22:
                _a.trys.push([22, 24, , 25]);
                return [4 /*yield*/, page.$eval(selector_1.THAIRAT.DATE, function (elem) { return elem.innerText; })];
            case 23:
                date = _a.sent();
                return [3 /*break*/, 25];
            case 24:
                e_3 = _a.sent();
                return [3 /*break*/, 25];
            case 25:
                tag = '';
                _a.label = 26;
            case 26:
                _a.trys.push([26, 28, , 29]);
                return [4 /*yield*/, page.$eval(selector_1.THAIRAT.TAG, function (elem) { return elem.innerText; })];
            case 27:
                tag = _a.sent();
                return [3 /*break*/, 29];
            case 28:
                e_4 = _a.sent();
                return [3 /*break*/, 29];
            case 29:
                trimBody = 'error';
                if (body === undefined) {
                }
                else {
                    trimBody = body.replace(/\n/g, '').trim();
                }
                if (trimBody === 'ข่าวแนะนำ') {
                    trimBody = '';
                }
                allScrapeNews.push({
                    metaScrape: meta[0],
                    deepScrape: {
                        targetURL: allTargetNews[i],
                        title: title,
                        body: trimBody,
                        date: date,
                        tag: tag,
                        image: meta[0].image
                    }
                });
                _a.label = 30;
            case 30:
                i++;
                return [3 /*break*/, 9];
            case 31: return [4 /*yield*/, browser_1.close()];
            case 32:
                _a.sent();
                return [2 /*return*/, allScrapeNews];
            case 33:
                e_5 = _a.sent();
                return [2 /*return*/, e_5];
            case 34: return [2 /*return*/];
        }
    });
}); };
exports.scrapeThairatNews = scrapeThairatNews;
