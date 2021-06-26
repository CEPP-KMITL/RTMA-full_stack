"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scrapeMetatags_1 = require("./scrapeMetatags");
var testUrl = 'https://www.bangkokpost.com/thailand/general/2137111/cargo-truck-in-fiery-fatal-plunge';
scrapeMetatags_1.scrapeMetatags(testUrl).then(function (result) {
    console.log(result);
});
