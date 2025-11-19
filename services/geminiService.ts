import { GoogleGenAI, Type } from "@google/genai";
import { Figure } from "../types";

export const fetchHistoryData = async (): Promise<Figure[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Generate a curated list of 10 significant historical figures in the field of computing.
    
    CRITERIA:
    1. Focus STRICTLY on women, racial minorities, and contributors from outside the United States.
    2. NARRATIVE FOCUS: Explain how their specific contribution laid the groundwork for Modern Artificial Intelligence (AI), Algorithms, Big Data, or Neural Networks.
    3. Sort chronologically from earliest to most recent.
    4. Include a mix of known and obscure figures.
    5. Include a famous or representative quote.

    Output must be a JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a historical documentarian specializing in the genealogy of technology. You focus on how underrepresented innovators built the foundations of AI.",
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
                  year: { type: Type.INTEGER, description: "The primary year of their major contribution" },
                  country: { type: Type.STRING },
                  contribution: { type: Type.STRING, description: "Short summary title of contribution" },
                  detailedDescription: { type: Type.STRING, description: "2-3 sentences explaining their life and work" },
                  aiConnection: { type: Type.STRING, description: "Explicit explanation of how this work enabled modern AI" },
                  quote: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["id", "name", "year", "country", "contribution", "detailedDescription", "aiConnection", "quote", "tags"],
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
    return parsed.figures;
  } catch (error) {
    console.error("Error fetching history data:", error);
    throw error;
  }
};