import * as fs from 'fs';
import { Specification } from "../../src/gem/specification";

describe("Specification", () => {
  describe("find()", () => {
    beforeEach(() => {
      fs.writeFileSync("_testgem_.gemspec", "Gem::Specification.new");
      fs.writeFileSync("_testgem_other_.gemspec", "Gem::Specification.new");
    });

    afterEach(() => {
      fs.unlinkSync("_testgem_.gemspec");
      fs.unlinkSync("_testgem_other_.gemspec");
    });

    test("It should find a first gemfile in alphabetic order", () => {
      const spec = Specification.find();

      expect(spec.gemspecPath).toBe("_testgem_.gemspec")
    });
  });
});
