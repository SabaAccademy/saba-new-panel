"use client";

import React, { useState } from "react";
import { SmartBigCalendar, CalendarType } from "@/components/ui/smart-big-calendar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const mockEvents = [
  {
    title: "Lunch with Mr.Raw",
    start: new Date(2026, 4, 2, 12, 0), // Month 4 is May
    end: new Date(2026, 4, 2, 14, 0),
    color: "#4f46e5", // Indigo
  },
  {
    title: "Twice event For two Days",
    start: new Date(2026, 4, 3),
    end: new Date(2026, 4, 4, 23, 59),
    allDay: true,
    color: "#38bdf8", // Light blue
  },
  {
    title: "Going For Party of Sahs",
    start: new Date(2026, 4, 4),
    end: new Date(2026, 4, 5, 23, 59),
    allDay: true,
    color: "#818cf8", // Blue darker
  },
  {
    title: "Learn ReactJs",
    start: new Date(2026, 4, 6),
    end: new Date(2026, 4, 6, 23, 59),
    allDay: true,
    color: "#2dd4bf", // Teal
  },
  {
    title: "Launching MaterialArt Angul...",
    start: new Date(2026, 4, 11),
    end: new Date(2026, 4, 11, 23, 59),
    allDay: true,
    color: "#f43f5e", // Rose/Red
  },
  {
    title: "Research of making own Browser",
    start: new Date(2026, 4, 19),
    end: new Date(2026, 4, 21, 23, 59),
    allDay: true,
    color: "#38bdf8", // Light blue
  },
  {
    title: "Learn Ionic",
    start: new Date(2026, 4, 22),
    end: new Date(2026, 4, 23, 23, 59),
    allDay: true,
    color: "#fbbf24", // Orange/Amber
  },
  {
    title: "Learn Ionic",
    start: new Date(2026, 4, 24),
    end: new Date(2026, 4, 24, 23, 59),
    allDay: true,
    color: "#fbbf24", // Orange/Amber
  },
];

export default function CalendarPage() {
  const [calendarType, setCalendarType] = useState<CalendarType>("gregorian");

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full">
      {/* Header Widget */}
      <div className="bg-blue-50/50 relative overflow-hidden rounded-2xl px-6 py-8 border border-blue-100 flex flex-col justify-center min-h-[140px]">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Calendar</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-slate-500">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-slate-800">Calendar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Decorative graphic matching image */}
        <div className="absolute right-8 bottom-0 w-[140px] h-auto hidden md:block">
          <img 
            src="/images/backgrounds/chatbot.png"
            alt="Calendar Decorative" 
            className="w-full h-auto object-cover drop-shadow-md"
            onError={(e) => {
              // Fallback to a different image if chatbot.png doesn't exist
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mb-2">
        <div className="flex items-center gap-3">
          <Label className="text-sm font-medium text-slate-600">Calendar System:</Label>
          <Select value={calendarType} onValueChange={(v) => setCalendarType(v as CalendarType)}>
            <SelectTrigger className="w-[160px] bg-white">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gregorian">Gregorian (Standard)</SelectItem>
              <SelectItem value="jalali">Jalali (Persian)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Calendar View */}
      <div className="w-full">
        <SmartBigCalendar
          events={mockEvents}
          calendarType={calendarType}
          defaultDate={new Date(2026, 4, 1)} // Set to May 2026 as shown in screenshot
        />
      </div>
    </div>
  );
}
