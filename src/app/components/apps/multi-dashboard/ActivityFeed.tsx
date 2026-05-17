"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "@/app/components/shared/CardBox";
import type { ActivityItem } from "./types";

interface ActivityFeedProps {
  items: ActivityItem[];
}

const ActivityFeed = ({ items }: ActivityFeedProps) => {
  return (
    <CardBox className="flex flex-col gap-4">
      <h4 className="text-base font-semibold text-foreground">
        فعالیت‌های اخیر
      </h4>
      <div className="relative flex flex-col gap-0">
        {items.map((item, idx) => (
          <div key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
            {/* Vertical line */}
            {idx < items.length - 1 && (
              <div className="absolute right-[18px] top-9 bottom-0 w-px bg-border dark:bg-white/10" />
            )}

            {/* Icon */}
            <div
              className={[
                "shrink-0 flex items-center justify-center w-9 h-9 rounded-full mt-0.5 z-10",
                item.iconBg,
              ].join(" ")}
            >
              <Icon icon={item.icon} width={18} className={item.iconColor} />
            </div>

            {/* Content */}
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground leading-snug">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {item.subtitle}
              </p>
              <span className="text-xs text-muted-foreground/70 mt-1">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardBox>
  );
};

export default ActivityFeed;
