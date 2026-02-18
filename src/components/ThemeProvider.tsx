"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColors = {
    [key: string]: string;
};

type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext<{
    colors: ThemeColors;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    updateColor: (key: string, value: string) => void;
    applyTheme: () => void;
    resetTheme: () => void;
} | null>(null);

// Radix Dark Mode Defaults
export const DARK_COLORS: ThemeColors = {
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

// Radix Light Mode Defaults (Approximation for now)
export const LIGHT_COLORS: ThemeColors = {
    "--gray-1": "#ffffff",   // Background
    "--gray-2": "#f9f9fb",   // Surface/Card
    "--gray-3": "#e2e2e5",   // Secondary/Border
    "--gray-6": "#d3d3d6",   // Strong Border
    "--gray-11": "#64656a",  // Muted Text
    "--gray-12": "#111113",  // Primary Text
    "--green-9": "#009955",  // Brand Primary
    "--green-10": "#00cf73", // Hover
    "--green-3": "#e6f8ef",  // Light Green Tint
};

function hexToHSL(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "0 0% 0%";
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max !== min) {
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
    const [mode, setModeState] = useState<ThemeMode>('dark');
    const [colors, setColors] = useState<ThemeColors>(DARK_COLORS);

    useEffect(() => {
        const savedMode = localStorage.getItem("app-mode") as ThemeMode;
        if (savedMode === 'light') {
            setModeState('light');
            setColors(LIGHT_COLORS);
            applyToDom({ ...LIGHT_COLORS }, 'light');
        } else {
            // Default to dark
            setModeState('dark');
            setColors(DARK_COLORS);
            applyToDom({ ...DARK_COLORS }, 'dark');
        }
    }, []);

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
        const newColors = newMode === 'light' ? LIGHT_COLORS : DARK_COLORS;
        setColors(newColors);
        applyToDom(newColors, newMode);
        localStorage.setItem("app-mode", newMode);
    };

    const applyToDom = (themeColors: ThemeColors, currentMode: ThemeMode) => {
        const root = document.documentElement;

        // Handle standard "dark" class for tailwind
        if (currentMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Apply dynamic CSS variables
        Object.entries(themeColors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        // Map to standard Shadcn/Tailwind vars
        // We calculate HSL on the fly to support dynamic changes
        root.style.setProperty("--background", hexToHSL(themeColors["--gray-1"]));
        root.style.setProperty("--foreground", hexToHSL(themeColors["--gray-12"]));
        root.style.setProperty("--card", hexToHSL(themeColors["--gray-2"]));
        root.style.setProperty("--card-foreground", hexToHSL(themeColors["--gray-12"]));
        root.style.setProperty("--popover", hexToHSL(themeColors["--gray-2"]));
        root.style.setProperty("--popover-foreground", hexToHSL(themeColors["--gray-12"]));
        root.style.setProperty("--primary", hexToHSL(themeColors["--green-9"]));
        root.style.setProperty("--primary-foreground", "0 0% 100%"); // Always white for better contrast on green
        root.style.setProperty("--secondary", hexToHSL(themeColors["--gray-3"]));
        root.style.setProperty("--secondary-foreground", hexToHSL(themeColors["--gray-12"]));
        root.style.setProperty("--muted", hexToHSL(themeColors["--gray-3"]));
        root.style.setProperty("--muted-foreground", hexToHSL(themeColors["--gray-11"]));
        root.style.setProperty("--accent", hexToHSL(themeColors["--gray-3"]));
        root.style.setProperty("--accent-foreground", hexToHSL(themeColors["--gray-12"]));
        root.style.setProperty("--destructive", "0 62.8% 30.6%");
        root.style.setProperty("--destructive-foreground", "0 0% 98%");
        root.style.setProperty("--border", hexToHSL(themeColors["--gray-6"]));
        root.style.setProperty("--input", hexToHSL(themeColors["--gray-6"]));
        root.style.setProperty("--ring", hexToHSL(themeColors["--green-9"]));
    };

    const updateColor = (key: string, value: string) => {
        const newColors = { ...colors, [key]: value };
        setColors(newColors);
        applyToDom(newColors, mode);
    };

    const applyTheme = () => {
        // Legacy support if needed, or trigger specific checks
    };

    const resetTheme = () => {
        setMode('dark');
    };

    return (
        <ThemeContext.Provider value={{ colors, mode, setMode, updateColor, applyTheme, resetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}
