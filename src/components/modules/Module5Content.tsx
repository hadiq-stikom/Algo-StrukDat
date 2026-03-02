"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import { motion } from "framer-motion";
import StackVisualizer from "./StackVisualizer";

export default function Module5Content() {
    return (
        <div className="space-y-16 pb-12">

            {/* ─── BAGIAN 1: KONSEP STACK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Konsep Stack (Tumpukan)</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-rose-500/30 p-2 rounded-lg text-rose-500">
                                    <span className="material-symbols-outlined text-xl">layers</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Prinsip LIFO</h3>
                            </div>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    <strong className="text-slate-900 dark:text-white">Stack</strong> adalah struktur data linear yang mengikuti prinsip <strong className="text-rose-500">LIFO (Last-In-First-Out)</strong>. Artinya, elemen yang terakhir kali dimasukkan adalah yang pertama kali akan dikeluarkan.
                                </p>

                                {/* LIFO Metaphor visual */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="p-5 bg-rose-500/10 border-2 border-rose-500/30 rounded-xl flex flex-col items-center">
                                        <p className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase mb-4 text-center">Analogi: Tumpukan Piring 🍽️</p>
                                        <div className="flex flex-col-reverse gap-1 mb-4 w-32">
                                            {[1, 2, 3].map((v) => (
                                                <div key={v} className="h-4 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-500 rounded-full shadow-sm"></div>
                                            ))}
                                            <motion.div
                                                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="h-4 bg-primary border-2 border-primary rounded-full shadow-lg shadow-primary/30"
                                            ></motion.div>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500 text-center italic">
                                            Piring terakhir yang diletakkan di atas adalah piring pertama yang akan diambil.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl">
                                        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase mb-3">Kegunaan Stack di Dunia IT:</p>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3">
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">undo</span>
                                                <div className="text-xs">
                                                    <p className="font-black text-slate-900 dark:text-white uppercase leading-none mb-1">Undo / Redo</p>
                                                    <p className="text-slate-500">Menyimpan history perubahan dokumen.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">terminal</span>
                                                <div className="text-xs">
                                                    <p className="font-black text-slate-900 dark:text-white uppercase leading-none mb-1">Call Stack</p>
                                                    <p className="text-slate-500">Mengatur urutan pemanggilan fungsi (Function Call).</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">arrow_back</span>
                                                <div className="text-xs">
                                                    <p className="font-black text-slate-900 dark:text-white uppercase leading-none mb-1">Back Navigation</p>
                                                    <p className="text-slate-500">History navigasi pada web browser.</p>
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

            {/* ─── BAGIAN 2: OPERASI STACK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Operasi & Implementasi</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-rose-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-rose-500/20">
                                    <h4 className="text-xl font-black text-rose-600 dark:text-rose-400 mb-4 italic uppercase">Core Operations</h4>

                                    <div className="space-y-6">
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-black">PUSH</div>
                                            <div className="text-xs font-medium">
                                                <p className="text-slate-900 dark:text-white font-black">Menambah data</p>
                                                <p className="text-slate-500 italic">Complexity: O(1)</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 border-2 border-primary text-primary rounded-lg flex items-center justify-center font-black italic shadow">POP</div>
                                            <div className="text-xs font-medium">
                                                <p className="text-slate-900 dark:text-white font-black">Menghapus data teratas</p>
                                                <p className="text-slate-500 italic">Complexity: O(1)</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-500 rounded-lg flex items-center justify-center font-black text-[10px]">PEEK</div>
                                            <div className="text-xs font-medium">
                                                <p className="text-slate-900 dark:text-white font-black">Melihat data teratas</p>
                                                <p className="text-slate-500 italic">Complexity: O(1)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 p-4 bg-yellow-500/5 border-2 border-yellow-500/20 rounded-xl">
                                        <p className="text-[10px] font-black text-yellow-600 dark:text-yellow-400 uppercase mb-2 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">warning</span>
                                            Stack Underflow / Overflow
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                            <strong>Underflow:</strong> Terjadi saat mencoba POP pada stack kosong.<br />
                                            <strong>Overflow:</strong> Terjadi saat mencoba PUSH pada stack yang sudah penuh (untuk implementasi fix-size).
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-0 bg-slate-900">
                                    <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                        <span className="text-xs text-slate-300 font-mono font-bold">stack_implementation.py</span>
                                        <span className="text-xs text-rose-400 font-bold">LIFO</span>
                                    </div>
                                    <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed">
                                        <code className="text-slate-200">
                                            {`\
`}<span className="text-purple-400">class</span> <span className="text-blue-400">Stack</span>:{`
    `}    <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-orange-300">self</span>.items = []{`
    
    `}    <span className="text-purple-400">def</span> <span className="text-blue-400">is_empty</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-purple-400">return</span> <span className="text-blue-400">len</span>(<span className="text-orange-300">self</span>.items) == <span className="text-amber-300">0</span>{`
    
    `}    <span className="text-slate-400"># PUSH → O(1)</span>{`
    `}    <span className="text-purple-400">def</span> <span className="text-blue-400">push</span>(<span className="text-orange-300">self</span>, data):{`
    `}        <span className="text-orange-300">self</span>.items.<span className="text-blue-400">append</span>(data){`
    
    `}    <span className="text-slate-400"># POP → O(1)</span>{`
    `}    <span className="text-purple-400">def</span> <span className="text-blue-400">pop</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.<span className="text-blue-400">is_empty</span>():{`
    `}            <span className="text-purple-400">return</span> <span className="text-orange-300">self</span>.items.<span className="text-blue-400">pop</span>(){`
    `}        <span className="text-purple-400">return</span> <span className="text-green-400">"Empty Stack!"</span>{`
    
    `}    <span className="text-slate-400"># PEEK → O(1)</span>{`
    `}    <span className="text-purple-400">def</span> <span className="text-blue-400">peek</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.<span className="text-blue-400">is_empty</span>():{`
    `}            <span className="text-purple-400">return</span> <span className="text-orange-300">self</span>.items[-<span className="text-amber-300">1</span>]{`
    `}        <span className="text-purple-400">return</span> <span className="text-amber-300">None</span>
                                        </code>
                                    </pre>
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
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Tracing Operasi Stack</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <StackVisualizer />
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 4: POLISH NOTATION ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Polish Notation</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-500/30 p-2 rounded-lg text-blue-500">
                                    <span className="material-symbols-outlined text-xl">calculate</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Ekspresi Matematika</h3>
                            </div>

                            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-8 font-medium">
                                Komputer lebih mudah mengevaluasi ekspresi matematika yang <strong className="text-slate-900 dark:text-white">tidak memiliki tanda kurung</strong> dan <strong className="text-slate-900 dark:text-white">prioritas operator</strong> yang ambigu. Inilah sebabnya kita menggunakan Polish Notation.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Infix */}
                                <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-slate-200 dark:border-slate-800">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Standard</p>
                                    <h5 className="text-lg font-black text-slate-900 dark:text-white mb-3 italic">Infix</h5>
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 text-center font-mono text-xl font-black text-primary mb-3">
                                        (3 + 4) * 2
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">Operator berada <span className="text-slate-900 dark:text-white font-bold">di antara</span> operand. Perlu (kurung) untuk prioritas.</p>
                                </div>

                                {/* Postfix */}
                                <div className="p-5 bg-emerald-500/5 rounded-2xl border-2 border-emerald-500/30">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Reverse Polish</p>
                                    <h5 className="text-lg font-black text-emerald-600 dark:text-emerald-400 mb-3 italic">Postfix</h5>
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-emerald-500/30 text-center font-mono text-xl font-black text-emerald-500 mb-3">
                                        3 4 + 2 *
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">Operator berada <span className="text-emerald-600 dark:text-emerald-400 font-bold">di akhir</span>. Sangat mudah dievaluasi menggunakan <strong className="text-emerald-600">Stack</strong>.</p>
                                </div>

                                {/* Prefix */}
                                <div className="p-5 bg-blue-500/5 rounded-2xl border-2 border-blue-500/30">
                                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Polish</p>
                                    <h5 className="text-lg font-black text-blue-600 dark:text-blue-400 mb-3 italic">Prefix</h5>
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-blue-500/30 text-center font-mono text-xl font-black text-blue-500 mb-3">
                                        * + 3 4 2
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">Operator berada <span className="text-blue-600 dark:text-blue-400 font-bold">di depan</span>. Jarang digunakan di level aplikasi umum.</p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                {/* Algoritma Evaluasi */}
                <ScrollReveal>
                    <div className="bg-slate-900 border-2 border-primary/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
                        <h4 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">algorithm</span>
                            Algoritma Evaluasi Postfix (Stack)
                        </h4>

                        <div className="space-y-4 relative z-10">
                            {[
                                { step: "1", text: "Baca ekspresi dari kiri ke kanan.", color: "slate" },
                                { step: "2", text: "Jika ketemu ANGKA → PUSH ke stack.", color: "emerald" },
                                { step: "3", text: "Jika ketemu OPERATOR → POP 2 angka teratas (A & B).", color: "rose" },
                                { step: "4", text: "Hitung (A [operator] B) dan PUSH hasilnya kembali ke stack.", color: "amber" },
                                { step: "5", text: "Hasil akhir adalah elemen tunggal yang tersisa di stack.", color: "primary" }
                            ].map((s, i) => (
                                <div key={i} className="flex gap-4 items-center group">
                                    <div className={`w-8 h-8 rounded-full bg-${s.color === "primary" ? "primary" : s.color + "-500/20"} border border-${s.color === "primary" ? "primary" : s.color + "-500/40"} flex items-center justify-center text-xs font-black text-white group-hover:scale-110 transition-transform`}>
                                        {s.step}
                                    </div>
                                    <p className="text-slate-300 text-sm font-medium">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="mt-8 text-center bg-primary/5 p-6 rounded-2xl border-2 border-dashed border-primary/20">
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-400 italic">
                            💡 Cobalah simulasi Postfix Evaluator pada visualizer di Bagian 3 (Pilih mode POSTFIX) untuk melihat algoritma ini bekerja secara visual!
                        </p>
                    </div>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 5: SELF CHECK ─── */}
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
                                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-black text-primary">Push(A), Push(B), Pop(), Push(C), Pop()</code> <br />
                                    Elemen apa yang tersisa di dalam stack?
                                </p>
                                <details className="group cursor-pointer">
                                    <summary className="list-none bg-primary text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl text-center shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        Lihat Jawaban
                                    </summary>
                                    <div className="mt-4 p-4 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-xl">
                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            Jawaban: [A] <br />
                                            Tracing: <br />
                                            1. Push(A) → Stack: [A] <br />
                                            2. Push(B) → Stack: [A, B] <br />
                                            3. Pop() → Stack: [A] (B keluar) <br />
                                            4. Push(C) → Stack: [A, C] <br />
                                            5. Pop() → Stack: [A] (C keluar)
                                        </p>
                                    </div>
                                </details>
                            </div>
                        </FocusSection>

                        <FocusSection>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm h-full">
                                <h5 className="text-lg font-black text-slate-900 dark:text-white mb-4 italic uppercase">Uji Pemahaman #2</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mb-6">
                                    Hitunglah hasil dari ekspresi Postfix berikut: <br />
                                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-black text-emerald-500">10 2 8 + *</code>
                                </p>
                                <details className="group cursor-pointer">
                                    <summary className="list-none bg-primary text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl text-center shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                        Lihat Jawaban
                                    </summary>
                                    <div className="mt-4 p-4 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-xl">
                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                            Jawaban: 100 <br />
                                            Tracing: <br />
                                            1. Push(10) <br />
                                            2. Push(2) <br />
                                            3. Push(8) <br />
                                            4. Ada +, Pop(8) & Pop(2), Push(2+8=10) <br />
                                            5. Ada *, Pop(10) & Pop(10), Push(10*10=100)
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
