import { FeatureHighlights } from "@/components/home/FeatureHighlights";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Stats />
      <FeatureHighlights />
    </div>
  );
}
