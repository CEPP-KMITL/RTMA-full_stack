import { scrapeMetatags } from './scrapeMetatags';

const testUrl: string =
  'https://www.bangkokpost.com/thailand/general/2137111/cargo-truck-in-fiery-fatal-plunge';

scrapeMetatags(testUrl)!.then(function (result: Array<any>) {
  console.log(result);
});
