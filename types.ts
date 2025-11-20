export enum TagType {
  Hardware = 'Hardware',
  Software = 'Software',
  Mathematics = 'Mathematics',
  Visionary = 'Visionary',
  Infrastructure = 'Infrastructure'
}

export interface Era {
  title: string;
  description: string;
  advancement: string; // What this era allowed humanity to do
}

export interface Figure {
  id: string;
  name: string;
  year: number;
  country: string;
  contribution: string;
  detailedDescription: string;
  aiConnection: string;
  quote: string;
  tags: string[];
  formula: string;
  artifactName: string;
  era: Era; // New field for historical context
  speechKeywords: string; // Keywords to find a video of them speaking
  sources: string[]; // List of citations/references
}

export interface GeminiResponse {
  figures: Figure[];
}