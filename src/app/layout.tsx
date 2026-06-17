import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/animations/pageloadAnimation";
import { ThemeProvider } from "@/provider/themeprovider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soliya Siargao | Boutique Luxury Eco-Resort",
  description: "Discover an intimate, conscious eco-luxury beach sanctuary hidden elegantly along the pristine surf shores of Siargao, Philippines. Where the swell meets soul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full antialiased">
        <ThemeProvider>
          <PageLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}