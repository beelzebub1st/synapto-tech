export function extractEmail(text: string) {
  const match = text.match(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  );
  return match?.[0] ?? null;
}

export function extractPhone(text: string) {
  const labeled = text.match(
    /(?:phone|mobile|tel)[:\s]*([+\d][\d\s().-]{6,})/i
  );
  if (labeled?.[1]) return labeled[1].trim();
  const loose = text.match(/\+?\d[\d\s().-]{8,}\d/);
  return loose?.[0]?.trim() ?? null;
}

export function extractPatientLabel(text: string) {
  const match = text.match(
    /(?:patient|applicant|caller)\s*:\s*([^\n\r]+)/i
  );
  return match?.[1]?.trim() ?? null;
}
