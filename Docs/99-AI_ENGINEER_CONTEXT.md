# 99-AI_ENGINEER_CONTEXT.md

# EcoLoop — AI Engineer Context

Version: 1.0

Status: Source of Truth

Priority: Highest

---

# Project Overview

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

Every implementation decision should optimize for these categories.

---

# Core Product Loop

User enters:

"I drove 12km to work and ate a beef burger."

↓

AI extracts activities.

↓

Deterministic CO₂ engine calculates emissions.

↓

Data stored in database.

↓

Dashboard updates.

↓

Personalized action generated.

↓

User completes action.

↓

Savings tracked.

This loop is the heart of the product.

Protect it.

---

# Non-Negotiable Architecture Rules

## Rule 1

AI extracts data only.

AI never:

* calculates emissions
* forecasts emissions
* generates business logic
* determines streaks

---

## Rule 2

All emissions are calculated using deterministic formulas.

Formula source:

Emission Factors Database.

---

## Rule 3

One AI call per user message.

Never create:

* multi-agent systems
* AI chains
* AI orchestration workflows

---

## Rule 4

All AI outputs must be structured JSON.

Never use freeform AI outputs.

---

## Rule 5

All AI outputs must pass schema validation before use.

---

## Rule 6

If AI fails:

System must degrade gracefully.

Never crash.

---

# Technology Stack

Frontend:

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* React Three Fiber
* Drei

Backend:

* tRPC
* Zod

Database:

* Supabase PostgreSQL

Authentication:

* Supabase Auth

Storage:

* Supabase Storage

Monitoring:

* Sentry

Deployment:

* Vercel

---

# Design Philosophy

Theme:

Invisible Carbon

Users cannot see emissions.

EcoLoop visualizes invisible environmental impact.

---

# Visual Identity

The product should feel like:

Apple × Linear × Arc Browser

Not:

Environmental NGO

Not:

Government Climate Portal

Not:

Generic Sustainability Startup

---

# Forbidden Visual Elements

Do NOT use:

* leaves
* trees
* forests
* globes
* recycling symbols
* green gradient overload
* stock sustainability imagery

---

# Preferred Visual Elements

Use:

* atmospheric fields
* particles
* depth
* translucency
* motion
* glass surfaces
* environmental systems

---

# Most Important Screen

Dashboard

---

# Most Important Visual Component

Carbon Field

---

# Carbon Field Summary

Purpose:

Visualize environmental impact.

Represents:

* activity density
* category distribution
* environmental trends

Visual Style:

* atmospheric
* calm
* intelligent
* futuristic

Never:

* pie chart replacement
* gimmick
* visual noise

---

# Accessibility Rules

Must achieve:

WCAG 2.2 AA

Target:

Lighthouse Accessibility 95+

---

Required:

* keyboard navigation
* focus states
* reduced motion support
* screen reader support
* text alternatives for all visualizations

---

# Security Rules

Mandatory:

* RLS on all user tables
* Zod validation on all inputs
* secure auth
* rate limiting
* CSP

Never trust:

* user input
* AI output
* uploaded files

---

# Performance Targets

Landing Page:

< 1.5 seconds

Dashboard:

< 500ms

API:

< 300ms

AI Response:

< 3 seconds

---

# Database Tables

Core Tables:

profiles

logs

activities

daily_totals

micro_actions

user_actions

streaks

emission_factors

---

# Activity Categories

Only:

transport

food

energy

shopping

---

# Core Features

MVP Features:

1. Authentication

2. Activity Logging

3. AI Extraction

4. Carbon Calculation

5. Dashboard

6. Daily Actions

7. Progress Tracking

Everything else is secondary.

---

# Build Order

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

Core Product Loop

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

# Things To Avoid

Do NOT:

* build social features
* build leaderboards
* build achievements
* build complicated AI systems
* build unnecessary settings
* build admin panels
* build chatbots

Focus on:

Understand

Track

Reduce

---

# Success Criteria

A user can:

1. Log an activity naturally

2. See emissions instantly

3. Understand biggest contributors

4. Receive personalized action

5. Track improvement over time

---

# Definition Of Success

If the following works beautifully:

Input

↓

AI Extraction

↓

CO₂ Calculation

↓

Dashboard Update

↓

Action Recommendation

The project is successful.

Everything else is optimization.

---

# Final Rule

When making decisions:

Prefer:

Correctness

↓

Security

↓

Accessibility

↓

Performance

↓

Beauty

↓

Extra Features

And when unsure:

Keep it simple.

End of Document.
