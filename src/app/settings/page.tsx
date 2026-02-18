"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { AccountForm } from "@/components/settings/AccountForm";
import { PreferencesForm } from "@/components/settings/PreferencesForm";
import { PrivacyForm } from "@/components/settings/PrivacyForm";
import { User, Shield, Sliders, Lock } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="container max-w-4xl py-12 px-4 md:px-6 min-h-screen">
            <div className="mb-10">
                <h1 className="text-h2 font-bold text-text-primary mb-2">Settings</h1>
                <p className="text-text-secondary">Manage your account settings and set e-mail preferences.</p>
            </div>

            <Tabs defaultValue="profile" className="w-full flex flex-col md:flex-row gap-8 items-start">
                <TabsList className="flex md:flex-col h-auto bg-transparent border-b md:border-b-0 md:border-r border-border p-0 gap-2 w-full md:w-64 shrink-0 overflow-x-auto md:overflow-x-visible">
                    <TabsTrigger
                        value="profile"
                        className="flex items-center justify-start gap-3 px-4 py-3 text-sm font-bold text-text-secondary data-[state=active]:text-primary data-[state=active]:bg-primary/5 rounded-lg transition-all border-b-2 border-transparent data-[state=active]:border-primary md:border-b-0 md:data-[state=active]:border-r-2"
                    >
                        <User className="w-4 h-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger
                        value="account"
                        className="flex items-center justify-start gap-3 px-4 py-3 text-sm font-bold text-text-secondary data-[state=active]:text-primary data-[state=active]:bg-primary/5 rounded-lg transition-all border-b-2 border-transparent data-[state=active]:border-primary md:border-b-0 md:data-[state=active]:border-r-2"
                    >
                        <Shield className="w-4 h-4" />
                        Account
                    </TabsTrigger>
                    <TabsTrigger
                        value="preferences"
                        className="flex items-center justify-start gap-3 px-4 py-3 text-sm font-bold text-text-secondary data-[state=active]:text-primary data-[state=active]:bg-primary/5 rounded-lg transition-all border-b-2 border-transparent data-[state=active]:border-primary md:border-b-0 md:data-[state=active]:border-r-2"
                    >
                        <Sliders className="w-4 h-4" />
                        Preferences
                    </TabsTrigger>
                    <TabsTrigger
                        value="privacy"
                        className="flex items-center justify-start gap-3 px-4 py-3 text-sm font-bold text-text-secondary data-[state=active]:text-primary data-[state=active]:bg-primary/5 rounded-lg transition-all border-b-2 border-transparent data-[state=active]:border-primary md:border-b-0 md:data-[state=active]:border-r-2"
                    >
                        <Lock className="w-4 h-4" />
                        Privacy
                    </TabsTrigger>
                </TabsList>

                <div className="flex-1 w-full bg-surface border border-border rounded-2xl p-6 md:p-8">
                    <TabsContent value="profile" className="mt-0 focus-visible:outline-none">
                        <ProfileForm />
                    </TabsContent>
                    <TabsContent value="account" className="mt-0 focus-visible:outline-none">
                        <AccountForm />
                    </TabsContent>
                    <TabsContent value="preferences" className="mt-0 focus-visible:outline-none">
                        <PreferencesForm />
                    </TabsContent>
                    <TabsContent value="privacy" className="mt-0 focus-visible:outline-none">
                        <PrivacyForm />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
