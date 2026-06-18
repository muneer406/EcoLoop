# EcoLoop — UI Components Document

Version: 2.0
Status: Final
Priority: Critical
Last Updated: June 2026

---

# 1. Purpose

This document defines every page, component, state, interaction, accessibility requirement, and design rule used by EcoLoop.

The goal is to ensure:

* consistency
* accessibility
* responsiveness
* maintainability

This document is the source of truth for frontend implementation.

---

# 2. Design Principles

---

## Visual Identity Principles

### Principle 1

Do not design around nature.

Avoid:

* leaves
* trees
* forests
* globes
* recycling symbols

### Principle 2

Design around invisible systems.

The UI should feel like:

* data flowing through space
* hidden environmental impact becoming visible
* atmospheric intelligence

### Principle 3

Depth over decoration.

Prefer:

* depth
* translucency
* lighting
* motion

Over:

* illustrations
* decorative graphics

### Principle 4

Every page must contain at least one visual focal point.

A page should never feel like:

dashboard + cards + chart.

A page should feel designed.


## Mobile First

Primary viewport:

```txt id="1m8t2k"
375px
```

All screens must work perfectly on mobile before desktop.

---

## Accessibility First

Every component must support:

* keyboard navigation
* screen readers
* focus management
* reduced motion

---

## Positive Tone

Never use:

```txt id="l2m7kq"
You emitted too much today.
```

Use:

```txt id="j4n9pr"
Here's one opportunity to reduce tomorrow's footprint.
```

---

## Fast Interaction

User should never wait unnecessarily.

Loading states required.

---

# 3. Design System

---

## Colors

### Primary

```txt id="t8v3nm"
Green
```

Used for:

* actions
* savings
* positive progress

---

### Secondary

```txt id="q5r8dp"
Blue
```

Used for:

* charts
* navigation
* information

---

### Warning

```txt id="z9x2kw"
Amber
```

Used for:

* caution
* limits

---

### Error

```txt id="v7m4lc"
Red
```

Used only for:

* failures
* validation errors

Never for environmental guilt.

---

# 4. Layout Structure

```txt id="c8n2jq"
AppShell

├── Navbar
├── Sidebar (desktop)
├── MobileNav
├── Main Content
└── Footer
```

---

# 5. Page Structure

---

## Landing Page

Route:

```txt id="s4k9pt"
/
```

---

### Purpose

Convert visitors into users.

---

### Sections

```txt id="n2f7vm"
Hero

↓

Features

↓

How It Works

↓

Benefits

↓

CTA
```

---

### Components

* HeroSection
* FeatureGrid
* HowItWorks
* CTASection

---

# 6. Authentication Page

Route:

```txt id="p7m3dw"
/login
```

---

### Components

* GoogleSignInButton
* MagicLinkForm

---

### States

```txt id="y3v8kp"
Idle
Loading
Success
Error
```

---

# 7. Onboarding Page

Route:

```txt id="x8j4nb"
/onboarding
```

---

### Questions

Country

Transport Mode

Diet Type

---

### Component

```tsx
interface OnboardingFormProps {
  onSubmit: () => void;
}
```

---

### Requirements

* single page
* progress indicator
* validation

---

# 8. Chat Page

Route:

```txt id="m1q7rh"
/chat
```

---

### Purpose

Primary product experience.

---

### Layout

```txt id="u4p2xk"
Chat History

↓

Input

↓

Action Card
```

---

### Components

* ChatHistory
* ChatInput
* ChatMessage
* ActivityBreakdown
* ActionCard

---

# 9. ChatInput

Purpose:

User activity logging.

---

### Props

```tsx
interface ChatInputProps {
  onSend: (message: string) => void;

  loading: boolean;
}
```

---

### Features

* auto resize
* enter to submit
* shift + enter newline
* character count

---

### Validation

```txt id="h9v4qp"
1-500 chars
```

---

### Accessibility

```txt id="k3w7mz"
aria-label
```

required.

---

# 10. ChatMessage

Displays:

* user message
* parsed results

---

### Props

```tsx
interface ChatMessageProps {
  message: Log;
}
```

---

### States

* loading
* success
* error

---

# 11. ActivityBreakdown

Displays:

```txt id="e5r8dn"
Activity

↓

CO₂

↓

Total
```

---

### Example

```txt id="v2n7qm"
Car Trip

2.3kg
```

---

### Props

```tsx
interface ActivityBreakdownProps {
  activities: CalculatedActivity[];

  totalCo2Kg: number;
}
```

---

# 12. Daily Action Card

Most important UI component.

---

### Displays

* action title
* description
* savings
* time required

---

### Actions

```txt id="r8v3qp"
Done

Skip
```

---

### Props

```tsx
interface ActionCardProps {
  action: DailyAction;

  onDone: () => void;

  onSkip: () => void;
}
```

---

### States

* pending
* completed
* skipped

---

# 13. Dashboard Page

Route:

```txt id="g4k8nm"
/dashboard
```

---

### Sections

```txt id="d9p2wr"
Summary

↓

Charts

↓

Forecast

↓

Comparisons
```

---

### Components

* SummaryCards
* WeeklyChart
* CategoryChart
* ForecastCard
* ComparisonCard

---

# 14. Summary Cards

Display:

* current streak
* total CO₂
* total saved
* actions completed

---

### Props

```tsx
interface SummaryCardsProps {
  summary: DashboardSummary;
}
```

---

# 15. Weekly Chart

Library:

```txt id="f7q3ks"
Recharts
```

---

Displays:

```txt id="l8p1vc"
7 day trend
```

---

### Props

```tsx
interface WeeklyChartProps {
  data: DailyPoint[];
}
```

---

# 16. Category Chart

Displays:

```txt id="b2n9tw"
Transport

Food

Energy

Shopping
```

---

### Chart Type

```txt id="w7m3dp"
Pie Chart
```

---

# 17. Forecast Card

Displays:

```txt id="n3q8lk"
Projected Annual Emissions
```

---

### Example

```txt id="x5r2pv"
2920kg/year
```

---

# 18. Comparison Card

Displays:

```txt id="q4m7zn"
Global Average

Paris Target
```

---

### Status

```txt id="j6v2pk"
Above

On Track

Below
```

---

# 19. Profile Page

Route:

```txt id="m8k4dt"
/profile
```

---

### Sections

* profile info
* preferences
* statistics

---

### Components

* ProfileCard
* PreferencesCard
* StatisticsCard

---

# 20. Receipt Upload Component

Purpose:

Receipt scanning.

---

### Props

```tsx
interface ReceiptUploaderProps {
  onUpload: (file: File) => void;
}
```

---

### Validation

Types:

```txt id="p3v9kw"
jpg
jpeg
png
webp
```

---

Maximum:

```txt id="u5m8qp"
5MB
```

---

### States

* idle
* uploading
* processing
* success
* error

---

# 21. Navigation Components

---

## Navbar

Desktop.

Contains:

* logo
* dashboard
* chat
* profile
* sign out

---

## Mobile Navigation

Drawer based.

---

### Requirements

* focus trap
* escape closes
* overlay click closes

---

# 22. Loading Components

Every async operation requires loading UI.

---

## Skeletons

Used for:

* dashboard
* profile
* history

---

## Spinner

Used for:

* AI processing
* uploads

---

# 23. Error Components

Standardized.

---

### Props

```tsx
interface ErrorStateProps {
  title: string;

  description: string;

  retry?: () => void;
}
```

---

### Example

```txt id="t4n8pk"
Could not process your message.
Please try again.
```

---

# 24. Empty States

Required.

---

### Chat

```txt id="n7m2qw"
Describe your day to get started.
```

---

### Dashboard

```txt id="r9k4dv"
No data yet.
Log your first activity.
```

---

# 25. Accessibility Requirements

Every component must support:

---

## Keyboard Navigation

Tab reachable.

---

## Screen Readers

Labels required.

---

## Focus States

Visible.

Never removed.

---

## Reduced Motion

Respect:

```css
prefers-reduced-motion
```

---

## Touch Targets

Minimum:

```txt id="x8m4qp"
44px × 44px
```

---

# 26. Responsive Breakpoints

| Name    | Width      |
| ------- | ---------- |
| Mobile  | < 640px    |
| Tablet  | 640-1024px |
| Desktop | > 1024px   |

---

# 27. Animation Rules

Allowed:

* fade
* slide
* scale

Duration:

```txt id="v4m8kp"
150-250ms
```

---

Forbidden:

* excessive motion
* bouncing
* distracting effects

---

# 28. Performance Requirements

Initial page:

```txt id="b6n3wr"
< 1.5s
```

---

Interaction:

```txt id="j8p4qk"
< 100ms
```

---

Chart render:

```txt id="k5m7nv"
< 50ms
```

---

# 29. Testing Requirements

Every major component must have:

* render test
* interaction test
* accessibility test

Coverage target:

```txt id="p2r9dt"
90%+
```

---

# 30. Definition of Done

Frontend is complete when:

* all pages implemented
* all states handled
* accessibility passes
* responsiveness passes
* tests pass
* Lighthouse ≥ 90

---

End of Document.
