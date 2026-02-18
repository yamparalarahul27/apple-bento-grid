"use client";

import React from "react";
import { useTheme, DEFAULT_COLORS } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RefreshCcw, Save } from "lucide-react";

export function ThemeController() {
    const { colors, updateColor, applyTheme, resetTheme } = useTheme();

    // Updated labels for Radix/Brand Kit tokens
    const colorLabels: Record<string, string> = {
        "--gray-1": "Background (Gray-1)",
        "--gray-2": "Surface / Card (Gray-2)",
        "--gray-3": "Border / Secondary (Gray-3)",
        "--gray-6": "Strong Border (Gray-6)",
        "--gray-11": "Muted Text (Gray-11)",
        "--gray-12": "Primary Text (Gray-12)",
        "--green-9": "Primary Brand (Green-9)",
        "--green-10": "Primary Hover (Green-10)",
        "--green-3": "Secondary/Accent (Green-3)",
    };

    return (
        <Card className="bg-surface border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold">Theme Customizer</CardTitle>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={resetTheme}
                        className="bg-surface hover:bg-surface-2 border-border"
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                    <Button
                        size="sm"
                        onClick={applyTheme}
                        className="bg-green-9 text-white hover:bg-green-10 font-bold"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Apply Globally
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.keys(DEFAULT_COLORS).map((key) => (
                        <div key={key} className="space-y-2">
                            <Label htmlFor={key} className="text-sm font-medium text-muted-foreground">
                                {colorLabels[key] || key}
                            </Label>
                            <div className="flex items-center gap-2">
                                <input
                                    id={key}
                                    type="color"
                                    value={colors[key] || DEFAULT_COLORS[key]}
                                    onChange={(e) => updateColor(key, e.target.value)}
                                    className="h-10 w-full cursor-pointer rounded-md border border-border bg-background"
                                />
                                <span className="text-xs font-mono text-foreground uppercase">
                                    {colors[key] || DEFAULT_COLORS[key]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 rounded-md bg-muted/50 border border-muted">
                    <p className="text-xs text-muted-foreground italic">
                        Changes are applied instantly for preview. Click "Apply Globally" to persist across pages.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
