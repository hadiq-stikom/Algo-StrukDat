import React from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import UTSContent from "@/components/modules/UTSContent";

export default function UTSPage() {
    return (
        <div className="flex flex-col min-h-screen bg-bg-base">
            <header className="sticky top-0 z-20 bg-bg-base/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-4xl mx-auto w-full p-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-xl font-black uppercase tracking-tight text-primary">UTS: Algoritma & Struktur Data</h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full">
                <UTSContent />
            </main>

            <BottomNav />
        </div>
    );
}
