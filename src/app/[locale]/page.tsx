"use client";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import dayjs from "dayjs";
import Nav from "@/components/nav";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  useEffect(() => {
    console.log(dayjs(new Date().toISOString()).format("YYYY-MM-DD HH:mm:ss"));
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      <Nav />
      <div className="p-5">
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
