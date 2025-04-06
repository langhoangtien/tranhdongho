"use client";

import * as React from "react";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";
import { useEffect, useRef, useState } from "react";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon strokeWidth={1.25} />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

type DatePicker2Props = {
  value: Date | undefined;
  setValue: (value: Date | undefined) => void;
  className?: string;
};
export function DatePicker2({ value, setValue, className }: DatePicker2Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<Date>(new Date());
  const isInputting = useRef<boolean>(false); // Lưu trạng thái nhập

  // Cập nhật inputValue khi value thay đổi, tránh ghi đè khi người dùng đang nhập
  useEffect(() => {
    if (!isInputting.current) {
      setInputValue(value ? format(value, "dd/MM/yyyy") : "");
      if (value) setMonth(value);
    }
  }, [value]);

  const handleDayPickerSelect = (date?: Date) => {
    isInputting.current = false; // Kết thúc nhập
    if (!date) {
      setInputValue("");
      setValue(undefined);
    } else {
      setValue(date);
      setMonth(date);
      setInputValue(format(date, "dd/MM/yyyy"));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    isInputting.current = true; // Đánh dấu đang nhập

    const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());
    if (isValid(parsedDate)) {
      setValue(parsedDate);
      setMonth(parsedDate);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="absolute inset-y-0 start-0 flex cursor-pointer items-center ps-3.5"
        >
          <CalendarIcon className="size-4 text-gray-500 dark:text-gray-400" />
        </div>

        <Input
          className={cn(
            "w-[280px] p-2 ps-10",
            !value && "text-muted-foreground",
            className
          )}
          placeholder="dd/MM/yyyy"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => (isInputting.current = false)} // Khi mất focus, cho phép cập nhật từ value
        />
        <PopoverTrigger className="absolute w-[280px]">
          <div />
        </PopoverTrigger>
      </div>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={value || undefined}
          onSelect={handleDayPickerSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
