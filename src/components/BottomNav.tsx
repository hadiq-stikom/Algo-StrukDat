"use client";

import React from "react";
import Link from "next/link";

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-bg-base/90 backdrop-blur-lg border-t border-primary/20 pb-safe-area">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
                <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="/">
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
                </Link>
                <a className="flex flex-col items-center gap-1 text-primary" href="#">
                    <span className="material-symbols-outlined filled" style={{ fontVariationSettings: "'FILL' 1" }}>book_2</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Catalog</span>
                </a>
                <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="/uts">
                    <span className="material-symbols-outlined">quiz</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider">UTS</span>
                </Link>
                <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="/admin/uts">
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider">Admin</span>
                </Link>
            </div>
        </nav>
    );
}
