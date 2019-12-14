import * as version from "../../src/gem/version";

describe("version", () => {
  describe("compare()", () => {
    test.each`
      v1         | v2         | expected
      ${"1.2.3"} | ${"1.2.4"} | ${-1}
      ${"1.2.3"} | ${"1.2.3"} | ${0}
      ${"1.2.3"} | ${"1.2.2"} | ${1}
    `("returns $expected when v1 is $v1, and v2 is $v2", ({v1, v2, expected}) => {
      expect(version.compare(v1, v2)).toBe(expected);
    });
  });
});
