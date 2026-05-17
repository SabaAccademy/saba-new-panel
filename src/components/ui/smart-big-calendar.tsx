"use client";

import React, { useMemo } from "react";
import {
  Calendar as BigCalendar,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment-timezone";
import "moment/locale/fa";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./smart-big-calendar.css"; // We will add some custom Tailwind overrides here

import jMoment from "moment-jalaali";

export type CalendarType = "jalali" | "gregorian";

export interface SmartBigCalendarProps {
  events: Array<{
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
    color?: string;
  }>;
  calendarType?: CalendarType;
  defaultView?: "month" | "week" | "day" | "agenda";
  defaultDate?: Date;
  onSelectEvent?: (event: any) => void;
  onSelectSlot?: (slotInfo: {
    start: Date;
    end: Date;
    action: "select" | "click" | "doubleClick";
  }) => void;
  className?: string;
}

// Ensure tz format matches for correct interpretation
moment.tz.setDefault("Asia/Tehran");
jMoment.loadPersian({ dialect: "persian-modern" });

export const SmartBigCalendar: React.FC<SmartBigCalendarProps> = ({
  events,
  calendarType = "gregorian",
  defaultView = "month",
  defaultDate,
  onSelectEvent,
  onSelectSlot,
  className,
}) => {
  const localizer = useMemo(() => {
    // If jalali is requested, we can use moment-jalaali localized
    if (calendarType === "jalali") {
      jMoment.locale("fa");
      moment.locale("fa");
      const jalaliLocalizer = momentLocalizer(jMoment);

      const mapUnit = (u: any) =>
        u === "year" ? "jYear" : u === "month" ? "jMonth" : u;

      const patch = (method: string, unitIndex: number) => {
        const original = (jalaliLocalizer as any)[method];
        (jalaliLocalizer as any)[method] = (...args: any[]) => {
          if (args[unitIndex]) {
            args[unitIndex] = mapUnit(args[unitIndex]);
          }
          return original(...args);
        };
      };

      patch("startOf", 1);
      patch("endOf", 1);
      patch("add", 2);
      patch("eq", 2);
      patch("neq", 2);
      patch("lt", 2);
      patch("lte", 2);
      patch("gt", 2);
      patch("gte", 2);
      patch("diff", 2);

      // Override display formats so Jalali values render correctly
      jalaliLocalizer.formats = {
        ...jalaliLocalizer.formats,
        dateFormat: "jDD",
        dayFormat: "jDD dddd",
        weekdayFormat: "dddd",
        timeGutterFormat: "LT",
        monthHeaderFormat: "jMMMM jYYYY",
        dayHeaderFormat: "dddd jDD jMMMM",
        dayRangeHeaderFormat: (
          { start, end }: any,
          culture?: string,
          local?: any,
        ) =>
          local.format(start, "jDD jMMMM", culture) +
          " — " +
          local.format(end, "jDD jMMMM jYYYY", culture),
        agendaDateFormat: "ddd jDD jMMM",
        agendaHeaderFormat: (
          { start, end }: any,
          culture?: string,
          local?: any,
        ) =>
          local.format(start, "jDD jMMMM", culture) +
          " — " +
          local.format(end, "jDD jMMMM jYYYY", culture),
      };

      return jalaliLocalizer;
    }

    moment.locale("en");
    return momentLocalizer(moment);
  }, [calendarType]);

  const eventPropGetter = (event: any) => {
    const backgroundColor = event.color || "#3b82f6";
    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
        padding: "2px 6px",
        fontSize: "12px",
        fontWeight: "500",
      },
    };
  };

  return (
    <div
      className={`smart-big-calendar-container bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${className || ""}`}
    >
      <BigCalendar
        localizer={localizer}
        culture={calendarType === "jalali" ? "fa" : "en"}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={defaultView}
        defaultDate={defaultDate || new Date()}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        eventPropGetter={eventPropGetter}
        className="min-h-[700px] font-sans"
        views={["month", "week", "day", "agenda"]}
        messages={
          calendarType === "jalali"
            ? {
                today: "امروز",
                previous: "قبلی",
                next: "بعدی",
                month: "ماه",
                week: "هفته",
                day: "روز",
                agenda: "برنامه",
                date: "تاریخ",
                time: "زمان",
                event: "رویداد",
                noEventsInRange: "هیچ رویدادی در این بازه وجود ندارد.",
                showMore: (total) => `+ ${total} رویداد دیگر`,
              }
            : {
                today: "Today",
                previous: "Back",
                next: "Next",
                month: "Month",
                week: "Week",
                day: "Day",
                agenda: "Agenda",
              }
        }
      />
    </div>
  );
};
