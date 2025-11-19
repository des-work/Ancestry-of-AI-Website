export enum TagType {
  Hardware = 'Hardware',
  Software = 'Software',
  Mathematics = 'Mathematics',
  Visionary = 'Visionary',
  Infrastructure = 'Infrastructure'
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
}

export interface GeminiResponse {
  figures: Figure[];
}