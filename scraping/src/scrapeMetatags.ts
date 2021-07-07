const cors = require('cors')({ origin: true });
const cheerio = require('cheerio');
const getUrls = require('get-urls');
const fetch = require('node-fetch');

export const scrapeMetatags = (text: string) => {
  try {
    const urls = Array.from(getUrls(text));

    const requests = urls.map(async (url) => {
      const res = await fetch(url as string);

      const html = await res.text();
      const $ = cheerio.load(html);

      const getMetatag = (name: string) =>
        $(`meta[name=${name}]`).attr('content') ||
        $(`meta[name="og:${name}"]`).attr('content') ||
        $(`meta[name="twitter:${name}"]`).attr('content');
      return {
        url,
        title: $('title').first().text(),
        favicon: $('link[rel="shortcut icon"]').attr('href'),
        description: getMetatag('description'),
        image: getMetatag('image'),
        author: getMetatag('author'),
      };
    });
    return Promise.all(requests);
  } catch (e) {
    return e;
  }
};
