"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StackFrame {
    id: number;
    functionName: string;
    params: Record<string, any>;
    returnValue?: any;
    isCurrent: boolean;
    depth: number;
}

export default function RecursionVisualizer() {
    const [stack, setStack] = useState<StackFrame[]>([]);
    const [isExecuting, setIsExecuting] = useState(false);
    const [stepInfo, setStepInfo] = useState("Klik 'Mulai' untuk melihat simulasi Rekursi.");
    const [inputVal, setInputVal] = useState(4);
    const [finalResult, setFinalResult] = useState<number | null>(null);
    const [speed, setSpeed] = useState<number>(1);
    const [isManualMode, setIsManualMode] = useState<boolean>(false);
    const [waitingForStep, setWaitingForStep] = useState<boolean>(false);

    const speedRef = useRef(1);
    const manualModeRef = useRef(false);
    const stepResolverRef = useRef<((value?: unknown) => void) | null>(null);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        manualModeRef.current = isManualMode;
        // If we switch to auto mode while waiting, release the lock automatically
        if (!isManualMode && waitingForStep && stepResolverRef.current) {
            handleNextStep();
        }
    }, [isManualMode, waitingForStep]);

    const handleNextStep = () => {
        if (stepResolverRef.current) {
            setWaitingForStep(false);
            stepResolverRef.current();
            stepResolverRef.current = null;
        }
    };

    const delay = async (ms: number) => {
        if (manualModeRef.current) {
            // Manual Mode: wait infinitely until Step button is clicked
            setWaitingForStep(true);
            return new Promise(resolve => {
                stepResolverRef.current = resolve;
            });
        }
        // Auto Mode
        return new Promise(r => setTimeout(r, ms / speedRef.current));
    };

    const reset = () => {
        setStack([]);
        setIsExecuting(false);
        setStepInfo("Simulator direset.");
        setFinalResult(null);
        setWaitingForStep(false);
        if (stepResolverRef.current) {
            // resolve pending promise just in case so old executions finish fast
            stepResolverRef.current();
            stepResolverRef.current = null;
        }
    };

    const runFactorial = async (n: number) => {
        setIsExecuting(true);
        setStack([]);
        setFinalResult(null);

        async function factorial(num: number, depth: number): Promise<number> {
            const frameId = Date.now() + Math.random();
            const newFrame: StackFrame = {
                id: frameId,
                functionName: "factorial",
                params: { n: num },
                isCurrent: true,
                depth: depth
            };

            setStack(prev => prev.map(f => ({ ...f, isCurrent: false })).concat(newFrame));
            setStepInfo(`Memanggil factorial(${num})...`);
            await delay(800);

            if (num <= 1) {
                setStepInfo(`Base Case tercapai: n=1. Mengembalikan 1.`);
                await delay(600);
                setStack(prev => prev.map(f => f.id === frameId ? { ...f, returnValue: 1, isCurrent: false } : f));
                await delay(600);
                setStack(prev => prev.filter(f => f.id !== frameId));
                return 1;
            }

            setStepInfo(`Belum mencapai Base Case. Menghitung ${num} * factorial(${num - 1})...`);
            await delay(800);

            const result = num * (await factorial(num - 1, depth + 1));

            setStepInfo(`Factorial(${num}) selesai. Mengembalikan ${result}.`);
            setStack(prev => prev.map(f => f.id === frameId ? { ...f, returnValue: result, isCurrent: true } : f));
            await delay(800);
            setStack(prev => prev.filter(f => f.id !== frameId));

            return result;
        }

        const res = await factorial(n, 0);
        setFinalResult(res);
        setStepInfo(`Eksekusi selesai! Hasil akhir: ${res}`);
        setIsExecuting(false);
    };

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Call Stack Visualization */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-6">
                        <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 italic">
                            <span className="material-symbols-outlined text-primary text-base not-italic">terminal</span>
                            Call Stack Visualizer
                        </h4>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Contoh: Factorial({inputVal}!)
                        </div>
                    </div>

                    {/* Step Description */}
                    <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-primary/10 mb-8 min-h-[70px] relative">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-base">info</span>
                            {stepInfo}
                        </p>
                        {waitingForStep && (
                            <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-lg animate-pulse">
                                <span className="material-symbols-outlined text-sm">front_hand</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Tertunda</span>
                            </div>
                        )}
                    </div>

                    {/* Stack Body */}
                    <div className="relative w-full max-w-sm min-h-[300px] border-x-4 border-b-4 border-slate-300 dark:border-slate-700 rounded-b-2xl flex flex-col-reverse items-center p-4 gap-2 bg-slate-50/50 dark:bg-slate-900/20 shadow-inner overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            {stack.map((frame, idx) => (
                                <motion.div
                                    key={frame.id}
                                    layout
                                    initial={{ y: -50, opacity: 0, scale: 0.9 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, x: 50 }}
                                    className={`w-full p-4 rounded-xl border-2 shadow-lg relative transition-all ${frame.isCurrent
                                        ? "bg-primary border-primary text-white scale-[1.02] z-10"
                                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] font-black opacity-60 uppercase mb-1">Stack Frame {stack.length - idx}</p>
                                            <p className="font-mono text-xs font-bold">{frame.functionName}(n={frame.params.n})</p>
                                        </div>
                                        {frame.returnValue !== undefined && (
                                            <div className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">
                                                Return: {frame.returnValue}
                                            </div>
                                        )}
                                    </div>

                                    {frame.isCurrent && (
                                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                            <span className="text-[10px] font-black text-primary uppercase italic">Active</span>
                                            <span className="material-symbols-outlined text-sm text-primary animate-pulse">arrow_forward</span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {stack.length === 0 && !finalResult && (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700 font-black italic uppercase tracking-widest text-xs pointer-events-none">
                                Call Stack Empty
                            </div>
                        )}

                        {finalResult !== null && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-surface/90 backdrop-blur-sm z-20"
                            >
                                <p className="text-xs font-black text-slate-400 uppercase mb-2">Final Result</p>
                                <p className="text-6xl font-black text-primary drop-shadow-xl">{finalResult}</p>
                                <button
                                    onClick={reset}
                                    className="mt-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200"
                                >
                                    Tutup
                                </button>
                            </motion.div>
                        )}
                    </div>
                    <div className="w-32 h-1 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 opacity-30 shadow-2xl"></div>
                </div>

                {/* Right: Controls */}
                <div className="w-full lg:w-72 flex flex-col gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Input (n)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    max="7"
                                    value={inputVal}
                                    onChange={(e) => setInputVal(parseInt(e.target.value))}
                                    disabled={isExecuting}
                                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black outline-none focus:border-primary/50 disabled:opacity-50"
                                />
                                <button
                                    onClick={() => runFactorial(inputVal)}
                                    disabled={isExecuting || inputVal < 1 || inputVal > 7}
                                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50"
                                >
                                    MULAI
                                </button>
                            </div>
                            <p className="text-[9px] text-slate-400 italic font-medium px-1">Maksimal n=7 untuk visualisator ini agar tidak terjadi stack overflow di memori browser.</p>
                        </div>

                        <div className="flex flex-col gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Mode Tracing Manual</label>
                                <button
                                    onClick={() => setIsManualMode(!isManualMode)}
                                    className={`relative w-10 h-5 rounded-full transition-colors ${isManualMode ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-700"}`}
                                >
                                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isManualMode ? "translate-x-5" : ""}`}></div>
                                </button>
                            </div>

                            {!isManualMode ? (
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kecepatan Animasi</label>
                                    <div className="flex gap-1 bg-slate-50 dark:bg-slate-900/50 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                                        {[
                                            { label: "Lambat", val: 0.5 },
                                            { label: "Normal", val: 1 },
                                            { label: "Cepat", val: 2 }
                                        ].map(s => (
                                            <button
                                                key={s.label}
                                                onClick={() => setSpeed(s.val)}
                                                className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${speed === s.val ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={handleNextStep}
                                    disabled={!waitingForStep || !isExecuting}
                                    className={`w-full py-3 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${waitingForStep && isExecuting
                                        ? "bg-amber-500 hover:bg-amber-400 text-white shadow-lg shadow-amber-500/30 ring-2 ring-amber-500 ring-offset-2 ring-offset-white dark:ring-offset-surface"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed"
                                        }`}
                                >
                                    <span>Langkah Berikutnya</span>
                                    <span className="material-symbols-outlined text-sm">step_into</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={reset}
                        disabled={isExecuting}
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">restart_alt</span>
                        Reset
                    </button>

                    <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Recursion Components</h5>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-primary mt-0.5">●</span>
                                <div><strong>Base Case:</strong> Kondisi berhenti.</div>
                            </li>
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-primary mt-0.5">●</span>
                                <div><strong>Recursive Case:</strong> Memanggil diri sendiri dengan input lebih kecil.</div>
                            </li>
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-primary mt-0.5">●</span>
                                <div><strong>Stack Frames:</strong> Menampung variabel lokal tiap level.</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
