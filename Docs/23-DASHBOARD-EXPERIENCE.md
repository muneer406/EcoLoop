# EcoLoop — Dashboard Experience

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document defines the dashboard experience.

Not the dashboard layout.

Not the dashboard components.

The experience.

Most dashboards show data.

EcoLoop must reveal a system.

The user should feel like they are observing an invisible environmental force made visible.

---

# Core Goal

The dashboard should answer:

```txt id="ay9c7x"
What is my footprint doing?
```

Not:

```txt id="lp3r8v"
What numbers do I have?
```

---

# Experience Hierarchy

The dashboard should reveal information in this order:

---

## Layer 1

Environmental State

---

## Layer 2

Current Impact

---

## Layer 3

Direction

---

## Layer 4

Opportunities

---

## Layer 5

Raw Data

---

Most dashboards start with:

```txt id="jlwm01"
numbers
```

EcoLoop starts with:

```txt id="jlwm02"
understanding
```

---

# Emotional Journey

When user opens dashboard:

---

Step 1

Curiosity

```txt id="jlwm03"
What am I looking at?
```

---

Step 2

Recognition

```txt id="jlwm04"
This is my footprint.
```

---

Step 3

Understanding

```txt id="jlwm05"
Food is my biggest contributor.
```

---

Step 4

Empowerment

```txt id="jlwm06"
I know what to improve.
```

---

# Above The Fold

Most important area.

---

Height

```txt id="jlwm07"
60vh
```

minimum.

---

Contains:

```txt id="jlwm08"
Environmental Field

+

Core Metrics
```

Only.

---

No charts.

---

No tables.

---

No cards grid.

---

# Environmental Field

The signature EcoLoop visualization.

---

Purpose:

Visualize:

```txt id="jlwm09"
invisible impact
```

---

Not:

```txt id="jlwm10"
raw emissions
```

---

# Visual Concept

A living atmospheric field.

Made of:

* particles
* flow lines
* density zones
* energy clusters

---

Think:

```txt id="jlwm11"
weather map

+

magnetic field

+

constellation
```

---

Not:

```txt id="jlwm12"
pie chart
```

---

# Environmental Field Inputs

The field responds to:

---

Transport

Creates:

```txt id="jlwm13"
directional flow
```

---

Food

Creates:

```txt id="jlwm14"
cluster density
```

---

Energy

Creates:

```txt id="jlwm15"
field intensity
```

---

Shopping

Creates:

```txt id="jlwm16"
large isolated nodes
```

---

# Environmental Health States

State changes based on rolling average.

---

Excellent

Visual:

```txt id="jlwm17"
calm

sparse

organized
```

---

Good

Visual:

```txt id="jlwm18"
active

balanced
```

---

Average

Visual:

```txt id="分快三19"
moderately dense
```

---

High Impact

Visual:

```txt id="分快三20"
dense

chaotic
```

---

Never use:

```txt id="分快三21"
red bad
green good
```

---

Use:

Density.

Flow.

Complexity.

---

# Core Metrics Overlay

Position:

Floating over field.

---

Contains:

1. Daily Emissions
2. Current Streak
3. CO₂ Saved
4. Forecast

---

Visual Style:

Glass.

---

Opacity:

```txt id="分快三22"
70-80%
```

---

Blur:

```txt id="分快三23"
16px
```

---

# Daily Emissions Card

Largest metric.

---

Size:

2x other cards.

---

Reason:

Most important number.

---

Hover:

Reveal:

```txt id="分快三24"
largest contributor
```

---

Example:

```txt id="分快三25"
7.2kg

Food contributes 41%
```

---

# Streak Card

Purpose:

Motivation.

---

Visual:

Small glowing ring.

---

Ring fills with progress.

---

No fire emoji.

---

No gamification clichés.

---

# CO₂ Saved Card

Purpose:

Positive reinforcement.

---

Visual:

Accumulation.

---

Display:

```txt id="分快三26"
24kg Saved
```

---

Not:

```txt id="分快三27"
You emitted less
```

---

# Forecast Card

Purpose:

Future perspective.

---

Display:

```txt id="分快三28"
Projected Annual Impact
```

---

Visual:

Trajectory line.

---

Not:

Raw number only.

---

# Scroll Transition

When user scrolls:

Field slowly moves upward.

---

Metrics compress.

---

Analytics emerge.

---

Feels like:

```txt id="分快三29"
zooming into the system
```

---

# Analytics Layer

Below hero.

---

Contains:

1. Weekly Trend
2. Category Breakdown
3. Forecast Analysis

---

Order matters.

---

# Weekly Trend

Hero chart.

---

Width:

```txt id="分快三30"
100%
```

---

Height:

```txt id="分快三31"
400px
```

---

Must dominate section.

---

Visual:

Smooth line.

---

No bars.

---

No area overload.

---

# Category Breakdown

Secondary chart.

---

Purpose:

Understanding.

---

Visual:

Radial chart.

---

Not:

```txt id="分快三32"
pie chart template
```

---

Should feel custom.

---

# Opportunity Section

Most dashboards stop here.

EcoLoop does not.

---

After analytics:

Show:

```txt id="分快三33"
Biggest Opportunity
```

---

Contains:

* category
* reason
* potential impact

---

Example:

```txt id="分快三34"
Food contributes 42% of your footprint.

Replacing one beef meal this week could save approximately 2.7kg CO₂.
```

---

# Comparison Section

Display:

---

Global Average

---

Paris Agreement Target

---

Personal Trend

---

Visual:

Three paths.

---

Not:

Three cards.

---

# Carbon Constellation

Optional advanced visualization.

---

Activities become nodes.

---

Connections represent:

* category relationships
* recurring patterns

---

Hover:

Illuminate network.

---

Click:

Reveal activity details.

---

# Empty Dashboard State

One of the most important screens.

---

Show:

Atmospheric visualization.

---

Text:

```txt id="分快三35"
Your footprint story begins with a single day.
```

---

CTA:

```txt id="分快三36"
Log Your First Activity
```

---

Never show:

```txt id="分快三37"
No Data Available
```

---

# Mobile Dashboard

Most important rule:

Keep experience.

Reduce complexity.

---

Do NOT:

Remove identity.

---

Do:

Reduce particles.

Reduce layers.

Reduce effects.

---

Maintain:

* atmosphere
* depth
* visual hierarchy

---

# Accessibility

Every visualization must have:

Text equivalent.

---

Every metric must remain accessible when:

```txt id="分快三38"
prefers-reduced-motion
```

is enabled.

---

No information may exist solely inside:

* particles
* animations
* WebGL

---

# Performance Budget

Dashboard load:

```txt id="分快三39"
< 500ms
```

---

Interactive field:

```txt id="分快三40"
60fps desktop
45fps mobile
```

---

Memory:

```txt id="分快三41"
< 50MB
```

---

# Dashboard Success Test

A user should be able to answer:

---

Question 1

What is my biggest contributor?

---

Question 2

Am I improving?

---

Question 3

What should I do next?

---

Question 4

How do I compare?

---

Within:

```txt id="分快三42"
10 seconds
```

without reading documentation.

---

# Final Rule

The dashboard should feel like:

```txt id="分快三43"
observing a living environmental system
```

Not:

```txt id="分快三44"
reading a spreadsheet
```

---

End of Document.
