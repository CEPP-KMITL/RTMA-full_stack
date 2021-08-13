import { scrapeThairatNews } from './puppeteer/thairat';
const axios = require('axios');

console.log('START SCRAPING');
setInterval(runScrapeThairatNews, 60000);

const API_PATH: String =
  'http://178.128.89.207/api/v1/incidentsRaw/postIncident';

function runScrapeThairatNews() {
  scrapeThairatNews(
    'https://www.thairath.co.th/tags/%E0%B8%AD%E0%B8%B8%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B9%80%E0%B8%AB%E0%B8%95%E0%B8%B8',
  )!.then(function (result) {
    result.forEach(sendToBackend);
    console.log('END SCRAPING');
  });
}

function sendToBackend(newObject: Object) {
  console.log('Sent POST API');
  console.log(newObject);
  axios({
    method: 'post',
    url: API_PATH,
    data: newObject,
  });
}
