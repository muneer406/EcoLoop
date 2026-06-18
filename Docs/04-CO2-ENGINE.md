# EcoLoop — CO₂ Calculation Engine

Version: 2.0
Status: Final
Priority: Critical
Last Updated: June 2026

---

# 1. Purpose

This document defines the deterministic carbon calculation engine used by EcoLoop.

The CO₂ Engine is responsible for:

* activity calculations
* category totals
* daily totals
* forecasting
* comparisons
* equivalence generation

The engine is:

* deterministic
* testable
* explainable
* AI-independent

---

# 2. Critical Rule

AI never performs carbon calculations.

AI only converts:

```txt
Natural Language
```

into

```json
Structured Activities
```

The CO₂ Engine performs all calculations.

---

# 3. Design Principles

---

## Deterministic

Same input.

Same output.

Always.

---

## Explainable

Every result must be traceable.

Example:

```txt
12km × 0.192

=

2.304kg CO₂
```

---

## Auditable

Every emission factor must have a source.

---

## Fast

No external API calls.

No database lookups during calculations.

Emission factors are loaded into memory.

---

# 4. Core Types

## Activity

```ts
interface Activity {
  category: "transport" | "food" | "energy" | "shopping";

  mode: string;

  quantity: number;

  unit: string;

  description?: string;
}
```

---

## Calculated Activity

```ts
interface CalculatedActivity {
  category: string;

  mode: string;

  quantity: number;

  unit: string;

  co2Kg: number;

  factorUsed: number;

  source: string;

  description?: string;
}
```

---

## Daily Summary

```ts
interface DailySummary {
  totalCo2Kg: number;

  transportCo2Kg: number;

  foodCo2Kg: number;

  energyCo2Kg: number;

  shoppingCo2Kg: number;
}
```

---

# 5. Emission Factor Sources

Every factor must include a citation.

---

## Primary Sources

### DEFRA

UK Government conversion factors.

Used for:

* transport
* electricity
* fuel

---

### IPCC

Used for:

* global averages
* climate reporting

---

### Our World In Data

Used for:

* food emissions
* consumer comparisons

---

### IEA

Used for:

* electricity generation factors

---

# 6. Transport Factors

Unit:

```txt
kg CO₂ per km
```

| Mode         | Factor |
| ------------ | ------ |
| walk         | 0.000  |
| bike         | 0.000  |
| bus          | 0.089  |
| train        | 0.041  |
| car_electric | 0.053  |
| car_hybrid   | 0.120  |
| car_petrol   | 0.192  |
| motorcycle   | 0.103  |
| flight_short | 0.255  |
| flight_long  | 0.195  |

Source:

DEFRA 2024

---

# 7. Food Factors

Unit:

```txt
kg CO₂ per kg food
```

| Food       | Factor |
| ---------- | ------ |
| beef       | 27.0   |
| lamb       | 24.0   |
| pork       | 12.1   |
| cheese     | 13.5   |
| chicken    | 6.9    |
| fish       | 5.4    |
| eggs       | 4.8    |
| rice       | 2.7    |
| milk       | 1.9    |
| vegetables | 0.5    |
| fruits     | 0.4    |
| nuts       | 0.3    |

Source:

Our World In Data

---

# 8. Energy Factors

Unit:

```txt
kg CO₂ per unit
```

| Activity         | Factor       |
| ---------------- | ------------ |
| grid_electricity | 0.475 / kWh  |
| natural_gas      | 2.02 / m³    |
| ac_hour          | 0.80 / hour  |
| heater_hour      | 1.10 / hour  |
| dryer_hour       | 2.50 / cycle |
| washing_machine  | 0.60 / cycle |

Sources:

IEA + DEFRA

---

# 9. Shopping Factors

Unit:

```txt
kg CO₂ per item
```

| Item       | Factor |
| ---------- | ------ |
| tshirt     | 7      |
| jeans      | 33     |
| shoes      | 14     |
| smartphone | 70     |
| laptop     | 250    |
| furniture  | 80     |

Source:

OWID + Industry Lifecycle Reports

---

# 10. Country Adjustments

Some categories vary by country.

---

## Electricity

| Country | Factor |
| ------- | ------ |
| US      | 0.386  |
| UK      | 0.193  |
| Germany | 0.348  |
| India   | 0.708  |
| Global  | 0.475  |

---

## Rule

If country-specific factor exists:

Use it.

Otherwise:

```txt
Global Factor
```

---

# 11. Mode Normalization

AI may return inconsistent modes.

Normalize before calculation.

---

## Transport

```ts
{
  car: "car_petrol",
  driving: "car_petrol",
  automobile: "car_petrol",
  ev: "car_electric",
  electric_car: "car_electric",
  subway: "train",
  metro: "train",
  bicycle: "bike"
}
```

---

## Food

```ts
{
  burger: "beef",
  steak: "beef",
  hamburger: "beef",

  salmon: "fish",
  tuna: "fish",

  dairy: "milk"
}
```

---

## Energy

```ts
{
  air_conditioning: "ac_hour",
  ac: "ac_hour",
  aircon: "ac_hour",

  electricity: "grid_electricity"
}
```

---

# 12. Calculation Algorithm

---

## Step 1

Normalize mode.

---

## Step 2

Find factor.

---

## Step 3

Calculate.

```txt
quantity × factor
```

---

## Example

Input:

```json
{
  "mode":"car_petrol",
  "quantity":12
}
```

Calculation:

```txt
12 × 0.192

=

2.304kg CO₂
```

---

# 13. Activity Calculation

```ts
function calculateActivity(
  activity: Activity,
  country: string
): CalculatedActivity
```

Returns:

```ts
CalculatedActivity
```

---

# 14. Log Calculation

A log may contain many activities.

Example:

```txt
Drive 12km

+

Burger

+

AC 6 hours
```

Total:

```txt
2.304
+
4.050
+
4.800

=

11.154kg CO₂
```

---

# 15. Daily Calculation

```ts
function calculateDailySummary(
  activities: Activity[]
): DailySummary
```

Aggregates:

* total
* transport
* food
* energy
* shopping

---

# 16. Baseline Calculation

Baseline drives:

```txt
CO₂ Saved
Forecasts
Comparisons
```

---

## Rule

Use first 7 days.

```txt
average(first 7 days)
```

Example:

```txt
Day1 = 12
Day2 = 10
Day3 = 8
Day4 = 9
Day5 = 11
Day6 = 12
Day7 = 10

Baseline = 10.29
```

---

# 17. CO₂ Saved Calculation

Formula:

```txt
baseline

-

current average
```

If positive:

Add to savings.

If negative:

Add nothing.

Never decrease savings.

---

# 18. Forecast Calculation

Annual forecast:

```txt
daily_average × 365
```

Example:

```txt
8kg/day

×

365

=

2920kg/year
```

---

# 19. Global Comparison

Global average:

```txt
4 tonnes/year

=

4000kg/year

=

10.96kg/day
```

Rounded:

```txt
11kg/day
```

---

# 20. Paris Agreement Target

Target:

```txt
2.5kg/day
```

Comparison:

```txt
user_average / target
```

---

# 21. Equivalence Engine

Users understand comparisons better than raw CO₂.

Every result should have an equivalence.

---

## Reference Values

### Driving

```txt
1km car

=

0.192kg CO₂
```

---

### Phone Charging

```txt
1 charge

=

0.008kg CO₂
```

---

### LED Bulb

```txt
1 hour

=

0.010kg CO₂
```

---

# 22. Equivalence Algorithm

Example:

```txt
2.3kg CO₂
```

Convert:

```txt
≈ 12km driven
```

or

```txt
≈ 287 phone charges
```

Select most understandable.

---

# 23. Error Handling

Unknown mode:

```txt
Return 0
```

Log warning.

---

Unknown category:

```txt
Throw Validation Error
```

---

Negative quantity:

```txt
Reject Input
```

---

# 24. Unit Test Vectors

---

## Transport

Input:

```json
{
  "mode":"car_petrol",
  "quantity":10
}
```

Expected:

```txt
1.92kg
```

---

## Food

Input:

```json
{
  "mode":"beef",
  "quantity":0.2
}
```

Expected:

```txt
5.4kg
```

---

## Energy

Input:

```json
{
  "mode":"ac_hour",
  "quantity":6
}
```

Expected:

```txt
4.8kg
```

---

## Combined

Expected:

```txt
12.12kg
```

---

# 25. Performance Requirements

Calculation time:

```txt
< 5ms
```

for a normal log.

---

Daily summary:

```txt
< 20ms
```

---

Forecast:

```txt
< 1ms
```

---

# 26. Forbidden

Do not:

* call AI
* call external APIs
* query databases during calculations
* modify state

The CO₂ Engine must remain pure.

---

# 27. Definition of Done

The engine is complete when:

* all factors defined
* sources documented
* tests pass
* 100% coverage achieved
* outputs reproducible

---

End of Document.
