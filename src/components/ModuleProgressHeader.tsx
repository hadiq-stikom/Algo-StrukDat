"use client";

import React from "react";
import { useModuleProgress } from "@/hooks/useModuleProgress";

interface ModuleProgressHeaderProps {
    moduleId: number;
}

export default function ModuleProgressHeader({ moduleId }: ModuleProgressHeaderProps) {
    const { isCompleted: isModuleCompleted } = useModuleProgress();
    const completed = isModuleCompleted(moduleId);
    const progress = completed ? 100 : 0;

    return (
        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-primary/5">
            <div className="flex-1">
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Completion Progress</span>
                    <span className={`text-sm font-bold ${completed ? 'text-emerald-500' : 'text-primary'}`}>
                        {progress}%
                    </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className={`${completed ? 'bg-emerald-500' : 'bg-primary'} h-full transition-all duration-1000`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
