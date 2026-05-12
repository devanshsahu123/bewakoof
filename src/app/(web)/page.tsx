import HeroBanner from "@/components/web/home/HeroBanner";
import HomeSectionsRenderer from "@/components/web/home/HomeSectionsRenderer";

export default function HomePage() {
  return (
    <>
      {/* Auto-scroll Hero Banner */}
      <HeroBanner />

      {/* Dynamic Home Sections */}
      <HomeSectionsRenderer />
    </>
  );
}
