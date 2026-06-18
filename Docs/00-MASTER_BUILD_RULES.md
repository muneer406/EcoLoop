# 00-MASTER_BUILD_RULES.md

# READ THIS FILE FIRST

If you are an AI engineer, developer, contributor, or agent working on EcoLoop, read this file before reading any other documentation.

This file defines:

* project goals
* implementation priorities
* architectural constraints
* non-negotiable rules

Violating these rules will likely result in incorrect implementation.

---

# Project Summary

EcoLoop is an AI-powered sustainability platform that helps users:

1. Understand their carbon footprint
2. Track daily activities
3. Reduce emissions through personalized actions

The project is being built for a hackathon.

Judging Criteria:

* Code Quality
* Security
* Efficiency
* Testing
* Accessibility
* Problem Statement Alignment

Every implementation decision should optimize for these criteria.

---

# Core User Journey

User enters:

"I drove 12km to work and ate a burger."

↓

AI extracts activities.

↓

CO₂ engine calculates emissions.

↓

Results stored.

↓

Dashboard updates.

↓

Personalized action generated.

↓

User improves behavior.

This loop is the entire product.

Protect it.

---

# Documentation Reading Order

Read documents in this order:

1. 00-MASTER_BUILD_RULES.md
2. 01-PRD.md
3. 02-ARCHITECTURE.md
4. 03-DATABASE-SCHEMA.md
5. 04-CO2-ENGINE.md
6. 06-AI-INTEGRATION.md
7. 19-FRONTEND-SCREEN-SPECS.md
8. 23-DASHBOARD-EXPERIENCE.md
9. 28A-CARBON-FIELD-SPEC.md
10. 09-SECURITY.md

Only read other documents when working in those areas.

---

# Build Priority

Always prioritize:

Correctness

↓

Security

↓

Accessibility

↓

Performance

↓

Visual Quality

↓

Extra Features

---

# Non-Negotiable Architecture Rules

## Rule 1

AI extracts information only.

AI never:

* calculates emissions
* forecasts emissions
* determines streaks
* determines recommendations

---

## Rule 2

All calculations are deterministic.

Emission calculations come from:

Emission Factors Database.

---

## Rule 3

One AI call per user message.

Never create:

* multi-agent systems
* orchestration layers
* AI chains

---

## Rule 4

All AI output must be structured JSON.

Never use free-form outputs.

---

## Rule 5

All AI output must pass schema validation.

Before:

* calculations
* storage
* rendering

---

## Rule 6

Graceful degradation required.

AI failure must never crash the application.

---

# Design Rules

Theme:

Invisible Carbon

---

Visual Style:

Apple × Linear × Arc Browser

---

Forbidden:

* leaves
* trees
* forests
* globes
* recycling icons
* sustainability clichés

---

Preferred:

* atmospheric systems
* particles
* depth
* translucency
* glass
* environmental fields

---

# Most Important Screen

Dashboard

---

# Most Important Component

Carbon Field

---

# Carbon Field Rules

Purpose:

Visualize invisible environmental impact.

Never:

* behave like a chart
* become visual clutter
* replace critical information

Always:

* support understanding
* support trends
* support contributor discovery

---

# Accessibility Rules

Target:

WCAG 2.2 AA

Lighthouse Accessibility:

95+

Goal:

100

---

Required:

* keyboard navigation
* reduced motion
* focus states
* screen readers
* text alternatives

---

# Security Rules

Mandatory:

* RLS
* Zod validation
* secure auth
* rate limiting
* CSP

Never trust:

* user input
* AI output
* uploaded files

---

# Performance Targets

Landing:

< 1.5s

Dashboard:

< 500ms

API:

< 300ms

AI:

< 3s

---

# MVP Features

Must Have:

* Authentication
* Activity Logging
* AI Extraction
* CO₂ Engine
* Dashboard
* Daily Actions
* Progress Tracking

---

# Features To Avoid

Do NOT build:

* social features
* leaderboards
* achievement systems
* complex chatbots
* admin dashboards
* unnecessary settings

---

# Development Order

Phase 1

Project Setup

---

Phase 2

Database

---

Phase 3

Authentication

---

Phase 4

CO₂ Engine

---

Phase 5

AI Extraction

---

Phase 6

Core Loop

---

Phase 7

Dashboard

---

Phase 8

Habit Engine

---

Phase 9

Carbon Field

---

Phase 10

Landing Page

---

Phase 11

Accessibility

---

Phase 12

Testing

---

Phase 13

Polish

---

# Definition Of Success

If this flow works beautifully:

User Input

↓

AI Extraction

↓

CO₂ Calculation

↓

Dashboard Update

↓

Personalized Action

Then EcoLoop succeeds.

Everything else is secondary.

---

# Final Rule

When unsure:

Choose simplicity.

When choosing between:

One polished feature

and

Three unfinished features

Choose:

One polished feature.

Always.

End of Document.
