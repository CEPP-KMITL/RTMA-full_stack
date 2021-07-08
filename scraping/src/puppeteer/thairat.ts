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
  return newList;
}

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin());
export const scrapeThairatNews = async (targetURL: string) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const meta = await scrapeMetatags(targetURL);
    await page.goto(targetURL);
    await page.waitFor(500);
    await page.click(
      '#__next > main > div > div.css-12hswaw.e1jz6ffu7 > div > div.css-ezm0i3.e1jz6ffu8 > div.css-lxjczt.e1jz6ffu16 > div.css-kzedlk.e1jz6ffu17 > a',
    );
    await page.waitFor(500);
    await page.screenshot({ path: 'response.png', fullPage: true });
    const links_news = await page.$eval(
      THAIRAT.HREF_NEWS,
      (elem: HTMLElement) => (elem as HTMLElement).innerHTML,
    );
    let allTargetNews: Array<string> = extractLink(links_news);
    // const title = await page.$eval(
    //   THAIRAT.TITLE,
    //   (elem: HTMLElement) => (elem as HTMLElement).innerText,
    // );
    // const body = await page.$eval(
    //   THAIRAT.BODY,
    //   (elem: HTMLElement) => (elem as HTMLElement).innerText,
    // );
    // const date = await page.$eval(
    //   THAIRAT.DATE,
    //   (elem: HTMLElement) => (elem as HTMLElement).innerText,
    // );
    // const tag = await page.$eval(
    //   THAIRAT.TAG,
    //   (elem: HTMLElement) => (elem as HTMLElement).innerText,
    // );
    await browser.close();
    // return {
    //   targetURL,
    //   title: title,
    //   body: body.replace(/\n/g, '').trim(),
    //   date: date,
    //   tag: tag,
    //   image: meta[0].image,
    // };
  } catch (e) {
    return e;
  }
};
