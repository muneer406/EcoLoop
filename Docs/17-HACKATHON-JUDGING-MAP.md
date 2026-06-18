# EcoLoop — Hackathon Judging Map

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document maps EcoLoop implementation decisions directly to the judging criteria.

The goal is to maximize score while avoiding unnecessary features.

Winning hackathons is rarely about:

```txt id="hm01"
Most Features
```

It is usually about:

```txt id="hm02"
Execution Quality
```

---

# Judging Criteria

The submission will be evaluated on:

```txt id="hm03"
Code Quality

Security

Efficiency

Testing

Accessibility

Problem Statement Alignment
```

---

# Scoring Philosophy

Every feature should improve at least one judging category.

If a feature improves none:

```txt id="hm04"
Do Not Build It
```

---

# CATEGORY 1

Code Quality

---

Target Score:

```txt id="hm05"
9.5/10+
```

---

# What Judges Look For

* architecture
* maintainability
* readability
* consistency
* separation of concerns

---

# EcoLoop Strategy

---

## AI Layer

AI only performs:

```txt id="hm06"
Extraction
```

---

Never:

* calculations
* forecasting
* business logic

---

Benefit:

Cleaner architecture.

---

## Typed System

Use:

```txt id="hm07"
TypeScript
```

everywhere.

---

No:

```txt id="hm08"
any
```

---

## Shared Schemas

Use:

```txt id="hm09"
Zod
```

for:

* frontend
* backend
* AI validation

---

Benefit:

Single source of truth.

---

## Modular Structure

Required:

```txt id="hm10"
components/

features/

lib/

server/

types/
```

---

Benefit:

Scalability.

---

# Category Score Drivers

| Feature            | Impact |
| ------------------ | ------ |
| Type Safety        | High   |
| Shared Schemas     | High   |
| Clean Architecture | High   |
| Documentation      | High   |
| Modular Design     | High   |

---

# CATEGORY 2

Security

---

Target Score:

```txt id="hm11"
9.5/10+
```

---

# What Judges Look For

* auth
* authorization
* validation
* secure storage
* abuse prevention

---

# EcoLoop Strategy

---

## Supabase Auth

Use:

* Google OAuth
* Magic Links

---

No passwords.

---

## RLS

Every user table:

```txt id="hm12"
RLS Enabled
```

---

Mandatory.

---

## Validation

Every input:

```txt id="hm13"
Zod
```

---

Mandatory.

---

## AI Protection

Prompt injection handling.

---

Schema enforcement.

---

## Upload Protection

File validation.

---

Rate limits.

---

## Security Headers

CSP.

XSS protection.

---

# Category Score Drivers

| Feature       | Impact    |
| ------------- | --------- |
| RLS           | Very High |
| Validation    | High      |
| Rate Limiting | High      |
| CSP           | Medium    |
| Threat Model  | High      |

---

# CATEGORY 3

Efficiency

---

Target Score:

```txt id="hm14"
9/10+
```

---

# What Judges Look For

* performance
* optimization
* resource usage
* scalability

---

# EcoLoop Strategy

---

## One AI Call

Maximum:

```txt id="hm15"
1 AI call
```

per message.

---

## Deterministic Engine

No repeated AI usage.

---

## Cached Aggregates

Use:

```txt id="hm16"
daily_totals
```

instead of recalculating.

---

## Three.js Budget

Desktop:

```txt id="hm17"
5000 particles
```

---

Mobile:

```txt id="hm18"
1000 particles
```

---

## Optimized Assets

* AVIF
* WebP
* code splitting
* lazy loading

---

# Category Score Drivers

| Feature            | Impact |
| ------------------ | ------ |
| Single AI Call     | High   |
| Cached Data        | High   |
| Lazy Loading       | High   |
| Optimized Assets   | Medium |
| WebGL Optimization | High   |

---

# CATEGORY 4

Testing

---

Target Score:

```txt id="hm19"
10/10
```

---

# What Judges Look For

* coverage
* edge cases
* reliability

---

# EcoLoop Strategy

---

Coverage:

```txt id="hm20"
90%+
```

---

Critical Systems:

```txt id="hm21"
100%
```

---

Specifically:

* CO₂ Engine
* AI Validation
* Habit Engine

---

# Required Tests

* unit
* integration
* E2E
* accessibility
* security

---

# AI Tests

Must include:

* hallucination tests
* prompt injection tests
* schema tests

---

# Category Score Drivers

| Feature             | Impact    |
| ------------------- | --------- |
| 90% Coverage        | High      |
| E2E Flows           | High      |
| Security Tests      | High      |
| AI Evaluation Suite | Very High |

---

# CATEGORY 5

Accessibility

---

Target Score:

```txt id="hm22"
10/10
```

---

# What Judges Look For

* keyboard support
* screen readers
* contrast
* motion accessibility

---

# EcoLoop Strategy

---

## WCAG

Target:

```txt id="hm23"
WCAG 2.2 AA
```

---

## Lighthouse

Accessibility:

```txt id="hm24"
95+
```

Target:

```txt id="hm25"
100
```

---

## Three.js Accessibility

Every visualization must have:

Text alternative.

---

## Reduced Motion

Mandatory.

---

## Focus Management

Mandatory.

---

# Category Score Drivers

| Feature           | Impact |
| ----------------- | ------ |
| WCAG Compliance   | High   |
| Reduced Motion    | High   |
| Keyboard Support  | High   |
| Text Alternatives | High   |

---

# CATEGORY 6

Problem Statement Alignment

---

Problem Statement:

```txt id="hm26"
Help individuals understand, track, and reduce their carbon footprint.
```

---

Target Score:

```txt id="hm27"
10/10
```

---

# Understanding

EcoLoop helps users:

* understand impact
* identify contributors
* visualize patterns

---

# Tracking

EcoLoop helps users:

* log activities
* maintain history
* monitor trends

---

# Reduction

EcoLoop helps users:

* receive actions
* complete actions
* measure savings

---

# Alignment Matrix

| Requirement | Feature             |
| ----------- | ------------------- |
| Understand  | Environmental Field |
| Understand  | Dashboard           |
| Track       | Activity Logging    |
| Track       | History             |
| Reduce      | Daily Actions       |
| Reduce      | Savings Metrics     |

---

# Features That Improve Alignment

High Impact:

* Activity Logging
* Dashboard
* Daily Actions
* Forecasting

---

Low Impact:

* Social Features
* Gamification
* Themes

---

# Features To Avoid

These consume time but add little judging value:

---

## Leaderboards

Reason:

Low alignment.

---

## Complex Social Features

Reason:

Low ROI.

---

## Chatbot Conversations

Reason:

Not needed.

---

## Multi-Agent Systems

Reason:

Complexity.

---

## AI Generated Advice

Reason:

Harder to test.

---

# Judge Demo Strategy

Demo should emphasize:

---

1.

AI Extraction

---

2.

Carbon Calculation

---

3.

Environmental Visualization

---

4.

Personalized Action

---

5.

Measured Improvement

---

In that order.

---

# Winning Formula

```txt id="hm28"
Strong AI

+

Strong UX

+

Strong Testing

+

Strong Security

+

Strong Accessibility
```

---

Not:

```txt id="hm29"
Lots of Features
```

---

# Project Prioritization Matrix

## Must Have

* Authentication
* Logging
* Dashboard
* Daily Actions
* AI Extraction

---

## Should Have

* Receipt Parsing
* Forecasting
* Carbon Constellation

---

## Nice To Have

* Social Sharing
* Advanced Analytics
* Achievement System

---

# Final Rule

When choosing between:

```txt id="hm30"
One polished feature
```

and

```txt id="hm31"
Three unfinished features
```

Choose:

```txt id="hm32"
One polished feature
```

Every time.

---

# Definition of Done

The project is ready when:

* code quality goals met
* security goals met
* efficiency goals met
* testing goals met
* accessibility goals met
* problem alignment demonstrated

---

End of Document.
