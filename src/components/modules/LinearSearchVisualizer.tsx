"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Step {
    current: number;
    checked: number[];
    found: number | null;
    message: string;
}

const INITIAL_DATA = [4, 2, 7, 1, 9, 3, 8];
const DEFAULT_TARGET = 9;

function generateLinearSearchSteps(data: number[], target: number): Step[] {
    const steps: Step[] = [];
    const checked: number[] = [];

    steps.push({
        current: -1,
        checked: [],
        found: null,
        message: `Mulai Linear Search: cari target = ${target} di array [${data.join(", ")}]`,
    });

    for (let i = 0; i < data.length; i++) {
        checked.push(i);
        if (data[i] === target) {
            steps.push({
                current: i,
                checked: [...checked],
                found: i,
                message: `Index ${i}: arr[${i}] = ${data[i]} == ${target} → DITEMUKAN! ✓`,
            });
            return steps;
        }
        steps.push({
            current: i,
            checked: [...checked],
            found: null,
            message: `Index ${i}: arr[${i}] = ${data[i]} ≠ ${target} → lanjut ke index berikutnya`,
        });
    }

    steps.push({
        current: -1,
        checked: [...checked],
        found: null,
        message: `Target ${target} tidak ditemukan setelah memeriksa ${data.length} elemen ✗`,
    });
    return steps;
}

export default function LinearSearchVisualizer() {
    const [target, setTarget] = useState(DEFAULT_TARGET);
    const steps = useMemo(() => generateLinearSearchSteps(INITIAL_DATA, target), [target]);
    const [stepIndex, setStepIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(900);

    const current = stepIndex >= 0 ? steps[stepIndex] : null;
    const done = stepIndex >= steps.length - 1;

    const reset = () => {
        setStepIndex(-1);
        setIsPlaying(false);
    };

    const nextStep = () => {
        if (stepIndex < steps.length - 1) setStepIndex((s) => s + 1);
    };

    useEffect(() => {
        reset();
    }, [target]);

    useEffect(() => {
        if (!isPlaying || done) return;
        const timer = setTimeout(nextStep, speed);
        return () => clearTimeout(timer);
    }, [isPlaying, stepIndex, speed, done]);

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex-1 min-h-[70px]">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lime-500 text-base">linear_scale</span>
                        Interactive Linear Search
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                            {current?.message ?? "Periksa elemen satu per satu dari kiri ke kanan."}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={done}
                        className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                            isPlaying
                                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                : "bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 disabled:opacity-50"
                        }`}
                    >
                        <span className="material-symbols-outlined text-sm">{isPlaying ? "pause" : "play_arrow"}</span>
                        {isPlaying ? "Jeda" : "Mulai"}
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={isPlaying || done}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-black border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all disabled:opacity-50"
                    >
                        Langkah
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-black border-2 border-slate-200 dark:border-slate-700 hover:border-red-500/50 transition-all"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Target:</label>
                <select
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl border-2 border-lime-500/30 bg-lime-500/5 text-sm font-black text-lime-700 dark:text-lime-300"
                >
                    {[...INITIAL_DATA, 99].map((v) => (
                        <option key={v} value={v}>
                            {v} {v === 99 ? "(tidak ada)" : ""}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center items-end gap-3 h-44 mb-4">
                {INITIAL_DATA.map((value, idx) => {
                    const isCurrent = current?.current === idx;
                    const isChecked = current?.checked.includes(idx) && !isCurrent;
                    const isFound = current?.found === idx;

                    return (
                        <motion.div key={idx} layout className="flex flex-col items-center gap-2">
                            <motion.div
                                className={`w-12 sm:w-14 rounded-xl border-2 flex items-center justify-center font-black shadow-sm ${
                                    isFound
                                        ? "bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-500/30"
                                        : isCurrent
                                          ? "bg-lime-500 border-lime-600 text-white"
                                          : isChecked
                                            ? "bg-slate-300 dark:bg-slate-600 border-slate-400 text-slate-700 dark:text-slate-200"
                                            : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                }`}
                                style={{ height: `${value * 8 + 48}px` }}
                                animate={{ scale: isCurrent || isFound ? 1.08 : 1 }}
                            >
                                {value}
                            </motion.div>
                            <span className="text-[10px] font-black text-slate-400 uppercase">
                                {isCurrent ? "Scan" : isFound ? "Found!" : `Idx ${idx}`}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            <div className="text-center text-xs font-bold text-slate-400 mb-4">
                Langkah {Math.max(0, stepIndex + 1)} / {steps.length}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Kecepatan:</span>
                    <input
                        type="range"
                        min="200"
                        max="2000"
                        step="100"
                        value={2200 - speed}
                        onChange={(e) => setSpeed(2200 - parseInt(e.target.value))}
                        className="w-24 accent-primary"
                    />
                </div>
                <div className="flex justify-end gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-lime-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Sedang dicek</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-slate-400"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Sudah dicek</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Ditemukan</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
