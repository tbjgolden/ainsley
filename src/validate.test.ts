import { validate } from "./validate";

describe("validate", () => {
  test("example one", async () => {
    const result = await validate({
      children: [69]
    });

    expect(result).toEqual([
      "Ainsley.children[0] should match some schema in anyOf"
    ]);
  });
});
