"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ReactNode } from "react";

interface ResizableLessonLayoutProps {
    sidebar: ReactNode;
    content: ReactNode;
    defaultLayout?: number[];
}

export function ResizableLessonLayout({ sidebar, content, defaultLayout = [20, 80] }: ResizableLessonLayoutProps) {
    return (
        <div className="h-[calc(100vh-64px)] w-full overflow-hidden">
            <ResizablePanelGroup orientation="horizontal" className="h-full items-stretch">
                {/* Sidebar Panel */}
                <ResizablePanel defaultSize={defaultLayout[0]} minSize={15} maxSize={30}>
                    <div className="h-full">
                        {sidebar}
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Main Content Panel */}
                <ResizablePanel defaultSize={defaultLayout[1]}>
                    <div className="h-full overflow-hidden">
                        {content}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
