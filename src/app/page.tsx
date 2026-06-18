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

  const { isOpen, success, checkIn, checkOut, nights, setCheckIn, setCheckOut, openBooking } = booking;
  
  const [shouldRenderModal, setShouldRenderModal] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRenderModal(true);
      const timer = setTimeout(() => setAnimateIn(true), 30);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRenderModal(false), 450);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const navAction = (
    <Button
      variant="primary"
      onClick={() => { setStep(1); openBooking(); }}
      className={`hidden px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase border-none md:block shadow-sm transition-all duration-300 ${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover}`}
    >
      Inquire Now
    </Button>
  );

  return (
    <>
      {/* 1. MAIN HOMEPAGE DISPLAY TRACK */}
      {/* This wrapper can safely blur and scale now because the fixed elements live outside it! */}
      <div className={`transition-all duration-700 ease-in-out ${isOpen ? "opacity-40 pointer-events-none filter blur-sm scale-[0.985]" : "opacity-100 scale-100"}`}>
        <HomepageLayout 
          className={`${colors.contentBg} ${colors.text} ${colors.selectionBg} ${colors.selectionText}`}
          navAction={navAction}
          /* REMOVED bookingBarSlot from here so it doesn't get trapped by the blur scale transforms */
        >
          {/* HERO SECTION */}
          <section className={`relative flex h-screen w-full items-center justify-center overflow-hidden ${colors.bg} ${colors.textLight}`}>
            <div className="absolute inset-0 z-0 opacity-40">
              <img src={soliyaImages.hero.background} alt={soliyaImages.hero.alt} className="h-full w-full object-cover scale-105 animate-[subtlePan_20s_infinite_alternate]" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-zinc-900 opacity-90" />
            </div>

            <ScrollSection className="relative z-10 mx-auto max-w-4xl px-6 text-center">
              <span className={`text-xs font-bold uppercase tracking-[0.3em] block mb-4 ${colors.mutedLight}`}>
                Boutique Luxury Surf Sanctuary
              </span>
              <h1 className={`font-serif text-5xl font-normal tracking-wide sm:text-7xl md:text-8xl mb-6 leading-tight ${colors.textLight}`}>
                Where the Swell <br className="hidden sm:inline" /> Meets Soul
              </h1>
              <p className={`mx-auto max-w-xl font-sans text-sm md:text-base leading-relaxed mb-10 ${colors.mutedLight}`}>
                Discover a conscious eco-luxury retreat hidden safely along the pristine shores of Siargao. Tailored elegantly for sunset chasers, wave riders, and slow-living purists.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" className="px-6 py-3 text-xs font-bold uppercase tracking-wider bg-white text-zinc-900 hover:bg-zinc-100 transition-colors" onClick={() => { setStep(1); openBooking(); }}>
                  Explore Sanctuaries
                </Button>
                <Button variant="outline" className={`px-6 py-3 text-xs font-bold uppercase tracking-wider border-current hover:bg-white/10 transition-all duration-300 ${colors.textLight}`} onClick={() => { setStep(1); openBooking(); }}>
                  The Experience
                </Button>
              </div>
            </ScrollSection>
          </section> 
          
          {/* EXPERIENCE SECTION */}
          <ScrollSection id="experience" className={`mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 ${colors.contentBg} ${colors.text}`}>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-6">
                <span className={`text-xs font-bold uppercase tracking-widest block ${colors.accent}`}>The Philosophy</span>
                <h2 className="font-serif text-3xl font-normal tracking-wide sm:text-4xl md:text-5xl">Slow living, deeply rooted in nature.</h2>
                <p className={`font-sans leading-relaxed text-sm md:text-base ${colors.muted}`}>
                  At Soliya, we believe that pure, high-end luxury shouldn't compromise the earth. Tucked comfortably away from the bustling tourist strips yet just a brief walk away from the island's world-class breaks, our spaces perfectly blend modern architectural geometry with traditional Filipino craftsmanship.
                </p>
              </div>
              <div className={`h-[450px] w-full overflow-hidden ${colors.surface}`}>
                <img src={soliyaImages.experience.pool} alt={soliyaImages.experience.alt} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            </div>
          </ScrollSection>

          {/* VILLAS SECTION */}
          <ScrollSection id="villas" className={`px-6 py-24 md:px-12 md:py-32 ${colors.contentBg} ${colors.text}`}>
            <div className="mx-auto max-w-7xl">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className={`text-xs font-bold uppercase tracking-widest block mb-3 ${colors.accent}`}>Accommodations</span>
                <h2 className="font-serif text-3xl font-normal tracking-wide sm:text-4xl">Choose Your Architectural Sanctuary</h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                <Card imageSrc={soliyaImages.rooms.oceanSuite} altText="Luxury tropical bedroom suite layout" title="Cloud 9 Ocean Suite" description="A premium beachfront layout carefully optimized for travelers chasing the early morning tides." tag="Oceanfront" />
                <Card imageSrc={soliyaImages.rooms.canopyLoft} altText="Sleek minimalist boutique hotel room" title="The Canopy Loft" description="Perched beautifully among the palm forests. Features a private floating hammock net." tag="Best Views" />
                <Card imageSrc={soliyaImages.rooms.ecoVilla} altText="Sustainably designed bamboo eco villa room" title="Soliya Eco Villa" description="Constructed by hand using native local materials, sustainably sourced engineered lumber, and raw concrete." tag="Sustainable" />
              </div>
              <div className="mt-20">
                <h3 className="font-serif text-xl tracking-wide mb-6 font-normal">Quick Sanctuary Comparison</h3>
                <Table headers={TABLE_HEADERS} data={ACCOMMODATION_DATA} />
              </div>
            </div>
          </ScrollSection>

          {/* LIFESTYLE SECTION */}
          <ScrollSection id="lifestyle" className={`mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 ${colors.contentBg} ${colors.text}`}>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="order-2 grid grid-cols-2 gap-4 lg:order-1">
                <div className={`overflow-hidden h-64 md:h-80 ${colors.surface}`}>
                  <img src={soliyaImages.lifestyle.breakfastTable} alt="Aesthetic breakfast table setting with fresh food" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className={`overflow-hidden h-64 md:h-80 mt-8 ${colors.surface}`}>
                  <img src={soliyaImages.lifestyle.smoothieBowl} alt="Fresh tropical food layout close up" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <span className={`text-xs font-bold uppercase tracking-widest block ${colors.accent}`}>Culinary Art & Curated Rhythms</span>
                <h2 className="font-serif text-3xl font-normal tracking-wide sm:text-4xl">Locally sourced. Artfully composed.</h2>
                <p className={`font-sans text-sm leading-relaxed ${colors.muted}`}>Soliya Kitchen takes major pride in working exclusively alongside local farmers and municipal fisherfolk.</p>
              </div>
            </div>
          </ScrollSection>
        </HomepageLayout>
      </div>

      {/* 2. FIXED LAYOUT STICKY BOTTOM RESERVATION BAR */}
      {/* MOVED HERE: Sits outside the animation wrapper to break out of the transform context */}
      <StickyBookingBar 
        checkIn={checkIn}
        checkOut={checkOut}
        totalNights={nights}
        formattedCheckIn={formatDisplayDate(checkIn)}
        formattedCheckOut={formatDisplayDate(checkOut)}
        checkInRef={checkInInputRef}
        checkOutRef={checkOutInputRef}
        onCheckInChange={(e) => setCheckIn(e.target.value)}
        onCheckOutChange={(e) => setCheckOut(e.target.value)}
        onReserveClick={() => { setStep(1); openBooking(); }}
      />

      {/* 3. THE MOVEMENT OVERLAY BACKDROP MODAL */}
      {shouldRenderModal && (
        <div 
          onClick={handleModalClose}
          className={`fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6 overflow-x-hidden overflow-y-auto bg-black/50 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
            animateIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className={`w-full max-w-xl transform transition-all duration-300 ease-out transform-gpu ${
              animateIn ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0"
            }`}
          >
            <BookingLayout
              isOpen={isOpen}
              success={success}
              step={step}
              form={form}
              nights={nights}
              checkIn={checkIn}
              checkOut={checkOut}
              onClose={handleModalClose}
              onNext={() => setStep((s) => Math.min(s + 1, 4))}
              onBack={() => setStep((s) => Math.max(s - 1, 1))}
              onSubmit={handleFormSubmit}
              onFormChange={handleFormChange}
            />
          </div>
        </div>
      )}
    </>
  );
}