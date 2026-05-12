import HomeSectionsRenderer from "@/components/web/home/HomeSectionsRenderer";
import { shopDataMap } from "@/data/shopData";
import { notFound } from "next/navigation";

interface ShopPageProps {
  params: {
    category: string;
  };
}

export default function DynamicShopPage({ params }: ShopPageProps) {
  const category = params.category;
  const data = shopDataMap[category];

  if (!data) {
    return notFound();
  }

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Shop Header */}
      <div className="w-full relative aspect-[18/4] bg-[#f7f7f7] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-4">
           <h1 className="text-[clamp(24px,5vw,48px)] font-[900] text-black uppercase tracking-tighter leading-tight mb-2">
             {data.title}
           </h1>
           <p className="text-[clamp(12px,1.5vw,18px)] text-gray-600 font-[500] max-w-[600px] mx-auto">
             {data.description}
           </p>
        </div>
        {/* Abstract design elements */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 bg-[#fdd835]/20 rounded-full blur-3xl" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-60 h-60 bg-black/5 rounded-full blur-3xl" />
      </div>

      {/* Dynamic Sections */}
      <HomeSectionsRenderer sections={data.sections} />
      
      {/* All Products Grid Placeholder */}
      <section className="w-full py-12 border-t border-gray-100">
        <div className="mx-auto max-w-[1440px] px-4">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[20px] font-[800] text-black uppercase tracking-wider">All {data.title}</h3>
              <div className="flex gap-4">
                 <span className="text-sm text-gray-400">Showing all items</span>
              </div>
           </div>
           
           <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">Full product listing and filters coming soon...</p>
           </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(shopDataMap).map((category) => ({
    category,
  }));
}
