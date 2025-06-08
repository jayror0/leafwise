import { NextRequest, NextResponse } from 'next/server';
import { generatePlantDetails } from '@/ai/flows/generate-plant-details';

export async function POST(request: NextRequest) {
  try {
    const { photoDataUri } = await request.json();

    if (!photoDataUri) {
      return NextResponse.json(
        { error: 'Photo data is required' },
        { status: 400 }
      );
    }

    const result = await generatePlantDetails({ photoDataUri });

    if (!result.identification.isPlant) {
      return NextResponse.json({
        error: "This image does not contain a plant."
      });
    }

    return NextResponse.json({
      name: result.identification.latinName,
      commonName: result.identification.commonName,
      description: `${result.identification.commonName} is a plant species.`,
      careInfo: result.careTips,
      careTips: result.careTips,
      benefits: result.benefits,
      placement: result.placement,
      tagalog: {
        name: result.translations.tagalog.commonName,
        commonName: result.translations.tagalog.commonName,
        description: `Ang ${result.translations.tagalog.commonName} ay isang uri ng halaman.`,
        careTips: result.translations.tagalog.careTips,
        benefits: result.translations.tagalog.benefits,
        careInstructions: result.translations.tagalog.careTips,
        funFacts: []
      }
    });

  } catch (error) {
    console.error('Error in plant identification API:', error);
    return NextResponse.json(
      { error: 'Failed to identify plant. Please try again.' },
      { status: 500 }
    );
  }
}
