import { getHomePageData } from "@/lib/api";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrendingSection } from "@/components/home/TrendingSection";
import { NewAdded } from "@/components/home/NewAdded";
import { TopAiring } from "@/components/home/TopAiring";
import { MostPopular } from "@/components/home/MostPopular";
import { MostFavorite } from "@/components/home/MostFavorite";
import { getMostFavoriteListData } from "@/lib/api";
import { getMostPopularListData } from "@/lib/api";
import { getRecentlyAddedListData } from "@/lib/api";
import { getTopAiringListData } from "@/lib/api";

import { TopWeek } from "@/components/home/TopWeek";
import { TopMonth } from "@/components/home/TopMonth";

export default async function HomePage() {
  const homePageData = await getHomePageData();
  const newMostFavorite = (await getMostFavoriteListData()) || [];
  const newMostPopular = (await getMostPopularListData()) || [];
  const newTopAiring = (await getTopAiringListData()) || [];
  const newRecentlyAddedSectionData = (await getRecentlyAddedListData()) || [];
  

  const spotlight = homePageData?.spotlight || [];
  const trending = homePageData?.trending || [];
  
  
  
  const topWeek = homePageData?.top10.week || [];
  const topMonth = homePageData?.top10.month || [];

  return (
    <div>
      <HeroCarousel spotlight={spotlight} />
      <div className="container mx-auto px-4 md:px-6">
                <TrendingSection trending={trending} />
        
        <NewAdded newAdded={newRecentlyAddedSectionData} />
        <TopAiring topAiring={newTopAiring} />
        <MostPopular mostPopular={newMostPopular} />
        
        <MostFavorite mostFavorite={newMostFavorite} />
        
        <TopWeek topWeek={topWeek} />
        <TopMonth topMonth={topMonth} />
      </div>
    </div>
  );
}