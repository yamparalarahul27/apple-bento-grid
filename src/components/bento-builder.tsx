"use client";

import { type ComponentProps, type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Battery,
  Camera,
  Copy,
  Cpu,
  Download,
  FileJson,
  Gamepad2,
  Grid3X3,
  HeartPulse,
  ImageIcon,
  Images,
  Languages,
  Loader2,
  LockKeyhole,
  Map,
  MessageCircle,
  Monitor,
  Palette,
  Plus,
  RefreshCcw,
  Satellite,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Type,
  Upload,
  Volume2,
  WalletCards,
  Wand2,
  type LucideIcon,
} from "lucide-react";

import {
  emptyTile,
  GRID_CAPACITY,
  GRID_COLUMNS,
  GRID_ROWS,
  iconOptions,
  presets,
  referenceImages,
  stageOptions,
  tileKindOptions,
  toneOptions,
  weightOptions,
  type BentoProject,
  type BentoTile,
  type IconKey,
  type ImageFit,
  type StageTone,
  type TileAlign,
  type TileKind,
  type TileTone,
} from "@/lib/bento-presets";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconMap: Record<IconKey, LucideIcon> = {
  spark: Sparkles,
  audio: Volume2,
  shield: ShieldCheck,
  heart: HeartPulse,
  battery: Battery,
  activity: Activity,
  message: MessageCircle,
  map: Map,
  game: Gamepad2,
  lock: LockKeyhole,
  camera: Camera,
  satellite: Satellite,
  translate: Languages,
  wallet: WalletCards,
  chip: Cpu,
};

const stagePalette: Record<StageTone, { background: string; rail: string; text: string }> = {
  studio: {
    background: "linear-gradient(180deg, #f7f7f8 0%, #e7e7e9 100%)",
    rail: "#f3f3f5",
    text: "#1d1d1f",
  },
  midnight: {
    background: "linear-gradient(180deg, #101216 0%, #020305 100%)",
    rail: "#111318",
    text: "#f5f5f7",
  },
  warm: {
    background: "linear-gradient(180deg, #f9f2e7 0%, #e9e1d4 100%)",
    rail: "#f6efe5",
    text: "#201d19",
  },
  graphite: {
    background: "linear-gradient(180deg, #303236 0%, #17191d 100%)",
    rail: "#25272b",
    text: "#f5f5f7",
  },
};

const tilePalette: Record<TileTone, { background: string; text: string; muted: string; border: string }> = {
  white: {
    background: "linear-gradient(180deg, #ffffff 0%, #fbfbfd 100%)",
    text: "#111113",
    muted: "#60606a",
    border: "rgba(0,0,0,0.05)",
  },
  ink: {
    background: "linear-gradient(160deg, #0c0d10 0%, #1e2229 100%)",
    text: "#f5f5f7",
    muted: "rgba(245,245,247,0.72)",
    border: "rgba(255,255,255,0.12)",
  },
  mist: {
    background: "linear-gradient(150deg, #f7f9fb 0%, #e7edf5 100%)",
    text: "#17191d",
    muted: "#59616d",
    border: "rgba(62,76,96,0.1)",
  },
  blue: {
    background: "linear-gradient(135deg, #0b5cad 0%, #35c2ff 48%, #ff8aa0 100%)",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.82)",
    border: "rgba(255,255,255,0.18)",
  },
  green: {
    background: "linear-gradient(135deg, #dff8cc 0%, #94ee8f 100%)",
    text: "#102014",
    muted: "#35553c",
    border: "rgba(0,0,0,0.06)",
  },
  pink: {
    background: "linear-gradient(135deg, #fff1f7 0%, #ff69a7 100%)",
    text: "#2a101b",
    muted: "#67334b",
    border: "rgba(0,0,0,0.06)",
  },
  silver: {
    background: "linear-gradient(145deg, #ffffff 0%, #edf0f5 45%, #d8dee8 100%)",
    text: "#17191d",
    muted: "#66707c",
    border: "rgba(0,0,0,0.07)",
  },
};

function cloneProject(project: BentoProject): BentoProject {
  return {
    ...project,
    tiles: project.tiles.map((tile) => ({ ...tile })),
  };
}

function makeId(prefix = "tile") {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }

  return `${prefix}-${Date.now().toString(36)}`;
}

function clampSpan(value: number, max: number) {
  return Math.max(1, Math.min(max, Math.round(value)));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function downloadBlob(filename: string, content: BlobPart, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function normalizeProject(candidate: Partial<BentoProject>): BentoProject {
  const fallback = cloneProject(presets[0].project);
  const tiles = Array.isArray(candidate.tiles) && candidate.tiles.length > 0
    ? candidate.tiles.map((tile, index) => ({
        ...emptyTile,
        ...tile,
        id: typeof tile.id === "string" ? tile.id : makeId(`import-${index}`),
        colSpan: clampSpan(Number(tile.colSpan) || emptyTile.colSpan, GRID_COLUMNS),
        rowSpan: clampSpan(Number(tile.rowSpan) || emptyTile.rowSpan, GRID_ROWS),
        weight: Math.max(300, Math.min(900, Number(tile.weight) || emptyTile.weight)),
      }))
    : fallback.tiles;

  return {
    ...fallback,
    ...candidate,
    eventName: typeof candidate.eventName === "string" ? candidate.eventName : fallback.eventName,
    subtitle: typeof candidate.subtitle === "string" ? candidate.subtitle : fallback.subtitle,
    gap: clampSpan(Number(candidate.gap) || fallback.gap, 24),
    radius: Math.max(8, Math.min(34, Number(candidate.radius) || fallback.radius)),
    safeText: Boolean(candidate.safeText ?? fallback.safeText),
    showGuides: Boolean(candidate.showGuides ?? fallback.showGuides),
    tiles,
  };
}

export function BentoBuilder() {
  const [activePreset, setActivePreset] = useState(presets[0].id);
  const [project, setProject] = useState<BentoProject>(() => cloneProject(presets[0].project));
  const [selectedTileId, setSelectedTileId] = useState(project.tiles[0]?.id ?? "");
  const [isExporting, setIsExporting] = useState(false);
  // key lets repeated identical messages restart the auto-dismiss timer.
  const [notice, setNotice] = useState({ text: "Ready", key: 0 });
  // Default to a desktop width so the first paint (and SSR markup) shows the
  // full three-pane editor instead of flashing a single column before the
  // resize effect runs.
  const [viewportWidth, setViewportWidth] = useState(1280);
  const canvasRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const selectedTile = useMemo(
    () => project.tiles.find((tile) => tile.id === selectedTileId) ?? project.tiles[0],
    [project.tiles, selectedTileId]
  );
  const selectedIndex = project.tiles.findIndex((tile) => tile.id === selectedTile?.id);

  function announce(text: string) {
    setNotice((current) => ({ text, key: current.key + 1 }));
  }

  const usedCells = useMemo(
    () => project.tiles.reduce((total, tile) => total + tile.colSpan * tile.rowSpan, 0),
    [project.tiles]
  );
  const usedPercent = Math.round((usedCells / GRID_CAPACITY) * 100);
  const activeStage = stagePalette[project.stage];
  const shellGridTemplate =
    viewportWidth >= 1280
      ? "280px minmax(0, 1fr) 340px"
      : viewportWidth >= 880
        ? "260px minmax(0, 1fr)"
        : "minmax(0, 1fr)";
  const inspectorGridColumn =
    viewportWidth >= 880 && viewportWidth < 1280 ? "1 / -1" : "auto";

  useEffect(() => {
    function updateViewportWidth() {
      setViewportWidth(window.innerWidth);
    }

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  useEffect(() => {
    if (notice.text === "Ready") return;
    const timer = setTimeout(() => {
      setNotice((current) => ({ ...current, text: "Ready" }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  function setProjectPatch(patch: Partial<BentoProject>) {
    setProject((current) => ({ ...current, ...patch }));
  }

  function updateTile(tileId: string, patch: Partial<BentoTile>) {
    setProject((current) => ({
      ...current,
      tiles: current.tiles.map((tile) =>
        tile.id === tileId
          ? {
              ...tile,
              ...patch,
              colSpan: patch.colSpan ? clampSpan(patch.colSpan, GRID_COLUMNS) : tile.colSpan,
              rowSpan: patch.rowSpan ? clampSpan(patch.rowSpan, GRID_ROWS) : tile.rowSpan,
            }
          : tile
      ),
    }));
  }

  function updateSelected(patch: Partial<BentoTile>) {
    if (!selectedTile) return;
    updateTile(selectedTile.id, patch);
  }

  function applyPreset(presetId: string) {
    const preset = presets.find((item) => item.id === presetId);
    if (!preset) return;

    const nextProject = cloneProject(preset.project);
    setActivePreset(preset.id);
    setProject(nextProject);
    setSelectedTileId(nextProject.tiles[0]?.id ?? "");
    announce(`${preset.name} loaded`);
  }

  function addTile(kind: TileKind = "feature") {
    const tile: BentoTile = {
      ...emptyTile,
      id: makeId(kind),
      kind,
      title: kind === "metric" ? "42%" : kind === "headline" ? "New story" : "New tile",
    };

    setProject((current) => ({
      ...current,
      tiles: [...current.tiles, tile],
    }));
    setSelectedTileId(tile.id);
    announce("Tile added");
  }

  function duplicateTile(tile: BentoTile) {
    const duplicate = {
      ...tile,
      id: makeId("copy"),
      title: tile.title.endsWith(" copy") ? tile.title : `${tile.title} copy`,
    };

    setProject((current) => ({
      ...current,
      tiles: [...current.tiles, duplicate],
    }));
    setSelectedTileId(duplicate.id);
    announce("Tile duplicated");
  }

  function deleteTile(tileId: string) {
    const index = project.tiles.findIndex((tile) => tile.id === tileId);
    const nextTiles = project.tiles.filter((tile) => tile.id !== tileId);
    if (index < 0 || nextTiles.length === 0) return;

    const neighbor = nextTiles[Math.min(index, nextTiles.length - 1)];
    setProject((current) => ({ ...current, tiles: nextTiles }));
    if (selectedTileId === tileId) setSelectedTileId(neighbor.id);
    announce("Tile removed");
  }

  function moveTile(tileId: string, direction: -1 | 1) {
    setProject((current) => {
      const index = current.tiles.findIndex((tile) => tile.id === tileId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.tiles.length) return current;

      const nextTiles = [...current.tiles];
      const [tile] = nextTiles.splice(index, 1);
      nextTiles.splice(nextIndex, 0, tile);
      return { ...current, tiles: nextTiles };
    });
  }

  async function exportPng() {
    if (!canvasRef.current) return;

    setIsExporting(true);
    announce("Rendering PNG");
    try {
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: activeStage.rail,
      });
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `${slugify(project.eventName) || "bento"}-grid.png`;
      anchor.click();
      announce("PNG exported");
    } catch {
      announce("PNG export failed");
    } finally {
      setIsExporting(false);
    }
  }

  function exportJson() {
    downloadBlob(
      `${slugify(project.eventName) || "bento"}-grid.json`,
      JSON.stringify(project, null, 2),
      "application/json"
    );
    announce("JSON exported");
  }

  async function importJson(file: File | undefined) {
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Partial<BentoProject>;
      const nextProject = normalizeProject(parsed);
      setProject(nextProject);
      setActivePreset("custom");
      setSelectedTileId(nextProject.tiles[0]?.id ?? "");
      announce("JSON imported");
    } catch {
      announce("Could not import JSON");
    } finally {
      if (jsonInputRef.current) jsonInputRef.current.value = "";
    }
  }

  async function loadTileImage(file: File | undefined) {
    if (!file || !selectedTile) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateTile(selectedTile.id, {
        kind: "image",
        imageUrl: String(reader.result),
        imageFit: "cover",
      });
      announce("Image added");
    };
    reader.readAsDataURL(file);
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  function applyReferenceImage(src: string) {
    if (!selectedTile) return;

    updateTile(selectedTile.id, {
      kind: "image",
      imageUrl: src,
      imageFit: "cover",
      title: selectedTile.title || "Reference tile",
    });
    announce("Reference applied");
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#1d1d1f]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/84 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1680px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-black text-white">
              <Grid3X3 className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">Bento Lab</p>
              <p role="status" aria-live="polite" className="truncate text-xs text-black/55">
                {notice.text}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center lg:max-w-xl">
            <Input
              aria-label="Event name"
              placeholder="Event name"
              value={project.eventName}
              onChange={(event) => setProjectPatch({ eventName: event.target.value })}
              className="h-9 min-w-0 bg-white font-medium"
            />
            <Input
              aria-label="Subtitle"
              placeholder="Subtitle"
              value={project.subtitle}
              onChange={(event) => setProjectPatch({ subtitle: event.target.value })}
              className="h-9 min-w-0 bg-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <TooltipButton label="Add tile" onClick={() => addTile()}>
              <Plus />
            </TooltipButton>
            <TooltipButton label="Export PNG" onClick={exportPng} disabled={isExporting}>
              {isExporting ? <Loader2 className="animate-spin" /> : <Download />}
            </TooltipButton>
            <TooltipButton label="Export JSON" onClick={exportJson}>
              <FileJson />
            </TooltipButton>
            <input
              ref={jsonInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(event) => importJson(event.target.files?.[0])}
            />
            <TooltipButton label="Import JSON" onClick={() => jsonInputRef.current?.click()}>
              <Upload />
            </TooltipButton>
            <TooltipButton label="Reset preset" onClick={() => applyPreset(activePreset === "custom" ? presets[0].id : activePreset)}>
              <RefreshCcw />
            </TooltipButton>
          </div>
        </div>
      </header>

      <main
        className="mx-auto grid max-w-[1680px] gap-4 px-4 py-4"
        style={{ gridTemplateColumns: shellGridTemplate }}
      >
        <aside className="rounded-lg border border-black/10 bg-white shadow-sm">
          <Tabs defaultValue="presets" className="h-full">
            <div className="border-b border-black/10 p-3">
              <TabsList className="w-full">
                <TabsTrigger value="presets" className="flex-1">
                  <Wand2 className="size-3.5" />
                  Presets
                </TabsTrigger>
                <TabsTrigger value="tiles" className="flex-1">
                  <Images className="size-3.5" />
                  Tiles
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="presets" className="p-3">
              <div className="space-y-3">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset.id)}
                    className={cn(
                      "w-full rounded-lg border p-3 text-left transition-[transform,background-color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black/[0.03] active:scale-[0.98]",
                      activePreset === preset.id ? "border-black bg-black text-white" : "border-black/10 bg-white"
                    )}
                  >
                    <span className="text-sm font-semibold">{preset.name}</span>
                    <span
                      className={cn(
                        "mt-1 block text-xs",
                        activePreset === preset.id ? "text-white/66" : "text-black/55"
                      )}
                    >
                      {preset.project.tiles.length} tiles, {preset.project.gap}px gap
                    </span>
                  </button>
                ))}
              </div>

              <Separator className="my-4" />

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-black/60">References</Label>
                  <Badge variant="outline">{referenceImages.length}</Badge>
                </div>
                <p className="mb-3 text-xs text-black/50">Click one to fill the selected tile.</p>
                <div className="grid grid-cols-2 gap-2">
                  {referenceImages.slice(0, 8).map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => applyReferenceImage(src)}
                      className="aspect-[16/10] overflow-hidden rounded-lg border border-black/10 bg-cover bg-center transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] active:scale-[0.98]"
                      style={{ backgroundImage: `url(${src})` }}
                      aria-label={`Reference ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tiles" className="p-0">
              <div className="border-b border-black/10 p-3">
                <div className="grid grid-cols-3 gap-2">
                  {tileKindOptions.slice(0, 6).map((kind) => (
                    <Button
                      key={kind.value}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTile(kind.value)}
                      className="justify-start"
                    >
                      <Plus className="size-3" />
                      {kind.label}
                    </Button>
                  ))}
                </div>
              </div>

              <ScrollArea className="h-[clamp(280px,62vh,620px)]">
                <div className="space-y-2 p-3">
                  {project.tiles.map((tile, index) => (
                    <button
                      key={tile.id}
                      type="button"
                      onClick={() => setSelectedTileId(tile.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border p-2 text-left transition-[transform,background-color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black/[0.03] active:scale-[0.98]",
                        selectedTile?.id === tile.id ? "border-black bg-black text-white" : "border-black/10 bg-white"
                      )}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-black/[0.06] text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block truncate text-sm font-medium",
                            !tile.title.trim() && (selectedTile?.id === tile.id ? "text-white/50" : "text-black/40")
                          )}
                        >
                          {tile.title.trim() || "Untitled tile"}
                        </span>
                        <span
                          className={cn(
                            "block text-xs",
                            selectedTile?.id === tile.id ? "text-white/60" : "text-black/50"
                          )}
                        >
                          {tile.colSpan} x {tile.rowSpan} cells
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </aside>

        <section className="min-w-0 rounded-lg border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 p-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={usedCells > GRID_CAPACITY ? "destructive" : "secondary"}
                  className="tabular-nums"
                >
                  {usedCells} / {GRID_CAPACITY} cells
                </Badge>
                <Badge variant="outline">{GRID_COLUMNS} columns</Badge>
                <Badge variant="outline">{GRID_ROWS} rows</Badge>
                <Badge variant="outline" className="tabular-nums">{usedPercent}% used</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-black/55">
                <Monitor className="size-4" />
                1512 x 945 reference ratio
              </div>
            </div>
            {usedCells > GRID_CAPACITY && (
              <p className="mt-2 text-xs font-medium text-red-600">
                Over capacity by {usedCells - GRID_CAPACITY} {usedCells - GRID_CAPACITY === 1 ? "cell" : "cells"} — shrink
                or remove tiles so everything fits the {GRID_COLUMNS} x {GRID_ROWS} frame.
              </p>
            )}
            {usedCells < GRID_CAPACITY && (
              <p className="mt-2 text-xs font-medium text-amber-600">
                {GRID_CAPACITY - usedCells} empty {GRID_CAPACITY - usedCells === 1 ? "cell" : "cells"} — widen or add
                tiles so the bento has no gaps.
              </p>
            )}
          </div>

          <div className="overflow-x-auto p-3 sm:p-4">
            <div
              ref={canvasRef}
              data-testid="bento-canvas"
              className="relative mx-auto flex aspect-[16/10] w-full min-w-[560px] max-w-[1180px] flex-col overflow-hidden p-4 shadow-[0_28px_80px_rgba(0,0,0,0.16)] sm:p-5"
              style={{
                background: activeStage.background,
                color: activeStage.text,
                // Concentric radius: outer = inner tile radius + canvas padding.
                borderRadius: `${project.radius + 20}px`,
                // Tile typography is authored against an 1180px canvas and
                // scaled with cqw so text never clips at narrower widths.
                containerType: "inline-size",
              }}
            >
              {(project.eventName || project.subtitle) && (
                <div className="shrink-0 [margin-bottom:calc(16*100cqw/1180)]">
                  {project.eventName && (
                    <h1 className="stage-title text-balance">{project.eventName}</h1>
                  )}
                  {project.subtitle && (
                    <p className="stage-subtitle">{project.subtitle}</p>
                  )}
                </div>
              )}
              <div
                className={cn(
                  "relative grid min-h-0 flex-1",
                  project.showGuides && "bento-guide"
                )}
                style={
                  {
                    gap: `${project.gap}px`,
                    gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
                    gridAutoFlow: "row dense",
                    "--guide-gap": `${project.gap}px`,
                  } as CSSProperties
                }
              >
                {project.tiles.map((tile) => (
                  <BentoTileView
                    key={tile.id}
                    tile={tile}
                    project={project}
                    selected={selectedTile?.id === tile.id}
                    onSelect={() => setSelectedTileId(tile.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside
          className="rounded-lg border border-black/10 bg-white shadow-sm"
          style={{ gridColumn: inspectorGridColumn }}
        >
          <Tabs defaultValue="content" className="h-full">
            <div className="border-b border-black/10 p-3">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">
                  <Type className="size-3.5" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex-1">
                  <SlidersHorizontal className="size-3.5" />
                  Layout
                </TabsTrigger>
                <TabsTrigger value="style" className="flex-1">
                  <Palette className="size-3.5" />
                  Style
                </TabsTrigger>
              </TabsList>
            </div>

            {selectedTile ? (
              <>
                <TabsContent value="content" className="space-y-4 p-4">
                  <InspectorTextFields tile={selectedTile} updateSelected={updateSelected} />

                  <div className="grid grid-cols-2 gap-3">
                    <SelectField
                      label="Type"
                      value={selectedTile.kind}
                      options={tileKindOptions}
                      onChange={(value) => updateSelected({ kind: value as TileKind })}
                    />
                    <SelectField
                      label="Icon"
                      value={selectedTile.icon}
                      options={iconOptions}
                      onChange={(value) => updateSelected({ icon: value as IconKey })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={selectedTile.imageUrl ?? ""}
                      onChange={(event) => updateSelected({ imageUrl: event.target.value, kind: "image" })}
                      placeholder="/references/apple-bento-01.png"
                    />
                    <div className="flex gap-2">
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => loadTileImage(event.target.files?.[0])}
                      />
                      <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()}>
                        <ImageIcon />
                        Upload
                      </Button>
                      <Select
                        value={selectedTile.imageFit}
                        onValueChange={(value) => updateSelected({ imageFit: value as ImageFit })}
                      >
                        <SelectTrigger className="w-[128px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cover">Cover</SelectItem>
                          <SelectItem value="contain">Contain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <TileActions
                    tile={selectedTile}
                    index={selectedIndex}
                    count={project.tiles.length}
                    duplicateTile={duplicateTile}
                    deleteTile={deleteTile}
                    moveTile={moveTile}
                  />
                </TabsContent>

                <TabsContent value="layout" className="space-y-5 p-4">
                  <RangeField
                    label="Column span"
                    value={selectedTile.colSpan}
                    min={1}
                    max={GRID_COLUMNS}
                    unit={` / ${GRID_COLUMNS}`}
                    onChange={(value) => updateSelected({ colSpan: value })}
                  />
                  <RangeField
                    label="Row span"
                    value={selectedTile.rowSpan}
                    min={1}
                    max={GRID_ROWS}
                    unit={` / ${GRID_ROWS}`}
                    onChange={(value) => updateSelected({ rowSpan: value })}
                  />
                  <RangeField
                    label="Text scale"
                    value={Math.round(selectedTile.scale * 100)}
                    min={60}
                    max={140}
                    unit="%"
                    onChange={(value) => updateSelected({ scale: value / 100 })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <SelectField
                      label="Alignment"
                      value={selectedTile.align}
                      options={[
                        { value: "start", label: "Start" },
                        { value: "center", label: "Center" },
                        { value: "end", label: "End" },
                      ]}
                      onChange={(value) => updateSelected({ align: value as TileAlign })}
                    />
                    <SelectField
                      label="Title weight"
                      value={String(selectedTile.weight)}
                      options={weightOptions}
                      onChange={(value) => updateSelected({ weight: Number(value) })}
                    />
                  </div>

                  <Separator />

                  <RangeField
                    label="Canvas gap"
                    value={project.gap}
                    min={6}
                    max={24}
                    unit="px"
                    onChange={(value) => setProjectPatch({ gap: value })}
                  />
                  <RangeField
                    label="Tile radius"
                    value={project.radius}
                    min={10}
                    max={34}
                    unit="px"
                    onChange={(value) => setProjectPatch({ radius: value })}
                  />

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-black/10 p-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="guides">Guides</Label>
                      <p className="text-xs text-black/50">
                        Overlay the {GRID_COLUMNS} x {GRID_ROWS} grid on the canvas
                      </p>
                    </div>
                    <Switch
                      id="guides"
                      checked={project.showGuides}
                      onCheckedChange={(checked) => setProjectPatch({ showGuides: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-black/10 p-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="safe-text">Safe text</Label>
                      <p className="text-xs text-black/50">Clamp long titles and body copy so they fit</p>
                    </div>
                    <Switch
                      id="safe-text"
                      checked={project.safeText}
                      onCheckedChange={(checked) => setProjectPatch({ safeText: checked })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-4 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <SelectField
                      label="Tile tone"
                      value={selectedTile.tone}
                      options={toneOptions}
                      onChange={(value) => updateSelected({ tone: value as TileTone })}
                    />
                    <SelectField
                      label="Stage"
                      value={project.stage}
                      options={stageOptions}
                      onChange={(value) => setProjectPatch({ stage: value as StageTone })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Accent</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        aria-label="Accent color picker"
                        value={selectedTile.accent}
                        onChange={(event) => updateSelected({ accent: event.target.value })}
                        className="h-9 w-12 p-1"
                      />
                      <Input
                        aria-label="Accent hex value"
                        value={selectedTile.accent}
                        onChange={(event) => updateSelected({ accent: event.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {["#0071e3", "#30d158", "#ff2d55", "#ff9f0a", "#5ac8fa"].map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={cn(
                          "h-9 rounded-lg border border-black/10 transition",
                          selectedTile.accent.toLowerCase() === color
                            ? "ring-2 ring-black ring-offset-2"
                            : "hover:scale-[1.05]"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => updateSelected({ accent: color })}
                        aria-label={color}
                        aria-pressed={selectedTile.accent.toLowerCase() === color}
                      />
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Reference set</Label>
                    <p className="text-xs text-black/50">Click one to fill the selected tile.</p>
                    <ScrollArea className="h-[260px] rounded-lg border border-black/10 p-2">
                      <div className="grid grid-cols-2 gap-2">
                        {referenceImages.map((src, index) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => applyReferenceImage(src)}
                            className="aspect-[16/10] rounded-md border border-black/10 bg-cover bg-center transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] active:scale-[0.98]"
                            style={{ backgroundImage: `url(${src})` }}
                            aria-label={`Reference ${index + 1}`}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>
              </>
            ) : (
              <div className="p-4 text-sm text-black/55">No tile selected.</div>
            )}
          </Tabs>
        </aside>
      </main>
    </div>
  );
}

function BentoTileView({
  tile,
  project,
  selected,
  onSelect,
}: {
  tile: BentoTile;
  project: BentoProject;
  selected: boolean;
  onSelect: () => void;
}) {
  const palette = tilePalette[tile.tone];
  const Icon = iconMap[tile.icon];
  const isImage = tile.kind === "image" && tile.imageUrl;
  const titleSize = getTitleSize(tile);
  const bodySize = getBodySize(tile);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative min-h-0 overflow-hidden border text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-black/25",
        selected && "ring-3 ring-black/30"
      )}
      style={
        {
          gridColumn: `span ${tile.colSpan} / span ${tile.colSpan}`,
          gridRow: `span ${tile.rowSpan} / span ${tile.rowSpan}`,
          borderRadius: `${project.radius}px`,
          background: isImage
            ? `linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.38)), url(${tile.imageUrl})`
            : palette.background,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: isImage ? tile.imageFit : "cover",
          borderColor: palette.border,
          color: palette.text,
          "--tile-accent": tile.accent,
          "--tile-muted": palette.muted,
          // Unitless: CSS multiplies by 100cqw / 1180 to scale with the canvas.
          "--tile-title": String(titleSize),
          "--tile-body": String(bodySize),
          "--tile-weight": String(tile.weight),
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "relative z-10 flex h-full min-h-0 flex-col overflow-hidden [padding:calc(20*100cqw/1180)]",
          tile.align === "center" && "items-center justify-center text-center",
          tile.align === "start" && "items-start justify-end text-left",
          tile.align === "end" && "items-end justify-end text-right",
          project.safeText && "safe-tile-text"
        )}
      >
        <TileContent tile={tile} icon={Icon} isImage={Boolean(isImage)} />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 border border-black/15" style={{ borderRadius: `${project.radius}px` }} />
      </div>
    </button>
  );
}

function TileContent({
  tile,
  icon: Icon,
  isImage,
}: {
  tile: BentoTile;
  icon: LucideIcon;
  isImage: boolean;
}) {
  const kicker = tile.kicker.trim();
  const body = tile.body.trim();

  if (tile.kind === "metric") {
    return (
      <>
        {kicker && <p className="tile-kicker">{kicker}</p>}
        <h2 className="tile-title metric-title">{tile.title}</h2>
        {body && <p className="tile-body">{body}</p>}
      </>
    );
  }

  if (tile.kind === "product") {
    // Short tiles have no room for the placeholder — text-only keeps them clean.
    const showPlaceholder = tile.rowSpan > 1;

    return (
      <div className="flex h-full w-full min-h-0 flex-col items-center justify-center gap-[calc(14*100cqw/1180)]">
        {showPlaceholder && (
          <div className="w-full min-h-0 flex-1" aria-hidden="true">
            <div className="asset-placeholder">
              <Icon />
              <span className="asset-placeholder-label">Product</span>
            </div>
          </div>
        )}
        <div className="max-w-full shrink-0 text-center">
          {kicker && <p className="tile-kicker">{kicker}</p>}
          <h2 className="tile-title compact-title">{tile.title}</h2>
          {body && <p className="tile-body">{body}</p>}
        </div>
      </div>
    );
  }

  if (tile.kind === "icon") {
    // Single-row tiles lay the medallion beside the text — stacking clips.
    if (tile.rowSpan <= 1) {
      return (
        <div className="flex h-full w-full min-h-0 items-center justify-center gap-[calc(12*100cqw/1180)]">
          <div className="icon-medallion icon-medallion-small shrink-0">
            <Icon />
          </div>
          <div className="min-w-0 text-left">
            {kicker && <p className="tile-kicker">{kicker}</p>}
            <h2 className="tile-title compact-title">{tile.title}</h2>
            {body && <p className="tile-body">{body}</p>}
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full w-full min-h-0 flex-col items-center justify-center gap-[calc(14*100cqw/1180)]">
        <div className="icon-medallion shrink-0">
          <Icon />
        </div>
        <div className="max-w-full text-center">
          {kicker && <p className="tile-kicker">{kicker}</p>}
          <h2 className="tile-title compact-title">{tile.title}</h2>
          {body && <p className="tile-body">{body}</p>}
        </div>
      </div>
    );
  }

  if (tile.kind === "image") {
    const showPlaceholder = !isImage && tile.rowSpan > 1;

    return (
      <div className={cn("flex h-full w-full min-h-0 flex-col justify-end", isImage && "text-white")}>
        {showPlaceholder && (
          <div
            className="w-full min-h-0 flex-1 [margin-bottom:calc(12*100cqw/1180)]"
            aria-hidden="true"
          >
            <div className="asset-placeholder">
              <Icon />
              <span className="asset-placeholder-label">Image</span>
            </div>
          </div>
        )}
        <div className="shrink-0">
          {kicker && <p className="tile-kicker">{kicker}</p>}
          <h2 className="tile-title compact-title">{tile.title}</h2>
          {body && <p className="tile-body">{body}</p>}
        </div>
      </div>
    );
  }

  if (tile.kind === "feature") {
    const showChip = Boolean(kicker) || tile.rowSpan > 1;

    return (
      <div className={cn("flex h-full w-full flex-col justify-center", tile.rowSpan <= 1 ? "gap-1.5" : "gap-3")}>
        {showChip && (
          <div className="feature-chip shrink-0">
            <Icon />
            {kicker || "Feature"}
          </div>
        )}
        <h2 className="tile-title compact-title">{tile.title}</h2>
        {body && <p className="tile-body">{body}</p>}
      </div>
    );
  }

  return (
    <>
      {kicker && <p className="tile-kicker">{kicker}</p>}
      <h2 className="tile-title">{tile.title}</h2>
      {body && <p className="tile-body">{body}</p>}
    </>
  );
}

function getTitleSize(tile: BentoTile) {
  let base = 21;

  if (tile.kind === "metric") {
    base = tile.rowSpan <= 1 ? 32 : 62;
  } else if (tile.kind === "headline") {
    base = tile.rowSpan >= 3 ? 38 : tile.rowSpan >= 2 ? 32 : 24;
  } else if (tile.kind === "icon") {
    base = tile.rowSpan <= 1 ? (tile.colSpan <= 2 ? 15 : 17) : 21;
  } else if (tile.kind === "feature") {
    base = tile.rowSpan <= 1 ? 19 : 24;
  } else if (tile.rowSpan >= 3) {
    base = 32;
  }

  return Math.round(base * tile.scale);
}

function getBodySize(tile: BentoTile) {
  return tile.rowSpan <= 1 ? 13 : 16;
}

function InspectorTextFields({
  tile,
  updateSelected,
}: {
  tile: BentoTile;
  updateSelected: (patch: Partial<BentoTile>) => void;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={tile.title} onChange={(event) => updateSelected({ title: event.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Kicker</Label>
        <Input value={tile.kicker} onChange={(event) => updateSelected({ kicker: event.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Body</Label>
        <Textarea
          value={tile.body}
          onChange={(event) => updateSelected({ body: event.target.value })}
          className="min-h-20 resize-none"
        />
      </div>
    </>
  );
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={(nextValue) => onChange(String(nextValue))}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <Badge variant="outline" className="tabular-nums">{value}{unit}</Badge>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(nextValue) => {
          const numeric = Array.isArray(nextValue) ? nextValue[0] : Number(nextValue);
          onChange(numeric);
        }}
      />
    </div>
  );
}

function TileActions({
  tile,
  index,
  count,
  duplicateTile,
  deleteTile,
  moveTile,
}: {
  tile: BentoTile;
  index: number;
  count: number;
  duplicateTile: (tile: BentoTile) => void;
  deleteTile: (tileId: string) => void;
  moveTile: (tileId: string, direction: -1 | 1) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-black/50">
        Tile {index + 1} of {count}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline" onClick={() => duplicateTile(tile)}>
          <Copy />
          Duplicate
        </Button>
        <Button
          type="button"
          variant="destructive"
          disabled={count <= 1}
          onClick={() => deleteTile(tile.id)}
        >
          <Trash2 />
          Delete
        </Button>
        <Button type="button" variant="outline" disabled={index <= 0} onClick={() => moveTile(tile.id, -1)}>
          <ArrowUp />
          Move up
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={index >= count - 1}
          onClick={() => moveTile(tile.id, 1)}
        >
          <ArrowDown />
          Move down
        </Button>
      </div>
    </div>
  );
}

function TooltipButton({
  label,
  children,
  ...props
}: ComponentProps<typeof Button> & {
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={label}
            {...props}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
