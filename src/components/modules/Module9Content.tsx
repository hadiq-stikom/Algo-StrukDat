"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import { motion } from "framer-motion";
import PresentationMode from "@/components/PresentationMode";
import AVLVisualizer from "./AVLVisualizer";

export default function Module9Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const slides = [
        // Slide 1: Batasan BST & Masalah Skewed Tree
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-pink-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-pink-500/20 shadow-2xl text-pink-600">
                <span className="material-symbols-outlined text-5xl">forest</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Batasan BST & Skewed Tree</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                Mengapa Binary Search Tree biasa bisa berubah menjadi lambat seperti <strong className="text-pink-600 underline decoration-pink-500/30">Linked List</strong>?
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white dark:bg-surface border-4 border-pink-500/15 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center">
                    <p className="text-xl font-black text-pink-700 dark:text-pink-400 uppercase mb-4">Pohon Skewed (Miring) 📉</p>
                    <div className="relative w-full h-32 flex justify-center items-center">
                        {/* Skewed Tree nodes diagram */}
                        <div className="relative w-40 h-full flex flex-col justify-between items-center">
                            <div className="w-10 h-10 bg-slate-400 text-white font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">10</div>
                            <div className="w-6 h-1.5 bg-slate-350 transform rotate-45 my-1"></div>
                            <div className="w-10 h-10 bg-slate-400 text-white font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">20</div>
                            <div className="w-6 h-1.5 bg-slate-350 transform rotate-45 my-1"></div>
                            <div className="w-10 h-10 bg-slate-400 text-white font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">30</div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 italic mt-6">Input Terurut (10, 20, 30) ➔ Tree Lurus ke Kanan ➔ O(n)</p>
                </div>

                <div className="bg-slate-900 p-8 rounded-3xl border-4 border-pink-500/20 shadow-2xl text-left flex flex-col justify-center">
                    <p className="text-pink-400 font-black text-xl mb-6 uppercase tracking-widest text-center">Dampak Kasus Terburuk (Worst Case):</p>
                    <ul className="space-y-4">
                        {[
                            { icon: "warning", title: "Pencarian Melambat", desc: "Kompleksitas melonjak dari O(log n) ke O(n)." },
                            { icon: "layers_clear", title: "Degradasi Struktur", desc: "Operasi tree kehilangan keunggulannya dibanding array biasa." },
                            { icon: "height", title: "Tinggi Maksimum", desc: "Tinggi tree sama dengan jumlah total simpul (N)." },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4">
                                <span className="material-symbols-outlined text-pink-500 text-2xl">{item.icon}</span>
                                <div>
                                    <p className="font-black text-slate-100 uppercase text-sm">{item.title}</p>
                                    <p className="text-slate-400 text-xs font-bold italic">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>,

        // Slide 2: Konsep Self-Balancing & AVL Tree
        <div key="s2" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Self-Balancing & AVL Tree</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-surface border-4 border-pink-500/15 rounded-3xl p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <h4 className="text-2xl font-black text-pink-600 uppercase mb-6 italic tracking-tight">Aturan Keseimbangan AVL:</h4>
                    <ul className="space-y-6">
                        <li className="flex gap-4 items-start">
                            <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-black shrink-0">1</span>
                            <div>
                                <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">
                                    Faktor Keseimbangan (Balance Factor / BF):
                                </p>
                                <code className="bg-slate-100 dark:bg-slate-800 text-pink-600 font-mono text-sm px-2 py-1 rounded block mt-1 w-fit">
                                    BF = Tinggi(Kiri) - Tinggi(Kanan)
                                </code>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-black shrink-0">2</span>
                            <div>
                                <p className="text-lg font-bold text-slate-700 dark:text-slate-300 italic">
                                    Nilai Toleransi BF:
                                </p>
                                <p className="text-sm text-slate-500 italic mt-1">
                                    Setiap node harus memiliki BF bernilai <strong className="text-pink-600 font-mono">-1, 0, atau +1</strong>. Jika BF mencapai <strong className="text-rose-500">+2 atau -2</strong>, rotasi penyeimbang akan segera dipicu.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-pink-500/20 shadow-2xl flex flex-col justify-center">
                    <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-white/10">
                        <span className="text-slate-400 font-mono text-xs font-bold italic">avl_node.py</span>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-slate-300">
                        <code>
                            <span className="text-cyan-400">def</span> <span className="text-blue-400">get_balance_factor</span>(<span className="text-orange-300">node</span>):{"\n"}
                            {"    "}<span className="text-cyan-400">if not</span> <span className="text-orange-300">node</span>:{"\n"}
                            {"        "}<span className="text-cyan-400">return</span> <span className="text-amber-300">0</span>{"\n"}
                            {"    "}<span className="text-cyan-400">return</span> <span className="text-blue-400">get_height</span>(<span className="text-orange-300">node.left</span>) - <span className="text-blue-400">get_height</span>(<span className="text-orange-300">node.right</span>){"\n"}{"\n"}
                            <span className="text-slate-450 italic"># Kondisi Kritis</span>{"\n"}
                            <span className="text-cyan-400">if</span> <span className="text-blue-400">abs</span>(<span className="text-blue-400">get_balance_factor</span>(<span className="text-orange-300">node</span>)) {">"} <span className="text-amber-300">1</span>:{"\n"}
                            {"    "}<span className="text-pink-400">trigger_rotation</span>(<span className="text-orange-300">node</span>)
                        </code>
                    </pre>
                </div>
            </div>
        </div>,

        // Slide 3: Interactive Visualizer
        <div key="s3" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic text-center">Simulator BST & AVL</h3>
            <div className="w-full max-w-6xl">
                <AVLVisualizer />
            </div>
        </div>,

        // Slide 4: Empat Jenis Rotasi
        <div key="s4" className="space-y-6">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-2 uppercase italic tracking-wider">4 Jenis Rotasi AVL</h3>
            <p className="text-center text-sm text-slate-500 italic max-w-2xl mx-auto mb-6">
                Cara AVL menggerakkan sub-pohon untuk mengembalikan kedalaman seimbang.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { name: "Left-Left (LL)", type: "Single Right", color: "bg-pink-500", desc: "Garis lurus miring kiri. Rotasikan node bermasalah ke kanan." },
                    { name: "Right-Right (RR)", type: "Single Left", color: "bg-purple-500", desc: "Garis lurus miring kanan. Rotasikan node bermasalah ke kiri." },
                    { name: "Left-Right (LR)", type: "Double Rotation", color: "bg-amber-500", desc: "Zig-zag kiri-kanan. Luruskan anak ke kiri dulu, lalu rotasikan root ke kanan." },
                    { name: "Right-Left (RL)", type: "Double Rotation", color: "bg-emerald-500", desc: "Zig-zag kanan-kiri. Luruskan anak ke kanan dulu, lalu rotasikan root ke kiri." },
                ].map((t, i) => (
                    <div key={i} className="bg-white dark:bg-surface border-4 border-slate-100 dark:border-slate-850 p-6 rounded-2xl shadow-xl text-center flex flex-col justify-between group hover:scale-103 transition-transform">
                        <div>
                            <div className={`${t.color} text-white font-black py-1 px-4 rounded-lg text-xs mb-3 inline-block shadow-md`}>
                                {t.name}
                            </div>
                            <p className="font-mono text-sm font-black text-slate-700 dark:text-slate-350 italic mb-2">
                                {t.type}
                            </p>
                            <p className="text-2xs text-slate-500 leading-normal font-bold italic">
                                {t.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-pink-500/5 p-6 rounded-2xl border-2 border-pink-500/25 mt-6 max-w-3xl mx-auto">
                <h5 className="font-black text-pink-650 dark:text-pink-400 uppercase text-sm mb-2 text-center tracking-widest">Aturan Mutlak Rotasi:</h5>
                <p className="text-xs text-slate-600 dark:text-slate-405 text-center leading-relaxed font-bold italic">
                    Rotasi mempertahankan urutan penelusuran (In-Order Traversal)! Urutan kunci data di sub-pohon kiri tetap lebih kecil, dan sub-pohon kanan tetap lebih besar setelah berputar.
                </p>
            </div>
        </div>,

        // Slide 5: BST Deletion Cases
        <div key="s5" className="space-y-6">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Kasus Penghapusan Node BST</h3>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    {
                        step: "Kasus 1",
                        title: "Leaf Node (0 Anak)",
                        desc: "Simpul target diputus langsung dari parent-nya. Tidak memerlukan pergeseran node lain.",
                        eg: "Hapus simpul ujung paling bawah.",
                        color: "border-pink-500/30"
                    },
                    {
                        step: "Kasus 2",
                        title: "Memiliki 1 Anak",
                        desc: "Parent dari node yang dihapus langsung dihubungkan ke anak dari node tersebut (bypass/pintasan).",
                        eg: "Node target bertindak sebagai jembatan tunggal.",
                        color: "border-purple-500/30"
                    },
                    {
                        step: "Kasus 3",
                        title: "Memiliki 2 Anak",
                        desc: "Temukan Inorder Successor (nilai terkecil di kanan). Salin nilainya ke target, lalu hapus Successor asli.",
                        eg: "Suksesor dijamin memiliki maksimal 1 anak.",
                        color: "border-emerald-500/30"
                    }
                ].map((c, i) => (
                    <div key={i} className={`bg-white dark:bg-surface border-2 ${c.color} p-6 rounded-2xl shadow-xl flex flex-col justify-between`}>
                        <div>
                            <span className="text-[10px] font-black uppercase text-pink-500 tracking-widest block mb-1">{c.step}</span>
                            <h4 className="text-base font-black text-slate-900 dark:text-white mb-3 uppercase italic">{c.title}</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal mb-4 font-medium italic">{c.desc}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-black/5 text-center text-3xs font-bold text-slate-400">
                            {c.eg}
                        </div>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 6: Summary & Quiz
        <div key="s6" className="space-y-8 h-full flex flex-col justify-center text-center">
            <div className="bg-linear-to-br from-pink-500/10 to-purple-500/10 p-10 md:p-14 rounded-3xl border-4 border-pink-500/25 shadow-2xl relative overflow-hidden">
                <h4 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 uppercase italic tracking-tighter decoration-pink-500 decoration-8 underline-offset-8">Ringkasan Modul</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                    {[
                        { label: "Skewed Tree", desc: "Masalah BST miring akibat data terurut." },
                        { label: "AVL Tree", desc: "BST seimbang otomatis menggunakan tinggi node." },
                        { label: "Balance Factor", desc: "Tinggi Subtree Kiri - Kanan (harus -1, 0, 1)." },
                        { label: "Rotasi & Deletion", desc: "LL, RR, LR, RL, dan 3 kasus pembersihan simpul." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white/60 dark:bg-slate-900/60 rounded-xl border-2 border-pink-500/10">
                            <span className="material-symbols-outlined text-3xl text-pink-500 font-black">verified</span>
                            <div>
                                <p className="font-black text-base text-slate-900 dark:text-white uppercase leading-none mb-1">{item.label}</p>
                                <p className="text-slate-500 text-2xs font-bold italic">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-10 text-xl font-black text-pink-500 uppercase tracking-[0.25em] font-mono animate-pulse">Module 9 Complete</p>
            </div>
        </div>
    ];

    return (
        <div className="space-y-16 pb-12">
            {/* --- HEADER & PRESENTATION TRIGGER --- */}
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-pink-500/5 p-8 rounded-3xl border-2 border-pink-500/15 mb-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Mode Presentasi: Advanced Tree</h2>
                        <p className="text-xs text-slate-655 dark:text-slate-400 font-medium italic">Klik tombol untuk memulai pemaparan slide lengkap mengenai AVL Tree & Rotasinya.</p>
                    </div>
                    <button
                        onClick={() => openPresentation(0)}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-black px-8 py-3.5 rounded-2xl shadow-xl shadow-pink-500/20 transition-all flex items-center gap-2 active:scale-95 group text-sm"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">present_to_all</span>
                        MULAI PRESENTASI
                    </button>
                </div>

                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-pink-500/20"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-pink-600 border-x-2 border-pink-500/20">Bagian 1: Masalah Skewed Tree</span>
                            <button
                                onClick={() => openPresentation(0)}
                                className="bg-pink-500/10 hover:bg-pink-500/20 text-pink-650 text-3xs font-black px-3 py-1 rounded-full transition-colors flex items-center gap-0.5"
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
                            <div className="bg-pink-500/20 p-2 rounded-lg text-pink-650">
                                <span className="material-symbols-outlined">warning</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic">Batasan BST Biasa</h3>
                        </div>
                        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-350 font-medium italic">
                            Ketika kita memasukkan data yang sudah terurut ke dalam BST, pohon akan tumbuh secara linier (searah). Node baru selalu dimasukkan ke sisi yang sama, menghasilkan kedalaman yang tidak seimbang. Ini disebut sebagai <strong className="text-pink-650 underline decoration-pink-500/30">Skewed Tree</strong>.
                        </p>
                        <div className="mt-8 space-y-4">
                            <p className="text-2xs font-black text-slate-400 uppercase tracking-widest">Masalah Utama:</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-surface p-4 rounded-xl border border-pink-500/10 flex items-start gap-3">
                                    <span className="material-symbols-outlined text-pink-500 text-base">close</span>
                                    <p className="text-3xs font-bold text-slate-500 italic">Pencarian O(log n) berantakan menjadi O(n).</p>
                                </div>
                                <div className="bg-white dark:bg-surface p-4 rounded-xl border border-pink-500/10 flex items-start gap-3">
                                    <span className="material-symbols-outlined text-pink-500 text-base">close</span>
                                    <p className="text-3xs font-bold text-slate-500 italic">Memakan memori tumpukan call stack besar.</p>
                                </div>
                            </div>
                        </div>
                    </FocusSection>

                    <div className="bg-slate-900 border-4 border-pink-500/15 rounded-3xl p-8 shadow-2xl flex flex-col justify-center">
                        <h4 className="text-pink-400 font-black text-base mb-6 uppercase tracking-widest text-center">Kenapa Butuh Balanced Tree?</h4>
                        <div className="space-y-4">
                            {[
                                { title: "Kecepatan Konstan", desc: "Menjamin pencarian, penyisipan, dan penghapusan selalu O(log n)." },
                                { title: "Optimalisasi Memori", desc: "Membatasi tinggi pohon seminimal mungkin." },
                                { title: "Penyeimbangan Mandiri", desc: "Mendeteksi secara otomatis kapan struktur harus digeser (diputar)." },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                                    <span className="w-7 h-7 bg-pink-500/20 text-pink-400 rounded-lg flex items-center justify-center font-black text-xs italic">{i + 1}</span>
                                    <div>
                                        <p className="text-white font-black uppercase text-xs leading-none mb-1">{item.title}</p>
                                        <p className="text-slate-400 text-3xs font-bold italic">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN 2: AVL TREE & BALANCE FACTOR --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-pink-500/20"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-pink-650 border-x-2 border-pink-500/20">Bagian 2: Konsep AVL & Balance Factor</span>
                            <button onClick={() => openPresentation(1)} className="bg-pink-500/10 hover:bg-pink-500/20 text-pink-650 text-3xs font-black px-3 py-1 rounded-full transition-colors flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-xs">info</span> SLIDE 2
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="bg-white dark:bg-surface border-2 border-pink-500/10 rounded-3xl p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 space-y-6 flex flex-col justify-center">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic">Menghitung Balance Factor (BF)</h3>
                            <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-semibold italic">
                                AVL Tree dinamakan berdasarkan penemunya, Adelson-Velsky dan Landis. Di AVL Tree, setiap simpul menyimpan data tinggi. Balance factor (BF) dihitung pada setiap simpul untuk memastikan kestabilan struktur.
                            </p>
                            <div className="bg-pink-500/5 p-4 rounded-xl border-l-4 border-pink-500 italic font-bold text-pink-700 dark:text-pink-400 text-xs">
                                "Pohon dianggap TIDAK SEIMBANG jika BF di suatu node mencapai +2 atau -2. Saat itulah fungsi rotasi dipanggil."
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rumus Kunci:</p>
                                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-black/5 text-center">
                                    <code className="text-xs font-mono font-black text-pink-600">Balance Factor = Height(LeftSubtree) - Height(RightSubtree)</code>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-900 rounded-3xl border-2 border-pink-500/10 overflow-hidden shadow-xl flex flex-col justify-center">
                            <div className="bg-slate-800 px-5 py-2 flex justify-between border-b border-white/10">
                                <span className="text-slate-400 font-mono text-xs font-black italic">avl_balancing.cpp</span>
                            </div>
                            <pre className="p-6 text-2xs font-mono overflow-auto leading-relaxed text-slate-350">
                                <code>
                                    <span className="text-slate-450 italic">// Struktur Node AVL</span>{"\n"}
                                    <span className="text-cyan-400">struct</span> <span className="text-blue-400">Node</span> {"{"}{"\n"}
                                    {"    "}<span className="text-cyan-400">int</span> key;{"\n"}
                                    {"    "}<span className="text-blue-400">Node</span>* left;{"\n"}
                                    {"    "}<span className="text-blue-400">Node</span>* right;{"\n"}
                                    {"    "}<span className="text-cyan-400">int</span> height;{"\n"}
                                    {"}"};{"\n"}{"\n"}
                                    <span className="text-slate-450 italic">// Cek tinggi node</span>{"\n"}
                                    <span className="text-cyan-400">int</span> <span className="text-blue-400">getHeight</span>(<span className="text-blue-400">Node</span>* n) {"{"}{"\n"}
                                    {"    "}<span className="text-cyan-400">if</span> (n == nullptr) <span className="text-cyan-400">return</span> <span className="text-amber-305">0</span>;{"\n"}
                                    {"    "}<span className="text-cyan-400">return</span> n-&gt;height;{"\n"}
                                    {"}"}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN 3: INTERACTIVE VISUALIZER --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-pink-500/20"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-pink-650 border-x-2 border-pink-500/20">Bagian 3: Simulasi Interaktif</span>
                        </div>
                    </div>
                </ScrollReveal>

                <AVLVisualizer />
                <p className="text-center text-[11px] text-slate-500 font-bold italic">Gunakan simulator di atas untuk bereksperimen dengan mode BST vs AVL, simulasi rotasi LL/RR/LR/RL, dan 3 metode Deletion.</p>
            </div>

            {/* --- BAGIAN 4: ROTATIONS DEEP-DIVE --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-pink-500/20"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-pink-650 border-x-2 border-pink-500/20">Bagian 4: Penjelasan 4 Rotasi AVL</span>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Rotasi LL (Left-Left)",
                            subtitle: "Single Right Rotation",
                            desc: "Terjadi ketika node baru ditambahkan ke subtree kiri dari anak kiri node yang tidak seimbang. Untuk memperbaikinya, lakukan satu kali putaran ke kanan.",
                            logic: "Node.left menjadi parent baru, parent lama turun ke kanan.",
                            color: "pink"
                        },
                        {
                            title: "Rotasi RR (Right-Right)",
                            subtitle: "Single Left Rotation",
                            desc: "Terjadi ketika node baru ditambahkan ke subtree kanan dari anak kanan node yang tidak seimbang. Untuk memperbaikinya, lakukan satu kali putaran ke kiri.",
                            logic: "Node.right menjadi parent baru, parent lama turun ke kiri.",
                            color: "purple"
                        },
                        {
                            title: "Rotasi LR (Left-Right)",
                            subtitle: "Double Rotation (Left then Right)",
                            desc: "Terjadi ketika node baru ditambahkan ke subtree kanan dari anak kiri node yang tidak seimbang. Bentuknya berzig-zag. Pertama, lakukan rotasi kiri pada anak kiri, lalu rotasi kanan pada root.",
                            logic: "Luruskan subtree kiri ke arah kiri luar, lalu putar penuh ke kanan.",
                            color: "amber"
                        },
                        {
                            title: "Rotasi RL (Right-Left)",
                            subtitle: "Double Rotation (Right then Left)",
                            desc: "Terjadi ketika node baru ditambahkan ke subtree kiri dari anak kanan node yang tidak seimbang. Bentuknya berzig-zag. Pertama, lakukan rotasi kanan pada anak kanan, lalu rotasi kiri pada root.",
                            logic: "Luruskan subtree kanan ke arah kanan luar, lalu putar penuh ke kiri.",
                            color: "emerald"
                        }
                    ].map((item, idx) => (
                        <ScrollReveal key={idx}>
                            <div className={`bg-white dark:bg-surface border-t-4 border-${item.color}-500 p-6 rounded-2xl shadow-sm h-full flex flex-col justify-between`}>
                                <div>
                                    <h4 className="text-base font-black text-slate-900 dark:text-white uppercase italic leading-none mb-1">{item.title}</h4>
                                    <span className={`text-[10px] font-black text-${item.color}-600 dark:text-${item.color}-400 uppercase tracking-widest block mb-4`}>{item.subtitle}</span>
                                    <p className="text-xs text-slate-650 dark:text-slate-400 font-medium italic leading-relaxed mb-6">{item.desc}</p>
                                </div>
                                <div className={`bg-${item.color}-500/10 p-3.5 rounded-xl border border-${item.color}-500/20`}>
                                    <p className="text-[10px] font-mono font-bold text-slate-500">Konsep Perubahan:</p>
                                    <p className={`font-mono text-3xs font-black mt-1 text-${item.color}-700 dark:text-${item.color}-300`}>
                                        {item.logic}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* --- BAGIAN 5: KESIMPULAN --- */}
            <ScrollReveal>
                <div className="bg-slate-900 rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl text-center border-4 border-pink-500/15">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--color-pink-550),transparent_70%)] opacity-20"></div>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">O(log n) Guarantees</h3>
                    <p className="text-base text-slate-400 font-bold italic max-w-2xl mx-auto mb-10 leading-relaxed">
                        Dengan menerapkan penyeimbangan dinamis AVL, kita menjamin seluruh operasi pencarian data tetap berkecepatan tinggi, tidak peduli seberapa berantakan data masukan yang dikirim oleh user.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => openPresentation(5)}
                            className="px-8 py-3.5 bg-pink-500 text-white rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pink-500/25"
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
