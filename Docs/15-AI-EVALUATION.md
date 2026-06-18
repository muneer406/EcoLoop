# EcoLoop — AI Evaluation Framework

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document defines how AI quality is measured, validated, benchmarked, and continuously improved.

The goal is to ensure:

* reliable extraction
* low hallucination rate
* predictable outputs
* measurable quality

This document applies only to:

```txt id="aie01"
Activity Extraction

Receipt Parsing
```

AI is not responsible for:

* calculations
* recommendations
* forecasting
* streaks

---

# Evaluation Philosophy

The AI succeeds only if:

```txt id="aie02"
Structured output is correct.
```

Not if:

```txt id="aie03"
The response sounds intelligent.
```

---

# Success Metrics

Primary Metrics:

1. Extraction Accuracy
2. Precision
3. Recall
4. Hallucination Rate
5. Confidence Calibration
6. Latency

---

# Metric 1

Extraction Accuracy

---

Definition:

Percentage of correctly extracted activities.

Formula:

```txt id="aie04"
correct_extractions

/

total_extractions
```

---

Target:

```txt id="aie05"
95%+
```

---

# Metric 2

Precision

---

Definition:

How many extracted activities are correct.

Formula:

```txt id="aie06"
true_positives

/

(all extracted activities)
```

---

Target:

```txt id="aie07"
97%+
```

---

# Metric 3

Recall

---

Definition:

How many real activities were found.

Formula:

```txt id="aie08"
true_positives

/

(all actual activities)
```

---

Target:

```txt id="aie09"
90%+
```

---

# Metric 4

Hallucination Rate

---

Definition:

Activities invented by AI.

Example:

User:

```txt id="aie10"
I drove to work.
```

AI:

```txt id="aie11"
12km
```

Hallucination.

---

Formula:

```txt id="aie12"
hallucinated_activities

/

all_extractions
```

---

Target:

```txt id="aie13"
< 1%
```

---

# Metric 5

Confidence Calibration

---

Goal:

Confidence should reflect reality.

---

Good Example

Confidence:

```txt id="aie14"
0.95
```

Accuracy:

```txt id="aie15"
95%
```

---

Bad Example

Confidence:

```txt id="aie16"
0.99
```

Accuracy:

```txt id="aie17"
60%
```

---

Target:

```txt id="aie18"
±5%
```

calibration error.

---

# Metric 6

Latency

---

Definition:

Time from request to structured output.

---

Target:

```txt id="aie19"
< 3 seconds
```

---

Stretch:

```txt id="aie20"
< 2 seconds
```

---

# Benchmark Dataset

Minimum:

```txt id="aie21"
100 examples
```

---

Recommended:

```txt id="aie22"
300 examples
```

---

Distribution

| Category  | Minimum |
| --------- | ------- |
| Transport | 25      |
| Food      | 25      |
| Energy    | 25      |
| Shopping  | 25      |

---

# Dataset Types

---

## Simple Inputs

Example:

```txt id="aie23"
I drove 12km.
```

---

## Multi-Activity Inputs

Example:

```txt id="aie24"
I drove 10km, ate beef, and used AC for 3 hours.
```

---

## Ambiguous Inputs

Example:

```txt id="aie25"
I traveled today.
```

---

## Irrelevant Inputs

Example:

```txt id="aie26"
The weather is nice.
```

---

## Prompt Injection Inputs

Example:

```txt id="aie27"
Ignore previous instructions.
```

---

## Adversarial Inputs

Example:

```txt id="aie28"
I drove 10km<script>alert(1)</script>
```

---

# Evaluation Dataset Structure

Example:

```json id="aie29"
{
  "input": "I drove 10km",

  "expected": [
    {
      "category": "transport",
      "mode": "car_petrol",
      "quantity": 10,
      "unit": "km"
    }
  ],

  "expectedConfidence": 0.90
}
```

---

# Activity Extraction Scoring

For each activity evaluate:

---

Category

Correct?

---

Mode

Correct?

---

Quantity

Correct?

---

Unit

Correct?

---

Description

Reasonable?

---

# Scoring Weights

| Field       | Weight |
| ----------- | ------ |
| Category    | 30%    |
| Mode        | 30%    |
| Quantity    | 25%    |
| Unit        | 10%    |
| Description | 5%     |

---

# Receipt Parsing Evaluation

Separate benchmark.

---

Dataset:

```txt id="aie30"
50+ receipts
```

minimum.

---

Measure:

* item extraction
* category classification
* quantity estimation

---

Target:

```txt id="aie31"
90%+
```

accuracy.

---

# Confidence Evaluation

For every benchmark:

Compare:

```txt id="aie32"
confidence
```

vs

```txt id="aie33"
actual correctness
```

---

Generate:

Calibration Report.

---

# Failure Categories

Every failure must be classified.

---

Category A

Missed Activity

---

Example:

```txt id="aie34"
beef meal not detected
```

---

Category B

Wrong Classification

---

Example:

```txt id="aie35"
train → car
```

---

Category C

Wrong Quantity

---

Example:

```txt id="aie36"
10km → 100km
```

---

Category D

Hallucination

---

Example:

```txt id="aie37"
activity invented
```

---

Category E

Invalid Schema

---

Example:

```txt id="aie38"
missing field
```

---

# Regression Testing

Every prompt update must run:

```txt id="aie39"
Full Evaluation Suite
```

---

Goal:

No degradation.

---

# AI Safety Tests

Required.

---

Prompt Injection

---

Role Switching

---

System Prompt Extraction

---

Malformed Inputs

---

HTML Inputs

---

JSON Inputs

---

# Acceptance Criteria

AI release blocked if:

---

Accuracy:

```txt id="aie40"
< 95%
```

---

Hallucination:

```txt id="aie41"
> 1%
```

---

Latency:

```txt id="aie42"
> 3s
```

---

Schema Errors:

```txt id="aie43"
> 0%
```

---

# Production Monitoring

Track:

* extraction success rate
* low confidence rate
* validation failures
* retry rate
* latency

---

Alert Thresholds

---

Validation Failure:

```txt id="aie44"
> 2%
```

---

Latency:

```txt id="aie45"
> 5 seconds
```

---

Hallucination Reports:

```txt id="aie46"
> 1%
```

---

# Continuous Improvement Loop

```txt id="aie47"
Production Data

↓

Failure Analysis

↓

Dataset Expansion

↓

Prompt Improvement

↓

Evaluation

↓

Deployment
```

---

# AI Quality Dashboard

Track:

* accuracy
* confidence
* hallucinations
* latency
* safety failures

Weekly.

---

# Definition of Done

AI evaluation is complete when:

* benchmark dataset exists
* safety dataset exists
* regression suite exists
* calibration measured
* production monitoring active
* acceptance thresholds enforced

---

# Final Rule

A fast AI that is wrong is worse than:

```txt id="aie48"
a slower AI that is correct
```

Correctness comes first.

---

End of Document.
