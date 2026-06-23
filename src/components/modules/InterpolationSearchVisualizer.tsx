"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Step {
    low: number;
    high: number;
    pos: number;
    found: number | null;
    eliminated: number[];
    message: string;
}

const INITIAL_DATA = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const DEFAULT_TARGET = 70;

function generateInterpolationSearchSteps(data: number[], target: number): Step[] {
    const steps: Step[] = [];
    let low = 0;
    let high = data.length - 1;
    const eliminated: number[] = [];

    steps.push({
        low,
        high,
        pos: -1,
        found: null,
        eliminated: [],
        message: `Interpolation Search: estimasi posisi target ${target} berdasarkan distribusi nilai (array terurut & merata)`,
    });

    while (low <= high && target >= data[low] && target <= data[high]) {
        const pos =
            low +
            Math.floor(
                ((target - data[low]) * (high - low)) / (data[high] - data[low])
            );

        steps.push({
            low,
            high,
            pos,
            found: null,
            eliminated: [...eliminated],
            message: `Probe pos = low + ((${target}-${data[low]})×(${high}-${low}))/(${data[high]}-${data[low]}) = ${pos} → arr[${pos}]=${data[pos]}`,
        });

        if (data[pos] === target) {
            steps.push({
                low,
                high,
                pos,
                found: pos,
                eliminated: [...eliminated],
                message: `arr[${pos}] = ${target} → DITEMUKAN! ✓ (lebih sedikit langkah dari Binary Search untuk data merata)`,
            });
            return steps;
        }

        if (data[pos] < target) {
            for (let i = low; i <= pos; i++) eliminated.push(i);
            steps.push({
                low: pos + 1,
                high,
                pos,
                found: null,
                eliminated: [...eliminated],
                message: `${data[pos]} < ${target} → cari di [${pos + 1}..${high}]`,
            });
            low = pos + 1;
        } else {
            for (let i = pos; i <= high; i++) eliminated.push(i);
            steps.push({
                low,
                high: pos - 1,
                pos,
                found: null,
                eliminated: [...eliminated],
                message: `${data[pos]} > ${target} → cari di [${low}..${pos - 1}]`,
            });
            high = pos - 1;
        }
    }

    steps.push({
        low,
        high,
        pos: -1,
        found: null,
        eliminated: Array.from({ length: data.length }, (_, i) => i),
        message: `Target ${target} tidak ditemukan ✗`,
    });
    return steps;
}

export default function InterpolationSearchVisualizer() {
    const [target, setTarget] = useState(DEFAULT_TARGET);
    const steps = useMemo(() => generateInterpolationSearchSteps(INITIAL_DATA, target), [target]);
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
                        <span className="material-symbols-outlined text-violet-500 text-base">trending_flat</span>
                        Interpolation Search (Bonus)
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                            {current?.message ?? "Estimasi posisi seperti mencari nama di buku telepon — langsung ke perkiraan lokasi."}
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
                    className="px-3 py-2 rounded-xl border-2 border-violet-500/30 bg-violet-500/5 text-sm font-black text-violet-700 dark:text-violet-300"
                >
                    {INITIAL_DATA.map((v) => (
                        <option key={v} value={v}>{v}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-center items-end gap-3 h-40 mb-4">
                {INITIAL_DATA.map((value, idx) => {
                    const isProbe = current?.pos === idx;
                    const isFound = current?.found === idx;
                    const isEliminated = current?.eliminated.includes(idx);
                    const inRange = current && idx >= current.low && idx <= current.high && !isEliminated;

                    return (
                        <motion.div key={idx} layout className="flex flex-col items-center gap-2">
                            <motion.div
                                className={`w-11 sm:w-12 rounded-xl border-2 flex items-center justify-center font-black text-sm shadow-sm ${
                                    isFound
                                        ? "bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-500/30"
                                        : isProbe
                                          ? "bg-violet-500 border-violet-600 text-white"
                                          : inRange
                                            ? "bg-violet-500/15 border-violet-500/30 text-slate-900 dark:text-white"
                                            : isEliminated
                                              ? "bg-slate-200 dark:bg-slate-700 border-slate-300 text-slate-400 opacity-50"
                                              : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                }`}
                                style={{ height: `${value * 0.8 + 36}px` }}
                                animate={{ scale: isProbe || isFound ? 1.08 : 1 }}
                            >
                                {value}
                            </motion.div>
                            <span className="text-[9px] font-black text-slate-400 uppercase">
                                {isProbe ? "Probe" : isFound ? "Found!" : idx}
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
                        <div className="w-3 h-3 rounded bg-violet-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Probe</span>
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
