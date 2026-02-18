"use client";

import { Button } from "@/components/ui/button";
import { Wallet, Mail, Github, Link as LinkIcon, CheckCircle2 } from "lucide-react";

export function AccountForm() {
    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Connected Wallets</h3>
                    <p className="text-sm text-text-secondary">Manage the wallets linked to your account for on-chain credentials.</p>
                </div>

                <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Wallet className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-text-primary">Phantom</p>
                                <p className="text-xs font-mono text-text-secondary">7xW...k3p</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Primary</span>
                            <Button variant="ghost" size="sm" className="text-text-secondary hover:text-red-500">Unlink</Button>
                        </div>
                    </div>
                </div>

                <Button variant="outline" className="w-full border-dashed border-border hover:border-primary/50 text-text-secondary">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Link Another Wallet
                </Button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Linked Accounts</h3>
                    <p className="text-sm text-text-secondary">Link your social accounts for easier login and recovery.</p>
                </div>

                <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-text-primary">Google</p>
                                <p className="text-xs text-text-secondary">rahul.y@example.com</p>
                            </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-xl opacity-60">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                <Github className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-text-primary">GitHub</p>
                                <p className="text-xs text-text-secondary">Not linked</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-surface border-border hover:border-primary">Link</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
