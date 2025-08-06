import { getHomePageData } from "@/lib/api";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrendingSection } from "@/components/home/TrendingSection";
import { TopAiring } from "@/components/home/TopAiring";
import { MostPopular } from "@/components/home/MostPopular";
import { MostFavorite } from "@/components/home/MostFavorite";
import { LatestCompleted } from "@/components/home/LatestCompleted";
import { NewAdded } from "@/components/home/NewAdded";
import { TopWeek } from "@/components/home/TopWeek";
import { TopMonth } from "@/components/home/TopMonth";

export default async function HomePage() {
  const homePageData = await getHomePageData();

  const spotlight = homePageData?.spotlight || [];
  const trending = homePageData?.trending || [];
  const topAiring = homePageData?.topAiring || [];
  const mostPopular = homePageData?.mostPopular || [];
  const mostFavorite = homePageData?.mostFavorite || [];
  const latestCompleted = homePageData?.latestCompleted || [];
  const newAdded = homePageData?.newAdded || [];
  const topWeek = homePageData?.top10.week || [];
  const topMonth = homePageData?.top10.month || [];

  return (
    <div>
      <HeroCarousel spotlight={spotlight} />
      <div className="container mx-auto px-4 md:px-6">
        <TrendingSection trending={trending} />
        <TopAiring topAiring={topAiring} />
        <MostPopular mostPopular={mostPopular} />
        <MostFavorite mostFavorite={mostFavorite} />
        <LatestCompleted latestCompleted={latestCompleted} />
        <NewAdded newAdded={newAdded} />
        <TopWeek topWeek={topWeek} />
        <TopMonth topMonth={topMonth} />
      </div>
    </div>
  );
}