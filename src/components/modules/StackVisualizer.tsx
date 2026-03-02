"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StackItem {
    id: number;
    value: string | number;
}

export default function StackVisualizer() {
    const [stack, setStack] = useState<StackItem[]>([
        { id: 1, value: 10 },
        { id: 2, value: 20 }
    ]);
    const [stepInfo, setStepInfo] = useState("Klik tombol untuk mencoba operasi Stack.");
    const [isExecuting, setIsExecuting] = useState(false);
    const [newItemValue, setNewItemValue] = useState<string>("");
    const [postfixExpr, setPostfixExpr] = useState<string>("3 4 + 2 *");
    const [isPostfixMode, setIsPostfixMode] = useState(false);
    const [activeToken, setActiveToken] = useState<number>(-1);

    const reset = () => {
        setStack([
            { id: 1, value: 10 },
            { id: 2, value: 20 }
        ]);
        setStepInfo("Stack direset.");
        setIsExecuting(false);
        setActiveToken(-1);
    };

    const push = async (val: string | number) => {
        if (val === "") return;
        setIsExecuting(true);
        setStepInfo(`1. Menyiapkan data ${val} untuk di-PUSH.`);
        await new Promise(r => setTimeout(r, 600));

        setStepInfo(`2. Menempatkan ${val} di atas stack (Top). Selesai (O(1))!`);
        setStack(prev => [...prev, { id: Date.now(), value: val }]);
        setNewItemValue("");
        await new Promise(r => setTimeout(r, 600));
        setIsExecuting(false);
    };

    const pop = async () => {
        if (stack.length === 0) return;
        setIsExecuting(true);
        setStepInfo("1. Mengambil elemen teratas (Top) dari stack.");
        await new Promise(r => setTimeout(r, 600));

        setStepInfo(`2. Elemen ${stack[stack.length - 1].value} dikeluarkan. Selesai (O(1))!`);
        setStack(prev => prev.slice(0, -1));
        await new Promise(r => setTimeout(r, 600));
        setIsExecuting(false);
    };

    const peek = async () => {
        if (stack.length === 0) return;
        setIsExecuting(true);
        setStepInfo(`Melihat elemen teratas: ${stack[stack.length - 1].value} (Tanpa menghapus).`);
        await new Promise(r => setTimeout(r, 1000));
        setIsExecuting(false);
    };

    const runPostfixEval = async () => {
        setIsExecuting(true);
        setIsPostfixMode(true);
        setStack([]);
        const tokens = postfixExpr.split(" ").filter(t => t !== "");

        for (let i = 0; i < tokens.length; i++) {
            setActiveToken(i);
            const token = tokens[i];

            if (!isNaN(parseFloat(token))) {
                // Number
                setStepInfo(`Baca: ${token} (Angka). Operasi: PUSH ke Stack.`);
                await push(token);
                setIsExecuting(true); // Push ends it, so we restart
            } else {
                // Operator
                setStepInfo(`Baca: ${token} (Operator). Operasi: POP 2 elemen.`);
                await new Promise(r => setTimeout(r, 1000));

                if (stack.length < 2) {
                    // Manual pop simulation to show results
                    // In a real app we'd need to handle this carefully with state
                }

                // Get B
                const bVal = stack[stack.length - 1]?.value;
                setStack(prev => prev.slice(0, -1));
                setStepInfo(`POP pertama: ${bVal}.`);
                await new Promise(r => setTimeout(r, 800));

                // Get A
                const aVal = stack[stack.length - 2]?.value;
                setStack(prev => prev.slice(0, -1));
                setStepInfo(`POP kedua: ${aVal}.`);
                await new Promise(r => setTimeout(r, 800));

                // Calc
                const a = parseFloat(aVal as string);
                const b = parseFloat(bVal as string);
                let res = 0;
                if (token === "+") res = a + b;
                else if (token === "-") res = a - b;
                else if (token === "*") res = a * b;
                else if (token === "/") res = a / b;

                setStepInfo(`Hitung: ${a} ${token} ${b} = ${res}. PUSH hasil ke Stack.`);
                await push(res);
                setIsExecuting(true);
            }
            await new Promise(r => setTimeout(r, 800));
        }

        setStepInfo(`Evaluasi Selesai! Hasil akhir: ${stack[0]?.value || "Error"}`);
        setActiveToken(-1);
        setIsExecuting(false);
    };

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Stack Visualization */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-6">
                        <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 italic">
                            <span className="material-symbols-outlined text-primary text-base not-italic">layers</span>
                            Stack Visualizer
                        </h4>
                        <div className="flex gap-2">
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                                <button
                                    onClick={() => { setIsPostfixMode(false); reset(); }}
                                    disabled={isExecuting}
                                    className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${!isPostfixMode ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 opacity-50"}`}
                                >
                                    STANDARD
                                </button>
                                <button
                                    onClick={() => { setIsPostfixMode(true); reset(); }}
                                    disabled={isExecuting}
                                    className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${isPostfixMode ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 opacity-50"}`}
                                >
                                    POSTFIX
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Step Description */}
                    <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-primary/10 mb-8 min-h-[70px]">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-base">info</span>
                            {stepInfo}
                        </p>
                    </div>

                    {/* Stack Body */}
                    <div className="relative w-48 h-64 border-x-4 border-b-4 border-slate-300 dark:border-slate-700 rounded-b-2xl flex flex-col-reverse items-center p-2 gap-2 bg-slate-50/50 dark:bg-slate-900/20 shadow-inner">
                        <AnimatePresence mode="popLayout">
                            {stack.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ y: -100, opacity: 0, scale: 0.8 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: -100, opacity: 0, scale: 0.8 }}
                                    className={`w-full py-3 rounded-xl border-2 flex items-center justify-center font-black shadow-lg ${idx === stack.length - 1
                                            ? "bg-primary border-primary shadow-primary/30 text-white"
                                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        }`}
                                >
                                    {item.value}
                                    {idx === stack.length - 1 && (
                                        <div className="absolute -left-12 flex items-center gap-1">
                                            <span className="text-[10px] font-black text-primary uppercase italic">Top</span>
                                            <span className="material-symbols-outlined text-sm text-primary">arrow_forward</span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {stack.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700 font-black italic uppercase tracking-widest text-xs pointer-events-none">
                                Empty Stack
                            </div>
                        )}
                    </div>
                    <div className="w-32 h-1 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 opacity-30 shadow-2xl"></div>
                </div>

                {/* Right: Controls */}
                <div className="w-full lg:w-72 flex flex-col gap-6">
                    {!isPostfixMode ? (
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Push Item</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={newItemValue}
                                        onChange={(e) => setNewItemValue(e.target.value)}
                                        disabled={isExecuting}
                                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black outline-none focus:border-primary/50 disabled:opacity-50"
                                    />
                                    <button
                                        onClick={() => push(newItemValue)}
                                        disabled={isExecuting || !newItemValue}
                                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50"
                                    >
                                        PUSH
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={pop}
                                    disabled={isExecuting || stack.length === 0}
                                    className="px-4 py-2 border-2 border-red-500/30 text-red-500 hover:bg-red-500/5 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    POP
                                </button>
                                <button
                                    onClick={peek}
                                    disabled={isExecuting || stack.length === 0}
                                    className="px-4 py-2 border-2 border-amber-500/30 text-amber-500 hover:bg-amber-500/5 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    PEEK
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Postfix Expression</label>
                                <input
                                    type="text"
                                    value={postfixExpr}
                                    onChange={(e) => setPostfixExpr(e.target.value)}
                                    disabled={isExecuting}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black outline-none focus:border-primary/50 disabled:opacity-50"
                                />
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {postfixExpr.split(" ").map((token, i) => (
                                        <span
                                            key={i}
                                            className={`px-2 py-1 rounded text-[10px] font-bold ${activeToken === i ? "bg-primary text-white scale-110 shadow-lg" : "bg-slate-100 dark:bg-slate-800 text-slate-500"} transition-all`}
                                        >
                                            {token}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={runPostfixEval}
                                disabled={isExecuting || !postfixExpr}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">play_arrow</span>
                                Run Evaluator
                            </button>
                        </div>
                    )}

                    <button
                        onClick={reset}
                        disabled={isExecuting}
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">restart_alt</span>
                        Reset Simulator
                    </button>

                    <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">LIFO Properties</h5>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-primary mt-0.5">●</span>
                                <div>O(1) untuk PUSH & POP</div>
                            </li>
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-primary mt-0.5">●</span>
                                <div>Hanya akses di satu ujung (TOP)</div>
                            </li>
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-primary mt-0.5">●</span>
                                <div>Digunakan untuk undo/stack-call</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
