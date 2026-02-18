"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColors = {
    [key: string]: string;
};

const ThemeContext = createContext<{
    colors: ThemeColors;
    updateColor: (key: string, value: string) => void;
    applyTheme: () => void;
    resetTheme: () => void;
} | null>(null);

// Updated with Radix Dark Mode Defaults
export const DEFAULT_COLORS: ThemeColors = {
    "--gray-1": "#111113",   // Background
    "--gray-2": "#19191b",   // Surface/Card
    "--gray-3": "#222325",   // Secondary/Border
    "--gray-6": "#393a40",   // Strong Border
    "--gray-11": "#b2b3bd",  // Muted Text
    "--gray-12": "#eeeef0",  // Primary Text
    "--green-9": "#008c4c",  // Brand Primary
    "--green-10": "#007e3f", // Hover
    "--green-3": "#0c2e1a",  // Saturated Dark Green
};

// Helper to convert hex to HSL string for Shadcn variables
function hexToHSLValues(hex: string): string {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [colors, setColors] = useState<ThemeColors>(DEFAULT_COLORS);

    useEffect(() => {
        const savedTheme = localStorage.getItem("app-theme");
        if (savedTheme) {
            try {
                const parsed = JSON.parse(savedTheme);
                // Ensure legacy themes don't break new system
                if (parsed["--green-1"]) {
                    console.log("Legacy theme detected, resetting to defaults.");
                    localStorage.removeItem("app-theme");
                    setColors(DEFAULT_COLORS);
                } else {
                    setColors(parsed);
                    applyToDom(parsed);
                }
            } catch (e) {
                console.error("Failed to parse saved theme", e);
            }
        }
    }, []);

    const applyToDom = (themeColors: ThemeColors) => {
        const root = document.documentElement;
        Object.entries(themeColors).forEach(([key, value]) => {
            root.style.setProperty(key, value);

            // Map Radix to Semantic Variables (Shadcn)
            if (key === "--green-9") {
                const hsl = hexToHSLValues(value);
                root.style.setProperty("--primary", hsl);
                root.style.setProperty("--ring", hsl);
            }
            if (key === "--gray-1") {
                const hsl = hexToHSLValues(value);
                root.style.setProperty("--background", hsl);
                root.style.setProperty("--card", hsl); // Usually card matches background in some designs, or gray-2
            }
            if (key === "--gray-2") {
                const hsl = hexToHSLValues(value);
                // If cards should be gray-2
                root.style.setProperty("--card", hsl);
                root.style.setProperty("--popover", hsl);
            }
            if (key === "--gray-12") {
                const hsl = hexToHSLValues(value);
                root.style.setProperty("--foreground", hsl);
                root.style.setProperty("--card-foreground", hsl);
                root.style.setProperty("--popover-foreground", hsl);
            }
        });
    };

    const updateColor = (key: string, value: string) => {
        const newColors = { ...colors, [key]: value };
        setColors(newColors);
        applyToDom(newColors);
    };

    const applyTheme = () => {
        localStorage.setItem("app-theme", JSON.stringify(colors));
    };

    const resetTheme = () => {
        setColors(DEFAULT_COLORS);
        applyToDom(DEFAULT_COLORS);
        localStorage.removeItem("app-theme");
    };

    return (
        <ThemeContext.Provider value={{ colors, updateColor, applyTheme, resetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}
