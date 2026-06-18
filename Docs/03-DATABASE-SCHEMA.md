# EcoLoop — Database Schema Document

Version: 2.0
Status: Final
Priority: Critical
Last Updated: June 2026

---

# 1. Purpose

This document defines the complete database architecture for EcoLoop.

It specifies:

* tables
* relationships
* constraints
* indexes
* row-level security
* performance considerations

This schema is the single source of truth for all data storage.

---

# 2. Database Principles

---

## Principle 1

User data must always be isolated.

Every user-owned table must enforce:

```sql
auth.uid() = user_id
```

through Row Level Security.

---

## Principle 2

Avoid duplicated data.

Store data once.

Aggregate only when performance benefits justify it.

---

## Principle 3

Optimize reads.

Dashboard queries should be:

```txt
< 200ms
```

for typical users.

---

## Principle 4

Every table must have:

```sql
created_at
updated_at
```

unless explicitly exempt.

---

# 3. Schema Overview

```txt
auth.users
    │
    ▼
profiles
    │
    ├────────────┐
    ▼            ▼
logs        user_actions
    │            │
    ▼            ▼
activities   micro_actions

    │
    ▼

daily_totals

    │
    ▼

streaks


global tables

emission_factors
micro_actions
```

---

# 4. Enums

---

## Activity Category

```sql
CREATE TYPE activity_category AS ENUM (
  'transport',
  'food',
  'energy',
  'shopping'
);
```

---

## Diet Type

```sql
CREATE TYPE diet_type AS ENUM (
  'vegan',
  'vegetarian',
  'pescatarian',
  'omnivore',
  'heavy_meat'
);
```

---

## Transport Type

```sql
CREATE TYPE transport_type AS ENUM (
  'car',
  'public_transport',
  'bike',
  'walk',
  'mixed'
);
```

---

## Action Status

```sql
CREATE TYPE action_status AS ENUM (
  'done',
  'skipped'
);
```

---

# 5. profiles

Stores onboarding data.

---

## Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  display_name TEXT NOT NULL,

  country TEXT NOT NULL,

  transport_mode transport_type NOT NULL,

  diet diet_type NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Indexes

```sql
CREATE INDEX idx_profiles_country
ON profiles(country);
```

---

# 6. logs

One user message.

Example:

```txt
I drove 12km and ate a burger.
```

---

## Table

```sql
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  message TEXT NOT NULL,

  total_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Indexes

```sql
CREATE INDEX idx_logs_user
ON logs(user_id);

CREATE INDEX idx_logs_user_created
ON logs(user_id, created_at DESC);
```

---

# 7. activities

Stores parsed activities.

---

## Example

```json
{
  "type":"transport",
  "mode":"car_petrol",
  "quantity":12,
  "unit":"km"
}
```

---

## Table

```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  log_id UUID NOT NULL
    REFERENCES logs(id)
    ON DELETE CASCADE,

  user_id UUID NOT NULL
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  category activity_category NOT NULL,

  mode TEXT NOT NULL,

  quantity NUMERIC(10,4) NOT NULL,

  unit TEXT NOT NULL,

  co2_kg NUMERIC(10,4) NOT NULL,

  description TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Indexes

```sql
CREATE INDEX idx_activities_user
ON activities(user_id);

CREATE INDEX idx_activities_category
ON activities(user_id, category);

CREATE INDEX idx_activities_created
ON activities(user_id, created_at DESC);
```

---

# 8. daily_totals

Pre-aggregated dashboard data.

Updated whenever:

* activity added
* activity deleted
* action completed

---

## Table

```sql
CREATE TABLE daily_totals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  date DATE NOT NULL,

  total_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,

  transport_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,

  food_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,

  energy_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,

  shopping_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,

  co2_saved_kg NUMERIC(10,4) NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id, date)
);
```

---

## Indexes

```sql
CREATE INDEX idx_daily_totals_user_date
ON daily_totals(user_id, date DESC);
```

---

# 9. micro_actions

Global action pool.

Seeded during deployment.

---

## Table

```sql
CREATE TABLE micro_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  category activity_category NOT NULL,

  title TEXT NOT NULL,

  description TEXT NOT NULL,

  co2_saving_kg NUMERIC(10,4) NOT NULL,

  equivalence TEXT NOT NULL,

  difficulty TEXT NOT NULL,

  estimated_minutes INTEGER NOT NULL,

  active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Example

```txt
Swap one beef meal for chicken tonight.
```

---

# 10. user_actions

Tracks user decisions.

---

## Table

```sql
CREATE TABLE user_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  action_id UUID NOT NULL
    REFERENCES micro_actions(id)
    ON DELETE CASCADE,

  status action_status NOT NULL,

  co2_saved_kg NUMERIC(10,4) NOT NULL DEFAULT 0,

  action_date DATE NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Indexes

```sql
CREATE INDEX idx_user_actions_user
ON user_actions(user_id);

CREATE INDEX idx_user_actions_date
ON user_actions(user_id, action_date DESC);
```

---

# 11. streaks

Stores streak state.

One row per user.

---

## Table

```sql
CREATE TABLE streaks (
  user_id UUID PRIMARY KEY
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  current_streak INTEGER NOT NULL DEFAULT 0,

  longest_streak INTEGER NOT NULL DEFAULT 0,

  total_co2_saved_kg NUMERIC(10,4) NOT NULL DEFAULT 0,

  last_completed_date DATE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# 12. emission_factors

Global lookup table.

Read-only.

---

## Table

```sql
CREATE TABLE emission_factors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  category activity_category NOT NULL,

  mode TEXT NOT NULL,

  country TEXT NOT NULL DEFAULT 'global',

  unit TEXT NOT NULL,

  factor NUMERIC(12,6) NOT NULL,

  source TEXT NOT NULL,

  active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Example

```txt
car_petrol

0.192 kg CO₂ / km
```

---

# 13. Relationships

```txt
User
 │
 ▼

Profile

User
 │
 ▼

Logs
 │
 ▼

Activities

User
 │
 ▼

Daily Totals

User
 │
 ▼

User Actions
 │
 ▼

Micro Actions

User
 │
 ▼

Streaks
```

---

# 14. Row Level Security

Enable RLS everywhere.

---

## profiles

```sql
USING (auth.uid() = id)
```

---

## logs

```sql
USING (auth.uid() = user_id)
```

---

## activities

```sql
USING (auth.uid() = user_id)
```

---

## daily_totals

```sql
USING (auth.uid() = user_id)
```

---

## user_actions

```sql
USING (auth.uid() = user_id)
```

---

## streaks

```sql
USING (auth.uid() = user_id)
```

---

## micro_actions

Read only.

```sql
USING (active = true)
```

---

## emission_factors

Read only.

```sql
USING (active = true)
```

---

# 15. Database Triggers

---

## Update Timestamp Trigger

```sql
updated_at = NOW()
```

on update.

Applied to:

* profiles
* logs
* daily_totals
* streaks

---

## Daily Totals Trigger

Runs after:

```txt
activity insert
activity update
activity delete
```

Recalculates:

```txt
daily_totals
```

---

# 16. Performance Strategy

Dashboard queries must never scan:

```txt
activities
```

for historical views.

Use:

```txt
daily_totals
```

instead.

---

## Cached Reads

Read mostly:

* daily_totals
* profile
* streaks

Rarely:

* logs
* activities

---

# 17. Seed Data

Seed:

---

## Micro Actions

Minimum:

```txt
5 actions per category
```

Required:

```txt
20 total actions minimum
```

---

## Emission Factors

Include:

```txt
transport
food
energy
shopping
```

for:

```txt
global
US
UK
India
Germany
```

at minimum.

---

# 18. Migration Order

```txt
Enums

↓

Profiles

↓

Logs

↓

Activities

↓

Daily Totals

↓

Micro Actions

↓

User Actions

↓

Streaks

↓

Emission Factors

↓

Indexes

↓

RLS

↓

Triggers

↓

Seed Data
```

---

# 19. Database Rules

Forbidden:

* direct user table access without RLS
* duplicate emission storage
* storing secrets
* storing raw AI responses

Allowed:

* structured activities
* calculated emissions
* aggregate statistics

---

End of Document.
