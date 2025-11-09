import { HeroSection } from "@/components/hero-section";
import { getHomePage } from "@/lib/strapi";

export async function generateMetadata() {
  const strapiData = await getHomePage();

  const { title, description } = strapiData;

  return { title, description };
}
export default async function Home() {
  const strapiData = await getHomePage();

  const [heroSection] = strapiData.sections || [];

  return (
    <main className="container mx-auto px-4 py-8">
      <HeroSection data={{ ...heroSection }} />
    </main>
  );
}
