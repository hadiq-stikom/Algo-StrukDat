"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import { motion } from "framer-motion";
import QueueVisualizer from "./QueueVisualizer";

export default function Module6Content() {
    return (
        <div className="space-y-16 pb-12">

            {/* ─── BAGIAN 1: KONSEP QUEUE ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Konsep Queue (Antrean)</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-cyan-500/30 p-2 rounded-lg text-cyan-600">
                                    <span className="material-symbols-outlined text-xl">group</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Prinsip FIFO</h3>
                            </div>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    <strong className="text-slate-900 dark:text-white">Queue</strong> adalah struktur data linear yang mengikuti prinsip <strong className="text-cyan-600">FIFO (First-In-First-Out)</strong>. Artinya, elemen yang pertama kali masuk adalah yang pertama kali akan keluar.
                                </p>

                                {/* FIFO Metaphor visual */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="p-5 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-xl flex flex-col items-center justify-center">
                                        <p className="text-sm font-black text-cyan-700 dark:text-cyan-400 uppercase mb-4 text-center">Analogi: Antrean Kasir 🛒</p>
                                        <div className="flex gap-2 mb-4">
                                            {[1, 2, 3].map((v) => (
                                                <div key={v} className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-black text-slate-400">
                                                    {v}
                                                </div>
                                            ))}
                                            <motion.div
                                                animate={{ x: [20, 0], opacity: [0, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="w-8 h-8 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-[10px] font-black text-white"
                                            >
                                                NEW
                                            </motion.div>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500 text-center italic">
                                            Pelanggan yang datang lebih dulu akan dilayani lebih dulu.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl">
                                        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase mb-3">Kegunaan Queue di Dunia IT:</p>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3">
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">print</span>
                                                <div className="text-xs">
                                                    <p className="font-black text-slate-900 dark:text-white uppercase leading-none mb-1">Printer Spooling</p>
                                                    <p className="text-slate-500">Mengatur urutan dokumen yang akan dicetak.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">router</span>
                                                <div className="text-xs">
                                                    <p className="font-black text-slate-900 dark:text-white uppercase leading-none mb-1">Network Buffering</p>
                                                    <p className="text-slate-500">Menyimpan paket data sebelum diproses oleh router.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">schedule</span>
                                                <div className="text-xs">
                                                    <p className="font-black text-slate-900 dark:text-white uppercase leading-none mb-1">CPU Scheduling</p>
                                                    <p className="text-slate-500">Mengelola urutan proses yang siap dijalankan (Ready Queue).</p>
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

            {/* ─── BAGIAN 2: OPERASI QUEUE ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Operasi & Pointer</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-cyan-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-cyan-500/20">
                                    <h4 className="text-xl font-black text-cyan-700 dark:text-cyan-400 mb-4 italic uppercase">Core Operations</h4>

                                    <div className="space-y-6">
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-black text-[9px]">ENQUEUE</div>
                                            <div className="text-xs font-medium">
                                                <p className="text-slate-900 dark:text-white font-black">Menambah ke Belakang (REAR)</p>
                                                <p className="text-slate-500 italic">Complexity: O(1)</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 bg-rose-500 text-white rounded-lg flex items-center justify-center font-black text-[9px]">DEQUEUE</div>
                                            <div className="text-xs font-medium">
                                                <p className="text-slate-900 dark:text-white font-black">Menghapus dari Depan (FRONT)</p>
                                                <p className="text-slate-500 italic">Complexity: O(1)</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-500 rounded-lg flex items-center justify-center font-black text-[10px]">PEEK</div>
                                            <div className="text-xs font-medium">
                                                <p className="text-slate-900 dark:text-white font-black">Melihat elemen di FRONT</p>
                                                <p className="text-slate-500 italic">Complexity: O(1)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 p-4 bg-blue-500/5 border-2 border-blue-500/20 rounded-xl">
                                        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase mb-2 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">info</span>
                                            Key Pointers
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                            <strong>FRONT:</strong> Menunjuk ke elemen pertama yang akan keluar.<br />
                                            <strong>REAR:</strong> Menunjuk ke elemen terakhir yang baru masuk.
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-0 bg-slate-900">
                                    <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                        <span className="text-xs text-slate-300 font-mono font-bold">queue_implementation.py</span>
                                        <span className="text-xs text-cyan-400 font-bold">FIFO</span>
                                    </div>
                                    <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed">
                                        <code className="text-slate-200">
                                            {`\
`}<span className="text-purple-400">class</span> <span className="text-blue-400">Queue</span>:{`
    `}    <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-orange-300">self</span>.items = []{`

    `}    <span className="text-slate-400"># ENQUEUE → O(1)</span>{`
    `}    <span className="text-purple-400">def</span> <span className="text-blue-400">enqueue</span>(<span className="text-orange-300">self</span>, data):{`
    `}        <span className="text-orange-300">self</span>.items.<span className="text-blue-400">append</span>(data){`

    `}    <span className="text-slate-400"># DEQUEUE → O(1)*</span>{`
    `}    <span className="text-purple-400">def</span> <span className="text-blue-400">dequeue</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-purple-400">if len</span>(<span className="text-orange-300">self</span>.items) &gt; <span className="text-amber-300">0</span>:{`
    `}            <span className="text-purple-400">return</span> <span className="text-orange-300">self</span>.items.<span className="text-blue-400">pop</span>(<span className="text-amber-300">0</span>){`
    `}        <span className="text-purple-400">return</span> <span className="text-green-400">"Queue Empty!"</span>
                                        </code>
                                    </pre>
                                    <p className="p-4 text-[9px] text-slate-500 italic bg-black/20 font-bold tracking-tight">
                                        *Catatan: pop(0) pada list Python standar adalah O(n). Untuk O(1), gunakan collections.deque.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 3: INTERACTIVE VISUALIZER ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Tracing Operasi Queue</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <QueueVisualizer />
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 4: CIRCULAR QUEUE ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Circular Queue</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 border-2 border-primary/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>

                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4">
                                    <h4 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">analytics</span>
                                        Mengapa Perlu Circular Queue?
                                    </h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Pada <strong className="text-slate-200">Linear Queue</strong> (Array-based), saat kita melakukan dequeue, slot di depan menjadi kosong. Namun, REAR mungkin sudah mencapai batas akhir array sehingga kita tidak bisa lagi melakukan enqueue meskipun ada slot kosong di depan.
                                    </p>
                                    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
                                        <p className="text-xs text-amber-500 font-black uppercase mb-1 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">lightbulb</span>
                                            Solusinya:
                                        </p>
                                        <p className="text-xs text-slate-300 font-medium">
                                            Hubungkan ujung akhir kembali ke ujung awal menggunakan operator modulo (<code className="text-primary">%</code>).
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center p-4">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-primary uppercase">Modulo Math</p>
                                        <p className="text-2xl font-black text-white">REAR + 1 % SIZE</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 5: VARIASI QUEUE (PRIORITY & DEQUE) ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Variasi Queue</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Priority Queue */}
                        <FocusSection>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-rose-500/20 p-2 rounded-lg text-rose-600">
                                        <span className="material-symbols-outlined text-xl">priority_high</span>
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">Priority Queue</h4>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    Elemen dengan prioritas lebih tinggi akan diproses lebih dulu, meskipun ia datang belakangan.
                                </p>
                                <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl mb-4">
                                    <p className="text-[10px] font-black text-rose-600 uppercase mb-1">Analogi: IGD Rumah Sakit 🏥</p>
                                    <p className="text-[10px] text-slate-500">Pasien kritis (Prioritas 1) akan ditangani sebelum pasien batuk-pilek (Prioritas 3), tak peduli siapa yang datang duluan.</p>
                                </div>
                                <div className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                                    <span className="text-purple-400">import</span> heapq<br />
                                    pq = []<br />
                                    heapq.heappush(pq, (<span className="text-amber-300">1</span>, <span className="text-green-400">"Kritis"</span>))<br />
                                    heapq.heappush(pq, (<span className="text-amber-300">3</span>, <span className="text-green-400">"Batuk"</span>))
                                </div>
                            </div>
                        </FocusSection>

                        {/* Deque */}
                        <FocusSection>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-500/20 p-2 rounded-lg text-blue-600">
                                        <span className="material-symbols-outlined text-xl">swap_horiz</span>
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">Deque (Double-Ended)</h4>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    Queue dua arah. Elemen bisa dimasukkan (push) atau dikeluarkan (pop) dari ujung <strong>Depan</strong> maupun <strong>Belakang</strong>.
                                </p>
                                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl mb-4">
                                    <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Kegunaan: Stealing Algorithm</p>
                                    <p className="text-[10px] text-slate-500">Digunakan pada sistem penjadwalan prosesor modern untuk menyeimbangkan beban kerja antar core.</p>
                                </div>
                                <div className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                                    <span className="text-purple-400">from</span> collections <span className="text-purple-400">import</span> deque<br />
                                    d = deque([<span className="text-amber-300">1, 2, 3</span>])<br />
                                    d.appendleft(<span className="text-amber-300">0</span>) <span className="text-slate-400"># Masuk depan</span><br />
                                    d.pop() <span className="text-slate-400"># Keluar belakang</span>
                                </div>
                            </div>
                        </FocusSection>
                    </div>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 6: IMPLEMENTASI (ARRAY VS LINKED LIST) ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Perbandingan Implementasi</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b-2 border-primary/10">
                                    <th className="p-4 text-xs font-black uppercase tracking-widest text-primary">Fitur</th>
                                    <th className="p-4 text-xs font-black uppercase tracking-widest text-emerald-500">Array Implementation</th>
                                    <th className="p-4 text-xs font-black uppercase tracking-widest text-blue-500">Linked List Implementation</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="p-4 font-black text-slate-900 dark:text-white">Ukuran Memory</td>
                                    <td className="p-4 italic">Fixed (Statis). Boros jika jarang dipakai.</td>
                                    <td className="p-4 italic">Dynamic. Sesuai jumlah data yang ada.</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="p-4 font-black text-slate-900 dark:text-white">Alokasi Memory</td>
                                    <td className="p-4">Berurutan (Contiguous).</td>
                                    <td className="p-4">Terpencar (Non-contiguous).</td>
                                </tr>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="p-4 font-black text-slate-900 dark:text-white">Kompleksitas (Enqueue)</td>
                                    <td className="p-4">O(1) - Sangat Cepat.</td>
                                    <td className="p-4">O(1) - Sangat Cepat.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-black text-slate-900 dark:text-white">Kasus Penggunaan</td>
                                    <td className="p-4 text-emerald-600 font-bold uppercase text-[9px]">Sistem dengan memory terbatas.</td>
                                    <td className="p-4 text-blue-600 font-bold uppercase text-[9px]">Sistem dengan beban data fluktuatif.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 7: SELF CHECK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Self-Check & Kuis</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FocusSection>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm h-full">
                                <h5 className="text-lg font-black text-slate-900 dark:text-white mb-4 italic uppercase">Uji Pemahaman #1</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mb-6">
                                    Diberikan urutan operasi berikut: <br />
                                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-black text-primary">Enqueue(X), Enqueue(Y), Dequeue(), Enqueue(Z), Dequeue()</code> <br />
                                    Elemen apa yang tersisa di dalam queue?
                                </p>
                                <details className="group cursor-pointer">
                                    <summary className="list-none bg-primary text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl text-center shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        Lihat Jawaban
                                    </summary>
                                    <div className="mt-4 p-4 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-xl">
                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            Jawaban: [Z] <br />
                                            Tracing: <br />
                                            1. Enqueue(X) → [X] <br />
                                            2. Enqueue(Y) → [X, Y] <br />
                                            3. Dequeue() → [Y] (X keluar) <br />
                                            4. Enqueue(Z) → [Y, Z] <br />
                                            5. Dequeue() → [Z] (Y keluar)
                                        </p>
                                    </div>
                                </details>
                            </div>
                        </FocusSection>

                        <FocusSection>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm h-full">
                                <h5 className="text-lg font-black text-slate-900 dark:text-white mb-4 italic uppercase">Uji Pemahaman #2</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mb-6">
                                    Apa yang membedakan Queue dengan Stack dalam hal urutan pemrosesan?
                                </p>
                                <details className="group cursor-pointer">
                                    <summary className="list-none bg-primary text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl text-center shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        Lihat Jawaban
                                    </summary>
                                    <div className="mt-4 p-4 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-xl">
                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            Jawaban: <br />
                                            Queue menggunakan prinsip <strong className="text-cyan-600 font-black italic">FIFO</strong> (First-In-First-Out), data yang masuk pertama diproses pertama. <br /><br />
                                            Stack menggunakan prinsip <strong className="text-rose-500 font-black italic">LIFO</strong> (Last-In-First-Out), data yang masuk terakhir diproses pertama.
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
