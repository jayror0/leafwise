
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { generatePlantDetails, type GeneratePlantDetailsOutput } from "@/ai/flows/generate-plant-details";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onIdentificationSuccess: (details: GeneratePlantDetailsOutput, imageDataUri: string) => void;
}

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function ImageUpload({ onIdentificationSuccess }: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
        setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        setImagePreview(null);
        setFile(null);
        event.target.value = ""; 
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
      setFile(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file || !imagePreview) {
      setError("Please select an image file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const plantDetails = await generatePlantDetails({ photoDataUri: imagePreview });

      if (!plantDetails.identification.isPlant) {
        toast({
          variant: "destructive",
          title: "Not a Plant",
          description: "The uploaded image does not appear to be a plant. Please try another image.",
        });
        setIsLoading(false);
        return;
      }

      onIdentificationSuccess(plantDetails, imagePreview);
      toast({
        title: "Plant Identified!",
        description: `Successfully identified: ${plantDetails.identification.commonName}`,
      });
    } catch (err) {
      console.error("Error identifying plant:", err);
      let errorMessage = "Failed to identify plant. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Identification Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <ImageIcon className="mr-2 h-7 w-7 text-primary" /> Plant Identifier
        </CardTitle>
        <CardDescription>
          Upload a photo of a plant, and we&apos;ll try to identify it for you and provide care tips.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="plant-image-upload" className="block text-sm font-medium text-foreground">
              Upload Plant Image
            </label>
            <Input
              id="plant-image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
             <p className="text-xs text-muted-foreground">Max file size: {MAX_FILE_SIZE_MB}MB. PNG, JPG, GIF accepted.</p>
          </div>

          {imagePreview && (
            <div className="mt-4 border border-dashed border-border rounded-lg p-4 flex justify-center items-center bg-muted/50">
              <Image
                src={imagePreview}
                alt="Plant preview"
                width={300}
                height={300}
                className="rounded-md object-contain max-h-[300px] w-auto shadow-sm"
                data-ai-hint="plant photograph"
              />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isLoading || !file} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Identifying...
              </>
            ) : (
              <>
                <UploadCloud className="mr-2 h-4 w-4" />
                Identify Plant
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
