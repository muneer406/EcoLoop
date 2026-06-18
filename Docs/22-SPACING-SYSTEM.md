# EcoLoop — Spacing System

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document defines all spacing rules used across EcoLoop.

Spacing is one of the strongest indicators of design quality.

Most AI-generated interfaces fail because spacing is inconsistent.

This document removes all ambiguity.

---

# Core Principle

Spacing must feel intentional.

Never use arbitrary values.

Forbidden:

```css
margin-top: 13px;
padding: 19px;
gap: 27px;
```

Allowed:

```css
8
16
24
32
48
64
96
128
```

---

# Base Unit

Base:

```txt
8px
```

Every spacing value must be a multiple of:

```txt
8
```

---

# Spacing Scale

| Token | Value |
| ----- | ----- |
| xs    | 8px   |
| sm    | 16px  |
| md    | 24px  |
| lg    | 32px  |
| xl    | 48px  |
| 2xl   | 64px  |
| 3xl   | 96px  |
| 4xl   | 128px |

---

# Component Padding

---

## Buttons

Horizontal:

```txt
16px
```

Vertical:

```txt
10px
```

Large CTA:

```txt
24px
```

Horizontal.

---

## Inputs

Padding:

```txt
16px
```

all sides.

---

## Cards

Default:

```txt
24px
```

---

Large Cards:

```txt
32px
```

---

Hero Cards:

```txt
48px
```

---

## Modals

Padding:

```txt
32px
```

---

# Layout Spacing

---

## Page Margin

Mobile:

```txt
20px
```

---

Tablet:

```txt
32px
```

---

Desktop:

```txt
48px
```

---

Large Desktop:

```txt
64px
```

---

# Section Spacing

Between sections:

```txt
128px
```

desktop.

---

Mobile:

```txt
80px
```

---

Never:

```txt
32px
```

between major sections.

---

# Hero Layout

---

Headline → Description

```txt
24px
```

---

Description → CTA

```txt
32px
```

---

Hero Content → Next Section

```txt
128px
```

---

# Dashboard Layout

---

Environmental Field → Metrics

```txt
32px
```

---

Metrics → Analytics

```txt
64px
```

---

Chart → Chart

```txt
48px
```

---

# Card Layout

---

Title → Description

```txt
12px
```

---

Description → Metadata

```txt
16px
```

---

Metadata → Actions

```txt
24px
```

---

# Navigation

---

Logo → Navigation

```txt
64px
```

---

Navigation Item Gap

```txt
24px
```

---

Mobile Navigation Item Gap

```txt
16px
```

---

# Form Layout

---

Label → Input

```txt
8px
```

---

Input → Error

```txt
8px
```

---

Field → Field

```txt
24px
```

---

Section → Section

```txt
48px
```

---

# Chat Layout

---

Message → Message

```txt
16px
```

---

History → Input

```txt
24px
```

---

Input → Action Card

```txt
24px
```

---

# Dashboard Metrics

---

Metric Card Gap

```txt
24px
```

---

Card Internal Padding

```txt
24px
```

---

Value → Label

```txt
8px
```

---

# Content Width Rules

---

Reading Content

Max:

```txt
720px
```

---

Forms

Max:

```txt
640px
```

---

Dashboard Content

Max:

```txt
1400px
```

---

Hero Text

Max:

```txt
600px
```

---

# Grid System

---

Desktop

```txt
12 columns
```

---

Tablet

```txt
8 columns
```

---

Mobile

```txt
4 columns
```

---

# Whitespace Rules

Whitespace is a feature.

Prefer:

```txt
More whitespace
```

over:

```txt
More content
```

---

If a screen feels crowded:

Increase spacing.

Do not shrink typography first.

---

# Visual Density

---

Landing Page

Density:

```txt
Low
```

---

Dashboard

Density:

```txt
Medium
```

---

Settings

Density:

```txt
High
```

---

# Alignment Rules

Every screen should align to:

```txt
One vertical rhythm
```

---

Avoid:

```txt
Random alignment
```

---

Avoid:

```txt
Pixel nudging
```

---

# Mobile Rules

Spacing should shrink.

Hierarchy should not.

---

Example:

Desktop:

```txt
128px
```

↓

Mobile:

```txt
80px
```

---

Not:

```txt
24px
```

---

# Quality Checklist

Before approving a screen:

Check:

* Consistent spacing?
* Consistent rhythm?
* Clear hierarchy?
* Comfortable reading width?
* Enough breathing room?

If any answer is no:

Redesign.

---

# Definition of Done

Spacing is complete when:

* every spacing value uses tokens
* hierarchy is obvious
* screens breathe
* alignment is consistent
* no arbitrary values exist

End of Document.
