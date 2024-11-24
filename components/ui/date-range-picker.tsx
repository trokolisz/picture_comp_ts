"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

export function DatePickerWithRange({
  date,
  onChange
}: {
  date: DateRange | undefined
  onChange: (date: DateRange | undefined) => void
}) {
  return (
    <div className="grid gap-2">
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={onChange}
        numberOfMonths={2}
      />
    </div>
  )
}