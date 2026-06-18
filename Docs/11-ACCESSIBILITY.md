# EcoLoop — Accessibility Specification

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document defines the accessibility requirements for EcoLoop.

Accessibility is not a compliance task.

Accessibility is a product requirement.

EcoLoop must be usable by:

* keyboard users
* screen reader users
* low vision users
* motion-sensitive users
* color-blind users
* mobile users

---

# Compliance Target

Target:

```txt id="acc01"
WCAG 2.2 AA
```

Minimum.

---

Stretch Goal:

```txt id="acc02"
WCAG AAA
```

where practical.

---

# Accessibility Principles

---

## Principle 1

Every feature must be accessible.

Not just most features.

---

## Principle 2

Accessibility must exist from day one.

Not after launch.

---

## Principle 3

Accessibility must not be optional.

There should be no:

```txt id="acc03"
accessible version
```

The main version must be accessible.

---

# Keyboard Navigation

Every interactive element must support:

---

Tab

---

Shift + Tab

---

Enter

---

Space

---

Escape

(where applicable)

---

# Keyboard Rules

Users must be able to:

```txt id="acc04"
Sign Up

↓

Onboard

↓

Log Activity

↓

Complete Action

↓

Use Dashboard
```

without touching a mouse.

---

# Focus States

Every focusable element requires:

Visible focus.

---

Forbidden:

```css id="acc05"
outline: none;
```

unless replaced.

---

Required:

Minimum contrast:

```txt id="acc06"
3:1
```

against surrounding colors.

---

# Focus Order

Must follow visual order.

---

Never:

```txt id="acc07"
jump around page
```

---

# Screen Reader Support

Every interactive element requires:

---

Accessible Name

---

Accessible Role

---

Accessible State

---

# Buttons

Bad:

```html id="acc08"
<button>
  <Icon />
</button>
```

---

Good:

```html id="acc09"
<button aria-label="Upload receipt">
  <Icon />
</button>
```

---

# Forms

Every input requires:

* label
* description
* error state

---

Never rely on:

```txt id="acc10"
placeholder text
```

as a label.

---

# Error Messages

Errors must be:

* visible
* announced

---

Use:

```html id="acc11"
aria-live="polite"
```

---

Example:

```txt id="acc12"
Please enter a valid activity.
```

---

# Color Accessibility

Never communicate information using color alone.

---

Bad:

```txt id="acc13"
Red = bad

Green = good
```

---

Good:

```txt id="acc14"
Color

+

Text

+

Icon
```

---

# Contrast Requirements

Normal Text:

```txt id="acc15"
4.5:1
```

minimum.

---

Large Text:

```txt id="acc16"
3:1
```

minimum.

---

Interactive Elements:

```txt id="acc17"
3:1
```

minimum.

---

# Motion Accessibility

Support:

```css id="acc18"
prefers-reduced-motion
```

---

When enabled:

Disable:

* particle animation
* parallax
* card tilt
* magnetic hover
* environmental field movement

---

Replace with:

* opacity transitions
* fades

---

# Three.js Accessibility

Critical rule:

No important information may exist only inside:

* WebGL
* particles
* visual effects

---

Every visualization requires:

Text equivalent.

---

Example:

Instead of:

```txt id="acc19"
Field Looks Dense
```

Provide:

```txt id="acc20"
Your emissions increased by 14% this week.
```

---

# Chart Accessibility

Every chart requires:

---

Accessible Title

---

Accessible Description

---

Data Table Alternative

---

Example:

```txt id="acc21"
Weekly Emissions Trend
```

---

Description:

```txt id="acc22"
Emissions decreased from 9kg to 6kg over 7 days.
```

---

# Dashboard Accessibility

Environmental Field must have:

Accessible summary.

---

Example:

```txt id="acc23"
Current footprint is moderate.

Food contributes 41%.

Transport contributes 32%.
```

---

# Touch Targets

Minimum:

```txt id="acc24"
44px × 44px
```

---

Preferred:

```txt id="acc25"
48px × 48px
```

---

# Mobile Accessibility

Support:

* screen zoom
* dynamic text
* orientation changes

---

Never block:

```txt id="acc26"
200% zoom
```

---

# Modals

Must:

* trap focus
* restore focus on close
* support escape key

---

Focus order:

```txt id="acc27"
Open

↓

First Element

↓

Last Element

↓

Close
```

---

# Navigation Accessibility

Navbar requires:

```html id="acc28"
<nav>
```

landmark.

---

Main content:

```html id="acc29"
<main>
```

---

Footer:

```html id="acc30"
<footer>
```

---

# Skip Links

Required.

---

Example:

```txt id="acc31"
Skip to Main Content
```

---

Visible on focus.

---

# Loading States

Screen readers must know:

Loading started.

Loading finished.

---

Use:

```html id="acc32"
aria-busy="true"
```

where appropriate.

---

# Toast Notifications

Must be announced.

---

Use:

```html id="acc33"
role="status"
```

or

```html id="acc34"
aria-live
```

---

# Empty States

Must remain understandable without visuals.

---

Bad:

```txt id="acc35"
particle animation only
```

---

Good:

```txt id="acc36"
text + visual
```

---

# Language

HTML root requires:

```html id="acc37"
lang="en"
```

---

# Accessibility Testing

Required Tools:

* axe-core
* Lighthouse
* Playwright

---

# Required Tests

Keyboard Navigation

---

Screen Readers

---

Reduced Motion

---

Color Contrast

---

Zoom Testing

---

Mobile Accessibility

---

# Lighthouse Targets

Accessibility:

```txt id="acc38"
100
```

Target.

---

Minimum:

```txt id="acc39"
95+
```

---

# Definition of Done

Accessibility is complete when:

* WCAG AA achieved
* keyboard navigation works
* screen readers work
* reduced motion works
* charts accessible
* Three.js accessible
* Lighthouse ≥ 95

---

# Final Rule

A visually stunning experience that excludes users is considered:

```txt id="acc40"
a failed implementation
```

Accessibility is part of the design.

Not separate from it.

---

End of Document.
