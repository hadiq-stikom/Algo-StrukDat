"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import BubbleSortVisualizer from "./BubbleSortVisualizer";
import SelectionSortVisualizer from "./SelectionSortVisualizer";

export default function Module3Content() {
    const bubbleTraceData = [
        { pass: "Pass 1", arr: ["64", "34", "25", "12", "22"], swap: "64↔34, 64↔25, 64↔12, 64↔22", swapCount: 4, result: "34, 25, 12, 22, 64" },
        { pass: "Pass 2", arr: ["34", "25", "12", "22", "64"], swap: "34↔25, 34↔12, 34↔22", swapCount: 3, result: "25, 12, 22, 34, 64" },
        { pass: "Pass 3", arr: ["25", "12", "22", "34", "64"], swap: "25↔12, 25↔22", swapCount: 2, result: "12, 22, 25, 34, 64" },
        { pass: "Pass 4", arr: ["12", "22", "25", "34", "64"], swap: "Tidak ada swap", swapCount: 0, result: "12, 22, 25, 34, 64 ✓" },
    ];

    const selectionTraceData = [
        { pass: "Pass 1", findMin: "Min = 12 (idx 3)", swapWith: "Posisi 0 ↔ Posisi 3", result: "12 | 64, 25, 34, 22" },
        { pass: "Pass 2", findMin: "Min = 22 (idx 4)", swapWith: "Posisi 1 ↔ Posisi 4", result: "12, 22 | 25, 34, 64" },
        { pass: "Pass 3", findMin: "Min = 25 (idx 2)", swapWith: "Sudah di tempat", result: "12, 22, 25 | 34, 64" },
        { pass: "Pass 4", findMin: "Min = 34 (idx 3)", swapWith: "Sudah di tempat", result: "12, 22, 25, 34 | 64" },
    ];

    return (
        <div className="space-y-16 pb-12">

            {/* ─── BAGIAN 1: PENGANTAR SORTING ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Apa itu Sorting?</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-amber-500/30 p-2 rounded-lg text-amber-500">
                                    <span className="material-symbols-outlined text-xl">sort</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Mengapa Kita Perlu Mengurutkan Data?</h3>
                            </div>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    Bayangkan Anda mencari nama di buku telepon yang isinya <strong className="text-slate-900 dark:text-white">tidak terurut</strong>. Anda harus membaca dari halaman pertama hingga akhir — bisa butuh berjam-jam! Data terurut memungkinkan algoritma pencarian bekerja <strong className="text-slate-900 dark:text-white">10.000× lebih cepat</strong>.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    {[
                                        { icon: "search", title: "Binary Search", desc: "Hanya bisa bekerja optimal pada data yang sudah terurut.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
                                        { icon: "database", title: "Database Query", desc: "ORDER BY pada SQL menggunakan algoritma sorting internal.", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
                                        { icon: "display_settings", title: "UI Rendering", desc: "Daftar kontak, leaderboard, feed — semua butuh sorting.", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10 border-violet-500/30" },
                                    ].map((item, i) => (
                                        <div key={i} className={`p-4 rounded-xl border-2 ${item.bg}`}>
                                            <span className={`material-symbols-outlined text-2xl ${item.color} mb-2 block`}>{item.icon}</span>
                                            <h4 className={`font-black text-sm mb-1 ${item.color}`}>{item.title}</h4>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-amber-500/10 rounded-xl border-2 border-amber-500/30">
                                    <p className="text-sm font-medium italic text-center text-slate-800 dark:text-slate-100">
                                        "Sorting adalah salah satu operasi paling fundamental dalam ilmu komputer. Memahaminya adalah fondasi dari semua algoritma yang lebih kompleks."
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 2: BUBBLE SORT — KONSEP & IMPLEMENTASI ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Bubble Sort</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-blue-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-blue-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">METODE 1</span>
                                        <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400 italic">Bubble Sort</h4>
                                    </div>
                                    <h5 className="font-black text-base text-slate-900 dark:text-white mb-3">Cara Kerja: Gelembung Naik</h5>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Seperti gelembung udara di dalam air — elemen terbesar akan terus "naik" ke posisi teratas (akhir array) pada setiap putaran.
                                    </p>
                                    <div className="space-y-2">
                                        {[
                                            "Bandingkan dua elemen berdampingan",
                                            "Jika kiri > kanan, tukar (SWAP) posisinya",
                                            "Ulangi untuk seluruh array (1 Pass)",
                                            "Setiap Pass, 1 elemen terbesar sudah di posisi benar",
                                            "Ulangi (N-1) Pass hingga seluruhnya terurut",
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200 font-medium">
                                                <span className="bg-blue-500/20 text-blue-600 dark:text-blue-400 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-white/10">
                                        <div className="text-xs font-black text-center">
                                            <span className="text-blue-400">Time: O(n²)</span>
                                            <span className="text-slate-500 mx-2">|</span>
                                            <span className="text-emerald-400">Space: O(1)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-0 bg-slate-900">
                                    <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                        <span className="text-xs text-slate-300 font-mono font-bold">bubble_sort.py</span>
                                        <span className="text-xs text-blue-400 font-bold">O(n²)</span>
                                    </div>
                                    <pre className="p-6 text-sm font-mono overflow-x-auto">
                                        <code className="text-slate-200">
                                            <span className="text-purple-400">def</span> <span className="text-blue-400">bubble_sort</span>(arr):<br />
                                            &nbsp;&nbsp;n = <span className="text-blue-400">len</span>(arr)<br />
                                            <br />
                                            &nbsp;&nbsp;<span className="text-slate-400"># (n-1) kali putaran / Pass</span><br />
                                            &nbsp;&nbsp;<span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(n - <span className="text-amber-300">1</span>):<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;swapped = <span className="text-amber-300">False</span><br />
                                            <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># Tiap pass, elemen terbesar sudah di akhir</span><br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">for</span> j <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(n - i - <span className="text-amber-300">1</span>):<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> arr[j] &gt; arr[j + <span className="text-amber-300">1</span>]:<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># Tukar posisi (SWAP)</span><br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j], arr[j+<span className="text-amber-300">1</span>] = arr[j+<span className="text-amber-300">1</span>], arr[j]<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swapped = <span className="text-amber-300">True</span><br />
                                            <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># Optimasi: stop jika tidak ada swap</span><br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if not</span> swapped:<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">break</span> <span className="text-emerald-400"># Best case: O(n)</span><br />
                                            <br />
                                            &nbsp;&nbsp;<span className="text-purple-400">return</span> arr<br />
                                            <br />
                                            <span className="text-slate-500"># --- Contoh ---</span><br />
                                            data = [<span className="text-amber-300">64, 34, 25, 12, 22</span>]<br />
                                            <span className="text-blue-400">print</span>(<span className="text-blue-400">bubble_sort</span>(data))<br />
                                            <span className="text-slate-500"># Output: [12, 22, 25, 34, 64]</span>
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 3: BUBBLE SORT TRACING ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Tracing Bubble Sort</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-500/30 p-2 rounded-lg text-blue-500">
                                    <span className="material-symbols-outlined text-xl">edit_square</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tracing Animasi: Array [64, 34, 25, 12, 22]</h3>
                            </div>

                            {/* Visual Array Step Replacement */}
                            <BubbleSortVisualizer />

                            {/* Tracing Table */}
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm mt-8">
                                <div className="p-4 border-b-2 border-primary/20 bg-primary/5 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">table_chart</span>
                                    <h5 className="font-black text-sm text-slate-900 dark:text-white">Tracing Table — Semua Pass</h5>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-b-2 border-primary/10 font-black">
                                            <tr>
                                                <th className="px-4 py-3">Pass ke-</th>
                                                <th className="px-4 py-3">Array Sebelum</th>
                                                <th className="px-4 py-3">Swap yang Terjadi</th>
                                                <th className="px-4 py-3 text-center">Jml Swap</th>
                                                <th className="px-4 py-3 text-primary">Array Setelah</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-primary/5">
                                            {bubbleTraceData.map((row, idx) => (
                                                <tr key={idx} className={row.swapCount === 0 ? "bg-emerald-500/10" : ""}>
                                                    <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100">{row.pass}</td>
                                                    <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-200 text-xs">[{row.arr.join(", ")}]</td>
                                                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200 font-medium">{row.swap}</td>
                                                    <td className="px-4 py-3 text-center font-black">
                                                        <span className={`px-2 py-0.5 rounded text-xs ${row.swapCount === 0 ? "bg-emerald-500 text-white" : "bg-blue-500/20 text-blue-600 dark:text-blue-400"}`}>
                                                            {row.swapCount}
                                                        </span>
                                                    </td>
                                                    <td className={`px-4 py-3 font-mono text-xs font-bold ${row.swapCount === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-slate-100"}`}>
                                                        {row.result}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 bg-slate-100 dark:bg-slate-900/80 border-t-2 border-primary/10">
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium italic">
                                        * Pass 4: tidak ada swap → algoritma berhenti awal (optimasi <strong className="text-slate-900 dark:text-white">Best Case O(n)</strong>).
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 4: SELECTION SORT — KONSEP & IMPLEMENTASI ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Selection Sort</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-amber-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-amber-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">METODE 2</span>
                                        <h4 className="text-2xl font-black text-amber-600 dark:text-amber-400 italic">Selection Sort</h4>
                                    </div>
                                    <h5 className="font-black text-base text-slate-900 dark:text-white mb-3">Cara Kerja: Pilih yang Terkecil</h5>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Seperti memilih kartu terkecil dari tangan — cari nilai minimum dari sisa array, lalu tempatkan di posisi yang benar.
                                    </p>
                                    <div className="space-y-2">
                                        {[
                                            "Anggap elemen pertama sebagai minimum",
                                            "Scan seluruh sisa array, cari nilai terkecil",
                                            "Tukar elemen minimum ke posisi terdepan",
                                            "Geser batas 'sudah terurut' satu langkah ke kanan",
                                            "Ulangi hingga seluruh array terurut",
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200 font-medium">
                                                <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-white/10">
                                        <div className="text-xs font-black text-center">
                                            <span className="text-amber-400">Time: O(n²) selalu</span>
                                            <span className="text-slate-500 mx-2">|</span>
                                            <span className="text-emerald-400">Space: O(1)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-0 bg-slate-900">
                                    <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                        <span className="text-xs text-slate-300 font-mono font-bold">selection_sort.py</span>
                                        <span className="text-xs text-amber-400 font-bold">O(n²)</span>
                                    </div>
                                    <pre className="p-6 text-sm font-mono overflow-x-auto">
                                        <code className="text-slate-200">
                                            <span className="text-purple-400">def</span> <span className="text-blue-400">selection_sort</span>(arr):<br />
                                            &nbsp;&nbsp;n = <span className="text-blue-400">len</span>(arr)<br />
                                            <br />
                                            &nbsp;&nbsp;<span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(n):<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># Cari index nilai terkecil</span><br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;min_idx = i<br />
                                            <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">for</span> j <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(i + <span className="text-amber-300">1</span>, n):<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> arr[j] &lt; arr[min_idx]:<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_idx = j <span className="text-slate-400"># Update minimum</span><br />
                                            <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400"># Tempatkan minimum ke posisi yang benar</span><br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;arr[i], arr[min_idx] = arr[min_idx], arr[i]<br />
                                            <br />
                                            &nbsp;&nbsp;<span className="text-purple-400">return</span> arr<br />
                                            <br />
                                            <span className="text-slate-500"># --- Contoh ---</span><br />
                                            data = [<span className="text-amber-300">64, 25, 12, 22, 11</span>]<br />
                                            <span className="text-blue-400">print</span>(<span className="text-blue-400">selection_sort</span>(data))<br />
                                            <span className="text-slate-500"># Output: [11, 12, 22, 25, 64]</span>
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 5: SELECTION SORT TRACING ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Tracing Selection Sort</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-amber-500/30 p-2 rounded-lg text-amber-500">
                                    <span className="material-symbols-outlined text-xl">edit_square</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tracing Animasi: Cari Min & Swap per Pass</h3>
                            </div>

                            <SelectionSortVisualizer />

                            <div className="mt-8 bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <div className="p-4 border-b-2 border-primary/20 bg-primary/5 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-sm">table_chart</span>
                                    <h5 className="font-black text-sm text-slate-900 dark:text-white">Tracing Table — Selection Sort</h5>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-b-2 border-primary/10 font-black">
                                            <tr>
                                                <th className="px-4 py-3">Pass ke-</th>
                                                <th className="px-4 py-3">Cari Minimum</th>
                                                <th className="px-4 py-3">Aksi Swap</th>
                                                <th className="px-4 py-3 text-primary">Hasil (| = batas terurut)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-primary/5">
                                            {selectionTraceData.map((row, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-4 py-3 font-black text-slate-800 dark:text-slate-100">{row.pass}</td>
                                                    <td className="px-4 py-3 text-amber-600 dark:text-amber-400 font-bold text-sm">{row.findMin}</td>
                                                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200 font-medium">{row.swapWith}</td>
                                                    <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">{row.result}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 bg-slate-100 dark:bg-slate-900/80 border-t-2 border-primary/10">
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium italic">
                                        * Selection Sort selalu melakukan tepat <strong className="text-slate-900 dark:text-white">N-1 swap</strong> — tidak bisa dioptimasi seperti Bubble Sort. Jumlah perbandingan selalu O(n²).
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 6: KOMPARASI PERFORMA ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Komparasi Performa</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 rounded-3xl p-8 overflow-hidden relative border border-white/10">
                            <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                            <h4 className="text-xl font-black text-white flex items-center gap-2 mb-8">
                                <span className="material-symbols-outlined text-amber-400">compare_arrows</span>
                                Head-to-Head: Bubble Sort vs Selection Sort
                            </h4>

                            {/* Comparison Table */}
                            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-8">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-slate-200 font-black border-b border-white/10">
                                        <tr>
                                            <th className="px-5 py-3">Aspek</th>
                                            <th className="px-5 py-3 text-blue-400">Bubble Sort</th>
                                            <th className="px-5 py-3 text-amber-400">Selection Sort</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { aspect: "Best Case", bubble: "O(n) — dengan flag", sel: "O(n²) — selalu" },
                                            { aspect: "Average Case", bubble: "O(n²)", sel: "O(n²)" },
                                            { aspect: "Worst Case", bubble: "O(n²)", sel: "O(n²)" },
                                            { aspect: "Jumlah Swap", bubble: "Banyak (tiap pass)", sel: "Sedikit (max N-1)" },
                                            { aspect: "Jumlah Perbandingan", bubble: "O(n²)", sel: "O(n²)" },
                                            { aspect: "Space (Memori)", bubble: "O(1) — In-place", sel: "O(1) — In-place" },
                                            { aspect: "Stability", bubble: "✅ Stable", sel: "❌ Unstable" },
                                            { aspect: "Cocok untuk", bubble: "Data hampir terurut", sel: "Minimisasi swap" },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="px-5 py-3 font-black text-slate-200">{row.aspect}</td>
                                                <td className="px-5 py-3 text-blue-300 font-mono font-medium">{row.bubble}</td>
                                                <td className="px-5 py-3 text-amber-300 font-mono font-medium">{row.sel}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Visual Performance Bar */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <h5 className="text-sm font-black text-white">Jumlah Swap (N=5, Worst Case)</h5>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-xs font-bold text-blue-400">Bubble Sort</span>
                                                <span className="text-xs font-mono text-blue-400/80">10 swap</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full"><div className="h-full bg-blue-500 w-full rounded-full animate-pulse"></div></div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-xs font-bold text-amber-400">Selection Sort</span>
                                                <span className="text-xs font-mono text-amber-400/80">4 swap</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full"><div className="h-full bg-amber-500 w-[40%] rounded-full"></div></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h5 className="text-sm font-black text-white">Jumlah Perbandingan (sama)</h5>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-xs font-bold text-blue-400">Bubble Sort</span>
                                                <span className="text-xs font-mono text-blue-400/80">10 compare</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full"><div className="h-full bg-blue-500 w-full rounded-full"></div></div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-xs font-bold text-amber-400">Selection Sort</span>
                                                <span className="text-xs font-mono text-amber-400/80">10 compare</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full"><div className="h-full bg-amber-500 w-full rounded-full"></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kesimpulan */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-blue-500/10 border-2 border-blue-500/30">
                                    <h5 className="text-sm font-black text-blue-300 mb-2">✅ Gunakan Bubble Sort jika...</h5>
                                    <ul className="space-y-1">
                                        {["Data hampir terurut (best case O(n))", "Perlu algoritma yang Stable", "Prioritas utama: kemudahan implementasi"].map((t, i) => (
                                            <li key={i} className="text-sm text-slate-200 font-medium flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>{t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/30">
                                    <h5 className="text-sm font-black text-amber-300 mb-2">✅ Gunakan Selection Sort jika...</h5>
                                    <ul className="space-y-1">
                                        {["Operasi write/swap sangat mahal (memori lambat)", "Jumlah swap perlu diminimalkan", "Data kecil dan urutan relatif tidak penting"].map((t, i) => (
                                            <li key={i} className="text-sm text-slate-200 font-medium flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>{t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 7: LATIHAN MANDIRI ─── */}
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

                <ScrollReveal>
                    <div className="text-center max-w-lg mx-auto mb-8">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Uji Pemahamanmu! 🧠</h4>
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                            Coba jawab pertanyaan berikut dan trace secara manual sebelum melihat jawabannya.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid gap-6">
                    {[
                        {
                            no: 1,
                            soal: "Berapa kali SWAP yang dilakukan Bubble Sort pada array [5, 4, 3, 2, 1] (worst case)?",
                            hint: "Hitung total swap di setiap pass: Pass1 + Pass2 + Pass3 + Pass4",
                            jawaban: "10 kali swap",
                            penjelasan: "Pass 1: 4 swap, Pass 2: 3 swap, Pass 3: 2 swap, Pass 4: 1 swap. Total = 4+3+2+1 = 10. Ini sesuai rumus n(n-1)/2 = 5×4/2 = 10 (Worst Case O(n²)).",
                            color: "blue"
                        },
                        {
                            no: 2,
                            soal: "Pada Selection Sort untuk array [3, 1, 4, 1, 5], berapa total perbandingan yang dilakukan?",
                            hint: "Pass 1 membandingkan (n-1) kali, Pass 2 membandingkan (n-2) kali, dst.",
                            jawaban: "10 perbandingan",
                            penjelasan: "Pass 1: 4, Pass 2: 3, Pass 3: 2, Pass 4: 1. Total = 4+3+2+1 = 10 = n(n-1)/2. Selection Sort SELALU O(n²) perbandingan, tidak peduli kondisi awal array.",
                            color: "amber"
                        },
                        {
                            no: 3,
                            soal: "Algoritma mana yang lebih tepat dipilih untuk array [1, 2, 3, 5, 4] yang hampir terurut? Jelaskan!",
                            hint: "Pikirkan apa yang terjadi pada Bubble Sort saat array hampir terurut!",
                            jawaban: "Bubble Sort (dengan optimasi flag)",
                            penjelasan: "Untuk array hampir terurut, Bubble Sort dengan flag 'swapped' akan mendeteksi bahwa tidak ada swap di pass kedua and langsung berhenti → O(n). Selection Sort tetap O(n²) karena selalu menscan seluruh sisa array.",
                            color: "emerald"
                        },
                    ].map((latihan) => (
                        <ScrollReveal key={latihan.no}>
                            <FocusSection>
                                <div className={`bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-all`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-primary/20 text-primary text-xs font-black px-3 py-1 rounded-lg">LATIHAN #{latihan.no}</span>
                                    </div>
                                    <p className="text-base font-bold text-slate-900 dark:text-white mb-3">{latihan.soal}</p>
                                    <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic">💡 Hint: {latihan.hint}</p>
                                    </div>
                                    <details className="group cursor-pointer">
                                        <summary className="flex items-center gap-2 text-sm font-black text-primary hover:text-primary/70 transition-colors list-none">
                                            <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                                            Lihat Jawaban
                                        </summary>
                                        <div className="mt-4 p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl animate-in slide-in-from-top-2 duration-300">
                                            <div className="text-emerald-600 dark:text-emerald-400 font-black text-base mb-2">✅ {latihan.jawaban}</div>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{latihan.penjelasan}</p>
                                        </div>
                                    </details>
                                </div>
                            </FocusSection>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Penutup / Summary Card */}
                <ScrollReveal threshold={0.5}>
                    <FocusSection>
                        <div className="mt-4 bg-linear-to-r from-primary/15 to-amber-500/15 border-2 border-primary/30 p-8 rounded-3xl">
                            <div className="max-w-2xl mx-auto text-center">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Ringkasan Capaian 🎯</h4>
                                <div className="grid sm:grid-cols-3 gap-4 text-left">
                                    {[
                                        { icon: "code", label: "Implementasi", desc: "Anda dapat menulis Bubble & Selection Sort dari nol dalam Python.", done: true },
                                        { icon: "edit_square", label: "Tracing", desc: "Anda dapat menelusuri langkah demi langkah proses sorting secara manual.", done: true },
                                        { icon: "compare_arrows", label: "Komparasi", desc: "Anda dapat membandingkan Big O dan memilih algoritma yang tepat sesuai konteks.", done: true },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-primary/20">
                                            <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                                                <span className="material-symbols-outlined text-primary text-sm">{item.icon}</span>
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1">
                                                    {item.label} <span className="text-emerald-500">✓</span>
                                                </div>
                                                <p className="text-xs text-slate-700 dark:text-slate-200 font-medium mt-0.5 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FocusSection>
                </ScrollReveal>
            </div>
        </div>
    );
}
