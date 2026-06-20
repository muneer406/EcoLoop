// Equivalence reference values - make CO2 understandable

interface Equivalence {
  label: string;
  factor: number; // kg CO2 per unit
  unit: string;
}

const EQUIVALENCES: Equivalence[] = [
  { label: "km driven in a petrol car", factor: 0.192, unit: "km" },
  { label: "full smartphone charges", factor: 0.008, unit: "charges" },
  { label: "hours of LED bulb usage", factor: 0.01, unit: "hours" },
  { label: "km of electric car driving", factor: 0.053, unit: "km" },
  { label: "km of train travel", factor: 0.041, unit: "km" },
];

export interface EquivalenceResult {
  value: number;
  label: string;
  fullText: string;
}

export function generateEquivalence(co2Kg: number): EquivalenceResult {
  if (co2Kg <= 0) {
    return { value: 0, label: "no impact", fullText: "Negligible impact" };
  }

  // Pick the most understandable equivalence
  // Prefer 1-100 range for readability
  let best: EquivalenceResult | null = null;

  for (const eq of EQUIVALENCES) {
    const value = Math.round((co2Kg / eq.factor) * 10) / 10;
    const formattedValue =
      value >= 100 ? Math.round(value) : Math.round(value * 10) / 10;

    if (formattedValue >= 0.5 && formattedValue <= 500) {
      const fullText = `≈ ${formattedValue} ${eq.label}`;
      if (
        !best ||
        (formattedValue >= 1 && formattedValue <= 100)
      ) {
        best = { value: formattedValue, label: eq.label, fullText };
        break;
      }
    }
  }

  if (!best) {
    best = {
      value: Math.round((co2Kg / 0.192) * 10) / 10,
      label: "km driven in a petrol car",
      fullText: `≈ ${Math.round((co2Kg / 0.192) * 10) / 10} km driven`,
    };
  }

  return best;
}
