"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QueueItem {
    id: number;
    value: string | number;
    priority?: number;
}

export default function QueueVisualizer() {
    const [queue, setQueue] = useState<QueueItem[]>([
        { id: 1, value: "A", priority: 2 },
        { id: 2, value: "B", priority: 2 }
    ]);
    const [stepInfo, setStepInfo] = useState("Klik tombol untuk mencoba operasi Queue.");
    const [isExecuting, setIsExecuting] = useState(false);
    const [newItemValue, setNewItemValue] = useState<string>("");
    const [isCircularMode, setIsCircularMode] = useState(false);
    const [isPriorityMode, setIsPriorityMode] = useState(false);
    const [itemPriority, setItemPriority] = useState<number>(2);
    const MAX_SIZE = 5;

    const reset = () => {
        setQueue([
            { id: 1, value: "A", priority: 2 },
            { id: 2, value: "B", priority: 2 }
        ]);
        setStepInfo("Queue direset.");
        setIsExecuting(false);
    };

    const enqueue = async (val: string | number) => {
        if (val === "") return;
        if (queue.length >= MAX_SIZE) {
            setStepInfo("Queue Penuh! (Overflow Error)");
            return;
        }

        setIsExecuting(true);
        if (isPriorityMode) {
            setStepInfo(`1. Menyiapkan data '${val}' dengan Prioritas ${itemPriority}.`);
        } else {
            setStepInfo(`1. Menyiapkan data '${val}' untuk masuk antrean.`);
        }
        await new Promise(r => setTimeout(r, 600));

        const newItem: QueueItem = { id: Date.now(), value: val, priority: isPriorityMode ? itemPriority : 2 };

        if (isPriorityMode) {
            setStepInfo(`2. Menyisipkan '${val}' berdasarkan prioritas. Sistem mencari posisi yang tepat.`);
            await new Promise(r => setTimeout(r, 800));
            setQueue(prev => {
                const newQueue = [...prev, newItem];
                // Sort by priority (1 is highest in this display, let's say 1=High, 2=Medium, 3=Low)
                // Actually let's use 1=High, 2=Med, 3=Low for easier understanding
                return newQueue.sort((a: QueueItem, b: QueueItem) => (a.priority || 0) - (b.priority || 0));
            });
            setStepInfo(`3. '${val}' telah ditempatkan. Selesai (O(log N) jika pakai Heap)!`);
        } else {
            setStepInfo(`2. Menempatkan '${val}' di posisi REAR. Selesai (O(1))!`);
            setQueue(prev => [...prev, newItem]);
        }

        setNewItemValue("");
        await new Promise(r => setTimeout(r, 600));
        setIsExecuting(false);
    };

    const dequeue = async () => {
        if (queue.length === 0) {
            setStepInfo("Queue Kosong! (Underflow Error)");
            return;
        }

        setIsExecuting(true);
        setStepInfo(`1. Mengambil data '${queue[0].value}' dari posisi FRONT.`);
        await new Promise(r => setTimeout(r, 600));

        setStepInfo(`2. Data dikeluarkan. Selesai (O(1))!`);
        setQueue(prev => prev.slice(1));
        await new Promise(r => setTimeout(r, 600));
        setIsExecuting(false);
    };

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Queue Visualization */}
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-6">
                        <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 italic">
                            <span className="material-symbols-outlined text-primary text-base not-italic">group</span>
                            Queue Visualizer
                        </h4>
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                            {[
                                { id: 'linear', label: 'LINEAR' },
                                { id: 'circular', label: 'CIRCULAR' },
                                { id: 'priority', label: 'PRIORITY' }
                            ].map(mode => (
                                <button
                                    key={mode.id}
                                    onClick={() => {
                                        setIsCircularMode(mode.id === 'circular');
                                        setIsPriorityMode(mode.id === 'priority');
                                        reset();
                                    }}
                                    className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${(mode.id === 'linear' && !isCircularMode && !isPriorityMode) ||
                                        (mode.id === 'circular' && isCircularMode) ||
                                        (mode.id === 'priority' && isPriorityMode)
                                        ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 opacity-50"}`}
                                >
                                    {mode.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step Description */}
                    <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-primary/10 mb-8 min-h-[70px]">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-base">info</span>
                            {stepInfo}
                        </p>
                    </div>

                    {/* Queue Body */}
                    {!isCircularMode ? (
                        <div className="relative w-full max-w-md h-32 flex items-center justify-center p-4 gap-2 bg-slate-50/50 dark:bg-slate-900/20 border-y-4 border-slate-300 dark:border-slate-700 rounded-xl">
                            <AnimatePresence mode="popLayout">
                                {queue.map((item: QueueItem, idx) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ x: 100, opacity: 0, scale: 0.8 }}
                                        animate={{ x: 0, opacity: 1, scale: 1 }}
                                        exit={{ x: -100, opacity: 0, scale: 0.8 }}
                                        className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center font-black shadow-lg relative ${idx === 0
                                            ? "bg-primary border-primary shadow-primary/30 text-white"
                                            : idx === queue.length - 1 && !isPriorityMode
                                                ? "bg-emerald-500 border-emerald-500 shadow-emerald-500/30 text-white"
                                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            }`}
                                    >
                                        <span className="text-lg">{item.value}</span>
                                        {isPriorityMode && (
                                            <span className={`text-[8px] px-1 rounded ${item.priority === 1 ? 'bg-rose-500 text-white' :
                                                item.priority === 2 ? 'bg-amber-500 text-white' : 'bg-slate-400 text-white'
                                                }`}>
                                                P{item.priority}
                                            </span>
                                        )}
                                        {idx === 0 && (
                                            <div className="absolute -top-10 flex flex-col items-center">
                                                <span className="text-[10px] font-black text-primary uppercase italic">Front</span>
                                                <span className="material-symbols-outlined text-sm text-primary leading-none">arrow_downward</span>
                                            </div>
                                        )}
                                        {idx === queue.length - 1 && queue.length > 1 && !isPriorityMode && (
                                            <div className="absolute -bottom-10 flex flex-col items-center">
                                                <span className="material-symbols-outlined text-sm text-emerald-500 leading-none">arrow_upward</span>
                                                <span className="text-[10px] font-black text-emerald-500 uppercase italic">Rear</span>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {queue.length === 0 && (
                                <div className="text-slate-300 dark:text-slate-700 font-black italic uppercase tracking-widest text-xs pointer-events-none">
                                    Empty Queue
                                </div>
                            )}

                            {/* Limits labels */}
                            <div className="absolute left-0 top-0 h-full border-l-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col justify-center -ml-4">
                                <span className="text-[8px] font-black text-slate-400 rotate-90">OUT</span>
                            </div>
                            {!isPriorityMode && (
                                <div className="absolute right-0 top-0 h-full border-r-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col justify-center -mr-4">
                                    <span className="text-[8px] font-black text-slate-400 rotate-90">IN</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Circular Track */}
                            <div className="absolute inset-0 border-12 border-slate-100 dark:border-slate-800 rounded-full shadow-inner"></div>

                            {/* Slots */}
                            {[0, 1, 2, 3, 4].map((slotIdx) => {
                                const angle = (slotIdx * 360) / 5 - 90;
                                const radius = 90;
                                const x = Math.cos((angle * Math.PI) / 180) * radius;
                                const y = Math.sin((angle * Math.PI) / 180) * radius;

                                const itemInSlot = queue[slotIdx];
                                const isFront = slotIdx === 0 && queue.length > 0;
                                const isRear = slotIdx === queue.length - 1 && queue.length > 0;

                                return (
                                    <div
                                        key={slotIdx}
                                        style={{ transform: `translate(${x}px, ${y}px)` }}
                                        className="absolute w-12 h-12 flex items-center justify-center"
                                    >
                                        <div className={`w-full h-full rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] text-slate-300`}>
                                            {slotIdx}
                                        </div>
                                        <AnimatePresence>
                                            {itemInSlot && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1.1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    className={`absolute inset-0 rounded-full border-2 flex items-center justify-center font-black shadow-lg ${isFront ? 'bg-primary border-primary text-white' : isRear ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'}`}
                                                >
                                                    {itemInSlot.value}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        {isFront && (
                                            <div className="absolute -top-8 flex flex-col items-center animate-bounce">
                                                <span className="text-[8px] font-black text-primary uppercase">Front</span>
                                                <span className="material-symbols-outlined text-xs text-primary leading-none">arrow_downward</span>
                                            </div>
                                        )}
                                        {isRear && (
                                            <div className="absolute -bottom-8 flex flex-col items-center animate-bounce">
                                                <span className="material-symbols-outlined text-xs text-emerald-500 leading-none">arrow_upward</span>
                                                <span className="text-[8px] font-black text-emerald-500 uppercase">Rear</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div className="z-0 text-center font-black italic text-slate-300 dark:text-slate-700 text-xs">
                                CIRCULAR<br />QUEUE
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Controls */}
                <div className="w-full lg:w-72 flex flex-col gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Enqueue Item</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Value"
                                    value={newItemValue}
                                    onChange={(e) => setNewItemValue(e.target.value)}
                                    disabled={isExecuting}
                                    onKeyDown={(e) => e.key === 'Enter' && enqueue(newItemValue)}
                                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black outline-none focus:border-primary/50 disabled:opacity-50"
                                />
                                <button
                                    onClick={() => enqueue(newItemValue)}
                                    disabled={isExecuting || !newItemValue || queue.length >= MAX_SIZE}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50"
                                >
                                    ENQUEUE
                                </button>
                            </div>
                        </div>
                        {isPriorityMode && (
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Priority Level</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setItemPriority(p)}
                                            className={`flex-1 py-1 rounded-lg text-[10px] font-black border-2 transition-all ${itemPriority === p
                                                    ? (p === 1 ? 'bg-rose-500 border-rose-500 text-white' : p === 2 ? 'bg-amber-500 border-amber-500 text-white' : 'bg-slate-500 border-slate-500 text-white')
                                                    : 'border-slate-200 dark:border-slate-800 text-slate-400'
                                                }`}
                                        >
                                            P{p} {p === 1 ? '(High)' : p === 2 ? '(Med)' : '(Low)'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <button
                            onClick={dequeue}
                            disabled={isExecuting || queue.length === 0}
                            className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">remove_from_queue</span>
                            DEQUEUE (FRONT)
                        </button>
                    </div>

                    <button
                        onClick={reset}
                        disabled={isExecuting}
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">restart_alt</span>
                        Reset Simulator
                    </button>

                    <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">FIFO Properties</h5>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-emerald-500 mt-0.5">●</span>
                                <div>O(1) untuk Enqueue & Dequeue</div>
                            </li>
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-emerald-500 mt-0.5">●</span>
                                <div>Masuk lewat REAR, keluar lewat FRONT</div>
                            </li>
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-emerald-500 mt-0.5">●</span>
                                <div>Mencegah monopolasi resource</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
