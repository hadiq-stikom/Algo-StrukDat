"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Complexity = "O(1)" | "O(log n)" | "O(n)" | "O(n^2)";

export default function BigOVisualizer() {
    const [n, setN] = useState(5);
    const [complexity, setComplexity] = useState<Complexity>("O(n)");

    const calculateOperations = (c: Complexity, val: number) => {
        switch (c) {
            case "O(1)": return 1;
            case "O(log n)": return Math.ceil(Math.log2(val || 1)) || 1;
            case "O(n)": return val;
            case "O(n^2)": return val * val;
            default: return 0;
        }
    };

    const opCount = useMemo(() => calculateOperations(complexity, n), [n, complexity]);

    const renderBlocks = () => {
        const blocks = [];
        const count = opCount;

        // Cap visual blocks to avoid browser lag, but show actual number in text
        const visualCount = Math.min(count, 100);

        for (let i = 0; i < visualCount; i++) {
            blocks.push(
                <motion.div
                    key={i}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className={`w-4 h-4 rounded-sm shadow-sm ${complexity === "O(1)" ? "bg-emerald-500" :
                            complexity === "O(log n)" ? "bg-cyan-500" :
                                complexity === "O(n)" ? "bg-blue-500" : "bg-red-500"
                        }`}
                />
            );
        }
        return blocks;
    };

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="flex-1">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 italic">Big O Complexity Simulator</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Ubah nilai <span className="font-bold text-primary italic">N</span> untuk melihat bagaimana jumlah operasi berkembang.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {(["O(1)", "O(log n)", "O(n)", "O(n^2)"] as Complexity[]).map((c) => (
                        <button
                            key={c}
                            onClick={() => setComplexity(c)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all border-2 ${complexity === c
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/50"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center mb-6">
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest italic">Input Size (N)</span>
                            <span className="text-xl font-black text-primary italic">{n}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            value={n}
                            onChange={(e) => setN(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                            <span>Kecil (1)</span>
                            <span>Besar (20)</span>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border-2 transition-colors ${complexity === "O(1)" ? "bg-emerald-500/10 border-emerald-500/30" :
                            complexity === "O(log n)" ? "bg-cyan-500/10 border-cyan-500/30" :
                                complexity === "O(n)" ? "bg-blue-500/10 border-blue-500/30" : "bg-red-500/10 border-red-500/30"
                        }`}>
                        <div className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Total Operasi</div>
                        <div className={`text-4xl font-black italic ${complexity === "O(1)" ? "text-emerald-600" :
                                complexity === "O(log n)" ? "text-cyan-600" :
                                    complexity === "O(n)" ? "text-blue-600" : "text-red-600"
                            }`}>
                            {opCount.toLocaleString()}
                            <span className="text-xs ml-1 font-bold text-slate-400 italic">langkah</span>
                        </div>
                        <p className="text-[11px] mt-2 text-slate-600 dark:text-slate-400 font-medium leading-tight italic">
                            {complexity === "O(1)" && "Waktu konstan. Mau sejuta data pun, tetap secepat kilat!"}
                            {complexity === "O(log n)" && "Sangat efisien! Menambah data berlipat ganda hanya menambah sedikit langkah."}
                            {complexity === "O(n)" && "Pertumbuhan linear. Performa adil, sebanding lurus dengan jumlah data."}
                            {complexity === "O(n^2)" && "Hati-hati! Data bertambah sedikit, sistem bisa terbebani sangat berat."}
                        </p>
                    </div>
                </div>

                <div className="md:col-span-8 bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-6 min-h-[220px] flex flex-wrap content-start items-center justify-center gap-1.5 border-2 border-dashed border-slate-200 dark:border-slate-800 relative overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        {renderBlocks()}
                    </AnimatePresence>
                    {opCount > 100 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px]">
                            <div className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-widest">
                                Visualisasi Terpotong (+{opCount - 100})
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
