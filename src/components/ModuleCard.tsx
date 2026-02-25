"use client";

import React from "react";
import { Module } from "@/data/modules";
import Link from "next/link";
import { useModuleProgress } from "@/hooks/useModuleProgress";

interface ModuleCardProps {
    module: Module;
}

const colorVariants: Record<string, string> = {
    indigo: "bg-indigo-500/20 text-indigo-400",
    blue: "bg-blue-500/20 text-blue-400",
    amber: "bg-amber-500/20 text-amber-400",
    emerald: "bg-emerald-500/20 text-emerald-400",
    rose: "bg-rose-500/20 text-rose-400",
    cyan: "bg-cyan-500/20 text-cyan-400",
    violet: "bg-violet-500/20 text-violet-400",
    orange: "bg-orange-500/20 text-orange-400",
    pink: "bg-pink-500/20 text-pink-400",
    purple: "bg-purple-500/20 text-purple-400",
    lime: "bg-lime-500/20 text-lime-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    sky: "bg-sky-500/20 text-sky-400",
    red: "bg-red-500/20 text-red-400",
};

export default function ModuleCard({ module }: ModuleCardProps) {
    const { isCompleted: isModuleCompleted } = useModuleProgress();
    const completed = isModuleCompleted(module.id);
    const progress = completed ? 100 : 0; // In a real app we might have partial progress, but starting with binary for now

    return (
        <Link href={`/modules/${module.id}`} className="block">
            <div className={`bg-white dark:bg-surface p-4 rounded-xl border transition-all shadow-sm flex flex-col gap-4 group ${completed ? 'border-emerald-500/30' : 'border-primary/5 hover:border-primary/40'}`}>
                <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg transition-colors ${completed ? 'bg-emerald-500/20 text-emerald-400' : (colorVariants[module.color] || "bg-primary/20 text-primary")}`}>
                        <span className="material-symbols-outlined">{completed ? 'check_circle' : module.icon}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded tracking-widest ${completed ? 'text-emerald-500 bg-emerald-500/10' : 'text-slate-400 bg-slate-400/10'}`}>
                        {completed ? 'SELESAI' : 'BELUM'}
                    </span>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        {module.id}. {module.title}
                        {completed && <span className="material-symbols-outlined text-emerald-500 text-sm">verified</span>}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{module.description}</p>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-1">Learning Outcome</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">"{module.learningOutcome}"</p>
                    </div>
                </div>
                <div className="mt-auto flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={`${completed ? 'bg-emerald-500' : 'bg-primary'} h-full transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className={`${completed ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-primary text-white'} px-4 py-2 rounded-lg font-bold text-sm group-hover:scale-105 transition-transform`}>
                        {completed ? "Review" : "Mulai"}
                    </div>
                </div>
            </div>
        </Link>
    );
}
