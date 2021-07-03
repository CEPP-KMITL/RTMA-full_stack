import { scrapeMetatags } from './scrapeMetatags';
import { scrapeThairatNews } from './puppeteer/thairat';

const testMetaUrl: string =
  'https://www.thairath.co.th/news/local/northeast/2128251';

scrapeMetatags(testMetaUrl)!.then(function (result: Array<any>) {
  console.log(result);
});

scrapeThairatNews(
  'https://www.thairath.co.th/news/local/northeast/2128251',
)!.then(function (result) {
  console.log(result);
});
