"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import { motion } from "framer-motion";
import PresentationMode from "@/components/PresentationMode";
import TreeVisualizer from "./TreeVisualizer";

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
                    <p className="text-xl font-black text-orange-700 dark:text-orange-400 uppercase mb-6">Analogi Silsilah Keluarga 👨‍👩‍👧‍👦</p>
                    <div className="relative w-full h-32 flex justify-center">
                        <div className="w-12 h-12 bg-orange-500 rounded-full mb-4 border-4 border-white shadow-lg mx-auto" />
                        <div className="absolute top-12 left-1/4 w-12 h-12 bg-orange-400 rounded-full border-4 border-white shadow-lg" />
                        <div className="absolute top-12 right-1/4 w-12 h-12 bg-orange-400 rounded-full border-4 border-white shadow-lg" />
                    </div>
                    <p className="text-xs text-slate-500 italic mt-4 italic">Kakek ➔ Ayah ➔ Anak (Hierarki menurun)</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl border-4 border-orange-500/20 shadow-2xl text-left">
                    <p className="text-orange-400 font-black text-xl mb-6 uppercase tracking-widest text-center">Terminologi Utama:</p>
                    <ul className="space-y-4">
                        {[
                            { icon: "vertical_align_top", title: "Root", desc: "Node paling atas (moyang)." },
                            { icon: "schema", title: "Parent/Child", desc: "Hubungan antar node." },
                            { icon: "eco", title: "Leaf", desc: "Node tanpa anak (ujung)." },
                            { icon: "height", title: "Height", desc: "Jarak terjauh dari root ke leaf." },
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

        // Slide 2: Binary Search Tree (BST)
        <div key="s2" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-10 uppercase italic">Binary Search Tree (BST)</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-surface border-4 border-orange-500/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
                    <h4 className="text-2xl font-black text-orange-600 uppercase mb-6 italic tracking-tight">Aturan Emas BST:</h4>
                    <ul className="space-y-6">
                        <li className="flex gap-4 items-center">
                            <span className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-black">1</span>
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">Subtree <span className="text-orange-500">Kiri</span> selalu LEBIH KECIL dari Root.</p>
                        </li>
                        <li className="flex gap-4 items-center">
                            <span className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-black">2</span>
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">Subtree <span className="text-orange-500">Kanan</span> selalu LEBIH BESAR dari Root.</p>
                        </li>
                    </ul>
                </div>
                <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-orange-500/20 shadow-lg">
                    <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-white/10">
                        <span className="text-slate-400 font-mono text-xs font-bold italic">bst_logic.py</span>
                    </div>
                    <pre className="p-6 text-lg font-mono leading-relaxed">
                        <code>
                            <span className="text-cyan-400">if</span> <span className="text-orange-300">val</span> {"<"} <span className="text-blue-400">node.val</span>:{"\n"}
                            {"    "}<span className="text-slate-400"># Cari di KIRI</span>{"\n"}
                            {"    "}<span className="text-blue-400">insert</span>(<span className="text-blue-400">node.left</span>, <span className="text-orange-300">val</span>){"\n"}
                            <span className="text-cyan-400">else</span>:{"\n"}
                            {"    "}<span className="text-slate-400"># Cari di KANAN</span>{"\n"}
                            {"    "}<span className="text-blue-400">insert</span>(<span className="text-blue-400">node.right</span>, <span className="text-orange-300">val</span>)
                        </code>
                    </pre>
                </div>
            </div>
        </div>,

        // Slide 3: Interactive Visualizer
        <div key="s3" className="space-y-8 h-full flex flex-col items-center justify-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase italic text-center">BST Visualizer</h3>
            <div className="w-full max-w-6xl">
                <TreeVisualizer />
            </div>
        </div>,

        // Slide 4: Traversal Logic
        <div key="s4" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic tracking-widest">Tree Traversal</h3>
            <div className="grid grid-cols-3 gap-6">
                {[
                    { name: "Pre-order", rule: "Root → L → R", color: "bg-rose-500", desc: "Sering dipakai untuk copy tree." },
                    { name: "In-order", rule: "L → Root → R", color: "bg-emerald-500", desc: "Menghasilkan data TERURUT." },
                    { name: "Post-order", rule: "L → R → Root", color: "bg-cyan-500", desc: "Dipakai untuk hapus node." },
                ].map((t, i) => (
                    <div key={i} className="bg-white dark:bg-surface border-4 border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl text-center group hover:scale-105 transition-transform">
                        <div className={`${t.color} text-white font-black py-2 px-6 rounded-xl mb-4 inline-block shadow-lg`}>{t.name}</div>
                        <p className="font-mono text-2xl font-black text-slate-700 dark:text-slate-300 italic mb-4">{t.rule}</p>
                        <p className="text-sm text-slate-500 font-bold italic">{t.desc}</p>
                    </div>
                ))}
            </div>
            <div className="bg-primary/5 p-8 rounded-3xl border-2 border-primary/20 mt-10">
                <h5 className="font-black text-primary uppercase mb-4 text-center tracking-widest">Kenapa Traversal Penting?</h5>
                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium italic text-center leading-relaxed">
                    Karena Tree adalah struktur <strong className="text-primary underline decoration-primary/30">Non-Linear</strong>, kita tidak bisa sekadar menggunakan loop `for i in range`. Kita butuh algoritma khusus untuk mengunjungi setiap node.
                </p>
            </div>
        </div>,

        // Slide 5: Real World Use Cases
        <div key="s5" className="space-y-8 flex flex-col justify-center h-full">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-10 uppercase italic">Aplikasi di Dunia Nyata</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { icon: "folder", title: "File System", desc: "Folder & File." },
                    { icon: "html", title: "DOM Tree", desc: "Struktur Website." },
                    { icon: "account_tree", title: "Organization", desc: "Struktur Organisasi." },
                    { icon: "database", title: "Indexing", desc: "Database (B-Tree)." },
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-surface border-2 border-primary/10 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                        <span className="material-symbols-outlined text-4xl text-primary mb-3">{item.icon}</span>
                        <p className="font-black text-slate-900 dark:text-white uppercase text-sm mb-1">{item.title}</p>
                        <p className="text-[10px] text-slate-500 font-bold italic">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 6: Summary
        <div key="s6" className="space-y-8 h-full flex flex-col justify-center text-center">
            <div className="bg-linear-to-br from-orange-500/20 to-amber-500/20 p-12 rounded-3xl border-4 border-orange-500/30 shadow-2xl relative overflow-hidden">
                <h4 className="text-5xl font-black text-slate-900 dark:text-white mb-10 uppercase italic tracking-tighter decoration-orange-500 decoration-8 underline-offset-8">Ringkasan Materi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {[
                        { label: "Hierarki", desc: "Hubungan Parent-Child." },
                        { label: "BST Rule", desc: "Kiri < Root < Kanan." },
                        { label: "Traversal", desc: "Metode kunjungan node." },
                        { label: "Balance", desc: "Penting untuk performa O(log n)." },
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
            {/* ─── HEADER & PRESENTATION ─── */}
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-orange-500/5 p-8 rounded-3xl border-2 border-orange-500/20 mb-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Mode Presentasi: Tree</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium italic">Klik tombol untuk memulai slide yang mempermudah pemahaman visual.</p>
                    </div>
                    <button
                        onClick={() => openPresentation(0)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center gap-3 active:scale-95 group"
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
                            <div className="bg-orange-500/20 p-2 rounded-lg text-orange-600">
                                <span className="material-symbols-outlined">schema</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">Definisi Tree</h3>
                        </div>
                        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic">
                            Tree adalah struktur data <strong className="text-primary underline decoration-primary/30">Non-Linear</strong> yang merepresentasikan hubungan hierarki. Bayangkan sebuah pohon terbalik, di mana akar (Root) berada di atas dan cabang-cabangnya tumbuh ke bawah.
                        </p>
                        <div className="mt-8 space-y-4">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Karakteristik Utama:</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-surface p-4 rounded-xl border border-primary/10 flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    <p className="text-[11px] font-bold text-slate-500 italic">Hanya ada SATU Root.</p>
                                </div>
                                <div className="bg-white dark:bg-surface p-4 rounded-xl border border-primary/10 flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                    <p className="text-[11px] font-bold text-slate-500 italic">Tidak boleh ada Cycle (lingkaran).</p>
                                </div>
                            </div>
                        </div>
                    </FocusSection>
                    <div className="bg-slate-900 border-4 border-orange-500/20 rounded-3xl p-8 shadow-2xl flex flex-col justify-center">
                        <h4 className="text-orange-400 font-black text-xl mb-6 uppercase tracking-widest text-center">Anatomi Node</h4>
                        <div className="space-y-4">
                            {[
                                { title: "Root", desc: "Simpul awal paling atas." },
                                { title: "Parent", desc: "Simpul yang memiliki simpul di bawahnya." },
                                { title: "Child", desc: "Simpul turunan dari Parent." },
                                { title: "Leaf", desc: "Simpul terakhir yang tidak punya anak." },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                    <span className="w-8 h-8 bg-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center font-black italic">{i + 1}</span>
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

            {/* ─── BAGIAN 2: BINARY SEARCH TREE ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Binary Search Tree</span>
                            <button onClick={() => openPresentation(1)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">info</span> SLIDE 2
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="bg-white dark:bg-surface border-2 border-orange-500/20 rounded-3xl p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="flex-1 space-y-6">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">Kenapa "Binary Search"?</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                BST dirancang untuk mempercepat pencarian. Karena datanya teratur (Kecil di Kiri, Besar di Kanan), kita bisa membuang SETENGAH dari pilihan setiap kali melangkah ke bawah.
                            </p>
                            <div className="bg-primary/5 p-5 rounded-2xl border-l-4 border-primary italic font-bold text-primary text-sm">
                                "Sama seperti Binary Search pada Array, tapi dalam bentuk struktur pohon."
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kompleksitas:</p>
                                <div className="flex gap-4 text-center">
                                    <div className="flex-1 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                                        <p className="text-emerald-600 font-black text-lg leading-none">O(log n)</p>
                                        <p className="text-[8px] text-slate-500 uppercase mt-1">Best/Average</p>
                                    </div>
                                    <div className="flex-1 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                                        <p className="text-rose-600 font-black text-lg leading-none">O(n)</p>
                                        <p className="text-[8px] text-slate-500 uppercase mt-1">Worst Case</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-900 rounded-3xl border-2 border-primary/20 overflow-hidden shadow-2xl">
                            <div className="bg-slate-800 px-6 py-3 flex justify-between border-b border-white/10">
                                <span className="text-slate-400 font-mono text-xs font-black italic">implementation.py</span>
                            </div>
                            <pre className="p-8 text-sm font-mono overflow-auto leading-relaxed">
                                <code>
                                    <span className="text-cyan-400">class</span> <span className="text-blue-400">Node</span>:{"\n"}
                                    {"    "}<span className="text-cyan-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self, key</span>):{"\n"}
                                    {"        "}<span className="text-orange-300">self.left</span> = <span className="text-amber-300">None</span>{"\n"}
                                    {"        "}<span className="text-orange-300">self.right</span> = <span className="text-amber-300">None</span>{"\n"}
                                    {"        "}<span className="text-orange-300">self.val</span> = <span className="text-orange-300">key</span>{"\n"}{"\n"}
                                    <span className="text-slate-400 italic"># Aturan Insertion</span>{"\n"}
                                    <span className="text-cyan-400">def</span> <span className="text-blue-400">insert</span>(<span className="text-orange-300">root, key</span>):{"\n"}
                                    {"    "}<span className="text-cyan-400">if</span> <span className="text-orange-300">root</span> <span className="text-cyan-400">is</span> <span className="text-amber-300">None</span>:{"\n"}
                                    {"        "}<span className="text-cyan-400">return</span> <span className="text-blue-400">Node</span>(<span className="text-orange-300">key</span>){"\n"}
                                    {"    "}<span className="text-cyan-400">if</span> <span className="text-orange-300">key</span> {"<"} <span className="text-orange-300">root.val</span>:{"\n"}
                                    {"        "}<span className="text-orange-300">root.left</span> = <span className="text-blue-400">insert</span>(<span className="text-orange-300">root.left, key</span>){"\n"}
                                    {"    "}<span className="text-cyan-400">else</span>:{"\n"}
                                    {"        "}<span className="text-orange-300">root.right</span> = <span className="text-blue-400">insert</span>(<span className="text-orange-300">root.right, key</span>){"\n"}
                                    {"    "}<span className="text-cyan-400">return</span> <span className="text-orange-300">root</span>
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── BAGIAN 3: INTERACTIVE VISUALIZER ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Simulasi Interaktif</span>
                        </div>
                    </div>
                </ScrollReveal>

                <TreeVisualizer />
                <p className="text-center text-[10px] text-slate-500 font-bold italic">Gunakan simulator di atas untuk memahami bagaimana BST mencari posisi dan menelusuri data.</p>
            </div>

            {/* ─── BAGIAN 4: TRAVERSAL ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Penelusuran (Traversal)</span>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { 
                            title: "Pre-order", 
                            rule: "Root → L → R", 
                            color: "rose", 
                            desc: "Digunakan untuk mengekspor struktur Tree secara lengkap." 
                        },
                        { 
                            title: "In-order", 
                            rule: "L → Root → R", 
                            color: "emerald", 
                            desc: "Sangat spesial pada BST! Hasilnya akan selalu TERURUT (Sorted)." 
                        },
                        { 
                            title: "Post-order", 
                            rule: "L → R → Root", 
                            color: "cyan", 
                            desc: "Dipakai saat ingin menghapus tree (hapus anak dulu baru ortu)." 
                        },
                    ].map((item, i) => (
                        <ScrollReveal key={i}>
                            <div className={`bg-white dark:bg-surface border-b-4 border-${item.color}-500 p-6 rounded-2xl shadow-sm h-full flex flex-col`}>
                                <h4 className={`text-lg font-black text-${item.color}-600 uppercase italic mb-1`}>{item.title}</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{item.rule}</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400 font-bold italic leading-relaxed mb-6 flex-1">
                                    {item.desc}
                                </p>
                                <div className={`bg-${item.color}-500/10 p-3 rounded-xl border border-${item.color}-500/20`}>
                                    <p className="text-[10px] font-mono font-bold text-slate-500">Pola Rekursif:</p>
                                    <p className={`font-mono text-[9px] text-${item.color}-600 font-black mt-1`}>
                                        {i === 0 && "visit(node); traverse(left); traverse(right);"}
                                        {i === 1 && "traverse(left); visit(node); traverse(right);"}
                                        {i === 2 && "traverse(left); traverse(right); visit(node);"}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ─── BAGIAN 5: KESIMPULAN ─── */}
            <ScrollReveal>
                <div className="bg-slate-900 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl text-center">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--color-primary),transparent_70%)] opacity-30"></div>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase italic tracking-tighter">Tree Is Everywhere</h3>
                    <p className="text-xl text-slate-400 font-bold italic max-w-2xl mx-auto mb-12">
                        Memahami Tree adalah gerbang untuk memahami struktur data yang lebih kompleks seperti Graph, AI Decision Trees, dan Database Indexing.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => openPresentation(5)}
                            className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30"
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
