# EcoLoop — Data Dictionary

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document defines every data entity used in EcoLoop.

It is the single source of truth for:

* database fields
* business meaning
* validation rules
* ownership
* relationships
* derived metrics

If implementation conflicts with this document:

```txt id="dd01"
This document wins.
```

---

# Naming Conventions

---

## Tables

Use:

```txt id="dd02"
snake_case
```

Example:

```txt id="dd03"
daily_totals
user_actions
```

---

## Columns

Use:

```txt id="dd04"
snake_case
```

---

## IDs

Use:

```txt id="dd05"
UUID
```

for all primary keys.

---

## Dates

Use:

```txt id="dd06"
TIMESTAMPTZ
```

unless date-only is required.

---

# Entity: profiles

Purpose:

Stores onboarding and user preferences.

---

## Ownership

User-owned.

---

## Primary Key

```txt id="dd07"
id
```

---

## Fields

### id

Type:

```txt id="dd08"
UUID
```

Meaning:

User identifier.

---

### display_name

Type:

```txt id="dd09"
TEXT
```

Required:

Yes

---

### country

Type:

```txt id="dd10"
TEXT
```

Example:

```txt id="dd11"
India
Germany
United States
```

---

### transport_mode

Type:

```txt id="dd12"
transport_type
```

---

### diet

Type:

```txt id="dd13"
diet_type
```

---

### created_at

Type:

```txt id="dd14"
TIMESTAMPTZ
```

---

### updated_at

Type:

```txt id="dd15"
TIMESTAMPTZ
```

---

# Entity: logs

Purpose:

Stores raw user activity submissions.

---

Example:

```txt id="dd16"
I drove 12km and ate a burger.
```

---

## Ownership

User-owned.

---

## Fields

### id

UUID

---

### user_id

Owner.

---

### message

Type:

```txt id="dd17"
TEXT
```

Validation:

```txt id="dd18"
1-500 chars
```

---

### total_co2_kg

Type:

```txt id="dd19"
NUMERIC(10,4)
```

Meaning:

Total emissions generated from all parsed activities.

---

### created_at

Timestamp.

---

# Entity: activities

Purpose:

Stores structured activities extracted from logs.

---

Example:

```json id="dd20"
{
  "category":"transport",
  "mode":"car_petrol",
  "quantity":12,
  "unit":"km"
}
```

---

## Ownership

User-owned.

---

## Fields

### id

UUID

---

### log_id

Parent log.

---

### user_id

Owner.

---

### category

Type:

```txt id="dd21"
activity_category
```

---

Allowed:

```txt id="dd22"
transport
food
energy
shopping
```

---

### mode

Type:

```txt id="dd23"
TEXT
```

Examples:

```txt id="dd24"
car_petrol
beef
ac_hour
smartphone
```

---

### quantity

Type:

```txt id="dd25"
NUMERIC
```

Validation:

```txt id="dd26"
> 0
```

---

### unit

Type:

```txt id="dd27"
TEXT
```

Examples:

```txt id="dd28"
km
kg
hour
item
```

---

### co2_kg

Type:

```txt id="dd29"
NUMERIC
```

Meaning:

Calculated emissions.

Never AI-generated.

---

### description

Type:

```txt id="dd30"
TEXT
```

Optional.

---

# Entity: daily_totals

Purpose:

Pre-aggregated dashboard data.

---

## Ownership

User-owned.

---

## Uniqueness

```txt id="dd31"
user_id + date
```

must be unique.

---

## Fields

### total_co2_kg

Total daily emissions.

---

### transport_co2_kg

Transport contribution.

---

### food_co2_kg

Food contribution.

---

### energy_co2_kg

Energy contribution.

---

### shopping_co2_kg

Shopping contribution.

---

### co2_saved_kg

Savings earned from actions.

---

# Entity: micro_actions

Purpose:

Master action catalog.

---

## Ownership

System-owned.

---

## Fields

### title

Example:

```txt id="dd32"
Replace one beef meal today.
```

---

### description

Detailed guidance.

---

### co2_saving_kg

Estimated saving.

---

### equivalence

Example:

```txt id="dd33"
≈ 14km of driving
```

---

### difficulty

Allowed:

```txt id="dd34"
easy
medium
```

---

### estimated_minutes

Time required.

---

### active

Availability flag.

---

# Entity: user_actions

Purpose:

Tracks user interaction with actions.

---

## Ownership

User-owned.

---

## Fields

### action_id

References:

```txt id="dd35"
micro_actions
```

---

### status

Allowed:

```txt id="dd36"
done
skipped
```

---

### co2_saved_kg

Saved emissions from completed action.

---

### action_date

Date action belongs to.

---

# Entity: streaks

Purpose:

Tracks habit consistency.

---

## Ownership

User-owned.

---

## Fields

### current_streak

Meaning:

Consecutive successful days.

---

### longest_streak

Meaning:

Maximum streak achieved.

---

### total_co2_saved_kg

Lifetime savings.

---

### last_completed_date

Last successful action.

---

# Entity: emission_factors

Purpose:

Lookup table for calculations.

---

## Ownership

System-owned.

---

## Fields

### category

Transport, food, energy, shopping.

---

### mode

Specific activity.

---

### country

Country-specific factor.

---

### factor

Type:

```txt id="dd37"
kg CO₂ per unit
```

---

### source

Example:

```txt id="dd38"
DEFRA
OWID
IEA
```

---

# Enums

---

## activity_category

```txt id="dd39"
transport
food
energy
shopping
```

---

## transport_type

```txt id="dd40"
car
public_transport
bike
walk
mixed
```

---

## diet_type

```txt id="dd41"
vegan
vegetarian
pescatarian
omnivore
heavy_meat
```

---

## action_status

```txt id="dd42"
done
skipped
```

---

# Derived Metrics

These values are not stored directly.

---

## Average Daily Emissions

Formula:

```txt id="dd43"
sum(total_co2_kg)

/

days
```

---

## Annual Forecast

Formula:

```txt id="dd44"
daily_average

×

365
```

---

## Total Savings

Formula:

```txt id="dd45"
sum(user_actions.co2_saved_kg)
```

---

## Completion Rate

Formula:

```txt id="dd46"
completed_actions

/

all_actions
```

---

## Largest Contributor

Formula:

```txt id="dd47"
max(
 transport,
 food,
 energy,
 shopping
)
```

---

# Data Ownership Matrix

| Entity           | Owner  |
| ---------------- | ------ |
| profiles         | User   |
| logs             | User   |
| activities       | User   |
| daily_totals     | User   |
| user_actions     | User   |
| streaks          | User   |
| micro_actions    | System |
| emission_factors | System |

---

# Retention Policy

User data retained until:

```txt id="dd48"
account deletion
```

---

Logs retained:

Indefinitely.

---

System logs:

```txt id="dd49"
30 days
```

---

# Data Validation Rules

Never allow:

* negative emissions
* invalid categories
* missing ownership
* future completion dates

---

# Source of Truth Rules

For calculations:

```txt id="dd50"
activities
```

is source of truth.

---

For dashboards:

```txt id="dd51"
daily_totals
```

is source of truth.

---

For habits:

```txt id="dd52"
user_actions
```

is source of truth.

---

# Definition of Done

Data dictionary is complete when:

* every field documented
* every enum documented
* every relationship documented
* every derived metric documented
* ownership defined

---

End of Document.
