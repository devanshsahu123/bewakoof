import ProductSection from "./ProductSection";
import CategoryGrid from "./CategoryGrid";
import { homeSections, type HomeSectionConfig } from "@/data/homeSections";

interface DynamicSectionsRendererProps {
  sections?: HomeSectionConfig[];
}

export default function HomeSectionsRenderer({ sections = homeSections }: DynamicSectionsRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case "PRODUCT_CAROUSEL":
            return (
              <ProductSection
                key={section.id}
                title={section.title}
                products={section.products || []}
                seeAllHref={section.seeAllHref}
                bgColor={section.bgColor}
              />
            );
          
          case "CATEGORY_GRID":
            return (
              <section 
                key={section.id} 
                className="w-full py-[clamp(2rem,5vw,4rem)]" 
                style={{ backgroundColor: section.bgColor || "#ffffff" }}
              >
                <div className="mx-auto max-w-[1440px] px-2 sm:px-4 lg:px-6">
                   <SectionHeader title={section.title} />
                   <CategoryGrid categories={section.categories || []} columns={6} />
                </div>
              </section>
            );

          case "PROMO_GRID":
            return (
              <section 
                key={section.id} 
                className="w-full py-[clamp(2rem,5vw,4rem)]" 
                style={{ backgroundColor: section.bgColor || "#ffffff" }}
              >
                <div className="mx-auto max-w-[1440px] px-2 sm:px-4 lg:px-6">
                   <SectionHeader title={section.title} />
                   <CategoryGrid categories={section.categories || []} columns={4} />
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-[clamp(24px,4vw,32px)]">
      <div className="flex items-center justify-center gap-4 mb-2">
        <span className="hidden sm:block flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300" />
        <h2 className="font-[900] text-black uppercase shrink-0 text-center leading-none"
            style={{ fontSize: "clamp(18px, 4vw, 28px)", letterSpacing: "clamp(0.1em, 0.4vw, 0.2em)" }}>
          {title}
        </h2>
        <span className="hidden sm:block flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300" />
      </div>
      <div className="flex justify-center">
        <div className="bg-[#fdd835] rounded-full" style={{ width: "clamp(32px, 5vw, 48px)", height: "3px" }} />
      </div>
    </div>
  );
}
