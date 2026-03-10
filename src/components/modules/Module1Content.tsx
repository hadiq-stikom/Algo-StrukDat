"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import PresentationMode from "@/components/PresentationMode";

export default function Module1Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const slides = [
        // Slide 1: Welcome & Roadmap
        <div key="s1" className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-indigo-500/30 p-2 rounded-lg text-indigo-500">
                    <span className="material-symbols-outlined text-xl">map</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">1.1 Orientasi & Kontrak Belajar</h3>
            </div>
            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-8 shadow-sm">
                <h4 className="font-black text-xl mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-primary text-sm">timeline</span>
                    Syllabus Roadmap (14 Minggu)
                </h4>
                <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed mb-8 font-medium">
                    Mulai dari fondasi memori hingga arsitektur Graf tingkat lanjut. Fokus kita: <strong className="text-slate-900 dark:text-white">"efisien dan logis"</strong>.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        "Fondasi & Big O (W 1-2)",
                        "Struktur Linear (W 3-6)",
                        "Rekursi & Sorting (W 7-10)",
                        "Tree & Graph (W 11-14)"
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm font-bold p-4 bg-slate-100 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 rounded-xl border border-primary/10">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0"></span>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>,

        // Slide 2: Penilaian
        <div key="s2" className="space-y-6">
            <div className="bg-linear-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-10 flex flex-col gap-8 items-center text-center">
                <div className="bg-primary/20 p-8 rounded-full shrink-0">
                    <span className="material-symbols-outlined text-primary text-7xl">verified_user</span>
                </div>
                <div>
                    <h4 className="font-black text-4xl mb-6 text-slate-900 dark:text-white">Sistem Penilaian Baru</h4>
                    <p className="text-slate-700 dark:text-slate-200 text-2xl leading-relaxed font-medium">
                        Penekanan utama pada <strong className="text-slate-900 dark:text-white text-3xl">kemampuan analisis dan pembuktian logika</strong>.
                        <br /><br />
                        Buktikan kodenya efisien melalui <em>manual tracing</em>.
                    </p>
                </div>
            </div>
        </div>,

        // Slide 3: AI Learning Paradigm
        <div key="s3" className="space-y-8">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-amber-500/30 p-2 rounded-lg text-amber-500">
                    <span className="material-symbols-outlined text-xl">smart_toy</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">1.2 Paradigma Belajar AI 🤖</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {[
                    { title: "Fase 1: Konsep 🧠", desc: "Memahami logika di atas kertas tanpa komputer.", color: "bg-indigo-500" },
                    { title: "Fase 2: Eksperimen 💻", desc: "Gunakan AI untuk mencoba berbagai variasi kode.", color: "bg-primary" },
                    { title: "Fase 3: Validasi 📊", desc: "Buktikan secara manual bahwa output AI efisien.", color: "bg-green-500" },
                ].map((phase, i) => (
                    <div key={i} className="bg-white dark:bg-surface p-6 rounded-2xl border-2 border-primary/10 shadow-sm flex items-center gap-6">
                        <div className={`${phase.color} w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-2xl shadow shrink-0`}>
                            {i + 1}
                        </div>
                        <div>
                            <h4 className="font-black text-xl mb-1 text-slate-900 dark:text-white">{phase.title}</h4>
                            <p className="text-lg text-slate-700 dark:text-slate-200 font-medium">{phase.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 4: Analogy Perpustakaan
        <div key="s4" className="space-y-8">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-blue-500/30 p-2 rounded-lg text-blue-500">
                    <span className="material-symbols-outlined text-xl">psychology</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">2.1 Konsep & Analogi</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 bg-red-500/10 border-2 border-red-500/30 rounded-3xl">
                    <p className="text-xl font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-4">Tumpukan Kardus ❌</p>
                    <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        Data disimpan asal letak. Mencari "buku sejarah" sangat <strong className="text-red-600">IN-EFISIEN</strong>.
                    </p>
                </div>
                <div className="p-8 bg-green-500/10 border-2 border-green-500/30 rounded-3xl">
                    <p className="text-xl font-black text-green-600 dark:text-green-400 uppercase tracking-widest mb-4">Perpustakaan ✅</p>
                    <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        Data disusun terindeks. Mencari sangat cepat. Inilah <strong className="text-slate-900 dark:text-white">Struktur Data</strong>.
                    </p>
                </div>
            </div>
            <div className="mt-8 p-8 bg-primary/10 rounded-3xl border-2 border-primary/20 text-center">
                <p className="text-2xl font-black italic text-slate-800 dark:text-slate-100">
                    "Struktur Data = Cara efisien mengatur data di memori."
                </p>
            </div>
        </div>,

        // Slide 5: Anatomy Memori
        <div key="s5" className="space-y-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
                <div className="bg-cyan-500/30 p-2 rounded-lg text-cyan-500">
                    <span className="material-symbols-outlined text-xl">memory</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">2.2 Anatomi Memori 🧠</h3>
            </div>
            <p className="text-2xl text-slate-700 dark:text-slate-200 mb-6 font-medium">
                RAM = Barisan kotak dengan <strong className="text-slate-900 dark:text-white">Address</strong> unik.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10 font-mono">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`border-2 rounded-2xl p-6 flex flex-col items-center gap-2 ${i === 3 ? 'bg-primary border-primary text-white shadow-2xl scale-125 z-10' : 'bg-surface border-primary/20 text-slate-400'}`}>
                        <span className="text-xs opacity-60 font-bold">0x0{i}</span>
                        <span className="font-black text-2xl">{i === 3 ? 'DATA' : '0'}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-6 text-left">
                {[
                    { l: "Bit", d: "0 atau 1" },
                    { l: "Byte", d: "8 Bit" },
                    { l: "Address", d: "Lokasi Unik" }
                ].map((item, i) => (
                    <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-lg">
                        <p className="text-primary font-black text-2xl mb-2 italic">#{item.l}</p>
                        <p className="text-slate-400 text-lg font-bold">{item.d}</p>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 6: Data Sizes
        <div key="s6" className="space-y-10">
            <div className="flex items-center justify-center gap-3 mb-2">
                <div className="bg-green-500/30 p-2 rounded-lg text-green-500">
                    <span className="material-symbols-outlined text-xl">fit_screen</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">2.3 Ukuran Tipe Data 📏</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                    { t: "Integer", b: 4, cells: 4, color: "bg-indigo-500" },
                    { t: "Char", b: 1, cells: 1, color: "bg-emerald-500" },
                    { t: "Double", b: 8, cells: 8, color: "bg-amber-500" }
                ].map((item, idx) => (
                    <div key={idx} className="p-8 bg-white dark:bg-surface rounded-3xl border-2 border-primary/20 shadow-2xl text-center">
                        <span className="text-lg font-black text-primary uppercase block mb-6">{item.t}</span>
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {Array.from({ length: item.cells }).map((_, i) => <div key={i} className={`w-6 h-6 ${item.color} rounded shadow-sm opacity-80`}></div>)}
                        </div>
                        <p className="text-4xl font-mono font-black text-slate-900 dark:text-white">{item.b} Bytes</p>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 7: Stack vs Heap
        <div key="s7" className="space-y-8">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-violet-500/30 p-2 rounded-lg text-violet-500">
                    <span className="material-symbols-outlined text-xl">layers</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">2.4 Stack vs Heap</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-surface border-2 border-violet-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <h4 className="font-black text-3xl text-violet-500 uppercase mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined">vertical_align_bottom</span>
                        The Stack
                    </h4>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 font-medium">FIXED SIZE: Variabel lokal, sangat cepat.</p>
                    <div className="flex flex-col-reverse gap-2 font-mono text-lg">
                        <div className="bg-violet-500 text-white p-4 rounded-xl text-center font-black shadow-lg">Current Frame ▼</div>
                        <div className="bg-violet-100 dark:bg-violet-900/40 p-4 rounded-xl text-center text-slate-500 font-bold border-2 border-violet-200/50">Local B</div>
                        <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-xl text-center text-slate-400 font-bold border border-dotted border-violet-200/30">Local A</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface border-2 border-amber-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <h4 className="font-black text-3xl text-amber-500 uppercase mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined">cloud</span>
                        The Heap
                    </h4>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 font-medium">DYNAMIC SIZE: Objek besar, fleksibel.</p>
                    <div className="h-48 bg-slate-900 rounded-2xl relative p-6 border-2 border-white/5 shadow-inner">
                        <div className="absolute top-6 left-6 bg-amber-500/20 text-amber-400 p-4 rounded-xl border border-amber-500/40 text-sm font-black shadow-lg">Object A</div>
                        <div className="absolute bottom-8 right-8 bg-blue-500/20 text-blue-400 p-4 rounded-xl border border-blue-500/40 text-sm font-black text-center shadow-lg">Large Array<br />(Resized)</div>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 8: Tracing Logic
        <div key="s8" className="space-y-8">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-rose-500/30 p-2 rounded-lg text-rose-500">
                    <span className="material-symbols-outlined text-xl">analytics</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">2.5 Simulasi Tracing</h3>
            </div>
            <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-4 bg-slate-800 border-b-2 border-slate-700 text-sm font-black text-slate-200 tracking-[0.3em]">MANUAL_TRACING.PY</div>
                <div className="grid md:grid-cols-2 gap-0">
                    <pre className="p-10 text-xl font-mono text-slate-200 border-r-2 border-slate-800 leading-relaxed">
                        <code>{`data = [7, 2, 9, 4]
max = data[0]

for x in data:
  if x > max:
    max = x`}</code>
                    </pre>
                    <div className="p-10 bg-primary/5 flex flex-col justify-center items-center text-center">
                        <p className="text-lg font-black text-primary uppercase tracking-widest mb-6">Current Memory State</p>
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border-4 border-primary shadow-2xl scale-110">
                            <span className="text-sm font-mono text-slate-500 block mb-2 uppercase font-bold">max_val</span>
                            <span className="text-6xl font-black text-primary animate-pulse">9</span>
                        </div>
                        <p className="mt-8 text-slate-400 font-bold italic">Iterasi ke-3: 9 {">"} 7 (UPDATE!)</p>
                    </div>
                </div>
            </div>
        </div>
    ];

    return (
        <div className="space-y-16 pb-12">
            {/* Presentation Mode Header */}
            <div className="flex justify-center mb-12">
                <button
                    onClick={() => openPresentation(0)}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group border-b-4 border-primary-dark"
                >
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform text-2xl">present_to_all</span>
                    MULAI MODE PRESENTASI
                </button>
            </div>

            {/* --- BAGIAN 1: PENGENALAN MATAKULIAH --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 1: Pengenalan</span>
                                <button
                                    onClick={() => openPresentation(0)}
                                    className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Section 1.1: Orientation */}
                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button
                                onClick={() => openPresentation(0)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20 z-10"
                                title="Presentasikan bagian ini"
                            >
                                <span className="material-symbols-outlined text-sm">slideshow</span>
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-indigo-500/30 p-2 rounded-lg text-indigo-500">
                                    <span className="material-symbols-outlined text-xl">map</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">1.1 Orientasi &amp; Kontrak Belajar</h3>
                            </div>
                            <div className="grid gap-6">
                                <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                    <h4 className="font-black text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                                        <span className="material-symbols-outlined text-primary text-sm">timeline</span>
                                        Syllabus Roadmap (14 Minggu)
                                    </h4>
                                    <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-4 font-medium">
                                        Kita akan menempuh perjalanan koding yang terstruktur, mulai dari fondasi memori hingga arsitektur Graf tingkat lanjut. Pusat perhatian adalah <strong className="text-slate-900 dark:text-white">"efisiensi"</strong>.
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            "Fondasi & Big O (Minggu 1-2)",
                                            "Struktur Linear (Minggu 3-6)",
                                            "Rekursi & Sorting (Minggu 7-10)",
                                            "Tree & Graph (Minggu 11-14)"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm font-bold p-3 bg-slate-100 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 rounded-xl border border-primary/10">
                                                <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-linear-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                                    <div className="bg-primary/20 p-4 rounded-full shrink-0">
                                        <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-lg mb-2 text-slate-900 dark:text-white">Sistem Penilaian Baru</h4>
                                        <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed font-medium">
                                            Penekanan utama ada pada <strong className="text-slate-900 dark:text-white">kemampuan analisis dan pembuktian logika</strong>. Buktikan kodenya efisien melalui <em>manual tracing</em>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Section 1.2: AI Paradigm */}
                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button
                                onClick={() => openPresentation(2)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20 z-10"
                                title="Presentasikan bagian ini"
                            >
                                <span className="material-symbols-outlined text-sm">slideshow</span>
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-amber-500/30 p-2 rounded-lg text-amber-500">
                                    <span className="material-symbols-outlined text-xl">smart_toy</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">1.2 Paradigma Belajar dengan AI 🤖</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: "Fase 1: Konsep 🧠", desc: "Memahami logika di atas kertas.", color: "bg-indigo-500", border: "border-indigo-500/30" },
                                    { title: "Fase 2: Eksperimen 💻", desc: "Gunakan AI untuk variasi kode.", color: "bg-primary", border: "border-primary/30" },
                                    { title: "Fase 3: Validasi 📊", desc: "Buktikan output AI efisien.", color: "bg-green-500", border: "border-green-500/30" },
                                ].map((phase, i) => (
                                    <div key={i} className={`bg-white dark:bg-surface p-5 rounded-2xl border-2 ${phase.border} shadow-sm hover:shadow-md transition-all group`}>
                                        <div className={`${phase.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg mb-4 shadow`}>
                                            {i + 1}
                                        </div>
                                        <h4 className="font-black text-base mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">{phase.title}</h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{phase.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* --- BAGIAN 2: KONSEP DASAR --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 2: Konsep Dasar</span>
                                <button
                                    onClick={() => openPresentation(3)}
                                    className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Section 2.1: Analogy */}
                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button
                                onClick={() => openPresentation(3)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20 z-10"
                            >
                                <span className="material-symbols-outlined text-sm">slideshow</span>
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-500/30 p-2 rounded-lg text-blue-500">
                                    <span className="material-symbols-outlined text-xl">psychology</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.1 Konsep Dasar &amp; Analogi</h3>
                            </div>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <div className="p-6">
                                    <h4 className="font-black text-base text-primary mb-4 italic">Analogi: Perpustakaan vs Kardus Acak</h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="p-5 bg-red-500/10 border-2 border-red-500/30 rounded-xl">
                                            <p className="text-sm font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-2">Tumpukan Kardus ❌</p>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                                Data disimpan asal letak. Mencari "buku sejarah" sangat <strong className="text-red-600 uppercase">In-efisien</strong>.
                                            </p>
                                        </div>
                                        <div className="p-5 bg-green-500/10 border-2 border-green-500/30 rounded-xl">
                                            <p className="text-sm font-black text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">Perpustakaan ✅</p>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                                Data disusun terindeks. Inilah kekuatan <strong className="text-slate-900 dark:text-white">Struktur Data</strong>.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-8 p-4 bg-primary/10 rounded-xl border-2 border-primary/20">
                                        <p className="text-sm font-medium italic text-center text-slate-800 dark:text-slate-100">
                                            "Struktur Data adalah cara mengatur dan menyimpan data di memori agar efisien."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Section 2.2: Memory Anatomy */}
                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button
                                onClick={() => openPresentation(4)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20 z-10"
                            >
                                <span className="material-symbols-outlined text-sm">slideshow</span>
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-cyan-500/30 p-2 rounded-lg text-cyan-500">
                                    <span className="material-symbols-outlined text-xl">memory</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.2 Anatomi Memori Komputer 🧠</h3>
                            </div>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    Setiap kotak memiliki <strong className="text-slate-900 dark:text-white">Alamat (Address)</strong> unik.
                                </p>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6 font-mono text-xs">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div key={i} className={`border-2 rounded-lg p-2 flex flex-col items-center gap-1 ${i === 3 ? 'bg-primary/20 border-primary text-primary shadow-md shadow-primary/20' : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                            <span className="text-slate-500 dark:text-slate-400 text-[10px] underline">0x{i.toString(16).toUpperCase().padStart(2, '0')}</span>
                                            <span className="font-black text-xs">{i === 3 ? 'DATA' : '0'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Section 2.3: Data Size */}
                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button
                                onClick={() => openPresentation(5)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20 z-10"
                            >
                                <span className="material-symbols-outlined text-sm">slideshow</span>
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-green-500/30 p-2 rounded-lg text-green-500">
                                    <span className="material-symbols-outlined text-xl">fit_screen</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.3 Logika Data: Ukuran itu Penting! 📏</h3>
                            </div>
                            <div className="bg-linear-to-br from-primary/5 to-accent/5 border-2 border-primary/30 rounded-2xl p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-5 bg-white dark:bg-surface rounded-xl border-2 border-primary/20 shadow-sm">
                                        <span className="text-sm font-black text-primary uppercase block mb-2">Integer</span>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 font-mono font-bold">4 Bytes</p>
                                    </div>
                                    <div className="p-5 bg-white dark:bg-surface rounded-xl border-2 border-primary/20 shadow-sm">
                                        <span className="text-sm font-black text-primary uppercase block mb-2">Char</span>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 font-mono font-bold">1 Byte</p>
                                    </div>
                                    <div className="p-5 bg-white dark:bg-surface rounded-xl border-2 border-primary/20 shadow-sm">
                                        <span className="text-sm font-black text-primary uppercase block mb-2">Double</span>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 font-mono font-bold">8 Bytes</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Section 2.4: Stack vs Heap */}
                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button
                                onClick={() => openPresentation(6)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20 z-10"
                            >
                                <span className="material-symbols-outlined text-sm">slideshow</span>
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-violet-500/30 p-2 rounded-lg text-violet-500">
                                    <span className="material-symbols-outlined text-xl">layers</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.4 Di Mana Data Disimpan? (Stack vs Heap)</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-surface border-2 border-violet-500/20 rounded-2xl p-6 shadow-sm">
                                    <h4 className="font-black text-base text-slate-900 dark:text-white mb-4 italic flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xs">vertical_align_bottom</span> The Stack
                                    </h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-medium">FIXED SIZE: Variabel lokal, sangat cepat.</p>
                                    <div className="flex flex-col-reverse gap-1 font-mono text-xs">
                                        <div className="bg-primary/20 text-primary p-2.5 rounded-lg text-center border-2 border-primary/30 font-black shadow-lg">Current Frame ▼</div>
                                        <div className="bg-slate-200 dark:bg-slate-900 p-2.5 rounded-lg text-center font-bold">Local B</div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-surface border-2 border-amber-500/20 rounded-2xl p-6 shadow-sm">
                                    <h4 className="font-black text-base text-slate-900 dark:text-white mb-4 italic flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xs">cloud</span> The Heap
                                    </h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-medium">DYNAMIC SIZE: Objek besar, fleksibel.</p>
                                    <div className="relative h-24 bg-slate-900 rounded-lg border-2 border-dashed border-slate-700 p-2">
                                        <div className="absolute top-2 left-4 bg-amber-500/20 text-amber-400 p-2 rounded border border-amber-500/40 text-[10px] font-black shadow">Object A</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Section 2.5: Tracing */}
                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button
                                onClick={() => openPresentation(7)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20 z-10"
                            >
                                <span className="material-symbols-outlined text-sm">slideshow</span>
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-rose-500/30 p-2 rounded-lg text-rose-500">
                                    <span className="material-symbols-outlined text-xl">analytics</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.5 Simulasi Tracing (Find Max) 📊</h3>
                            </div>
                            <div className="bg-slate-900 border-2 border-primary/20 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="p-3 bg-slate-800 border-b border-primary/20 flex items-center justify-between">
                                    <span className="text-xs text-slate-300 font-mono font-black uppercase tracking-widest">Logic.py</span>
                                </div>
                                <div className="p-6 font-mono text-sm leading-relaxed text-slate-200">
                                    <code>{`data = [7, 2, 9, 4]
max_val = data[0]

for angka in data:
  if angka > max_val:
    max_val = angka`}</code>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* Presentation Overlay */}
            <PresentationMode
                slides={slides}
                initialSlide={startSlideIndex}
                onExit={() => setIsPresentationOpen(false)}
                isOpen={isPresentationOpen}
            />
        </div>
    );
}
