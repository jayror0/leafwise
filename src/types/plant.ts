
export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  commonName?: string;
  description: string;
  careInstructions?: string;
  careInfo?: string;
  uses?: string;
  habitat?: string;
  funFacts?: string[];
  imageData: string;
  identifiedAt: Date;


  careTips?: string;
  benefits?: string;
  placement?: "indoor" | "outdoor" | "both";

  tagalog?: {
    name?: string;
    commonName?: string;
    description?: string;
    careTips?: string;
    benefits?: string;
    careInstructions?: string;
    uses?: string;
    habitat?: string;
    funFacts?: string[];
  };
}

export interface PlantCollection {
  plants: Plant[];
  addPlant: (plant: Omit<Plant, "id" | "identifiedAt">) => void;
  removePlant: (id: string) => void;
  getPlant: (id: string) => Plant | undefined;
}
