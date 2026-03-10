"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import { motion } from "framer-motion";
import StackVisualizer from "./StackVisualizer";
import PresentationMode from "@/components/PresentationMode";

export default function Module5Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const ExerciseCard = ({ title, description, questions, isGroup = false, password = "" }: { title: string, description: string, questions: any[], isGroup?: boolean, password?: string }) => {
        const [showAnswer, setShowAnswer] = useState(false);
        const [inputPassword, setInputPassword] = useState("");
        const [error, setError] = useState(false);

        const handleReveal = () => {
            if (password) {
                if (inputPassword === password) {
                    setShowAnswer(true);
                    setError(false);
                } else {
                    setError(true);
                    setTimeout(() => setError(false), 2000);
                }
            } else {
                setShowAnswer(true);
            }
        };

        return (
            <div className={`bg-white dark:bg-surface border-2 ${showAnswer ? 'border-primary/50 shadow-md' : 'border-primary/20 shadow-sm'} rounded-3xl p-8 transition-all`}>
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-2xl font-black">{isGroup ? 'groups' : 'quiz'}</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{title}</h4>
                        <p className="text-sm text-slate-500 font-medium italic">{description}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {questions.map((q: any) => (
                        <div key={q.id} className="border-l-4 border-primary/20 pl-6 py-2">
                            <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                                <span className="text-primary font-black mr-2">#{q.id}</span>
                                {q.question}
                            </p>
                            {showAnswer && (
                                <div className="mt-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <p className="text-sm font-black text-emerald-500 uppercase mb-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">check_circle</span> Jawaban: {q.answer}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic border-t border-black/5 dark:border-white/5 pt-1">
                                        {q.explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 border-t-2 border-primary/10 pt-8">
                    {password && !showAnswer && (
                        <input
                            type="password"
                            placeholder="Password Jawaban..."
                            className={`w-full sm:w-64 p-3 bg-slate-50 dark:bg-slate-900 border-2 ${error ? 'border-rose-500 animate-shake' : 'border-primary/20'} rounded-xl text-sm font-bold`}
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleReveal()}
                        />
                    )}
                    <button
                        onClick={showAnswer ? () => { setShowAnswer(false); setInputPassword(""); } : handleReveal}
                        className={`w-full sm:w-auto px-8 py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 active:scale-95 ${showAnswer ? 'bg-slate-200 dark:bg-slate-800 text-slate-600' : 'bg-primary text-white shadow-lg shadow-primary/30'}`}
                    >
                        <span className="material-symbols-outlined text-sm">{showAnswer ? 'lock' : 'lock_open'}</span>
                        {showAnswer ? 'KUNCI KEMBALI' : 'BUKA SOLUSI'}
                    </button>
                    {error && <p className="text-xs font-black text-rose-500 uppercase animate-bounce">Password Salah! ❌</p>}
                </div>
            </div>
        );
    };

    const groupExercise = {
        title: "Tantangan: Smart Undo-Redo Manager",
        description: "Bayangkan Anda sedang membangun sebuah text editor. Fitur 'Undo' adalah aplikasi klasik dari Stack. Kerjakan tugas berikut bersama kelompok Anda!",
        questions: [
            {
                id: 1,
                question: "Trace operasi stack untuk skenario berikut: \n1. Type('A')\n2. Type('B')\n3. Undo()\n4. Type('C')\n5. Undo()\nManakah elemen yang tersisa di stack di akhir operasi?",
                answer: "A",
                explanation: "1. Push(A) -> [A]\n2. Push(B) -> [A, B]\n3. Pop() -> [A] (B dihapus)\n4. Push(C) -> [A, C]\n5. Pop() -> [A] (C dihapus)\nStack akhir: [A]"
            },
            {
                id: 2,
                question: "Ubahlah ekspresi Infix berikut menjadi Postfix secara manual: (A + B) * (C - D)",
                answer: "A B + C D - *",
                explanation: "1. (A + B) -> A B +\n2. (C - D) -> C D -\n3. Hasil -> (A B +) (C D -) *"
            },
            {
                id: 3,
                question: "Sebutkan keunggulan utama menggunakan Stack untuk fitur Undo dibandingkan menggunakan Array biasa dengan index pointer!",
                answer: "Efisiensi memori dan kemudahan manajemen LIFO.",
                explanation: "Stack secara alami mengelola urutan terakhir masuk sebagai yang pertama keluar, sangat cocok dengan logika 'pembatalan' aksi terakhir tanpa perlu menggeser elemen lain di memori (O(1))."
            }
        ]
    };

    const slides = [
        // Slide 1: Concept & LIFO
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-rose-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-rose-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-rose-500">layers</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Bagian 1: Stack (Tumpukan)</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                Prinsip <strong className="text-rose-500 underline decoration-rose-500/30">LIFO (Last-In-First-Out)</strong>
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
                    <p className="text-xl font-black text-rose-600 dark:text-rose-400 uppercase mb-6">Analogi Tumpukan Piring 🍽️</p>
                    <div className="flex flex-col-reverse gap-2 mb-6 w-40">
                        {[1, 2, 3].map((v) => (
                            <div key={v} className="h-6 bg-slate-100 dark:bg-slate-700 border-4 border-slate-300 dark:border-slate-500 rounded-full shadow-md"></div>
                        ))}
                        <motion.div
                            animate={{ y: [0, -30, 0], opacity: [0.5, 1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="h-6 bg-primary border-4 border-primary rounded-full shadow-2xl shadow-primary/40"
                        ></motion.div>
                    </div>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl border-4 border-emerald-500/20 shadow-2xl text-left">
                    <p className="text-emerald-400 font-black text-xl mb-6 uppercase tracking-widest">Digital Use Cases:</p>
                    <ul className="space-y-4">
                        {[
                            { icon: "undo", title: "Undo/Redo", desc: "History perubahan." },
                            { icon: "terminal", title: "Call Stack", desc: "Urutan fungsi." },
                            { icon: "arrow_back", title: "Navigation", desc: "History browser." },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4">
                                <span className="material-symbols-outlined text-emerald-500 text-3xl">{item.icon}</span>
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

        // Slide 2: Operations
        <div key="s2" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-10 uppercase italic">Bagian 2: Core Operations</h3>
            <div className="grid grid-cols-3 gap-6">
                {[
                    { label: "PUSH", title: "TAMBAH DATA", desc: "Meletakkan data di paling atas.", color: "bg-primary" },
                    { label: "POP", title: "HAPUS DATA", desc: "Mengambil data paling atas.", color: "bg-rose-500" },
                    { label: "PEEK", title: "LIHAT DATA", desc: "Melihat tanpa menghapus.", color: "bg-amber-500" },
                ].map((op, i) => (
                    <div key={i} className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center">
                        <div className={`${op.color} text-white w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl mb-6 italic`}>
                            {op.label}
                        </div>
                        <h4 className="font-black text-xl text-slate-900 dark:text-white mb-2">{op.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 font-bold italic">{op.desc}</p>
                        <div className="mt-4 text-primary font-black text-xl">O(1)</div>
                    </div>
                ))}
            </div>
            <div className="bg-rose-500/10 border-4 border-rose-500/30 p-8 rounded-3xl mt-10">
                <p className="text-rose-600 dark:text-rose-400 font-black text-xl mb-2 flex items-center gap-3">
                    <span className="material-symbols-outlined">warning</span> Underflow & Overflow
                </p>
                <p className="text-lg text-slate-700 dark:text-slate-200 font-bold">
                    <strong className="text-rose-500">Underflow:</strong> POP pada stack kosong. <br />
                    <strong className="text-rose-500">Overflow:</strong> PUSH pada stack penuh.
                </p>
            </div>
        </div>,

        // Slide 3: Code Implementation
        <div key="s3" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Bagian 2: Implementasi (Python)</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-rose-500/20 shadow-2xl">
                <div className="bg-slate-800 px-6 py-3 flex justify-between border-b-2 border-white/10">
                    <span className="text-lg text-slate-300 font-mono font-bold">stack.py</span>
                    <span className="text-lg text-rose-400 font-bold uppercase tracking-widest">LIFO Architecture</span>
                </div>
                <pre className="p-8 text-xl font-mono overflow-x-auto leading-relaxed max-h-[60vh]">
                    <code>
                        <span className="text-purple-400">class</span> <span className="text-blue-400">Stack</span>:<br />
                        &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.items = []<br /><br />
                        &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">is_empty</span>(<span className="text-orange-300">self</span>):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">len</span>(<span className="text-orange-300">self</span>.items) == <span className="text-amber-300">0</span><br /><br />
                        &nbsp;&nbsp;<span className="text-slate-400"># PUSH → O(1)</span><br />
                        &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">push</span>(<span className="text-orange-300">self</span>, data):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.items.<span className="text-blue-400">append</span>(data)<br /><br />
                        &nbsp;&nbsp;<span className="text-slate-400"># POP → O(1)</span><br />
                        &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">pop</span>(<span className="text-orange-300">self</span>):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.<span className="text-blue-400">is_empty</span>():<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-orange-300">self</span>.items.<span className="text-blue-400">pop</span>()<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-400">"Empty Stack!"</span><br /><br />
                        &nbsp;&nbsp;<span className="text-slate-400"># PEEK → O(1)</span><br />
                        &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">peek</span>(<span className="text-orange-300">self</span>):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.<span className="text-blue-400">is_empty</span>():<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-orange-300">self</span>.items[-<span className="text-amber-300">1</span>]<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-amber-300">None</span>
                    </code>
                </pre>
            </div>
        </div>,

        // Slide 4: Visualizer
        <div key="s4" className="space-y-8 h-full flex flex-col items-center justify-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-8 uppercase italic text-center">Bagian 3: Tracing Operasi Stack</h3>
            <div className="w-full max-w-5xl bg-white dark:bg-slate-950 p-10 rounded-3xl border-4 border-rose-500/30 shadow-[0_35px_60px_-15px_rgba(244,63,94,0.3)]">
                <StackVisualizer />
            </div>
        </div>,

        // Slide 5: Polish Notation
        <div key="s5" className="space-y-8">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-8 uppercase italic">Bagian 4: Polish Notation</h3>
            <p className="text-2xl text-center text-slate-600 dark:text-slate-300 font-bold max-w-4xl mx-auto mb-10">
                Komputer lebih mudah mengevaluasi ekspresi matematika yang <strong className="text-primary italic">tidak memiliki tanda kurung</strong> dan <strong className="text-primary italic">prioritas operator</strong> yang ambigu. Inilah sebabnya kita menggunakan Polish Notation.
            </p>
            <div className="grid grid-cols-3 gap-6">
                {[
                    { type: "Infix", example: "(3 + 4) * 2", desc: <span>Operator berada <strong className="text-slate-900 dark:text-white">di antara</strong> operand. Perlu (kurung) untuk prioritas.</span>, color: "border-slate-300" },
                    { type: "Postfix", example: "3 4 + 2 *", desc: <span>Operator berada <strong className="text-emerald-500">di akhir</strong>. Sangat mudah dievaluasi menggunakan <strong className="text-emerald-500">Stack</strong>.</span>, color: "border-emerald-500 text-emerald-500" },
                    { type: "Prefix", example: "* + 3 4 2", desc: <span>Operator berada <strong className="text-blue-500">di depan</strong>. Jarang digunakan di level aplikasi umum.</span>, color: "border-blue-500 text-blue-500" },
                ].map((item, i) => (
                    <div key={i} className={`bg-white dark:bg-slate-900 border-4 ${item.color.split(' ')[0]} rounded-3xl p-8 shadow-2xl text-center`}>
                        <h4 className="text-2xl font-black mb-6 uppercase italic">{item.type}</h4>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl font-mono text-2xl font-black mb-4 tracking-tighter shadow-inner">
                            {item.example}
                        </div>
                        <p className="text-lg font-bold text-slate-500">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 6: Algorithm
        <div key="s6" className="space-y-8 h-full flex flex-col justify-center">
            <div className="bg-slate-900 p-12 rounded-3xl border-4 border-primary/30 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                <h4 className="text-4xl font-black text-white mb-10 uppercase italic flex items-center gap-4">
                    <span className="material-symbols-outlined text-5xl text-primary">algorithm</span>
                    Bagian 4: Algoritma Evaluasi Postfix (Stack)
                </h4>
                <div className="space-y-6">
                    {[
                        { step: "1", text: "Baca ekspresi dari kiri ke kanan.", color: "emerald" },
                        { step: "2", text: "Jika ketemu ANGKA → PUSH ke stack.", color: "emerald" },
                        { step: "3", text: "Jika ketemu OPERATOR → POP 2 angka teratas (A & B).", color: "rose" },
                        { step: "4", text: "Hitung (A [operator] B) dan PUSH hasilnya kembali ke stack.", color: "amber" },
                        { step: "5", text: "Hasil akhir adalah elemen tunggal yang tersisa di stack.", color: "primary" },
                    ].map((s, i) => (
                        <div key={i} className="flex gap-6 items-center">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center font-black text-2xl text-white italic">
                                {s.step}
                            </div>
                            <p className="text-2xl text-slate-300 font-bold tracking-tight">{s.text}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-10 p-6 bg-white/5 border-2 border-dashed border-white/20 rounded-2xl">
                    <p className="text-xl text-slate-400 font-bold italic text-center">
                        💡 Cobalah simulasi Postfix Evaluator pada visualizer di Slide 4 untuk melihat algoritma ini bekerja secara visual!
                    </p>
                </div>
            </div>
        </div>,

        // Slide 7: Infix to Postfix Algorithm
        <div key="s7" className="space-y-8 h-full flex flex-col justify-center">
            <div className="bg-slate-900 p-12 rounded-3xl border-4 border-blue-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
                <h4 className="text-4xl font-black text-white mb-10 uppercase italic flex items-center gap-4">
                    <span className="material-symbols-outlined text-5xl text-blue-500">sync_alt</span>
                    Bagian 5: Algoritma Infix ke Postfix (Shunting-yard)
                </h4>
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        {[
                            { step: "1", label: "Scan", text: "Baca token dari KIRI ke KANAN.", color: "slate" },
                            { step: "2", label: "Operand", text: "Tulis langsung ke output (biasanya string Postfix).", color: "emerald" },
                            { step: "3", label: "(", text: "Push (masukkan) ke dalam stack.", color: "blue" },
                            { step: "4", label: "Operator", text: "POP operator yang lebih kuat/setara, lalu PUSH operator baru.", color: "rose" },
                            { step: "5", label: ")", text: "POP & Tulis output sampai bertemu '(', lalu buang '('.", color: "amber" },
                        ].map((s, i) => (
                            <div key={i} className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-xl bg-white/10 border-2 border-white/20 flex items-center justify-center font-black text-xl text-white italic">
                                    {s.step}
                                </div>
                                <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-black text-primary min-w-[80px] text-center uppercase tracking-tighter shadow-xs">{s.label}</div>
                                <p className="text-xl text-slate-300 font-bold">{s.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                        <p className="text-blue-400 font-black mb-4 uppercase text-sm tracking-widest">Tabel Prioritas (Precedence):</p>
                        <table className="w-full text-white text-lg">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="py-2 text-left">Level</th>
                                    <th className="py-2 text-left">Operators</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <td className="py-3 font-mono text-xl text-emerald-400">3 (Tinggi)</td>
                                    <td className="py-3 font-black">^ (Pangkat)</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="py-3 font-mono text-xl text-amber-400">2 (Sedang)</td>
                                    <td className="py-3 font-black">* , /</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-mono text-xl text-rose-400">1 (Rendah)</td>
                                    <td className="py-3 font-black">+ , -</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 8: Quiz / Self Check
        <div key="s8" className="space-y-8 h-full flex flex-col justify-center text-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-8 uppercase italic">Bagian 6: Self-Check & Kuis 🎯</h3>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Q1 */}
                <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
                    <div>
                        <h4 className="text-lg font-black text-primary uppercase mb-4 italic tracking-widest">Uji Pemahaman #1</h4>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                            Diberikan urutan operasi berikut: <br />
                            <code className="text-2xl font-black text-primary block mt-4">Push(A), Push(B), Pop(), Push(C), Pop()</code> <br />
                            Elemen apa yang tersisa di dalam stack?
                        </p>
                    </div>
                    <div className="bg-emerald-500/10 border-4 border-emerald-500/30 p-6 rounded-2xl text-left">
                        <p className="text-2xl font-black text-emerald-600 uppercase mb-2">Jawaban: [A]</p>
                        <p className="text-sm text-slate-500 font-bold leading-relaxed whitespace-pre-line">
                            Tracing:
                            1. Push(A) → Stack: [A]
                            2. Push(B) → Stack: [A, B]
                            3. Pop() → Stack: [A] (B keluar)
                            4. Push(C) → Stack: [A, C]
                            5. Pop() → Stack: [A] (C keluar)
                        </p>
                    </div>
                </div>

                {/* Q2 */}
                <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
                    <div>
                        <h4 className="text-lg font-black text-primary uppercase mb-4 italic tracking-widest">Uji Pemahaman #2</h4>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                            Hitunglah hasil dari ekspresi Postfix berikut: <br />
                            <code className="text-3xl font-black text-emerald-500 tracking-widest block mt-4">10 2 8 + *</code>
                        </p>
                    </div>
                    <div className="bg-emerald-500/10 border-4 border-emerald-500/30 p-6 rounded-2xl text-left">
                        <p className="text-2xl font-black text-emerald-600 uppercase mb-2">Jawaban: 100</p>
                        <p className="text-sm text-slate-500 font-bold leading-relaxed whitespace-pre-line">
                            Tracing:
                            1. Push(10)
                            2. Push(2)
                            3. Push(8)
                            4. Ada +, Pop(8) & Pop(2), Push(2+8=10)
                            5. Ada *, Pop(10) & Pop(10), Push(10*10=100)
                        </p>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 9: Group Exercise
        <div key="s9" className="space-y-8 h-full flex flex-col justify-center">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-8 uppercase italic">Bagian 7: Tugas Kelompok Komprehensif 👥</h3>
            <div className="max-w-6xl mx-auto w-full">
                <ExerciseCard
                    title={groupExercise.title}
                    description={groupExercise.description}
                    questions={groupExercise.questions}
                    isGroup={true}
                    password="psw_jawaban_Bd@"
                />
            </div>
        </div>,

        // Slide 10: Final Summary (Moved)
        <div key="s10" className="space-y-8 h-full flex flex-col justify-center text-center">
            <div className="bg-linear-to-br from-rose-500/20 to-primary/20 p-12 rounded-3xl border-4 border-rose-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]"></div>
                <h4 className="text-5xl font-black text-slate-900 dark:text-white mb-10 uppercase italic tracking-tighter decoration-rose-500 decoration-8 underline-offset-8">Ringkasan Materi</h4>
                <div className="grid grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {[
                        { label: "LIFO", desc: "Prinsip utama tumpukan." },
                        { label: "O(1) Access", desc: "Push & Pop sangat cepat." },
                        { label: "Shunting-yard", desc: "Konversi Infix ke Postfix." },
                        { label: "Postfix Eval", desc: "Aplikasi nyata Stack." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-5 p-6 bg-white/60 dark:bg-white/10 rounded-2xl border-2 border-rose-500/20 hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-4xl text-rose-500 font-black">check_circle</span>
                            <div>
                                <p className="font-black text-xl text-slate-900 dark:text-white">{item.label}</p>
                                <p className="text-slate-600 dark:text-slate-400 font-bold italic">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-12 text-2xl font-black text-rose-500 uppercase tracking-[0.3em] font-mono">Module 5 Complete</p>
            </div>
        </div>
    ];
    return (
        <div className="space-y-16 pb-12">

            {/* ─── BAGIAN 1: KONSEP STACK ─── */}
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
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Konsep Stack (Tumpukan)</span>
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
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Operasi & Implementasi</span>
                            <div className="flex gap-2">
                                <button onClick={() => openPresentation(1)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">info</span> CORE OPS
                                </button>
                                <button onClick={() => openPresentation(2)} className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-500 text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">code</span> CODE
                                </button>
                            </div>
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
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Tracing Operasi Stack</span>
                            <button onClick={() => openPresentation(3)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
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
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Polish Notation</span>
                            <div className="flex gap-2">
                                <button onClick={() => openPresentation(4)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">info</span> TYPES
                                </button>
                                <button onClick={() => openPresentation(5)} className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">algorithm</span> ALGO
                                </button>
                            </div>
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

            {/* ─── BAGIAN 5: KONVERSI INFIX KE POSTFIX ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Konversi Infix ke Postfix 🔄</span>
                            <button onClick={() => openPresentation(6)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-8 shadow-sm">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase italic tracking-tight flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">sync_alt</span>
                                Algoritma Shunting-yard
                            </h3>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium mb-6">
                                        Untuk mengubah Infix menjadi Postfix, stack digunakan untuk menyimpan <strong className="text-primary italic">operator</strong> sementara menunggu operand pasangannya.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            { t: "1. Scan", d: "Baca token dari KIRI ke KANAN." },
                                            { t: "2. Operand", d: "Tulis langsung ke output (biasanya string Postfix)." },
                                            { t: "3. '(' ", d: "Push (masukkan) ke dalam stack." },
                                            { t: "4. Operator", d: "POP operator yang lebih kuat/setara, lalu PUSH operator baru." },
                                            { t: "5. ')' ", d: "POP & Tulis output sampai bertemu '(', lalu buang '('." }
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4">
                                                <div className="bg-primary/10 text-primary font-black px-3 py-1 rounded text-xs min-w-[80px] text-center">{item.t}</div>
                                                <p className="text-xs text-slate-500 font-bold">{item.d}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-slate-900 rounded-2xl p-6 border-2 border-primary/20 shadow-xl">
                                    <h4 className="text-sm font-black text-primary uppercase mb-4 tracking-widest italic">Operator Precedence</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                                            <span className="text-emerald-400 font-black">LEVEL 3</span>
                                            <span className="text-white font-mono text-xl font-bold">^ (Power)</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                                            <span className="text-amber-400 font-black">LEVEL 2</span>
                                            <span className="text-white font-mono text-xl font-bold">* , /</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                                            <span className="text-rose-400 font-black">LEVEL 1</span>
                                            <span className="text-white font-mono text-xl font-bold">+ , -</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 6: SELF CHECK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Self-Check & Kuis 🎯</span>
                            <button onClick={() => openPresentation(7)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
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

            {/* ─── BAGIAN 7: TUGAS KELOMPOK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 7: Tugas Kelompok Komprehensif 👥</span>
                            <button onClick={() => openPresentation(8)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <ExerciseCard
                        title={groupExercise.title}
                        description={groupExercise.description}
                        questions={groupExercise.questions}
                        isGroup={true}
                        password="psw_jawaban_Bd@"
                    />
                </ScrollReveal>
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
