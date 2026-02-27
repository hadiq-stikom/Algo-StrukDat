"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";

export default function Module1Content() {
    return (
        <div className="space-y-16 pb-12">
            {/* --- BAGIAN 1: PENGENALAN MATAKULIAH --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Pengenalan Matakuliah</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Section 1.1: Orientation */}
                <ScrollReveal>
                    <FocusSection>
                        <section>
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
                                        Kita akan menempuh perjalanan koding yang terstruktur, mulai dari fondasi memori hingga arsitektur Graf tingkat lanjut. Fokus kita bukan hanya "bisa jalan", tapi <strong className="text-slate-900 dark:text-white">"efisien dan logis"</strong>.
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
                                            Penekanan utama ada pada <strong className="text-slate-900 dark:text-white">kemampuan analisis dan pembuktian logika</strong>. Nilai tinggi bukan untuk yang paling cepat ngetik, tapi untuk yang bisa membuktikan kenapa kodenya efisien melalui <em>manual tracing</em>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Section 1.2: AI Learning Paradigm */}
                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-amber-500/30 p-2 rounded-lg text-amber-500">
                                    <span className="material-symbols-outlined text-xl">smart_toy</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">1.2 Paradigma Belajar dengan AI 🤖</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "Fase 1: Konsep 🧠",
                                        desc: "Memahami logika di atas kertas tanpa sentuh komputer sama sekali.",
                                        color: "bg-indigo-500",
                                        border: "border-indigo-500/30"
                                    },
                                    {
                                        title: "Fase 2: Eksperimen 💻",
                                        desc: "Gunakan AI untuk mencoba berbagai variasi kode dengan cepat.",
                                        color: "bg-primary",
                                        border: "border-primary/30"
                                    },
                                    {
                                        title: "Fase 3: Validasi 📊",
                                        desc: "Buktikan secara manual bahwa output AI benar dan efisien.",
                                        color: "bg-green-500",
                                        border: "border-green-500/30"
                                    },
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

            {/* --- BAGIAN 2: KONSEP DASAR STRUKTUR DATA --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Konsep Dasar Struktur Data</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Section 2.1: Analogy */}
                <ScrollReveal>
                    <FocusSection>
                        <section>
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
                                                Data disimpan asal letak. Mencari "buku sejarah" berarti harus membongkar semua kardus satu per satu <strong className="text-red-600 dark:text-red-400">(In-efisien)</strong>.
                                            </p>
                                        </div>
                                        <div className="p-5 bg-green-500/10 border-2 border-green-500/30 rounded-xl">
                                            <p className="text-sm font-black text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">Perpustakaan Terindeks ✅</p>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                                Data disusun berdasarkan kategori. Mencari "buku sejarah" hanya butuh waktu detik. Inilah kekuatan <strong className="text-slate-900 dark:text-white">Struktur Data</strong>.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-8 p-4 bg-primary/10 rounded-xl border-2 border-primary/20">
                                        <p className="text-sm font-medium italic text-center text-slate-800 dark:text-slate-100">
                                            "Struktur Data adalah cara kita mengatur dan menyimpan data di memori komputer agar dapat diakses dan dimodifikasi secara efisien."
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
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-cyan-500/30 p-2 rounded-lg text-cyan-500">
                                    <span className="material-symbols-outlined text-xl">memory</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.2 Anatomi Memori Komputer 🧠</h3>
                            </div>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    Bayangkan memori (RAM) sebagai barisan kotak yang tak terhingga, di mana setiap kotak memiliki <strong className="text-slate-900 dark:text-white">Alamat (Address)</strong> unik.
                                </p>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6 font-mono text-xs">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div key={i} className={`border-2 rounded-lg p-2 flex flex-col items-center gap-1 ${i === 3 ? 'bg-primary/20 border-primary text-primary shadow-md shadow-primary/20' : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                            <span className="text-slate-500 dark:text-slate-400 text-[10px] underline">0x{i.toString(16).toUpperCase().padStart(2, '0')}</span>
                                            <span className="font-black text-xs">{i === 3 ? 'DATA' : '0'}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-900/70 p-4 rounded-xl border border-slate-300 dark:border-slate-700">
                                    <ul className="space-y-3">
                                        <li className="flex gap-3 text-sm text-slate-800 dark:text-slate-100 font-medium">
                                            <span className="font-black text-primary shrink-0">Bit:</span> Unit terkecil (0 atau 1).
                                        </li>
                                        <li className="flex gap-3 text-sm text-slate-800 dark:text-slate-100 font-medium">
                                            <span className="font-black text-primary shrink-0">Byte:</span> Kumpulan 8 bit. 1 Byte bisa menyimpan satu karakter (huruf).
                                        </li>
                                        <li className="flex gap-3 text-sm text-slate-800 dark:text-slate-100 font-medium">
                                            <span className="font-black text-primary shrink-0">Address:</span> Lokasi fisik di RAM tempat data tersebut disimpan.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Section 2.3: Data Size */}
                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-green-500/30 p-2 rounded-lg text-green-500">
                                    <span className="material-symbols-outlined text-xl">fit_screen</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.3 Logika Data: Ukuran itu Penting! 📏</h3>
                            </div>
                            <div className="bg-linear-to-br from-primary/5 to-accent/5 border-2 border-primary/30 rounded-2xl p-6">
                                <p className="text-sm text-slate-700 dark:text-slate-200 mb-6 font-medium leading-relaxed">
                                    Setiap tipe data memesan sejumlah Byte di memori. Pemilihan tipe data yang tepat sangat penting untuk efisiensi.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-5 bg-white dark:bg-surface rounded-xl border-2 border-primary/20 shadow-sm">
                                        <span className="text-sm font-black text-primary uppercase block mb-2">Integer</span>
                                        <div className="flex gap-1 mb-3">
                                            {[1, 2, 3, 4].map(i => <div key={i} className="w-5 h-5 bg-primary rounded-sm shadow"></div>)}
                                        </div>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 font-mono font-bold">4 Bytes</p>
                                    </div>
                                    <div className="p-5 bg-white dark:bg-surface rounded-xl border-2 border-primary/20 shadow-sm">
                                        <span className="text-sm font-black text-primary uppercase block mb-2">Char</span>
                                        <div className="flex gap-1 mb-3">
                                            <div className="w-5 h-5 bg-primary rounded-sm shadow"></div>
                                        </div>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 font-mono font-bold">1 Byte</p>
                                    </div>
                                    <div className="p-5 bg-white dark:bg-surface rounded-xl border-2 border-primary/20 shadow-sm">
                                        <span className="text-sm font-black text-primary uppercase block mb-2">Double</span>
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="w-5 h-5 bg-primary rounded-sm shadow"></div>)}
                                        </div>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 font-mono font-bold">8 Bytes</p>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-primary/15 rounded-xl border border-primary/30">
                                    <p className="text-sm font-black text-primary italic text-center">
                                        "Mengetahui 'berapa banyak' memori yang dipakai adalah langkah pertama menjadi Engineer yang efektif."
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Section 2.4: Stack vs Heap */}
                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-violet-500/30 p-2 rounded-lg text-violet-500">
                                    <span className="material-symbols-outlined text-xl">layers</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">2.4 Di Mana Data Disimpan? (Stack vs Heap)</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-surface border-2 border-violet-500/20 rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-violet-500 text-2xl">vertical_align_bottom</span>
                                        <h4 className="font-black text-base text-slate-900 dark:text-white">The Stack (Tumpukan)</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-medium">
                                        Untuk variabel lokal dan data yang ukurannya sudah pasti <strong className="text-slate-900 dark:text-white">(Fixed size)</strong>. Sangat cepat tetapi kapasitasnya terbatas.
                                    </p>
                                    <div className="flex flex-col-reverse gap-1 font-mono text-xs">
                                        <div className="bg-slate-200 dark:bg-slate-900 p-2.5 rounded-lg text-center text-slate-800 dark:text-slate-200 font-bold">x = 10</div>
                                        <div className="bg-slate-200 dark:bg-slate-900 p-2.5 rounded-lg text-center opacity-60 text-slate-800 dark:text-slate-200 font-bold">Local Var B</div>
                                        <div className="bg-primary/20 text-primary p-2.5 rounded-lg text-center border-2 border-primary/30 font-black">Current Frame ▼</div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-surface border-2 border-amber-500/20 rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-amber-500 text-2xl">cloud</span>
                                        <h4 className="font-black text-base text-slate-900 dark:text-white">The Heap (Lahan Bebas)</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-medium">
                                        Untuk objek besar atau data yang ukurannya bisa berubah-ubah. <strong className="text-slate-900 dark:text-white">Fleksibel</strong> tetapi butuh manajemen lebih.
                                    </p>
                                    <div className="relative h-24 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border-2 border-dashed border-slate-400 dark:border-slate-600">
                                        <div className="absolute top-2 left-4 bg-amber-500/30 text-amber-600 dark:text-amber-400 p-2 rounded-lg border-2 border-amber-500/40 text-xs font-mono font-bold shadow">Object A</div>
                                        <div className="absolute bottom-3 right-5 bg-blue-500/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg border-2 border-blue-500/40 text-xs font-mono font-bold shadow">Large Array</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Section 2.5: Simulation */}
                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-rose-500/30 p-2 rounded-lg text-rose-500">
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
                                    <div key={i} className="bg-white dark:bg-surface border-2 border-primary/20 p-4 rounded-xl flex gap-4 items-start shadow-sm">
                                        <div className="bg-primary/15 text-primary font-black w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg border border-primary/30">
                                            {s.step}
                                        </div>
                                        <div>
                                            <h5 className="font-black text-sm text-slate-900 dark:text-white mb-1">{s.title}</h5>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Code & Memory Monitor */}
                                <div className="lg:col-span-1 space-y-6">
                                    <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                                        <div className="p-3 border-b border-slate-700 flex items-center justify-between bg-slate-800">
                                            <span className="text-xs text-slate-300 font-mono uppercase tracking-widest flex items-center gap-2 font-bold">
                                                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                                Logic.py
                                            </span>
                                        </div>
                                        <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                                            <code className="text-slate-200">
                                                <span className="text-slate-400"># Inisialisasi</span><br />
                                                <span className="text-blue-400">data</span> = [<span className="text-amber-300">7, 2, 9, 4</span>]<br />
                                                <span className="text-blue-400">max_val</span> = <span className="text-blue-400">data</span>[<span className="text-amber-300">0</span>]<br />
                                                <br />
                                                <span className="text-slate-400"># Loop & Update</span><br />
                                                <span className="text-purple-400">for</span> <span className="text-blue-400">angka</span> <span className="text-purple-400">in</span> <span className="text-blue-400">data</span>:<br />
                                                &nbsp;&nbsp;<span className="text-purple-400">if</span> <span className="text-blue-400">angka</span> &gt; <span className="text-blue-400">max_val</span>:<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">max_val</span> = <span className="text-blue-400">angka</span>
                                            </code>
                                        </div>
                                    </div>

                                    {/* Visual Memory Watch */}
                                    <div className="bg-amber-50 dark:bg-amber-900/15 border-2 border-amber-300 dark:border-amber-700 p-5 rounded-2xl">
                                        <h5 className="text-sm font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">visibility</span>
                                            Memory Watch (RAM)
                                        </h5>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-3 rounded-xl border-2 border-amber-300 dark:border-amber-700 shadow-sm">
                                                <span className="text-sm font-mono text-slate-600 dark:text-slate-300 font-bold">max_val</span>
                                                <span className="text-2xl font-black text-primary animate-pulse">9</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-white/60 dark:bg-slate-950/60 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/30">
                                                <span className="text-sm font-mono text-slate-500 dark:text-slate-400 font-medium">angka (iterator)</span>
                                                <span className="text-base font-bold text-slate-700 dark:text-slate-200">4</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tracing Worksheet Table */}
                                <div className="lg:col-span-2">
                                    <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                        <div className="p-4 border-b-2 border-primary/20 bg-primary/5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-sm">edit_square</span>
                                            <h5 className="font-black text-sm text-slate-900 dark:text-white">Tracing Table Worksheet</h5>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-b-2 border-primary/10 font-mono font-black">
                                                    <tr>
                                                        <th className="px-4 py-3">Puteran</th>
                                                        <th className="px-4 py-3">Index [i]</th>
                                                        <th className="px-4 py-3">Nilai (angka)</th>
                                                        <th className="px-4 py-3">Evaluasi (angka {">"} max)</th>
                                                        <th className="px-4 py-3 text-primary">State: max_val</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y-2 divide-primary/5">
                                                    {[
                                                        { p: "Start", i: "--", n: "--", e: "Inisialisasi", m: "7", c: "text-slate-500 dark:text-slate-400", bg: "" },
                                                        { p: "1", i: "0", n: "7", e: "7 > 7? (False)", m: "7", c: "text-slate-800 dark:text-slate-100", bg: "" },
                                                        { p: "2", i: "1", n: "2", e: "2 > 7? (False)", m: "7", c: "text-slate-800 dark:text-slate-100", bg: "" },
                                                        { p: "3", i: "2", n: "9", e: "9 > 7? (True!)", m: "9", active: true, c: "text-slate-800 dark:text-slate-100", bg: "bg-green-500/10" },
                                                        { p: "4", i: "3", n: "4", e: "4 > 9? (False)", m: "9", c: "text-slate-800 dark:text-slate-100", bg: "" },
                                                    ].map((row, idx) => (
                                                        <tr key={idx} className={`${row.bg} transition-colors`}>
                                                            <td className={`px-4 py-3 font-mono font-bold ${row.c}`}>{row.p}</td>
                                                            <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400 font-bold">{row.i}</td>
                                                            <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-100">{row.n}</td>
                                                            <td className="px-4 py-3 italic text-slate-700 dark:text-slate-200 font-medium">{row.e}</td>
                                                            <td className={`px-4 py-3 font-mono font-black ${row.active ? 'text-primary' : 'text-slate-800 dark:text-slate-100'}`}>
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
                                        <div className="p-4 bg-slate-100 dark:bg-slate-900/80 border-t-2 border-primary/10">
                                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic font-medium">
                                                * Mahasiswa disarankan membuat tabel serupa di atas kertas saat melakukan debugging kode untuk melatih ketelitian logika.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>
        </div>
    );
}
