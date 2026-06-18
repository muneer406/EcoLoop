# EcoLoop — API Routes Document

Version: 2.0
Status: Final
Priority: Critical
Last Updated: June 2026

---

# 1. Purpose

This document defines every API route exposed by EcoLoop.

The API layer is responsible for:

* validation
* authentication
* authorization
* rate limiting
* orchestration

The API layer is NOT responsible for:

* CO₂ calculations
* habit selection
* forecasting

Those belong to services.

---

# 2. API Principles

---

## Principle 1

All routes use:

```txt id="9g0mqj"
tRPC
```

No REST endpoints.

---

## Principle 2

All inputs validated with:

```txt id="x2e8ht"
Zod
```

---

## Principle 3

All protected routes require authentication.

---

## Principle 4

All business logic delegated to services.

---

# 3. Router Structure

```txt id="t9nfxm"
root

├── auth
├── onboarding
├── profile
├── chat
├── dashboard
├── habit
├── receipt
├── analytics
└── health
```

---

# 4. Common Types

---

## Error Response

```ts id="gvjlwm"
type ApiError = {
  code: string;
  message: string;
};
```

---

## Success Response

```ts id="kw3s1z"
type ApiSuccess<T> = {
  success: true;
  data: T;
};
```

---

# 5. Auth Router

Namespace:

```txt id="fb9z5n"
auth.*
```

---

## auth.getSession

### Type

Query

---

### Input

```ts id="i3l9i1"
void
```

---

### Output

```ts id="lmbqfx"
{
  authenticated: boolean;

  user?: {
    id: string;
    email: string;
  };
}
```

---

### Auth

Not required.

---

## auth.signInGoogle

### Type

Mutation

---

### Input

```ts id="psh7o8"
void
```

---

### Output

```ts id="n2rjlwm"
{
  redirectUrl: string;
}
```

---

### Auth

Not required.

---

## auth.signInMagicLink

### Type

Mutation

---

### Input

```ts id="kjjlwm"
{
  email: string;
}
```

---

### Output

```ts id="jlwm01"
{
  success: true;
}
```

---

### Rate Limit

```txt id="jlwm02"
3/hour
```

per email.

---

## auth.signOut

### Type

Mutation

---

### Input

```ts id="jlwm03"
void
```

---

### Output

```ts id="jlwm04"
{
  success: true;
}
```

---

# 6. Onboarding Router

Namespace:

```txt id="jlwm05"
onboarding.*
```

---

## onboarding.complete

### Type

Mutation

---

### Input

```ts id="jlwm06"
{
  country: string;

  transportMode:
    | "car"
    | "public_transport"
    | "bike"
    | "walk"
    | "mixed";

  diet:
    | "vegan"
    | "vegetarian"
    | "pescatarian"
    | "omnivore"
    | "heavy_meat";
}
```

---

### Output

```ts id="jlwm07"
{
  success: true;
}
```

---

### Auth

Required.

---

# 7. Profile Router

Namespace:

```txt id="jlwm08"
profile.*
```

---

## profile.get

### Type

Query

---

### Output

```ts id="jlwm09"
{
  displayName: string;

  country: string;

  transportMode: string;

  diet: string;
}
```

---

### Cache

```txt id="jlwm10"
15 minutes
```

---

## profile.update

### Type

Mutation

---

### Input

```ts id="jlwm11"
{
  displayName?: string;

  country?: string;

  transportMode?: string;

  diet?: string;
}
```

---

### Output

```ts id="jlwm12"
{
  success: true;
}
```

---

# 8. Chat Router

Namespace:

```txt id="jlwm13"
chat.*
```

---

## chat.sendMessage

Most important route.

---

### Type

Mutation

---

### Input

```ts id="jlwm14"
{
  message: string;
}
```

---

### Validation

```txt id="jlwm15"
1-500 characters
```

---

### Auth

Required.

---

### Rate Limit

```txt id="jlwm16"
20/hour
```

---

### Flow

```txt id="jlwm17"
Validate

↓

Rate Limit

↓

AI Parser

↓

CO₂ Engine

↓

Habit Engine

↓

Persist

↓

Return
```

---

### Output

```ts id="jlwm18"
{
  activities: CalculatedActivity[];

  totalCo2Kg: number;

  dailyAction: DailyAction;

  streak: number;
}
```

---

## chat.history

### Type

Query

---

### Input

```ts id="jlwm19"
{
  limit?: number;

  cursor?: string;
}
```

---

### Output

```ts id="jlwm20"
{
  items: Log[];

  nextCursor?: string;
}
```

---

### Pagination

Cursor based.

---

## chat.deleteLog

### Type

Mutation

---

### Input

```ts id="jlwm21"
{
  logId: string;
}
```

---

### Output

```ts id="jlwm22"
{
  success: true;
}
```

---

# 9. Dashboard Router

Namespace:

```txt id="jlwm23"
dashboard.*
```

---

## dashboard.summary

### Type

Query

---

### Output

```ts id="jlwm24"
{
  totalCo2Kg: number;

  averageDailyKg: number;

  totalSavedKg: number;

  streak: number;
}
```

---

### Cache

```txt id="jlwm25"
5 minutes
```

---

## dashboard.weekly

### Type

Query

---

### Input

```ts id="jlwm26"
{
  days?: number;
}
```

---

### Output

```ts id="jlwm27"
{
  points: DailyPoint[];
}
```

---

## dashboard.breakdown

### Type

Query

---

### Output

```ts id="jlwm28"
{
  transport: number;

  food: number;

  energy: number;

  shopping: number;
}
```

---

## dashboard.forecast

### Type

Query

---

### Output

```ts id="jlwm29"
{
  projectedAnnualKg: number;

  globalComparison: number;

  parisComparison: number;
}
```

---

## dashboard.rank

### Type

Query

---

### Output

```ts id="jlwm30"
{
  percentile: number;
}
```

---

# 10. Habit Router

Namespace:

```txt id="jlwm31"
habit.*
```

---

## habit.today

### Type

Query

---

### Output

```ts id="jlwm32"
{
  action: DailyAction;
}
```

---

## habit.complete

### Type

Mutation

---

### Input

```ts id="jlwm33"
{
  actionId: string;
}
```

---

### Output

```ts id="jlwm34"
{
  streak: number;

  totalSavedKg: number;
}
```

---

### Validation

Action must belong to today.

---

## habit.skip

### Type

Mutation

---

### Input

```ts id="jlwm35"
{
  actionId: string;
}
```

---

### Output

```ts id="jlwm36"
{
  success: true;
}
```

---

## habit.history

### Type

Query

---

### Output

```ts id="jlwm37"
{
  completed: UserAction[];

  skipped: UserAction[];
}
```

---

# 11. Receipt Router

Namespace:

```txt id="jlwm38"
receipt.*
```

---

## receipt.scan

### Type

Mutation

---

### Auth

Required.

---

### Rate Limit

```txt id="jlwm39"
5/hour
```

---

### Input

```ts id="jlwm40"
{
  imageUrl: string;
}
```

---

### Supported Types

```txt id="jlwm41"
jpg
jpeg
png
webp
```

---

### Max Size

```txt id="jlwm42"
5MB
```

---

### Flow

```txt id="jlwm43"
Upload

↓

Validation

↓

AI Receipt Parser

↓

CO₂ Engine

↓

Persist

↓

Return
```

---

### Output

```ts id="jlwm44"
{
  extractedItems: Activity[];

  totalCo2Kg: number;
}
```

---

# 12. Analytics Router

Namespace:

```txt id="jlwm45"
analytics.*
```

---

## analytics.stats

### Type

Query

---

### Output

```ts id="jlwm46"
{
  totalLogs: number;

  totalActivities: number;

  completionRate: number;

  averageDailyKg: number;
}
```

---

## analytics.export

### Type

Mutation

---

### Output

```ts id="jlwm47"
{
  downloadUrl: string;
}
```

---

### Format

```txt id="jlwm48"
CSV
```

---

# 13. Health Router

Namespace:

```txt id="jlwm49"
health.*
```

---

## health.status

### Type

Query

---

### Output

```ts id="jlwm50"
{
  status: "ok";

  timestamp: string;
}
```

---

### Auth

Not required.

---

Used for:

* uptime monitoring
* deployment verification

---

# 14. Middleware Stack

Every protected route:

```txt id="jlwm51"
Authentication

↓

Rate Limit

↓

Input Validation

↓

Business Logic

↓

Response Validation
```

---

# 15. Error Codes

| Code             | Meaning            |
| ---------------- | ------------------ |
| UNAUTHORIZED     | User not logged in |
| FORBIDDEN        | Not permitted      |
| VALIDATION_ERROR | Invalid input      |
| RATE_LIMITED     | Too many requests  |
| LOW_CONFIDENCE   | AI uncertain       |
| NOT_FOUND        | Resource missing   |
| INTERNAL_ERROR   | Unexpected failure |

---

# 16. Response Rules

All successful responses:

```ts id="jlwm52"
{
  success: true
}
```

or contain:

```ts id="jlwm53"
{
  data: ...
}
```

---

All failures:

```ts id="jlwm54"
{
  code: string;
  message: string;
}
```

---

# 17. Query Invalidation

After:

```txt id="jlwm55"
chat.sendMessage
```

invalidate:

```txt id="jlwm56"
dashboard.*

habit.today
```

---

After:

```txt id="jlwm57"
habit.complete
```

invalidate:

```txt id="jlwm58"
dashboard.*

habit.*
```

---

# 18. Performance Targets

Route latency:

```txt id="jlwm59"
< 300ms
```

excluding AI.

---

Dashboard:

```txt id="jlwm60"
< 150ms
```

---

Profile:

```txt id="jlwm61"
< 50ms
```

---

# 19. Testing Requirements

Every route must have:

* input validation test
* auth test
* success test
* failure test

Coverage:

```txt id="jlwm62"
95%+
```

---

# 20. Definition of Done

API layer is complete when:

* routes implemented
* validation implemented
* auth implemented
* rate limits implemented
* tests passing
* types generated

---

End of Document.
