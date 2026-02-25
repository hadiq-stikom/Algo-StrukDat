"use client";

import React from "react";
import Link from "next/link";
import ModuleIndex from "./ModuleIndex";

export default function Header() {
    return (
        <header className="sticky top-0 z-20 bg-bg-base/80 backdrop-blur-md border-b border-primary/10">
            <div className="flex items-center p-4 justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-primary">terminal</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">Algoritma & Struktur Data</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-primary font-black bg-primary/10 px-2 py-0.5 rounded uppercase tracking-tighter">
                                by Hadiq
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <img
                        src="/lecturer.jpg"
                        alt="Hadiq"
                        className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                    />
                </div>
            </div>

            {/* Quick Access Index Materi */}
            <div className="px-4 pb-4">
                <ModuleIndex />
            </div>
        </header>
    );
}
