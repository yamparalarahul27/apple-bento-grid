"use client";

import { useState } from "react";
import { FeatureHighlights } from "@/components/home/FeatureHighlights";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ProjectOnHoldOverlay } from "@/components/home/ProjectOnHoldOverlay";

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <div className="flex flex-col min-h-screen relative">
      {showOverlay && (
        <ProjectOnHoldOverlay onExplore={() => setShowOverlay(false)} />
      )}
      <Hero />
      <Stats />
      <FeatureHighlights />
    </div>
  );
}
