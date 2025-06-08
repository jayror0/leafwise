import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "LeafWise - Plant Identification",
  description: "Identify plants from photos and learn about their care.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/leafwiselogopng.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <main className="flex-grow w-full">
            {children}
          </main>
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
