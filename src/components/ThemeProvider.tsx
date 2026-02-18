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

export const DEFAULT_COLORS: ThemeColors = {
    "--background": "#101010",
    "--surface": "#1A1A1A",
    "--surface-2": "#222222",
    "--border": "#2A2A2A",
    "--green-1": "#14F195",
    "--green-2": "#9945FF",
    "--text-primary": "#FFFFFF",
    "--text-secondary": "#A0A0A0",
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
                setColors(parsed);
                applyToDom(parsed);
            } catch (e) {
                console.error("Failed to parse saved theme", e);
            }
        }
    }, []);

    const applyToDom = (themeColors: ThemeColors) => {
        const root = document.documentElement;
        Object.entries(themeColors).forEach(([key, value]) => {
            root.style.setProperty(key, value);

            // Special handling for Shadcn HSL mappings
            if (key === "--green-1") {
                root.style.setProperty("--primary", hexToHSLValues(value));
                root.style.setProperty("--ring", hexToHSLValues(value));
            }
            if (key === "--background") {
                root.style.setProperty("--foreground", luma(value) > 0.5 ? "0 0% 0%" : "0 0% 100%");
            }
        });
    };

    const luma = (hex: string) => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
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
