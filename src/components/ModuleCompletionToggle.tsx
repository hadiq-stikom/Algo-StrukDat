"use client";

import React from "react";
import { useModuleProgress } from "@/hooks/useModuleProgress";

interface ModuleCompletionToggleProps {
    moduleId: number;
}

export default function ModuleCompletionToggle({ moduleId }: ModuleCompletionToggleProps) {
    const { isCompleted: isModuleCompleted, toggleModuleCompletion } = useModuleProgress();
    const completed = isModuleCompleted(moduleId);

    return (
        <div className="mt-12 p-8 rounded-3xl border-2 border-dashed transition-all duration-500 bg-linear-to-b from-transparent to-primary/5 border-primary/20 hover:border-primary/40 text-center">
            <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-500 ${completed ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-primary/10 text-primary'}`}>
                <span className="material-symbols-outlined text-3xl">
                    {completed ? 'check_circle' : 'auto_awesome'}
                </span>
            </div>

            <h3 className="text-xl font-bold mb-2">
                {completed ? 'Materi Selesai!' : 'Sudah Selesai Membaca?'}
            </h3>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
                {completed
                    ? 'Bagus! Progresmu telah disimpan di perangkat ini. Kamu bisa tetap membaca atau kembali ke dashboard.'
                    : 'Klik tombol di bawah untuk menandai materi ini sebagai selesai dan simpan progres belajarmu.'}
            </p>

            <button
                onClick={() => toggleModuleCompletion(moduleId)}
                className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto shadow-lg shadow-primary/20 ${completed
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        : 'bg-primary text-white'
                    }`}
            >
                <span className="material-symbols-outlined text-sm">
                    {completed ? 'undo' : 'done_all'}
                </span>
                {completed ? 'Batalkan Selesai' : 'Tandai Selesai'}
            </button>
        </div>
    );
}
