# EcoLoop — Microinteractions

Version: 1.0

Status: Final

Priority: High

---

# Purpose

This document defines all small interactions that make EcoLoop feel premium.

Users rarely remember layouts.

Users remember:

* feeling
* responsiveness
* polish

Microinteractions create that feeling.

---

# Philosophy

Microinteractions should:

* confirm actions
* reinforce understanding
* reward progress

Never:

* distract
* slow users down
* exist only for decoration

---

# Button Hover

Primary buttons:

Effects:

* translateY(-2px)
* glow +10%
* brightness +5%

Duration:

150ms

---

# Button Click

Effects:

* scale(0.98)

Duration:

75ms

---

# Input Focus

Effects:

* border accent color
* soft glow
* subtle elevation

Duration:

150ms

---

# Activity Logged Successfully

Sequence:

```txt id="mi01"
Send

↓

Input clears

↓

Activity appears

↓

Environmental field updates

↓

Metrics animate
```

Total:

400ms

---

# Daily Action Complete

Sequence:

```txt id="mi02"
Button Press

↓

Card Illuminates

↓

Particle Collapse

↓

Checkmark Appears

↓

Savings Counter Updates

↓

Field Becomes Cleaner
```

Duration:

800ms

---

# Savings Counter

Number should animate.

Example:

```txt id="mi03"
24.2kg

↓

26.0kg
```

Duration:

600ms

---

# Streak Increase

Avoid:

🔥 emoji

---

Use:

Subtle ring completion animation.

Duration:

500ms

---

# Dashboard Metric Hover

Hovering metric reveals:

* explanation
* contributing factors

Fade:

150ms

---

# Chart Hover

Effects:

* active point enlarges
* inactive data dims

Never animate entire chart.

---

# Empty State Interaction

Particles respond to cursor.

Purpose:

Encourage exploration.

---

# Navigation Hover

Underline grows from center.

Duration:

150ms

---

# Mobile Haptics

Where supported:

* action completion
* successful logging
* important confirmations

No excessive haptics.

---

# Success Toast

Slide + fade.

Duration:

250ms

Auto dismiss:

3 seconds.

---

# Error Toast

Appear instantly.

No shaking.

No flashing.

---

# Loading State

Never use spinner alone.

Always include:

* progress
* context

Example:

```txt id="mi04"
Analyzing your activities...
```

---

# Definition of Done

Every meaningful action must provide feedback within:

```txt id="mi05"
100ms
```

End of Document.
