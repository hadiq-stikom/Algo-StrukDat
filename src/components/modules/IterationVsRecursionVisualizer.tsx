"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IterationVsRecursionVisualizer() {
    const [inputVal, setInputVal] = useState(4);
    const [isExecuting, setIsExecuting] = useState(false);
    const [speed, setSpeed] = useState<number>(1);

    // Status Trackers
    const [iterativeLogs, setIterativeLogs] = useState<string[]>([]);
    const [iterativeResult, setIterativeResult] = useState<number | null>(null);
    const [iterativeVars, setIterativeVars] = useState<{ i: number, result: number } | null>(null);

    const [recursiveStack, setRecursiveStack] = useState<{ id: number, n: number, isReturning: boolean, result?: number }[]>([]);
    const [recursiveLogs, setRecursiveLogs] = useState<string[]>([]);
    const [recursiveResult, setRecursiveResult] = useState<number | null>(null);

    const speedRef = useRef(1);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms / speedRef.current));

    const reset = () => {
        setIsExecuting(false);
        setIterativeLogs([]);
        setIterativeResult(null);
        setIterativeVars(null);
        setRecursiveStack([]);
        setRecursiveLogs([]);
        setRecursiveResult(null);
    };

    const runSimulation = async () => {
        reset();
        setIsExecuting(true);
        const n = inputVal;

        // Run both sequentially for the visualizer to not overlap logic visually (or we can run them concurrently)
        // Let's run concurrently for side-by-side effect
        await Promise.all([runIterative(n), runRecursive(n)]);

        setIsExecuting(false);
    };

    const runIterative = async (n: number) => {
        setIterativeLogs(prev => [...prev, `Mulai Iterasi: n = ${n}`]);
        await delay(800);

        let result = 1;
        setIterativeVars({ i: 1, result });
        setIterativeLogs(prev => [...prev, `Inisialisasi: result = 1`]);
        await delay(800);

        for (let i = 2; i <= n; i++) {
            setIterativeVars({ i, result });
            setIterativeLogs(prev => [...prev, `Looping i=${i}: result = ${result} * ${i}`]);
            await delay(1000);
            result *= i;
            setIterativeVars({ i, result });
            await delay(800);
        }

        setIterativeLogs(prev => [...prev, `Selesai: Mengembalikan ${result}`]);
        setIterativeResult(result);
        setIterativeVars(null);
    };

    const runRecursive = async (n: number) => {
        let frameIdCounter = 0;

        const factorial = async (num: number): Promise<number> => {
            const frameId = frameIdCounter++;
            setRecursiveStack(prev => [...prev, { id: frameId, n: num, isReturning: false }]);
            setRecursiveLogs(prev => [...prev, `Call factorial(${num})`]);
            await delay(900);

            if (num <= 1) {
                setRecursiveLogs(prev => [...prev, `Base Case n=1: return 1`]);
                setRecursiveStack(prev => prev.map(f => f.id === frameId ? { ...f, isReturning: true, result: 1 } : f));
                await delay(900);
                setRecursiveStack(prev => prev.filter(f => f.id !== frameId));
                return 1;
            }

            setRecursiveLogs(prev => [...prev, `Menunggu factorial(${num - 1})`]);
            await delay(900);

            const childResult = await factorial(num - 1);
            const myResult = num * childResult;

            setRecursiveLogs(prev => [...prev, `Return factorial(${num}): ${num} * ${childResult} = ${myResult}`]);
            setRecursiveStack(prev => prev.map(f => f.id === frameId ? { ...f, isReturning: true, result: myResult } : f));
            await delay(900);
            setRecursiveStack(prev => prev.filter(f => f.id !== frameId));

            return myResult;
        };

        const finalRes = await factorial(n);
        setRecursiveResult(finalRes);
        setRecursiveLogs(prev => [...prev, `Selesai: Mengembalikan ${finalRes}`]);
    };

    return (
        <div className="bg-slate-900 border-2 border-primary/20 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-8 w-full max-w-6xl mx-auto">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                <div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-3xl">compare_arrows</span>
                        Iterasi vs Rekursi
                    </h3>
                    <p className="text-slate-400 font-medium text-sm mt-1">Studi Kasus: Faktorial (n!)</p>
                </div>

                <div className="flex gap-6 items-center flex-wrap">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Input (n)</label>
                        <input
                            type="number"
                            min="1"
                            max="6"
                            value={inputVal}
                            onChange={(e) => setInputVal(parseInt(e.target.value))}
                            disabled={isExecuting}
                            className="w-20 px-3 py-2 bg-slate-900 border-2 border-slate-700 rounded-xl text-white text-sm font-black outline-none focus:border-primary disabled:opacity-50"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kecepatan</label>
                        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700">
                            {[
                                { label: "1x", val: 1 },
                                { label: "2x", val: 2 },
                                { label: "4x", val: 4 }
                            ].map(s => (
                                <button
                                    key={s.label}
                                    onClick={() => setSpeed(s.val)}
                                    className={`px-3 py-1 text-xs font-black uppercase rounded-lg transition-all ${speed === s.val ? "bg-primary text-white" : "text-slate-500 hover:text-slate-300"}`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 items-end">
                        <button
                            onClick={runSimulation}
                            disabled={isExecuting || inputVal < 1 || inputVal > 6}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-widest disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-base">play_arrow</span>
                            Start
                        </button>
                        <button
                            onClick={reset}
                            disabled={isExecuting}
                            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-xl transition-all text-xs font-black uppercase disabled:opacity-50 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-base">refresh</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Split View */}
            <div className="grid lg:grid-cols-2 gap-8">

                {/* LEFT: ITERATION */}
                <div className="bg-slate-800 rounded-2xl border-2 border-emerald-500/20 flex flex-col overflow-hidden">
                    <div className="bg-emerald-500/10 p-4 border-b border-emerald-500/20 flex justify-between items-center">
                        <h4 className="font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="material-symbols-outlined">loop</span> Iterasi (Looping)
                        </h4>
                        <div className="flex gap-2">
                            <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md">Time: O(n)</span>
                            <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-md">Space: O(1)</span>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-900 border-b border-white/5 font-mono text-xs text-slate-300">
                        <span className="text-cyan-400">let</span> result = <span className="text-amber-300">1</span>;{"\n"}
                        <span className="text-cyan-400">for</span> (<span className="text-cyan-400">let</span> i = <span className="text-amber-300">2</span>; i &lt;= <span className="text-orange-300">n</span>; i++) {"{"}{"\n"}
                        {"    "}result *= i;{"\n"}
                        {"}"}{"\n"}
                        <span className="text-cyan-400">return</span> result;
                    </div>

                    <div className="p-6 flex-1 flex flex-col gap-6 relative">
                        {/* Iteration Variable Trace */}
                        <div className="flex gap-4 items-center justify-center p-4 bg-slate-900 rounded-xl border border-white/5 shadow-inner min-h-[100px]">
                            {iterativeVars ? (
                                <>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-500 uppercase">Variable i</p>
                                        <p className="text-3xl font-black text-orange-400">{iterativeVars.i}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-600 font-black">close</span>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-500 uppercase">Result</p>
                                        <p className="text-3xl font-black text-emerald-400">{iterativeVars.result}</p>
                                    </div>
                                </>
                            ) : iterativeResult !== null ? (
                                <div className="text-center animate-bounce">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase mb-1 flex items-center justify-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Final Target</p>
                                    <p className="text-5xl font-black text-emerald-400">{iterativeResult}</p>
                                </div>
                            ) : (
                                <p className="text-slate-500 text-xs italic font-medium">Menunggu eksekusi...</p>
                            )}
                        </div>

                        {/* Logs */}
                        <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-3 overflow-y-auto max-h-[200px] flex flex-col gap-1">
                            {iterativeLogs.map((log, i) => (
                                <p key={i} className="text-[11px] font-mono text-emerald-300/80 m-0 leading-tight">
                                    <span className="text-slate-600">&gt;</span> {log}
                                </p>
                            ))}
                            {/* Auto scroll stub */}
                            <div className="mt-auto"></div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: RECURSION */}
                <div className="bg-slate-800 rounded-2xl border-2 border-teal-500/20 flex flex-col overflow-hidden">
                    <div className="bg-teal-500/10 p-4 border-b border-teal-500/20 flex justify-between items-center">
                        <h4 className="font-black text-teal-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="material-symbols-outlined">account_tree</span> Rekursi
                        </h4>
                        <div className="flex gap-2">
                            <span className="text-[9px] font-black bg-teal-500/20 text-teal-300 px-2 py-1 rounded-md">Time: O(n)</span>
                            <span className="text-[9px] font-black bg-rose-500/20 text-rose-300 px-2 py-1 rounded-md animate-pulse">Space: O(n)</span>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-900 border-b border-white/5 font-mono text-xs text-slate-300">
                        <span className="text-cyan-400">function</span> <span className="text-blue-400">fact</span>(<span className="text-orange-300">n</span>) {"{"}{"\n"}
                        {"    "}<span className="text-cyan-400">if</span> (<span className="text-orange-300">n</span> &lt;= <span className="text-amber-300">1</span>) <span className="text-cyan-400">return</span> <span className="text-amber-300">1</span>;{"\n"}
                        {"    "}<span className="text-cyan-400">return</span> <span className="text-orange-300">n</span> * <span className="text-blue-400">fact</span>(<span className="text-orange-300">n</span> - <span className="text-amber-300">1</span>);{"\n"}
                        {"}"}
                    </div>

                    <div className="p-6 flex-1 flex flex-col gap-6 relative">
                        {/* Call Stack Trace */}
                        <div className="flex flex-col-reverse gap-2 items-center justify-start p-4 bg-slate-900 rounded-xl border border-white/5 shadow-inner min-h-[160px] max-h-[160px] overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                {recursiveStack.map((frame, idx) => (
                                    <motion.div
                                        key={frame.id}
                                        layout
                                        initial={{ y: -20, opacity: 0, scale: 0.9 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8, x: 50 }}
                                        className={`w-full max-w-[200px] px-3 py-2 rounded-lg border-2 shadow-md flex justify-between items-center ${frame.isReturning
                                                ? "bg-emerald-900/40 border-emerald-500 text-emerald-100"
                                                : "bg-teal-900/40 border-teal-500 text-teal-100"
                                            }`}
                                    >
                                        <div>
                                            <p className="text-[9px] font-black opacity-60 uppercase mb-0.5">Frame {idx + 1}</p>
                                            <p className="font-mono text-[11px] font-bold">fact({frame.n})</p>
                                        </div>
                                        {frame.result !== undefined && (
                                            <div className="text-[11px] font-black bg-emerald-500/20 px-2 rounded text-emerald-300">
                                                ={frame.result}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {recursiveStack.length === 0 && recursiveResult !== null && (
                                <div className="text-center animate-bounce mt-4">
                                    <p className="text-[10px] font-black text-teal-500 uppercase mb-1 flex items-center justify-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Final Stack Unwound</p>
                                    <p className="text-5xl font-black text-teal-400">{recursiveResult}</p>
                                </div>
                            )}

                            {recursiveStack.length === 0 && recursiveResult === null && (
                                <p className="text-slate-500 text-xs italic font-medium my-auto">Menunggu eksekusi...</p>
                            )}
                        </div>

                        {/* Logs */}
                        <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-3 overflow-y-auto max-h-[100px] flex flex-col gap-1">
                            {recursiveLogs.map((log, i) => (
                                <p key={i} className="text-[11px] font-mono text-teal-300/80 m-0 leading-tight">
                                    <span className="text-slate-600">&gt;</span> {log}
                                </p>
                            ))}
                            {/* Auto scroll stub */}
                            <div className="mt-auto"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

