# EcoLoop — Frontend Screen Specifications

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document defines exactly how every major screen should look, feel, and behave.

The goal is to remove frontend ambiguity.

A developer should be able to build the interface without making design decisions.

---

# Global Layout Rules

## Maximum Content Width

```txt
1400px
```

---

## Reading Width

```txt
720px
```

for text-heavy content.

---

## Vertical Rhythm

Use only:

```txt
8
16
24
32
48
64
96
128
```

No arbitrary spacing.

---

## Visual Hierarchy

Every screen must contain:

### Primary Focus

Largest visual element.

---

### Secondary Focus

Supporting information.

---

### Tertiary Focus

Actions.

---

Never create:

```txt
20 equally important elements
```

---

# Landing Page

Route:

```txt
/
```

---

## Hero Section

Height:

```txt
100vh
```

---

Layout:

```txt
Left:
Text

Right:
Interactive Three.js Scene
```

Desktop.

---

Mobile:

```txt
Text

↓

Scene
```

---

### Headline

Maximum:

```txt
2 lines
```

---

Example Style:

```txt
See
What Your
Carbon Can't Hide
```

---

### Supporting Text

Maximum:

```txt
3 lines
```

---

### CTA Area

Contains:

```txt
Get Started

Watch Demo
```

---

### Three.js Scene

Must occupy:

```txt
40-50%
```

of hero width.

---

Visual:

Particle field.

Mouse interaction.

Subtle depth.

No spinning globe.

---

# Section 2

Invisible Impact

---

Height:

```txt
80vh
```

---

Layout:

Centered.

---

Visual:

Animated environmental field.

---

Message:

```txt
Most emissions are invisible.

That doesn't mean they don't matter.
```

---

# Section 3

Interactive Demo

---

Height:

```txt
90vh
```

---

Layout:

Split.

---

Left:

User input simulation.

---

Right:

Real-time visualization.

---

Flow:

```txt
User types

↓

Activity appears

↓

Carbon visualization updates

↓

Action recommendation appears
```

---

# Chat Page

Route:

```txt
/chat
```

---

Layout

```txt
┌──────────────────┐
│ Header           │
├──────────────────┤
│ History          │
│                  │
│                  │
├──────────────────┤
│ Input            │
├──────────────────┤
│ Action Card      │
└──────────────────┘
```

---

## Header

Contains:

* current streak
* today's emissions
* quick dashboard link

---

Height:

```txt
72px
```

---

## History

Scrollable.

Maximum width:

```txt
900px
```

---

Messages appear as:

Floating glass containers.

---

Not:

```txt
ChatGPT clones
```

---

# Input Area

Sticky bottom.

---

Contains:

* text area
* send button
* receipt upload

---

Visual:

Glass panel.

Blur:

```txt
16px
```

---

# Action Card

Position:

Directly beneath input.

---

Visual Priority:

Highest on page.

---

Height:

```txt
220-280px
```

---

Contains:

* title
* description
* estimated impact
* estimated effort
* complete button

---

When completed:

Particle collapse animation.

---

# Dashboard

Route:

```txt
/dashboard
```

---

This is the most important screen.

---

# Above The Fold

Contains:

```txt
Environmental Field
```

not charts.

---

Height:

```txt
60vh
```

---

Visual:

Interactive carbon flow field.

Represents:

* density
* trends
* categories

---

User should immediately understand:

```txt
This is my footprint.
```

---

# Dashboard Layering

Layer 1:

Background atmosphere.

---

Layer 2:

Environmental field.

---

Layer 3:

Metrics.

---

Layer 4:

Charts.

---

# Summary Metrics

Position:

Top overlay.

---

Contains:

* emissions
* savings
* streak
* forecast

---

Use floating glass panels.

---

# Analytics Section

Contains:

```txt
Weekly Trend

Category Breakdown

Forecast
```

---

Visual:

Do NOT place 3 charts side-by-side.

---

Use:

```txt
Hero Chart

↓

Secondary Charts
```

---

# Profile Page

Route:

```txt
/profile
```

---

Layout:

```txt
Profile

↓

Preferences

↓

Statistics
```

---

Visual Style:

Minimal.

No Three.js.

---

# Settings Page

Route:

```txt
/settings
```

---

Style:

Functional.

---

No decorative motion.

---

No particle effects.

---

# Empty States

Every empty state must feel intentional.

---

Dashboard Empty

Show:

Atmospheric visualization.

Text:

```txt
Your footprint story starts with a single day.
```

---

Chat Empty

Show:

Interactive prompt examples.

---

# Mobile Rules

Priority:

Content over visuals.

---

Disable:

Heavy particle systems.

---

Replace:

```txt
5000 particles
```

with:

```txt
1000 particles
```

---

# Tablet Rules

Keep:

Visual identity.

Reduce:

Motion complexity.

---

# Accessibility Rules

All critical information must remain visible when:

```txt
prefers-reduced-motion
```

is enabled.

---

No information may exist solely in:

* animations
* particle systems
* 3D scenes

---

# Definition of Done

A screen is complete when:

* layout matches spec
* responsive behavior matches spec
* accessibility passes
* performance passes
* motion passes
* visual hierarchy is obvious

End of Document.
