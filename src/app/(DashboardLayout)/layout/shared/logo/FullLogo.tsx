"use client";

import Image from "next/image";

const FullLogo = () => {
  return (
    // Force LTR so the brand logo is never mirrored in RTL layouts
    <span dir="ltr" className="inline-block">
      {/* Dark Logo */}
      <Image
        src="/images/logos/dark-logo.svg"
        alt="logo"
        width={204}
        height={36}
        className="block dark:hidden"
      />
      {/* Light Logo */}
      <Image
        src="/images/logos/light-logo.svg"
        alt="logo"
        width={204}
        height={36}
        className="hidden dark:block"
      />
    </span>
  );
};

export default FullLogo;
