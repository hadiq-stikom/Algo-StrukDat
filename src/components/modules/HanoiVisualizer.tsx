"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Disk = {
    id: number;
    size: number;
};

type Peg = Disk[];

export default function HanoiVisualizer() {
    const [numDisks, setNumDisks] = useState(3);
    const [pegs, setPegs] = useState<Peg[]>([[], [], []]);
    const [isExecuting, setIsExecuting] = useState(false);
    const [stepInfo, setStepInfo] = useState("Klik 'Mulai' untuk melihat solusi rekursif.");
    const [moveCount, setMoveCount] = useState(0);
    const [speed, setSpeed] = useState(800);

    // Ref to handle cancellation if needed, though simple state is fine for now
    const stopRef = useRef(false);

    useEffect(() => {
        reset();
    }, [numDisks]);

    const reset = () => {
        const initialDisks: Disk[] = [];
        for (let i = numDisks; i >= 1; i--) {
            initialDisks.push({ id: i, size: i });
        }
        setPegs([initialDisks, [], []]);
        setMoveCount(0);
        setStepInfo(`Tower of Hanoi dengan ${numDisks} cakram.`);
        setIsExecuting(false);
        stopRef.current = false;
    };

    const moveDisk = async (from: number, to: number) => {
        if (stopRef.current) return;

        setPegs(prev => {
            const nextPegs = [...prev.map(p => [...p])];
            const disk = nextPegs[from].pop();
            if (disk) nextPegs[to].push(disk);
            return nextPegs;
        });

        setMoveCount(c => c + 1);
        setStepInfo(`Langkah ${moveCount + 1}: Pindahkan cakram dari Tiang ${from + 1} ke Tiang ${to + 1}.`);
        await new Promise(r => setTimeout(r, speed));
    };

    const solveHanoi = async (n: number, source: number, target: number, auxiliary: number) => {
        if (n === 0 || stopRef.current) return;

        // Move n-1 disks from source to auxiliary
        await solveHanoi(n - 1, source, auxiliary, target);

        // Move the nth disk from source to target
        await moveDisk(source, target);

        // Move n-1 disks from auxiliary to target
        await solveHanoi(n - 1, auxiliary, target, source);
    };

    const startSimulation = async () => {
        reset();
        setIsExecuting(true);
        await new Promise(r => setTimeout(r, 500));
        await solveHanoi(numDisks, 0, 2, 1);
        if (!stopRef.current) {
            setStepInfo(`Selesai! Total langkah: ${Math.pow(2, numDisks) - 1}`);
        }
        setIsExecuting(false);
    };

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Visual Area */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-6">
                        <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 italic">
                            <span className="material-symbols-outlined text-primary text-base not-italic">account_tree</span>
                            Tower of Hanoi Visualizer
                        </h4>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            2^{numDisks} - 1 = {Math.pow(2, numDisks) - 1} Langkah
                        </div>
                    </div>

                    <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-primary/10 mb-8 min-h-[60px]">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-base">info</span>
                            {stepInfo}
                        </p>
                    </div>

                    {/* Hanoi Stage */}
                    <div className="relative w-full max-w-lg h-64 flex items-end justify-around pb-4 bg-slate-50/50 dark:bg-slate-900/20 border-b-8 border-slate-300 dark:border-slate-800 rounded-t-xl px-4">
                        {[0, 1, 2].map((pegIdx) => (
                            <div key={pegIdx} className="relative flex flex-col-reverse items-center w-1/3 h-full group">
                                {/* Peg stick */}
                                <div className="absolute bottom-0 w-2 h-48 bg-slate-300 dark:bg-slate-700 rounded-t-full"></div>

                                {/* Peg Label */}
                                <div className="absolute -bottom-8 font-black text-[10px] text-slate-400 uppercase">Tiang {pegIdx + 1}</div>

                                {/* Disks */}
                                <div className="z-10 flex flex-col-reverse items-center w-full gap-0.5">
                                    <AnimatePresence>
                                        {pegs[pegIdx].map((disk, idx) => (
                                            <motion.div
                                                key={disk.id}
                                                layout
                                                initial={{ y: -50, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -50, opacity: 0 }}
                                                style={{
                                                    width: `${30 + disk.size * 15}%`,
                                                    height: '20px'
                                                }}
                                                className={`rounded-lg border-2 shadow-sm ${disk.size % 2 === 0
                                                    ? "bg-primary border-primary/50"
                                                    : "bg-emerald-500 border-emerald-500/50"
                                                    }`}
                                            ></motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="w-full lg:w-72 flex flex-col gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jumlah Cakram</label>
                                <span className="text-[10px] font-black text-primary bg-primary/10 px-2 rounded-full">{numDisks}</span>
                            </div>
                            <input
                                type="range"
                                min="3"
                                max="6"
                                value={numDisks}
                                onChange={(e) => setNumDisks(parseInt(e.target.value))}
                                disabled={isExecuting}
                                className="w-full accent-primary"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kecepatan</label>
                                <span className="text-[10px] font-black text-slate-500">{speed}ms</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="2000"
                                step="100"
                                value={speed}
                                onChange={(e) => setSpeed(parseInt(e.target.value))}
                                className="w-full accent-slate-400"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={startSimulation}
                            disabled={isExecuting}
                            className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">play_arrow</span>
                            Mulai
                        </button>
                        <button
                            onClick={() => {
                                stopRef.current = true;
                                reset();
                            }}
                            className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase transition-all"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 leading-tight">Recursive Strategy</h5>
                        <p className="text-[9px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic">
                            "Untuk memindahkan n cakram dari A ke C, pindahkan n-1 ke B dulu, pindahkan yang terbesar ke C, lalu pindahkan n-1 dari B ke C."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
