import { describe, expect, it } from "vitest";
import { departmentGradient, departmentGradientStyle } from "@/features/departments/assets";

describe("departmentGradient", () => {
  it("builds a diagonal gradient whose first stop is the given color", () => {
    const gradient = departmentGradient("#2563eb");
    expect(gradient).toContain("linear-gradient(to bottom right");
    expect(gradient).toContain("#2563eb");
  });

  it("derives the second stop as a relative OKLCH color of the base", () => {
    expect(departmentGradient("#2563eb")).toContain("oklch(from #2563eb");
  });

  it("exposes the gradient as a backgroundImage style", () => {
    expect(departmentGradientStyle("#2563eb")).toEqual({
      backgroundImage: departmentGradient("#2563eb"),
    });
  });
});
