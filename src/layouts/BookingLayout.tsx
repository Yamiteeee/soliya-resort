"use client";

import React, { useMemo, startTransition } from "react";
import UniversalModal from "@/components/UniversalModal";
import UniversalFormUI from "@/components/UniversalFormUI";
import Button from "@/components/Button";
import { useTheme } from "@/hooks/useThemeprovider";
import { BookingLayoutProps } from "@/types";
import { getSchemaForStep } from "@/provider/Mockdata";

export default function BookingLayout({
  isOpen,
  success,
  step,
  form,
  nights,
  checkIn,
  checkOut,
  onClose,
  onNext,
  onBack,
  onFormChange,
  onSubmit,
}: BookingLayoutProps) {
  const { colors } = useTheme();

  // Memoize data maps to prevent component lag on rapid typing events
  const formValues = useMemo(() => ({
    ...form,
    checkIn,
    checkOut
  }), [form, checkIn, checkOut]);

  const currentSchema = useMemo(() => getSchemaForStep(step), [step]);

  const handleNext = () => startTransition(() => onNext());
  const handleBack = () => startTransition(() => onBack());

  return (
    <UniversalModal isOpen={isOpen} onClose={onClose} className="max-w-xl mx-auto">
      {/* ARCHITECTURAL UPDATE: Uses the dynamic `colors.surface` theme variables 
        passed down smoothly from your global context map instead of static hardcoding.
      */}
      <div className={`w-full h-auto max-h-[85vh] flex flex-col overflow-hidden shadow-2xl rounded-sm border transform-gpu transition-all duration-300 ease-out will-change-transform ${colors.surface} ${colors.text} ${colors.border}`}>
        
        {/* HEADER BLOCK */}
        <div className={`px-6 pt-7 pb-3 flex flex-col gap-1.5 shrink-0 relative border-b opacity-95 ${colors.border}`}>
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <span className={`text-[10px] font-sans tracking-[0.2em] uppercase font-bold block ${colors.muted}`}>
                Soliya Siargao
              </span>
              <h2 className="text-xl font-serif font-normal tracking-wide leading-tight">
                {success ? "Your Sanctuary Awaits" : "Begin Your Journey"}
              </h2>
            </div>

            <button
              onClick={onClose}
              className={`transition-colors duration-150 w-8 h-8 flex items-center justify-center active:scale-95 rounded-full hover:bg-zinc-500/10 ${colors.text}`}
              aria-label="Close dialog"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!success && (
            <div className={`pt-1 flex items-baseline gap-1.5 font-sans text-xs ${colors.muted}`}>
              <span className="font-serif text-xs font-medium opacity-90">Step {step}</span>
              <span className="opacity-50">/ 04</span>
            </div>
          )}
        </div>

        {/* MAIN BODY AREA */}
        <div className="overflow-y-auto px-6 py-4 flex-1 min-h-[280px]">
          {success ? (
            <div className="text-center py-10 flex flex-col items-center justify-center h-full animate-fadeIn duration-200">
              <div className={`flex items-center justify-center h-12 w-12 mb-4 border rounded-full bg-black/5 dark:bg-white/5 ${colors.border}`}>
                <svg className={`h-5 w-5 ${colors.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-serif tracking-wide">Sanctuary Requested</h3>
              <p className={`text-xs mt-2 max-w-xs mx-auto leading-relaxed ${colors.muted}`}>
                Our island concierge is reviewing allocations. We will connect with you via email shortly.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 py-1">
              
              {/* Live Itinerary Summary Widget */}
              {step < 4 && (
                <div className={`p-4 text-xs rounded-none border shadow-sm bg-black/[0.02] dark:bg-white/[0.02] ${colors.border}`}>
                  <div className={`text-[9px] font-sans tracking-[0.15em] uppercase font-bold mb-2 ${colors.muted}`}>Live Itinerary</div>
                  <div className="grid grid-cols-2 gap-4">
                    <p><span className={`${colors.muted} opacity-80 block text-[10px] uppercase tracking-wider`}>Sanctuary:</span> <span className="font-semibold block mt-0.5">{form.room || "Select a room"}</span></p>
                    <p><span className={`${colors.muted} opacity-80 block text-[10px] uppercase tracking-wider`}>Travelers:</span> <span className="font-semibold block mt-0.5">{form.guests} Guest{form.guests > 1 ? "s" : ""}</span></p>
                  </div>
                </div>
              )}

              {/* Step 4 Checkout Confirmation Bill Block */}
              {step === 4 && (
                <div className={`p-4 text-xs space-y-2.5 font-sans border shadow-sm bg-black/[0.02] dark:bg-white/[0.02] ${colors.border}`}>
                  <div className="flex justify-between items-center"><span className={colors.muted}>Selected Retreat:</span> <span className="font-bold">{form.room}</span></div>
                  <div className="flex justify-between items-center"><span className={colors.muted}>Total Travelers:</span> <span className="font-bold">{form.guests} Guest{form.guests !== 1 ? "s" : ""}</span></div>
                  <div className="flex justify-between items-center"><span className={colors.muted}>Dates Confirmed:</span> <span className="font-bold">{checkIn || "—"} — {checkOut || "—"}</span></div>
                  <div className={`flex justify-between items-center border-t pt-2.5 mt-1 ${colors.border}`}>
                    <span className="font-medium opacity-80">Total Duration:</span> 
                    <span className={`text-xs font-serif font-bold ${colors.accent}`}>{nights} Night{nights !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              )}

              {/* UNIVERSAL FORM UI RUNNER */}
              <form key={`form-step-${step}`} id="booking-universal-form" onSubmit={(e) => e.preventDefault()} className="will-change-opacity transition-opacity duration-150">
                <UniversalFormUI schema={currentSchema} values={formValues} onChange={onFormChange} className="space-y-5" />
              </form>

              {/* Active Night Stay Pill Badge Alert */}
              {step === 1 && nights > 0 && (
                <div className={`p-3.5 flex items-center gap-2.5 border bg-black/[0.01] dark:bg-white/[0.01] ${colors.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full bg-current opacity-60`} />
                  <p className="text-xs font-sans tracking-wide">
                    Configuring a beautiful <strong className="font-bold">{nights}-night</strong> stay at the resort.
                  </p>
                </div>
              )}

            </div>
          )}
        </div>

        {/* CONTROLS FOOTER */}
        {!success && (
          <div className={`flex justify-between items-center px-6 py-4 border-t shrink-0 ${colors.border}`}>
            {step > 1 ? (
              <button 
                type="button" 
                onClick={handleBack} 
                className={`text-xs font-bold tracking-[0.15em] uppercase opacity-70 hover:opacity-100 transition-opacity py-2 ${colors.text}`}
              >
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <Button 
                type="button" 
                onClick={handleNext} 
                className={`text-xs font-bold tracking-[0.15em] uppercase px-6 py-3 border-none transition-all duration-200 shadow-sm ${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover}`}
              >
                Continue
              </Button>
            ) : (
              <Button 
                type="submit" 
                onClick={onSubmit}
                className={`text-xs font-bold tracking-[0.15em] uppercase px-6 py-3 border-none transition-all duration-200 shadow-sm ${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover}`}
              >
                Confirm Reservation
              </Button>
            )}
          </div>
        )}
      </div>
    </UniversalModal>
  );
}