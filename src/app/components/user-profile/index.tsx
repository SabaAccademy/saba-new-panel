"use client";
import Image from "next/image";
import CardBox from "../shared/CardBox";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { SetBreadcrumb } from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"personal" | "address" | null>(
    null,
  );

  const [personal, setPersonal] = useState({
    firstName: "Mathew",
    lastName: "Anderson",
    email: "mathew.anderson@gmail.com",
    phone: "(347) 528-1947",
    position: "Team Leader",
    facebook: "https://www.facebook.com/wrappixel",
    twitter: "https://twitter.com/wrappixel",
    github: "https://github.com/wrappixel",
    dribbble: "https://dribbble.com/wrappixel",
  });

  const [address, setAddress] = useState({
    location: "United States",
    state: "San Diego, California, United States",
    pin: "92101",
    zip: "30303",
    taxNo: "GA45273910",
  });

  const [tempPersonal, setTempPersonal] = useState(personal);
  const [tempAddress, setTempAddress] = useState(address);

  useEffect(() => {
    if (openModal && modalType === "personal") {
      setTempPersonal(personal);
    }
    if (openModal && modalType === "address") {
      setTempAddress(address);
    }
  }, [openModal, modalType, personal, address]);

  const handleSave = () => {
    if (modalType === "personal") {
      setPersonal(tempPersonal);
    } else if (modalType === "address") {
      setAddress(tempAddress);
    }
    setOpenModal(false);
  };

  const socialLinks = [
    {
      href: "https://www.facebook.com/wrappixel",
      icon: "streamline-logos:facebook-logo-2-solid",
    },
    {
      href: "https://twitter.com/wrappixel",
      icon: "streamline-logos:x-twitter-logo-solid",
    },
    { href: "https://github.com/wrappixel", icon: "ion:logo-github" },
    {
      href: "https://dribbble.com/wrappixel",
      icon: "streamline-flex:dribble-logo-remix",
    },
  ];

  return (
    <>
      <SetBreadcrumb
        title="پروفایل کاربری"
        items={[{ to: "/", title: "خانه" }, { title: "پروفایل کاربری" }]}
      />
      <div className="flex flex-col gap-6">
        <CardBox className="p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl relative w-full break-words">
            <div>
              <Image
                src={"/images/profile/user-1.jpg"}
                alt="image"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full">
              <div className="flex flex-col sm:text-left text-center gap-1.5">
                <h5 className="card-title">
                  {personal.firstName} {personal.lastName}
                </h5>
                <div className="flex flex-wrap items-center gap-1 md:gap-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {personal.position}
                  </p>
                  <div className="hidden h-4 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {address.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {socialLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                    className="flex h-11 w-11 items-center justify-center gap-2 rounded-full shadow-md border border-border hover:bg-gray-50 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                  >
                    <Icon icon={item.icon} width="20" height="20" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardBox>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6 rounded-xl border border-border  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">اطلاعات شخصی</h5>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="text-xs text-gray-500">نام</p>
                <p>{personal.firstName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">نام خانوادگی</p>
                <p>{personal.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">ایمیل</p>
                <p>{personal.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">تلفن</p>
                <p>{personal.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">سمت</p>
                <p>{personal.position}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setModalType("personal");
                  setOpenModal(true);
                }}
                color={"primary"}
                className="flex items-center gap-1.5 rounded-md"
              >
                <Icon icon="ic:outline-edit" width="18" height="18" /> Edit
              </Button>
            </div>
          </div>

          <div className="space-y-6 rounded-xl border border-border  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">جزئیات آدرس</h5>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="text-xs text-gray-500">کشور</p>
                <p>{address.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">استان / شهر</p>
                <p>{address.state}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">کد پستی</p>
                <p>{address.pin}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">کد زیپ</p>
                <p>{address.zip}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">کد مالیاتی</p>
                <p>{address.taxNo}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setModalType("address");
                  setOpenModal(true);
                }}
                color={"primary"}
                className="flex items-center gap-1.5 rounded-md"
              >
                <Icon icon="ic:outline-edit" width="18" height="18" /> Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="mb-4">
              {modalType === "personal"
                ? "ویرایش اطلاعات شخصی"
                : "ویرایش جزئیات آدرس"}
            </DialogTitle>
          </DialogHeader>

          {modalType === "personal" ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">نام</Label>
                <Input
                  id="firstName"
                  placeholder="نام"
                  value={tempPersonal.firstName}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">نام خانوادگی</Label>
                <Input
                  id="lastName"
                  placeholder="نام خانوادگی"
                  value={tempPersonal.lastName}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  placeholder="ایمیل"
                  value={tempPersonal.email}
                  onChange={(e) =>
                    setTempPersonal({ ...tempPersonal, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">تلفن</Label>
                <Input
                  id="phone"
                  placeholder="تلفن"
                  value={tempPersonal.phone}
                  onChange={(e) =>
                    setTempPersonal({ ...tempPersonal, phone: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="position">سمت</Label>
                <Input
                  id="position"
                  placeholder="سمت"
                  value={tempPersonal.position}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      position: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="facebook">لینک فیسبوک</Label>
                <Input
                  id="facebook"
                  placeholder="لینک فیسبوک"
                  value={tempPersonal.facebook}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      facebook: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="twitter">لینک توییتر</Label>
                <Input
                  id="twitter"
                  placeholder="لینک توییتر"
                  value={tempPersonal.twitter}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      twitter: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="github">لینک گیت‌هاب</Label>
                <Input
                  id="github"
                  placeholder="لینک گیت‌هاب"
                  value={tempPersonal.github}
                  onChange={(e) =>
                    setTempPersonal({ ...tempPersonal, github: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="dribbble">لینک دریبل</Label>
                <Input
                  id="dribbble"
                  placeholder="لینک دریبل"
                  value={tempPersonal.dribbble}
                  onChange={(e) =>
                    setTempPersonal({
                      ...tempPersonal,
                      dribbble: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="location">کشور</Label>
                <Input
                  id="location"
                  placeholder="کشور"
                  value={tempAddress.location}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, location: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="state">استان / شهر</Label>
                <Input
                  id="state"
                  placeholder="استان / شهر"
                  value={tempAddress.state}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, state: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="pin">کد پستی</Label>
                <Input
                  id="pin"
                  placeholder="کد پستی"
                  value={tempAddress.pin}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, pin: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="zip">کد زیپ</Label>
                <Input
                  id="zip"
                  placeholder="کد زیپ"
                  value={tempAddress.zip}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, zip: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="taxNo">کد مالیاتی</Label>
                <Input
                  id="taxNo"
                  placeholder="کد مالیاتی"
                  value={tempAddress.taxNo}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, taxNo: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2 mt-4">
            <Button
              color={"primary"}
              className="rounded-md"
              onClick={handleSave}
            >
              ذخیره تغییرات
            </Button>
            <Button
              color={"lighterror"}
              className="rounded-md bg-lighterror dark:bg-darkerror text-error hover:bg-error hover:text-white"
              onClick={() => setOpenModal(false)}
            >
              بستن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProfile;
