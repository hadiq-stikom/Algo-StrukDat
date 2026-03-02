"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Node {
    id: number;
    value: number;
}

const INITIAL_DATA = [64, 25, 12, 22, 11];

export default function SelectionSortVisualizer() {
    const [nodes, setNodes] = useState<Node[]>(
        INITIAL_DATA.map((val, idx) => ({ id: idx, value: val }))
    );
    const [comparing, setComparing] = useState<number>(-1);
    const [minIdx, setMinIdx] = useState<number>(-1);
    const [swapping, setSwapping] = useState<number[]>([]);
    const [sorted, setSorted] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState(false);
    const [speed, setSpeed] = useState(800);
    const [stepInfo, setStepInfo] = useState("Klik 'Mulai' atau 'Langkah' untuk melihat Selection Sort.");
    const [tick, setTick] = useState(0);

    // Internal state for algorithm tracking
    const stateRef = useRef({
        i: 0,
        j: 1,
        currentMin: 0,
        n: INITIAL_DATA.length,
        done: false,
        phase: 'FIND_MIN' // 'FIND_MIN' or 'SWAP'
    });

    const reset = () => {
        setNodes(INITIAL_DATA.map((val, idx) => ({ id: idx, value: val })));
        setComparing(-1);
        setMinIdx(-1);
        setSwapping([]);
        setSorted([]);
        setIsSorting(false);
        setStepInfo("Visualisasi direset.");
        stateRef.current = {
            i: 0,
            j: 1,
            currentMin: 0,
            n: INITIAL_DATA.length,
            done: false,
            phase: 'FIND_MIN'
        };
    };

    const nextStep = async () => {
        const { i, j, currentMin, n, done, phase } = stateRef.current;

        if (done) return true;

        if (phase === 'FIND_MIN') {
            setComparing(j);
            setMinIdx(currentMin);
            setSwapping([]);

            if (j < n) {
                setStepInfo(`Mencari minimum: Bandingkan elemen index ${j} (${nodes[j].value}) dengan minimum saat ini (${nodes[currentMin].value}).`);

                let nextMin = currentMin;
                if (nodes[j].value < nodes[currentMin].value) {
                    nextMin = j;
                    setStepInfo(`Ditemukan nilai lebih kecil! Minimum baru di index ${j} (${nodes[j].value}).`);
                }

                stateRef.current.currentMin = nextMin;
                stateRef.current.j = j + 1;

                if (stateRef.current.j >= n) {
                    stateRef.current.phase = 'SWAP';
                }
            }
        } else if (phase === 'SWAP') {
            setComparing(-1);
            setMinIdx(currentMin);

            if (currentMin !== i) {
                setStepInfo(`Pass ${i + 1} selesai. Tukar minimum (${nodes[currentMin].value}) ke posisi ${i}.`);
                setSwapping([i, currentMin]);

                // Wait for visual cue
                await new Promise(resolve => setTimeout(resolve, speed / 2));

                const newNodes = [...nodes];
                [newNodes[i], newNodes[currentMin]] = [newNodes[currentMin], newNodes[i]];
                setNodes(newNodes);
            } else {
                setStepInfo(`Pass ${i + 1} selesai. Index ${i} sudah merupakan nilai minimum.`);
            }

            setSorted(prev => [...prev, i]);

            const nextI = i + 1;
            if (nextI >= n - 1) {
                setSorted(nodes.map((_, idx) => idx));
                setStepInfo("Selesai! Seluruh elemen sudah terurut.");
                stateRef.current.done = true;
            } else {
                stateRef.current.i = nextI;
                stateRef.current.j = nextI + 1;
                stateRef.current.currentMin = nextI;
                stateRef.current.phase = 'FIND_MIN';
            }
        }

        setTick(t => t + 1);
        return stateRef.current.done;
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 mb-8">
                <div className="flex-1 min-h-[80px]">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">info</span>
                        Interactive Selection Sort
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-tight">
                            {stepInfo}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row md:flex-row gap-2 shrink-0">
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
                    const isComparing = comparing === idx;
                    const isMin = minIdx === idx;
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
                                    : isMin
                                        ? "bg-fuchsia-500 border-fuchsia-600 text-white"
                                        : isComparing
                                            ? "bg-amber-500 border-amber-600 text-white"
                                            : isSorted
                                                ? "bg-emerald-500 border-emerald-600 text-white"
                                                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                    }`}
                                style={{ height: `${node.value * 1.5 + 40}px` }}
                                animate={{
                                    scale: isComparing || isSwapping || isMin ? 1.05 : 1,
                                    y: isSwapping ? -10 : 0
                                }}
                            >
                                {node.value}
                            </motion.div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                {isMin ? "Min" : `Idx ${idx}`}
                            </span>
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
                <div className="flex justify-end gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-amber-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Scan</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-fuchsia-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-red-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Swap</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Sorted</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
