import { expect, test } from "vitest";
import { splitByLines } from "@/lib/utils";

test("splitByLines", () => {
  const lines = ["Hello World", " Hello  World  ", "Hello World\n\n", "\nHello　World　\n", "", null, undefined, "\n"];
  const expected = ["Hello World", "Hello  World", "Hello World", "Hello　World"];
  const results = splitByLines(lines.join("\n"));
  expect(results).toEqual(expected);
});
