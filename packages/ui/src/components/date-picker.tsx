"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  onChange?: (value: Date | undefined) => void;
  value?: Date | string;
  className?: string;
  size?: "default" | "sm" | "lg";
}

const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  value,
  className,
  size = "default",
}) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (value) {
      const dateValue = typeof value === "string" ? new Date(value) : value;
      setDate(dateValue);
    } else {
      setDate(undefined);
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={size}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            setDate(value);
            if (onChange) onChange(value);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
