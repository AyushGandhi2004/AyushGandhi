export type FontPairing = 'inter-instrument' | 'inter-only' | 'geist';

export const activeFontPairing: FontPairing = 'inter-instrument';

export const fontPairings = {
  'inter-instrument': {
    heading: "'Montserrat', sans-serif",
    body: "'Montserrat', sans-serif",
    serif: "'Montserrat', serif",
    mono: "'JetBrains Mono', monospace",
  },
  'inter-only': {
    heading: "'Montserrat', sans-serif",
    body: "'Montserrat', sans-serif",
    serif: "'Montserrat', serif",
    mono: "'JetBrains Mono', monospace",
  },
  'geist': {
    heading: "'Montserrat', sans-serif",
    body: "'Montserrat', sans-serif",
    serif: "'Montserrat', serif",
    mono: "'Geist Mono', monospace",
  },
} as const;
