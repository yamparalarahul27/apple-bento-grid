"use client";

import { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps extends LucideProps {
    icon: LucideIcon;
    variant?: "default" | "bold";
}

/**
 * A wrapper for Lucide icons that enforces the Superteam design aesthetic.
 * Default stroke weight is 2px to match the bold typography and flat design.
 */
export function Icon({
    icon: LucideIcon,
    variant = "bold",
    className,
    strokeWidth,
    ...props
}: IconProps) {
    return (
        <LucideIcon
            className={cn("shrink-0", className)}
            strokeWidth={strokeWidth ?? (variant === "bold" ? 2.5 : 2)}
            {...props}
        />
    );
}
