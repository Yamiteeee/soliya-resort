"use client";

import Image from "next/image";
import HomepageLayout from "@/layouts/HomepageLayout"; 
import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";
import { useTheme } from "@/provider/themeprovider";
import { soliyaImages } from "@/provider/imageProvider";

export default function Home() {
  const { colors, theme } = useTheme();

  const accommodationData = [
    {
      title: "Cloud 9 Ocean Suite",
      features: "Panoramic Pacific views, private plunge pool, outdoor rain shower, private balcony hammock.",
      bestFor: "Honeymoons & Avid Surfers"
    },
    {
      title: "Canopy Loft",
      features: "Elevated among coconut trees, floor-to-ceiling glass paneling, open skylight, standalone tub.",
      bestFor: "Creative Solitude & Digital Nomads"
    },
    {
      title: "Soliya Eco Villa",
      features: "100% Sustainable bamboo architecture, zero-footprint solar grid, private path to local lagoon.",
      bestFor: "Eco-Conscious Small Groups"
    }
  ];

  const tableHeaders = ["Sanctuary Type", "Premium Features & Architecture", "Ideal For"];

  return (
    <HomepageLayout>
      
      {/* 1. HERO SECTION */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0 opacity-70">
          <img 
            src={soliyaImages.hero.background} 
            alt={soliyaImages.hero.alt} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-stone-100">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-stone-300 block mb-4">
            Boutique Luxury Surf Sanctuary
          </span>
          <h1 className="font-serif text-5xl font-light tracking-wide text-stone-100 sm:text-7xl md:text-8xl mb-6">
            Where the Swell <br className="hidden sm:inline" /> Meets Soul
          </h1>
          <p className="mx-auto max-w-xl font-sans text-sm md:text-base leading-relaxed text-stone-200/90 mb-10">
            Discover a conscious eco-luxury retreat hidden safely along the pristine shores of Siargao. Tailored elegantly for sunset chasers, wave riders, and slow-living purists.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#villas"><Button variant="secondary">Explore Sanctuaries</Button></a>
            <a href="#experience"><Button variant="outline">The Experience</Button></a>
          </div>
        </div>
      </section>

      {/* 2. THE EXPERIENCE BRAND BLOCK */}
      <section id="experience" className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <span className={`text-xs font-semibold uppercase tracking-widest block ${colors.accent}`}>
              The Philosophy
            </span>
            <h2 className={`font-serif text-3xl font-light tracking-wide sm:text-4xl md:text-5xl ${colors.text}`}>
              Slow living, deeply rooted in nature.
            </h2>
            <p className={`font-sans leading-relaxed text-sm md:text-base ${colors.muted}`}>
              At Soliya, we believe that pure, high-end luxury shouldn't compromise the earth. Tucked comfortably away from the bustling tourist strips yet just a brief walk away from the island's world-class breaks, our spaces perfectly blend modern architectural geometry with traditional Filipino craftsmanship.
            </p>
            <p className={`font-sans leading-relaxed text-sm md:text-base ${colors.muted}`}>
              Wake up softly to the sound of ocean spray and rustling palms, catch clean barrels at dawn, and wind down with a cold coconut beverage as the sky turns pastel above our infinity lounge pool.
            </p>
          </div>
          <div className={`h-[450px] w-full overflow-hidden border shadow-sm ${colors.border} ${colors.surface}`}>
            <img 
              src={soliyaImages.experience.pool} 
              alt={soliyaImages.experience.alt} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. VILLA CARDS GRID SECTION */}
      <section id="villas" className={`px-6 py-24 md:px-12 md:py-32 transition-colors duration-300 ${colors.surface}`}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className={`text-xs font-semibold uppercase tracking-widest block mb-3 ${colors.accent}`}>
              Accommodations
            </span>
            <h2 className={`font-serif text-3xl font-light tracking-wide sm:text-4xl ${colors.text}`}>
              Choose Your Architectural Sanctuary
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            <Card 
              imageSrc={soliyaImages.rooms.oceanSuite}
              altText="Luxury tropical bedroom suite layout"
              title="Cloud 9 Ocean Suite"
              description="A premium beachfront layout carefully optimized for travelers chasing the early morning tides. Complete with a private open-air rain shower."
              tag="Oceanfront"
            />
            <Card 
              imageSrc={soliyaImages.rooms.canopyLoft}
              altText="Sleek minimalist boutique hotel room"
              title="The Canopy Loft"
              description="Perched beautifully among the palm forests. Features a private floating hammock net and floor-to-ceiling double-paned insulated glass."
              tag="Best Views"
            />
            <Card 
              imageSrc={soliyaImages.rooms.ecoVilla}
              altText="Sustainably designed bamboo eco villa room"
              title="Soliya Eco Villa"
              description="Constructed by hand using native local materials, sustainably sourced engineered lumber, and raw concrete. 100% off-grid solar execution."
              tag="Sustainable"
            />
          </div>

          <div className="mt-20">
            <h3 className={`font-serif text-xl tracking-wide mb-6 font-medium ${colors.text}`}>Quick Sanctuary Comparison</h3>
            <Table headers={tableHeaders} data={accommodationData} />
          </div>
        </div>
      </section>

      {/* 4. THE LIFESTYLE & DINING SECTION */}
      <section id="lifestyle" className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 grid grid-cols-2 gap-4 lg:order-1">
            <div className={`overflow-hidden border h-64 md:h-80 ${colors.border}`}>
              <img 
                src={soliyaImages.lifestyle.breakfastTable} 
                alt="Aesthetic breakfast table setting with fresh food" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className={`overflow-hidden border h-64 md:h-80 mt-8 ${colors.border}`}>
              <img 
                src={soliyaImages.lifestyle.smoothieBowl} 
                alt="Fresh tropical food layout close up" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <span className={`text-xs font-semibold uppercase tracking-widest block ${colors.accent}`}>
              Culinary Art & Curated Rhythms
            </span>
            <h2 className={`font-serif text-3xl font-light tracking-wide sm:text-4xl ${colors.text}`}>
              Locally sourced. Artfully composed.
            </h2>
            <p className={`font-sans text-sm leading-relaxed ${colors.muted}`}>
              Soliya Kitchen takes major pride in working exclusively alongside local farmers and municipal fisherfolk. From sunrise smoothie breakfast bowls filled with freshly harvested mangos to beachside wood-fired evening dinners, experience authentic Filipino flavor profiles reimagined through a global minimalist dining lens.
            </p>
            <div className={`border-l-2 pl-4 py-1 italic text-sm font-serif ${
              theme === 'dark' ? 'border-emerald-500 text-stone-300' : 'border-emerald-900 text-stone-700'
            }`}>
              "The evening acoustic programming perfectly blends down-tempo Phonk patterns and indie pinoy rock roots while you enjoy our hand-shaken native fruit elixirs."
            </div>
          </div>
        </div>
      </section>

    </HomepageLayout>
  );
}