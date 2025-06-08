import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const ai = {
  model: genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }),
};
