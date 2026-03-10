"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIZE = 5;

type LogEntry = { text: string; type: "normal" | "error" | "success" | "info" };

interface QueueState {
    queue: (number | null)[];
    front: number;
    rear: number;
    count: number;
    log: LogEntry[];
    isError?: boolean;
}

const makeLinear = (): QueueState => ({
    queue: Array(SIZE).fill(null),
    front: -1,
    rear: -1,
    count: 0,
    log: [{ text: "Linear Queue siap.", type: "info" }],
});

const makeCircular = (): QueueState => ({
    queue: Array(SIZE).fill(null),
    front: -1,
    rear: -1,
    count: 0,
    log: [{ text: "Circular Queue siap.", type: "info" }],
});

const DEMO_STEPS = [
    { op: "enqueue", val: 10, desc: "Enqueue(10)" },
    { op: "enqueue", val: 20, desc: "Enqueue(20)" },
    { op: "enqueue", val: 30, desc: "Enqueue(30)" },
    { op: "dequeue", val: null, desc: "Dequeue() → slot depan kosong" },
    { op: "dequeue", val: null, desc: "Dequeue() → slot depan kosong" },
    { op: "enqueue", val: 40, desc: "Enqueue(40)" },
    { op: "enqueue", val: 50, desc: "Enqueue(50)" },
    { op: "enqueue", val: 60, desc: "Enqueue(60) — posisi REAR mentok!?" },
    { op: "enqueue", val: 70, desc: "Enqueue(70) — Apa yang terjadi?" },
];

function linearEnqueue(state: QueueState, val: number): QueueState {
    const q = [...state.queue];
    if (state.rear === SIZE - 1) {
        // False overflow: there might be free slots at the front!
        const freeSlots = state.front;
        return {
            ...state,
            isError: true,
            log: [
                ...state.log,
                {
                    text: `❌ Enqueue(${val}) GAGAL! REAR = ${state.rear} (mentok). Ada ${freeSlots > 0 ? freeSlots : 0} slot kosong di depan tapi tidak bisa diakses → FALSE OVERFLOW!`,
                    type: "error",
                },
            ],
        };
    }
    const newRear = state.rear + 1;
    q[newRear] = val;
    const newFront = state.front === -1 ? 0 : state.front;
    return {
        ...state,
        queue: q,
        front: newFront,
        rear: newRear,
        count: state.count + 1,
        isError: false,
        log: [
            ...state.log,
            { text: `✅ Enqueue(${val}) → REAR: ${state.rear} → ${newRear}`, type: "success" },
        ],
    };
}

function linearDequeue(state: QueueState): QueueState {
    if (state.front === -1 || state.front > state.rear) {
        return {
            ...state,
            log: [...state.log, { text: "Queue kosong, tidak ada yang di-dequeue.", type: "error" }],
        };
    }
    const q = [...state.queue];
    const removed = q[state.front];
    q[state.front] = null;
    const newFront = state.front + 1;
    return {
        ...state,
        queue: q,
        front: newFront,
        count: state.count - 1,
        isError: false,
        log: [
            ...state.log,
            { text: `🗑️ Dequeue() → keluar: ${removed}. FRONT: ${state.front} → ${newFront} (slot kosong dibiarkan!)`, type: "normal" },
        ],
    };
}

function circularEnqueue(state: QueueState, val: number): QueueState {
    const q = [...state.queue];
    const nextRear = (state.rear + 1) % SIZE;
    if (state.count === SIZE) {
        return {
            ...state,
            isError: true,
            log: [...state.log, { text: `❌ Enqueue(${val}) GAGAL! Queue benar-benar penuh (${SIZE}/${SIZE}).`, type: "error" }],
        };
    }
    q[nextRear] = val;
    const newFront = state.front === -1 ? 0 : state.front;
    return {
        ...state,
        queue: q,
        front: newFront,
        rear: nextRear,
        count: state.count + 1,
        isError: false,
        log: [
            ...state.log,
            {
                text: `✅ Enqueue(${val}) → (${state.rear} + 1) % ${SIZE} = ${nextRear} (REAR berputar!)`,
                type: nextRear < state.rear ? "info" : "success",
            },
        ],
    };
}

function circularDequeue(state: QueueState): QueueState {
    if (state.count === 0 || state.front === -1) {
        return {
            ...state,
            log: [...state.log, { text: "Queue kosong.", type: "error" }],
        };
    }
    const q = [...state.queue];
    const removed = q[state.front];
    q[state.front] = null;
    const newFront = (state.front + 1) % SIZE;
    const newCount = state.count - 1;
    return {
        ...state,
        queue: q,
        front: newCount === 0 ? -1 : newFront,
        rear: newCount === 0 ? -1 : state.rear,
        count: newCount,
        isError: false,
        log: [
            ...state.log,
            { text: `🗑️ Dequeue() → keluar: ${removed}. FRONT: ${state.front} → ${newFront} (slot kini bebas, bisa dipakai lagi!)`, type: "normal" },
        ],
    };
}

function QueueSlot({ val, index, front, rear, isEmpty, isCircular }: {
    val: number | null;
    index: number;
    front: number;
    rear: number;
    isEmpty: boolean;
    isCircular: boolean;
}) {
    const isFront = front === index;
    const isRear = rear === index;
    const isActive = val !== null;

    let bgColor = "bg-slate-800 border-slate-700";
    let textColor = "text-slate-500";
    if (isActive) {
        bgColor = isCircular
            ? "bg-cyan-500/20 border-cyan-500/50"
            : "bg-primary/20 border-primary/50";
        textColor = isCircular ? "text-cyan-300" : "text-primary";
    }
    if (isEmpty) {
        bgColor = "bg-rose-500/10 border-rose-500/30";
        textColor = "text-rose-400";
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1 text-[9px] font-black uppercase justify-center h-3">
                {isFront && <span className="text-emerald-400">F</span>}
                {isRear && <span className="text-amber-400">R</span>}
            </div>
            <motion.div
                layout
                animate={{
                    scale: isActive ? 1.05 : 1,
                    borderColor: isEmpty ? "rgba(239,68,68,0.5)" : undefined,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 flex items-center justify-center font-black text-sm transition-colors ${bgColor} ${textColor}`}
            >
                <AnimatePresence mode="wait">
                    {val !== null ? (
                        <motion.span
                            key={val}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="text-xs md:text-sm"
                        >
                            {val}
                        </motion.span>
                    ) : (
                        <motion.span
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`text-[8px] font-black uppercase ${isEmpty ? "text-rose-400" : "text-slate-600"}`}
                        >
                            {isEmpty ? "kosong" : "null"}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
            <div className="text-[9px] text-slate-500 font-mono">[{index}]</div>
        </div>
    );
}

export default function CircularQueueVisualizer() {
    const [linear, setLinear] = useState<QueueState>(makeLinear());
    const [circular, setCircular] = useState<QueueState>(makeCircular());
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const logRefLinear = useRef<HTMLDivElement>(null);
    const logRefCircular = useRef<HTMLDivElement>(null);

    const applyStep = (idx: number) => {
        const step = DEMO_STEPS[idx];
        if (step.op === "enqueue") {
            setLinear(prev => linearEnqueue(prev, step.val!));
            setCircular(prev => circularEnqueue(prev, step.val!));
        } else {
            setLinear(prev => linearDequeue(prev));
            setCircular(prev => circularDequeue(prev));
        }
    };

    useEffect(() => {
        if (logRefLinear.current) logRefLinear.current.scrollTop = logRefLinear.current.scrollHeight;
        if (logRefCircular.current) logRefCircular.current.scrollTop = logRefCircular.current.scrollHeight;
    }, [linear.log, circular.log]);

    useEffect(() => {
        if (!isPlaying) return;
        if (stepIndex >= DEMO_STEPS.length) { setIsPlaying(false); return; }
        const t = setTimeout(() => {
            applyStep(stepIndex);
            setStepIndex(i => i + 1);
        }, 1200);
        return () => clearTimeout(t);
    }, [isPlaying, stepIndex]);

    const handleNext = () => {
        if (stepIndex >= DEMO_STEPS.length) return;
        applyStep(stepIndex);
        setStepIndex(i => i + 1);
    };

    const handleReset = () => {
        setLinear(makeLinear());
        setCircular(makeCircular());
        setStepIndex(0);
        setIsPlaying(false);
    };

    const currentStep = DEMO_STEPS[stepIndex];
    const progress = (stepIndex / DEMO_STEPS.length) * 100;

    return (
        <div className="w-full space-y-6">
            {/* Header & Controls */}
            <div className="bg-slate-900 rounded-2xl p-5 border-2 border-primary/20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                    <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Step {stepIndex}/{DEMO_STEPS.length}</p>
                        <p className="text-base font-black text-white">
                            {stepIndex < DEMO_STEPS.length
                                ? DEMO_STEPS[stepIndex].desc
                                : "✅ Simulasi Selesai"}
                        </p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={handleReset}
                            className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">refresh</span> Reset
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={stepIndex >= DEMO_STEPS.length || isPlaying}
                            className="bg-primary/80 hover:bg-primary text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-sm">skip_next</span> Next Step
                        </button>
                        <button
                            onClick={() => { if (stepIndex >= DEMO_STEPS.length) handleReset(); setIsPlaying(p => !p); }}
                            className={`${isPlaying ? "bg-rose-500 hover:bg-rose-400" : "bg-emerald-500 hover:bg-emerald-400"} text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-2 transition-all`}
                        >
                            <span className="material-symbols-outlined text-sm">{isPlaying ? "pause" : "play_arrow"}</span>
                            {isPlaying ? "Pause" : stepIndex >= DEMO_STEPS.length ? "Replay" : "Auto Play"}
                        </button>
                    </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.4 }}
                        className="h-full bg-primary rounded-full"
                    />
                </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid md:grid-cols-2 gap-4">
                {/* Linear Queue Panel */}
                <div className={`bg-slate-900 rounded-2xl border-2 p-5 transition-all ${linear.isError ? "border-rose-500/60 shadow-rose-500/20 shadow-lg" : "border-slate-700"}`}>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-black text-white uppercase text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-rose-400 text-lg">linear_scale</span>
                            Linear Queue
                        </h4>
                        <AnimatePresence>
                            {linear.isError && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="bg-rose-500 text-white text-[9px] font-black uppercase px-2 py-1 rounded-lg tracking-widest"
                                >
                                    FALSE OVERFLOW ❌
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Array slots */}
                    <div className="flex gap-2 justify-center mb-4">
                        {linear.queue.map((val, i) => (
                            <QueueSlot
                                key={i}
                                val={val}
                                index={i}
                                front={linear.front}
                                rear={linear.rear}
                                isEmpty={val === null && i < linear.front && linear.front > 0}
                                isCircular={false}
                            />
                        ))}
                    </div>
                    <div className="flex gap-4 text-[10px] font-mono text-center mb-3">
                        <div className="flex-1 bg-slate-800 rounded-lg p-2">
                            <p className="text-emerald-400 font-black">FRONT</p>
                            <p className="text-white font-black text-base">{linear.front}</p>
                        </div>
                        <div className="flex-1 bg-slate-800 rounded-lg p-2">
                            <p className="text-amber-400 font-black">REAR</p>
                            <p className="text-white font-black text-base">{linear.rear}</p>
                        </div>
                        <div className="flex-1 bg-slate-800 rounded-lg p-2">
                            <p className="text-slate-400 font-black">COUNT</p>
                            <p className="text-white font-black text-base">{linear.count}</p>
                        </div>
                    </div>
                    {/* Log */}
                    <div ref={logRefLinear} className="h-28 overflow-y-auto space-y-1 pr-1">
                        {linear.log.slice(-10).map((entry, i) => (
                            <p key={i} className={`text-[10px] font-mono leading-relaxed ${entry.type === "error" ? "text-rose-400" : entry.type === "success" ? "text-emerald-400" : entry.type === "info" ? "text-cyan-400" : "text-slate-400"}`}>
                                {entry.text}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Circular Queue Panel */}
                <div className={`bg-slate-900 rounded-2xl border-2 p-5 transition-all ${circular.isError ? "border-rose-500/60" : "border-cyan-500/40 shadow-cyan-500/10 shadow-lg"}`}>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-black text-white uppercase text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-cyan-400 text-lg">cycle</span>
                            Circular Queue (Modulo)
                        </h4>
                        <AnimatePresence>
                            {!circular.isError && circular.rear < (circular.rear > -1 ? circular.rear : 0) && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="bg-cyan-500 text-white text-[9px] font-black uppercase px-2 py-1 rounded-lg tracking-widest"
                                >
                                    WRAP AROUND ✅
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Circular visual: slots in circle-like layout */}
                    <div className="flex gap-2 justify-center mb-4">
                        {circular.queue.map((val, i) => (
                            <QueueSlot
                                key={i}
                                val={val}
                                index={i}
                                front={circular.front}
                                rear={circular.rear}
                                isEmpty={false}
                                isCircular={true}
                            />
                        ))}
                    </div>
                    {/* Modulo formula highlight */}
                    <div className="flex gap-2 text-[10px] font-mono text-center mb-3">
                        <div className="flex-1 bg-emerald-500/10 rounded-lg p-2 border border-emerald-500/20">
                            <p className="text-emerald-400 font-black">FRONT</p>
                            <p className="text-white font-black text-base">{circular.front}</p>
                        </div>
                        <div className="flex-1 bg-amber-500/10 rounded-lg p-2 border border-amber-500/20">
                            <p className="text-amber-400 font-black">REAR</p>
                            <p className="text-white font-black text-base">{circular.rear}</p>
                        </div>
                        <div className="flex-1 bg-cyan-500/10 rounded-lg p-2 border border-cyan-500/20">
                            <p className="text-cyan-400 font-black">NEXT REAR</p>
                            <p className="text-cyan-300 font-black text-base">
                                ({circular.rear === -1 ? 0 : (circular.rear + 1) % SIZE})
                            </p>
                        </div>
                    </div>
                    {/* Log */}
                    <div ref={logRefCircular} className="h-28 overflow-y-auto space-y-1 pr-1">
                        {circular.log.slice(-10).map((entry, i) => (
                            <p key={i} className={`text-[10px] font-mono leading-relaxed ${entry.type === "error" ? "text-rose-400" : entry.type === "success" ? "text-emerald-400" : entry.type === "info" ? "text-cyan-400" : "text-slate-400"}`}>
                                {entry.text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom legend */}
            <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4 flex flex-wrap gap-4 text-[10px] font-bold text-slate-400 justify-center">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-400 inline-block"></span> F = FRONT pointer</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400 inline-block"></span> R = REAR pointer</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-500/40 border border-rose-500/50 inline-block"></span> Slot Kosong (Terbuang di Linear)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-500/40 inline-block"></span> Slot Aktif (Circular)</span>
            </div>
        </div>
    );
}
