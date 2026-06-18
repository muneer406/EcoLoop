# EcoLoop — Product Requirements Document (PRD)

Version: 2.0
Status: Final
Priority: Critical
Last Updated: June 2026

---

# 1. Product Identity

| Field             | Value                                              |
| ----------------- | -------------------------------------------------- |
| Product Name      | EcoLoop                                            |
| Tagline           | Know your carbon. Build the habit. See the change. |
| Platform          | Responsive Web Application                         |
| Primary Language  | English                                            |
| Deployment Target | Vercel                                             |
| Database          | Supabase PostgreSQL                                |
| Authentication    | Google OAuth + Magic Link                          |
| Target Event      | Hackathon Submission                               |

---

# 2. Problem Statement

Design a solution that helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.

This problem statement drives every engineering, product, design, and architecture decision.

Every feature must support at least one of:

* Understand
* Track
* Reduce

If a feature supports none of these goals, it is out of scope.

---

# 3. Product Vision

Most carbon footprint tools fail because they require too much manual effort.

Users are asked to:

* fill forms
* track meals
* estimate electricity usage
* categorize activities

Most users abandon these apps within days.

EcoLoop removes friction by allowing users to describe their day naturally.

Example:

```txt
I drove 12km to work,
had a beef burger,
and left my AC running for 6 hours.
```

The platform automatically:

* extracts activities
* calculates emissions
* identifies major contributors
* recommends one achievable improvement

The result is a habit-building experience rather than a tracking tool.

---

# 4. Success Criteria

## Visual Success Criteria

EcoLoop must not resemble a traditional sustainability application.

Avoid:

* leaf imagery
* tree imagery
* earth/globe imagery
* generic green gradients
* stock sustainability illustrations

The visual identity should communicate:

* invisible systems
* flowing energy
* hidden impact
* futuristic environmental intelligence

Design inspiration:

* Linear
* Arc Browser
* Apple Vision Pro
* Stripe Sessions
* Vercel

A screenshot of any page should be instantly recognizable as EcoLoop.

The project succeeds if a new user can:

### Understand

See where their emissions come from.

### Track

Monitor changes over time.

### Reduce

Receive actionable guidance that leads to lower emissions.

All three must happen within the first session.

---

# 5. Judging Criteria Alignment

The AI judge evaluates six categories.

---

## Code Quality

Requirements:

* TypeScript strict mode
* End-to-end type safety
* Zod validation
* Modular architecture
* Explicit return types
* No any types

Target Score:

10/10

---

## Security

Requirements:

* PKCE authentication
* RLS
* CSP
* Prompt injection protection
* Rate limiting
* Secret isolation

Target Score:

10/10

---

## Efficiency

Requirements:

* Single AI call per user message
* Deterministic calculations
* Cached dashboard data
* Indexed database queries
* Lazy loading

Target Score:

10/10

---

## Testing

Requirements:

* Unit tests
* Integration tests
* E2E tests
* Accessibility tests

Target Score:

10/10

---

## Accessibility

Requirements:

* WCAG 2.1 AA
* Keyboard navigation
* Screen reader support
* Contrast compliance

Target Score:

10/10

---

## Problem Alignment

Requirements:

* Understand
* Track
* Reduce

All clearly visible in product experience.

Target Score:

10/10

---

# 6. Target Users

## Primary User

Climate-conscious individuals.

Characteristics:

* 18–45 years old
* Mobile-first
* Limited patience for data entry
* Wants guidance
* Wants measurable progress

Pain Points:

* Existing tools require too much effort
* Unsure where emissions come from
* Doesn't know what actions matter

---

## Secondary User

Hackathon Judge

Characteristics:

* Reviews repository
* Reviews architecture
* Runs application
* Reviews README
* Reviews tests

The product must impress both.

---

# 7. Core User Journey

```txt
User signs in

↓

Completes onboarding

↓

Describes their day

↓

AI extracts activities

↓

CO₂ Engine calculates emissions

↓

Dashboard updates

↓

Habit Engine recommends action

↓

User completes action

↓

Streak increases

↓

User returns tomorrow
```

This journey is the heart of EcoLoop.

---

# 8. Core Product Pillars

## Pillar 1 — Understand

Goal:

Help users understand where emissions originate.

Features:

* Natural language logging
* Activity extraction
* Category breakdown
* CO₂ calculations
* Contributor explanations

Success Metric:

User can identify their largest emission source.

---

## Pillar 2 — Track

Goal:

Help users observe progress.

Features:

* Daily totals
* Weekly totals
* Monthly totals
* Category charts
* Historical trends
* Forecasting

Success Metric:

User can compare today against previous periods.

---

## Pillar 3 — Reduce

Goal:

Drive meaningful behavioral change.

Features:

* Daily micro-actions
* Streak system
* CO₂ saved metric
* Milestones
* Positive reinforcement

Success Metric:

User completes at least one action.

---

# 9. Feature List

## Authentication

### Core

* Google OAuth
* Email Magic Link
* Sign Out
* Session Persistence

---

## Onboarding

### Core

Three questions:

1. Country
2. Transportation Preference
3. Dietary Preference

Purpose:

Personalization.

---

## Carbon Logging

### Core

Natural language activity logging.

Example:

```txt
I drove 15km,
ate chicken,
and used AC for 4 hours.
```

The system extracts structured activities.

---

## Dashboard

### Core

* Daily emissions
* Weekly emissions
* Monthly emissions
* Category breakdown
* Global comparison
* Paris Agreement comparison

---

## Habit Engine

### Core

Generate one daily micro-action.

Must:

* be actionable today
* require no purchases
* have measurable impact

---

## Streak System

### Core

User receives streak progress when:

* activity logged
* action completed

Both conditions required.

---

## Receipt Scanner

### Full Feature

User uploads:

```txt
jpg
jpeg
png
```

System extracts:

* food items
* quantities

Then runs standard CO₂ calculations.

---

## Forecasting

### Full Feature

System estimates:

```txt
Projected annual emissions
```

based on rolling average.

---

## Rankings

### Full Feature

Anonymous percentile ranking.

Example:

```txt
You are performing better than 72% of EcoLoop users this week.
```

---

# 10. Out of Scope

Do NOT build:

* Native mobile apps
* Apple Health integration
* Google Fit integration
* Push notifications
* Social feeds
* Friend systems
* Carbon credit purchases
* NFT rewards
* Blockchain features
* Cryptocurrency integrations
* Multi-language support

---

# 11. Non-Functional Requirements

## Performance

Targets:

```txt
FCP < 1.5s
TTI < 3s
Lighthouse ≥ 90
```

---

## Reliability

Target uptime:

```txt
99%
```

during hackathon demo.

---

## Security

Requirements:

* RLS
* CSP
* Input validation
* Rate limiting
* Secure authentication

---

## Accessibility

Requirements:

* WCAG 2.1 AA
* Zero axe violations

---

# 12. Demo Path

The judge must complete this in under 90 seconds.

---

### Step 1

Sign in.

---

### Step 2

Complete onboarding.

---

### Step 3

Enter:

```txt
I drove 12km to work,
had a beef burger,
and used AC for 6 hours.
```

---

### Step 4

Observe:

* extracted activities
* calculated emissions

---

### Step 5

Receive:

* personalized micro-action

---

### Step 6

Complete action.

---

### Step 7

See:

* streak update
* CO₂ saved update

---

### Step 8

Open dashboard.

See:

* chart
* breakdown
* comparisons

---

# 13. Success Metrics

Target after launch:

| Metric                   | Target             |
| ------------------------ | ------------------ |
| Day 7 Retention          | > 40%              |
| Daily Active Usage       | > 1.2 sessions/day |
| Action Completion Rate   | > 55%              |
| Average Reduction        | > 10%              |
| Lighthouse Score         | ≥ 90               |
| Accessibility Violations | 0                  |

---

# 14. Glossary

Activity

A carbon-generating event.

Example:

```json
{
  "type":"transport",
  "mode":"car_petrol",
  "quantity":12,
  "unit":"km"
}
```

---

Log Entry

One user message.

---

Daily Total

Total emissions for a day.

---

Micro Action

A small recommended improvement.

---

Streak

Consecutive successful days.

---

CO₂ Saved

Cumulative impact from completed actions.

---

Habit Engine

Deterministic recommendation system.

---

CO₂ Engine

Deterministic calculation system.

---

AI Parser

Natural language extraction component.

---

# 15. Document Dependency Order

Read documents in this order:

1. 00-MASTER_BUILD_RULES.md
2. 01-PRD.md
3. 02-ARCHITECTURE.md
4. 03-DATABASE-SCHEMA.md
5. 04-CO2-ENGINE.md
6. 05-HABIT-ENGINE.md
7. 06-AI-INTEGRATION.md
8. 07-API-ROUTES.md
9. 08-UI-COMPONENTS.md
10. 09-SECURITY.md
11. 10-TESTING.md
12. 11-ACCESSIBILITY.md
13. 12-DEPLOYMENT.md
14. 13-README.md

End of Document.
