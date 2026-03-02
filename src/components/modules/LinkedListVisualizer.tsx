"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeData {
    id: number;
    value: number;
}

type Mode = "SINGLY" | "DOUBLY";

export default function LinkedListVisualizer({ initialMode = "SINGLY" }: { initialMode?: Mode }) {
    const [nodes, setNodes] = useState<NodeData[]>([
        { id: 1, value: 20 },
        { id: 2, value: 30 }
    ]);
    const [mode, setMode] = useState<Mode>(initialMode);
    const [stepInfo, setStepInfo] = useState("Klik tombol di samping untuk berinteraksi.");
    const [isExecuting, setIsExecuting] = useState(false);
    const [tempNode, setTempNode] = useState<{ value: number; x: number; y: number; connectHead: boolean } | null>(null);
    const [newNodeValue, setNewNodeValue] = useState<string>("");

    // Reset simulator
    const reset = () => {
        setNodes([
            { id: 1, value: 20 },
            { id: 2, value: 30 }
        ]);
        setStepInfo("Simulator direset ke keadaan awal.");
        setTempNode(null);
        setIsExecuting(false);
    };

    const runPrepend = async () => {
        if (!newNodeValue) return;
        const val = parseInt(newNodeValue);
        setIsExecuting(true);
        setNewNodeValue("");

        // Step 1: Create Node
        setStepInfo("1. Membuat node baru dengan nilai " + val + ".");
        setTempNode({ value: val, x: -100, y: -60, connectHead: false });
        await new Promise(r => setTimeout(r, 1000));

        // Step 2: Connect to Head
        setStepInfo("2. Menghubungkan pointer 'next' node baru ke HEAD saat ini.");
        setTempNode(prev => prev ? { ...prev, connectHead: true } : null);
        await new Promise(r => setTimeout(r, 1200));

        // Step 3: Shift and Finalize
        setStepInfo("3. Memperbarui pointer HEAD ke node baru. Selesai (O(1))!");
        setNodes(prev => [{ id: Date.now(), value: val }, ...prev]);
        setTempNode(null);
        await new Promise(r => setTimeout(r, 500));
        setIsExecuting(false);
    };

    const runAppend = async () => {
        if (!newNodeValue) return;
        const val = parseInt(newNodeValue);
        setIsExecuting(true);
        setNewNodeValue("");

        // Step 1: Create Node
        setStepInfo("1. Membuat node baru dengan nilai " + val + ".");
        setTempNode({ value: val, x: 200, y: -60, connectHead: false });
        await new Promise(r => setTimeout(r, 1000));

        // Step 2: Scan (If Singly)
        if (mode === "SINGLY") {
            setStepInfo("2. Tracing dari HEAD mencari node terakhir (O(n))...");
            await new Promise(r => setTimeout(r, 1500));
        } else {
            setStepInfo("2. Langsung akses TAIL (O(1))...");
            await new Promise(r => setTimeout(r, 800));
        }

        // Step 3: Connect
        setStepInfo("3. Hubungkan node terakhir sebelumnya ke node baru.");
        setNodes(prev => [...prev, { id: Date.now(), value: val }]);
        setTempNode(null);
        await new Promise(r => setTimeout(r, 500));
        setIsExecuting(false);
    };

    const deleteHead = async () => {
        if (nodes.length === 0) return;
        setIsExecuting(true);
        setStepInfo("1. Mengarahkan HEAD ke node berikutnya (head.next).");
        await new Promise(r => setTimeout(r, 1000));
        setStepInfo("2. Node lama dihapus dari memori. Selesai (O(1))!");
        setNodes(prev => prev.slice(1));
        await new Promise(r => setTimeout(r, 500));
        setIsExecuting(false);
    };

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="flex-1 min-h-[90px]">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2 italic">
                        <span className="material-symbols-outlined text-primary text-base not-italic">info</span>
                        Interactive {mode === "SINGLY" ? "Singly" : "Doubly"} Linked List
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-tight italic">
                            {stepInfo}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 h-fit">
                        <button
                            onClick={() => { setMode("SINGLY"); reset(); }}
                            disabled={isExecuting}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${mode === "SINGLY" ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 hover:text-slate-700 opacity-50"}`}
                        >
                            SINGLY
                        </button>
                        <button
                            onClick={() => { setMode("DOUBLY"); reset(); }}
                            disabled={isExecuting}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${mode === "DOUBLY" ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 hover:text-slate-700 opacity-50"}`}
                        >
                            DOUBLY
                        </button>
                    </div>

                    <div className="flex gap-1.5">
                        <input
                            type="number"
                            placeholder="Nilai"
                            value={newNodeValue}
                            onChange={(e) => setNewNodeValue(e.target.value)}
                            disabled={isExecuting}
                            className="w-16 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black outline-none focus:border-primary/50 disabled:opacity-50"
                        />
                        <button
                            onClick={runPrepend}
                            disabled={isExecuting || !newNodeValue}
                            className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50"
                        >
                            Prepend
                        </button>
                        <button
                            onClick={runAppend}
                            disabled={isExecuting || !newNodeValue}
                            className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50"
                        >
                            Append
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative min-h-[220px] flex items-center justify-center py-10">
                <div className="flex items-center gap-4 flex-nowrap min-w-max px-20">
                    <AnimatePresence mode="popLayout">
                        {/* HEAD Label */}
                        <motion.div key="head-label" layout className="flex flex-col items-center gap-1 shrink-0 -mt-10 mr-2">
                            <span className="text-[10px] font-black text-primary italic uppercase tracking-widest">Head</span>
                            <span className="material-symbols-outlined text-sm text-primary rotate-180">expand_more</span>
                        </motion.div>

                        {nodes.map((node, idx) => (
                            <React.Fragment key={`node-group-${node.id}`}>
                                <motion.div
                                    key={`node-${node.id}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, x: 50 }}
                                    className="relative flex flex-col items-center gap-2"
                                >
                                    <div className="flex items-stretch border-2 border-primary rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900 min-w-[80px]">
                                        {mode === "DOUBLY" && (
                                            <div className="bg-violet-500/10 border-r border-violet-500/30 px-2 py-3 flex items-center justify-center text-[10px] font-black text-violet-500 italic">
                                                ←
                                            </div>
                                        )}
                                        <div className="px-4 py-3 flex-1 text-center font-black text-slate-900 dark:text-white bg-primary/5 text-sm">
                                            {node.value}
                                        </div>
                                        <div className="border-l border-primary/30 px-2 py-3 bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary italic">
                                            {idx === nodes.length - 1 ? "∅" : "→"}
                                        </div>
                                    </div>
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter italic">
                                        {idx === nodes.length - 1 ? "Tail" : `Node ${idx}`}
                                    </span>
                                </motion.div>

                                {idx < nodes.length - 1 && (
                                    <motion.div
                                        key={`arrow-${node.id}`}
                                        layout
                                        className="flex items-center text-primary/30 mx-[-8px]"
                                    >
                                        <span className="material-symbols-outlined text-xl">trending_flat</span>
                                    </motion.div>
                                )}
                            </React.Fragment>
                        ))}

                        {/* NULL Target */}
                        <motion.div
                            key="null-target"
                            layout
                            className="ml-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-400 italic"
                        >
                            NULL
                        </motion.div>
                    </AnimatePresence>

                    {/* Animated Temp Node */}
                    <AnimatePresence>
                        {tempNode && (
                            <motion.div
                                initial={{ opacity: 0, y: tempNode.y - 20, x: tempNode.x }}
                                animate={{ opacity: 1, y: tempNode.y, x: tempNode.x }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute flex flex-col items-center gap-2"
                            >
                                <div className="bg-amber-500/10 border-2 border-amber-500 rounded-xl overflow-hidden flex items-stretch shadow-xl shadow-amber-500/20 min-w-[80px]">
                                    {mode === "DOUBLY" && (
                                        <div className="border-r border-amber-500/30 px-2 py-3 flex items-center justify-center text-[10px] font-black text-amber-500 italic uppercase">
                                            ?
                                        </div>
                                    )}
                                    <div className="px-4 py-3 flex-1 text-center font-black text-amber-600 dark:text-amber-400 bg-amber-500/5 text-sm">
                                        {tempNode.value}
                                    </div>
                                    <div className="border-l border-amber-500/30 px-2 py-3 bg-amber-500/10 flex items-center justify-center text-[10px] font-black text-amber-500 italic tracking-tighter">
                                        {tempNode.connectHead ? "→" : "?"}
                                    </div>
                                </div>
                                <div className="bg-amber-500 text-white text-[8px] font-black px-1.5 rounded uppercase tracking-widest">New Node</div>

                                {tempNode.connectHead && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 40 }}
                                        className="absolute top-full w-0.5 bg-amber-500 flex justify-center"
                                    >
                                        <div className="absolute top-full border-4 border-transparent border-t-amber-500" />
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                    onClick={deleteHead}
                    disabled={isExecuting || nodes.length === 0}
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-500/30 text-red-500 hover:bg-red-500/5 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50"
                >
                    <span className="material-symbols-outlined text-sm">delete_sweep</span>
                    Hapus Head
                </button>
                <button
                    onClick={reset}
                    disabled={isExecuting}
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50"
                >
                    <span className="material-symbols-outlined text-sm">restart_alt</span>
                    Reset
                </button>

                <div className="col-span-2 flex justify-end gap-4 items-center">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded bg-primary"></div>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase italic">Data</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded bg-amber-500"></div>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase italic">Proses</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
