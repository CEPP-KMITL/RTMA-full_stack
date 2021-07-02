"use strict";
exports.__esModule = true;
var scrapeMetatags_1 = require("./scrapeMetatags");
var thairat_1 = require("./puppeteer/thairat");
var twitter_1 = require("./puppeteer/twitter");
var testMetaUrl = 'https://www.thairath.co.th/news/local/central/2124297';
console.log('Test');
scrapeMetatags_1.scrapeMetatags(testMetaUrl).then(function (result) {
    console.log(result);
});
thairat_1.scrapeThairatNews('https://www.thairath.co.th/news/local/central/2126296').then(function (result) {
    console.log(result);
});
twitter_1.scrapeTwitterNews('https://www.thairath.co.th/news/local/central/2124297').then(function (result) {
    console.log(result);
});
