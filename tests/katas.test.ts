import { describe, it, expect } from "vitest";
import {
  Bird2,
  BasicPrinter2,
  AdvancedPrinter,
  Car,
  Plane1,
  Boat1,
} from "../src/index";

// 🐦 KATA 1: Bird2
describe("Bird2", () => {
  it("should fly without throwing", () => {
    const bird = new Bird2();
    expect(() => bird.fly()).not.toThrow();
  });
});

// 🖨️ KATA 2: BasicPrinter2
describe("BasicPrinter2", () => {
  it("should print without throwing", () => {
    const printer = new BasicPrinter2();
    expect(() => printer.print("something")).not.toThrow();
  });
});

// 🖨️🔍 KATA 3: AdvancedPrinter
describe("AdvancedPrinter", () => {
  it("should print without throwing", () => {
    const printer = new AdvancedPrinter();
    expect(() => printer.print("something")).not.toThrow();
  });

  it("should scan without throwing", () => {
    const printer = new AdvancedPrinter();
    expect(() => printer.scan("something")).not.toThrow();
  });
});

// 🚗 KATA 4: Car
describe("Car", () => {
  it("should drive without throwing", () => {
    const car = new Car();
    expect(() => car.drive()).not.toThrow();
  });
});

// ✈️ KATA 5: Plane1
describe("Plane1", () => {
  it("should drive without throwing", () => {
    const plane = new Plane1();
    expect(() => plane.fly()).not.toThrow();
  });

  it("should fly without throwing", () => {
    const plane = new Plane1();
    expect(() => plane.fly()).not.toThrow();
  });
});

// 🚤 KATA 6: Boat1
describe("Boat1", () => {
  it("should drive (sail) without throwing", () => {
    const boat = new Boat1();
    expect(() => boat.sail()).not.toThrow();
  });
});
