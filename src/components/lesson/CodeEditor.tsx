"use client";

import { Terminal, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CodeEditorProps {
    initialCode?: string; // Not used for SolPG iframe but good for API shape
}

export function CodeEditor({ initialCode }: CodeEditorProps) {
    const [key, setKey] = useState(0); // Key to force re-render/reload of iframe

    const handleReset = () => {
        setKey(prev => prev + 1);
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-border">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-border text-xs">
                <div className="flex items-center gap-2 text-text-secondary">
                    <Terminal className="w-4 h-4" />
                    <span className="font-mono">Solana Playground</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-surface-2 transition-colors text-text-secondary hover:text-text-primary"
                        title="Reset Playground"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reset</span>
                    </button>
                    {/* Run button is inside SolPG, but we can add a visual one or just rely on the embedded one. 
                        For now, keeping it clean as SolPG has its own controls. */}
                </div>
            </div>

            {/* Editor Content (Iframe) */}
            <div className="flex-1 relative">
                <iframe
                    key={key}
                    src="https://beta.solpg.io"
                    className="w-full h-full border-0 absolute inset-0"
                    title="Solana Playground"
                    allow="clipboard-read; clipboard-write"
                />
            </div>
        </div>
    );
}
