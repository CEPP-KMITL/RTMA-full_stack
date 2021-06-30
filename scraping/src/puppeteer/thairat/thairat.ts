import { scrapeMetatags } from '../../scrapeMetatags';
const puppeteer = require('puppeteer-extra');
import {
  thairat_date,
  thairat_title,
  thairat_body,
  thairat_tag,
} from '../../share/selector';

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin());
export const scrapeThairatNews = async (targetURL: string) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const meta = await scrapeMetatags(targetURL);
    await page.goto(targetURL);
    await page.waitFor(5000);
    await page.screenshot({ path: 'response.png', fullPage: true });
    console.log('Start page.evaluate');
    const title = await page.$eval(
      thairat_title,
      (elem: HTMLElement) => (elem as HTMLElement).innerText
    );
    const body = await page.$eval(
      thairat_body,
      (elem: HTMLElement) => (elem as HTMLElement).innerText
    );
    const date = await page.$eval(
      thairat_date,
      (elem: HTMLElement) => (elem as HTMLElement).innerText
    );
    const tag = await page.$eval(
      thairat_tag,
      (elem: HTMLElement) => (elem as HTMLElement).innerText
    );
    console.log('Close browser');
    await browser.close();
    return {
      targetURL,
      title: title,
      body: body.replace(/\n/g, '').trim(),
      date: date,
      tag: tag,
      image: meta[0].image,
    };
  } catch (e) {
    return e;
  }
};
