import { scrapeMetatags } from '../scrapeMetatags';
import {
  testIncomingRawString,
  testIncomingRawStringResult,
} from '../share/testMaterial';
import { ScrapeMetatagsType } from '../share/customType';

describe('scrapeMetatags function test', () => {
  it('can scrape metatags with the correct output and type', () => {
    const testString = testIncomingRawString;
    scrapeMetatags(testString)!.then(function (result: ScrapeMetatagsType) {
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual(
        expect.arrayContaining(testIncomingRawStringResult)
      );
    });
  });
});
