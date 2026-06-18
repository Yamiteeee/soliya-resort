"use client";

import React, { useEffect, useState } from "react";
import HomepageLayout from "@/layouts/HomepageLayout";
import StickyBookingBar from "@/components/footer";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";
import ScrollSection from "@/components/animations/ScrollSection";
import BookingLayout from "@/layouts/BookingLayout";

import { useTheme } from "@/hooks/useThemeprovider";
import { useHomeBookingFlow } from "@/hooks/useHomeBookingFlow";
import { soliyaImages } from "@/provider/imageProvider";
import { ACCOMMODATION_DATA, TABLE_HEADERS } from "@/provider/Mockdata";

export default function Home() {
  const { colors } = useTheme();
  
  const {
    step,
    setStep,
    form,
    checkInInputRef,
    checkOutInputRef,
    booking,
    handleModalClose,
    handleFormSubmit,
    handleFormChange,
    formatDisplayDate,
  } = useHomeBookingFlow();

  const { 
    isOpen, 
    success, 
    checkIn, 
    checkOut, 
    nights, 
    openBooking,
    calendarDays,
    priceSummary,
    isRoomOccupied
  } = booking; 
  
  const [shouldRenderModal, setShouldRenderModal] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRenderModal(true);
      const timer = setTimeout(() => setAnimateIn(true), 30);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRenderModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const navAction = (
    <Button
      variant="primary"
      onClick={() => { setStep(1); openBooking(); }}
      className={`hidden px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase border-none md:block shadow-sm transition-all duration-300 ${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover}`}
    >
      Inquire Now
    </Button>
  );

  const hookDataForLayout = {
    isOpen,
    success,
    step,
    form: { ...booking.form, ...form }, 
    checkIn,
    checkOut,
    nights,
    calendarDays,
    priceSummary,
    isRoomOccupied,
    onFormChange: (name: string, value: any) => {
      handleFormChange(name, value);
      booking.onFormChange(name, value);
    },
    onNext: () => setStep((s) => Math.min(s + 1, 4)),
    onBack: () => setStep((s) => Math.max(s - 1, 1)),
    openBooking,
    closeBooking: handleModalClose,
    onSubmit: () => {
      const dummyEvent = { preventDefault: () => {} } as React.FormEvent;
      handleFormSubmit(dummyEvent);
    },
  };

  return (
    <>
      {/* FIXED CONTAINER LAYER: overflow-x-hidden and w-full lock the layout boundaries tightly */}
      <div className={`w-full overflow-x-hidden transition-opacity duration-300 ease-out will-change-opacity ${isOpen ? "opacity-25 pointer-events-none" : "opacity-100"}`}>
        <HomepageLayout 
          className={`${colors.contentBg} ${colors.text} ${colors.selectionBg} ${colors.selectionText}`}
          navAction={navAction}
          bookingBarSlot={
            <StickyBookingBar 
              checkIn={checkIn}
              checkOut={checkOut}
              totalNights={nights}
              formattedCheckIn={formatDisplayDate(checkIn)}
              formattedCheckOut={formatDisplayDate(checkOut)}
              checkInRef={checkInInputRef}
              checkOutRef={checkOutInputRef}
              onCheckInChange={(e) => handleFormChange("checkIn", e.target.value)}
              onCheckOutChange={(e) => handleFormChange("checkOut", e.target.value)}
              onReserveClick={() => { setStep(1); openBooking(); }}
            />
          }
        >
          {/* 1. LUXURY HERO SECTION */}
          <section className={`relative flex h-screen w-full items-center justify-center overflow-hidden ${colors.bg} ${colors.textLight}`}>
            <div className="absolute inset-0 z-0 opacity-50 select-none pointer-events-none">
              <img 
                src={soliyaImages.hero.background} 
                alt={soliyaImages.hero.alt} 
                className="h-full w-full object-cover scale-102 animate-[subtlePan_25s_infinite_alternate] will-change-transform" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10" />
              <div className="absolute inset-0 bg-radial-to-c from-transparent via-transparent to-black/60 z-10" />
            </div>

            <ScrollSection className="relative z-10 mx-auto max-w-5xl px-6 text-center mt-12">
              <span className={`text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] block mb-6 ${colors.mutedLight} sm:animate-[fadeIn_1.2s_ease-out]`}>
                A Boutique Luxury Surf Sanctuary
              </span>
              <h1 className="font-serif text-5xl font-light tracking-wide sm:text-7xl md:text-8xl lg:text-9xl mb-8 leading-[1.15] text-white">
                Where the Swell <br className="hidden sm:inline" /> Meets Soul
              </h1>
              <p className={`mx-auto max-w-2xl font-sans text-xs md:text-sm font-light tracking-wide leading-relaxed mb-12 ${colors.mutedLight}`}>
                Discover a conscious eco-luxury retreat hidden safely along the pristine shores of Siargao. 
                Tailored elegantly for sunset chasers, wave riders, and slow-living purists.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Button 
                  variant="secondary" 
                  className={`w-full sm:w-auto px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] bg-white text-zinc-950 hover:bg-zinc-100 transition-all duration-300 shadow-xl`} 
                  onClick={() => { setStep(1); openBooking(); }}
                >
                  Explore Sanctuaries
                </Button>
                <a 
                  href="#experience" 
                  className="w-full sm:w-auto px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] border border-white/30 text-white backdrop-blur-xs hover:border-white hover:bg-white/5 flex items-center justify-center transition-all duration-300"
                >
                  The Experience
                </a>
              </div>
            </ScrollSection>
          </section>

          {/* 2. EXPERIENCE PHILOSOPHY SECTION (Light) */}
          <ScrollSection id="experience" className={`mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32 scroll-mt-20 ${colors.contentBg} ${colors.text}`}>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-6">
                <span className={`text-xs font-bold uppercase tracking-widest block ${colors.accent}`}>The Philosophy</span>
                <h2 className="font-serif text-3xl font-normal tracking-wide sm:text-4xl md:text-5xl">Slow living, deeply rooted in nature.</h2>
                <p className={`font-sans leading-relaxed text-sm md:text-base ${colors.muted}`}>
                  At Soliya, we believe that pure, high-end luxury shouldn't compromise the earth. Tucked comfortably away from the bustling tourist strips yet just a brief walk away from the island's world-class breaks, our spaces perfectly blend modern architectural geometry with traditional Filipino craftsmanship.
                </p>
              </div>
              <div className={`h-[320px] md:h-[450px] w-full overflow-hidden rounded-xs ${colors.surface}`}>
                <img src={soliyaImages.experience.pool} alt={soliyaImages.experience.alt} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            </div>
          </ScrollSection>

          {/* 3. VILLAS & ROOMS ACCOMMODATIONS SECTION (Dark) */}
          <ScrollSection id="villas" className={`w-full px-6 py-20 md:py-32 scroll-mt-20 ${colors.bg} ${colors.textLight} border-t border-b ${colors.border}`}>
            <div className="mx-auto max-w-7xl">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-xs font-bold uppercase tracking-widest block mb-3 text-emerald-400">Accommodations</span>
                <h2 className="font-serif text-3xl font-normal tracking-wide sm:text-4xl text-white">Your Architectural Sanctuary</h2>
                <p className={`text-xs font-sans mt-2 ${colors.mutedLight}`}>
                  Every space features smart climate systems, signature zero-waste amenities, and premium natural open ventilation paths.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                <Card imageSrc={soliyaImages.rooms.oceanSuite} altText="Luxury tropical bedroom suite layout" title="Cloud 9 Ocean Suite" description="A premium beachfront layout carefully optimized for travelers chasing the early morning tides. Offers a panoramic direct visual line to Pacific coast breakers, smart bath extensions, and handpicked local timber styling." tag="Oceanfront" aspectRatio="aspect-[16/10]" />
                <Card imageSrc={soliyaImages.rooms.canopyLoft} altText="Sleek minimalist boutique hotel room" title="The Canopy Loft" description="Perched beautifully among the palm forests. Features a private floating hammock net, dynamic dual-story reading zones, and floor-to-ceiling glass panel frameworks filtering majestic morning light patterns." tag="Best Views" aspectRatio="aspect-[16/10]" />
                <Card imageSrc={soliyaImages.rooms.ecoVilla} altText="Sustainably designed bamboo eco villa room" title="Soliya Eco Villa" description="Constructed by hand using native local materials, sustainably sourced engineered lumber, and raw concrete. Complemented by an integrated private saltwater soak pool and deep solar power frameworks." tag="Sustainable" aspectRatio="aspect-[16/10]" />
              </div>
              <div className="mt-20 overflow-x-auto">
                <h3 className="font-serif text-xl tracking-wide mb-6 font-normal text-left text-white">Sanctuary Matrix Breakdown</h3>
                <Table headers={TABLE_HEADERS} data={ACCOMMODATION_DATA} isDark />
              </div>
            </div>
          </ScrollSection>

          {/* 4. CURATED ADVENTURES SECTION (Light) */}
          <ScrollSection id="adventures" className={`mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32 scroll-mt-20 ${colors.contentBg} ${colors.text}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
              <div className="lg:col-span-6 space-y-4">
                <span className={`text-xs font-bold uppercase tracking-widest block ${colors.accent}`}>Island Expeditions</span>
                <h2 className="font-serif text-3xl font-normal tracking-wide sm:text-4xl md:text-5xl">Curated rhythms beyond the shore.</h2>
              </div>
              <div className="lg:col-span-6">
                <p className={`font-sans leading-relaxed text-sm max-w-xl ${colors.muted}`}>
                  Siargao thrives on raw energy and untouched landscapes. Our dedicated adventure team crafts highly private, low-impact paths into the Pacific, tailored uniquely to your skill level and rhythm.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`group overflow-hidden relative ${colors.surface} aspect-[3/4] rounded-xs`}>
                <img src={soliyaImages.adventures.surfing} alt="Surfing raw Pacific breaks in Siargao" className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-1">Signature</span>
                  <h3 className="font-serif text-xl text-white font-light tracking-wide mb-2">Guided Surfing</h3>
                  <p className="text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-sans leading-relaxed">
                    From secret beginner breaks to legendary Cloud 9 crests, mapped alongside local elite watermen.
                  </p>
                </div>
              </div>

              <div className={`group overflow-hidden relative ${colors.surface} aspect-[3/4] rounded-xs`}>
                <img src={soliyaImages.adventures.islandHopping} alt="Pristine white sandbars and crystal clear water" className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-1">Bespoke</span>
                  <h3 className="font-serif text-xl text-white font-light tracking-wide mb-2">Island Hopping</h3>
                  <p className="text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-sans leading-relaxed">
                    Private outrigger journeys to Naked Island, Daku, and Guyam with custom artisanal shore picnics.
                  </p>
                </div>
              </div>

              <div className={`group overflow-hidden relative ${colors.surface} aspect-[3/4] rounded-xs`}>
                <img src={soliyaImages.adventures.scuba} alt="Diver exploring underwater coral reefs" className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-1">Deep Sea</span>
                  <h3 className="font-serif text-xl text-white font-light tracking-wide mb-2">Scuba Exploration</h3>
                  <p className="text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-sans leading-relaxed">
                    Descend into the famous Blue Cathedral or navigate vibrant, untouched offshore marine sanctuaries.
                  </p>
                </div>
              </div>

              <div className={`group overflow-hidden relative ${colors.surface} aspect-[3/4] rounded-xs`}>
                <img src={soliyaImages.adventures.freediving} alt="Freediver drifting down in clear emerald lagoon waters" className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-1">Sanctuary</span>
                  <h3 className="font-serif text-xl text-white font-light tracking-wide mb-2">Lagoon Freediving</h3>
                  <p className="text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-sans leading-relaxed">
                    Unlock modern breathwork mechanics within the stillness of the deep emerald Sugba Lagoon waters.
                  </p>
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* 5. SPA & WELLNESS SECTION (Dark) */}
          <ScrollSection id="wellness" className={`w-full px-6 py-20 md:py-32 scroll-mt-20 ${colors.bg} ${colors.textLight} border-t border-b ${colors.border}`}>
            <div className="mx-auto max-w-7xl grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest block text-emerald-400">Tala Holistic Spa</span>
                <h2 className="font-serif text-3xl font-normal tracking-wide sm:text-4xl md:text-5xl text-white">Reset your native rhythm.</h2>
                <p className={`font-sans leading-relaxed text-sm ${colors.mutedLight}`}>
                  Nourish your skin and recover tired muscles after extensive surfs. Tala Spa synthesizes holistic massage methodologies alongside raw organic oils derived locally from Siargao cold-press farms.
                </p>
                <div className="border-l-2 pl-4 space-y-3 font-sans text-xs border-zinc-700">
                  <p className={colors.textLight}>• <strong>Hilot Rituals:</strong> Traditional deep-tissue acupressure release utilizing heated banana leaves.</p>
                  <p className={colors.textLight}>• <strong>Algae Wrap Restorations:</strong> Locally sourced ocean sea-mineral detox treatments.</p>
                </div>
              </div>
              
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-7 overflow-hidden bg-black rounded-xs aspect-[4/3]">
                  <img src={soliyaImages.spa.massage} alt="Holistic massage relaxation session" className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-500" />
                </div>
                <div className="sm:col-span-5 overflow-hidden hidden sm:block bg-black rounded-xs aspect-[3/4]">
                  <img src={soliyaImages.spa.ambiance} alt="Luxury stone wellness bath setup" className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* 6. LIFESTYLE & CULINARY SECTION (Light) */}
          <ScrollSection id="lifestyle" className={`mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32 scroll-mt-20 ${colors.contentBg} ${colors.text}`}>
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className={`text-xs font-bold uppercase tracking-widest block mb-2 ${colors.accent}`}>Culinary Art & Curated Rhythms</span>
              <h2 className="font-serif text-3xl font-normal tracking-wide sm:text-4xl">Locally Sourced. Artfully Composed.</h2>
              <p className={`font-sans text-xs leading-relaxed mt-2 ${colors.muted}`}>
                Our beachfront kitchen maps an organic journey combining pristine marine catches with sustainable agricultural produce harvested daily.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <div className={`overflow-hidden relative group ${colors.surface} aspect-[16/10] rounded-xs`}>
                  <img src={soliyaImages.lifestyle.breakfastTable} alt="Aesthetic breakfast setting" className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400">07:00 - 11:00 AM</span>
                    <p className="text-xs font-serif mt-0.5">Al-fresco oceanfront morning slow dining provisions.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={`overflow-hidden relative group ${colors.surface} aspect-[4/3] rounded-xs`}>
                    <img src={soliyaImages.lifestyle.smoothieBowl} alt="Fresh nutrient fruit layout close up" className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-serif">Organic high-antioxidant island active bowls.</p>
                    </div>
                  </div>

                  <div className={`overflow-hidden relative group ${colors.surface} aspect-[4/3] rounded-xs`}>
                    <img src={soliyaImages.lifestyle.cocktailPour} alt="Artisanal tropical drink curation pour" className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-serif">Botanical spirits and cold-pressed citrus distillations.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className={`overflow-hidden relative group ${colors.surface} flex-1 min-h-[300px] md:min-h-full aspect-[4/5] md:aspect-auto rounded-xs`}>
                  <img src={soliyaImages.lifestyle.seafoodPlatter} alt="Local fresh marine platter catches" className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400">Catch of the Day</span>
                    <p className="text-sm font-serif mt-0.5">Responsibly caught seafood from local Siargao fisherfolk.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollSection>

          {/* 7. BRAND ANCHOR FOOTER SECTION (Dark Anchor Frame) */}
          <div id="footer" className={`pt-24 pb-36 scroll-mt-20 ${colors.bg} ${colors.textLight} border-t ${colors.border}`}>
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              
              {/* Naming Transition Header Block */}
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3 text-emerald-400">Begin Your Journey</span>
                <h2 className="font-serif text-3xl font-light tracking-wide sm:text-4xl text-white">Soliya Retreat Sanctuary</h2>
                <div className="w-12 h-[1px] bg-zinc-700 mx-auto mt-4" />
              </div>

              {/* Top Section: Dusk Facade Hero Header */}
              <div className="w-full h-80 md:h-[420px] rounded-xs overflow-hidden mb-16 relative group bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80" 
                  alt="Soliya Boutique Hotel architectural layout exterior during sunset dusk" 
                  className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-75 group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400 block mb-1">General Inquiries</span>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-white tracking-wide">hello@soliya-siargao.com</h3>
                  </div>
                  <p className={`text-xs max-w-xs font-sans font-light leading-relaxed ${colors.mutedLight}`}>
                    Constructed with native open architectures alongside pristine ocean-facing panoramas.
                  </p>
                </div>
              </div>

              {/* Grid Section: Maps, Shortcuts, Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
                
                {/* Panel 1: Physical Address & Socials */}
                <div className="lg:col-span-4 space-y-6">
                  <h4 className="font-serif text-xl tracking-wider font-light text-white">Soliya Sanctuary</h4>
                  <p className={`text-xs font-sans font-light leading-relaxed max-w-xs ${colors.mutedLight}`}>
                    Tourism Road, Barangay Catangnan,<br />
                    General Luna, Siargao Island,<br />
                    Surigao del Norte, 8419, Philippines
                  </p>
                  <div className="space-y-1 text-xs font-sans">
                    <p className={colors.mutedLight}>Front Desk: <span className="text-white">+63 (917) 123-4567</span></p>
                    <p className={colors.mutedLight}>Concierge: <span className="text-white">concierge@soliya.com</span></p>
                  </div>
                  
                  {/* Social Media Icons */}
                  <div className="flex items-center gap-5 pt-2">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className={`text-zinc-400 transition-colors duration-200 ${colors.textHoverLight}`} aria-label="Instagram Profile">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className={`text-zinc-400 transition-colors duration-200 ${colors.textHoverLight}`} aria-label="Facebook Page">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className={`text-zinc-400 transition-colors duration-200 ${colors.textHoverLight}`} aria-label="Youtube Channel">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  </div>
                </div>

                {/* Panel 2: Popularized Shortcuts & Navigation */}
                <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:px-4">
                  <div className="space-y-4">
                    <span className={`text-[10px] font-sans font-bold tracking-[0.2em] uppercase ${colors.mutedLight} block`}>Sitemap</span>
                    <ul className="space-y-2.5 text-xs font-sans font-light">
                      <li><a href="#experience" className={`${colors.mutedLight} hover:text-white transition-colors duration-200`}>The Experience</a></li>
                      <li><a href="#villas" className={`${colors.mutedLight} hover:text-white transition-colors duration-200`}>Accommodations</a></li>
                      <li><a href="#adventures" className={`${colors.mutedLight} hover:text-white transition-colors duration-200`}>Curated Activities</a></li>
                      <li><a href="#wellness" className={`${colors.mutedLight} hover:text-white transition-colors duration-200`}>Holistic Wellness</a></li>
                      <li><a href="#lifestyle" className={`${colors.mutedLight} hover:text-white transition-colors duration-200`}>Culinary Studio</a></li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <span className={`text-[10px] font-sans font-bold tracking-[0.2em] uppercase ${colors.mutedLight} block`}>Conscious</span>
                    <ul className="space-y-2.5 text-xs font-sans font-light">
                      <li><a href="#" className={`${colors.mutedLight} hover:text-white transition-colors duration-200`}>Sustainability</a></li>
                      <li><a href="#" className={`${colors.mutedLight} hover:text-white transition-colors duration-200`}>Local Impact</a></li>
                      <li><a href="#" className={`${colors.mutedLight} hover:text-white transition-colors duration-200`}>Wave Conditions</a></li>
                      <li><a href="#" className={`${colors.mutedLight} hover:text-white transition-colors duration-200`}>Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>

                {/* Panel 3: Google Map Micro-Iframe Location */}
                <div className={`lg:col-span-4 w-full h-48 rounded-xs overflow-hidden border border-zinc-800 shadow-sm relative bg-zinc-950`}>
                  <iframe 
                    title="Soliya Resort Location Google Map"
                    src="https://maps.google.com/maps?q=Siargao%20Island&t=&z=11&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 grayscale opacity-70 contrast-[1.1]"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </div>

            </div>
          </div>
        </HomepageLayout>
      </div>

      {/* MODAL OVERLAY BACKDROP */}
      {shouldRenderModal && (
        <div 
          onClick={handleModalClose}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6 overflow-x-hidden overflow-y-auto bg-black/70 transition-opacity duration-200 ease-in-out opacity-100"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className={`w-full max-w-7xl transform transition-all duration-300 ease-out transform-gpu ${
              animateIn ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0"
            }`}
          >
            <BookingLayout hookData={hookDataForLayout as any} />
          </div>
        </div>
      )}
    </>
  );
}