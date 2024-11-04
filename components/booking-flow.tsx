"use client";

import { useState } from "react";
import { DateSelection } from "./steps/date-selection";
import { PackageSelection } from "./steps/package-selection";
import { CustomerInfo } from "./steps/customer-info";
import { Payment } from "./steps/payment";
import { BookingConfirmation } from "./steps/booking-confirmation";

export type BookingStep = "date" | "package" | "info" | "payment" | "confirmation";

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("date");
  const [bookingData, setBookingData] = useState({
    startDate: null,
    endDate: null,
    startTime: "",
    selectedPackage: null,
    extraHours: 0,
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const steps = {
    date: {
      component: DateSelection,
      title: "Select Event Date & Time",
    },
    package: {
      component: PackageSelection,
      title: "Choose Your Package",
    },
    info: {
      component: CustomerInfo,
      title: "Your Information",
    },
    payment: {
      component: Payment,
      title: "Payment Details",
    },
    confirmation: {
      component: BookingConfirmation,
      title: "Booking Confirmed",
    },
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto">
      {currentStep !== "confirmation" && (
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">{steps[currentStep].title}</h1>
          <div className="flex justify-center gap-2">
            {Object.keys(steps).slice(0, -1).map((step, index) => (
              <div
                key={step}
                className={`w-16 h-1 rounded ${
                  Object.keys(steps).indexOf(currentStep) >= index
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-card rounded-lg shadow-lg p-6">
        <CurrentStepComponent
          bookingData={bookingData}
          setBookingData={setBookingData}
          onNext={(nextStep: BookingStep) => setCurrentStep(nextStep)}
        />
      </div>
    </div>
  );
}