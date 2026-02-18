"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // I should check if this exists
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Twitter, Github, MessageSquare } from "lucide-react";

export function ProfileForm() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-lg font-medium text-text-primary">Profile Image</h3>
                    <p className="text-sm text-text-secondary">Update your profile picture.</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <Avatar className="w-24 h-24 border-2 border-border group-hover:border-primary/50 transition-colors">
                            <AvatarImage src="/pf/pf 1.png" className="object-cover" />
                            <AvatarFallback>RY</AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-lg border-2 border-surface hover:scale-110 transition-transform">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        <Button variant="outline" size="sm" className="bg-surface-2 border-border hover:border-primary/50">
                            Upload New
                        </Button>
                        <p className="text-xs text-text-secondary">JPG, PNG or GIF. Max 800kB.</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" defaultValue="Rahul Yamparala" className="bg-surface-2 border-border focus:ring-primary" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                        id="bio"
                        defaultValue="Full-stack developer diving into Solana. Building the future of Web3, one block at a time."
                        className="flex min-h-[100px] w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Social Links</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
                            <Twitter className="w-5 h-5 text-text-secondary" />
                        </div>
                        <Input placeholder="Twitter URL" defaultValue="https://twitter.com/ryamparala" className="bg-surface-2 border-border" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
                            <Github className="w-5 h-5 text-text-secondary" />
                        </div>
                        <Input placeholder="GitHub URL" defaultValue="https://github.com/ryamparala" className="bg-surface-2 border-border" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
                            <MessageSquare className="w-5 h-5 text-text-secondary" />
                        </div>
                        <Input placeholder="Discord Username" defaultValue="ryamparala#1234" className="bg-surface-2 border-border" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-border">
                <Button variant="ghost" className="text-text-secondary hover:text-text-primary">Cancel</Button>
                <Button className="bg-primary text-primary-foreground hover:opacity-90">Save Changes</Button>
            </div>
        </div>
    );
}
