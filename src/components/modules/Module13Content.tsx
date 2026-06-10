"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import PresentationMode from "@/components/PresentationMode";
import GraphVisualizer from "./GraphVisualizer";

export default function Module13Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const slides = [
        // Slide 1: Welcome & Concept
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-sky-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-sky-500/20 shadow-2xl text-sky-600">
                <span className="material-symbols-outlined text-5xl">hub</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Struktur Data Graph</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                Struktur data <strong className="text-sky-600 underline decoration-sky-500/30">relasional</strong> yang menghubungkan objek-objek.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center">
                    <p className="text-xl font-black text-sky-700 dark:text-sky-400 uppercase mb-6">Analogi Jaringan Sosial 👥</p>
                    <div className="relative w-full h-32 flex justify-center items-center gap-4">
                        <div className="w-12 h-12 bg-sky-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-black">A</div>
                        <div className="w-8 h-1 bg-slate-400"></div>
                        <div className="w-12 h-12 bg-sky-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-black">B</div>
                        <div className="w-8 h-1 bg-slate-400"></div>
                        <div className="w-12 h-12 bg-sky-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-black">C</div>
                    </div>
                    <p className="text-xs text-slate-500 italic mt-4">A berteman B, B berteman C (Hubungan antar orang)</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl border-4 border-sky-500/20 shadow-2xl text-left">
                    <p className="text-sky-400 font-black text-xl mb-6 uppercase tracking-widest text-center">Terminologi Utama:</p>
                    <ul className="space-y-4">
                        {[
                            { icon: "circle", title: "Node/Vertex", desc: "Objek atau entitas dalam graph." },
                            { icon: "arrow_forward", title: "Edge", desc: "Koneksi antar node." },
                            { icon: "group", title: "Graph", desc: "Kumpulan node dan edge." },
                            { icon: "route", title: "Path", desc: "Rute dari satu node ke node lain." },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4">
                                <span className="material-symbols-outlined text-sky-500 text-3xl">{item.icon}</span>
                                <div>
                                    <p className="font-black text-slate-100 uppercase text-lg">{item.title}</p>
                                    <p className="text-slate-400 font-bold italic">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>,

        // Slide 2: Types of Graphs
        <div key="s2" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-10 uppercase italic">Jenis-Jenis Graph</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-surface border-4 border-sky-500/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl"></div>
                    <h4 className="text-2xl font-black text-sky-600 uppercase mb-6 italic tracking-tight">Directed vs Undirected</h4>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <span className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center font-black shrink-0">1</span>
                            <div>
                                <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">Undirected Graph</p>
                                <p className="text-sm text-slate-500">Edge dua arah (jalan dua arah)</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center font-black shrink-0">2</span>
                            <div>
                                <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">Directed Graph (Digraph)</p>
                                <p className="text-sm text-slate-500">Edge satu arah (jalan satu arah)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-sky-500/20 shadow-lg">
                    <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-white/10">
                        <span className="text-slate-400 font-mono text-xs font-black italic">graph_types.py</span>
                    </div>
                    <pre className="p-6 text-lg font-mono leading-relaxed">
                        <code>
                            <span className="text-cyan-400"># Undirected</span>{"\n"}
                            <span className="text-orange-300">A</span> {"<--->"} <span className="text-orange-300">B</span>{"\n\n"}
                            <span className="text-cyan-400"># Directed</span>{"\n"}
                            <span className="text-orange-300">A</span> {"--->"} <span className="text-orange-300">B</span>{"\n"}
                            <span className="text-orange-300">B</span> {"-X->"} <span className="text-orange-300">A</span>
                        </code>
                    </pre>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white dark:bg-surface border-4 border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
                    <h4 className="text-2xl font-black text-emerald-600 uppercase mb-4 italic">Weighted vs Unweighted</h4>
                    <ul className="space-y-4">
                        <li className="flex gap-4 items-center">
                            <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black">✓</span>
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">Weighted: Edge memiliki bobot (jarak, biaya)</p>
                        </li>
                        <li className="flex gap-4 items-center">
                            <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black">✓</span>
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">Unweighted: Edge tanpa bobot (hanya koneksi)</p>
                        </li>
                    </ul>
                </div>
                <div className="bg-white dark:bg-surface border-4 border-amber-500/20 rounded-3xl p-8 shadow-2xl">
                    <h4 className="text-2xl font-black text-amber-600 uppercase mb-4 italic">Cyclic vs Acyclic</h4>
                    <ul className="space-y-4">
                        <li className="flex gap-4 items-center">
                            <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-black">○</span>
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">Cyclic: Ada cycle (lingkaran)</p>
                        </li>
                        <li className="flex gap-4 items-center">
                            <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-black">✗</span>
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">Acyclic: Tidak ada cycle (DAG)</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>,

        // Slide 3: Graph Representation
        <div key="s3" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic tracking-widest">Representasi Graph</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-surface border-4 border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl">
                    <div className="bg-sky-500 text-white font-black py-2 px-6 rounded-xl mb-4 inline-block shadow-lg">Adjacency List</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-4">Setiap node menyimpan daftar tetangganya.</p>
                    <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm">
                        <p className="text-sky-400">A: [B, C]</p>
                        <p className="text-sky-400">B: [A, D]</p>
                        <p className="text-sky-400">C: [A, D]</p>
                        <p className="text-sky-400">D: [B, C]</p>
                    </div>
                    <div className="mt-4 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-600">✓ Efisien untuk graph jarang (sparse)</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface border-4 border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl">
                    <div className="bg-rose-500 text-white font-black py-2 px-6 rounded-xl mb-4 inline-block shadow-lg">Adjacency Matrix</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-4">Matriks 2D menunjukkan koneksi.</p>
                    <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs">
                        <p className="text-slate-400">  A B C D</p>
                        <p className="text-rose-400">A 0 1 1 0</p>
                        <p className="text-rose-400">B 1 0 0 1</p>
                        <p className="text-rose-400">C 1 0 0 1</p>
                        <p className="text-rose-400">D 0 1 1 0</p>
                    </div>
                    <div className="mt-4 p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="text-xs font-bold text-rose-600">✓ Efisien untuk graph padat (dense)</p>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 4: Real World Applications
        <div key="s4" className="space-y-8 flex flex-col justify-center h-full">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-10 uppercase italic">Aplikasi di Dunia Nyata</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { icon: "social_distance", title: "Social Media", desc: "Jaringan pertemanan." },
                    { icon: "directions", title: "Navigation", desc: "Rute terpendek (GPS)." },
                    { icon: "language", title: "Web", desc: "Halaman terhubung (link)." },
                    { icon: "flight", title: "Transport", desc: "Jaringan penerbangan." },
                    { icon: "device_hub", title: "Network", desc: "Topologi komputer." },
                    { icon: "biotech", title: "Biology", desc: "Jaringan protein." },
                    { icon: "school", title: "Education", desc: "Prerequisite mata kuliah." },
                    { icon: "recommend", title: "Recommendation", desc: "Sistem rekomendasi." },
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-surface border-2 border-primary/10 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                        <span className="material-symbols-outlined text-4xl text-primary mb-3">{item.icon}</span>
                        <p className="font-black text-slate-900 dark:text-white uppercase text-sm mb-1">{item.title}</p>
                        <p className="text-[10px] text-slate-500 font-bold italic">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 5: Summary
        <div key="s5" className="space-y-8 h-full flex flex-col justify-center text-center">
            <div className="bg-linear-to-br from-sky-500/20 to-cyan-500/20 p-12 rounded-3xl border-4 border-sky-500/30 shadow-2xl relative overflow-hidden">
                <h4 className="text-5xl font-black text-slate-900 dark:text-white mb-10 uppercase italic tracking-tighter decoration-sky-500 decoration-8 underline-offset-8">Ringkasan Materi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {[
                        { label: "Node & Edge", desc: "Komponen dasar graph." },
                        { label: "Directed/Undirected", desc: "Arah koneksi edge." },
                        { label: "Adjacency List", desc: "Representasi efisien sparse graph." },
                        { label: "Applications", desc: "Social network, GPS, Web." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-5 p-6 bg-white/60 dark:bg-white/10 rounded-2xl border-2 border-sky-500/20">
                            <span className="material-symbols-outlined text-4xl text-sky-500 font-black">sync</span>
                            <div>
                                <p className="font-black text-xl text-slate-900 dark:text-white">{item.label}</p>
                                <p className="text-slate-600 dark:text-slate-400 font-bold italic">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-12 text-2xl font-black text-sky-500 uppercase tracking-[0.3em] font-mono">Module 13 Complete</p>
            </div>
        </div>
    ];

    return (
        <div className="space-y-16 pb-12">
            {/* ─── HEADER & PRESENTATION ─── */}
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-sky-500/5 p-8 rounded-3xl border-2 border-sky-500/20 mb-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Mode Presentasi: Graph</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium italic">Klik tombol untuk memulai slide yang mempermudah pemahaman visual.</p>
                    </div>
                    <button
                        onClick={() => openPresentation(0)}
                        className="bg-sky-500 hover:bg-sky-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-sky-500/20 transition-all flex items-center gap-3 active:scale-95 group"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">present_to_all</span>
                        MULAI PRESENTASI
                    </button>
                </div>

                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Konsep Dasar</span>
                            <button
                                onClick={() => openPresentation(0)}
                                className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-xs">play_arrow</span>
                                SLIDE 1
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FocusSection>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-sky-500/20 p-2 rounded-lg text-sky-600">
                                <span className="material-symbols-outlined">hub</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">Definisi Graph</h3>
                        </div>
                        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic">
                            Graph adalah struktur data <strong className="text-primary underline decoration-primary/30">Non-Linear</strong> yang terdiri dari kumpulan Node (Vertex) dan Edge yang menghubungkan node-node tersebut. Graph digunakan untuk merepresentasikan hubungan antar objek.
                        </p>
                        <div className="mt-8 space-y-4">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Karakteristik Utama:</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-surface p-4 rounded-xl border border-primary/10 flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    <p className="text-[11px] font-bold text-slate-500 italic">Bisa memiliki banyak Root (tidak seperti Tree).</p>
                                </div>
                                <div className="bg-white dark:bg-surface p-4 rounded-xl border border-primary/10 flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    <p className="text-[11px] font-bold text-slate-500 italic">Bisa memiliki Cycle (lingkaran).</p>
                                </div>
                            </div>
                        </div>
                    </FocusSection>
                    <div className="bg-slate-900 border-4 border-sky-500/20 rounded-3xl p-8 shadow-2xl flex flex-col justify-center">
                        <h4 className="text-sky-400 font-black text-xl mb-6 uppercase tracking-widest text-center">Komponen Graph</h4>
                        <div className="space-y-4">
                            {[
                                { title: "Node/Vertex", desc: "Titik atau objek dalam graph." },
                                { title: "Edge", desc: "Garis yang menghubungkan node." },
                                { title: "Weight", desc: "Bobot pada edge (opsional)." },
                                { title: "Degree", desc: "Jumlah edge yang terhubung ke node." },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                    <span className="w-8 h-8 bg-sky-500/20 text-sky-500 rounded-lg flex items-center justify-center font-black italic">{i + 1}</span>
                                    <div>
                                        <p className="text-white font-black uppercase text-sm leading-none mb-1">{item.title}</p>
                                        <p className="text-slate-400 text-[10px] font-bold italic">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── BAGIAN 2: JENIS-JENIS GRAPH ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Jenis-Jenis Graph</span>
                            <button onClick={() => openPresentation(1)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">info</span> SLIDE 2
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-surface border-2 border-sky-500/20 rounded-3xl p-8 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic mb-6">Directed vs Undirected</h3>
                        <div className="space-y-6">
                            <div className="p-5 bg-sky-500/10 border-2 border-sky-500/30 rounded-xl">
                                <p className="text-sm font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-2">Undirected Graph</p>
                                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                    Edge bersifat dua arah. Jika A terhubung ke B, maka B juga terhubung ke A. Contoh: Jalan dua arah, pertemanan di Facebook.
                                </p>
                            </div>
                            <div className="p-5 bg-rose-500/10 border-2 border-rose-500/30 rounded-xl">
                                <p className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-2">Directed Graph (Digraph)</p>
                                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                    Edge bersifat satu arah. A → B tidak berarti B → A. Contoh: Jalan satu arah, follower di Twitter.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface border-2 border-emerald-500/20 rounded-3xl p-8 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic mb-6">Weighted vs Unweighted</h3>
                        <div className="space-y-6">
                            <div className="p-5 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl">
                                <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Weighted Graph</p>
                                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                    Setiap edge memiliki bobot (jarak, biaya, waktu). Digunakan untuk mencari rute terpendek/termurah.
                                </p>
                            </div>
                            <div className="p-5 bg-amber-500/10 border-2 border-amber-500/30 rounded-xl">
                                <p className="text-sm font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">Unweighted Graph</p>
                                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                    Edge tidak memiliki bobot, hanya menunjukkan koneksi. Digunakan untuk mengecek keterhubungan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── BAGIAN 3: REPRESENTASI GRAPH ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Representasi Graph</span>
                            <button onClick={() => openPresentation(2)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">code</span> SLIDE 3
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-sky-500/20 p-2 rounded-lg text-sky-600">
                                <span className="material-symbols-outlined">list</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">Adjacency List</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-6">
                            Setiap node menyimpan daftar (list) node-node yang terhubung langsung dengannya.
                        </p>
                        <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm mb-6">
                            <p className="text-slate-400 mb-2">// Contoh Python</p>
                            <p className="text-sky-400">graph = {`{`}</p>
                            <p className="text-slate-300 ml-4">"A": ["B", "C"],</p>
                            <p className="text-slate-300 ml-4">"B": ["A", "D"],</p>
                            <p className="text-slate-300 ml-4">"C": ["A", "D"],</p>
                            <p className="text-slate-300 ml-4">"D": ["B", "C"]</p>
                            <p className="text-sky-400">{`}`}</p>
                        </div>
                        <div className="bg-emerald-500/10 p-4 rounded-xl border-l-4 border-emerald-500">
                            <p className="text-xs font-bold text-emerald-600 italic">✓ Space: O(V + E) | Efisien untuk sparse graph</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-rose-500/20 p-2 rounded-lg text-rose-600">
                                <span className="material-symbols-outlined">grid_on</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">Adjacency Matrix</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-6">
                            Matriks 2D berukuran V x V, di mana nilai 1 menunjukkan koneksi dan 0 menunjukkan tidak ada koneksi.
                        </p>
                        <div className="bg-slate-900 rounded-2xl p-6 font-mono text-xs mb-6">
                            <p className="text-slate-400 mb-2">// Contoh Matriks</p>
                            <p className="text-slate-400">  A B C D</p>
                            <p className="text-rose-400">A 0 1 1 0</p>
                            <p className="text-rose-400">B 1 0 0 1</p>
                            <p className="text-rose-400">C 1 0 0 1</p>
                            <p className="text-rose-400">D 0 1 1 0</p>
                        </div>
                        <div className="bg-rose-500/10 p-4 rounded-xl border-l-4 border-rose-500">
                            <p className="text-xs font-bold text-rose-600 italic">✓ Space: O(V²) | Efisien untuk dense graph</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── BAGIAN 4: SIMULASI INTERAKTIF ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Simulasi Interaktif</span>
                        </div>
                    </div>
                </ScrollReveal>

                <GraphVisualizer />
                <p className="text-center text-[10px] text-slate-500 font-bold italic">Gunakan simulator di atas untuk memahami bagaimana graph bekerja dan melihat representasi adjacency list.</p>
            </div>

            {/* ─── BAGIAN 5: APLIKASI DUNIA NYATA ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Aplikasi Dunia Nyata</span>
                            <button onClick={() => openPresentation(3)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">public</span> SLIDE 4
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: "social_distance", title: "Social Media", desc: "Jaringan pertemanan dan rekomendasi.", color: "bg-blue-500" },
                        { icon: "directions", title: "Navigation", desc: "GPS mencari rute terpendek.", color: "bg-green-500" },
                        { icon: "language", title: "World Wide Web", desc: "Halaman web terhubung via link.", color: "bg-purple-500" },
                        { icon: "flight", title: "Transportasi", desc: "Jaringan penerbangan dan kereta.", color: "bg-orange-500" },
                        { icon: "device_hub", title: "Computer Network", desc: "Topologi jaringan komputer.", color: "bg-cyan-500" },
                        { icon: "biotech", title: "Biologi", desc: "Jaringan protein dan gen.", color: "bg-pink-500" },
                        { icon: "school", title: "Pendidikan", desc: "Prerequisite mata kuliah.", color: "bg-amber-500" },
                        { icon: "recommend", title: "Rekomendasi", desc: "Sistem rekomendasi produk.", color: "bg-rose-500" },
                    ].map((item, i) => (
                        <ScrollReveal key={i}>
                            <div className="bg-white dark:bg-surface border-2 border-primary/10 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center group hover:scale-105 transition-transform">
                                <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <p className="font-black text-slate-900 dark:text-white uppercase text-sm mb-2">{item.title}</p>
                                <p className="text-[10px] text-slate-500 font-bold italic leading-relaxed">{item.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ─── BAGIAN 6: KESIMPULAN ─── */}
            <ScrollReveal>
                <div className="bg-slate-900 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl text-center">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--color-sky-500),transparent_70%)] opacity-30"></div>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase italic tracking-tighter">Graph Is Everywhere</h3>
                    <p className="text-xl text-slate-400 font-bold italic max-w-2xl mx-auto mb-12">
                        Graph adalah struktur data paling fleksibel untuk merepresentasikan hubungan kompleks di dunia nyata, dari jaringan sosial hingga sistem navigasi.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => openPresentation(4)}
                            className="px-10 py-4 bg-sky-500 text-white rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-sky-500/30"
                        >
                            TINJAU RINGKASAN
                        </button>
                    </div>
                </div>
            </ScrollReveal>

            <PresentationMode
                isOpen={isPresentationOpen}
                onExit={() => setIsPresentationOpen(false)}
                slides={slides}
                initialSlide={startSlideIndex}
            />
        </div>
    );
}
