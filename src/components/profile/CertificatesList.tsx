import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Assuming Card component exists
import { Download, ExternalLink, Award } from "lucide-react";
import Link from "next/link";

interface Certificate {
    id: string;
    title: string;
    issueDate: string;
    issuer: string;
    image: string; // URL to certificate image
}

interface CertificatesListProps {
    certificates: Certificate[];
}

export function CertificatesList({ certificates }: CertificatesListProps) {
    if (certificates.length === 0) {
        return (
            <div className="bg-surface border border-border rounded-lg p-6 text-center">
                <h3 className="text-lg font-bold text-text-primary mb-2">Certificates</h3>
                <div className="py-8 flex flex-col items-center justify-center text-text-secondary">
                    <Award className="w-12 h-12 mb-3 opacity-20" />
                    <p>No certificates earned yet.</p>
                    <p className="text-sm mt-1">Complete courses to earn certificates!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Certificates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                    <div key={cert.id} className="group relative overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-primary/50">
                        <div className="aspect-video bg-surface-2 flex items-center justify-center relative">
                            {/* Fallback visual for certificate */}
                            <div className="border-4 border-double border-primary/20 w-3/4 h-3/4 flex flex-col items-center justify-center p-4 text-center bg-white/5">
                                <Award className="w-8 h-8 text-primary mb-2" />
                                <span className="text-[10px] uppercase tracking-widest text-text-secondary">Certificate of Completion</span>
                                <span className="font-serif font-bold text-primary mt-1">{cert.title}</span>
                            </div>

                            {/* Overlay actions */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button size="sm" variant="secondary" asChild>
                                    <Link href={`/certificates/${cert.id}`} target="_blank">
                                        <ExternalLink className="w-4 h-4 mr-1" /> View
                                    </Link>
                                </Button>
                                <Button size="sm" variant="outline">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-3">
                            <h4 className="font-semibold text-text-primary line-clamp-1">{cert.title}</h4>
                            <div className="flex justify-between text-xs text-text-secondary mt-1">
                                <span>{cert.issuer}</span>
                                <span>{cert.issueDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
