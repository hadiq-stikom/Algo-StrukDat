"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Step {
    low: number;
    high: number;
    mid: number;
    found: number | null;
    eliminated: number[];
    message: string;
}

const INITIAL_DATA = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];
const DEFAULT_TARGET = 23;

function generateBinarySearchSteps(data: number[], target: number): Step[] {
    const steps: Step[] = [];
    let low = 0;
    let high = data.length - 1;
    const eliminated: number[] = [];

    steps.push({
        low,
        high,
        mid: -1,
        found: null,
        eliminated: [],
        message: `Mulai Binary Search: cari ${target} di array terurut [${data.join(", ")}]`,
    });

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        steps.push({
            low,
            high,
            mid,
            found: null,
            eliminated: [...eliminated],
            message: `low=${low}, high=${high} → mid=${mid}, arr[${mid}]=${data[mid]}. Bandingkan dengan ${target}`,
        });

        if (data[mid] === target) {
            steps.push({
                low,
                high,
                mid,
                found: mid,
                eliminated: [...eliminated],
                message: `arr[${mid}] = ${data[mid]} == ${target} → DITEMUKAN di index ${mid}! ✓`,
            });
            return steps;
        }

        if (data[mid] < target) {
            for (let i = low; i <= mid; i++) eliminated.push(i);
            steps.push({
                low: mid + 1,
                high,
                mid,
                found: null,
                eliminated: [...eliminated],
                message: `${data[mid]} < ${target} → buang bagian kiri, cari di [${mid + 1}..${high}]`,
            });
            low = mid + 1;
        } else {
            for (let i = mid; i <= high; i++) eliminated.push(i);
            steps.push({
                low,
                high: mid - 1,
                mid,
                found: null,
                eliminated: [...eliminated],
                message: `${data[mid]} > ${target} → buang bagian kanan, cari di [${low}..${mid - 1}]`,
            });
            high = mid - 1;
        }
    }

    steps.push({
        low,
        high,
        mid: -1,
        found: null,
        eliminated: Array.from({ length: data.length }, (_, i) => i),
        message: `Target ${target} tidak ditemukan. low > high, pencarian selesai ✗`,
    });
    return steps;
}

export default function BinarySearchVisualizer() {
    const [target, setTarget] = useState(DEFAULT_TARGET);
    const steps = useMemo(() => generateBinarySearchSteps(INITIAL_DATA, target), [target]);
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
                        <span className="material-symbols-outlined text-emerald-500 text-base">call_split</span>
                        Interactive Binary Search
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                            {current?.message ?? "Bagi ruang pencarian menjadi dua, eliminasi setengah setiap langkah."}
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
                    className="px-3 py-2 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 text-sm font-black text-emerald-700 dark:text-emerald-300"
                >
                    {[...INITIAL_DATA, 50].map((v) => (
                        <option key={v} value={v}>
                            {v} {v === 50 ? "(tidak ada)" : ""}
                        </option>
                    ))}
                </select>
            </div>

            {current && current.mid >= 0 && (
                <div className="mb-4 flex justify-center gap-4 text-xs font-black">
                    <span className="text-blue-600 bg-blue-500/10 px-2 py-1 rounded-lg">low = {current.low}</span>
                    <span className="text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg">mid = {current.mid}</span>
                    <span className="text-rose-600 bg-rose-500/10 px-2 py-1 rounded-lg">high = {current.high}</span>
                </div>
            )}

            <div className="flex justify-center items-end gap-2 h-44 mb-4 overflow-x-auto pb-2">
                {INITIAL_DATA.map((value, idx) => {
                    const isMid = current?.mid === idx;
                    const isLow = current?.low === idx;
                    const isHigh = current?.high === idx;
                    const isFound = current?.found === idx;
                    const isEliminated = current?.eliminated.includes(idx);
                    const inRange = current && idx >= current.low && idx <= current.high && !isEliminated;

                    return (
                        <motion.div key={idx} layout className="flex flex-col items-center gap-2 shrink-0">
                            <motion.div
                                className={`w-10 sm:w-12 rounded-xl border-2 flex items-center justify-center font-black text-sm shadow-sm ${
                                    isFound
                                        ? "bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-500/30"
                                        : isMid
                                          ? "bg-emerald-500 border-emerald-600 text-white"
                                          : isLow || isHigh
                                            ? "bg-blue-500 border-blue-600 text-white"
                                            : inRange
                                              ? "bg-emerald-500/20 border-emerald-500/40 text-slate-900 dark:text-white"
                                              : isEliminated
                                                ? "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-400 line-through opacity-50"
                                                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                }`}
                                style={{ height: `${Math.min(value, 60) + 40}px` }}
                                animate={{ scale: isMid || isFound ? 1.08 : 1 }}
                            >
                                {value}
                            </motion.div>
                            <span className="text-[9px] font-black text-slate-400 uppercase">
                                {isMid ? "Mid" : isLow ? "Low" : isHigh ? "High" : isFound ? "Found!" : idx}
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
                <div className="flex justify-end gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-blue-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Low/High</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Mid</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-slate-300 opacity-50"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Eliminasi</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
