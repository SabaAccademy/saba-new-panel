"use client";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";

const ProfileWelcome = () => {
  const { t } = useLocale();
  return (
    <div className="relative flex items-center justify-between bg-lightsecondary rounded-lg p-6">
      <div className="flex items-center gap-3">
        <div>
          <Image
            src={"/images/profile/user-1.jpg"}
            alt="user-img"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <h5 className="card-title">{t.dashboard.welcomeBack} John 👋</h5>
          <p className="text-muted-foreground">{t.dashboard.checkReports}</p>
        </div>
      </div>
      <div className="hidden sm:block absolute end-8 bottom-0">
        <Image
          src={"/images/dashboard/customer-support-img.png"}
          alt="support-img"
          width={145}
          height={95}
        />
      </div>
    </div>
  );
};

export default ProfileWelcome;
