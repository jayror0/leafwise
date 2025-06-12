import { Providers } from "@/components/Providers";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeafWise - Plant Identification",
  description: "Identify plants and learn about their care with LeafWise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
