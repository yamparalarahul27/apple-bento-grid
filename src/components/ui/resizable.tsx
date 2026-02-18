"use client"

import { GripVertical } from "lucide-react"
import { Group, Panel, Separator, PanelProps, GroupProps, SeparatorProps } from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  orientation = "horizontal",
  ...props
}: GroupProps) => (
  <Group
    orientation={orientation}
    className={cn(
      "flex h-full w-full",
      orientation === "vertical" ? "flex-col" : "",
      className
    )}
    {...props}
  />
)

const ResizablePanel = Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: SeparatorProps & {
  withHandle?: boolean
}) => (
  <Separator
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
      // Basic vertical handle (for horizontal layout)
      "w-px h-full after:w-1 after:h-full",
      // Horizontal handle (for vertical layout) - handled via data attribute if present, or we can assume context
      // Note: react-resizable-panels might not expose parent orientation to separator easily via CSS without data attributes
      // For now, let's stick to the default styles which assume vertical separator (horizontal layout)
      // and let the library handle the actual functioning. Visual rotation of handle might strictly need the attribute.
      // Re-adding the data-attribute selector just in case the library DOES add it, or we can inspect later
      "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </Separator>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
