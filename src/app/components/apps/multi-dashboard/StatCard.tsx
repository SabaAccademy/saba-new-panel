"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "@/app/components/shared/CardBox";
import type { StatCardData } from "./types";

interface StatCardProps {
  data: StatCardData;
}

const StatCard = ({ data }: StatCardProps) => {
  const isUp = data.changeType === "up";
  const isDown = data.changeType === "down";

  return (
    <CardBox className="flex items-center justify-between gap-4 p-5 transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-sm text-muted-foreground font-medium truncate">
          {data.label}
        </p>
        <h3 className="text-2xl font-bold text-foreground leading-tight">
          {data.value}
        </h3>
        <span
          className={[
            "inline-flex items-center gap-1 text-xs font-semibold w-fit rounded-full px-2 py-0.5",
            isUp
              ? "bg-success/10 text-success"
              : isDown
                ? "bg-error/10 text-error"
                : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {isUp && <Icon icon="solar:arrow-up-linear" width={12} />}
          {isDown && <Icon icon="solar:arrow-down-linear" width={12} />}
          {data.change}
        </span>
      </div>
      <div
        className={[
          "flex shrink-0 items-center justify-center rounded-xl w-14 h-14",
          data.iconBg,
        ].join(" ")}
      >
        <Icon icon={data.icon} width={28} className={data.iconColor} />
      </div>
    </CardBox>
  );
};

export default StatCard;
