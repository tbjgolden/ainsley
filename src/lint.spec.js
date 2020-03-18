import lint from "./lint";
import { base } from "./tools";

test("adds 1 + 2 to equal 3", () => {
  expect(lint()).toEqual({});
});
