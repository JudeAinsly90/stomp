"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function DateSelection({ bookingData, setBookingData, onNext }) {
  const [startDate, setStartDate] = useState(bookingData.startDate);
  const [endDate, setEndDate] = useState(bookingData.endDate);
  const [startTime, setStartTime] = useState(bookingData.startTime);

  const handleNext = () => {
    if (!startDate || !endDate || !startTime) {
      toast.error("Please select both dates and time");
      return;
    }

    setBookingData({
      ...bookingData,
      startDate,
      endDate,
      startTime,
    });

    onNext("package");
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Event Start Date</Label>
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Event End Date</Label>
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
            className="rounded-md border"
            disabled={(date) => !startDate || date < startDate}
          />
        </div>
      </div>

      <div className="max-w-xs">
        <Label>Event Start Time</Label>
        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} size="lg">
          Continue to panel size
        </Button>
      </div>
    </div>
  );
}