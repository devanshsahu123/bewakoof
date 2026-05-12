import Link from "next/link";
import Image from "next/image";
import type { CategoryItem } from "@/data/homeSections";

interface CategoryGridProps {
  categories: CategoryItem[];
  columns?: number;
}

export default function CategoryGrid({ categories, columns = 6 }: CategoryGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-3 sm:gap-4 md:gap-6`}>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={cat.href}
          className="group relative flex flex-col items-center bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="relative aspect-[240/350] w-full overflow-hidden">
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              unoptimized
            />
          </div>
          <div className="py-2.5 w-full text-center">
            <p className="text-[11px] sm:text-[13px] font-[700] text-gray-800 uppercase tracking-wider group-hover:text-black">
              {cat.label}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
