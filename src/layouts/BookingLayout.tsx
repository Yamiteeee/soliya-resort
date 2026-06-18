"use client";

import React, { useMemo, startTransition } from "react";
import UniversalModal from "@/components/UniversalModal";
import UniversalFormUI from "@/components/UniversalFormUI";
import Button from "@/components/Button";
import { useTheme } from "@/hooks/useThemeprovider";
import { getSchemaForStep, SANCTUARY_ROOM_STATUS } from "@/provider/Mockdata";

// 1. ISOLATED PURE SUB-COMPONENTS FOR PREVENTING RE-RENDER OVERHEAD
const ItinerarySummaryCard = React.memo(({ 
  step, 
  form, 
  checkIn, 
  checkOut, 
  nights, 
  colors,
  priceSummary 
}: {
  step: number;
  form: Record<string, any>;
  checkIn: string;
  checkOut: string;
  nights: number;
  colors: any;
  priceSummary: { pricePerNight: number; nights: number; subtotal: number; luxuryTax: number; total: number };
}) => {
  if (step < 4) {
    return (
      <div className={`p-4 text-xs rounded-none border shadow-sm ${colors.surface} ${colors.border}`}>
        <div className={`text-[9px] font-sans tracking-[0.15em] uppercase font-bold mb-2 ${colors.muted}`}>
          Live Itinerary
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className={`block text-[10px] uppercase tracking-wider font-medium ${colors.muted}`}>Sanctuary:</span> 
            <span className={`font-bold block mt-0.5 ${colors.text}`}>{form.room || "Select a room"}</span>
          </div>
          <div>
            <span className={`block text-[10px] uppercase tracking-wider font-medium ${colors.muted}`}>Travelers:</span> 
            <span className={`font-bold block mt-0.5 ${colors.text}`}>{form.guests || 1} Guest{(form.guests || 1) > 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 text-xs space-y-2.5 font-sans border shadow-sm ${colors.surface} ${colors.border}`}>
      <div className="flex justify-between items-center"><span className={`${colors.muted} font-medium`}>Selected Retreat:</span> <span className={`font-bold ${colors.text}`}>{form.room}</span></div>
      <div className="flex justify-between items-center"><span className={`${colors.muted} font-medium`}>Total Travelers:</span> <span className={`font-bold ${colors.text}`}>{form.guests || 1} Guest{(form.guests || 1) !== 1 ? "s" : ""}</span></div>
      <div className="flex justify-between items-center"><span className={`${colors.muted} font-medium`}>Dates Confirmed:</span> <span className={`font-bold ${colors.text}`}>{checkIn || "—"} — {checkOut || "—"}</span></div>
      <div className="flex justify-between items-center"><span className={`${colors.muted} font-medium`}>Nightly Premium Rate:</span> <span className={`font-bold ${colors.text}`}>${priceSummary.pricePerNight}</span></div>
      <div className="flex justify-between items-center"><span className={`${colors.muted} font-medium`}>Destination Fee (12%):</span> <span className={`font-bold ${colors.text}`}>${(priceSummary.luxuryTax || 0).toFixed(2)}</span></div>
      <div className={`flex justify-between items-center border-t pt-2.5 mt-1 ${colors.border}`}>
        <span className={`font-semibold ${colors.text}`}>Total Duration:</span> 
        <span className={`text-xs font-serif font-bold ${colors.accent}`}>{nights} Night{nights !== 1 ? "s" : ""}</span>
      </div>
      <div className={`flex justify-between items-center pt-2 text-sm border-t border-dashed ${colors.border}`}>
        <span className={`font-bold uppercase tracking-wider text-[10px] ${colors.text}`}>Estimated Valuation:</span>
        <span className={`text-sm font-bold ${colors.text}`}>${(priceSummary.total || 0).toFixed(2)}</span>
      </div>
    </div>
  );
});
ItinerarySummaryCard.displayName = "ItinerarySummaryCard";

interface BookingLayoutComponentProps {
  hookData: ReturnType<typeof import("@/hooks/useBooking").useBooking>;
}

export default function BookingLayout({ hookData }: BookingLayoutComponentProps) {
  const { colors } = useTheme();

  const {
    isOpen,
    success,
    step,
    form,
    checkIn,
    checkOut,
    nights,
    calendarDays,
    priceSummary,
    isRoomOccupied,
    onFormChange,
    onNext,
    onBack,
    closeBooking,
    onSubmit,
  } = hookData;

  const currentSchema = useMemo(() => getSchemaForStep(step), [step]);

  const hasDatesInSchema = useMemo(() => {
    return currentSchema.some(field => field.name === "checkIn" || field.name === "checkOut");
  }, [currentSchema]);

  const formValues = useMemo(() => ({
    ...form,
    checkIn,
    checkOut
  }), [form, checkIn, checkOut]);

  const currentRoomMeta = useMemo(() => {
    return SANCTUARY_ROOM_STATUS.find(r => r.name.toLowerCase() === (form.room || "").toLowerCase());
  }, [form.room]);

  // STALEMATE GUARD: Checks if selected range breaks real hard-occupied zones (Days 1 to 4)
  // Day 5 is allowed for check-in, but can't be trapped strictly inside an extended occupation block
  const isSelectionConflicting = useMemo(() => {
    if (currentRoomMeta?.status !== "Occupied" || !checkIn || !checkOut) return false;

    const startDay = parseInt(checkIn.split("-")[2], 10);
    const endDay = parseInt(checkOut.split("-")[2], 10);

    // Conflict occurs if they try to check in BEFORE day 5, or stay inside days 1-4
    return (startDay < 5 && endDay >= 1);
  }, [currentRoomMeta, checkIn, checkOut]);

  // COMBINED STEP VALIDATOR
  const isFormInvalid = useMemo(() => {
    if (step === 1 && !form.room) return true;
    return isSelectionConflicting;
  }, [step, form.room, isSelectionConflicting]);

  // FIXED RE-CALCULATED VALUE COMPOSER
  const calculatedSummary = useMemo(() => {
    const rate = currentRoomMeta ? currentRoomMeta.pricePerNight : (priceSummary?.pricePerNight || 0);
    const activeNights = nights || 0;
    const subtotal = rate * activeNights;
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    return {
      pricePerNight: rate,
      nights: activeNights,
      subtotal: subtotal,
      luxuryTax: tax,
      total: total
    };
  }, [currentRoomMeta, priceSummary, nights]);

  const handleNext = () => {
    if (isFormInvalid) return; 
    startTransition(() => onNext());
  };

  const handleBack = () => startTransition(() => onBack());

  return (
    <UniversalModal isOpen={isOpen} onClose={closeBooking} className="max-w-4xl mx-auto">
      <div className={`w-full h-auto max-h-[90vh] flex flex-col overflow-hidden shadow-2xl rounded-sm border ${colors.contentBg} ${colors.text} ${colors.border}`}>
        
        {/* HEADER BLOCK */}
        <div className={`px-6 pt-6 pb-3 flex flex-col gap-1.5 shrink-0 relative border-b ${colors.border}`}>
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
              onClick={closeBooking}
              className={`w-8 h-8 flex items-center justify-center active:scale-95 rounded-full hover:bg-zinc-500/10 ${colors.text}`}
              aria-label="Close dialog"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!success && (
            <div className="pt-1 flex items-center justify-between font-sans text-xs">
              <div className={`flex items-baseline gap-1.5 ${colors.muted}`}>
                <span className="font-serif text-xs font-medium opacity-90">Step {step}</span>
                <span className="opacity-50">/ 04</span>
              </div>
              {currentRoomMeta && (
                <span className={`text-[10px] px-2 py-0.5 border font-bold tracking-wider uppercase ${colors.surface} ${colors.text} ${colors.border}`}>
                  {currentRoomMeta.status} (${currentRoomMeta.pricePerNight}/night)
                </span>
              )}
            </div>
          )}
        </div>

        {/* ROOM SELECTOR BAR (ONLY VISIBLE ON STEP 1) */}
        {!success && step === 1 && (
          <div className={`px-6 py-3 border-b flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between ${colors.surface} ${colors.border}`}>
            <label className={`text-[10px] font-sans font-bold uppercase tracking-wider shrink-0 ${colors.text}`}>
              Select Sanctuary Architecture:
            </label>
            <div className="grid grid-cols-3 gap-1.5 w-full sm:max-w-xl">
              {SANCTUARY_ROOM_STATUS.map((roomItem) => {
                const isSelected = form.room?.toLowerCase() === roomItem.name.toLowerCase();
                return (
                  <button
                    key={roomItem.id}
                    type="button"
                    onClick={() => onFormChange("room", roomItem.name)}
                    className={`px-2.5 py-2 text-left text-[11px] font-sans border flex flex-col justify-between h-14 transition-colors ${
                      isSelected 
                        ? `${colors.btnPrimaryBg} ${colors.btnPrimaryText} font-bold shadow-sm border-transparent` 
                        : `${colors.contentBg} ${colors.text} ${colors.border} hover:opacity-80`
                    }`}
                  >
                    <span className="truncate block w-full">{roomItem.name}</span>
                    <div className="flex justify-between items-center w-full mt-1">
                      <span className={`font-serif font-bold ${isSelected ? colors.textLight : colors.muted}`}>
                        ${roomItem.pricePerNight}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${roomItem.status === "Occupied" ? "bg-amber-500" : "bg-emerald-500"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MAIN BODY AREA */}
        <div className="overflow-y-auto px-6 py-4 flex-1 min-h-[45vh]">
          {success ? (
            <div className="text-center py-10 flex flex-col items-center justify-center h-full transition-opacity duration-200">
              <div className={`flex items-center justify-center h-12 w-12 mb-4 border rounded-full ${colors.surface} ${colors.border}`}>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-1">
              
              {/* FORM PANEL CONTAINER */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <ItinerarySummaryCard 
                  step={step} 
                  form={form} 
                  checkIn={checkIn} 
                  checkOut={checkOut} 
                  nights={nights} 
                  colors={colors}
                  priceSummary={calculatedSummary}
                />

                <form 
                  key={`form-step-${step}`} 
                  id="booking-universal-form" 
                  onSubmit={(e) => e.preventDefault()}
                >
                  <UniversalFormUI 
                    schema={currentSchema.filter(field => field.name !== "room")}
                    values={formValues} 
                    onChange={onFormChange} 
                    isRoomOccupiedFn={isRoomOccupied}
                    className="space-y-5" 
                  />
                </form>

                {nights > 0 && (
                  <div className={`p-3.5 flex items-center gap-2.5 border ${colors.surface} ${colors.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${currentRoomMeta?.status === "Occupied" ? "bg-amber-500" : "bg-emerald-600"}`} />
                    <p className={`text-xs font-sans tracking-wide ${colors.text}`}>
                      Configuring a beautiful <strong className="font-bold">{nights}-night</strong> stay at the resort {form.room ? `in the ${form.room}` : ""}.
                    </p>
                  </div>
                )}
              </div>

              {/* PERMANENT SIDEBAR */}
              <div className={`lg:col-span-5 space-y-6 p-5 rounded-sm border h-fit ${colors.surface} ${colors.border}`}>
                {hasDatesInSchema && (
                  <div>
                    <div className="flex justify-between items-baseline mb-3">
                      <span className={`block text-[9px] font-sans font-bold uppercase tracking-[0.2em] ${colors.muted}`}>
                        Live Schedule Grid ({new Date().toLocaleString('default', { month: 'long' })})
                      </span>
                      {currentRoomMeta?.status === "Occupied" && (
                        <span className="text-[8px] font-bold text-amber-900 uppercase bg-amber-100 px-1.5 py-0.5 border border-amber-300 rounded-sm">
                          Room Occupied
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-sans">
                      {["S", "M", "T", "W", "T", "F", "S"].map((w, i) => (
                        <span key={i} className={`font-bold py-1 ${colors.muted}`}>{w}</span>
                      ))}
                      {calendarDays.map((item, idx) => {
                        const isOccupiedRoom = currentRoomMeta?.status === "Occupied";
                        // Day 1 to 4 are hard blocked (Gray out)
                        const isHardBlocked = isOccupiedRoom && item.day !== null && item.day >= 1 && item.day <= 4;
                        // Day 5 is Checkout Day (Can check-in, styled with custom amber notification text)
                        const isCheckoutDay = isOccupiedRoom && item.day === 5;
                        
                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={!item.day || isHardBlocked}
                            onClick={() => {
                              if (!item.dateStr) return;
                              if (!formValues.checkIn || (formValues.checkIn && formValues.checkOut)) {
                                onFormChange("checkIn", item.dateStr);
                                onFormChange("checkOut", "");
                              } else if (formValues.checkIn && item.dateStr > formValues.checkIn) {
                                onFormChange("checkOut", item.dateStr);
                              }
                            }}
                            className={`h-7 rounded-sm text-center flex flex-col items-center justify-center font-semibold text-[11px] relative transition-colors ${
                              !item.day ? "opacity-0 pointer-events-none" : ""
                            } ${
                              isHardBlocked 
                                ? "bg-zinc-300/70 text-zinc-400 line-through cursor-not-allowed" 
                                : item.type === "selected" 
                                ? `${colors.btnPrimaryBg} ${colors.btnPrimaryText} font-bold` 
                                : item.type === "between" 
                                ? "bg-zinc-200/80 text-zinc-900" 
                                : isCheckoutDay
                                ? "bg-amber-50 text-amber-800 border border-amber-300/70"
                                : `${colors.contentBg} ${colors.text} border ${colors.border} hover:opacity-80`
                            }`}
                          >
                            <span>{item.day}</span>
                            {isCheckoutDay && item.type !== "selected" && (
                              <span className="absolute bottom-0 text-[6px] tracking-tight uppercase scale-90 font-bold opacity-80 text-amber-700 leading-none pb-0.5">
                                Out
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* VALUATION ARCHITECTURE BLOCK */}
                <div className={`${hasDatesInSchema ? "border-t pt-4" : ""} space-y-3 font-sans ${colors.border}`}>
                  <span className={`block text-[9px] font-sans font-bold uppercase tracking-[0.2em] ${colors.muted}`}>
                    Valuation Architecture
                  </span>
                  
                  <div className={`space-y-1.5 text-xs ${colors.text}`}>
                    <div className="flex justify-between">
                      <span>Selected Refuge:</span>
                      <span className="font-bold truncate max-w-[150px]">{form.room || "None Selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nightly Premium Rate:</span>
                      <span className="font-bold">${calculatedSummary.pricePerNight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calculated Stay Duration:</span>
                      <span className="font-bold">{calculatedSummary.nights} night{calculatedSummary.nights === 1 ? "" : "s"}</span>
                    </div>
                    <div className={`flex justify-between border-t pt-2 ${colors.border}`}>
                      <span>Subtotal:</span>
                      <span className="font-bold">${calculatedSummary.subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className={`flex justify-between items-baseline pt-2 border-t ${colors.border}`}>
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${colors.text}`}>Estimated Total</span>
                    <span className={`text-base font-bold tracking-tight ${colors.accent}`}>
                      ${calculatedSummary.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

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
                className={`text-xs font-bold tracking-[0.15em] uppercase ${colors.text} hover:opacity-70 transition-opacity py-2`}
              >
                Back
              </button>
            ) : <div />}

            {/* CONDITIONAL ACTION ERROR MESSAGE BANNERS */}
            {step === 1 && !form.room && (
              <span className="text-[10px] font-sans font-bold uppercase text-amber-700 tracking-wider">
                Please choose a room architecture to begin
              </span>
            )}
            {isSelectionConflicting && (
              <span className="text-[10px] font-sans font-bold uppercase text-red-700 tracking-wider">
                Dates unavailable for this room selection
              </span>
            )}

            {step < 4 ? (
              <Button 
                type="button" 
                onClick={handleNext} 
                disabled={isFormInvalid}
                className={`text-xs font-bold tracking-[0.15em] uppercase px-6 py-3 border-none shadow-sm transition-opacity ${
                  isFormInvalid ? "opacity-40 cursor-not-allowed" : ""
                } ${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover}`}
              >
                Continue
              </Button>
            ) : (
              <Button 
                type="submit" 
                onClick={onSubmit}
                disabled={isFormInvalid}
                className={`text-xs font-bold tracking-[0.15em] uppercase px-6 py-3 border-none shadow-sm transition-opacity ${
                  isFormInvalid ? "opacity-40 cursor-not-allowed" : ""
                } ${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover}`}
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