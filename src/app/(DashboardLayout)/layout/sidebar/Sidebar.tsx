"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import SidebarContent from "./sidebaritems";
import SimpleBar from "simplebar-react";
import { Icon } from "@iconify/react";
import FullLogo from "../shared/logo/FullLogo";
import { Button } from "@/components/ui/button";
import {
  AMLogo,
  AMMenu,
  AMMenuItem,
  AMSidebar,
  AMSubmenu,
} from "tailwind-sidebar";
import "tailwind-sidebar/styles.css";
import { useLocale } from "@/lib/i18n/context";
import type { Translations } from "@/lib/i18n/translations/fa";
import { useColorTheme } from "@/lib/theme/ThemeCustomizerContext";

interface SidebarItemType {
  heading?: string;
  id?: number | string;
  name?: string;
  title?: string;
  icon?: string;
  url?: string;
  children?: SidebarItemType[];
  disabled?: boolean;
  isPro?: boolean;
  isNew?: boolean;
}

function translateHeading(heading: string, t: Translations): string {
  return t.sidebar.headings[heading] ?? heading;
}

function translateName(
  name: string | undefined,
  t: Translations,
): string | undefined {
  if (!name) return name;
  return t.sidebar.items[name] ?? name;
}

const renderSidebarItems = (
  items: SidebarItemType[],
  currentPath: string,
  t: Translations,
  onClose?: () => void,
  isSubItem: boolean = false,
) => {
  return items.map((item, index) => {
    const isSelected = currentPath === item?.url;
    const IconComp = item.icon || null;

    const iconElement = IconComp ? (
      <Icon icon={IconComp} height={21} width={21} />
    ) : (
      <Icon icon={"ri:checkbox-blank-circle-line"} height={9} width={9} />
    );

    // Heading
    if (item.heading) {
      return (
        <div className="mb-1" key={item.heading}>
          <AMMenu
            subHeading={translateHeading(item.heading, t)}
            ClassName="hide-menu leading-21 text-sidebar-foreground dark:text-sidebar-foreground font-bold uppercase text-xs"
          />
        </div>
      );
    }

    // Submenu
    if (item.children?.length) {
      return (
        <AMSubmenu
          key={item.id}
          icon={iconElement}
          title={translateName(item.name, t)}
          ClassName="mt-0.5 text-sidebar-foreground dark:text-sidebar-foreground"
        >
          {renderSidebarItems(item.children, currentPath, t, onClose, true)}
        </AMSubmenu>
      );
    }

    // Regular menu item
    const linkTarget = item.url?.startsWith("https") ? "_blank" : "_self";

    const itemClassNames = isSubItem
      ? `mt-0.5 text-sidebar-foreground dark:text-sidebar-foreground !hover:bg-transparent ${
          isSelected ? "!bg-transparent !text-primary" : ""
        } !px-1.5`
      : `mt-0.5 text-sidebar-foreground dark:text-sidebar-foreground`;

    return (
      <div onClick={onClose} key={index}>
        <AMMenuItem
          key={item.id}
          icon={iconElement}
          isSelected={isSelected}
          link={item.url || undefined}
          target={linkTarget}
          badge={!!(item.isPro || item.isNew)}
          badgeColor={item.isNew ? "bg-lightsuccess" : "bg-lightsecondary"}
          badgeTextColor={item.isNew ? "text-success" : "text-secondary"}
          disabled={item.disabled}
          badgeContent={item.isNew ? "New" : item.isPro ? "Pro" : undefined}
          component={Link}
          className={`${itemClassNames}`}
        >
          <span className="truncate flex-1">
            {translateName(item.title || item.name, t)}
          </span>
        </AMMenuItem>
      </div>
    );
  });
};

const SidebarLayout = ({
  onClose,
  isCollapse,
}: {
  onClose?: () => void;
  isCollapse?: boolean;
}) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { t, dir } = useLocale();
  const { colorTheme } = useColorTheme();

  // Only allow "light" or "dark" for AMSidebar
  const sidebarMode = theme === "light" || theme === "dark" ? theme : undefined;

  return (
    <AMSidebar
      collapsible="icon"
      isCollapse={isCollapse}
      animation={true}
      showProfile={false}
      width={"270px"}
      collapsewidth={"80px"}
      showTrigger={false}
      mode={sidebarMode}
      side={dir === "rtl" ? "right" : "left"}
      direction={dir}
      themeColor={colorTheme.primary}
      themeSecondaryColor={colorTheme.secondary}
      className="fixed top-0 border border-border bg-sidebar dark:bg-sidebar z-10 h-screen start-0"
    >
      {/* Logo */}
      <div className="px-6 flex items-center brand-logo overflow-hidden">
        <AMLogo component={Link} href="/" img="">
          <FullLogo />
        </AMLogo>
      </div>

      {/* Sidebar items */}
      <SimpleBar className="h-[calc(100vh-100px)]">
        <div className="px-6">
          {SidebarContent.map((section, index) => (
            <div key={index}>
              {renderSidebarItems(
                [
                  ...(section.heading ? [{ heading: section.heading }] : []),
                  ...(section.children || []),
                ],
                pathname,
                t,
                onClose,
              )}
            </div>
          ))}

          {/* Promo Section */}
          {/* <div className="mt-9 overflow-hidden">
            <div className="flex w-full bg-lightprimary rounded-lg p-6">
              <div className="lg:w-1/2 w-full">
                <h5 className="text-base text-sidebar-foreground">
                  {t.sidebar.haventAccount}
                </h5>
                <Button className="whitespace-nowrap mt-2 text-[13px]">
                  {t.sidebar.getPro}
                </Button>
              </div>
              <div className="lg:w-1/2 w-full -mt-4 ml-[26px] scale-[1.2] shrink-0">
                <Image
                  src={"/images/backgrounds/rocket.png"}
                  alt="rocket"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div> */}
        </div>
      </SimpleBar>
    </AMSidebar>
  );
};

export default SidebarLayout;
