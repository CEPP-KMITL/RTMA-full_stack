import { scrapeMetatags } from '../scrapeMetatags';
const puppeteer = require('puppeteer-extra');
import { THAIRAT } from '../share/selector';

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin());
export const scrapeThairatNews = async (targetURL: string) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const meta = await scrapeMetatags(targetURL);
    await page.goto(targetURL);
    await page.waitFor(5000);
    //await page.screenshot({ path: 'response.png', fullPage: true });
    const title = await page.$eval(
      THAIRAT.TITLE,
      (elem: HTMLElement) => (elem as HTMLElement).innerText,
    );
    const body = await page.$eval(
      THAIRAT.BODY,
      (elem: HTMLElement) => (elem as HTMLElement).innerText,
    );
    const date = await page.$eval(
      THAIRAT.DATE,
      (elem: HTMLElement) => (elem as HTMLElement).innerText,
    );
    const tag = await page.$eval(
      THAIRAT.TAG,
      (elem: HTMLElement) => (elem as HTMLElement).innerText,
    );
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
