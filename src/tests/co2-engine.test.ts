import { describe, it, expect } from "vitest";
import {
  calculateActivity,
  calculateLog,
  calculateDailySummary,
  calculateBaseline,
  calculateCo2Saved,
  calculateForecast,
  calculateGlobalComparison,
  calculateParisComparison,
  generateEquivalence,
  normalizeMode,
} from "@/server/services/co2";
import type { Activity } from "@/types";

describe("CO₂ Engine", () => {
  describe("calculateActivity", () => {
    it("calculates transport: 10km car_petrol = 1.92kg", () => {
      const result = calculateActivity({
        category: "transport",
        mode: "car_petrol",
        quantity: 10,
        unit: "km",
      });
      expect(result.co2Kg).toBe(1.92);
      expect(result.factorUsed).toBe(0.192);
    });

    it("calculates food: 0.2kg beef = 5.4kg", () => {
      const result = calculateActivity({
        category: "food",
        mode: "beef",
        quantity: 0.2,
        unit: "kg",
      });
      expect(result.co2Kg).toBe(5.4);
      expect(result.factorUsed).toBe(27.0);
    });

    it("calculates energy: 6 hours AC = 4.8kg", () => {
      const result = calculateActivity({
        category: "energy",
        mode: "ac_hour",
        quantity: 6,
        unit: "hour",
      });
      expect(result.co2Kg).toBe(4.8);
      expect(result.factorUsed).toBe(0.8);
    });

    it("calculates shopping: 1 smartphone = 70kg", () => {
      const result = calculateActivity({
        category: "shopping",
        mode: "smartphone",
        quantity: 1,
        unit: "item",
      });
      expect(result.co2Kg).toBe(70);
    });

    it("returns 0 for unknown mode", () => {
      const result = calculateActivity({
        category: "transport",
        mode: "spaceship",
        quantity: 100,
        unit: "km",
      });
      expect(result.co2Kg).toBe(0);
      expect(result.factorUsed).toBe(0);
    });

    it("returns 0 for zero and negative quantity", () => {
      const zero = calculateActivity({
        category: "transport",
        mode: "car_petrol",
        quantity: 0,
        unit: "km",
      });
      expect(zero.co2Kg).toBe(0);
    });
  });

  describe("calculateLog", () => {
    it("calculates combined total", () => {
      const activities: Activity[] = [
        { category: "transport", mode: "car_petrol", quantity: 10, unit: "km" },
        { category: "food", mode: "beef", quantity: 0.15, unit: "kg" },
        { category: "energy", mode: "ac_hour", quantity: 6, unit: "hour" },
      ];

      const result = calculateLog(activities);
      expect(result.calculated).toHaveLength(3);
      expect(result.totalCo2Kg).toBeCloseTo(10.77, 2);
    });

    it("handles empty activities", () => {
      const result = calculateLog([]);
      expect(result.calculated).toHaveLength(0);
      expect(result.totalCo2Kg).toBe(0);
    });
  });

  describe("calculateDailySummary", () => {
    it("aggregates by category", () => {
      const activities: Activity[] = [
        { category: "transport", mode: "car_petrol", quantity: 10, unit: "km" },
        { category: "transport", mode: "bus", quantity: 5, unit: "km" },
        { category: "food", mode: "beef", quantity: 0.2, unit: "kg" },
        { category: "energy", mode: "ac_hour", quantity: 6, unit: "hour" },
      ];

      const summary = calculateDailySummary(activities);
      expect(summary.transportCo2Kg).toBeCloseTo(2.365, 2);
      expect(summary.foodCo2Kg).toBe(5.4);
      expect(summary.energyCo2Kg).toBe(4.8);
      expect(summary.shoppingCo2Kg).toBe(0);
      expect(summary.totalCo2Kg).toBeCloseTo(12.565, 2);
    });
  });

  describe("forecast / baseline", () => {
    it("calculates baseline from first 7 days", () => {
      const baseline = calculateBaseline([12, 10, 8, 9, 11, 12, 10, 7, 6, 5]);
      expect(baseline).toBeCloseTo(10.29, 1);
    });

    it("returns global average for empty data", () => {
      const baseline = calculateBaseline([]);
      expect(baseline).toBe(11);
    });

    it("calculates CO2 saved", () => {
      const saved = calculateCo2Saved(10.29, 8.5);
      expect(saved).toBeCloseTo(1.79, 1);
    });

    it("returns 0 when current > baseline", () => {
      const saved = calculateCo2Saved(10.29, 12);
      expect(saved).toBe(0);
    });

    it("calculates annual forecast", () => {
      const forecast = calculateForecast(8);
      expect(forecast).toBe(2920);
    });
  });

  describe("comparisons", () => {
    it("compares to global average", () => {
      const { globalAvg, percentage } = calculateGlobalComparison(11);
      expect(globalAvg).toBe(11);
      expect(percentage).toBe(100);

      const above = calculateGlobalComparison(22);
      expect(above.percentage).toBe(200);
    });

    it("compares to Paris target", () => {
      const { target, multiple } = calculateParisComparison(7.5);
      expect(target).toBe(2.5);
      expect(multiple).toBe(3);
    });
  });

  describe("mode normalization", () => {
    it("normalizes car variants", () => {
      expect(normalizeMode("transport", "car")).toBe("car_petrol");
      expect(normalizeMode("transport", "driving")).toBe("car_petrol");
      expect(normalizeMode("transport", "ev")).toBe("car_electric");
      expect(normalizeMode("transport", "subway")).toBe("train");
      expect(normalizeMode("transport", "bicycle")).toBe("bike");
    });

    it("normalizes food variants", () => {
      expect(normalizeMode("food", "burger")).toBe("beef");
      expect(normalizeMode("food", "steak")).toBe("beef");
      expect(normalizeMode("food", "salmon")).toBe("fish");
      expect(normalizeMode("food", "dairy")).toBe("milk");
    });

    it("returns lowercase for unknown modes", () => {
      expect(normalizeMode("transport", "HELICOPTER")).toBe("helicopter");
    });
  });

  describe("equivalences", () => {
    it("generates driving equivalence", () => {
      const eq = generateEquivalence(1.92);
      expect(eq.label).toContain("km");
      expect(eq.value).toBeGreaterThan(0);
    });

    it("handles zero emissions", () => {
      const eq = generateEquivalence(0);
      expect(eq.value).toBe(0);
    });
  });
});
