import * as fs from 'fs';

import { Gem } from "../src/gem";
import { Specification } from '../src/gem/specification';

describe("Gem", () => {
  describe("newerThan()", () => {
    test.each`
      gemspecVer   | remoteGemVer | expected
      ${"1.2.3"}   | ${"1.2.4"}   | ${false}
      ${"1.2.3"}   | ${"1.2.3"}   | ${false}
      ${"1.2.3"}   | ${"1.2.2"}   | ${true}
      ${undefined} | ${"1.2.3"}   | ${false}
      ${"1.2.3"}   | ${"unknown"} | ${true}
    `("returns $expected when the gemspec version is $gemspecVer, and the remote gem version is $remoteGemVer", ({ gemspecVer, remoteGemVer, expected }) => {
      const spec = new Specification({ version: gemspecVer });
      const gem = new Gem(spec);

      expect(gem.newerThan(remoteGemVer)).toBe(expected);
    });
  });
});
