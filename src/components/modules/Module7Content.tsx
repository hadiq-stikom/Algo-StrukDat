"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import { motion } from "framer-motion";
import RecursionVisualizer from "./RecursionVisualizer";
import HanoiVisualizer from "./HanoiVisualizer";
import PresentationMode from "@/components/PresentationMode";
import IterationVsRecursionVisualizer from "./IterationVsRecursionVisualizer";

export default function Module7Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const slides = [
        // Slide 1: Concept
        <div key="s1" className="space-y-6">
            <div className="text-center">
                <div className="bg-violet-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border-4 border-violet-500/20 shadow-xl text-violet-600">
                    <span className="material-symbols-outlined text-4xl">refresh</span>
                </div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Rekursi (Recursion)</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium italic mt-2">
                    Fungsi yang <strong className="text-violet-600 underline decoration-violet-500/30">memanggil dirinya sendiri</strong>.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Analogy + Use Cases */}
                <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-5 shadow-lg flex flex-col gap-4">
                    <p className="text-sm font-black text-violet-700 dark:text-violet-400 uppercase">Analogi: Boneka Matryoshka 🪆</p>
                    <div className="flex items-end gap-2 justify-center py-2">
                        {[36, 28, 22, 16].map((h, i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                                style={{ height: h, width: h * 0.8 }}
                                className="bg-violet-400 rounded-t-full border-4 border-violet-600 shadow-xl"
                            />
                        ))}
                    </div>
                    <p className="text-[11px] text-slate-500 text-center italic">
                        Untuk mencapai boneka terkecil, buka boneka yang lebih besar satu per satu.
                    </p>
                </div>

                {/* Code Block */}
                <div className="bg-slate-900 rounded-2xl overflow-hidden border-2 border-violet-500/20 shadow-lg">
                    <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-white/10">
                        <span className="text-slate-400 font-mono text-[10px] font-bold">factorial.py</span>
                        <span className="text-violet-400 font-black text-[9px] uppercase tracking-widest">Kode Dasar</span>
                    </div>
                    <pre className="p-4 text-sm font-mono leading-relaxed">
                        <code>
                            <span className="text-purple-400">def</span>{" "}<span className="text-blue-400">factorial</span>(<span className="text-orange-300">n</span>):{"\n"}
                            {"    "}<span className="text-slate-400"># ① Base Case</span>{"\n"}
                            {"    "}<span className="text-purple-400">if</span> <span className="text-orange-300">n</span> {"<="} <span className="text-amber-300">1</span>:{"\n"}
                            {"        "}<span className="text-purple-400">return</span> <span className="bg-rose-500/20 text-rose-300 px-1 rounded">1</span>{"\n"}{"\n"}
                            {"    "}<span className="text-slate-400"># ② Recursive Case</span>{"\n"}
                            {"    "}<span className="text-purple-400">return</span> <span className="text-orange-300">n</span> * <span className="bg-violet-500/20 text-violet-300 px-1 rounded">factorial</span>(<span className="text-orange-300">n</span> - <span className="text-amber-300">1</span>)
                        </code>
                    </pre>
                    <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                        <div className="bg-rose-500/10 border border-rose-500/20 p-2 rounded-lg">
                            <p className="text-[10px] font-black text-rose-400 mb-0.5">① Base Case</p>
                            <p className="text-[9px] text-slate-400">Titik berhenti rekursi.</p>
                        </div>
                        <div className="bg-violet-500/10 border border-violet-500/20 p-2 rounded-lg">
                            <p className="text-[10px] font-black text-violet-400 mb-0.5">② Recursive Case</p>
                            <p className="text-[9px] text-slate-400">Memanggil diri, makin kecil.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 2: Two Rules
        <div key="s2" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-10 uppercase italic">Syarat Wajib Rekursi</h3>
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-white dark:bg-surface border-4 border-rose-500/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
                    <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center font-black text-3xl mb-6 shadow-xl italic">1</div>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tighter italic">Base Case</h4>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-bold italic leading-relaxed">
                        Kondisi <span className="text-rose-500 underline">berhenti</span>. Tanpa ini, pencarian/proses tidak akan pernah usai.
                    </p>
                </div>
                <div className="bg-white dark:bg-surface border-4 border-blue-500/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-black text-3xl mb-6 shadow-xl italic">2</div>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tighter italic">Recursive Case</h4>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-bold italic leading-relaxed">
                        Langkah memanggil diri sendiri dengan <span className="text-blue-500 underline">input lebih kecil</span>.
                    </p>
                </div>
            </div>
        </div>,

        // Slide 3: Code Structure
        <div key="s3" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic tracking-widest">Blueprint Rekursi</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-violet-500/20 shadow-2xl max-w-4xl mx-auto">
                <div className="bg-slate-800 px-6 py-3 flex justify-between border-b-2 border-white/10">
                    <span className="text-lg text-slate-300 font-mono font-bold italic">recursive_pattern.py</span>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                </div>
                <pre className="p-10 text-2xl font-mono leading-relaxed">
                    <code>
                        <span className="text-purple-400">def</span> <span className="text-blue-400">factorial</span>(<span className="text-orange-300">n</span>):{"\n"}
                        {"    "}<span className="text-slate-400 italic"># 1. Base Case</span>{"\n"}
                        {"    "}<span className="text-purple-400">if</span> <span className="text-orange-300">n</span> {"<="} <span className="text-amber-300">1</span>:{"\n"}
                        {"        "}<span className="text-purple-400">return</span> <span className="text-amber-300">1</span>{"\n"}{"\n"}
                        {"    "}<span className="text-slate-400 italic"># 2. Recursive Case</span>{"\n"}
                        {"    "}<span className="text-purple-400">return</span> <span className="text-orange-300">n</span> * <span className="text-violet-400">factorial</span>(<span className="text-orange-300">n</span> - <span className="text-amber-300">1</span>)
                    </code>
                </pre>
            </div>
        </div>,

        // Slide 4: Visualizer
        <div key="s4" className="space-y-8 h-full flex flex-col items-center justify-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-8 uppercase italic text-center">Tracing Factorial (4!)</h3>
            <div className="w-full max-w-5xl bg-white dark:bg-slate-950 p-10 rounded-3xl border-4 border-violet-500/30 shadow-[0_35px_60px_-15px_rgba(139,92,246,0.3)]">
                <RecursionVisualizer />
            </div>
        </div>,

        // Slide 5: Stack Overflow
        // Slide 5: Stack Overflow
        <div key="s5" className="space-y-8 h-full flex flex-col justify-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-8 uppercase italic text-center text-rose-500">Bahaya Rekursi</h3>
            <div className="bg-rose-950 p-12 rounded-3xl border-4 border-rose-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)] relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 blur-[120px] -mr-32 -mt-32 pointer-events-none"></div>
                <div className="flex-1 space-y-6 z-10">
                    <h4 className="text-5xl font-black text-white mb-2 flex items-center gap-4 italic tracking-tighter">
                        <span className="material-symbols-outlined text-rose-500 text-6xl">warning</span>
                        Stack Overflow! 🌋
                    </h4>
                    <p className="text-rose-100/80 text-2xl leading-relaxed font-bold italic">
                        Memori Call Stack memiliki batas. Jika fungsi merekursi terlalu dalam atau <span className="underline decoration-rose-500 decoration-4">kehilangan Base Case</span>, aplikasi akan CRASH.
                    </p>
                    <div className="bg-black/50 p-6 rounded-2xl border-2 border-rose-500/30 font-mono text-xl text-rose-400 font-bold shadow-inner">
                        RecursionError: maximum recursion depth exceeded
                    </div>
                </div>

                {/* Stack Limit Visualization */}
                <div className="w-full md:w-1/3 p-6 bg-rose-900/30 rounded-3xl border-4 border-dashed border-rose-500/40 relative z-10 flex flex-col gap-2 items-center justify-center">
                    <p className="text-sm font-black text-rose-400 uppercase tracking-widest">Stack Limit (Browser API / OS)</p>
                    <div className="w-full h-48 bg-black/60 rounded-xl border-4 border-rose-900 flex flex-col-reverse p-2 gap-2 overflow-hidden relative shadow-inner">
                        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-rose-500/30 to-transparent"></div>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className={`h-full w-full rounded-md ${i > 5 ? 'bg-rose-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-rose-800'}`}></div>
                        ))}
                    </div>
                    <p className="text-[12px] font-black text-rose-400 uppercase tracking-[0.3em] mt-2 animate-bounce">Tumpukan Membludak!</p>
                </div>
            </div>
        </div>,

        // Slide 6: Tail vs Tree
        <div key="s6" className="space-y-8">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-10 uppercase italic">Tail vs Tree Recursion</h3>
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-white dark:bg-surface border-4 border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
                    <h4 className="text-2xl font-black text-emerald-600 mb-4 uppercase italic">Tail Recursion</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-bold italic mb-6">Panggilan terakhir adalah fungsi itu sendiri. Sangat hemat memori (O(1) stack frame).</p>
                    <div className="bg-emerald-500/10 p-4 rounded-xl border-2 border-emerald-500/20">
                        <p className="font-mono text-sm text-emerald-700">return tail_func(n-1, acc)</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface border-4 border-amber-500/20 rounded-3xl p-8 shadow-2xl">
                    <h4 className="text-2xl font-black text-amber-600 mb-4 uppercase italic">Tree Recursion</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-bold italic mb-6">Memanggil diri sendiri &gt; 1 kali. Menciptakan percabangan (eksponensial O(2ⁿ)).</p>
                    <div className="bg-amber-500/10 p-4 rounded-xl border-2 border-amber-500/20">
                        <p className="font-mono text-sm text-amber-700">return fib(n-1) + fib(n-2)</p>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 7: Tower of Hanoi
        <div key="s7" className="space-y-8 h-full flex flex-col items-center justify-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-8 uppercase italic text-center">Studi Kasus: Tower of Hanoi</h3>
            <div className="w-full max-w-5xl bg-slate-900 p-10 rounded-3xl border-4 border-primary/30 shadow-2xl">
                <HanoiVisualizer />
                <div className="mt-8 text-center text-slate-400 font-bold italic text-lg">
                    "Selesaikan sub-masalah n-1, pindahkan n, selesaikan kembali n-1."
                </div>
            </div>
        </div>,

        // Slide 8: Interactive Comparison Visualizer
        <div key="s8" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase italic text-center">Iterasi vs Rekursi</h3>
            <p className="text-xl text-slate-500 font-bold mb-8 text-center max-w-4xl italic">
                Setiap masalah rekursif <strong className="text-primary">PASTI BISA</strong> diselesaikan dengan perulangan, dan sebaliknya.<br />
                Perbedaan utama ada di <strong>Cara Berpikir</strong> dan <strong>Manajemen Memori</strong>.
            </p>
            <div className="w-full xl:max-w-6xl">
                <IterationVsRecursionVisualizer />
            </div>
        </div>,

        // Slide 9: Panduan Konversi
        <div key="s9" className="space-y-12 flex flex-col justify-center h-full">
            <h3 className="text-5xl font-black text-center text-slate-900 dark:text-white uppercase italic flex items-center justify-center gap-4">
                <span className="material-symbols-outlined text-primary text-6xl">swap_horiz</span>
                Panduan Konversi
            </h3>
            <div className="grid grid-cols-2 gap-12 px-8">
                <div className="bg-emerald-500/10 border-4 border-emerald-500/30 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-20"><span className="material-symbols-outlined text-8xl text-emerald-500">arrow_forward</span></div>
                    <h4 className="text-3xl font-black text-emerald-500 mb-8 uppercase italic relative z-10">Looping ➔ Rekursi</h4>
                    <ul className="space-y-8 text-xl text-slate-700 dark:text-slate-300 font-bold relative z-10">
                        <li className="flex gap-4 items-start"><span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">1</span> Jadikan <span className="text-emerald-500 px-2 bg-white/5 rounded mx-1">Variabel Loop (i)</span> sebagai PARAMETER fungsi.</li>
                        <li className="flex gap-4 items-start"><span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span> Jadikan <span className="text-emerald-500 px-2 bg-white/5 rounded mx-1">Kondisi Berhenti Loop</span> sebagai BASE CASE.</li>
                        <li className="flex gap-4 items-start"><span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span> Jadikan <span className="text-emerald-500 px-2 bg-white/5 rounded mx-1">Langkah Update (i++)</span> sbg argumen saat memanggil diri sendiri.</li>
                    </ul>
                </div>
                <div className="bg-violet-500/10 border-4 border-violet-500/30 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-20"><span className="material-symbols-outlined text-8xl text-violet-500">arrow_back</span></div>
                    <h4 className="text-3xl font-black text-violet-500 mb-8 uppercase italic relative z-10">Rekursi ➔ Looping</h4>
                    <ul className="space-y-8 text-xl text-slate-700 dark:text-slate-300 font-bold relative z-10">
                        <li className="flex gap-4 items-start"><span className="text-violet-500 text-3xl">✦</span> <strong>Tail Recursion:</strong> Ubah langsung pakai <code className="bg-white/10 px-2 rounded font-mono text-violet-400">while(true)</code> dan update variabel. Simple!</li>
                        <li className="flex gap-4 items-start"><span className="text-violet-500 text-3xl">✦</span> <strong>Tree Recursion:</strong> WAJIB simulasi Call Stack! Buat array <code className="bg-white/10 px-2 rounded font-mono text-violet-400">[]</code> dan gunakan <code className="bg-white/10 px-2 py-1 rounded font-mono text-violet-400 text-sm">push() / pop()</code> untuk menyimpan state yang tertunda.</li>
                    </ul>
                </div>
            </div>
        </div>,

        // Slide 10: Aturan Penentuan (Kapan Pakai Mana?)
        <div key="s10" className="space-y-12 flex flex-col justify-center h-full">
            <h3 className="text-5xl font-black text-center text-slate-900 dark:text-white uppercase italic">Kapan Pakai Mana?</h3>
            <div className="grid grid-cols-2 gap-10 px-8">
                {/* LOOPING RULES */}
                <div className="bg-slate-900 border-4 border-emerald-500/30 rounded-3xl p-10 shadow-2xl relative z-0 overflow-hidden group hover:border-emerald-500 transition-colors">
                    <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity"><span className="material-symbols-outlined text-[250px] text-emerald-500">speed</span></div>
                    <div className="bg-emerald-500 text-white text-xl font-black uppercase tracking-widest px-6 py-2 rounded-full inline-block mb-8 relative z-10 shadow-lg shadow-emerald-500/30">PILIH LOOPING JIKA</div>
                    <ul className="space-y-6 text-2xl font-bold text-slate-300 relative z-10">
                        <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-emerald-400 text-3xl shrink-0 mt-1">bolt</span> Performa & Kecepatan adalah nomor 1 (Game Engine, Real-time).</li>
                        <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-emerald-400 text-3xl shrink-0 mt-1">memory</span> Memori sangat terbatas (IoT, Embedded System) -&gt; O(1) Space.</li>
                        <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-emerald-400 text-3xl shrink-0 mt-1">linear_scale</span> Mengolah data linier/flat sederhana (Array 1D biasa).</li>
                    </ul>
                </div>

                {/* RECURSION RULES */}
                <div className="bg-slate-900 border-4 border-violet-500/30 rounded-3xl p-10 shadow-2xl relative z-0 overflow-hidden group hover:border-violet-500 transition-colors">
                    <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity"><span className="material-symbols-outlined text-[250px] text-violet-500">account_tree</span></div>
                    <div className="bg-violet-500 text-white text-xl font-black uppercase tracking-widest px-6 py-2 rounded-full inline-block mb-8 relative z-10 shadow-lg shadow-violet-500/30">PILIH REKURSI JIKA</div>
                    <ul className="space-y-6 text-2xl font-bold text-slate-300 relative z-10">
                        <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-violet-400 text-3xl shrink-0 mt-1">park</span> Data terstruktur spt Pohon / Hirarki (Tree, Graph, File System).</li>
                        <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-violet-400 text-3xl shrink-0 mt-1">call_split</span> Menggunakan Divide & Conquer (Merge/Quick Sort, DFS Traversal).</li>
                        <li className="flex gap-4 items-start"><span className="material-symbols-outlined text-violet-400 text-3xl shrink-0 mt-1">auto_awesome</span> Keterbacaan, keindahan, & keamanan logika &gt; sedikit overhead memory.</li>
                    </ul>
                </div>
            </div>
        </div>,

        // Slide 9: Summary
        <div key="s9" className="space-y-8 h-full flex flex-col justify-center text-center">
            <div className="bg-linear-to-br from-violet-500/20 to-primary/20 p-12 rounded-3xl border-4 border-violet-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]"></div>
                <h4 className="text-5xl font-black text-slate-900 dark:text-white mb-10 uppercase italic tracking-tighter decoration-violet-500 decoration-8 underline-offset-8">Ringkasan Materi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {[
                        { label: "Base Case", desc: "Kunci pintu keluar." },
                        { label: "Recursive Case", desc: "Langkah mengecil." },
                        { label: "Call Stack", desc: "Tumpukan memori sistem." },
                        { label: "Tree Recursion", desc: "Pola Fibonacci/Hanoi." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-5 p-6 bg-white/60 dark:bg-white/10 rounded-2xl border-2 border-violet-500/20 hover:scale-105 transition-transform group">
                            <span className="material-symbols-outlined text-4xl text-violet-500 font-black group-hover:rotate-180 transition-transform duration-500">sync</span>
                            <div>
                                <p className="font-black text-xl text-slate-900 dark:text-white">{item.label}</p>
                                <p className="text-slate-600 dark:text-slate-400 font-bold italic">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-12 text-2xl font-black text-violet-500 uppercase tracking-[0.3em] font-mono">Module 7 Complete</p>
            </div>
        </div>
    ];
    return (
        <div className="space-y-16 pb-12">

            {/* ─── BAGIAN 1: KONSEP REKURSI ─── */}
            <div className="space-y-10">
                <div className="flex justify-between items-center bg-primary/5 p-6 rounded-2xl border-2 border-primary/20 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Mode Presentasi</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium italic">Gunakan untuk mengajar atau belajar secara fokus.</p>
                    </div>
                    <button
                        onClick={() => openPresentation(0)}
                        className="bg-primary hover:bg-primary/90 text-white font-black px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-3 active:scale-95 group"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">present_to_all</span>
                        MULAI MODE PRESENTASI
                    </button>
                </div>

                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Konsep Rekursi</span>
                            <button
                                onClick={() => openPresentation(0)}
                                className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-xs">play_arrow</span>
                                SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-violet-500/30 p-2 rounded-lg text-violet-600">
                                    <span className="material-symbols-outlined text-xl">refresh</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Fungsi yang Memanggil Dirinya Sendiri</h3>
                            </div>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    <strong className="text-slate-900 dark:text-white">Rekursi</strong> (Recursion) adalah teknik dalam pemrograman di mana sebuah fungsi memanggil dirinya sendiri untuk menyelesaikan masalah yang lebih kecil dari masalah aslinya.
                                </p>

                                {/* Analogy Grid */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="p-5 bg-violet-500/10 border-2 border-violet-500/30 rounded-xl flex flex-col items-center justify-center">
                                        <p className="text-sm font-black text-violet-700 dark:text-violet-400 uppercase mb-4 text-center">Analogi: Boneka Matryoshka 🪆</p>
                                        <div className="flex items-end gap-1 mb-4">
                                            {[32, 28, 24, 20].map((size, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                                                    style={{ height: size, width: size * 0.8 }}
                                                    className="bg-violet-400 rounded-t-full border-2 border-violet-600 opacity-80"
                                                ></motion.div>
                                            ))}
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500 text-center italic">
                                            Untuk mencapai boneka terkecil, kita harus membuka boneka yang lebih besar satu per satu.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl">
                                        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase mb-3 text-center">Rekursi dalam Kehidupan Nyata:</p>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3">
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">visibility</span>
                                                <div className="text-xs">
                                                    <p className="font-black text-slate-900 dark:text-white uppercase leading-none mb-1">Cermin Berhadapan</p>
                                                    <p className="text-slate-500">Bayangan di dalam bayangan yang tak terhingga.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">folder_open</span>
                                                <div className="text-xs">
                                                    <p className="font-black text-slate-900 dark:text-white uppercase leading-none mb-1">Struktur Folder</p>
                                                    <p className="text-slate-500">Folder di dalam folder (Tree structure).</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">architecture</span>
                                                <div className="text-xs">
                                                    <p className="font-black text-slate-900 dark:text-white uppercase leading-none mb-1">Fraktal</p>
                                                    <p className="text-slate-500">Pola geometris yang berulang pada skala berbeda.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Basic Code Example */}
                                <div className="mt-6 border-t-2 border-dashed border-primary/10 pt-6">
                                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-violet-500">code</span>
                                        Kode Dasar Rekursi — Contoh: Faktorial (n!)
                                    </p>
                                    <div className="bg-slate-900 rounded-2xl overflow-hidden border-2 border-violet-500/20 shadow-lg">
                                        <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-white/10">
                                            <span className="text-slate-400 font-mono text-[10px] font-bold">factorial.py</span>
                                            <span className="text-violet-400 font-black text-[9px] uppercase tracking-widest">Python</span>
                                        </div>
                                        <pre className="p-4 text-sm font-mono overflow-auto leading-relaxed">
                                            <code>
                                                <span className="text-purple-400">def</span>{" "}<span className="text-blue-400">factorial</span>(<span className="text-orange-300">n</span>):{"\n"}
                                                {"    "}<span className="text-slate-400"># ① Base Case — titik berhenti</span>{"\n"}
                                                {"    "}<span className="text-purple-400">if</span> <span className="text-orange-300">n</span> {"<="} <span className="text-amber-300">1</span>:{"\n"}
                                                {"        "}<span className="text-purple-400">return</span> <span className="bg-rose-500/20 text-rose-300 px-1 rounded">1</span>{"\n"}{"\n"}
                                                {"    "}<span className="text-slate-400"># ② Recursive Case — memanggil diri sendiri</span>{"\n"}
                                                {"    "}<span className="text-purple-400">return</span> <span className="text-orange-300">n</span> * <span className="bg-violet-500/20 text-violet-300 px-1 rounded">factorial</span>(<span className="text-orange-300">n</span> - <span className="text-amber-300">1</span>)
                                            </code>
                                        </pre>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        <div className="flex items-start gap-2 bg-rose-500/5 border border-rose-500/20 p-3 rounded-xl">
                                            <span className="text-rose-500 font-black text-sm shrink-0">①</span>
                                            <div>
                                                <p className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase mb-0.5">Base Case</p>
                                                <p className="text-[10px] text-slate-500">Ketika <code className="text-rose-400">n &lt;= 1</code>, kembalikan <code className="text-rose-400">1</code>. Rekursi berhenti di sini.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 bg-violet-500/5 border border-violet-500/20 p-3 rounded-xl">
                                            <span className="text-violet-500 font-black text-sm shrink-0">②</span>
                                            <div>
                                                <p className="text-[10px] font-black text-violet-600 dark:text-violet-400 uppercase mb-0.5">Recursive Case</p>
                                                <p className="text-[10px] text-slate-500"><code className="text-violet-400">factorial(n-1)</code> memanggil dirinya sendiri dengan nilai <em>lebih kecil</em>, menuju Base Case.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 2: KOMPONEN REKURSI ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Struktur Wajib</span>
                            <div className="flex gap-2">
                                <button onClick={() => openPresentation(1)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">info</span> 2 SYARAT
                                </button>
                                <button onClick={() => openPresentation(2)} className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-600 text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">code</span> CODE
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm p-8">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 text-center uppercase tracking-tighter italic">2 Syarat Rekursi yang Aman</h3>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-rose-500/20 text-rose-600 rounded-2xl flex items-center justify-center font-black italic shadow-inner">1</div>
                                        <div>
                                            <h4 className="font-black text-slate-900 dark:text-white uppercase">Base Case</h4>
                                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Kondisi Berhenti</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-16">
                                        Titik di mana rekursi harus berhenti. Jika tidak ada Base Case, fungsi akan terus memanggil dirinya sendiri selamanya (Infinite Loop) dan menyebabkan <strong>Stack Overflow</strong>.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-500/20 text-blue-600 rounded-2xl flex items-center justify-center font-black italic shadow-inner">2</div>
                                        <div>
                                            <h4 className="font-black text-slate-900 dark:text-white uppercase">Recursive Case</h4>
                                            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Langkah Rekursif</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-16">
                                        Bagian di mana fungsi memanggil dirinya sendiri, tetapi dengan input yang lebih sederhana atau mendekati Base Case.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 p-6 bg-slate-900 rounded-2xl border-2 border-primary/10">
                                <p className="text-xs font-mono text-violet-400 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">code</span>
                                    Struktur Template Rekursi:
                                </p>
                                <pre className="text-xs font-mono">
                                    <code>
                                        <span className="text-purple-400">def</span> <span className="text-blue-400">fungsi_rekursif</span>(<span className="text-orange-300">input</span>):{"\n"}
                                        {"    "}<span className="text-purple-400">if</span> (<span className="text-cyan-400">kondisi_base_case</span>):  <span className="text-slate-400 italic"># Syarat 1: Berhenti</span>{"\n"}
                                        {"        "}<span className="text-purple-400">return</span> <span className="text-amber-300">hasil_dasar</span>{"\n"}{"\n"}
                                        {"    "}<span className="text-slate-400 italic"># Syarat 2: Memanggil diri dengan input lebih kecil</span>{"\n"}
                                        {"    "}<span className="text-purple-400">return</span> <span className="text-orange-300">process</span> <span className="text-rose-400">+</span> <span className="text-violet-400">fungsi_rekursif</span>(<span className="text-orange-300">input_baru</span>)
                                    </code>
                                </pre>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 3: CALL STACK VISUALIZER ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Tracing Factorial</span>
                            <button onClick={() => openPresentation(3)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <RecursionVisualizer />
                    <p className="mt-4 text-[10px] text-slate-500 text-center font-bold px-4 italic leading-relaxed">
                        Perhatikan bagaimana sistem "menumpuk" panggilan fungsi (Wind-up) ke dalam memori, lalu menyelesaikannya satu per satu dari atas ke bawah (Unwind) setelah mencapai Base Case.
                    </p>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 4: STACK OVERFLOW ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Bahaya Rekursi</span>
                            <button onClick={() => openPresentation(4)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">warning</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-rose-900 border-2 border-rose-500/30 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] -mr-32 -mt-32"></div>
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4">
                                    <h4 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-rose-500">warning</span>
                                        Stack Overflow! 🌋
                                    </h4>
                                    <p className="text-rose-100/70 text-sm leading-relaxed font-medium">
                                        Memori Call Stack memiliki kapasitas terbatas. Jika fungsi rekursif memanggil dirinya sendiri terlalu dalam (terlalu banyak tumpukan) atau tidak memiliki Base Case, aplikasi akan <strong>CRASH</strong> dengan error "Stack Overflow".
                                    </p>
                                    <div className="bg-black/30 p-4 rounded-xl border border-white/10 font-mono text-[10px] text-rose-400">
                                        RecursionError: maximum recursion depth exceeded
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 p-4 bg-white/5 rounded-2xl border-2 border-dashed border-rose-500/40 flex flex-col gap-1 items-center justify-center">
                                    <p className="text-[10px] font-black text-rose-500 uppercase">Limit</p>
                                    <div className="w-full h-32 bg-rose-950 rounded border-2 border-rose-800 flex flex-col-reverse p-1 gap-1 overflow-hidden">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                            <div key={i} className={`h-3 w-full rounded ${i > 5 ? 'bg-rose-500 animate-pulse' : 'bg-rose-900'}`}></div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-black text-rose-500 uppercase mt-1">Full Stack</p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 5: TAIL RECURSION & TREE RECURSION ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Level Lanjut (4 SKS)</span>
                            <button onClick={() => openPresentation(5)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">bolt</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Tail Recursion */}
                    <ScrollReveal>
                        <FocusSection>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-600">
                                        <span className="material-symbols-outlined text-xl">bolt</span>
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">Tail Recursion</h4>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    Optimasi di mana pemanggilan rekursif adalah <strong>tindakan terakhir</strong> dalam fungsi. Sistem tidak perlu menyimpan stack frame lama because tidak ada sisa perhitungan.
                                </p>
                                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Keunggulan: Hemat Memori</p>
                                    <p className="text-[10px] text-slate-500 italic">Mencegah Stack Overflow meskipun kedalaman rekursi sangat besar.</p>
                                </div>
                            </div>
                        </FocusSection>
                    </ScrollReveal>

                    {/* Tree Recursion */}
                    <ScrollReveal>
                        <FocusSection>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-amber-500/20 p-2 rounded-lg text-amber-600">
                                        <span className="material-symbols-outlined text-xl">account_tree</span>
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">Tree Recursion</h4>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    Fungsi memanggil dirinya sendiri <strong>lebih dari satu kali</strong>. Ini menciptakan struktur pohon (seperti deret Fibonacci).
                                </p>
                                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                    <p className="text-[10px] font-black text-amber-600 uppercase mb-1">Bahaya: Kompleksitas O(2^n)</p>
                                    <p className="text-[10px] text-slate-500 italic">Data bertambah sedikit, waktu eksekusi meledak secara eksponensial.</p>
                                </div>
                            </div>
                        </FocusSection>
                    </ScrollReveal>
                </div>
            </div>

            {/* ─── BAGIAN 6: TOWER OF HANOI ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Studi Kasus Tower of Hanoi</span>
                            <button onClick={() => openPresentation(6)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2">
                            <HanoiVisualizer />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-slate-900 border-2 border-primary/20 rounded-2xl p-6 shadow-xl">
                                <h5 className="text-sm font-black text-white uppercase italic mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">psychology</span>
                                    Logika Berpikir
                                </h5>
                                <div className="space-y-4 text-[11px] text-slate-400">
                                    <p>Masalah kompleks ini diselesaikan dengan memecahnya secara elegan:</p>
                                    <ol className="list-decimal pl-4 space-y-2 font-medium">
                                        <li>Pindahkan <code className="text-primary italic">n-1</code> cakram dari asal ke tiang pembantu.</li>
                                        <li>Pindahkan cakram terbesar (<code className="text-primary italic">n</code>) ke tujuan.</li>
                                        <li>Pindahkan kembali <code className="text-primary italic">n-1</code> cakram dari pembantu ke tujuan.</li>
                                    </ol>
                                    <div className="pt-4 border-t border-white/10 italic">
                                        "Recursion is not about the whole problem, it's about the next small step."
                                    </div>
                                </div>
                            </div>

                            <div className="bg-violet-500/10 border-2 border-violet-500/20 rounded-2xl p-6">
                                <h5 className="text-xs font-black text-violet-600 uppercase mb-3 leading-none">Penyelamat: Memoization</h5>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                    Untuk mencegah perhitungan berulang pada Tree Recursion, kita menggunakan <strong>Memoization</strong>: teknik menyimpan hasil perhitungan sebelumnya ke dalam tabel/cache.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 7: ITERASI VS REKURSI ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 7: Iterasi vs Rekursi</span>
                            <button onClick={() => openPresentation(7)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">leaderboard</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="space-y-12">
                        {/* 1. Animated Visualizer Comparison */}
                        <div>
                            <p className="text-slate-500 font-bold mb-6 text-center max-w-3xl mx-auto italic text-sm">
                                Setiap masalah rekursif <strong className="text-primary">PASTI BISA</strong> diselesaikan dengan perulangan (Looping/Iterasi), dan sebaliknya. Perbedaan utamanya ada di <strong>Cara Berpikir</strong> dan <strong>Manajemen Memori</strong>.
                            </p>
                            <IterationVsRecursionVisualizer />
                        </div>

                        {/* 2. Panduan Konversi */}
                        <div className="bg-slate-900 border-2 border-primary/20 rounded-3xl p-8 shadow-xl">
                            <h4 className="text-2xl font-black text-white uppercase italic mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-3xl">swap_horiz</span>
                                Panduan Konversi
                            </h4>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h5 className="font-black text-emerald-400 uppercase tracking-widest text-xs flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        Looping ➔ Rekursi
                                    </h5>
                                    <ul className="text-xs text-slate-400 space-y-3 font-medium">
                                        <li>1. Jadikan <strong className="text-emerald-300">Variabel Loop</strong> (misal <code className="text-white">i</code>) sebagai <strong>Parameter Fungsi</strong>.</li>
                                        <li>2. Jadikan <strong className="text-emerald-300">Kondisi Berhenti Loop</strong> (<code className="text-white">i &lt;= n</code>) sebagai <strong>Base Case</strong>.</li>
                                        <li>3. Jadikan <strong className="text-emerald-300">Langkah Update</strong> (<code className="text-white">i++</code>) sebagai argument saat <strong>Memanggil diri sendiri</strong>.</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h5 className="font-black text-violet-400 uppercase tracking-widest text-xs flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                                        Rekursi ➔ Looping
                                    </h5>
                                    <ul className="text-xs text-slate-400 space-y-3 font-medium">
                                        <li>Jika <strong>Tail Recursion</strong>: Ubah langsung pakai <code className="text-white">while(true)</code> dan update variabel lokal. Sangat mudah.</li>
                                        <li>Jika <strong>Tree Recursion</strong> (ada &gt;1 pemanggilan): Anda <strong>WAJIB</strong> menggunakan struktur data <strong className="text-violet-300">Stack</strong> secara manual (Array warna-warni) untuk menyimpan state yang tertunda.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 3. Aturan Penentuan */}
                        <div>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic mb-6 text-center">Aturan Penentuan (Kapan Pakai Mana?)</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
                                    <div className="absolute -right-4 -bottom-4 opacity-10">
                                        <span className="material-symbols-outlined text-[120px] text-emerald-500">speed</span>
                                    </div>
                                    <div className="bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block mb-4">PILIH LOOPING JIKA:</div>
                                    <ul className="space-y-3 relative z-10 text-sm font-bold text-slate-700 dark:text-slate-300">
                                        <li className="flex gap-2"><span className="text-emerald-500">✓</span> Performa dan Kecepatan Eksekusi sangat penting (misal: Game Loop, Real-time).</li>
                                        <li className="flex gap-2"><span className="text-emerald-500">✓</span> Memori adalah batas utama (Embedded System, IoT). O(1) space.</li>
                                        <li className="flex gap-2"><span className="text-emerald-500">✓</span> Datanya linier/sederhana (Array 1D, List biasa).</li>
                                    </ul>
                                </div>

                                <div className="bg-violet-500/10 border-2 border-violet-500/30 rounded-2xl p-6 relative overflow-hidden">
                                    <div className="absolute -right-4 -bottom-4 opacity-10">
                                        <span className="material-symbols-outlined text-[120px] text-violet-500">account_tree</span>
                                    </div>
                                    <div className="bg-violet-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block mb-4">PILIH REKURSI JIKA:</div>
                                    <ul className="space-y-3 relative z-10 text-sm font-bold text-slate-700 dark:text-slate-300">
                                        <li className="flex gap-2"><span className="text-violet-500">✓</span> Data Strukturnya membentuk Hirarki/Pohon (Tree, Graph, File System).</li>
                                        <li className="flex gap-2"><span className="text-violet-500">✓</span> Menggunakan paradigma <strong>Divide and Conquer</strong> (Merge Sort, Quick Sort).</li>
                                        <li className="flex gap-2"><span className="text-violet-500">✓</span> Keterbacaan & Kode yang Elegan & Singkat lebih penting daripada sedikit overhead performa.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 6: SELF CHECK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 8: Self-Check & Kuis</span>
                            <button onClick={() => openPresentation(8)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FocusSection>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm h-full">
                                <h5 className="text-lg font-black text-slate-900 dark:text-white mb-4 italic uppercase">Uji Pemahaman #1</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mb-6 leading-relaxed">
                                    Apa yang akan terjadi jika fungsi rekursif tidak memiliki <strong>Base Case</strong>?
                                </p>
                                <details className="group cursor-pointer">
                                    <summary className="list-none bg-primary text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl text-center shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        Lihat Jawaban
                                    </summary>
                                    <div className="mt-4 p-4 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-xl">
                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            Jawaban: <br />
                                            Fungsi tidak akan pernah berhenti memanggil dirinya sendiri, menyebabkan penggunaan memori call stack terus membengkak hingga mencapai batas maksimal, dan akhirnya memicu error <strong>Stack Overflow</strong>.
                                        </p>
                                    </div>
                                </details>
                            </div>
                        </FocusSection>

                        <FocusSection>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm h-full flex flex-col">
                                <h5 className="text-lg font-black text-slate-900 dark:text-white mb-4 italic uppercase">Uji Pemahaman #2</h5>
                                <div className="space-y-2 mb-6">
                                    <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">Berapa hasil dari <code className="bg-violet-500/10 px-2 rounded font-black text-violet-500">mystery(3)</code>?</p>
                                    <pre className="text-[10px] bg-slate-900 p-3 rounded-xl border border-white/5 font-mono">
                                        <code className="text-slate-300">
                                            {`def mystery(n):
    if n <= 1: return 1
    return n + mystery(n-1)`}
                                        </code>
                                    </pre>
                                </div>
                                <details className="group cursor-pointer mt-auto">
                                    <summary className="list-none bg-primary text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl text-center shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        Lihat Jawaban
                                    </summary>
                                    <div className="mt-4 p-4 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-xl">
                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            Jawaban: 6 <br />
                                            Tracing: <br />
                                            1. mystery(3) = 3 + mystery(2) <br />
                                            2. mystery(2) = 2 + mystery(1) <br />
                                            3. mystery(1) = 1 (Base Case) <br />
                                            Total: 3 + 2 + 1 = 6
                                        </p>
                                    </div>
                                </details>
                            </div>
                        </FocusSection>
                    </div>
                </ScrollReveal>
            </div>

            <PresentationMode
                isOpen={isPresentationOpen}
                onExit={() => setIsPresentationOpen(false)}
                slides={slides}
                initialSlide={startSlideIndex}
            />
        </div>
    );
}
