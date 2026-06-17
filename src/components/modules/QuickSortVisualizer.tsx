"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Step {
    array: number[];
    pivot: number;
    comparing: number[];
    swapping: number[];
    sorted: number[];
    activeRange: { left: number; right: number } | null;
    message: string;
}

const INITIAL_DATA = [64, 34, 25, 12, 22, 11, 90];

function generateQuickSortSteps(data: number[]): Step[] {
    const steps: Step[] = [];
    const arr = [...data];
    const sortedSet = new Set<number>();

    const addStep = (
        pivot: number,
        comparing: number[],
        swapping: number[],
        activeRange: { left: number; right: number } | null,
        message: string
    ) => {
        steps.push({
            array: [...arr],
            pivot,
            comparing,
            swapping,
            sorted: Array.from(sortedSet),
            activeRange,
            message,
        });
    };

    function partition(low: number, high: number): number {
        const pivotVal = arr[high];
        addStep(
            high,
            [],
            [],
            { left: low, right: high },
            `Pilih pivot = ${pivotVal} (index ${high}) untuk range [${low}..${high}]`
        );

        let i = low - 1;

        for (let j = low; j < high; j++) {
            addStep(
                high,
                [j, high],
                [],
                { left: low, right: high },
                `Bandingkan arr[${j}]=${arr[j]} dengan pivot ${pivotVal}`
            );

            if (arr[j] < pivotVal) {
                i++;
                if (i !== j) {
                    addStep(
                        high,
                        [i, j],
                        [i, j],
                        { left: low, right: high },
                        `${arr[j]} < ${pivotVal} → swap arr[${i}] dan arr[${j}]`
                    );
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                } else {
                    addStep(
                        high,
                        [j],
                        [],
                        { left: low, right: high },
                        `${arr[j]} < ${pivotVal} → i maju ke ${i}, tidak perlu swap`
                    );
                }
            }
        }

        addStep(
            high,
            [i + 1, high],
            [i + 1, high],
            { left: low, right: high },
            `Tempatkan pivot ${pivotVal} ke posisi final ${i + 1}`
        );
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

        sortedSet.add(i + 1);
        addStep(
            i + 1,
            [],
            [],
            { left: low, right: high },
            `Pivot ${pivotVal} sudah di posisi benar (index ${i + 1}) ✓`
        );

        return i + 1;
    }

    function quickSort(low: number, high: number) {
        if (low >= high) {
            if (low === high) sortedSet.add(low);
            addStep(
                low,
                [],
                [],
                { left: low, right: high },
                low === high
                    ? `Base case: elemen ${arr[low]} sudah terurut`
                    : `Range [${low}..${high}] kosong, selesai`
            );
            return;
        }

        const pi = partition(low, high);
        quickSort(low, pi - 1);
        quickSort(pi + 1, high);
    }

    quickSort(0, arr.length - 1);
    addStep(-1, [], [], null, "Selesai! Seluruh array sudah terurut via Quick Sort.");
    return steps;
}

export default function QuickSortVisualizer() {
    const steps = useMemo(() => generateQuickSortSteps(INITIAL_DATA), []);
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
                        <span className="material-symbols-outlined text-rose-500 text-base">bolt</span>
                        Interactive Quick Sort
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                            {current?.message ?? "Klik 'Mulai' atau 'Langkah' untuk melihat Quick Sort (Partition & Conquer)."}
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
                    <span className="text-xs font-black text-rose-600 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                        Range Aktif: [{current.activeRange.left} .. {current.activeRange.right}]
                    </span>
                </div>
            )}

            <div className="flex justify-center items-end gap-3 h-48 mb-4">
                {displayArray.map((value, idx) => {
                    const isPivot = current?.pivot === idx;
                    const isComparing = current?.comparing.includes(idx);
                    const isSwapping = current?.swapping.includes(idx);
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
                                    isPivot
                                        ? "bg-rose-500 border-rose-600 text-white ring-4 ring-rose-500/30"
                                        : isSwapping
                                          ? "bg-red-500 border-red-600 text-white"
                                          : isComparing
                                            ? "bg-amber-500 border-amber-600 text-white"
                                            : isSorted
                                              ? "bg-emerald-500 border-emerald-600 text-white"
                                              : inRange
                                                ? "bg-rose-500/10 border-rose-500/30 text-slate-900 dark:text-white"
                                                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                }`}
                                style={{ height: `${value * 1.2 + 40}px` }}
                                animate={{ scale: isPivot || isComparing || isSwapping ? 1.05 : 1, y: isSwapping ? -8 : 0 }}
                            >
                                {value}
                            </motion.div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                {isPivot ? "Pivot" : `Idx ${idx}`}
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
                        <div className="w-3 h-3 rounded bg-rose-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Pivot</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-amber-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Banding</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-red-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Swap</span>
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
