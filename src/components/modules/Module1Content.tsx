"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Module1Content() {
    return (
        <div className="space-y-16 pb-12">
            {/* --- BAGIAN 1: PENGENALAN MATAKULIAH --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-primary/20"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x border-primary/20">Bagian 1: Pengenalan Matakuliah</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Section 1.1: Orientation */}
                <ScrollReveal>
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
                                <span className="material-symbols-outlined text-xl">map</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">1.1 Orientasi & Kontrak Belajar</h3>
                        </div>
                        <div className="grid gap-6">
                            <div className="bg-white dark:bg-surface border border-primary/10 rounded-2xl p-6 shadow-sm">
                                <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                    <span className="material-symbols-outlined text-primary text-sm">timeline</span>
                                    Syllabus Roadmap (14 Minggu)
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                    Kita akan menempuh perjalanan koding yang terstruktur, mulai dari fondasi memori hingga arsitektur Graf tingkat lanjut. Fokus kita bukan hanya "bisa jalan", tapi "efisien dan logis".
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        "Fondasi & Big O (Minggu 1-2)",
                                        "Struktur Linear (Minggu 3-6)",
                                        "Rekursi & Sorting (Minggu 7-10)",
                                        "Tree & Graph (Minggu 11-14)"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm font-medium p-2 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 rounded-lg">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-linear-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                                <div className="bg-primary/20 p-4 rounded-full">
                                    <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-slate-100">Sistem Penilaian Baru</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        Penekanan utama ada pada <strong>kemampuan analisis dan pembuktian logika</strong>. Nilai tinggi bukan untuk yang paling cepat ngetik, tapi untuk yang bisa membuktikan kenapa kodenya efisien melalui <em>manual tracing</em>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* Section 1.2: AI Learning Paradigm */}
                <ScrollReveal>
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400">
                                <span className="material-symbols-outlined text-xl">smart_toy</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">1.2 Paradigma Belajar dengan AI 🤖</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                {
                                    title: "Fase 1: Konsep 🧠",
                                    desc: "Memahami logika di atas kertas tanpa sentuh komputer sama sekali.",
                                    color: "bg-indigo-500"
                                },
                                {
                                    title: "Fase 2: Eksperimen 💻",
                                    desc: "Gunakan AI untuk mencoba berbagai variasi kode dengan cepat.",
                                    color: "bg-primary"
                                },
                                {
                                    title: "Fase 3: Validasi 📊",
                                    desc: "Buktikan secara manual bahwa output AI benar dan efisien.",
                                    color: "bg-green-500"
                                },
                            ].map((phase, i) => (
                                <div key={i} className="bg-white dark:bg-surface p-5 rounded-2xl border border-primary/5 shadow-sm hover:border-primary/30 transition-all group">
                                    <div className={`${phase.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-4`}>
                                        {i + 1}
                                    </div>
                                    <h4 className="font-bold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{phase.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{phase.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>
            </div>

            {/* --- BAGIAN 2: KONSEP DASAR STRUKTUR DATA --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-primary/20"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x border-primary/20">Bagian 2: Konsep Dasar Struktur Data</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Section 2.1: Concepts & Analogy */}
                <ScrollReveal>
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                                <span className="material-symbols-outlined text-xl">psychology</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.1 Konsep Dasar & Analogi</h3>
                        </div>
                        <div className="bg-white dark:bg-surface border border-primary/10 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-6">
                                <h4 className="font-bold text-primary mb-4 italic">Analogi: Perpustakaan vs Kardus Acak</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                                        <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Tumpukan Kardus</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Data disimpan asal letak. Mencari "buku sejarah" berarti harus membongkar semua kardus satu per satu (In-efisien).
                                        </p>
                                    </div>
                                    <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
                                        <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">Perpustakaan Terindeks</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Data disusun berdasarkan kategori. Mencari "buku sejarah" hanya butuh waktu detik. Inilah kekuatan Struktur Data.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 p-4 bg-primary/10 rounded-xl border border-primary/20">
                                    <p className="text-sm italic text-center text-slate-700 dark:text-slate-300">
                                        "Struktur Data adalah cara kita mengatur dan menyimpan data di memori komputer agar dapat diakses dan dimodifikasi secara efisien."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* Section 2.2: Computer Memory Anatomy */}
                <ScrollReveal>
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-400">
                                <span className="material-symbols-outlined text-xl">memory</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.2 Anatomi Memori Komputer 🧠</h3>
                        </div>
                        <div className="bg-white dark:bg-surface border border-primary/10 rounded-2xl p-6 shadow-sm">
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                Bayangkan memori (RAM) sebagai barisan kotak yang tak terhingga, di mana setiap kotak memiliki <strong>Alamat (Address)</strong> unik.
                            </p>
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6 font-mono text-[10px]">
                                {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className={`border rounded p-2 flex flex-col items-center gap-1 ${i === 3 ? 'bg-primary/20 border-primary text-primary' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'}`}>
                                        <span className="text-slate-400 underline decoration-slate-200 dark:decoration-slate-700">0x{i.toString(16).toUpperCase().padStart(2, '0')}</span>
                                        <span className="font-bold">{i === 3 ? 'DATA' : '0'}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="font-bold text-primary">Bit:</span> Unit terkecil (0 atau 1).
                                    </li>
                                    <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="font-bold text-primary">Byte:</span> Kumpulan 8 bit. 1 Byte bisa menyimpan satu karakter (huruf).
                                    </li>
                                    <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="font-bold text-primary">Address:</span> Lokasi fisik di RAM tempat data tersebut disimpan.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* Section 2.3: Logic & Footprint */}
                <ScrollReveal>
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
                                <span className="material-symbols-outlined text-xl">fit_screen</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.3 Logika Data: Ukuran itu Penting! 📏</h3>
                        </div>
                        <div className="bg-linear-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                Setiap tipe data memesan sejumlah Byte di memori. Pemilihan tipe data yang tepat sangat penting untuk efisiensi.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-4 bg-white dark:bg-surface rounded-xl border border-primary/5">
                                    <span className="text-xs font-bold text-primary uppercase block mb-1">Integer</span>
                                    <div className="flex gap-0.5 mb-2">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="w-4 h-4 bg-primary rounded-sm"></div>)}
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-mono">4 Bytes</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-surface rounded-xl border border-primary/5">
                                    <span className="text-xs font-bold text-primary uppercase block mb-1">Char</span>
                                    <div className="flex gap-0.5 mb-2">
                                        <div className="w-4 h-4 bg-primary rounded-sm"></div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-mono">1 Byte</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-surface rounded-xl border border-primary/5">
                                    <span className="text-xs font-bold text-primary uppercase block mb-1">Double</span>
                                    <div className="flex gap-0.5 mb-2">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="w-4 h-4 bg-primary rounded-sm"></div>)}
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-mono">8 Bytes</p>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-primary/20 rounded-xl">
                                <p className="text-xs font-bold text-primary italic text-center">
                                    "Mengetahui 'berapa banyak' memori yang dipakai adalah langkah pertama menjadi Engineer yang efektif."
                                </p>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* Section 2.4: Stack vs Heap */}
                <ScrollReveal>
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-violet-500/20 p-2 rounded-lg text-violet-400">
                                <span className="material-symbols-outlined text-xl">layers</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.4 Di Mana Data Disimpan? (Stack vs Heap)</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-surface border border-primary/10 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-violet-400">vertical_align_bottom</span>
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">The Stack (Tumpukan)</h4>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                                    Untuk variabel lokal dan data yang ukurannya sudah pasti (Fixed size). Sangat cepat tetapi kapasitasnya terbatas.
                                </p>
                                <div className="flex flex-col-reverse gap-1 font-mono text-[10px]">
                                    <div className="bg-slate-100 dark:bg-slate-900 p-2 rounded text-center text-slate-700 dark:text-slate-200">x = 10</div>
                                    <div className="bg-slate-100 dark:bg-slate-900 p-2 rounded text-center opacity-50 text-slate-700 dark:text-slate-200">Local Var B</div>
                                    <div className="bg-primary/20 text-primary p-2 rounded text-center border border-primary/30">Current Frame</div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-surface border border-primary/10 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-amber-400">cloud</span>
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">The Heap (Lahan Bebas)</h4>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                                    Untuk objek besar atau data yang ukurannya bisa berubah-ubah. Fleksibel tetapi butuh manajemen lebih.
                                </p>
                                <div className="relative h-24 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border border-dashed border-slate-300 dark:border-slate-700">
                                    <div className="absolute top-2 left-4 bg-amber-500/20 text-amber-500 p-2 rounded border border-amber-500/30 text-[10px] font-mono">Object A</div>
                                    <div className="absolute bottom-4 right-6 bg-blue-500/20 text-blue-500 p-2 rounded border border-blue-500/30 text-[10px] font-mono">Large Array</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* Section 2.5: Simulation */}
                <ScrollReveal>
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-rose-500/20 p-2 rounded-lg text-rose-400">
                                <span className="material-symbols-outlined text-xl">analytics</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.5 Simulasi: Lembar Kerja Tracing (Find Max) 📊</h3>
                        </div>

                        {/* Instructional Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {[
                                { step: "1", title: "Inisialisasi", desc: "Tentukan nilai awal variabel sebelum perulangan dimulai.", icon: "start" },
                                { step: "2", title: "Iterasi", desc: "Cek setiap elemen data satu per satu sesuai urutan.", icon: "loop" },
                                { step: "3", title: "Update State", desc: "Perbarui nilai di memori jika kondisi terpenuhi.", icon: "update" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white dark:bg-surface border border-primary/10 p-4 rounded-xl flex gap-4 items-start shadow-sm">
                                    <div className="bg-primary/10 text-primary font-black w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                                        {s.step}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">{s.title}</h5>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Code & Memory Monitor */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
                                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                            Logic.py
                                        </span>
                                    </div>
                                    <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto">
                                        <code className="text-slate-300">
                                            <span className="text-slate-500"># Inisialisasi</span><br />
                                            <span className="text-blue-400">data</span> = [<span className="text-amber-400">7, 2, 9, 4</span>]<br />
                                            <span className="text-blue-400">max_val</span> = <span className="text-blue-400">data</span>[<span className="text-amber-400">0</span>]<br />
                                            <br />
                                            <span className="text-slate-500"># Loop & Update</span><br />
                                            <span className="text-purple-400">for</span> <span className="text-blue-400">angka</span> <span className="text-purple-400">in</span> <span className="text-blue-400">data</span>:<br />
                                            &nbsp;&nbsp;<span className="text-purple-400">if</span> <span className="text-blue-400">angka</span> &gt; <span className="text-blue-400">max_val</span>:<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">max_val</span> = <span className="text-blue-400">angka</span>
                                        </code>
                                    </div>
                                </div>

                                {/* Visual Memory Watch */}
                                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-5 rounded-2xl">
                                    <h5 className="text-xs font-black text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">visibility</span>
                                        Memory Watch (RAM)
                                    </h5>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-3 rounded-lg border border-amber-200 dark:border-amber-900/20 shadow-xs">
                                            <span className="text-xs font-mono text-slate-500">max_val</span>
                                            <span className="text-xl font-black text-primary animate-pulse">9</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white/50 dark:bg-slate-950/50 p-2 rounded-lg border border-amber-200/50 dark:border-amber-900/10">
                                            <span className="text-[10px] font-mono text-slate-400">angka (iterator)</span>
                                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">4</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tracing Worksheet Table */}
                            <div className="lg:col-span-2">
                                <div className="bg-white dark:bg-surface border border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="p-4 border-b border-primary/10 bg-primary/5 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">edit_square</span>
                                        <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Tracing Table Worksheet</h5>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-[11px] sm:text-xs text-left">
                                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 border-b border-primary/10 font-mono">
                                                <tr>
                                                    <th className="px-4 py-3">Puteran</th>
                                                    <th className="px-4 py-3">Index [i]</th>
                                                    <th className="px-4 py-3">Nilai (angka)</th>
                                                    <th className="px-4 py-3">Evaluasi (angka {">"} max)</th>
                                                    <th className="px-4 py-3 text-primary font-bold">State: max_val</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-primary/5">
                                                {[
                                                    { p: "Start", i: "--", n: "--", e: "Inisialisasi", m: "7", c: "text-slate-400" },
                                                    { p: "1", i: "0", n: "7", e: "7 > 7? (False)", m: "7", c: "" },
                                                    { p: "2", i: "1", n: "2", e: "2 > 7? (False)", m: "7", c: "" },
                                                    { p: "3", i: "2", n: "9", e: "9 > 7? (True!)", m: "9", active: true, c: "bg-green-500/5 dark:bg-green-500/10" },
                                                    { p: "4", i: "3", n: "4", e: "4 > 9? (False)", m: "9", c: "" },
                                                ].map((row, idx) => (
                                                    <tr key={idx} className={`${row.c} transition-colors`}>
                                                        <td className="px-4 py-3 font-mono">{row.p}</td>
                                                        <td className="px-4 py-3 font-mono text-slate-500">{row.i}</td>
                                                        <td className="px-4 py-3 font-bold">{row.n}</td>
                                                        <td className="px-4 py-3 italic">{row.e}</td>
                                                        <td className={`px-4 py-3 font-mono font-black ${row.active ? 'text-primary' : ''}`}>
                                                            <div className="flex items-center gap-2">
                                                                {row.active && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>}
                                                                {row.m}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-primary/10">
                                        <p className="text-[10px] text-slate-500 leading-relaxed italic">
                                            * Mahasiswa disarankan membuat tabel serupa di atas kertas saat melakukan debugging kode untuk melatih ketelitian logika.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            </div>
        </div>
    );
}
