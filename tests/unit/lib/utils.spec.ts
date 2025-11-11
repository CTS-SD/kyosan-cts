import { splitByLines } from "@/lib/utils";
import { expect, test } from "vitest";

test("splitByLines", () => {
  const lines = ["Hello World", " Hello  World  ", "Hello World\n\n", "\nHello　World　\n", "", null, undefined, "\n"];
  const expected = ["Hello World", "Hello  World", "Hello World", "Hello　World"];
  const results = splitByLines(lines.join("\n"));
  expect(results).toEqual(expected);
});

