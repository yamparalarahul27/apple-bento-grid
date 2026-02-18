"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Download, Link, Share2 } from "lucide-react";

export function CertificateActions() {
    const handleShare = (platform: string) => {
        // Mock sharing logic
        console.log(`Sharing on ${platform}`);
    };

    const handleDownload = () => {
        // Mock download logic
        alert("Certificate downloading... (This is a mock for the demo)");
    };

    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-text-secondary uppercase tracking-widest px-1">Share Achievement</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Button
                    variant="outline"
                    className="bg-surface border-border hover:border-primary hover:text-primary gap-2 h-11"
                    onClick={() => handleShare('twitter')}
                >
                    <Twitter className="w-4 h-4" />
                    Twitter
                </Button>
                <Button
                    variant="outline"
                    className="bg-surface border-border hover:border-primary hover:text-primary gap-2 h-11"
                    onClick={() => handleShare('linkedin')}
                >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                </Button>
                <Button
                    variant="outline"
                    className="bg-surface border-border hover:border-primary hover:text-primary gap-2 h-11"
                    onClick={() => handleShare('link')}
                >
                    <Link className="w-4 h-4" />
                    Copy Link
                </Button>
                <Button
                    className="bg-primary text-primary-foreground hover:opacity-90 gap-2 h-11"
                    onClick={handleDownload}
                >
                    <Download className="w-4 h-4" />
                    Download
                </Button>
            </div>

            <p className="text-center text-xs text-text-secondary mt-2">
                Verified certificates can be added to your LinkedIn Licenses & Certifications.
            </p>
        </div>
    );
}
