"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { ThemeController } from "@/components/design-system/ThemeController";

export default function DesignSystemPage() {
    return (
        <div className="container mx-auto py-12 space-y-12">
            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Design System</h1>
                    <p className="text-text-secondary">
                        Base components and style guide for Superteam Brazil Academy.
                    </p>
                </div>
                <ThemeController />
            </div>

            {/* Colors */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ColorSwatch name="Background" variable="bg-background" />
                    <ColorSwatch name="Surface" variable="bg-surface" />
                    <ColorSwatch name="Surface-2" variable="bg-surface-2" />
                    <ColorSwatch name="Border" variable="bg-border" />
                    <ColorSwatch name="Primary (Green-9)" variable="bg-primary" />
                    <ColorSwatch name="Primary Hover (Green-10)" variable="bg-green-10" />
                    <ColorSwatch name="Secondary (Gray-3)" variable="bg-secondary" />
                    <ColorSwatch name="Accent (Gray-3)" variable="bg-accent" />
                    <ColorSwatch name="Muted (Gray-3)" variable="bg-muted" />
                    <ColorSwatch name="Destructive" variable="bg-destructive" />
                </div>
            </section>

            {/* Typography */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Typography</h2>
                <div className="space-y-2 p-6 rounded-lg border border-border bg-surface">
                    <h1 className="text-4xl font-bold">Heading 1 (text-4xl)</h1>
                    <h2 className="text-3xl font-bold">Heading 2 (text-3xl)</h2>
                    <h3 className="text-2xl font-bold">Heading 3 (text-2xl)</h3>
                    <h4 className="text-xl font-bold">Heading 4 (text-xl)</h4>
                    <p className="text-base text-text-primary">
                        Body text (text-base). The quick brown fox jumps over the lazy dog.
                    </p>
                    <p className="text-sm text-text-secondary">
                        Small text (text-sm). Used for secondary information and captions.
                    </p>
                </div>
            </section>

            {/* Buttons */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Buttons</h2>
                <div className="flex flex-wrap gap-4 p-6 rounded-lg border border-border bg-surface">
                    <Button>Default (Primary)</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </section>

            {/* Inputs */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Inputs</h2>
                <div className="max-w-md space-y-4 p-6 rounded-lg border border-border bg-surface">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Name" />
                    </div>
                </div>
            </section>

            {/* Cards */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Cards</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description goes here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card content. This card uses the default shadcn styling mapped to our surface colors.</p>
                        </CardContent>
                        <CardFooter>
                            <Button>Action</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* Sheet */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Sheet (Drawer)</h2>
                <div className="p-6 rounded-lg border border-border bg-surface">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">Open Sheet</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </section>
        </div>
    );
}

function ColorSwatch({ name, variable }: { name: string; variable: string }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-md bg-surface border border-border">
            <div className={`h-10 w-10 rounded-md border border-border ${variable}`}></div>
            <div className="text-sm font-medium">{name}</div>
        </div>
    );
}
