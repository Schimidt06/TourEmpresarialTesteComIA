import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const explainSector = async (sectorName: string, sectorContext: string): Promise<string> => {
  if (!apiKey) {
    return "Insights de IA indisponíveis no momento (Chave de API ausente).";
  }

  try {
    const prompt = `
      Você é um guia industrial especialista da Nexus Industries, uma empresa de manufatura de alta tecnologia.
      Forneça uma explicação concisa, profissional e impressionante (máximo de 80 palavras) em Português do Brasil sobre o departamento: ${sectorName}.
      Contexto sobre este setor específico: ${sectorContext}.
      Foque em inovação, eficiência e tecnologia do futuro.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Informação não disponível no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Nossos sistemas de IA estão recalibrando. Por favor, tente novamente em instantes.";
  }
};