import { getHomePageData } from "@/lib/api";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrendingSection } from "@/components/home/TrendingSection";


export default async function HomePage() {
  const homePageData = await getHomePageData();

  const spotlight = homePageData?.spotlight || [];
  const trending = homePageData?.trending || [];

  return (
    <div>
      <HeroCarousel spotlight={spotlight} />
      <div className="container mx-auto px-4 md:px-6">
        <TrendingSection trending={trending} />
      </div>
    </div>
  );
}
