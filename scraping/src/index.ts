import { scrapeThairatNews } from './puppeteer/thairat';
console.log('START SCRAPING');
setInterval(runScrapeThairatNews, 600000);

// ! Missing API_URI
// TODO Add URL

function runScrapeThairatNews() {
  scrapeThairatNews(
    'https://www.thairath.co.th/tags/%E0%B8%AD%E0%B8%B8%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B9%80%E0%B8%AB%E0%B8%95%E0%B8%B8',
  )!.then(function (result) {
    console.log(result);
    // fetch('API_URL_HERE', { method: 'POST', body: result })
    //   .then((result) => result.json())
    //   .then(console.log);
    console.log('END SCRAPING');
  });
}
