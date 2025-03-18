"use client";
import { useState } from "react";
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
const Page = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dates, setDates] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  return (
    <div className="p-5">
      <div className="text-2xl font-semibold mb-5">Calendar</div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "yyyy年MM月dd日") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="mt-5">{date ? format(date, "yyyy年MM月dd日") : ""}</div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border inline-block"
      />

      <div className="mt-5">
        {dates?.from ? format(dates.from, "yyyy年MM月dd日") : ""}
        {dates?.from && dates?.to ? " - " : ""}
        {dates?.to ? format(dates.to, "yyyy年MM月dd日") : ""}
      </div>
      <Calendar
        mode="range"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border inline-block"
        numberOfMonths={2}
      />
    </div>
  );
};
export default Page;
