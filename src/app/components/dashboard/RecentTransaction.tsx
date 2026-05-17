"use client";
import Link from "next/link";
import CardBox from "../shared/CardBox";
import { useLocale } from "@/lib/i18n/context";

export const RecentTransaction = () => {
  const { t } = useLocale();
  const timelineData = [
    {
      key: "timeline1",
      time: "09:30 am",
      desc: t.dashboard.txPaymentReceived,
      isSale: false,
      borderColor: "border-primary",
      isLastItem: false,
    },
    {
      key: "timeline2",
      time: "10:00 am",
      desc: t.dashboard.txNewSale,
      isSale: true,
      borderColor: "border-info",
      isLastItem: false,
    },
    {
      key: "timeline3",
      time: "12:00 am",
      desc: t.dashboard.txPaymentMade,
      isSale: false,
      borderColor: "border-success",
      isLastItem: false,
    },
    {
      key: "timeline4",
      time: "09:30 am",
      desc: t.dashboard.txNewSale,
      isSale: true,
      borderColor: "border-warning",
      isLastItem: false,
    },
    {
      key: "timeline5",
      time: "09:30 am",
      desc: t.dashboard.txNewSale,
      isSale: true,
      borderColor: "border-error",
      isLastItem: false,
    },
    {
      key: "timeline6",
      time: "12:00 am",
      desc: t.dashboard.txPaymentDone,
      isSale: false,
      borderColor: "border-success",
      isLastItem: true,
    },
  ];
  return (
    <CardBox className="h-full w-full">
      <div className="flex flex-col">
        <h5 className="card-title">{t.dashboard.recentTransactions}</h5>
        <p className="text-sm text-muted-foreground font-normal">
          {t.dashboard.howToSecure}
        </p>
      </div>
      <div className="mt-6">
        {timelineData.map((item) => {
          return (
            <div key={item.key} className="flex gap-x-3">
              <div className="w-1/4 text-end">
                <span className="font-medium text-foreground dark:text-muted-foreground">
                  {item.time}
                </span>
              </div>
              <div
                className={`relative ${
                  item.isLastItem ? "after:hidden" : null
                } after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-border`}
              >
                <div className="relative z-1 w-7 h-7 flex justify-center items-center">
                  <div
                    className={`h-3 w-3 rounded-full bg-transparent border-2 ${item.borderColor}`}
                  ></div>
                </div>
              </div>
              <div className="w-1/4 grow pt-0.5 pb-6">
                {!item.isSale ? (
                  <p className="font-medium text-foreground dark:text-muted-foreground">
                    {item.desc}
                  </p>
                ) : (
                  <div>
                    <h6>{t.dashboard.txNewSale}</h6>
                    <Link href="#" className="text-primary">
                      #ML-3467
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CardBox>
  );
};
