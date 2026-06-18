# EcoLoop — Habit Engine

Version: 2.0
Status: Final
Priority: Critical
Last Updated: June 2026

---

# 1. Purpose

This document defines the deterministic habit-building engine used by EcoLoop.

The Habit Engine is responsible for:

* selecting daily actions
* maintaining streaks
* tracking behavioral progress
* calculating CO₂ savings
* encouraging consistency

The engine transforms:

```txt id="6nnksu"
Understand
```

and

```txt id="djc9bx"
Track
```

into

```txt id="4m2s7w"
Reduce
```

through small achievable actions.

---

# 2. Critical Rule

AI is never involved in:

* action selection
* streak updates
* milestone rewards
* progress tracking
* savings calculations

All behavior logic must be deterministic.

---

# 3. Design Philosophy

EcoLoop follows the work of:

### BJ Fogg

Behavior Model:

```txt id="olr6dx"
Behavior

=

Motivation
×
Ability
×
Prompt
```

---

### James Clear

Atomic Habits

Focus:

```txt id="xltb7s"
Small improvements

Repeated consistently
```

---

### Product Principle

The goal is not:

```txt id="s9woaw"
Maximum reduction today
```

The goal is:

```txt id="7c3rlk"
Sustainable reduction forever
```

---

# 4. Core Rules

---

## Rule 1

Actions must be achievable today.

---

## Rule 2

Actions must not require purchases.

---

## Rule 3

Actions must be measurable.

---

## Rule 4

Actions must be specific.

Bad:

```txt id="u7syrm"
Drive less.
```

Good:

```txt id="wvh8w5"
Walk one trip under 1km today.
```

---

## Rule 5

Actions must be encouraging.

Never guilt users.

---

# 5. Core Types

---

## MicroAction

```ts id="jncjjk"
interface MicroAction {
  id: string;

  category:
    | "transport"
    | "food"
    | "energy"
    | "shopping";

  title: string;

  description: string;

  co2SavingKg: number;

  equivalence: string;

  difficulty:
    | "easy"
    | "medium";

  estimatedMinutes: number;

  active: boolean;
}
```

---

## User Action

```ts id="kxhx2x"
interface UserAction {
  userId: string;

  actionId: string;

  status:
    | "done"
    | "skipped";

  completedAt: Date;
}
```

---

## Streak

```ts id="0n2phv"
interface Streak {
  currentStreak: number;

  longestStreak: number;

  totalActionsCompleted: number;

  totalCo2SavedKg: number;

  lastCompletedDate: string | null;
}
```

---

# 6. Action Categories

---

## Transport

Examples:

* walk short trips
* carpool
* combine errands
* use public transport

---

## Food

Examples:

* swap beef for chicken
* skip one meat meal
* choose local produce

---

## Energy

Examples:

* reduce AC usage
* unplug idle electronics
* air dry clothes

---

## Shopping

Examples:

* avoid impulse purchases
* repair instead of replace
* delay non-essential buying

---

# 7. Action Pool Requirements

Minimum:

```txt id="z3yffv"
10 actions per category
```

Required:

```txt id="m5tmv3"
40+ total actions
```

---

Distribution:

```txt id="4z9v4h"
Transport 25%
Food 25%
Energy 25%
Shopping 25%
```

---

# 8. Example Actions

---

## Transport

```json id="rv4vag"
{
  "title": "Walk one trip under 1km",
  "co2SavingKg": 0.19
}
```

---

```json id="fpxv8s"
{
  "title": "Combine two errands into one drive",
  "co2SavingKg": 0.50
}
```

---

## Food

```json id="h8gcxa"
{
  "title": "Replace one beef meal today",
  "co2SavingKg": 2.70
}
```

---

```json id="f1zmyh"
{
  "title": "Choose a vegetarian lunch",
  "co2SavingKg": 1.80
}
```

---

## Energy

```json id="h3b1go"
{
  "title": "Reduce AC use by one hour",
  "co2SavingKg": 0.80
}
```

---

```json id="37fgj8"
{
  "title": "Unplug unused electronics tonight",
  "co2SavingKg": 0.20
}
```

---

## Shopping

```json id="c7xj3h"
{
  "title": "Delay one non-essential purchase",
  "co2SavingKg": 3.00
}
```

---

# 9. Action Selection Algorithm

The most important function.

---

## Step 1

Collect last 7 days.

```txt id="jjdz2s"
activities
```

---

## Step 2

Calculate category totals.

Example:

```txt id="b9qdu5"
Transport = 24kg

Food = 15kg

Energy = 8kg

Shopping = 4kg
```

---

## Step 3

Find largest category.

Example:

```txt id="y3b5po"
Transport
```

---

## Step 4

Filter action pool.

Keep only:

```txt id="9q0zw2"
Transport Actions
```

---

## Step 5

Remove yesterday's action.

---

## Step 6

Remove last 3 completed actions.

Avoid repetition.

---

## Step 7

Sort by:

```txt id="oq2q3s"
Highest Impact

↓

Lowest Time Cost

↓

Easy Difficulty
```

---

## Step 8

Return top candidate.

---

# 10. Personalization

Personalization is deterministic.

---

## Diet

If:

```txt id="gqejmo"
vegan
```

Never suggest:

```txt id="h6tvjlwm"
replace beef with chicken
```

---

## Transport

If:

```txt id="79zc95"
walk
```

Never suggest:

```txt id="v5msr0"
use public transport
```

---

## Country

Actions may vary by:

```txt id="kqdf9l"
country
```

when appropriate.

---

# 11. Fallback Strategy

If no valid action exists:

Choose:

```txt id="uv2gxu"
Highest Saving Easy Action
```

from any category.

---

# 12. Daily Action Lifecycle

---

## Morning

Generate:

```txt id="jgy3ga"
today_action
```

---

## During Day

User may:

```txt id="jgy3gb"
complete
```

or

```txt id="jgy3gc"
skip
```

---

## Midnight

Action expires.

New action generated next day.

---

# 13. Completion Rules

Action counts as complete only if:

```txt id="5jphul"
User presses Done
```

No automatic completion.

---

# 14. Skip Rules

Users may skip.

Skipping:

* does not increase streak
* does not reduce streak immediately

This prevents punishment.

---

# 15. Streak Logic

A streak day requires:

```txt id="rmdhrz"
Activity Logged

AND

Action Completed
```

Both required.

---

## Example

Day 1:

```txt id="p4q4me"
Logged

Completed

✓
```

Streak:

```txt id="8q57qa"
1
```

---

Day 2:

```txt id="0hd1v0"
Logged

Completed

✓
```

Streak:

```txt id="sw5syd"
2
```

---

Day 3:

```txt id="6lm7yd"
Logged

Skipped
```

Streak:

unchanged

---

Day 4:

```txt id="mw7e8t"
Logged

Completed
```

Streak resumes.

---

# 16. Streak Grace System

Users receive:

```txt id="4mzcw4"
1 grace day
```

every:

```txt id="jlwmh2"
14 successful days
```

Purpose:

Prevent accidental streak loss.

---

# 17. Milestones

Celebrate:

| Milestone | Reward |
| --------- | ------ |
| 3 Days    | Badge  |
| 7 Days    | Badge  |
| 14 Days   | Badge  |
| 30 Days   | Badge  |
| 60 Days   | Badge  |
| 100 Days  | Badge  |

No monetary rewards.

---

# 18. CO₂ Saved Calculation

Every completed action adds:

```txt id="p7g9ik"
action.co2SavingKg
```

to:

```txt id="7yx3fi"
totalCo2SavedKg
```

---

Example:

```txt id="3awth0"
Action = 1.8kg

Completed

↓

Savings += 1.8
```

---

# 19. Habit Score

Additional metric.

Formula:

```txt id="w15jcz"
(streak × 2)

+

(actions completed)

+

(co2 saved)
```

Rounded integer.

Used for motivation only.

---

# 20. Positive Reinforcement

After completion:

Display:

```txt id="lmz7l7"
Nice work.
You avoided approximately 1.8kg of CO₂ today.
```

---

Never display:

```txt id="js2rfd"
You should have done better.
```

---

# 21. Anti-Gaming Rules

---

## Rule 1

Only one action completion per day.

---

## Rule 2

Cannot repeatedly complete same action.

Cooldown:

```txt id="vqng33"
7 days
```

---

## Rule 3

Future dates prohibited.

---

## Rule 4

Duplicate submissions rejected.

---

# 22. Analytics

Track:

* completion rate
* skip rate
* category effectiveness
* streak length
* average savings

Used for dashboard insights.

---

# 23. Unit Test Requirements

Test:

### Selection

* highest category selected
* fallback works

### Streaks

* increment
* pause
* grace day

### Savings

* accumulation
* duplicate prevention

Coverage:

```txt id="53grxt"
100%
```

---

# 24. Performance Requirements

Action selection:

```txt id="dgzv43"
< 10ms
```

---

Streak update:

```txt id="7kmv3t"
< 2ms
```

---

Savings calculation:

```txt id="9xg4v7"
< 1ms
```

---

# 25. Forbidden

Do not:

* call AI
* call external APIs
* shame users
* create impossible actions
* require purchases

---

# 26. Definition of Done

The Habit Engine is complete when:

* 40+ actions exist
* personalization works
* streak logic works
* grace system works
* milestones work
* tests pass
* coverage reaches 100%

---

End of Document.
