"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Step {
    array: number[];
    highlighted: number[];
    merging: number[];
    sorted: number[];
    activeRange: { left: number; right: number } | null;
    message: string;
}

const INITIAL_DATA = [38, 27, 43, 3, 9, 82, 10];

function generateMergeSortSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const sortedSet = new Set<number>();

    const addStep = (
        highlighted: number[],
        merging: number[],
        activeRange: { left: number; right: number } | null,
        message: string
    ) => {
        steps.push({
            array: [...arr],
            highlighted,
            merging,
            sorted: Array.from(sortedSet),
            activeRange,
            message,
        });
    };

    function merge(left: number, mid: number, right: number) {
        addStep(
            [left, mid, right],
            [],
            { left, right },
            `Divide selesai → Merge range [${left}..${mid}] dan [${mid + 1}..${right}]`
        );

        const temp = arr.slice(left, right + 1);
        let i = 0;
        let j = mid - left + 1;
        let k = left;

        while (i <= mid - left && j <= right - left) {
            if (temp[i] <= temp[j]) {
                addStep(
                    [left + i, left + j],
                    [k],
                    { left, right },
                    `Bandingkan ${temp[i]} ≤ ${temp[j]} → tempatkan ${temp[i]} di index ${k}`
                );
                arr[k] = temp[i];
                i++;
            } else {
                addStep(
                    [left + i, left + j],
                    [k],
                    { left, right },
                    `Bandingkan ${temp[i]} > ${temp[j]} → tempatkan ${temp[j]} di index ${k}`
                );
                arr[k] = temp[j];
                j++;
            }
            k++;
        }

        while (i <= mid - left) {
            addStep([left + i], [k], { left, right }, `Salin sisa kiri: ${temp[i]} → index ${k}`);
            arr[k] = temp[i];
            i++;
            k++;
        }

        while (j <= right - left) {
            addStep([left + j], [k], { left, right }, `Salin sisa kanan: ${temp[j]} → index ${k}`);
            arr[k] = temp[j];
            j++;
            k++;
        }

        for (let idx = left; idx <= right; idx++) sortedSet.add(idx);
        addStep([], [], { left, right }, `Merge selesai untuk range [${left}..${right}] ✓`);
    }

    function mergeSort(left: number, right: number) {
        if (left >= right) {
            sortedSet.add(left);
            addStep([left], [], { left, right: left }, `Base case: elemen ${arr[left]} di index ${left} sudah terurut`);
            return;
        }

        const mid = Math.floor((left + right) / 2);
        addStep(
            [left, mid, right],
            [],
            { left, right },
            `Divide: pecah [${left}..${right}] → kiri [${left}..${mid}] & kanan [${mid + 1}..${right}]`
        );

        mergeSort(left, mid);
        mergeSort(mid + 1, right);
        merge(left, mid, right);
    }

    mergeSort(0, arr.length - 1);
    addStep([], [], null, "Selesai! Seluruh array sudah terurut via Merge Sort.");
    return steps;
}

export default function MergeSortVisualizer() {
    const steps = useMemo(() => generateMergeSortSteps(INITIAL_DATA), []);
    const [stepIndex, setStepIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(900);

    const current = stepIndex >= 0 ? steps[stepIndex] : null;
    const displayArray = current?.array ?? INITIAL_DATA;
    const done = stepIndex >= steps.length - 1;

    const reset = () => {
        setStepIndex(-1);
        setIsPlaying(false);
    };

    const nextStep = () => {
        if (stepIndex < steps.length - 1) setStepIndex((s) => s + 1);
    };

    useEffect(() => {
        if (!isPlaying || done) return;
        const timer = setTimeout(nextStep, speed);
        return () => clearTimeout(timer);
    }, [isPlaying, stepIndex, speed, done]);

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex-1 min-h-[70px]">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-cyan-500 text-base">call_split</span>
                        Interactive Merge Sort
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                            {current?.message ?? "Klik 'Mulai' atau 'Langkah' untuk melihat Merge Sort (Divide & Conquer)."}
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

            {current?.activeRange && (
                <div className="mb-4 text-center">
                    <span className="text-xs font-black text-cyan-600 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                        Range Aktif: [{current.activeRange.left} .. {current.activeRange.right}]
                    </span>
                </div>
            )}

            <div className="flex justify-center items-end gap-3 h-48 mb-4">
                {displayArray.map((value, idx) => {
                    const isHighlighted = current?.highlighted.includes(idx);
                    const isMerging = current?.merging.includes(idx);
                    const isSorted = current?.sorted.includes(idx);
                    const inRange =
                        current?.activeRange && idx >= current.activeRange.left && idx <= current.activeRange.right;

                    return (
                        <motion.div
                            key={idx}
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <motion.div
                                className={`w-12 sm:w-14 rounded-xl border-2 flex items-center justify-center font-black shadow-sm ${
                                    isMerging
                                        ? "bg-purple-500 border-purple-600 text-white"
                                        : isHighlighted
                                          ? "bg-cyan-500 border-cyan-600 text-white"
                                          : isSorted
                                            ? "bg-emerald-500 border-emerald-600 text-white"
                                            : inRange
                                              ? "bg-cyan-500/20 border-cyan-500/40 text-slate-900 dark:text-white"
                                              : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                }`}
                                style={{ height: `${value * 1.5 + 40}px` }}
                                animate={{ scale: isHighlighted || isMerging ? 1.05 : 1 }}
                            >
                                {value}
                            </motion.div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Idx {idx}</span>
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
                        <div className="w-3 h-3 rounded bg-cyan-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Divide</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-purple-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Merge</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Terurut</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
