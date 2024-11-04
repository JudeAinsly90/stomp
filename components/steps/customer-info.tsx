"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function CustomerInfo({ bookingData, setBookingData, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerInfo = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      notes: formData.get("notes"),
    };

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setBookingData({
      ...bookingData,
      customerInfo,
    });

    onNext("payment");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            defaultValue={bookingData.customerInfo?.name}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={bookingData.customerInfo?.email}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={bookingData.customerInfo?.phone}
            required
          />
        </div>

        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            defaultValue={bookingData.customerInfo?.notes}
            placeholder="Any special requirements or requests?"
            className="h-32"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Continue to payment
        </Button>
      </div>
    </form>
  );
}