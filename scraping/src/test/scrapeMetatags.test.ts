import { scrapeMetatags } from '../scrapeMetatags';
import { SCRAP_META } from '../share/testMaterial';
import { ScrapeMetatagsType } from '../share/customType';

describe('scrapeMetatags function test', () => {
  it('can scrape metatags with the correct output and type', () => {
    const testString = SCRAP_META.INCOMING_STRING;
    scrapeMetatags(testString)!.then(function (result: ScrapeMetatagsType) {
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual(expect.arrayContaining(SCRAP_META.OUTPUT_ARRAY));
    });
  });
});
