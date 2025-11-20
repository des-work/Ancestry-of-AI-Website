import { GoogleGenAI, Type } from "@google/genai";
import { Figure } from "../types";

export const fetchHistoryData = async (): Promise<Figure[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Generate a curated list of 8 significant historical figures in the field of computing.
    
    CRITERIA:
    1. Focus STRICTLY on women, racial minorities, and contributors from outside the United States.
    2. NARRATIVE FOCUS: Explain how their specific contribution laid the groundwork for Modern Artificial Intelligence (AI), Algorithms, Big Data, or Neural Networks.
    3. HISTORICAL CONTEXT: Group these figures by their "Era" (e.g., "1800s: The Theoretical Foundation", "1940s: The Vacuum Tube Era", "1960s: The Software Revolution").
    4. TECHNICAL DEPTH: Include a specific mathematical formula and artifact.
    5. MEDIA: Include specific search keywords to find a video of them giving a speech or interview.
    6. ACCURACY & CITATION: Provide 2-3 specific, reputable sources (Books, Museums, Academic Journals) that verify this information.
    7. Sort chronologically.

    Output must be a JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a technical historian. You focus on the ancestral lineage of AI. For each figure, provide the specific 'Era' they belong to. IMPORTANT: Provide 'speechKeywords' that would yield the best YouTube result for a video of them speaking. IMPORTANT: Provide a list of real, verifiable 'sources' (e.g., 'IEEE Annals of the History of Computing', 'Computer History Museum: [Page Title]', 'Book Title by Author').",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            figures: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  year: { type: Type.INTEGER },
                  country: { type: Type.STRING },
                  contribution: { type: Type.STRING },
                  detailedDescription: { type: Type.STRING },
                  aiConnection: { type: Type.STRING },
                  quote: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  formula: { type: Type.STRING },
                  artifactName: { type: Type.STRING },
                  speechKeywords: { type: Type.STRING, description: "Keywords to find a video of this person speaking." },
                  sources: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "List of 2-3 reputable sources verifying this entry (e.g. Books, IEEE Journals, Museum records)."
                  },
                  era: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING, description: "Title of the decade/era, e.g., 'The Transistor Revolution'" },
                      description: { type: Type.STRING, description: "2-3 sentences on the state of the world and technology during this time." },
                      advancement: { type: Type.STRING, description: "What major capability did humanity gain in this era? (e.g., 'From calculation to logic', 'Real-time processing')" }
                    },
                    required: ["title", "description", "advancement"]
                  }
                },
                required: ["id", "name", "year", "country", "contribution", "detailedDescription", "aiConnection", "quote", "tags", "formula", "artifactName", "speechKeywords", "sources", "era"],
              },
            },
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data received from Gemini");
    }

    const parsed = JSON.parse(jsonText);
    const figures = parsed.figures || [];
    
    // Explicitly sort by year to guarantee chronological order
    return figures.sort((a: Figure, b: Figure) => a.year - b.year);
  } catch (error) {
    console.error("Error fetching history data:", error);
    throw error;
  }
};