"use client";

import React from "react";
import Link from "next/link";
import { useModuleProgress } from "@/hooks/useModuleProgress";
import { modules } from "@/data/modules";

interface ModuleIndexProps {
    currentModuleId?: number;
    showLabel?: boolean;
}

export default function ModuleIndex({ currentModuleId, showLabel = true }: ModuleIndexProps) {
    const { isCompleted } = useModuleProgress();

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Loncati ke Materi</h2>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">1-14</span>
                </div>
            )}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pl-5 pb-1 pt-8 -mt-7 mask-fade-right">
                {modules.map((module) => {
                    const completed = isCompleted(module.id);
                    const isCurrent = module.id === currentModuleId;

                    return (
                        <Link
                            key={module.id}
                            href={`/modules/${module.id}`}
                            className={`group/navitem relative flex-none w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all border ${isCurrent
                                ? "bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-110 z-10"
                                : completed
                                    ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20"
                                    : "bg-white dark:bg-surface border-primary/10 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:scale-105"
                                }`}
                        >
                            {module.id}

                            {/* Custom Fast Tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-bold rounded shadow-xl opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible group-hover/navitem:translate-y-0 translate-y-1 transition-all duration-75 whitespace-nowrap z-50 pointer-events-none">
                                {module.title}
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-slate-900 dark:border-t-slate-100"></div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
