import { scrapeMetatags } from '../scrapeMetatags';
const puppeteer = require('puppeteer-extra');
import { THAIRAT } from '../share/selector';

function extractLink(rawHTML: string) {
  let listString: Array<string> = rawHTML.split(' ');
  var newList: Array<any> = [];
  var arrayLength = listString.length;
  for (var i = 0; i < arrayLength; i++) {
    if (String(listString[i]).includes('href=')) {
      var expression =
        /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
      let rawLink = listString[i];
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

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin());
export const scrapeThairatNews = async (targetURL: string) => {
  try {
    let allScrapeNews: Array<object> = [];
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(targetURL);
    await page.waitFor(500);
    await page.click(THAIRAT.SEE_MORE);
    await page.waitFor(500);
    await page.screenshot({ path: 'response.png', fullPage: true });
    const links_news = await page.$eval(
      THAIRAT.HREF_NEWS,
      (elem: HTMLElement) => (elem as HTMLElement).innerHTML,
    );
    let allTargetNews: Array<string> = extractLink(links_news);
    for (let i = 0; i < allTargetNews.length; i++) {
      const meta = await scrapeMetatags(allTargetNews[i]);
      await page.waitFor(500);
      await page.goto(allTargetNews[i]);
      await page.waitFor(500);
      let title = '';
      try {
        title = await page.$eval(
          THAIRAT.TITLE,
          (elem: HTMLElement) => (elem as HTMLElement).innerText,
        );
      } catch (e) {}
      let body = '';
      try {
        body = await page.$eval(
          THAIRAT.BODY,
          (elem: HTMLElement) => (elem as HTMLElement).innerText,
        );
      } catch (e) {}
      let date = '';
      try {
        date = await page.$eval(
          THAIRAT.DATE,
          (elem: HTMLElement) => (elem as HTMLElement).innerText,
        );
      } catch (e) {}
      let tag = '';
      try {
        tag = await page.$eval(
          THAIRAT.TAG,
          (elem: HTMLElement) => (elem as HTMLElement).innerText,
        );
      } catch (e) {}
      let trimBody = 'error';
      if (body === undefined) {
      } else {
        trimBody = body.replace(/\n/g, '').trim();
      }
      if (trimBody === '???????????????????????????') {
        trimBody = '';
      }
      allScrapeNews.push({
        from: 'THAIRAT',
        search_keyword: '',
        body: {
          metaScrape: meta[0],
          deepScrape: {
            targetURL: allTargetNews[i],
            title: title,
            body: trimBody,
            date: date,
            tag: tag,
            image: meta[0].image,
          },
        },
      });
    }
    allScrapeNews.pop(); //Delete Trash Selector
    await browser.close();
    return allScrapeNews;
  } catch (e) {
    return e;
  }
};
