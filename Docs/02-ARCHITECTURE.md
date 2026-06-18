# EcoLoop — System Architecture Document

Version: 2.0
Status: Final
Priority: Critical
Last Updated: June 2026

---

# 1. Purpose

This document defines the complete architecture of EcoLoop.

It serves as the source of truth for:

* system design
* service boundaries
* data flow
* infrastructure
* deployment topology
* engineering decisions

All contributors must follow this architecture.

---

# 2. Architectural Goals

The architecture must maximize:

### Code Quality

* strict typing
* separation of concerns
* modularity

### Security

* user isolation
* validation
* secure authentication

### Efficiency

* minimal AI usage
* cached reads
* optimized queries

### Testability

* deterministic services
* pure business logic

### Accessibility

* accessible UI patterns

### Problem Alignment

* understand
* track
* reduce

---

# 3. Core Architecture Principles

---

## Principle 1

### AI is a Parser

AI is used only for:

* activity extraction
* receipt extraction

AI is never used for:

* calculations
* recommendations
* streaks
* forecasting
* rankings

Everything else is deterministic code.

---

## Principle 2

### Service-Oriented Business Logic

Business logic must live in:

```txt
/server/services
```

Never in:

```txt
/components
/pages
/app
```

---

## Principle 3

### Database Access Through API Layer

Frontend never directly manipulates data.

Flow:

```txt
UI
 ↓
tRPC
 ↓
Service Layer
 ↓
Database
```

---

## Principle 4

### Validation at Every Boundary

All external input must pass through Zod.

Sources:

* user input
* AI output
* file uploads
* URL params
* API requests

---

# 4. High-Level Architecture

```txt
┌─────────────────────┐
│      Browser        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Next.js        │
│   App Router UI     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       tRPC          │
│     API Layer       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Service Layer     │
└──────────┬──────────┘
           │
     ┌─────┼─────┐
     ▼     ▼     ▼
 CO2     Habit   AI
Engine   Engine Parser
     │     │     │
     └──┬──┴──┬──┘
        ▼     ▼
     Supabase
        │
        ▼
    PostgreSQL
```

---

# 5. Technology Stack

## Frontend

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| Next.js 15        | Framework                |
| TypeScript        | Type Safety              |
| Tailwind CSS      | Styling                  |
| shadcn/ui         | Accessible Components    |
| Framer Motion     | Motion System            |
| React Three Fiber | Three.js Integration     |
| Drei              | Three.js Helpers         |
| Recharts          | Analytics Visualizations |
| React Query       | Server State             |
| Zustand           | Client State             |

### Visual Layer

The frontend consists of three layers:

Layer 1:
Standard UI

Layer 2:
Motion Layer

Layer 3:
Immersive Layer (Three.js)

Three.js should be used selectively to create memorable moments rather than as a general UI framework.

---

## Backend

| Technology    | Purpose         |
| ------------- | --------------- |
| tRPC          | API layer       |
| Zod           | Validation      |
| Supabase      | Database + Auth |
| PostgreSQL    | Data storage    |
| Vercel AI SDK | AI integration  |
| Upstash Redis | Rate limiting   |

---

## Infrastructure

| Technology     | Purpose        |
| -------------- | -------------- |
| Vercel         | Hosting        |
| Supabase Cloud | Database       |
| GitHub         | Source control |
| GitHub Actions | CI/CD          |
| Upstash        | Redis          |

---

# 6. Request Flow

---

## Standard Activity Logging

```txt
User submits message

↓

chat.sendMessage()

↓

Input Validation

↓

Rate Limiting

↓

Claude Parser

↓

Activity Validation

↓

CO₂ Engine

↓

Habit Engine

↓

Database Write

↓

Response Returned

↓

Dashboard Refresh
```

---

# 7. AI Flow

AI is called exactly once.

```txt
User Message

↓

Claude

↓

Structured Activities

↓

Zod Validation

↓

CO₂ Engine

↓

Database
```

Example:

```txt
I drove 12km,
ate a beef burger,
used AC for 6 hours
```

Returns:

```json
[
  {
    "type":"transport",
    "mode":"car_petrol",
    "quantity":12,
    "unit":"km"
  }
]
```

No further AI calls occur.

---

# 8. Service Layer

All business logic lives here.

```txt
server/
└── services/
    ├── ai/
    ├── co2/
    ├── habits/
    ├── dashboard/
    ├── auth/
    └── analytics/
```

---

## AI Service

Responsibilities:

* call Claude
* validate response
* sanitize output

Cannot:

* calculate emissions

---

## CO₂ Service

Responsibilities:

* calculate emissions
* equivalences
* forecasts

Must be pure.

---

## Habit Service

Responsibilities:

* choose actions
* update streaks
* milestone logic

Must be deterministic.

---

## Dashboard Service

Responsibilities:

* aggregation
* trends
* comparisons
* rankings

---

# 9. Folder Structure

```txt
src/

├── app/
│
├── components/
│
├── lib/
│
├── hooks/
│
├── stores/
│
├── server/
│   ├── api/
│   ├── services/
│   ├── db/
│   └── validators/
│
├── types/
│
├── constants/
│
├── tests/
│
└── styles/
```

---

# 10. Frontend Architecture

---

## Pages

```txt
/
```

Landing page.

---

```txt
/chat
```

Main experience.

---

```txt
/dashboard
```

Analytics.

---

```txt
/settings
```

Profile management.

---

```txt
/profile
```

Account information.

---

# 11. State Management

---

## React Query

Used for:

* server data
* caching
* synchronization

Examples:

```txt
dashboard
history
profile
habits
```

---

## Zustand

Used for:

* modal state
* chat draft
* UI preferences

Never for server data.

---

# 12. Caching Strategy

---

## Cache

Dashboard:

```txt
5 minutes
```

---

Profile:

```txt
15 minutes
```

---

Static Data:

```txt
24 hours
```

Examples:

* emission factors
* micro-actions

---

# 13. Authentication Flow

```txt
User

↓

Google OAuth

↓

Supabase

↓

Session

↓

Protected Routes
```

Alternative:

```txt
Magic Link
```

Authentication is required for all features except:

* landing page
* login page

---

# 14. Rate Limiting

---

## Chat

```txt
20 requests/hour
```

---

## Receipt Upload

```txt
5 requests/hour
```

---

## Authentication

```txt
10 attempts/hour
```

per IP.

---

# 15. Error Handling

Standardized format:

```ts
{
  code: string;
  message: string;
}
```

Example:

```ts
{
  code: "RATE_LIMIT",
  message: "Please try again later."
}
```

---

# 16. Security Layers

Every request passes through:

```txt
Authentication

↓

Rate Limiting

↓

Input Validation

↓

Business Logic

↓

Database
```

No exceptions.

---

# 17. Observability

Track:

* AI parse failures
* rate limit hits
* API errors
* auth failures
* upload failures

---

## Error Monitoring

Use:

```txt
Sentry
```

for:

* frontend errors
* backend errors
* performance monitoring

---

# 18. Performance Targets

| Metric         | Target  |
| -------------- | ------- |
| FCP            | < 1.5s  |
| TTI            | < 3s    |
| Lighthouse     | ≥ 90    |
| AI Response    | < 3s    |
| Dashboard Load | < 500ms |

---

# 19. Architecture Decisions

---

## Why tRPC

* end-to-end types
* less boilerplate
* safer refactors

---

## Why Supabase

* auth included
* PostgreSQL
* RLS support

---

## Why Deterministic Calculations

* testability
* reliability
* performance

---

## Why Single AI Call

* lower cost
* faster responses
* easier testing

---

# 20. Architecture Rules

The following are forbidden:

* business logic in components
* direct database access from UI
* any types
* multiple AI calls per message
* storing secrets in frontend code

---

# 21. Build Order

Implementation order:

```txt
Database

↓

CO₂ Engine

↓

Habit Engine

↓

AI Integration

↓

API Layer

↓

UI

↓

Testing

↓

Deployment
```

Following this order minimizes rework.

---

End of Document.
