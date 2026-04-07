"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import { motion } from "framer-motion";
import PresentationMode from "@/components/PresentationMode";

export default function Module8Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const slides = [
        // Slide 1: Concept
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-orange-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-orange-500/20 shadow-2xl text-orange-600">
                <span className="material-symbols-outlined text-5xl">account_tree</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Struktur Data Tree</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                Struktur data <strong className="text-orange-600 underline decoration-orange-500/30">hierarki</strong> yang menyerupai pohon terbalik.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center">
                    <p className="text-xl font-black text-orange-700 dark:text-orange-400 uppercase mb-6">Analogi Silsilah Keluarga 👨‍👩-‍👧‍👦</p>
                    <div className="relative w-full h-32 flex justify-center">
                        <div className="w-12 h-12 bg-orange-500 rounded-full mb-4 border-4 border-white shadow-lg mx-auto" />
                        <div className="absolute top-12 left-1/4 w-12 h-12 bg-orange-400 rounded-full border-4 border-white shadow-lg" />
                        <div className="absolute top-12 right-1/4 w-12 h-12 bg-orange-400 rounded-full border-4 border-white shadow-lg" />
                    </div>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl border-4 border-orange-500/20 shadow-2xl text-left">
                    <p className="text-orange-400 font-black text-xl mb-6 uppercase tracking-widest text-center">Terminologi Utama:</p>
                    <ul className="space-y-4">
                        {[
                            { icon: "vertical_align_top", title: "Root", desc: "Node paling atas (moyang)." },
                            { icon: "schema", title: "Parent/Child", desc: "Hubungan antar node." },
                            { icon: "eco", title: "Leaf", desc: "Node tanpa anak (ujung)." },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4">
                                <span className="material-symbols-outlined text-orange-500 text-3xl">{item.icon}</span>
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

        // Slide 2: Binary Tree
        <div key="s2" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-10 uppercase italic">Binary Tree</h3>
            <div className="bg-white dark:bg-surface border-4 border-blue-500/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <p className="text-2xl text-slate-600 dark:text-slate-400 font-bold italic leading-relaxed text-center mb-8">
                    Setiap node maksimal hanya boleh memiliki <span className="text-blue-500 underline decoration-4 underline-offset-8 font-black">2 ANAK</span> (Left & Right).
                </p>
                <div className="flex justify-center gap-12">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-2 mx-auto shadow-lg">L</div>
                        <p className="font-mono text-sm uppercase font-black text-blue-400">Left Child</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-2 mx-auto shadow-lg">R</div>
                        <p className="font-mono text-sm uppercase font-black text-blue-400">Right Child</p>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 3: Traversal Logic
        <div key="s3" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic tracking-widest">Tree Traversal</h3>
            <p className="text-xl text-center text-slate-600 dark:text-slate-400 font-bold italic mb-10">
                Cara mengunjungi setiap node tepat satu kali.
            </p>
            <div className="grid grid-cols-3 gap-6">
                {[
                    { name: "Pre-order", rule: "Root → L → R", color: "bg-rose-500" },
                    { name: "In-order", rule: "L → Root → R", color: "bg-emerald-500" },
                    { name: "Post-order", rule: "L → R → Root", color: "bg-cyan-500" },
                ].map((t, i) => (
                    <div key={i} className="bg-white dark:bg-surface border-4 border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xl text-center group hover:scale-105 transition-transform">
                        <div className={`${t.color} text-white font-black py-2 px-4 rounded-xl mb-4 inline-block`}>{t.name}</div>
                        <p className="font-mono text-xl font-black text-slate-700 dark:text-slate-300 italic">{t.rule}</p>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 4: Summary Module 8
        <div key="s4" className="space-y-8 h-full flex flex-col justify-center text-center">
            <div className="bg-linear-to-br from-orange-500/20 to-amber-500/20 p-12 rounded-3xl border-4 border-orange-500/30 shadow-2xl relative overflow-hidden">
                <h4 className="text-5xl font-black text-slate-900 dark:text-white mb-10 uppercase italic tracking-tighter decoration-orange-500 decoration-8 underline-offset-8">Ringkasan Materi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {[
                        { label: "Hierarki", desc: "Struktur non-linear." },
                        { label: "Binary Tree", desc: "Maksimal 2 cabang." },
                        { label: "Traversal", desc: "Urutan kunjungan node." },
                        { label: "Root", desc: "Titik awal akses." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-5 p-6 bg-white/60 dark:bg-white/10 rounded-2xl border-2 border-orange-500/20">
                            <span className="material-symbols-outlined text-4xl text-orange-500 font-black">sync</span>
                            <div>
                                <p className="font-black text-xl text-slate-900 dark:text-white">{item.label}</p>
                                <p className="text-slate-600 dark:text-slate-400 font-bold italic">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-12 text-2xl font-black text-orange-500 uppercase tracking-[0.3em] font-mono">Module 8 Complete</p>
            </div>
        </div>
    ];

    return (
        <div className="space-y-16 pb-12">
            {/* ─── BAGIAN 1: KONSEP TREE ─── */}
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
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Konsep Tree</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FocusSection>
                        <h3 className="text-xl font-black text-primary mb-4 uppercase italic">Apa itu Tree?</h3>
                        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            Tree adalah struktur data non-linear yang melambangkan hubungan hierarkis antar elemen.
                            Berbeda dengan Stack atau Queue yang bersifat linear, Tree bercabang dari satu titik utama (Root).
                        </p>
                    </FocusSection>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center min-h-[200px]">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-2">account_tree</span>
                        <p className="text-slate-500 font-bold italic text-sm">Visualisasi Tree akan muncul di sini</p>
                    </div>
                </div>
            </div>

            {/* ─── BAGIAN 2: BINARY TREE ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Binary Tree</span>
                            <button onClick={() => openPresentation(1)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">info</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="bg-blue-500/5 border-2 border-blue-500/20 p-8 rounded-3xl">
                    <h3 className="text-xl font-black text-blue-600 mb-4 uppercase italic">Sifat Binary Tree</h3>
                    <ul className="space-y-4 text-lg font-medium text-slate-600 dark:text-slate-400 italic">
                        <li>1. Memiliki paling banyak 2 anak.</li>
                        <li>2. Terbagi menjadi Subtree Kiri dan Subtree Kanan.</li>
                        <li>3. Struktur dasar untuk Binary Search Tree (BST).</li>
                    </ul>
                </div>
            </div>

            {/* ─── BAGIAN 3: TRAVERSAL ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Traversal</span>
                            <button onClick={() => openPresentation(2)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Pre-order", desc: "Kunjungi root terlebih dahulu." },
                        { title: "In-order", desc: "Kunjungi kiri, root, lalu kanan." },
                        { title: "Post-order", desc: "Kunjungi kiri, kanan, baru root." },
                    ].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-surface p-6 rounded-2xl border-2 border-primary/10 shadow-sm">
                            <h4 className="font-black text-lg text-primary uppercase mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-bold italic">{item.desc}</p>
                        </div>
                    ))}
                </div>
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
