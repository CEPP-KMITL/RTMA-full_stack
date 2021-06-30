"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scrapeMetatags_1 = require("./scrapeMetatags");
var thairat_1 = require("./puppeteer/thairat/thairat");
var testMetaUrl = 'https://www.thairath.co.th/news/local/central/2124297';
scrapeMetatags_1.scrapeMetatags(testMetaUrl).then(function (result) {
    console.log(result);
});
thairat_1.scrapeThairatNews('https://www.thairath.co.th/news/local/central/2126296').then(function (result) {
    console.log(result);
});
// scrapeTwitterNews(
//   'https://www.thairath.co.th/news/local/central/2124297'
// )!.then(function (result) {
//   console.log(result);
// });
