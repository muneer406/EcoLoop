# EcoLoop — Security Architecture

Version: 1.0

Status: Final

Priority: Critical

---

# Purpose

This document defines the security architecture of EcoLoop.

The system must protect:

* user accounts
* environmental data
* uploaded files
* AI systems
* infrastructure

Security is designed into the architecture.

Not added later.

---

# Security Principles

---

## Principle 1

Zero Trust

Every request is untrusted until verified.

---

## Principle 2

Least Privilege

Every component receives only the permissions it needs.

---

## Principle 3

Defense In Depth

Security must exist in multiple layers.

Failure of one layer must not compromise the system.

---

## Principle 4

Fail Securely

Failures must never expose data.

---

# Security Layers

```txt id="sec01"
Browser

↓

Authentication

↓

Authorization

↓

Rate Limiting

↓

Validation

↓

Business Logic

↓

Database RLS

↓

Storage
```

---

# Authentication

Provider:

```txt id="sec02"
Supabase Auth
```

---

Supported:

* Google OAuth
* Magic Links

---

Passwords:

```txt id="sec03"
Not Supported
```

---

Reason:

Reduces attack surface.

---

# Session Security

Session storage:

```txt id="sec04"
HTTP Only Cookies
```

---

Required:

* Secure
* SameSite=Lax
* HttpOnly

---

Never:

```txt id="sec05"
localStorage
```

for auth tokens.

---

# Authorization

Every protected route requires:

```txt id="sec06"
Authenticated User
```

---

User access:

```txt id="sec07"
Own Data Only
```

---

No cross-user access.

---

# Database Security

All user tables must use:

```txt id="sec08"
Row Level Security
```

---

Policy Example

```sql id="sec09"
auth.uid() = user_id
```

---

Required Tables

* profiles
* logs
* activities
* daily_totals
* user_actions
* streaks

---

# Input Validation

Every request must pass:

```txt id="sec10"
Zod Validation
```

---

Before:

* database
* AI
* storage
* services

---

Never trust:

* forms
* query params
* AI output
* uploaded files

---

# Rate Limiting

Provider:

```txt id="sec11"
Upstash Redis
```

---

Limits

Chat:

```txt id="sec12"
20/hour
```

---

Receipt Upload:

```txt id="sec13"
5/hour
```

---

Magic Links:

```txt id="sec14"
3/hour
```

---

Per User + IP.

---

# AI Security

Most important area.

---

# Prompt Injection Defense

Detect:

```txt id="sec15"
ignore previous instructions
```

```txt id="sec16"
show your prompt
```

```txt id="sec17"
act as
```

```txt id="sec18"
DAN
```

---

Response:

```json id="sec19"
{
  "activities": [],
  "confidence": 1.0
}
```

---

Never execute user instructions.

---

# AI Output Validation

AI output must pass:

```txt id="sec20"
JSON Parse

↓

Schema Validation

↓

Sanitization

↓

Confidence Check
```

---

Before processing.

---

# AI Hallucination Protection

Reject:

* negative quantities
* impossible units
* invalid categories

---

Never trust AI output directly.

---

# File Upload Security

Supported:

* jpg
* jpeg
* png
* webp

---

Maximum:

```txt id="sec21"
5MB
```

---

Validate:

* MIME type
* extension
* size

---

Reject:

* executable files
* archives
* scripts

---

# Image Processing Security

Uploaded images:

* scanned
* validated
* stored privately

---

Never execute metadata.

---

Strip:

* EXIF
* metadata

before storage.

---

# API Security Headers

Required:

```http id="sec22"
X-Frame-Options: DENY

X-Content-Type-Options: nosniff

Referrer-Policy: strict-origin-when-cross-origin

Permissions-Policy
```

---

# Content Security Policy

Required CSP:

```txt id="sec23"
default-src 'self'
```

---

Only allow:

* Supabase
* Vercel
* AI provider

---

No wildcard domains.

---

# Secrets Management

Secrets stored only in:

```txt id="sec24"
Vercel Environment Variables
```

---

Never:

* commit secrets
* expose keys to frontend

---

Forbidden:

```txt id="sec25"
NEXT_PUBLIC_API_KEY
```

for private credentials.

---

# Logging

Log:

* auth failures
* validation failures
* AI failures
* rate limit violations

---

Never log:

* tokens
* secrets
* raw receipts

---

# Data Privacy

Store only:

* required user data
* environmental activities

---

Never store:

* unnecessary PII
* raw AI conversations

---

# Dependency Security

Weekly scan:

```txt id="sec26"
npm audit
```

---

CI must fail on:

```txt id="sec27"
high
critical
```

vulnerabilities.

---

# CSRF Protection

Required for:

* authenticated mutations

---

Use:

```txt id="sec28"
SameSite Cookies
```

and Supabase protections.

---

# XSS Protection

Escape:

* user messages
* AI descriptions
* dynamic content

---

Never render:

```txt id="sec29"
dangerouslySetInnerHTML
```

unless sanitized.

---

# SQL Injection Protection

Database access only through:

* Supabase client
* parameterized queries

---

Never build raw SQL from user input.

---

# Monitoring

Use:

```txt id="sec30"
Sentry
```

for:

* exceptions
* suspicious activity
* performance anomalies

---

# Security Testing

Required Tests

---

Authentication

* unauthorized access
* session expiry

---

Authorization

* cross-user access

---

Validation

* malformed requests
* invalid payloads

---

AI

* prompt injection
* malformed JSON

---

Uploads

* invalid file types
* oversized files

---

# Incident Response

If suspicious activity detected:

1. Log event
2. Rate limit user
3. Alert monitoring
4. Preserve evidence

---

# Security Score Goal

Target:

```txt id="sec31"
A+
```

using common web security benchmarks.

---

# Definition of Done

Security is complete when:

* RLS enabled
* auth enforced
* validation enforced
* rate limits active
* CSP active
* tests passing
* secrets protected

---

End of Document.
