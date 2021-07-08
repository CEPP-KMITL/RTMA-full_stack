import { scrapeMetatags } from './scrapeMetatags';
import { scrapeThairatNews } from './puppeteer/thairat';

const testMetaUrl: string =
  'https://www.thairath.co.th/news/local/northeast/2128251';

// scrapeThairatNews(
//   'https://www.thairath.co.th/news/local/northeast/2128251',
// )!.then(function (result) {
//   console.log(result);
// });

scrapeThairatNews(
  'https://www.thairath.co.th/tags/%E0%B8%AD%E0%B8%B8%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B9%80%E0%B8%AB%E0%B8%95%E0%B8%B8',
)!.then(function (result) {
  console.log(result);
});
