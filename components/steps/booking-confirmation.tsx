"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function BookingConfirmation({ bookingData }) {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Thank you for choosing Stomp Sphere. Your booking details have been sent to your email.
        </p>
      </div>

      <Card className="p-6 text-left">
        <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Package:</span>
            <span>{bookingData.selectedPackage?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span>
              {bookingData.startDate?.toLocaleDateString()} at {bookingData.startTime}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span>
              12{bookingData.extraHours > 0 ? ` + ${bookingData.extraHours}` : ""} hours
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Price:</span>
            <span className="font-bold">
              ${(bookingData.selectedPackage?.price + (bookingData.extraHours || 0) * 250).toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          A confirmation email has been sent to {bookingData.customerInfo?.email}
        </p>
        <p className="text-sm text-muted-foreground">
          If you have any questions, please contact our support team.
        </p>
      </div>

      <Button onClick={() => window.location.reload()} size="lg">
        Book Another Event
      </Button>
    </div>
  );
}