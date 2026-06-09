export const GRID_COLUMNS = 12;
export const GRID_ROWS = 6;
export const GRID_CAPACITY = GRID_COLUMNS * GRID_ROWS;

export const referenceImages = Array.from({ length: 20 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return `/references/apple-bento-${number}.png`;
});

export type TileKind = "headline" | "metric" | "product" | "image" | "icon" | "feature";
export type TileTone =
  | "white"
  | "ink"
  | "mist"
  | "blue"
  | "green"
  | "pink"
  | "silver";
export type TileAlign = "start" | "center" | "end";
export type ImageFit = "cover" | "contain";
export type StageTone = "studio" | "midnight" | "warm" | "graphite";
export type IconKey =
  | "spark"
  | "audio"
  | "shield"
  | "heart"
  | "battery"
  | "activity"
  | "message"
  | "map"
  | "game"
  | "lock"
  | "camera"
  | "satellite"
  | "translate"
  | "wallet"
  | "chip";

export interface BentoTile {
  id: string;
  kind: TileKind;
  title: string;
  kicker: string;
  body: string;
  colSpan: number;
  rowSpan: number;
  tone: TileTone;
  accent: string;
  align: TileAlign;
  imageFit: ImageFit;
  imageUrl?: string;
  icon: IconKey;
  scale: number;
}

export interface BentoProject {
  eventName: string;
  subtitle: string;
  stage: StageTone;
  gap: number;
  radius: number;
  safeText: boolean;
  showGuides: boolean;
  tiles: BentoTile[];
}

export interface BentoPreset {
  id: string;
  name: string;
  project: BentoProject;
}

const baseTile: Omit<BentoTile, "id" | "kind" | "title"> = {
  kicker: "",
  body: "",
  colSpan: 3,
  rowSpan: 1,
  tone: "white",
  accent: "#0071e3",
  align: "center",
  imageFit: "cover",
  icon: "spark",
  scale: 1,
};

export function makeTile(tile: Partial<BentoTile> & Pick<BentoTile, "id" | "kind" | "title">): BentoTile {
  return {
    ...baseTile,
    ...tile,
  };
}

export const iconOptions: Array<{ value: IconKey; label: string }> = [
  { value: "spark", label: "Spark" },
  { value: "audio", label: "Audio" },
  { value: "shield", label: "Shield" },
  { value: "heart", label: "Heart" },
  { value: "battery", label: "Battery" },
  { value: "activity", label: "Activity" },
  { value: "message", label: "Message" },
  { value: "map", label: "Map" },
  { value: "game", label: "Game" },
  { value: "lock", label: "Lock" },
  { value: "camera", label: "Camera" },
  { value: "satellite", label: "Satellite" },
  { value: "translate", label: "Translate" },
  { value: "wallet", label: "Wallet" },
  { value: "chip", label: "Chip" },
];

export const tileKindOptions: Array<{ value: TileKind; label: string }> = [
  { value: "headline", label: "Headline" },
  { value: "metric", label: "Metric" },
  { value: "product", label: "Product" },
  { value: "image", label: "Image" },
  { value: "icon", label: "Icon" },
  { value: "feature", label: "Feature" },
];

export const toneOptions: Array<{ value: TileTone; label: string }> = [
  { value: "white", label: "White" },
  { value: "ink", label: "Ink" },
  { value: "mist", label: "Mist" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "pink", label: "Pink" },
  { value: "silver", label: "Silver" },
];

export const stageOptions: Array<{ value: StageTone; label: string }> = [
  { value: "studio", label: "Studio" },
  { value: "midnight", label: "Midnight" },
  { value: "warm", label: "Warm" },
  { value: "graphite", label: "Graphite" },
];

export const presets: BentoPreset[] = [
  {
    id: "airpods",
    name: "AirPods keynote",
    project: {
      eventName: "AirPods Pro",
      subtitle: "Hearing, fitness, and sound updates",
      stage: "studio",
      gap: 12,
      radius: 24,
      safeText: true,
      showGuides: false,
      tiles: [
        makeTile({
          id: "airpods-hero",
          kind: "product",
          title: "AirPods Pro",
          kicker: "Audio",
          body: "Next generation adaptive sound",
          colSpan: 5,
          rowSpan: 4,
          tone: "white",
          accent: "#0071e3",
          icon: "audio",
        }),
        makeTile({
          id: "airpods-hearing",
          kind: "headline",
          title: "Hearing Aid",
          kicker: "New capability",
          colSpan: 4,
          rowSpan: 2,
          tone: "white",
          accent: "#0a35ff",
          align: "end",
          icon: "audio",
          scale: 0.92,
        }),
        makeTile({
          id: "airpods-recycled",
          kind: "metric",
          title: "65%",
          body: "Recycled plastic in the case",
          colSpan: 3,
          rowSpan: 1,
          tone: "white",
          accent: "#111111",
        }),
        makeTile({
          id: "airpods-ip",
          kind: "feature",
          title: "IP57",
          body: "Dust and water resistance",
          colSpan: 3,
          rowSpan: 1,
          tone: "silver",
          accent: "#6a7280",
          icon: "shield",
        }),
        makeTile({
          id: "airpods-workout",
          kind: "icon",
          title: "Workout experience",
          colSpan: 4,
          rowSpan: 1,
          tone: "white",
          accent: "#8fff00",
          icon: "activity",
        }),
        makeTile({
          id: "airpods-test",
          kind: "icon",
          title: "Hearing Test",
          colSpan: 2,
          rowSpan: 1,
          tone: "white",
          accent: "#073bff",
          icon: "activity",
        }),
        makeTile({
          id: "airpods-protection",
          kind: "icon",
          title: "Hearing Protection",
          colSpan: 2,
          rowSpan: 1,
          tone: "white",
          accent: "#0d45ff",
          icon: "shield",
        }),
        makeTile({
          id: "airpods-translation",
          kind: "feature",
          title: "Live Translation",
          kicker: "Hola -> Hello",
          colSpan: 4,
          rowSpan: 2,
          tone: "white",
          accent: "#ff2d55",
          icon: "translate",
        }),
        makeTile({
          id: "airpods-fit",
          kind: "product",
          title: "Best-fitting AirPods ever",
          colSpan: 4,
          rowSpan: 2,
          tone: "white",
          accent: "#c6ccd8",
          icon: "audio",
          scale: 0.74,
        }),
        makeTile({
          id: "airpods-heart",
          kind: "icon",
          title: "Heart rate sensor",
          colSpan: 3,
          rowSpan: 1,
          tone: "white",
          accent: "#ff006e",
          icon: "heart",
        }),
        makeTile({
          id: "airpods-sound",
          kind: "headline",
          title: "Extraordinary sound quality",
          colSpan: 4,
          rowSpan: 2,
          tone: "white",
          accent: "#1d1d1f",
          align: "start",
          icon: "spark",
          scale: 0.8,
        }),
        makeTile({
          id: "airpods-battery",
          kind: "metric",
          title: "8 hours",
          body: "Active Noise Cancellation",
          colSpan: 3,
          rowSpan: 1,
          tone: "white",
          accent: "#28cd41",
          icon: "battery",
          scale: 0.7,
        }),
      ],
    },
  },
  {
    id: "os-overview",
    name: "OS overview",
    project: {
      eventName: "iOS",
      subtitle: "A feature overview for the year",
      stage: "studio",
      gap: 11,
      radius: 22,
      safeText: true,
      showGuides: false,
      tiles: [
        makeTile({
          id: "ios-photos",
          kind: "product",
          title: "Photos update",
          kicker: "Biggest-ever",
          colSpan: 3,
          rowSpan: 4,
          tone: "white",
          accent: "#1b1b1f",
          icon: "camera",
          scale: 0.82,
        }),
        makeTile({
          id: "ios-mail",
          kind: "feature",
          title: "Categorization in Mail",
          colSpan: 4,
          rowSpan: 1,
          tone: "white",
          accent: "#0071e3",
          icon: "message",
        }),
        makeTile({
          id: "ios-text",
          kind: "feature",
          title: "Text effects",
          kicker: "Major news",
          colSpan: 3,
          rowSpan: 2,
          tone: "white",
          accent: "#2f8cff",
          icon: "message",
        }),
        makeTile({
          id: "ios-mind",
          kind: "icon",
          title: "State of Mind",
          colSpan: 2,
          rowSpan: 2,
          tone: "green",
          accent: "#45db5f",
          icon: "spark",
        }),
        makeTile({
          id: "ios-satellite",
          kind: "image",
          title: "Messages via satellite",
          colSpan: 3,
          rowSpan: 2,
          tone: "ink",
          accent: "#34c759",
          icon: "satellite",
        }),
        makeTile({
          id: "ios-emoji",
          kind: "feature",
          title: "Emoji Tapbacks",
          colSpan: 5,
          rowSpan: 1,
          tone: "white",
          accent: "#0a84ff",
          icon: "message",
        }),
        makeTile({
          id: "ios-wallet",
          kind: "icon",
          title: "Installments and Rewards",
          colSpan: 2,
          rowSpan: 2,
          tone: "white",
          accent: "#ff9f0a",
          icon: "wallet",
        }),
        makeTile({
          id: "ios-hero",
          kind: "headline",
          title: "iOS",
          colSpan: 5,
          rowSpan: 2,
          tone: "blue",
          accent: "#5ac8fa",
          icon: "spark",
          scale: 1.3,
        }),
        makeTile({
          id: "ios-game",
          kind: "icon",
          title: "Game Mode",
          colSpan: 2,
          rowSpan: 1,
          tone: "white",
          accent: "#bf5af2",
          icon: "game",
        }),
        makeTile({
          id: "ios-calendar",
          kind: "feature",
          title: "Reminders in Calendar",
          colSpan: 3,
          rowSpan: 1,
          tone: "ink",
          accent: "#ff453a",
          icon: "message",
        }),
        makeTile({
          id: "ios-locked",
          kind: "headline",
          title: "Locked and Hidden apps",
          colSpan: 4,
          rowSpan: 1,
          tone: "white",
          accent: "#ff2d55",
          align: "center",
          icon: "lock",
          scale: 0.64,
        }),
        makeTile({
          id: "ios-control",
          kind: "image",
          title: "Control Center customization",
          colSpan: 3,
          rowSpan: 2,
          tone: "blue",
          accent: "#00c7be",
          icon: "chip",
        }),
        makeTile({
          id: "ios-rcs",
          kind: "icon",
          title: "Messaging Support",
          kicker: "RCS",
          colSpan: 2,
          rowSpan: 1,
          tone: "white",
          accent: "#30d158",
          icon: "message",
        }),
        makeTile({
          id: "ios-home",
          kind: "product",
          title: "Home Screen customization",
          colSpan: 4,
          rowSpan: 2,
          tone: "white",
          accent: "#111111",
          icon: "camera",
          scale: 0.72,
        }),
      ],
    },
  },
  {
    id: "hardware-launch",
    name: "Hardware launch",
    project: {
      eventName: "MacBook Pro",
      subtitle: "Performance, display, and battery story",
      stage: "graphite",
      gap: 12,
      radius: 24,
      safeText: true,
      showGuides: false,
      tiles: [
        makeTile({
          id: "mac-hero",
          kind: "product",
          title: "MacBook Pro",
          kicker: "Built for Apple Intelligence",
          body: "A dramatic performance leap",
          colSpan: 6,
          rowSpan: 3,
          tone: "ink",
          accent: "#5ac8fa",
          icon: "chip",
          scale: 1.1,
        }),
        makeTile({
          id: "mac-chip",
          kind: "metric",
          title: "M4",
          body: "Next generation chip",
          colSpan: 2,
          rowSpan: 2,
          tone: "white",
          accent: "#1d1d1f",
          icon: "chip",
        }),
        makeTile({
          id: "mac-battery",
          kind: "metric",
          title: "22 hr",
          body: "Battery life",
          colSpan: 2,
          rowSpan: 1,
          tone: "green",
          accent: "#28cd41",
          icon: "battery",
          scale: 0.8,
        }),
        makeTile({
          id: "mac-display",
          kind: "headline",
          title: "Liquid Retina XDR",
          colSpan: 4,
          rowSpan: 2,
          tone: "silver",
          accent: "#0a84ff",
          align: "start",
          icon: "spark",
          scale: 0.72,
        }),
        makeTile({
          id: "mac-ai",
          kind: "icon",
          title: "Apple Intelligence",
          colSpan: 3,
          rowSpan: 1,
          tone: "white",
          accent: "#ff2d55",
          icon: "spark",
        }),
        makeTile({
          id: "mac-camera",
          kind: "icon",
          title: "12MP Center Stage camera",
          colSpan: 3,
          rowSpan: 1,
          tone: "white",
          accent: "#ff9f0a",
          icon: "camera",
        }),
        makeTile({
          id: "mac-ports",
          kind: "feature",
          title: "Thunderbolt 5",
          body: "Up to 120 Gb/s",
          colSpan: 3,
          rowSpan: 1,
          tone: "white",
          accent: "#0071e3",
          icon: "chip",
        }),
        makeTile({
          id: "mac-thermal",
          kind: "image",
          title: "Cool and quiet",
          colSpan: 3,
          rowSpan: 2,
          tone: "blue",
          accent: "#64d2ff",
          icon: "activity",
        }),
        makeTile({
          id: "mac-carbon",
          kind: "metric",
          title: "50%",
          body: "Recycled materials",
          colSpan: 3,
          rowSpan: 1,
          tone: "white",
          accent: "#30d158",
          icon: "shield",
        }),
        makeTile({
          id: "mac-finish",
          kind: "headline",
          title: "Space black",
          colSpan: 3,
          rowSpan: 2,
          tone: "ink",
          accent: "#8e8e93",
          align: "end",
          icon: "spark",
          scale: 0.72,
        }),
      ],
    },
  },
];

export const emptyTile = makeTile({
  id: "new-tile",
  kind: "feature",
  title: "New tile",
  body: "Short supporting line",
  colSpan: 3,
  rowSpan: 1,
  accent: "#0071e3",
});
