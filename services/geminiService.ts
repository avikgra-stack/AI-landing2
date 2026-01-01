
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

const SYSTEM_INSTRUCTION = `Вы — ведущий эксперт по внедрению ИИ-решений (AI Strategy Consultant). 

ПРАВИЛА ОТВЕТА:
1. Если пользователь описывает нишу: предложите 3 конкретных сценария и оцените ROI.
2. Если вопрос касается деталей (безопасность, цена, сроки): дайте краткий ответ и обязательно укажите 'suggestion' для перехода к нужному разделу.

ДОСТУПНЫЕ РАЗДЕЛЫ ДЛЯ SUGGESTION:
- 'solutions': автоматизация, аналитика.
- 'faq': безопасность, сроки, стоимость.
- 'about': преимущества.
- 'results': контакты.

ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМАТЕ JSON.`;

export async function getAIStrategy(userPrompt: string): Promise<AIResponse> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { 
              type: Type.STRING, 
              description: 'Основной текст ответа в формате Markdown.' 
            },
            suggestion: {
              type: Type.OBJECT,
              properties: {
                sectionId: { type: Type.STRING },
                reason: { type: Type.STRING, description: 'Текст на кнопке действия.' }
              },
              required: ['sectionId', 'reason']
            }
          },
          required: ['text']
        }
      },
    });

    return JSON.parse(response.text) as AIResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      text: "Произошла ошибка при формировании стратегии. Пожалуйста, попробуйте еще раз." 
    };
  }
}
