
'use server';

import {ai} from '@/ai/genkit';

export interface GeneratePlantDetailsInput {
  photoDataUri: string;
}

export interface GeneratePlantDetailsOutput {
  identification: {
    isPlant: boolean;
    commonName: string;
    latinName: string;
  };
  careTips: string;
  benefits: string;
  placement: string;
  translations: {
    tagalog: {
      commonName: string;
      careTips: string;
      benefits: string;
      placement: string;
    };
  };
}

export async function generatePlantDetails(
  input: GeneratePlantDetailsInput
): Promise<GeneratePlantDetailsOutput> {
  const prompt = `You are an expert botanist. You will identify the plant in the photo and provide detailed information about it.

Your response must be in JSON format and strictly adhere to the output schema.

First, determine if the image provided is a plant. Set the 'isPlant' field in the 'identification' object accordingly.

If it is NOT a plant:
- Set 'identification.isPlant' to false.
- Set 'identification.commonName' to "Not a plant".
- Set 'identification.latinName' to "Not applicable".
- Set 'careTips', 'benefits', and 'placement' to "Not applicable".
- In 'translations.tagalog':
    - Set 'commonName' to "Hindi halaman".
    - Set 'careTips', 'benefits', and 'placement' to "Hindi angkop".

If it IS a plant:
- Set 'identification.isPlant' to true.
- Proceed to identify it and provide all requested English details:
    - 'identification.commonName': The plant's common name.
    - 'identification.latinName': The plant's Latin name.
    - 'careTips': Detailed care tips.
    - 'benefits': Its benefits (e.g., air purification, medicinal uses, aesthetic appeal).
    - 'placement': Whether it is better suited for indoor or outdoor placement, including any specific conditions (e.g., "Indoor, bright indirect light", "Outdoor, full sun").
- Additionally, translate the common name, care tips, benefits, and placement information into Tagalog/Filipino. Provide these translations in the 'translations.tagalog' object.

Return only valid JSON that matches this exact structure:
{
  "identification": {
    "isPlant": boolean,
    "commonName": "string",
    "latinName": "string"
  },
  "careTips": "string",
  "benefits": "string",
  "placement": "string",
  "translations": {
    "tagalog": {
      "commonName": "string",
      "careTips": "string",
      "benefits": "string",
      "placement": "string"
    }
  }
}`;

  try {
    const base64Data = input.photoDataUri.split(',')[1];
    const mimeType = input.photoDataUri.split(';')[0].split(':')[1];

    const result = await ai.model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    return JSON.parse(jsonMatch[0]) as GeneratePlantDetailsOutput;
  } catch (error) {
    console.error('Error generating plant details:', error);
    return {
      identification: {
        isPlant: false,
        commonName: "Error identifying plant",
        latinName: "Not applicable"
      },
      careTips: "Unable to provide care tips due to an error.",
      benefits: "Unable to provide benefits due to an error.",
      placement: "Unable to provide placement information due to an error.",
      translations: {
        tagalog: {
          commonName: "Hindi ma-identify ang halaman",
          careTips: "Hindi makakuha ng payo sa pag-aalaga dahil sa error.",
          benefits: "Hindi makakuha ng mga benepisyo dahil sa error.",
          placement: "Hindi makakuha ng impormasyon sa pagkakalagay dahil sa error."
        }
      }
    };
  }
}
