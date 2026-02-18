"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Globe, Moon, Bell, Info } from "lucide-react";

export function PreferencesForm() {
    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Display Language</h3>
                    <p className="text-sm text-text-secondary">Select your preferred language for the academy interface.</p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-surface-2 border border-border rounded-xl">
                    <Globe className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                        <Select defaultValue="en">
                            <SelectTrigger className="w-full bg-surface border-border">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent className="bg-surface border-border text-text-primary">
                                <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Theme Customization</h3>
                    <p className="text-sm text-text-secondary">Choose how the interface looks on your device.</p>
                </div>

                <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <Moon className="w-5 h-5 text-primary" />
                            <div>
                                <p className="font-bold text-text-primary">Dark Mode</p>
                                <p className="text-xs text-text-secondary">Easier on the eyes in low light.</p>
                            </div>
                        </div>
                        <Switch id="dark-mode" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-text-primary">Notifications</h3>
                        <p className="text-sm text-text-secondary">Control which alerts you receive.</p>
                    </div>
                    <Bell className="w-5 h-5 text-primary" />
                </div>

                <div className="bg-surface-2 border border-border rounded-xl divide-y divide-border/50">
                    <div className="flex items-center justify-between p-4">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold text-text-primary">Course Updates</Label>
                            <p className="text-sm text-text-secondary">New lessons and challenges available.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold text-text-primary">Achievements</Label>
                            <p className="text-sm text-text-secondary">When you earn a new badge or credential.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold text-text-primary">Community</Label>
                            <p className="text-sm text-text-secondary">Mentions and replies in discussions.</p>
                        </div>
                        <Switch />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex gap-4">
                <Info className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm text-text-secondary leading-relaxed">
                    Some preferences may take a few seconds to apply globally across the platform.
                </p>
            </div>
        </div>
    );
}
