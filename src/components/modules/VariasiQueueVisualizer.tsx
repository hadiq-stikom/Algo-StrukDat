"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
    id: number;
    value: string;
    priority?: number; // 1 (High) - 3 (Low), for Priority Queue
}

type Mode = "priority" | "deque";

export default function VariasiQueueVisualizer() {
    const [mode, setMode] = useState<Mode>("priority");
    const [queue, setQueue] = useState<Item[]>([]);
    const [isExecuting, setIsExecuting] = useState(false);
    const [info, setInfo] = useState("Pilih mode dan operasikan antrean untuk melihat simulasi.");

    // -- Priority Queue Controls --
    const [pqValue, setPqValue] = useState("");
    const [pqPriority, setPqPriority] = useState<number>(2);

    // -- Deque Controls --
    const [dqValue, setDqValue] = useState("");

    // Reset simulator
    const reset = (newMode: Mode) => {
        setMode(newMode);
        setQueue([]);
        setInfo(`Mode ${newMode === "priority" ? "Priority Queue" : "Deque"} siap!`);
        setIsExecuting(false);
    };

    // --- PRIORITY QUEUE LOGIC ---
    const pqEnqueue = async () => {
        if (!pqValue) return;
        if (queue.length >= 5) {
            setInfo("Antrean penuh! (Maks 5)");
            return;
        }

        setIsExecuting(true);
        setInfo(`1. Menerima elemen '${pqValue}' dengan Prioritas ${pqPriority}.`);
        await new Promise(r => setTimeout(r, 800));

        const newItem: Item = { id: Date.now(), value: pqValue, priority: pqPriority };
        let newQueue = [...queue, newItem];

        setInfo(`2. Menyisipkan sesuai prioritas (P1 tertinggi, P3 terendah)...`);
        await new Promise(r => setTimeout(r, 800));

        // Sort by priority (ascending, so 1 comes first)
        newQueue.sort((a, b) => a.priority! - b.priority!);

        setQueue(newQueue);
        setInfo(`✅ '${pqValue}' telah disisipkan ke posisi yang tepat berdasar prioritas.`);
        setPqValue("");
        await new Promise(r => setTimeout(r, 500));
        setIsExecuting(false);
    };

    const pqDequeue = async () => {
        if (queue.length === 0) {
            setInfo("Antrean kosong!");
            return;
        }

        setIsExecuting(true);
        const item = queue[0];
        setInfo(`1. Mengambil elemen prioritas tertinggi: '${item.value}' (P${item.priority}) di depan.`);
        await new Promise(r => setTimeout(r, 800));

        setQueue(prev => prev.slice(1));
        setInfo(`✅ '${item.value}' telah diproses.`);
        setIsExecuting(false);
    };

    // --- DEQUE LOGIC ---
    const dqEnqueue = async (side: "front" | "rear") => {
        if (!dqValue) return;
        if (queue.length >= 5) {
            setInfo("Antrean penuh! (Maks 5)");
            return;
        }

        setIsExecuting(true);
        setInfo(`1. Menerima elemen '${dqValue}' secara paksa dari jalur ${side === "front" ? "DEPAN" : "BELAKANG"}...`);
        await new Promise(r => setTimeout(r, 800));

        const newItem: Item = { id: Date.now(), value: dqValue };
        setQueue(prev => {
            if (side === "front") return [newItem, ...prev];
            return [...prev, newItem];
        });

        setInfo(`✅ '${dqValue}' berhasil dimasukkan dari ${side}.`);
        setDqValue("");
        setIsExecuting(false);
    };

    const dqDequeue = async (side: "front" | "rear") => {
        if (queue.length === 0) {
            setInfo("Antrean kosong!");
            return;
        }

        setIsExecuting(true);
        const item = side === "front" ? queue[0] : queue[queue.length - 1];
        setInfo(`1. Mengambil elemen dari ${side === "front" ? "DEPAN" : "BELAKANG"}: '${item.value}'...`);
        await new Promise(r => setTimeout(r, 800));

        setQueue(prev => {
            if (side === "front") return prev.slice(1);
            return prev.slice(0, prev.length - 1);
        });

        setInfo(`✅ '${item.value}' telah dikeluarkan.`);
        setIsExecuting(false);
    };

    return (
        <div className="bg-slate-900 border-2 border-primary/20 rounded-2xl p-6 shadow-2xl overflow-hidden w-full max-w-4xl mx-auto">
            {/* Header & Mode Switch */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex gap-2 bg-slate-800 p-1 rounded-xl">
                    <button
                        onClick={() => reset("priority")}
                        className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${mode === "priority" ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30" : "text-slate-400 hover:text-white"}`}
                    >
                        Priority Queue
                    </button>
                    <button
                        onClick={() => reset("deque")}
                        className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${mode === "deque" ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "text-slate-400 hover:text-white"}`}
                    >
                        Deque
                    </button>
                </div>
                <div className="text-right">
                    <h4 className="text-sm font-black text-white uppercase italic">
                        {mode === "priority" ? "🌟 Prioritas Tertinggi, Proses Pertama" : "↔️ Masuk Keluar Bebas Dua Arah"}
                    </h4>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-slate-800 border-l-4 border-emerald-500 p-4 rounded-r-xl mb-6 min-h-[70px] flex items-center">
                <p className="text-sm font-bold text-slate-200">
                    <span className="material-symbols-outlined text-emerald-400 align-middle mr-2 text-lg">info</span>
                    {info}
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Visualizer Area */}
                <div className="flex-1 bg-slate-950/50 rounded-2xl border-2 border-slate-800 p-6 flex items-center justify-center min-h-[250px] relative overflow-hidden">
                    {/* Background indicators */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 border-2 border-dashed border-emerald-500/30 text-emerald-500/30 font-black text-xs uppercase p-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>OUT (Front)</div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-dashed border-amber-500/30 text-amber-500/30 font-black text-xs uppercase p-2" style={{ writingMode: 'vertical-rl' }}>IN (Rear)</div>
                    {mode === "deque" && (
                        <>
                            <div className="absolute left-10 top-1/2 -translate-y-1/2 border-2 border-dashed border-cyan-500/30 text-cyan-500/30 font-black text-xs uppercase p-2 rotate-180 leading-none h-auto w-auto" style={{ writingMode: 'vertical-rl' }}>IN</div>
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 border-2 border-dashed border-rose-500/30 text-rose-500/30 font-black text-xs uppercase p-2 leading-none h-auto w-auto" style={{ writingMode: 'vertical-rl' }}>OUT</div>
                        </>
                    )}

                    <div className="flex gap-3 z-10 w-full justify-center">
                        <AnimatePresence mode="popLayout">
                            {queue.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.5, y: -50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, y: 50 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`w-16 h-16 flex flex-col justify-center items-center rounded-xl border-2 font-black shadow-lg relative
                                        ${idx === 0 ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-slate-600 bg-slate-800 text-white"}
                                    `}
                                >
                                    <span className="text-xl">{item.value}</span>
                                    {mode === "priority" && (
                                        <span className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white shadow-md border border-white/20
                                            ${item.priority === 1 ? 'bg-rose-500' : item.priority === 2 ? 'bg-amber-500' : 'bg-slate-500'}
                                        `}>
                                            P{item.priority}
                                        </span>
                                    )}
                                    <span className="absolute -bottom-5 text-[9px] text-slate-500 font-mono tracking-widest text-center">[{idx}]</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {queue.length === 0 && (
                            <div className="text-slate-500 font-black uppercase text-sm tracking-[0.3em] z-10">Antrean Kosong</div>
                        )}
                    </div>
                </div>

                {/* Controls Area */}
                <div className="md:w-64 space-y-4 flex flex-col justify-center">
                    {mode === "priority" ? (
                        <div className="space-y-4">
                            <div className="bg-slate-800 p-4 rounded-xl border border-rose-500/30 space-y-3">
                                <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Tambah Pasien / Data</label>
                                <input
                                    type="text"
                                    maxLength={3}
                                    placeholder="Data (cth: A)"
                                    value={pqValue}
                                    onChange={(e) => setPqValue(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 text-white font-black px-3 py-2 rounded-lg text-sm text-center"
                                    disabled={isExecuting}
                                />
                                <div className="flex gap-1 justify-center">
                                    {[1, 2, 3].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPqPriority(p)}
                                            className={`flex-1 py-1 rounded-md text-[9px] font-black border transition-colors ${pqPriority === p
                                                ? p === 1 ? 'bg-rose-500 border-rose-500 text-white' : p === 2 ? 'bg-amber-500 border-amber-500 text-white' : 'bg-green-500 border-green-500 text-white'
                                                : 'bg-slate-900 border-slate-700 text-slate-400'
                                                }`}
                                        >
                                            P{p}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={pqEnqueue}
                                    disabled={isExecuting || !pqValue || queue.length >= 5}
                                    className="w-full bg-primary/80 hover:bg-primary text-white font-black text-[10px] py-2 rounded-lg transition-colors uppercase disabled:opacity-50"
                                >
                                    Enqueue (Push)
                                </button>
                            </div>
                            <button
                                onClick={pqDequeue}
                                disabled={isExecuting || queue.length === 0}
                                className="w-full bg-rose-500/80 hover:bg-rose-500 text-white font-black text-sm py-3 rounded-xl shadow-lg transition-transform active:scale-95 uppercase disabled:opacity-50"
                            >
                                Proses (Dequeue)
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-slate-800 p-4 rounded-xl border border-cyan-500/30 space-y-3">
                                <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest text-center block">Manipulasi Data</label>
                                <input
                                    type="text"
                                    maxLength={3}
                                    placeholder="Data (cth: X)"
                                    value={dqValue}
                                    onChange={(e) => setDqValue(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 text-white font-black px-3 py-2 rounded-lg text-sm text-center"
                                    disabled={isExecuting}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => dqEnqueue("front")}
                                        disabled={isExecuting || !dqValue || queue.length >= 5}
                                        className="bg-cyan-600/80 hover:bg-cyan-600 text-white font-black text-[9px] py-2 rounded-lg transition-colors uppercase disabled:opacity-50 flex items-center justify-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-[10px]">arrow_forward</span> Push Depan
                                    </button>
                                    <button
                                        onClick={() => dqEnqueue("rear")}
                                        disabled={isExecuting || !dqValue || queue.length >= 5}
                                        className="bg-amber-600/80 hover:bg-amber-600 text-white font-black text-[9px] py-2 rounded-lg transition-colors uppercase disabled:opacity-50 flex items-center justify-center gap-1"
                                    >
                                        Push Belakang <span className="material-symbols-outlined text-[10px]">arrow_back</span>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => dqDequeue("front")}
                                    disabled={isExecuting || queue.length === 0}
                                    className="bg-rose-500/80 hover:bg-rose-500 text-white font-black text-[9px] py-3 rounded-xl transition-colors uppercase disabled:opacity-50"
                                >
                                    Pop Depan
                                </button>
                                <button
                                    onClick={() => dqDequeue("rear")}
                                    disabled={isExecuting || queue.length === 0}
                                    className="bg-teal-500/80 hover:bg-teal-500 text-white font-black text-[9px] py-3 rounded-xl transition-colors uppercase disabled:opacity-50"
                                >
                                    Pop Belakang
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

