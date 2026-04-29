import React from "react";
import Link from "next/link";
import AdminUTSValidator from "@/components/AdminUTSValidator";

export default function AdminUTSPage() {
    return (
        <div className="min-h-screen bg-bg-base">
            <header className="sticky top-0 z-20 bg-bg-base/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-5xl mx-auto w-full p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-xl font-black uppercase tracking-tight text-primary">Admin Panel: UTS Validator</h1>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full border border-red-500/20">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        <span className="text-[10px] font-black uppercase">Private Access</span>
                    </div>
                </div>
            </header>

            <main className="w-full">
                <AdminUTSValidator />
            </main>
        </div>
    );
}
