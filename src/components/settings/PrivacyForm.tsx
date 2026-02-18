"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Eye, Download, Trash2, AlertTriangle } from "lucide-react";

export function PrivacyForm() {
    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <div>
                        <h3 className="text-lg font-medium text-text-primary">Profile Visibility</h3>
                        <p className="text-sm text-text-secondary">Manage who can see your progress and achievements.</p>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <Eye className="w-5 h-5 text-primary" />
                            <div>
                                <p className="font-bold text-text-primary">Public Profile</p>
                                <p className="text-xs text-text-secondary">Allow others to find and view your skill radar and badges.</p>
                            </div>
                        </div>
                        <Switch id="public-profile" defaultChecked />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Data Management</h3>
                    <p className="text-sm text-text-secondary">Control your personal information and academy data.</p>
                </div>

                <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <Download className="w-5 h-5 text-text-secondary" />
                            <div>
                                <p className="font-bold text-text-primary">Export My Data</p>
                                <p className="text-xs text-text-secondary">Download a JSON file of your courses, XP, and achievements.</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-surface border-border hover:border-primary">Export</Button>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-border">
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl space-y-4">
                    <div className="flex items-center gap-3 text-red-500">
                        <AlertTriangle className="w-5 h-5" />
                        <h4 className="font-bold">Danger Zone</h4>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <p className="font-bold text-text-primary">Delete My Account</p>
                            <p className="text-xs text-text-secondary">Permanently remove your account and all associated data. This action is irreversible.</p>
                        </div>
                        <Button variant="destructive" className="bg-red-500 hover:bg-red-600 font-bold shrink-0">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
