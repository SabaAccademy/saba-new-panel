import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <p className="text-base text-center text-bodytext font-medium">
        طراحی و توسعه توسط{" "}
        <Link
          href="https://greenlabs.ir/"
          target="_blank"
          className="text-primary font-normal underline hover:text-primaryemphasis"
        >
          گرین لبز
        </Link>{" "}
      </p>
    </>
  );
};
