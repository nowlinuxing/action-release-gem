import * as fs from 'fs';
import { Specification } from "../../src/gem/specification";

describe("Specification", () => {
  describe("find()", () => {
    beforeEach(() => {
      fs.writeFileSync("_testgem_.gemspec", "Gem::Specification.new { |s| s.name = '_testgem_'; s.version = '1.2.3' }");
      fs.writeFileSync("_testgem_other_.gemspec", "Gem::Specification.new");
    });

    afterEach(() => {
      fs.unlinkSync("_testgem_.gemspec");
      fs.unlinkSync("_testgem_other_.gemspec");
    });

    test("It should find a first gemfile in alphabetic order", () => {
      const spec = Specification.find();

      expect(spec.gemspecPath).toBe("_testgem_.gemspec")
      expect(spec.name).toBe("_testgem_");
      expect(spec.version).toBe("1.2.3");
    });
  });

  describe("isValid()", () => {
    test.each`
      name           | version      | expected
      ${undefined}   | ${undefined} | ${false}
      ${undefined}   | ${"1.2.3"}   | ${false}
      ${"_testgem_"} | ${undefined} | ${false}
      ${"_testgem_"} | ${"1.2.3"}   | ${true}
    `("should returns $expected when name is $name and version is $version", ({name, version, expected}) => {
      const spec = new Specification({ name: name, version: version });
      expect(spec.isValid()).toBe(expected);
    });
  });

  describe("gemFileName()", () => {
    test("should return a gem filename when the name and the version exist", () => {
      const spec = new Specification({ name: "_testgem_", version: "1.2.3"});
      expect(spec.gemFileName()).toBe("_testgem_-1.2.3.gem");
    });

    test("should return null when the spec don't have all informations to create a gem filename", () => {
      const spec = new Specification({ name: "_testgem_", version: undefined});
      expect(spec.gemFileName()).toBeNull;
    });
  });
});
