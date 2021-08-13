"use strict";
exports.__esModule = true;
var thairat_1 = require("./puppeteer/thairat");
var axios = require('axios');
console.log('START SCRAPING');
setInterval(runScrapeThairatNews, 60000);
var API_PATH = 'http://178.128.89.207/api/v1/incidentsRaw/postIncident';
function runScrapeThairatNews() {
    thairat_1.scrapeThairatNews('https://www.thairath.co.th/tags/%E0%B8%AD%E0%B8%B8%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B9%80%E0%B8%AB%E0%B8%95%E0%B8%B8').then(function (result) {
        result.forEach(sendToBackend);
        console.log('END SCRAPING');
    });
}
function sendToBackend(newObject) {
    console.log('Sent POST API');
    console.log(newObject);
    axios({
        method: 'post',
        url: API_PATH,
        data: newObject
    });
}
