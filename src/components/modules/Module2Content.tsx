"use client";

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import FocusSection from '@/components/FocusSection';

export default function Module2Content() {
    return (
        <div className="space-y-16 pb-12">
            {/* --- BAGIAN 1: URGENSI EFISIENSI --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Urgensi &amp; Analogi</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-amber-500/30 p-2 rounded-lg text-amber-500">
                                    <span className="material-symbols-outlined text-xl">speed</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Kenapa "Bisa Jalan" Saja Tidak Cukup?</h3>
                            </div>

                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <span className="material-symbols-outlined text-8xl">local_shipping</span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    Bayangkan Anda ingin mengirimkan file 1 Terabyte ke teman di seberang kota. Anda punya dua pilihan:
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 relative z-10">
                                    <div className="p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl">
                                        <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">cloud_upload</span>
                                            Opsi A: Kirim via Internet
                                        </h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Waktu pengiriman sangat bergantung pada ukuran file. Semakin besar file, semakin lama waktu yang dibutuhkan.
                                            <br /><span className="inline-block mt-2 font-bold text-slate-900 dark:text-white">(Waktu sebanding dengan N)</span>
                                        </p>
                                    </div>
                                    <div className="p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl">
                                        <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">directions_bike</span>
                                            Opsi B: Kirim via Kurir (Harddisk)
                                        </h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Waktu tempuh kurir tetap sama, mau file 1GB atau 1TB. Kurir hanya peduli jarak tempuh.
                                            <br /><span className="inline-block mt-2 font-bold text-slate-900 dark:text-white">(Waktu Konstan)</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 overflow-hidden rounded-xl border-2 border-slate-300 dark:border-slate-700">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 uppercase font-black tracking-tighter">
                                            <tr>
                                                <th className="px-4 py-3">Ukuran Data (N)</th>
                                                <th className="px-4 py-3">Opsi A (Internet - O(n))</th>
                                                <th className="px-4 py-3">Opsi B (Kurir - O(1))</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-slate-200 dark:divide-slate-700">
                                            <tr>
                                                <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-100">1 Megabyte</td>
                                                <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-bold">2 Detik</td>
                                                <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-bold">1 Jam</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-100">1 Gigabyte</td>
                                                <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-bold">30 Menit</td>
                                                <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-black">1 Jam (Tetap)</td>
                                            </tr>
                                            <tr className="bg-primary/10">
                                                <td className="px-4 py-3 font-mono font-black text-slate-900 dark:text-white">1 Terabyte</td>
                                                <td className="px-4 py-3 text-red-600 dark:text-red-400 font-black">20 Hari (!)</td>
                                                <td className="px-4 py-3 text-emerald-600 dark:text-emerald-300 font-black">1 Jam (Menang!)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-white/10">
                                    <p className="text-sm text-slate-100 italic text-center leading-relaxed font-medium">
                                        "Big O Notation adalah bahasa standar untuk mengukur bagaimana performa algoritma berubah seiring bertambahnya jumlah input (N)."
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* --- BAGIAN 2: VISUALISASI PERTUMBUHAN --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Kurva Pertumbuhan Big O</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 text-lg">
                                    <span className="material-symbols-outlined text-primary">show_chart</span>
                                    The Big O Complexity Chart
                                </h4>

                                <div className="relative h-64 w-full border-l-2 border-b-2 border-slate-400 dark:border-slate-500 mb-4">
                                    {/* SVG Chart Visualization */}
                                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                        {/* O(1) - Constant */}
                                        <line x1="0" y1="90%" x2="100%" y2="90%" stroke="#10b981" strokeWidth="3" />
                                        <text x="100%" y="85%" className="text-[12px] fill-emerald-500 font-bold" textAnchor="end">O(1)</text>

                                        {/* O(log n) - Logarithmic */}
                                        <path d="M 0 250 Q 50 200, 400 180" fill="none" stroke="#06b6d4" strokeWidth="3" />
                                        <text x="100%" y="70%" className="text-[12px] fill-cyan-500 font-bold" textAnchor="end">O(log n)</text>

                                        {/* O(n) - Linear */}
                                        <line x1="0" y1="100%" x2="100%" y2="0%" stroke="#3b82f6" strokeWidth="3" />
                                        <text x="100%" y="10%" className="text-[12px] fill-blue-500 font-bold" textAnchor="end">O(n)</text>

                                        {/* O(n^2) - Quadratic */}
                                        <path d="M 0 256 Q 20 200, 100 0" fill="none" stroke="#ef4444" strokeWidth="3" />
                                        <text x="25%" y="10%" className="text-[12px] fill-red-500 font-bold">O(n²)</text>
                                    </svg>

                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-600 dark:text-slate-300 uppercase tracking-widest font-black">
                                        Jumlah Data (N) →
                                    </div>
                                    <div className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 text-xs text-slate-600 dark:text-slate-300 uppercase tracking-widest font-black">
                                        Waktu / Step →
                                    </div>
                                </div>

                                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
                                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">Amazing</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
                                        <span className="text-sm font-black text-cyan-600 dark:text-cyan-400">Good</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                                        <span className="text-sm font-black text-blue-600 dark:text-blue-400">Fair</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                                        <span className="text-sm font-black text-red-600 dark:text-red-400">Horrible</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* --- BAGIAN 3: KATALOG KOMPLEKSITAS --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Katalog Kompleksitas</span>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid gap-8">
                    {/* O(1) */}
                    <ScrollReveal>
                        <FocusSection>
                            <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-emerald-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-emerald-500/20">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">EXCELLENT</span>
                                            <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 italic">O(1)</h4>
                                        </div>
                                        <h5 className="font-black text-base text-slate-900 dark:text-white mb-2">Constant Time</h5>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Waktu eksekusi TIDAK peduli berapa banyak datanya. Langsung ke sasaran.
                                        </p>
                                    </div>
                                    <div className="md:w-2/3 p-0 bg-slate-900">
                                        <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                            <span className="text-xs text-slate-300 font-mono font-bold">Example: Array Search by Index</span>
                                        </div>
                                        <pre className="p-6 text-sm font-mono">
                                            <code className="text-slate-200">
                                                <span className="text-purple-400">def</span> <span className="text-blue-400">get_first_item</span>(items):<br />
                                                &nbsp;&nbsp;<span className="text-purple-400">return</span> items[<span className="text-amber-300">0</span>] <span className="text-slate-400"># Slalu 1 step</span>
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>
                        </FocusSection>
                    </ScrollReveal>

                    {/* O(log n) */}
                    <ScrollReveal>
                        <FocusSection>
                            <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-cyan-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-cyan-500/20">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-cyan-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">GOOD</span>
                                            <h4 className="text-2xl font-black text-cyan-600 dark:text-cyan-400 italic">O(log n)</h4>
                                        </div>
                                        <h5 className="font-black text-base text-slate-900 dark:text-white mb-2">Logarithmic Time</h5>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                            Setiap langkah membuang SETENGAH dari sisa data. Sangat efisien untuk data raksasa.
                                        </p>
                                        {/* Micro-simulation for O(log n) */}
                                        <div className="space-y-1 mt-4">
                                            <div className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase">Proses Eliminasi:</div>
                                            <div className="flex flex-wrap gap-1">
                                                {[1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1].map((num, i) => (
                                                    <div key={num} className="flex items-center gap-1">
                                                        <span className={`text-xs font-mono font-bold ${i === 0 ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>{num}</span>
                                                        {num !== 1 && <span className="text-xs text-slate-500">→</span>}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-xs text-primary font-black">1024 data hanya butuh 10 langkah!</p>
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 p-0 bg-slate-900">
                                        <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                            <span className="text-xs text-slate-300 font-mono font-bold">Example: Binary Search</span>
                                        </div>
                                        <pre className="p-6 text-sm font-mono">
                                            <code className="text-slate-200">
                                                <span className="text-slate-400"># Menebak angka di range 1-100</span><br />
                                                <span className="text-slate-400"># Tiap langkah range berkurang separuh</span><br />
                                                <span className="text-cyan-400"># 100 → 50 → 25 → 12 → 6 → 3 → 1</span>
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>
                        </FocusSection>
                    </ScrollReveal>

                    {/* O(n) */}
                    <ScrollReveal>
                        <FocusSection>
                            <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-blue-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-blue-500/20">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">FAIR</span>
                                            <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400 italic">O(n)</h4>
                                        </div>
                                        <h5 className="font-black text-base text-slate-900 dark:text-white mb-2">Linear Time</h5>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Waktu eksekusi sebanding dengan jumlah data. 10 data = 10 detik, 100 data = 100 detik.
                                        </p>
                                    </div>
                                    <div className="md:w-2/3 p-0 bg-slate-900">
                                        <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                            <span className="text-xs text-slate-300 font-mono font-bold">Example: Linear Search</span>
                                        </div>
                                        <pre className="p-6 text-sm font-mono">
                                            <code className="text-slate-200">
                                                <span className="text-purple-400">for</span> item <span className="text-purple-400">in</span> items:<br />
                                                &nbsp;&nbsp;<span className="text-blue-400">print</span>(item) <span className="text-slate-400"># N data = N print</span>
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>
                        </FocusSection>
                    </ScrollReveal>

                    {/* O(n^2) */}
                    <ScrollReveal>
                        <FocusSection>
                            <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-red-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-red-500/20">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">POOR / HORRIBLE</span>
                                            <h4 className="text-2xl font-black text-red-600 dark:text-red-400 italic">O(n²)</h4>
                                        </div>
                                        <h5 className="font-black text-base text-slate-900 dark:text-white mb-2">Quadratic Time</h5>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                            Berbahaya! Data bertambah sedikit, waktu meledak. Biasanya terjadi pada nested loop (loop di dalam loop).
                                        </p>
                                        {/* Micro-simulation for O(n^2) */}
                                        <div className="grid grid-cols-5 gap-1 w-24 opacity-70">
                                            {Array.from({ length: 25 }).map((_, i) => (
                                                <div key={i} className="w-3.5 h-3.5 bg-red-500/60 rounded-sm border border-red-500/40"></div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-red-500 dark:text-red-400 mt-2 font-black">N=5 data → 25 Operasi</p>
                                    </div>
                                    <div className="md:w-2/3 p-0 bg-slate-900">
                                        <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                            <span className="text-xs text-slate-300 font-mono font-bold">Example: Nested Loop</span>
                                        </div>
                                        <pre className="p-6 text-sm font-mono">
                                            <code className="text-slate-200">
                                                <span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> data:<br />
                                                &nbsp;&nbsp;<span className="text-purple-400">for</span> y <span className="text-purple-400">in</span> data:<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">print</span>(x, y) <span className="text-slate-400"># N * N operation</span>
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </section>
                        </FocusSection>
                    </ScrollReveal>
                </div>
            </div>

            {/* --- BAGIAN 4: ATURAN MAIN --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Rule of Thumb</span>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-6">
                    <ScrollReveal>
                        <FocusSection>
                            <div className="bg-indigo-500/10 border-2 border-indigo-500/30 p-6 rounded-2xl shadow-xs h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-2xl">filter_list</span>
                                    <h4 className="font-black text-lg text-slate-900 dark:text-white">Drop the Constants</h4>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-medium">
                                    Kita hanya peduli pada skala besar. O(2n) atau O(50n) tetap ditulis sebagai <strong className="text-slate-900 dark:text-white">O(n)</strong>.
                                </p>
                                <div className="bg-slate-900 p-3 rounded-lg font-mono text-sm text-center border border-white/10">
                                    <span className="text-slate-400 line-through">O(2n)</span>
                                    <span className="text-emerald-400 font-bold"> → O(n)</span>
                                </div>
                            </div>
                        </FocusSection>
                    </ScrollReveal>

                    <ScrollReveal>
                        <FocusSection>
                            <div className="bg-amber-500/10 border-2 border-amber-500/30 p-6 rounded-2xl shadow-xs h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-2xl">vertical_align_top</span>
                                    <h4 className="font-black text-lg text-slate-900 dark:text-white">Keep Highest Order</h4>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-medium">
                                    Ambil suku yang paling mendominasi. Jika ada O(n² + n + 1), maka kita ambil yang terberat: <strong className="text-slate-900 dark:text-white">O(n²)</strong>.
                                </p>
                                <div className="bg-slate-900 p-3 rounded-lg font-mono text-sm text-center relative overflow-hidden border border-white/10">
                                    <span className="text-emerald-400 font-bold">O(n² + n) → O(n²)</span>
                                </div>
                            </div>
                        </FocusSection>
                    </ScrollReveal>
                </div>
            </div>

            {/* --- BAGIAN 5: BEST VS WORST CASE --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Skenario Performa</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-8 shadow-sm">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6">Kapan Algoritma Melambat?</h4>
                            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                <div className="p-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 text-center">
                                    <div className="text-emerald-600 dark:text-emerald-400 font-black text-2xl mb-1">Ω Omega</div>
                                    <div className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tighter mb-2">Best Case</div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-tight font-medium">Keberuntungan maksimal. Misalnya mencari 'A' dan 'A' ada di index pertama.</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-center">
                                    <div className="text-amber-600 dark:text-amber-400 font-black text-2xl mb-1">θ Theta</div>
                                    <div className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tighter mb-2">Average Case</div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-tight font-medium">Kondisi rata-rata yang paling sering dihadapi di dunia nyata.</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-red-500/10 border-2 border-red-500/30 text-center scale-105 shadow-lg shadow-red-500/10 ring-2 ring-red-500/40">
                                    <div className="text-red-600 dark:text-red-400 font-black text-2xl mb-1">O Big O</div>
                                    <div className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tighter mb-2">Worst Case</div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-tight font-black italic">Batas atas (Upper Bound). Fokus utama kita karena ini adalah "Jaminan Keamanan".</p>
                                </div>
                            </div>

                            {/* Code Scenario for Linear Search */}
                            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
                                <div className="bg-slate-800 px-4 py-3 border-b border-white/10">
                                    <span className="text-xs font-black text-slate-200 uppercase tracking-widest">Contoh Realistis: Linear Search</span>
                                </div>
                                <pre className="p-6 text-sm font-mono">
                                    <code className="text-slate-200">
                                        <span className="text-purple-400">def</span> <span className="text-blue-400">find_box</span>(boxes, target_color):<br />
                                        &nbsp;&nbsp;<span className="text-purple-400">for</span> box <span className="text-purple-400">in</span> boxes:<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> box.color == target_color:<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-amber-300">True</span> <span className="text-emerald-400"># Ω: Box pertama!</span><br />
                                        &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-amber-300">False</span> <span className="text-red-400"># Big O: Cek SEMUA data</span>
                                    </code>
                                </pre>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* --- BAGIAN 6: SIMULASI PERBANDINGAN --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Simulasi Nyata</span>
                        </div>
                    </div>
                </ScrollReveal>

                <section className="space-y-6">
                    <ScrollReveal>
                        <FocusSection>
                            <div className="bg-slate-900 rounded-3xl p-8 overflow-hidden relative group border border-white/10">
                                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>

                                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                                    <div className="flex-1 space-y-4">
                                        <h4 className="text-xl font-black text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined text-amber-400">compare_arrows</span>
                                            Mencari Duplikat dalam List
                                        </h4>
                                        <p className="text-base text-slate-300 leading-relaxed italic font-medium">
                                            "Kita punya 10.000 data. Mana yang lebih baik?"
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-center">
                                            <div className="text-white font-black text-lg">10k</div>
                                            <div className="text-xs text-slate-400 uppercase font-bold">Input (N)</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end px-2">
                                            <span className="text-sm font-black text-red-400">Metode: Brute Force</span>
                                            <span className="text-sm font-mono text-red-400/80 font-bold">O(n²)</span>
                                        </div>
                                        <div className="bg-black/40 rounded-2xl p-4 border-2 border-red-500/40">
                                            <div className="text-sm text-slate-300 mb-2 font-medium">Nested Loop: Cek setiap pasang data satu per satu.</div>
                                            <div className="text-2xl font-black text-white">100.000.000</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-tighter font-bold">Operasi Langkah</div>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 w-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end px-2">
                                            <span className="text-sm font-black text-emerald-400">Metode: Hash Set</span>
                                            <span className="text-sm font-mono text-emerald-400/80 font-bold">O(n)</span>
                                        </div>
                                        <div className="bg-black/40 rounded-2xl p-4 border-2 border-emerald-500/40">
                                            <div className="text-sm text-slate-300 mb-2 font-medium">Single Loop: Langsung simpan data unik di memori.</div>
                                            <div className="text-2xl font-black text-white">10.000</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-tighter font-bold">Operasi Langkah</div>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[5%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
                                    <div className="flex items-center gap-4 text-slate-200">
                                        <span className="material-symbols-outlined text-primary text-xl">info</span>
                                        <p className="text-sm leading-relaxed font-medium">
                                            <strong className="text-white">Kesimpulan:</strong> Menggunakan algoritma yang tepat (O(n)) membuat komputer bekerja <strong className="text-emerald-400">10.000x lebih santai</strong> dibanding Brute Force (O(n²)).
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-blue-500/15 border-2 border-blue-500/30">
                                        <h5 className="text-sm font-black text-blue-300 uppercase mb-1">💡 Pro-Tip: Kapan O(n²) Boleh Digunakan?</h5>
                                        <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                            O(n²) tidak selalu buruk jika <strong className="text-white">jumlah data sangat sedikit</strong> (misal N &lt; 10). Terkadang kode O(n²) lebih mudah dibaca dan dipelihara daripada algoritma O(n) yang sangat kompleks. Konteks itu penting!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FocusSection>
                    </ScrollReveal>
                </section>
            </div>

            {/* --- SPACE VS TIME --- */}
            <ScrollReveal threshold={0.5}>
                <FocusSection>
                    <div className="mt-16 bg-linear-to-r from-primary/15 to-indigo-500/15 border-2 border-primary/30 p-8 rounded-3xl">
                        <div className="max-w-xl mx-auto text-center">
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Space vs Time Complexity ⚖️</h4>
                            <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                Kadang kita bisa membuat algoritma lebih cepat (Save Time) dengan menggunakan memori lebih banyak (Extra Space).
                                Ini dikenal dengan sebutan <strong className="text-slate-900 dark:text-white">Time-Space Tradeoff</strong>.
                            </p>
                            <div className="mt-6 flex justify-center gap-8">
                                <div className="flex flex-col items-center">
                                    <span className="material-symbols-outlined text-primary mb-2 text-3xl">schedule</span>
                                    <span className="text-sm uppercase font-black text-slate-700 dark:text-slate-200">Time Complexity</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="material-symbols-outlined text-primary mb-2 text-3xl">database</span>
                                    <span className="text-sm uppercase font-black text-slate-700 dark:text-slate-200">Space Complexity</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FocusSection>
            </ScrollReveal>

            {/* --- BAGIAN 7: LATIHAN MANDIRI --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 7: Latihan Mandiri</span>
                        </div>
                    </div>
                </ScrollReveal>

                <section className="space-y-8">
                    <ScrollReveal>
                        <div className="text-center max-w-lg mx-auto mb-8">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Uji Pemahamanmu! 🧠</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                Coba tebak kompleksitas waktu (Big O) dari potongan kode di bawah ini sebelum melihat jawabannya.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid gap-6">
                        {/* Latihan 1 */}
                        <ScrollReveal>
                            <FocusSection>
                                <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-primary/20 text-primary text-xs font-black px-3 py-1 rounded-lg">LATIHAN #1</span>
                                    </div>
                                    <pre className="p-4 bg-slate-900 rounded-xl text-sm font-mono mb-6 border border-white/10">
                                        <code className="text-slate-200">
                                            <span className="text-purple-400">def</span> <span className="text-blue-400">print_triple</span>(data):<br />
                                            &nbsp;&nbsp;<span className="text-blue-400">print</span>(data[<span className="text-amber-300">0</span>])<br />
                                            &nbsp;&nbsp;<span className="text-blue-400">print</span>(data[<span className="text-amber-300">0</span>])<br />
                                            &nbsp;&nbsp;<span className="text-blue-400">print</span>(data[<span className="text-amber-300">0</span>])
                                        </code>
                                    </pre>
                                    <details className="group cursor-pointer">
                                        <summary className="flex items-center gap-2 text-sm font-black text-primary hover:text-primary/70 transition-colors list-none">
                                            <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                                            Lihat Jawaban
                                        </summary>
                                        <div className="mt-4 p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl animate-in slide-in-from-top-2 duration-300">
                                            <div className="text-emerald-600 dark:text-emerald-400 font-black text-base mb-1">O(1) - Constant</div>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                                Meskipun ada 3 kali print, langkahnya tetap sama berapapun ukuran data (N). Di Big O, O(3) disederhanakan menjadi <strong className="text-slate-900 dark:text-white">O(1)</strong>.
                                            </p>
                                        </div>
                                    </details>
                                </div>
                            </FocusSection>
                        </ScrollReveal>

                        {/* Latihan 2 */}
                        <ScrollReveal>
                            <FocusSection>
                                <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-primary/20 text-primary text-xs font-black px-3 py-1 rounded-lg">LATIHAN #2</span>
                                    </div>
                                    <pre className="p-4 bg-slate-900 rounded-xl text-sm font-mono mb-6 border border-white/10">
                                        <code className="text-slate-200">
                                            <span className="text-purple-400">for</span> item <span className="text-purple-400">in</span> data:<br />
                                            &nbsp;&nbsp;<span className="text-blue-400">print</span>(item)<br />
                                            <span className="text-purple-400">for</span> item <span className="text-purple-400">in</span> data:<br />
                                            &nbsp;&nbsp;<span className="text-blue-400">print</span>(item)
                                        </code>
                                    </pre>
                                    <details className="group cursor-pointer">
                                        <summary className="flex items-center gap-2 text-sm font-black text-primary hover:text-primary/70 transition-colors list-none">
                                            <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                                            Lihat Jawaban
                                        </summary>
                                        <div className="mt-4 p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl animate-in slide-in-from-top-2 duration-300">
                                            <div className="text-emerald-600 dark:text-emerald-400 font-black text-base mb-1">O(n) - Linear</div>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                                Ini adalah O(n + n) = O(2n). Ingat aturan <strong className="text-slate-900 dark:text-white">Drop the Constants</strong>, maka kita sederhanakan menjadi <strong className="text-slate-900 dark:text-white">O(n)</strong>.
                                            </p>
                                        </div>
                                    </details>
                                </div>
                            </FocusSection>
                        </ScrollReveal>

                        {/* Latihan 3 */}
                        <ScrollReveal>
                            <FocusSection>
                                <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-primary/20 text-primary text-xs font-black px-3 py-1 rounded-lg">LATIHAN #3</span>
                                    </div>
                                    <pre className="p-4 bg-slate-900 rounded-xl text-sm font-mono mb-6 border border-white/10">
                                        <code className="text-slate-200">
                                            <span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> range(len(data)):<br />
                                            &nbsp;&nbsp;<span className="text-purple-400">for</span> j <span className="text-purple-400">in</span> range(<span className="text-amber-300">10</span>):<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">print</span>(data[i])
                                        </code>
                                    </pre>
                                    <details className="group cursor-pointer">
                                        <summary className="flex items-center gap-2 text-sm font-black text-primary hover:text-primary/70 transition-colors list-none">
                                            <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                                            Lihat Jawaban
                                        </summary>
                                        <div className="mt-4 p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl animate-in slide-in-from-top-2 duration-300">
                                            <div className="text-emerald-600 dark:text-emerald-400 font-black text-base mb-1">O(n) - Linear</div>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                                Hati-hati! Meskipun nested, loop dalam hanya berjalan <strong className="text-slate-900 dark:text-white">10 kali (Konstan)</strong>, bukan N kali. Maka O(n * 10) = <strong className="text-slate-900 dark:text-white">O(n)</strong>.
                                            </p>
                                        </div>
                                    </details>
                                </div>
                            </FocusSection>
                        </ScrollReveal>
                    </div>
                </section>
            </div>
        </div>
    );
}
