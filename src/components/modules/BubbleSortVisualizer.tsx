"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
    id: number;
    value: number;
}

const INITIAL_DATA = [64, 34, 25, 12, 22];

export default function BubbleSortVisualizer() {
    const [nodes, setNodes] = useState<Node[]>(
        INITIAL_DATA.map((val, idx) => ({ id: idx, value: val }))
    );
    const [comparing, setComparing] = useState<number[]>([]);
    const [swapping, setSwapping] = useState<number[]>([]);
    const [sorted, setSorted] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState(false);
    const [speed, setSpeed] = useState(800);
    const [stepInfo, setStepInfo] = useState("Klik 'Mulai' atau 'Langkah' untuk memulai tracing.");
    const [tick, setTick] = useState(0);

    // Internal state for algorithm tracking
    const stateRef = useRef({
        i: 0,
        j: 0,
        n: INITIAL_DATA.length,
        swapped: false,
        done: false
    });

    const reset = () => {
        setNodes(INITIAL_DATA.map((val, idx) => ({ id: idx, value: val })));
        setComparing([]);
        setSwapping([]);
        setSorted([]);
        setIsSorting(false);
        setStepInfo("Visualisasi direset.");
        stateRef.current = {
            i: 0,
            j: 0,
            n: INITIAL_DATA.length,
            swapped: false,
            done: false
        };
    };

    const nextStep = async () => {
        const { i, j, n, swapped, done } = stateRef.current;

        if (done) return true;

        // Reset temporary highlights
        setSwapping([]);

        // Phase 1: Comparing
        setComparing([j, j + 1]);

        if (nodes[j].value > nodes[j + 1].value) {
            setStepInfo(`Bandingkan ${nodes[j].value} > ${nodes[j + 1].value}? Ya, tukar posisinya.`);
            // Phase 2: Swapping
            setSwapping([j, j + 1]);

            // Wait for visual cue before actual swap
            await new Promise(resolve => setTimeout(resolve, speed / 2));

            const newNodes = [...nodes];
            [newNodes[j], newNodes[j + 1]] = [newNodes[j + 1], newNodes[j]];
            setNodes(newNodes);
            stateRef.current.swapped = true;
        } else {
            setStepInfo(`Bandingkan ${nodes[j].value} > ${nodes[j + 1].value}? Tidak, tetap.`);
        }

        // Move to next indices
        let nextJ = j + 1;
        let nextI = i;
        let nextDone = false;
        let nextSwapped = stateRef.current.swapped;

        if (nextJ >= n - i - 1) {
            // End of a pass
            if (!nextSwapped) {
                // Optimization: no swaps in a pass means sorted
                setSorted(nodes.map((_, idx) => idx));
                setStepInfo("Selesai! Tidak ada swap terjadi, array sudah terurut.");
                nextDone = true;
            } else {
                // Mark the last element as sorted
                setSorted(prev => [...prev, n - i - 1]);
                nextI = i + 1;
                nextJ = 0;
                nextSwapped = false;

                if (nextI >= n - 1) {
                    setSorted(nodes.map((_, idx) => idx));
                    setStepInfo("Selesai! Seluruh elemen sudah di posisi yang benar.");
                    nextDone = true;
                }
            }
        }

        stateRef.current = {
            i: nextI,
            j: nextJ,
            n,
            swapped: nextSwapped,
            done: nextDone
        };

        setTick(t => t + 1);
        return nextDone;
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isSorting) {
            timer = setTimeout(async () => {
                const finished = await nextStep();
                if (finished) setIsSorting(false);
            }, speed);
        }
        return () => clearTimeout(timer);
    }, [isSorting, tick, speed]);

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex-1 min-h-[70px]">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">info</span>
                        Interactive Bubble Sort
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                            {stepInfo}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setIsSorting(!isSorting)}
                        disabled={stateRef.current.done}
                        className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${isSorting
                            ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                            : "bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 disabled:opacity-50"
                            }`}
                    >
                        <span className="material-symbols-outlined text-sm">{isSorting ? "pause" : "play_arrow"}</span>
                        {isSorting ? "Jeda" : "Mulai"}
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={isSorting || stateRef.current.done}
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

            <div className="flex justify-center items-end gap-3 h-48 mb-8">
                {nodes.map((node, idx) => {
                    const isComparing = comparing.includes(idx);
                    const isSwapping = swapping.includes(idx);
                    const isSorted = sorted.includes(idx);

                    return (
                        <motion.div
                            key={node.id}
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <motion.div
                                className={`w-12 sm:w-16 rounded-xl border-2 flex items-center justify-center font-black transition-colors shadow-sm ${isSwapping
                                    ? "bg-red-500 border-red-600 text-white"
                                    : isComparing
                                        ? "bg-amber-500 border-amber-600 text-white"
                                        : isSorted
                                            ? "bg-emerald-500 border-emerald-600 text-white"
                                            : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                    }`}
                                style={{ height: `${node.value * 1.5 + 40}px` }}
                                animate={{
                                    scale: isComparing || isSwapping ? 1.05 : 1,
                                    y: isSwapping ? -10 : 0
                                }}
                            >
                                {node.value}
                            </motion.div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Index {idx}</span>
                        </motion.div>
                    );
                })}
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
                <div className="flex justify-end gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-amber-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Banding</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-red-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Tukar</span>
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
