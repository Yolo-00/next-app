"use client";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import Nav from "@/components/nav";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      <Nav />
      <div className="p-5 h-screen-minus-nav">
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          numberOfMonths={2}
        />
      </div>
    </div>
  );
}
