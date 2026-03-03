"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import { motion } from "framer-motion";
import RecursionVisualizer from "./RecursionVisualizer";
import HanoiVisualizer from "./HanoiVisualizer";

export default function Module7Content() {
    return (
        <div className="space-y-16 pb-12">

            {/* ─── BAGIAN 1: APA ITU REKURSI? ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Konsep Rekursi</span>
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
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Struktur Wajib</span>
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
                                        {`def fungsi_rekursif(input):
    if (kondisi_base_case):  # Syarat 1
        return hasil_dasar
    
    # Syarat 2
    return process + fungsi_rekursif(input_baru)`}
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
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Tracing Factorial</span>
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
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Bahaya Rekursi</span>
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
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Level Lanjut (4 SKS)</span>
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
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Studi Kasus Tower of Hanoi</span>
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
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Mana yang Lebih Baik?</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b-2 border-primary/10">
                                    <th className="p-4 text-xs font-black uppercase tracking-widest text-primary">Aspek</th>
                                    <th className="p-4 text-xs font-black uppercase tracking-widest text-emerald-500 text-center">Iterasi (Looping)</th>
                                    <th className="p-4 text-xs font-black uppercase tracking-widest text-violet-500 text-center">Rekursi</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="p-4 font-black text-slate-900 dark:text-white">Implementasi</td>
                                    <td className="p-4 text-center">Menggunakan <code className="text-emerald-500">for</code> atau <code className="text-emerald-500">while</code>.</td>
                                    <td className="p-4 text-center">Fungsi memanggil dirinya sendiri.</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="p-4 font-black text-slate-900 dark:text-white">Memori</td>
                                    <td className="p-4 text-center">Efisien (O(1) extra space).</td>
                                    <td className="p-4 text-center">Kurang efisien (Memakan memori stack).</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="p-4 font-black text-slate-900 dark:text-white">Keterbacaan</td>
                                    <td className="p-4 text-center">Bisa jadi rumit untuk masalah kompleks.</td>
                                    <td className="p-4 text-center font-bold text-violet-500 uppercase">Elegan dan rapi untuk masalah DFS/Tree.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2 px-2">
                        <span className="material-symbols-outlined text-sm text-primary">lightbulb</span>
                        Tips: Gunakan rekursi saat masalah bisa dibagi menjadi sub-masalah identik (seperti Tree Traversal). Gunakan iterasi jika performa adalah prioritas utama.
                    </p>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 6: SELF CHECK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Self-Check & Kuis</span>
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

        </div>
    );
}
