"use strict";
exports.__esModule = true;
var scrapeMetatags_1 = require("./scrapeMetatags");
var thairat_1 = require("./puppeteer/thairat");
var testMetaUrl = 'https://www.thairath.co.th/news/local/northeast/2128251';
scrapeMetatags_1.scrapeMetatags(testMetaUrl).then(function (result) {
    console.log(result);
});
thairat_1.scrapeThairatNews('https://www.thairath.co.th/news/local/northeast/2128251').then(function (result) {
    console.log(result);
});
