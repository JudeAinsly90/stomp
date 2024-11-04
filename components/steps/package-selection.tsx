"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NumberStepper } from "@/components/ui/number-stepper";
import { Sparkles, Zap } from "lucide-react";

const packages = [
  {
    id: "standard",
    name: "Standard Package",
    price: 1999,
    features: [
      "12x12 LED Dance Floor",
      "Professional Installation",
      "12 Hours Rental",
      "Basic Pattern Library",
      "Technical Support",
    ],
    icon: Zap,
  },
  {
    id: "premium",
    name: "Premium Package",
    price: 2999,
    features: [
      "16x16 LED Dance Floor",
      "Professional Installation",
      "12 Hours Rental",
      "Extended Pattern Library",
      "Interactive Mode",
      "Priority Support",
      "Custom Color Themes",
    ],
    icon: Sparkles,
  },
];

export function PackageSelection({ bookingData, setBookingData, onNext }) {
  const handlePackageSelect = (packageId) => {
    const selectedPackage = packages.find((p) => p.id === packageId);
    setBookingData({
      ...bookingData,
      selectedPackage,
      extraHours: 0,
    });
  };

  const handleExtraHours = (hours) => {
    setBookingData({
      ...bookingData,
      extraHours: hours,
    });
  };

  const calculateTotal = () => {
    if (!bookingData.selectedPackage) return 0;
    return (
      bookingData.selectedPackage.price + (bookingData.extraHours || 0) * 250
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <Card
              key={pkg.id}
              className={`p-6 cursor-pointer transition-all ${
                bookingData.selectedPackage?.id === pkg.id
                  ? "border-primary ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon className="h-6 w-6" />
                <h3 className="text-xl font-semibold">{pkg.name}</h3>
              </div>
              <p className="text-2xl font-bold mb-4">${pkg.price}</p>
              <ul className="space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {bookingData.selectedPackage && (
        <div className="space-y-4">
          <div>
            <Label>Additional Hours (${(bookingData.extraHours || 0) * 250})</Label>
            <div className="mt-1.5">
              <NumberStepper
                value={bookingData.extraHours || 0}
                onChange={handleExtraHours}
                max={4}
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg">Total Price:</span>
              <span className="text-2xl font-bold">
                ${calculateTotal().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={() => onNext("info")}
          size="lg"
          disabled={!bookingData.selectedPackage}
        >
          Continue to personal details
        </Button>
      </div>
    </div>
  );
}