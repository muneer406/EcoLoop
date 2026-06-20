const INJECTION_PATTERNS = [
  /ignore\s+(previous|prior|above|all)\s+(instructions?|prompts?|rules?)/i,
  /show\s+(system|your)\s+(prompt|instructions)/i,
  /you\s+are\s+(now|no\s+longer|instead)\s+/i,
  /\bact\s+as\b/i,
  /\bDAN\b/i,
  /jailbreak/i,
  /developer\s+mode/i,
  /bypass/i,
];

export function detectInjection(input: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/<[^>]*>/g, "")
    .slice(0, 2000);
}
