const puppeteer = require('puppeteer');
import {
  thairat_date,
  thairat_title,
  thairat_body,
} from '../../share/selector';

const scrapeNews = async (targetURL: string) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(targetURL);
    await page.waitFor(5000);
    console.log('Start page.evaluate');
    const data = await page.evaluate(() => {
      let title = document.querySelector(thairat_title)!;
      // let date: string = page.$eval(thairat_date, (elem: HTMLElement) => {
      //   (elem as HTMLElement).innerText;
      // });
      // let body: string = page.$eval(thairat_body, (elem: HTMLElement) => {
      //   (elem as HTMLElement).innerText;
      // });
      // let image_src = $(`meta[name=${'image'}]`).attr('content');
      return title;
      // title: title,
      // favicon: $('link[rel="shortcut icon"]').attr('href'),
      // description: body,
      // image: image_src,
      // date: date,
    });
    console.log('Close browser');
    await browser.close();
    console.log(data);
    return data;
  } catch (e) {
    return e;
  }
};

scrapeNews('https://www.thairath.co.th/news/local/central/2124297');
