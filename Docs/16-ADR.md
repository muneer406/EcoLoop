# EcoLoop — Architecture Decision Records

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document explains why major architectural decisions were made.

Future contributors and AI agents must understand:

* what decisions were made
* why they were made
* what alternatives were rejected

This prevents unnecessary architectural drift.

---

# ADR-001

## Deterministic Carbon Calculations

Status:

```txt id="adr001a"
Accepted
```

---

Decision:

All CO₂ calculations are deterministic.

AI never calculates emissions.

---

Reason:

Calculations must be:

* testable
* reproducible
* auditable

---

Alternative Considered:

```txt id="adr001b"
AI-generated emissions
```

---

Rejected Because:

* hallucination risk
* poor testability
* inconsistent outputs

---

Result:

AI extracts.

Engine calculates.

---

# ADR-002

## Single AI Call Per Message

Status:

Accepted

---

Decision:

Maximum:

```txt id="adr002a"
1 AI call
```

per user message.

---

Reason:

* lower cost
* lower latency
* easier debugging
* easier testing

---

Alternative Considered:

```txt id="adr002b"
Multi-agent architecture
```

---

Rejected Because:

* complexity
* cost
* unpredictability

---

Result:

One extraction pass.

Everything else deterministic.

---

# ADR-003

## Supabase As Backend Platform

Status:

Accepted

---

Decision:

Use:

```txt id="adr003a"
Supabase
```

for:

* auth
* database
* storage

---

Reason:

* fast development
* built-in RLS
* PostgreSQL
* hackathon speed

---

Alternative Considered:

* Firebase
* Custom PostgreSQL
* Appwrite

---

Rejected Because:

Longer implementation time.

---

# ADR-004

## tRPC Instead Of REST

Status:

Accepted

---

Decision:

Use:

```txt id="adr004a"
tRPC
```

for all API communication.

---

Reason:

* end-to-end typing
* fewer bugs
* faster development

---

Alternative Considered:

REST.

---

Rejected Because:

* duplicate schemas
* extra maintenance

---

# ADR-005

## Invisible Carbon Design Philosophy

Status:

Accepted

---

Decision:

Design around:

```txt id="adr005a"
Invisible Carbon
```

---

Not:

```txt id="adr005b"
Nature Imagery
```

---

Reason:

Most sustainability products look identical.

---

Alternative Considered:

* leaves
* trees
* globes
* green gradients

---

Rejected Because:

* generic
* forgettable
* low differentiation

---

Result:

Environmental fields.

Particle systems.

Atmospheric visualizations.

---

# ADR-006

## Three.js Used Selectively

Status:

Accepted

---

Decision:

Three.js only in:

* Hero
* Dashboard
* Empty States
* Action Completion

---

Reason:

Three.js is expensive.

---

Alternative Considered:

Three.js everywhere.

---

Rejected Because:

* performance issues
* accessibility concerns
* distraction

---

Result:

Memorable moments.

Not constant effects.

---

# ADR-007

## Dashboard Before Charts

Status:

Accepted

---

Decision:

Dashboard starts with:

```txt id="adr007a"
Environmental Field
```

before charts.

---

Reason:

Users understand systems before numbers.

---

Alternative Considered:

Traditional dashboard.

---

Rejected Because:

* generic
* low engagement
* weak storytelling

---

Result:

Understanding first.

Analytics second.

---

# ADR-008

## No Sustainability Clichés

Status:

Accepted

---

Forbidden:

* leaves
* trees
* recycling symbols
* earth icons

---

Reason:

Visual differentiation.

---

Result:

Technology-first identity.

---

# ADR-009

## Glassmorphism As Accent

Status:

Accepted

---

Decision:

Glassmorphism allowed only in:

* hero overlays
* action cards
* dashboard panels
* modals

---

Reason:

Visual depth.

---

Alternative Considered:

Glass everywhere.

---

Rejected Because:

Visual fatigue.

---

# ADR-010

## Mobile Experience Is First-Class

Status:

Accepted

---

Decision:

Mobile is not a reduced experience.

---

Reason:

Many hackathon judges review projects on phones.

---

Result:

Feature parity.

Reduced complexity only.

---

# ADR-011

## Structured AI Output Only

Status:

Accepted

---

Decision:

AI returns:

```json id="adr011a"
{
  "activities": [],
  "confidence": 0.95
}
```

---

Never:

```txt id="adr011b"
freeform text
```

---

Reason:

Predictability.

---

Result:

Schema validation possible.

---

# ADR-012

## Confidence Threshold Enforcement

Status:

Accepted

---

Decision:

Reject outputs below:

```txt id="adr012a"
0.50
```

confidence.

---

Reason:

Low-confidence outputs damage trust.

---

Result:

Clarification requests instead.

---

# ADR-013

## Environmental Field Instead Of Gamification

Status:

Accepted

---

Decision:

Primary engagement comes from:

```txt id="adr013a"
understanding
```

---

Not:

```txt id="adr013b"
points
badges
leaderboards
```

---

Reason:

Long-term engagement.

---

Alternative Considered:

Heavy gamification.

---

Rejected Because:

* shallow motivation
* weak educational value

---

# ADR-014

## Positive Reinforcement Strategy

Status:

Accepted

---

Decision:

Never shame users.

---

Use:

```txt id="adr014a"
opportunity
progress
improvement
```

---

Never:

```txt id="adr014b"
guilt
failure
blame
```

---

Reason:

Behavior change research.

---

# ADR-015

## Accessibility Over Visual Effects

Status:

Accepted

---

Decision:

If accessibility conflicts with visuals:

```txt id="adr015a"
Accessibility Wins
```

---

Reason:

Product requirement.

---

Result:

Every visualization has a text equivalent.

---

# ADR-016

## Carbon Constellation Is Secondary

Status:

Accepted

---

Decision:

Carbon Constellation is:

```txt id="adr016a"
enhancement
```

---

Not:

```txt id="adr016b"
core functionality
```

---

Reason:

Must not block MVP.

---

# ADR-017

## Receipt Parsing Is Optional

Status:

Accepted

---

Decision:

Manual logging remains primary.

---

Reason:

Problem statement can be solved without receipts.

---

Result:

Receipt parsing can degrade gracefully.

---

# ADR-018

## AI Engineer Guardrail

Status:

Accepted

---

Rule:

Future contributors may NOT:

* replace deterministic logic with AI
* remove RLS
* replace environmental field with charts
* add sustainability clichés
* introduce multi-agent complexity

without creating a new ADR.

---

# ADR-019

## Hackathon Optimization Strategy

Status:

Accepted

---

Decision:

Optimize for:

```txt id="adr019a"
Code Quality
Security
Testing
Accessibility
Problem Alignment
```

before feature count.

---

Reason:

These directly impact judging.

---

Result:

Fewer features.

Higher quality.

---

# ADR-020

## Premium Software Over Climate Website

Status:

Accepted

---

Decision:

EcoLoop should feel like:

```txt id="adr020a"
Apple × Linear × Arc
```

that happens to solve climate problems.

---

Not:

```txt id="adr020b"
a climate website
```

---

Reason:

Differentiation.

Memorability.

Judge impact.

---

# Definition of Done

ADR system is complete when:

* major decisions documented
* alternatives documented
* rationale documented
* future contributors can understand intent

---

# Final Rule

If implementation conflicts with an ADR:

```txt id="adr021a"
ADR Wins
```

until a newer ADR replaces it.

---

End of Document.
