export const AIRLINES = [
  'Air India',
  'IndiGo',
  'SpiceJet',
  'Vistara',
  'Go First',
  'AirAsia India'
] as const;

export type Airline = typeof AIRLINES[number];