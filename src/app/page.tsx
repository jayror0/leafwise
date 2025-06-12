"use client";

import "@/app/globals.css";
import { useState, useRef } from "react";
import { Plant } from "@/types/plant";
import { Logo } from "@/components/icons/Logo";

export default function IdentifyPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [plantData, setPlantData] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<"english" | "tagalog">("english");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPlantData(null);
      setError(null);
    }
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Starting image analysis...");
      console.log(
        "Selected file:",
        selectedFile.name,
        selectedFile.type,
        selectedFile.size
      );

      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const base64Data = await base64Promise;
      console.log("Base64 data length:", base64Data.length);
      console.log("Base64 data preview:", base64Data.substring(0, 100) + "...");

      const response = await fetch("/api/identify-plant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photoDataUri: base64Data }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to identify plant");
      }
      console.log("Identification result:", result);

      if (result && !result.error) {
        const plantForDisplay: Omit<Plant, "id" | "identifiedAt"> = {
          name: result.name || "Unknown Plant",
          scientificName: result.name,
          commonName: result.commonName,
          description: result.description || "",
          careInstructions: result.careInfo,
          careTips: result.careTips,
          benefits: result.benefits,
          placement: result.placement,
          tagalog: result.tagalog,
          imageData: base64Data,
        };
        setPlantData(plantForDisplay as Plant);
      } else {
        setError(result?.error || "Failed to identify plant");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : "Failed to identify plant");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen botanical-gradient relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 texture-paper opacity-30"></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-32 h-32 mb-8">
            <Logo className="w-24 h-24 text-forest-600 drop-shadow-lg" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-forest-800 mb-6 font-boho-script tracking-wide">
            LeafWise
          </h1>
          <div className="w-24 h-1 bg-sage-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg sm:text-xl text-forest-700 max-w-2xl mx-auto leading-relaxed font-botanical font-light">
            Snap a photo, and let LeafWise unveil the secrets of your green
            companions. Get identification, care tips, and more!
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="boho-card rounded-3xl shadow-botanical p-8 mb-8 border-sage-200/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-sage-300 rounded-tl-3xl opacity-60"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-sage-300 rounded-tr-3xl opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-sage-300 rounded-bl-3xl opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-sage-300 rounded-br-3xl opacity-60"></div>
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-rustic font-semibold text-forest-800 mb-6 flex items-center justify-center gap-3">
                <span className="bg-gradient-to-r from-forest-600 to-sage-600 bg-clip-text text-transparent">
                  Plant Identifier
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={handleUploadClick}
                  className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-sage-500 to-sage-500 text-white rounded-2xl font-botanical font-medium text-lg shadow-nature"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Choose a File</span>
                </button>

                <button
                  onClick={handleCameraCapture}
                  className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-terracotta-500 to-sunset-orange text-white rounded-2xl font-botanical font-medium text-lg shadow-nature"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Capture a Plant</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />{" "}
              {selectedFile && (
                <div className="mt-8 flex flex-col items-center">
                  <div className="relative inline-block group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-sage-300/30 via-moss-400/20 to-forest-300/30 rounded-3xl blur-lg"></div>
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected plant essence"
                        className="max-w-full max-h-80 rounded-2xl shadow-mystical border-4 border-cream organic-mask"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 via-transparent to-sage-200/20 rounded-2xl"></div>

                      <div className="absolute top-2 right-2 w-3 h-3 bg-golden-yellow rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-2 h-2 bg-sage-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="mt-6 bg-gradient-to-r from-cream to-linen px-6 py-3 rounded-full shadow-botanical border border-sage-200">
                    <p className="text-sm text-forest-700 font-botanical font-medium text-center flex items-center gap-2">
                      <span className="italic">{selectedFile.name}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>{" "}
            {selectedFile && (
              <div className="text-center relative">
                <button
                  onClick={analyzeImage}
                  disabled={loading}
                  className="relative px-20 py-2 bg-gradient-to-r from-sage-500 via-moss-500 to-forest-600 text-white rounded-2xl font-rustic font-semibold text-lg shadow-mystical disabled:opacity-60 disabled:cursor-not-allowed group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"></div>

                  {loading ? (
                    <span className="flex items-center justify-center relative z-10">
                      <div className="botanical-spinner w-6 h-6 mr-3"></div>
                      <span className="font-botanical font-medium text-xl">
                        Identifying...
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center w justify-center relative z-10">
                      <span className="font-botanical font-medium text-lg shadow-nature text-xl">
                        Identify Plant
                      </span>
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>{" "}
          {error && (
            <div className="boho-card border-l-4 border-terracotta-400 rounded-2xl p-6 mb-8 shadow-mystical bg-gradient-to-r from-dusty-rose/20 to-mauve/20 backdrop-blur-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-terracotta-100 rounded-full flex items-center justify-center"></div>
                </div>
                <div className="ml-4">
                  <h3 className="font-rustic font-semibold text-terracotta-800 text-lg">
                    The Spirits are Restless
                  </h3>
                  <p className="text-terracotta-700 font-botanical mt-1">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}{" "}
          {plantData && (
            <div className="boho-card rounded-3xl shadow-mystical p-8 border-2 border-sage-200/60 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="botanical-pattern w-full h-full"></div>
              </div>
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sage-300 via-moss-400 to-forest-500"></div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-forest-500 via-moss-400 to-sage-300"></div>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-1 relative z-10">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                    <div className="flex-1">
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-rustic mb-2">
                        <span className="bg-gradient-to-r from-forest-700 via-moss-600 to-sage-600 bg-clip-text text-transparent drop-shadow-sm">
                          {language === "tagalog" && plantData.tagalog?.name
                            ? plantData.tagalog.name
                            : plantData.name}
                        </span>
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-0.5 bg-gradient-to-r from-sage-400 to-transparent flex-1"></div>
                        <div className="h-0.5 bg-gradient-to-l from-sage-400 to-transparent flex-1"></div>
                      </div>
                      {language === "tagalog" &&
                        plantData.tagalog?.commonName && (
                          <p className="text-forest-600 italic text-lg font-nature font-light">
                            {plantData.tagalog.commonName}
                          </p>
                        )}
                      {language === "english" && plantData.commonName && (
                        <p className="text-forest-600 italic text-lg font-nature font-light">
                          {plantData.commonName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex bg-gradient-to-r from-cream to-linen rounded-3xl p-2 shadow-botanical border border-sage-200">
                  <button
                    onClick={() => setLanguage("english")}
                    className={`px-6 py-3 rounded-2xl text-sm font-botanical font-semibold ${
                      language === "english"
                        ? "bg-gradient-to-r from-sage-400 to-moss-500 text-white shadow-mystical"
                        : "text-forest-600"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("tagalog")}
                    className={`px-6 py-3 rounded-2xl text-sm font-botanical font-semibold ${
                      language === "tagalog"
                        ? "bg-gradient-to-r from-sage-400 to-moss-500 text-white shadow-mystical"
                        : "text-forest-600"
                    }`}
                  >
                    Tagalog
                  </button>
                </div>
              </div>{" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {plantData.placement && (
                  <div className="boho-card bg-gradient-to-br from-dusty-rose/20 via-mauve/15 to-lavender-gray/20 rounded-3xl p-6 border-2 border-dusty-rose/30 shadow-botanical group">
                    <div className="flex items-center mb-4 gap-4">
                      <h4 className="font-rustic font-bold text-forest-800 text-xl">
                        {language === "tagalog"
                          ? " Lokasyon ng Halaman"
                          : " Plant Placement"}
                      </h4>
                      <div className="flex-1 h-px bg-gradient-to-r from-sage-300 to-transparent"></div>
                    </div>
                    <p className="text-forest-700 leading-relaxed font-botanical pl-2">
                      {plantData.placement}
                    </p>
                  </div>
                )}

                {(plantData.careTips ||
                  (language === "tagalog" && plantData.tagalog?.careTips)) && (
                  <div className="boho-card bg-gradient-to-br from-golden-yellow/20 via-sunset-orange/15 to-terracotta/20 rounded-3xl p-6 border-2 border-golden-yellow/40 shadow-botanical group">
                    <div className="flex items-center mb-4 gap-4">
                      <h4 className="font-rustic font-bold text-forest-800 text-xl">
                        {language === "tagalog"
                          ? " Mga Tip sa Pangangalaga"
                          : " Care Tips"}
                      </h4>
                      <div className="flex-1 h-px bg-gradient-to-r from-sage-300 to-transparent"></div>
                    </div>
                    <p className="text-forest-700 leading-relaxed font-botanical pl-2">
                      {language === "tagalog" && plantData.tagalog?.careTips
                        ? plantData.tagalog.careTips
                        : plantData.careTips}
                    </p>
                  </div>
                )}
              </div>{" "}
              <div className="space-y-8">
                {(plantData.description ||
                  (language === "tagalog" &&
                    plantData.tagalog?.description)) && (
                  <div className="boho-card bg-gradient-to-r from-cream/80 via-linen/70 to-parchment/80 rounded-3xl p-8 border-2 border-sage-200/50 shadow-botanical group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sage-200/20 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <h4 className="font-rustic font-bold text-forest-800 text-2xl">
                          {language === "tagalog"
                            ? "Paglalarawan"
                            : "Description"}
                        </h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-sage-300 to-transparent"></div>
                      </div>
                      <p className="text-forest-700 leading-relaxed text-lg font-nature">
                        {language === "tagalog" &&
                        plantData.tagalog?.description
                          ? plantData.tagalog.description
                          : plantData.description}
                      </p>
                    </div>
                  </div>
                )}
                {(plantData.benefits ||
                  (language === "tagalog" && plantData.tagalog?.benefits)) && (
                  <div className="boho-card bg-gradient-to-r from-sage-50/80 via-moss-50/70 to-forest-50/80 rounded-3xl p-8 border-2 border-sage-300/50 shadow-botanical group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-sage-300/20 rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <h4 className="font-rustic font-bold text-forest-800 text-2xl">
                          {language === "tagalog"
                            ? "Mga Benepisyo"
                            : "Benefits"}
                        </h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-sage-300 to-transparent"></div>
                      </div>
                      <p className="text-forest-700 leading-relaxed text-lg font-nature">
                        {language === "tagalog" && plantData.tagalog?.benefits
                          ? plantData.tagalog.benefits
                          : plantData.benefits}
                      </p>
                    </div>
                  </div>
                )}
                {(plantData.careInstructions ||
                  (language === "tagalog" &&
                    plantData.tagalog?.careInstructions)) && (
                  <div className="boho-card bg-gradient-to-r from-dusty-rose/20 via-mauve/15 to-lavender-gray/25 rounded-3xl p-8 border-2 border-dusty-rose/40 shadow-botanical group relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-28 h-28 bg-mauve/20 rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <h4 className="font-rustic font-bold text-forest-800 text-2xl">
                          {language === "tagalog"
                            ? "Gabay sa Pangangalaga"
                            : "Care Instructions"}
                        </h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-dusty-rose to-transparent"></div>
                      </div>
                      <p className="text-forest-700 leading-relaxed text-lg font-nature">
                        {language === "tagalog" &&
                        plantData.tagalog?.careInstructions
                          ? plantData.tagalog.careInstructions
                          : plantData.careInstructions}
                      </p>
                    </div>
                  </div>
                )}

                <div className="boho-card bg-gradient-to-r from-sage-50/80 via-forest-50/70 to-moss-50/80 rounded-3xl p-8 border-2 border-sage-300/50 shadow-botanical group relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <h4 className="font-rustic font-bold text-forest-800 text-2xl">
                        {language === "tagalog"
                          ? "Karagdagang Impormasyon"
                          : "Additional Resources"}
                      </h4>
                      <div className="flex-1 h-px bg-gradient-to-r from-sage-300 to-transparent"></div>
                    </div>
                    <p className="text-forest-700 leading-relaxed text-lg font-nature mb-6">
                      {language === "tagalog"
                        ? "Para sa mas detalyadong impormasyon, maaari mong tuklasin ang mga sumusunod na mapagkukunan:"
                        : "For more detailed information, you can explore these resources:"}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                          plantData.scientificName || plantData.name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-sage-500 to-moss-500 text-white rounded-2xl font-botanical font-medium text-lg shadow-nature hover:shadow-mystical transition-all duration-300"
                      >
                        Wikipedia
                      </a>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(
                          `${plantData.scientificName || plantData.name} plant care information`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-forest-500 to-sage-600 text-white rounded-2xl font-botanical font-medium text-lg shadow-nature hover:shadow-mystical transition-all duration-300"
                      >
                        Google Search
                      </a>
                    </div>
                  </div>
                </div>{" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plantData.uses && (
                    <div className="boho-card bg-gradient-to-br from-sage-50/80 via-moss-50/70 to-forest-50/80 rounded-3xl p-8 border-2 border-sage-300/50 shadow-botanical group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-sage-200/20 rounded-full blur-xl"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-sage-400 to-moss-500 rounded-xl flex items-center justify-center shadow-lg"></div>
                          <h4 className="font-rustic font-bold text-forest-800 text-xl">
                            {language === "tagalog"
                              ? "Sacred Purpose"
                              : "Mystical Uses"}
                          </h4>
                        </div>
                        <p className="text-forest-700 leading-relaxed text-lg font-nature pl-2">
                          {plantData.uses}
                        </p>
                      </div>
                    </div>
                  )}

                  {plantData.habitat && (
                    <div className="boho-card bg-gradient-to-br from-golden-yellow/20 via-sunset-orange/15 to-terracotta/20 rounded-3xl p-8 border-2 border-golden-yellow/40 shadow-botanical group relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-golden-yellow/20 rounded-full blur-xl"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-golden-yellow to-sunset-orange rounded-xl flex items-center justify-center shadow-lg"></div>
                          <h4 className="font-rustic font-bold text-forest-800 text-xl">
                            {language === "tagalog"
                              ? "Sacred Realm"
                              : "Natural Habitat"}
                          </h4>
                        </div>
                        <p className="text-forest-700 leading-relaxed text-lg font-nature pl-2">
                          {plantData.habitat}
                        </p>
                      </div>
                    </div>
                  )}
                </div>{" "}
                {((plantData.funFacts && plantData.funFacts.length > 0) ||
                  (language === "tagalog" &&
                    plantData.tagalog?.funFacts &&
                    plantData.tagalog.funFacts.length > 0)) && (
                  <div className="boho-card bg-gradient-to-r from-dusty-rose/20 via-mauve/15 to-lavender-gray/25 rounded-3xl p-8 border-2 border-dusty-rose/40 shadow-botanical group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-mauve/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-lavender-gray/20 rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <h4 className="font-rustic font-bold text-forest-800 text-2xl">
                          {language === "tagalog"
                            ? "Kakaibang Katotohanan"
                            : "Fun Facts"}
                        </h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-dusty-rose to-transparent"></div>
                      </div>
                      <ul className="space-y-4">
                        {(language === "tagalog" && plantData.tagalog?.funFacts
                          ? plantData.tagalog.funFacts
                          : plantData.funFacts || []
                        ).map((fact, index) => (
                          <li
                            key={index}
                            className="flex items-start text-forest-700 text-lg"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-dusty-rose to-mauve rounded-full flex items-center justify-center mr-4 mt-1 shadow-lg">
                              <span className="text-white text-sm font-bold">
                                {index + 1}
                              </span>
                            </div>
                            <span className="leading-relaxed font-nature">
                              {fact}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
