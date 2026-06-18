# EcoLoop — Interaction Specifications

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document defines exactly how every major interaction behaves.

Without this document, developers will invent interactions.

That leads to inconsistency.

Every animation, hover effect, click state, loading state, success state, and transition must follow these rules.

---

# Interaction Philosophy

Interactions should feel:

* precise
* responsive
* premium
* intentional

Never:

* playful
* childish
* game-like

Think:

```txt id="h6u2rk"
Linear

Apple

Arc Browser

Raycast
```

Not:

```txt id="v7m1xs"
Dribbble animations

AOS effects

Generic SaaS templates
```

---

# Global Timing System

Fast:

```txt id="p8g2qy"
150ms
```

Used for:

* hover
* focus
* tooltip

---

Normal:

```txt id="c4j7nl"
250ms
```

Used for:

* cards
* buttons
* panels

---

Large:

```txt id="x2r9md"
500ms
```

Used for:

* modal transitions
* section reveals

---

Hero:

```txt id="u3q8tv"
800-1200ms
```

Used for:

* scene transitions
* immersive animations

---

# Easing

Use only:

```css id="r8v4kn"
cubic-bezier(0.22,1,0.36,1)
```

or

Spring motion.

---

Forbidden:

```txt id="f9m5xy"
ease-in-out

bounce

elastic
```

---

# Button Interactions

---

## Default

No movement.

---

## Hover

Duration:

```txt id="n4k8jd"
150ms
```

Effects:

```txt id="t7q1ps"
translateY(-2px)

brightness +5%

shadow +10%
```

---

## Press

Duration:

```txt id="k2m9wr"
75ms
```

Effects:

```txt id="z5v3hx"
scale(0.98)
```

---

## Success

Button transforms into:

```txt id="d8r2mn"
checkmark
```

Animation:

```txt id="c6q7tk"
250ms
```

---

# CTA Buttons

Primary CTA receives:

Magnetic hover.

---

## Magnetic Hover

Cursor enters:

Button subtly follows cursor.

Maximum movement:

```txt id="y1p8vw"
6px
```

---

Return:

Spring motion.

---

# Card Interactions

---

## Hover

Elevation increases.

---

Effects:

```txt id="q3n6rs"
translateY(-4px)

scale(1.01)
```

---

Duration:

```txt id="v8k5jx"
200ms
```

---

## Focus

Glow increases.

Border brightens.

---

Never use:

```txt id="r5q2mu"
large zoom
```

---

# Glass Cards

Used for:

* action cards
* summary cards
* overlays

---

Hover:

```txt id="j2w7kp"
blur +2px

opacity +5%
```

---

# Navigation

---

## Nav Link Hover

Underline animation.

Duration:

```txt id="m9t3rx"
150ms
```

---

Line grows:

```txt id="d4k8vz"
0%

↓

100%
```

---

## Active Link

Persistent glow.

---

No bouncing indicators.

---

# Inputs

---

## Focus

Border:

Accent color.

---

Glow:

```txt id="p7n1jc"
8px
```

soft.

---

Duration:

```txt id="y5v8mk"
150ms
```

---

## Error

Shake animation:

Forbidden.

---

Use:

```txt id="u9r4tx"
border color

message

icon
```

only.

---

# Textarea

(Chat Input)

---

Focus:

Expand slightly.

---

Height increase:

```txt id="h3k7nv"
4px
```

---

Duration:

```txt id="q8m2wr"
200ms
```

---

# Action Card

Most important interaction.

---

## Hover

Card reacts to cursor position.

---

Maximum rotation:

```txt id="b5n9yt"
2°
```

---

Never exceed.

---

Effect:

Subtle depth illusion.

---

## Completion

Sequence:

```txt id="m4r8kp"
Button Press

↓

Card Glow

↓

Particles Collapse

↓

Success State

↓

Metric Update
```

---

Total Duration:

```txt id="t7v1jx"
800ms
```

---

# Dashboard Metrics

---

Hover:

Reveal explanation.

---

Example:

```txt id="f2q8wd"
7.4kg

↓

Why?
```

---

Tooltip fades in.

---

Duration:

```txt id="n8k3mv"
150ms
```

---

# Charts

---

Hover:

Highlight active data.

Dim inactive data.

---

Never:

```txt id="r4v9px"
explode pie charts
```

---

Never:

```txt id="k1m5tz"
animate every point
```

---

# Carbon Constellation

(Visual Footprint Layer)

---

Hover Node

Effects:

```txt id="y7q2kn"
node grows

connections illuminate
```

---

Duration:

```txt id="m5v8rx"
200ms
```

---

Click Node

Open detail panel.

---

Panel animation:

```txt id="c8k1pw"
slide + fade
```

---

# Three.js Hero

---

Mouse Move

Particles react.

---

Response Delay:

```txt id="v3r9jx"
< 16ms
```

---

Movement:

Fluid.

Never chaotic.

---

Scroll

Scene transforms gradually.

---

Not:

```txt id="x7k4nm"
scene switch
```

---

Instead:

```txt id="z1v8tp"
scene evolution
```

---

# Loading States

---

Never show:

```txt id="q4m2jw"
spinner only
```

---

Instead:

Skeletons.

---

Chat Processing

Show:

```txt id="w6k8nv"
Analyzing Activities
```

---

Animated progress bar.

---

Dashboard Loading

Use:

Content skeletons.

Not blank screens.

---

# Modals

---

Open

Duration:

```txt id="m8q3tv"
250ms
```

---

Effects:

```txt id="g2r9pk"
fade

scale 0.98 → 1
```

---

Backdrop:

```txt id="n1k7mw"
blur 12px
```

---

Close

Reverse animation.

---

# Toast Notifications

---

Position:

```txt id="x9v4kr"
top-right
```

desktop.

---

```txt id="p2m8tx"
top-center
```

mobile.

---

Duration:

```txt id="q5k1nv"
3 seconds
```

---

Animation:

```txt id="c4r8pw"
slide

fade
```

---

# Page Transitions

---

Route Change

Duration:

```txt id="z8v3jk"
300ms
```

---

Sequence:

```txt id="m7q2tn"
old page fade

↓

new page reveal
```

---

No full-screen loaders.

---

# Reduced Motion Mode

When:

```txt id="h4v8kr"
prefers-reduced-motion
```

---

Disable:

* particle movement
* parallax
* magnetic hover
* card tilt

---

Keep:

* fades
* accessibility transitions

---

# Forbidden Interactions

Never use:

```txt id="p8m4tw"
bounce

shake

rubber band

infinite animations

confetti

spinning loaders

parallax overload
```

---

# Definition of Done

An interaction is complete when:

* responsive
* accessible
* performant
* consistent
* follows timing system
* follows motion system

End of Document.
