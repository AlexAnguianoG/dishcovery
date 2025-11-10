import Image from "next/image";
import Link from "next/link";

import { STRAPI_BASE_URL } from "@/lib/strapi";

const styles = {
  header: "relative h-[600px] overflow-hidden",
  backgroundImage: "absolute inset-0 w-full h-full object-cover",
  overlay:
    "relative z-10 flex flex-col items-center justify-center h-full  text-center text-white bg-black/50",
  heading: "text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl",
  subHeading: "mt-4 text-lg md:text-xl lg:text-2xl xl:text-3xl",
  button:
    "mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100 transition-colors",
};

export function HeroSection({
  data,
}: {
  readonly data: {
    image: { url: string; alternativeText: string };
    heading: string;
    subHeading: string;
    link: { href: string; label: string };
  };
}) {
  if (!data) return null;

  const { image, heading, subHeading, link } = data;

  const imageUrl = image.url.startsWith("http")
    ? data.image.url
    : `${STRAPI_BASE_URL}${data.image.url}`;

  return (
    <header className={styles.header}>
      <Image
        alt={image.alternativeText || "Hero background image"}
        className={styles.backgroundImage}
        height={1080}
        src={imageUrl}
        style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        width={1920}
      />
      <div className={styles.overlay}>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.subHeading}>{subHeading}</p>
        <Link className={styles.button} href={link.href}>
          {link.label}
        </Link>
      </div>
    </header>
  );
}
