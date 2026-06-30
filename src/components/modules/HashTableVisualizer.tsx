"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const TABLE_SIZE = 10;
const INITIAL_TABLE: (number | null)[] = [null, null, 42, null, null, 15, null, 77, 88, null];
const INSERTABLE_KEYS = [25, 35, 92, 10, 5, 18, 65, 50];

function hash(key: number): number {
    return key % TABLE_SIZE;
}

interface Step {
    buckets: (number | null)[];
    hashIndex: number;
    probeIndex: number;
    collision: boolean;
    inserted: boolean;
    message: string;
}

function generateInsertSteps(key: number): Step[] {
    const steps: Step[] = [];
    const table: (number | null)[] = [...INITIAL_TABLE];
    const h = hash(key);

    steps.push({
        buckets: [...table],
        hashIndex: h,
        probeIndex: h,
        collision: false,
        inserted: false,
        message: `Mulai insert key = ${key}. Hitung hash: ${key} % ${TABLE_SIZE} = ${h}`,
    });

    let probe = h;
    const startProbe = h;
    let firstCheck = true;

    while (true) {
        if (firstCheck) {
            firstCheck = false;
        } else {
            probe = (probe + 1) % TABLE_SIZE;
        }

        if (table[probe] === null) {
            table[probe] = key;
            steps.push({
                buckets: [...table],
                hashIndex: h,
                probeIndex: probe,
                collision: probe !== h,
                inserted: true,
                message: probe !== h
                    ? `Bucket [${probe}] kosong setelah probing dari [${h}]. Insert ${key} di sini.`
                    : `Bucket [${probe}] kosong! Insert ${key} di bucket [${probe}].`,
            });
            break;
        }

        steps.push({
            buckets: [...table],
            hashIndex: h,
            probeIndex: probe,
            collision: true,
            inserted: false,
            message: `Bucket [${probe}] sudah terisi ${table[probe]} → COLLISION! Probe ke bucket berikutnya.`,
        });

        if ((probe + 1) % TABLE_SIZE === startProbe) {
            steps.push({
                buckets: [...table],
                hashIndex: h,
                probeIndex: probe,
                collision: false,
                inserted: false,
                message: `TABLE PENUH! Tidak bisa insert ${key}.`,
            });
            break;
        }
    }

    return steps;
}

function generateSearchSteps(key: number): Step[] {
    const steps: Step[] = [];
    const table: (number | null)[] = [...INITIAL_TABLE];
    const h = hash(key);

    steps.push({
        buckets: [...table],
        hashIndex: h,
        probeIndex: h,
        collision: false,
        inserted: false,
        message: `Cari key = ${key}. Hitung hash: ${key} % ${TABLE_SIZE} = ${h}`,
    });

    let probe = h;
    const startProbe = h;
    let firstCheck = true;

    while (true) {
        if (firstCheck) {
            firstCheck = false;
        } else {
            probe = (probe + 1) % TABLE_SIZE;
        }

        if (table[probe] === null) {
            steps.push({
                buckets: [...table],
                hashIndex: h,
                probeIndex: probe,
                collision: false,
                inserted: false,
                message: `Bucket [${probe}] kosong → ${key} TIDAK DITEMUKAN ✗`,
            });
            break;
        }

        if (table[probe] === key) {
            steps.push({
                buckets: [...table],
                hashIndex: h,
                probeIndex: probe,
                collision: false,
                inserted: false,
                message: `Bucket [${probe}] = ${table[probe]} == ${key} → DITEMUKAN! ✓`,
            });
            break;
        }

        steps.push({
            buckets: [...table],
            hashIndex: h,
            probeIndex: probe,
            collision: true,
            inserted: false,
            message: `Bucket [${probe}] = ${table[probe]} ≠ ${key} → lanjut probe.`,
        });

        if ((probe + 1) % TABLE_SIZE === startProbe) {
            steps.push({
                buckets: [...table],
                hashIndex: h,
                probeIndex: probe,
                collision: false,
                inserted: false,
                message: `Semua bucket diperiksa → ${key} TIDAK DITEMUKAN ✗`,
            });
            break;
        }
    }

    return steps;
}

export default function HashTableVisualizer() {
    const [mode, setMode] = useState<"insert" | "search">("insert");
    const [selectedKey, setSelectedKey] = useState(INSERTABLE_KEYS[0]);
    const steps = useMemo(
        () => (mode === "insert" ? generateInsertSteps(selectedKey) : generateSearchSteps(selectedKey)),
        [selectedKey, mode]
    );
    const [stepIndex, setStepIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1000);

    const current = stepIndex >= 0 ? steps[stepIndex] : null;
    const done = stepIndex >= steps.length - 1;

    const reset = () => {
        setStepIndex(-1);
        setIsPlaying(false);
    };

    const nextStep = () => {
        if (stepIndex < steps.length - 1) setStepIndex((s) => s + 1);
    };

    useEffect(() => {
        reset();
    }, [selectedKey, mode]);

    useEffect(() => {
        if (!isPlaying || done) return;
        const timer = setTimeout(nextStep, speed);
        return () => clearTimeout(timer);
    }, [isPlaying, stepIndex, speed, done]);

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex-1 min-h-[80px]">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-yellow-500 text-base">grid_view</span>
                        Interactive Hash Table
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                            {current?.message ?? `Pilih key lalu tekan Mulai untuk melihat proses hashing.`}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={done}
                        className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                            isPlaying
                                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                : "bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 disabled:opacity-50"
                        }`}
                    >
                        <span className="material-symbols-outlined text-sm">{isPlaying ? "pause" : "play_arrow"}</span>
                        {isPlaying ? "Jeda" : "Mulai"}
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={isPlaying || done}
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

            <div className="mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Mode:</label>
                    <button
                        onClick={() => { setMode("insert"); reset(); }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
                            mode === "insert"
                                ? "bg-yellow-500/10 border-yellow-500/40 text-yellow-600 dark:text-yellow-400"
                                : "border-slate-200 dark:border-slate-700 text-slate-400"
                        }`}
                    >
                        <span className="material-symbols-outlined text-xs align-middle mr-1">add_circle</span>
                        Insert
                    </button>
                    <button
                        onClick={() => { setMode("search"); reset(); }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
                            mode === "search"
                                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                                : "border-slate-200 dark:border-slate-700 text-slate-400"
                        }`}
                    >
                        <span className="material-symbols-outlined text-xs align-middle mr-1">search</span>
                        Search
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Key:</label>
                    <select
                        value={selectedKey}
                        onChange={(e) => setSelectedKey(Number(e.target.value))}
                        className="px-3 py-2 rounded-xl border-2 border-yellow-500/30 bg-yellow-500/5 text-sm font-black text-yellow-700 dark:text-yellow-300"
                    >
                        {INSERTABLE_KEYS.map((v) => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Hash Function:</span>
                    <span className="font-mono text-sm font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-lg border border-yellow-500/20">
                        {selectedKey} % {TABLE_SIZE} = {hash(selectedKey)}
                    </span>
                </div>
            </div>

            <div className="flex justify-center gap-2 mb-4 overflow-x-auto pb-2">
                {Array.from({ length: TABLE_SIZE }, (_, idx) => {
                    const val = current?.buckets[idx] ?? INITIAL_TABLE[idx];
                    const isProbing = current?.probeIndex === idx;
                    const isHashTarget = current?.hashIndex === idx && !isProbing;
                    const isFreshInsert = current?.inserted && isProbing;
                    const isEmpty = val === null;

                    return (
                        <motion.div
                            key={idx}
                            layout
                            className="flex flex-col items-center gap-1 shrink-0"
                        >
                            <span className="text-[9px] font-black text-slate-400 uppercase">[{idx}]</span>
                            <motion.div
                                className={`w-11 sm:w-14 h-14 rounded-xl border-2 flex items-center justify-center font-black text-sm shadow-sm transition-colors ${
                                    isFreshInsert
                                        ? "bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-500/30 scale-110"
                                        : isProbing && current?.collision
                                            ? "bg-red-500 border-red-600 text-white ring-4 ring-red-500/30"
                                            : isProbing
                                                ? "bg-amber-500 border-amber-600 text-white ring-4 ring-amber-500/30"
                                                : isHashTarget
                                                    ? "bg-yellow-400 border-yellow-500 text-yellow-900 ring-4 ring-yellow-400/30"
                                                    : isEmpty
                                                        ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600"
                                                        : "bg-slate-300 dark:bg-slate-600 border-slate-400 text-slate-700 dark:text-slate-200"
                                }`}
                                animate={{ scale: isProbing || isFreshInsert ? 1.12 : isHashTarget ? 1.06 : 1 }}
                            >
                                {isEmpty ? "\u2014" : val}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="text-center text-xs font-bold text-slate-400 mb-4">
                Langkah {Math.max(0, stepIndex + 1)} / {steps.length}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Kecepatan:</span>
                    <input
                        type="range"
                        min="300"
                        max="2500"
                        step="100"
                        value={2600 - speed}
                        onChange={(e) => setSpeed(2600 - parseInt(e.target.value))}
                        className="w-24 accent-primary"
                    />
                </div>
                <div className="flex justify-end gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-amber-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Probe</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-red-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Collision</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Inserted</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-slate-300"></div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Occupied</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
