import type { GeneratePlantDetailsOutput } from "@/ai/flows/generate-plant-details";

export interface PlantIdentification {
  commonName: string;
  latinName: string;
}

export interface PlantDetails extends GeneratePlantDetailsOutput {}

export interface Plant extends PlantDetails {
  id: string;
  imageDataUri: string;
}
