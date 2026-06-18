# EcoLoop — Demo Script

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document defines the official demo flow.

The goal is to maximize:

* judge understanding
* perceived innovation
* product clarity
* technical credibility

A good demo can increase scores dramatically.

A bad demo can hide good engineering.

---

# Demo Duration

Target:

```txt id="demo01"
3-5 minutes
```

---

Maximum:

```txt id="demo02"
7 minutes
```

---

# Demo Structure

```txt id="demo03"
Problem

↓

Solution

↓

AI

↓

Dashboard

↓

Reduction

↓

Architecture

↓

Closing
```

---

# Opening

Duration:

```txt id="demo04"
20-30 seconds
```

---

Script:

> Most people want to reduce their carbon footprint, but they have no idea where their emissions actually come from.
>
> Existing tools either require manual calculations or overwhelm users with charts.
>
> EcoLoop helps users understand, track, and reduce their footprint using AI and personalized actions.

---

# Show Landing Page

Duration:

```txt id="demo05"
15 seconds
```

---

Goals:

* establish visual quality
* establish differentiation

---

Call Out:

* immersive visualization
* invisible carbon concept
* personalized intelligence

---

Do NOT explain implementation yet.

---

# Problem Demonstration

Duration:

```txt id="demo06"
30 seconds
```

---

Ask:

```txt id="demo07"
How much carbon did this day produce?
```

---

Show Example:

```txt id="demo08"
I drove 15km to work.

Had a beef burger for lunch.

Used AC for 4 hours.
```

---

Pause.

---

Then say:

```txt id="demo09"
Most people don't know the answer.
```

---

# AI Extraction Demo

Duration:

```txt id="demo10"
45 seconds
```

---

Paste Example Input.

---

Show:

```txt id="demo11"
User Input

↓

AI Extraction

↓

Structured Activities

↓

Carbon Engine
```

---

Explain:

```txt id="demo12"
AI understands activities.

Deterministic logic performs calculations.
```

---

Important.

Judges love hearing:

```txt id="demo13"
Deterministic
```

---

# Show Parsed Activities

Example:

```json id="demo14"
[
  {
    "category":"transport",
    "quantity":15,
    "unit":"km"
  }
]
```

---

Show confidence.

---

Show validation.

---

Mention:

```txt id="demo15"
Prompt injection protection
```

---

# Dashboard Demo

Duration:

```txt id="demo16"
60-90 seconds
```

---

Show:

Environmental Field.

---

Say:

> Instead of showing users raw numbers first, EcoLoop visualizes their environmental footprint as a living system.

---

Highlight:

* footprint state
* trends
* contributors

---

Hover:

* food
* transport
* energy

---

Explain:

```txt id="demo17"
largest contributor
```

---

Show:

```txt id="demo18"
weekly trend
```

---

Show:

```txt id="demo19"
forecast
```

---

# Personalized Action Demo

Duration:

```txt id="demo20"
45 seconds
```

---

Show:

Daily Action Card.

---

Example:

```txt id="demo21"
Replace one beef meal this week.
```

---

Explain:

* why selected
* expected savings
* personalization

---

Complete action.

---

Show:

* animation
* savings update
* dashboard update

---

# Reduction Story

Duration:

```txt id="demo22"
30 seconds
```

---

Show:

Before.

---

Show:

After.

---

Explain:

```txt id="demo23"
understand

↓

track

↓

reduce
```

---

Directly ties to problem statement.

---

# Technical Architecture

Duration:

```txt id="demo24"
45 seconds
```

---

Show architecture diagram.

---

Explain:

```txt id="demo25"
Next.js

↓

tRPC

↓

Supabase

↓

AI Extraction

↓

Carbon Engine
```

---

Highlight:

* RLS
* testing
* accessibility
* security

---

# Security Callout

Duration:

```txt id="demo26"
15 seconds
```

---

Mention:

* Row Level Security
* Validation
* Rate Limiting
* Prompt Injection Defense

---

Judges love this.

---

# Accessibility Callout

Duration:

```txt id="demo27"
15 seconds
```

---

Mention:

* WCAG AA
* keyboard support
* reduced motion
* screen readers

---

Very often forgotten by competitors.

---

# Testing Callout

Duration:

```txt id="demo28"
15 seconds
```

---

Mention:

```txt id="demo29"
90%+ coverage
```

(if achieved)

---

Mention:

* AI evaluation suite
* security tests
* E2E tests

---

# Closing

Duration:

```txt id="demo30"
20 seconds
```

---

Script:

> EcoLoop transforms carbon awareness from a confusing calculation problem into a simple daily habit.
>
> Users understand their footprint, track it effortlessly, and receive personalized actions that help them reduce it over time.

---

# Judge Questions

Prepare Answers For

---

## Why AI?

Answer:

```txt id="demo31"
Natural language activity extraction.
```

---

## Why Not Use AI For Calculations?

Answer:

```txt id="demo32"
Deterministic systems are more accurate and testable.
```

---

## How Is This Different?

Answer:

```txt id="demo33"
Visualizes invisible impact and focuses on personalized reduction.
```

---

## How Is Data Protected?

Answer:

```txt id="demo34"
RLS, validation, secure auth, rate limiting.
```

---

# Demo Data

Always use:

---

Transport

---

Food

---

Energy

---

At least one example from each.

---

Avoid edge cases during demo.

---

# Live Demo Rules

Never rely on:

* live AI provider
* unstable network
* external APIs

---

Have fallback data.

---

# Demo Success Test

After the demo, judges should understand:

---

Question 1

What problem is being solved?

---

Question 2

How does AI help?

---

Question 3

How does the product reduce emissions?

---

Question 4

Why is this technically strong?

---

Question 5

Why is it different?

---

If all five are answered:

```txt id="demo35"
Demo Successful
```

---

# Final Rule

The demo should feel like:

```txt id="demo36"
showing a finished product
```

Not:

```txt id="demo37"
explaining a prototype
```

---

End of Document.
