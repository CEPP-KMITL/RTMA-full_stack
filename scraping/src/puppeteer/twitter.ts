const puppeteer = require('puppeteer');
import { CONFIG } from '../config/config';
export const scrapeTwitterNews = async (username: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://twitter.com/login?lang=th');
  await page.waitFor(5000);
  // Login form
  await page.screenshot({ path: '1.png' });
  await page.type('[name=text]', CONFIG.RTMA_TWITTER_USERNAME);
  await page.type('[name=password]', CONFIG.RTMA_TWITTER_PASSWORD);
  await page.screenshot({ path: '2.png' });
  await page.click('[type=submit]');

  // Social Page
  //   await page.waitFor(5000);
  //   await page.goto(`https://www.instagram.com/${username}`);
  //   await page.waitForSelector('img ', {
  //     visible: true,
  //   });

  //   await page.screenshot({ path: '3.png' });
  //   // Execute code in the DOM
  //   const data = await page.evaluate(() => {
  //     const images = document.querySelectorAll('img');
  //     const urls = Array.from(images).map((v) => v.src);
  //     return urls;
  //   });

  //   await browser.close();
  //   console.log(data);
  //   return data;
};
