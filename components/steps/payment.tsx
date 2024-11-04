"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreditCard, Paypal } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface PaymentProps {
  bookingData: {
    selectedPackage: {
      name: string;
      price: number;
    };
    startDate: Date;
    startTime: string;
    extraHours: number;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      notes: string;
    };
  };
  onNext: (step: string) => void;
}

export function Payment({ bookingData, onNext }: PaymentProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handlePayment = (method: "stripe" | "paypal") => {
    if (!acceptedTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Processing payment...",
        success: "Payment successful!",
        error: "Payment failed. Please try again.",
      }
    ).then(() => {
      onNext("confirmation");
    });
  };

  const calculateTotal = () => {
    return bookingData.selectedPackage.price + (bookingData.extraHours || 0) * 250;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Package:</span>
            <span>{bookingData.selectedPackage.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>
              {bookingData.startDate.toLocaleDateString()} at{" "}
              {bookingData.startTime}
            </span>
          </div>
          {bookingData.extraHours > 0 && (
            <div className="flex justify-between">
              <span>Extra Hours:</span>
              <span>
                {bookingData.extraHours} (+$
                {(bookingData.extraHours * 250).toLocaleString()})
              </span>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </Label>
          <p className="text-sm text-muted-foreground">
            I agree to the terms of service and privacy policy.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Button
          onClick={() => handlePayment("stripe")}
          className="h-16"
          variant="outline"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Pay with Card
        </Button>
        <Button
          onClick={() => handlePayment("paypal")}
          className="h-16"
          variant="outline"
        >
          <Paypal className="mr-2 h-5 w-5" />
          Pay with PayPal
        </Button>
      </div>
    </div>
  );
}