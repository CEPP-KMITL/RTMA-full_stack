const puppeteer = require('puppeteer');
import { CONFIG } from '../config/config';
export const scrapeTwitterNews = async (username: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('https://twitter.com/login?lang=th');
  await page.waitFor(10000);
  // Login form
  await page.type(
    '[name="session[username_or_email]"]',
    CONFIG.RTMA_TWITTER_USERNAME,
  );
  await page.screenshot({ path: 'twitter_1.png' });
  await page.type('[name="session[password]"]', CONFIG.RTMA_TWITTER_PASSWORD);
  await page.screenshot({ path: 'twitter_2.png' });
  await page.click('div[role=button]');
  await page.waitFor(15000);
  await page.screenshot({ path: 'twitter_3.png' });
  await page.goto('https://twitter.com/js100radio');
  await page.waitFor(10000);
  await page.screenshot({ path: 'twitter_4.png' });

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
