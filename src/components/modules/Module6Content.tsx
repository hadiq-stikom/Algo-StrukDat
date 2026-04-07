"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import { motion } from "framer-motion";
import QueueVisualizer from "./QueueVisualizer";
import CircularQueueVisualizer from "./CircularQueueVisualizer";
import VariasiQueueVisualizer from "./VariasiQueueVisualizer";
import PresentationMode from "@/components/PresentationMode";

export default function Module6Content() {
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
                    {questions.map((q, i) => (
                        <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <p className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex gap-2">
                                <span className="text-primary">Q{i + 1}:</span>
                                <span className="whitespace-pre-line">{q.question}</span>
                            </p>
                            {showAnswer ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                    <p className="text-xs font-black text-emerald-600 uppercase mb-1 underline decoration-emerald-500/30">Answer:</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{q.answer}</p>
                                    <p className="text-[10px] text-slate-500 italic font-medium leading-relaxed">{q.explanation}</p>
                                </motion.div>
                            ) : null}
                        </div>
                    ))}
                </div>

                {!showAnswer && (
                    <div className="mt-8 pt-8 border-t-2 border-slate-100 dark:border-slate-800">
                        {password ? (
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative w-full max-w-xs">
                                    <input
                                        type="password"
                                        placeholder="Input Password..."
                                        value={inputPassword}
                                        onChange={(e) => setInputPassword(e.target.value)}
                                        className={`w-full bg-slate-100 dark:bg-slate-900 border-2 ${error ? 'border-rose-500 animate-shake' : 'border-slate-200 dark:border-slate-800'} rounded-xl px-5 py-3 text-sm focus:outline-hidden focus:border-primary transition-all text-center font-bold`}
                                    />
                                </div>
                                <button onClick={handleReveal} className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black px-8 py-3 rounded-xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                                    Unlock Answer
                                </button>
                                {error && <p className="text-rose-500 text-[10px] font-black uppercase tracking-tighter">Password Salah! ❌</p>}
                            </div>
                        ) : (
                            <button onClick={handleReveal} className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all">
                                Show All Answers
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const groupExercise = {
        title: "Tantangan: Sistem Antrean Cerdas",
        description: "Bayangkan Anda sedang merancang sistem antrean untuk sebuah bank atau rumah sakit. Kerjakan tugas berikut bersama kelompok Anda untuk menguji pemahaman Queue!",
        questions: [
            {
                id: 1,
                question: "Prediksi isi Queue: \n1. Enqueue(10)\n2. Enqueue(20)\n3. Dequeue()\n4. Enqueue(30)\n5. Peek()\n6. Dequeue()\nApa elemen yang tersisa?",
                answer: "30",
                explanation: "1. [10]\n2. [10, 20]\n3. [20]\n4. [20, 30]\n5. Peek() -> 20\n6. [30] (20 keluar)\nSisa: [30]"
            },
            {
                id: 2,
                question: "Sebuah Circular Queue memiliki kapasitas (SIZE) 5. \nJika REAR saat ini berada di index 4, di manakah posisi REAR setelah operasi Enqueue berikutnya?",
                answer: "0",
                explanation: "Rumus Circular Queue: (REAR + 1) % SIZE.\n(4 + 1) % 5 = 0. REAR akan kembali berputar ke index 0."
            },
            {
                id: 3,
                question: "Dalam skenario apa kita lebih memilih menggunakan Priority Queue dibandingkan Linear Queue biasa?",
                answer: "Sistem dengan derajat kepentingan berbeda (IGD, Scheduling).",
                explanation: "Priority Queue memungkinkan data yang lebih penting (priority tinggi) untuk diproses terlebih dahulu tanpa menunggu antrean FIFO, sangat krusial untuk kasus seperti penanganan darurat di rumah sakit."
            }
        ]
    };

    const slides = [
        // Slide 1: Concept & FIFO
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-cyan-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-cyan-500/20 shadow-2xl text-cyan-600">
                <span className="material-symbols-outlined text-5xl">group</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Bagian 1: Queue (Antrean) 🛒</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                Prinsip <strong className="text-cyan-600 underline decoration-cyan-500/30">FIFO (First-In-First-Out)</strong>
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center">
                    <p className="text-xl font-black text-cyan-700 dark:text-cyan-400 uppercase mb-6">Analogi Antrean Kasir 🛒</p>
                    <div className="flex gap-3 mb-6 items-center">
                        {[1, 2, 3].map((v) => (
                            <div key={v} className="w-12 h-12 bg-slate-100 dark:bg-slate-700 border-4 border-slate-300 dark:border-slate-500 rounded-full flex items-center justify-center text-lg font-black text-slate-400">
                                {v}
                            </div>
                        ))}
                        <motion.div
                            animate={{ x: [40, 0], opacity: [0, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-14 h-14 bg-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center text-sm font-black text-white"
                        >
                            NEW
                        </motion.div>
                    </div>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl border-4 border-emerald-500/20 shadow-2xl text-left">
                    <p className="text-emerald-400 font-black text-xl mb-6 uppercase tracking-widest">Digital Use Cases:</p>
                    <ul className="space-y-4">
                        {[
                            { icon: "print", title: "Printer Spooling", desc: "Urutan cetak dokumen." },
                            { icon: "router", title: "Network Buffering", desc: "Antrean paket data." },
                            { icon: "schedule", title: "CPU Scheduling", desc: "Ready Queue process." },
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

        // Slide 2: Operations & Pointers
        <div key="s2" className="space-y-8">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-10 uppercase italic">Bagian 2: Core Operations ⚙️</h3>
            <div className="grid grid-cols-3 gap-6">
                {[
                    { label: "ENQUEUE", title: "TAMBAH BELAKANG", desc: "Masuk lewat REAR.", color: "bg-emerald-500" },
                    { label: "DEQUEUE", title: "HAPUS DEPAN", desc: "Keluar lewat FRONT.", color: "bg-rose-500" },
                    { label: "PEEK", title: "LIHAT FRONT", desc: "Intip siapa yang pertama.", color: "bg-amber-500" },
                ].map((op, i) => (
                    <div key={i} className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center">
                        <div className={`${op.color} text-white px-6 py-4 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl mb-6 italic`}>
                            {op.label}
                        </div>
                        <h4 className="font-black text-xl text-slate-900 dark:text-white mb-2">{op.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 font-bold italic h-12">{op.desc}</p>
                        <div className="mt-4 text-primary font-black text-xl">O(1)</div>
                    </div>
                ))}
            </div>
            <div className="bg-blue-500/10 border-4 border-blue-500/30 p-8 rounded-3xl mt-10 grid grid-cols-2 gap-8">
                <div>
                    <p className="text-blue-600 dark:text-blue-400 font-black text-xl mb-2 flex items-center gap-3 italic">
                        <span className="material-symbols-outlined">east</span> FRONT Pointer
                    </p>
                    <p className="text-lg text-slate-700 dark:text-slate-200 font-medium">Menunjuk ke elemen <strong className="text-primary italic">pertama</strong> yang akan diproses.</p>
                </div>
                <div>
                    <p className="text-blue-600 dark:text-blue-400 font-black text-xl mb-2 flex items-center gap-3 italic">
                        <span className="material-symbols-outlined">west</span> REAR Pointer
                    </p>
                    <p className="text-lg text-slate-700 dark:text-slate-200 font-medium">Menunjuk ke elemen <strong className="text-primary italic">terakhir</strong> yang baru saja masuk.</p>
                </div>
            </div>
        </div>,

        // Slide 3: Code Implementation
        <div key="s3" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Bagian 2: Implementasi (Python)</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-cyan-500/20 shadow-2xl">
                <div className="bg-slate-800 px-6 py-3 flex justify-between border-b-2 border-white/10">
                    <span className="text-lg text-slate-300 font-mono font-bold">queue_implementation.py</span>
                    <span className="text-lg text-cyan-400 font-bold uppercase tracking-widest">FIFO ARCHITECTURE</span>
                </div>
                <pre className="p-8 text-2xl font-mono overflow-x-auto leading-relaxed max-h-[60vh]">
                    <code className="text-slate-200">
                        {`\
`}<span className="text-cyan-400">class</span> <span className="text-blue-400">Queue</span>:{`
    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-orange-300">self</span>.items = []{`

    `}    <span className="text-slate-400"># ENQUEUE → O(1)</span>{`
    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">enqueue</span>(<span className="text-orange-300">self</span>, data):{`
    `}        <span className="text-orange-300">self</span>.items.<span className="text-blue-400">append</span>(data){`

    `}    <span className="text-slate-400"># DEQUEUE → O(1)*</span>{`
    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">dequeue</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-cyan-400">if len</span>(<span className="text-orange-300">self</span>.items) &gt; <span className="text-amber-300">0</span>:{`
    `}            <span className="text-cyan-400">return</span> <span className="text-orange-300">self</span>.items.<span className="text-blue-400">pop</span>(<span className="text-amber-300">0</span>){`
    `}        <span className="text-cyan-400">return</span> <span className="text-green-400">"Queue Empty!"</span>
                    </code>
                </pre>
                <div className="p-6 bg-black/40 border-t-2 border-white/10">
                    <p className="text-sm text-slate-400 italic font-bold">
                        *Catatan: pop(0) pada list Python adalah O(n). Untuk performa O(1) murni, gunakan collections.deque.
                    </p>
                </div>
            </div>
        </div>,

        // Slide 4: Visualizer
        <div key="s4" className="space-y-8 h-full flex flex-col items-center justify-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-8 uppercase italic text-center">Bagian 3: Tracing Operasi Queue 🔍</h3>
            <div className="w-full max-w-5xl bg-white dark:bg-slate-950 p-10 rounded-3xl border-4 border-cyan-500/30 shadow-[0_35px_60px_-15px_rgba(6,182,212,0.3)]">
                <QueueVisualizer />
            </div>
        </div>,

        // Slide 5: Circular Queue
        <div key="s5" className="space-y-8 h-full flex flex-col justify-center">
            <div className="bg-slate-900 p-12 rounded-3xl border-4 border-primary/30 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                <h4 className="text-4xl font-black text-white mb-10 uppercase italic flex items-center gap-4">
                    <span className="material-symbols-outlined text-5xl">analytics</span>
                    Bagian 4: Circular Queue 🔄
                </h4>
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6 text-left">
                        <p className="text-2xl text-slate-300 font-bold tracking-tight leading-tight">
                            Masalah Linear Queue: <br />
                            <span className="text-rose-500 italic text-xl">"False Overflow" (Slot Kosong tapi Penuh)</span>
                        </p>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed italic">
                            Saat Dequeue, slot depan kosong. Namun REAR sudah di ujung array, sehingga Enqueue tetap gagal.
                        </p>
                        <div className="bg-amber-500/10 border-2 border-amber-500/30 p-6 rounded-2xl">
                            <p className="text-amber-500 font-black text-lg uppercase mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-xl">lightbulb</span> Solusinya:
                            </p>
                            <p className="text-slate-300 text-xl font-bold italic">
                                Hubungkan ujung array kembali ke awal menggunakan operator Modulo (%)!
                            </p>
                            <p className="text-primary font-black text-2xl font-mono mt-4 tracking-widest text-center">
                                REAR = (REAR + 1) % SIZE
                            </p>
                        </div>
                    </div>
                    <div className="aspect-square rounded-full border-8 border-dashed border-primary/40 flex items-center justify-center relative animate-[spin_10s_linear_infinite]">
                        <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center text-white font-black text-xl italic uppercase -rotate-[spin_10s_linear_infinite]">
                            Modulo Power
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 6: Modulo Power Implementation
        <div key="s5-2" className="space-y-6 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Bagian 5: Modulo Power ⚙️</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-surface border-4 border-amber-500/20 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-amber-500/20 p-4 rounded-2xl text-amber-600">
                            <span className="material-symbols-outlined text-4xl font-black">calculate</span>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">Sisa Bagi (Modulo)</h4>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-bold italic mb-6">
                        Modulo (<code className="text-amber-500 bg-amber-500/10 px-2 rounded">%</code>) memastikan nilai selalu berputar kembali ke <code className="text-primary bg-primary/10 px-2 rounded">0</code> setelah mencapai <code className="text-primary bg-primary/10 px-2 rounded">SIZE - 1</code>.
                    </p>
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <p className="font-bold text-slate-700 dark:text-slate-300">Misal SIZE = 5 (Index 0-4)</p>
                        <ul className="font-mono text-sm space-y-2 text-slate-600 dark:text-slate-400">
                            <li><span className="text-primary/60">(0 + 1) % 5 =</span> <strong className="text-primary">1</strong></li>
                            <li><span className="text-primary/60">(3 + 1) % 5 =</span> <strong className="text-primary">4</strong></li>
                            <li className="bg-amber-500/10 p-2 rounded text-amber-600 font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">cycle</span>
                                <span>(4 + 1) % 5 = <strong className="text-amber-500 text-lg">0</strong> (Kembali ke Awal)</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-emerald-500/20 shadow-2xl flex flex-col">
                    <div className="bg-slate-800 px-6 py-4 flex justify-between border-b-2 border-white/10">
                        <span className="text-slate-300 font-mono font-bold">circular_queue.py</span>
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Implementation</span>
                    </div>
                    <pre className="p-6 text-sm md:text-base font-mono overflow-auto flex-1">
                        <code className="text-slate-200">
                            {`\\\n`}<span className="text-cyan-400">class</span> <span className="text-blue-400">CircularQueue</span>:{`\n    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>, size):{`\n    `}        <span className="text-orange-300">self</span>.size = size{`\n    `}        <span className="text-orange-300">self</span>.queue = [<span className="text-amber-300">None</span>] * size{`\n    `}        <span className="text-orange-300">self</span>.front = <span className="text-orange-300">self</span>.rear = <span className="text-amber-300">-1</span>{`\n\n    `}    <span className="text-slate-400"># ENQUEUE → Circular</span>{`\n    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">enqueue</span>(<span className="text-orange-300">self</span>, data):{`\n    `}        <span className="text-cyan-400">if</span> (<span className="text-orange-300">self</span>.rear + <span className="text-amber-300">1</span>) % <span className="text-orange-300">self</span>.size == <span className="text-orange-300">self</span>.front:{`\n    `}            <span className="text-blue-400">print</span>(<span className="text-green-400">"Penuh!"</span>); <span className="text-cyan-400">return</span>{`\n    `}        <span className="text-cyan-400">if</span> <span className="text-orange-300">self</span>.front == <span className="text-amber-300">-1</span>: <span className="text-orange-300">self</span>.front = <span className="text-amber-300">0</span>{`\n    `}        <span className="bg-amber-500/20 text-amber-300 px-1 rounded"><span className="text-orange-300">self</span>.rear = (<span className="text-orange-300">self</span>.rear + <span className="text-amber-300">1</span>) % <span className="text-orange-300">self</span>.size</span>{`\n    `}        <span className="text-orange-300">self</span>.queue[<span className="text-orange-300">self</span>.rear] = data
                        </code>
                    </pre>
                </div>
            </div>
        </div>,

        // Slide 7: Modulo Power – Live Demo
        <div key="s5-3" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-2xl font-black text-center text-slate-900 dark:text-white uppercase italic">Bagian 5: Modulo Power — Demo Animasi 🔬</h3>
            <p className="text-center text-slate-500 dark:text-slate-400 text-sm font-medium italic mb-2">
                Perbandingan langsung: <span className="text-rose-400 font-bold">Linear Queue (gagal)</span> vs <span className="text-cyan-400 font-bold">Circular Queue (berhasil)</span>
            </p>
            <CircularQueueVisualizer />
        </div>,

        // Slide 8: Variations (Theory & Code)
        <div key="s6" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Bagian 6: Variasi Queue 🎭</h3>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-surface border-4 border-rose-500/20 rounded-3xl p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-rose-500/20 p-3 rounded-2xl text-rose-600">
                            <span className="material-symbols-outlined text-3xl font-black">priority_high</span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic">Priority Queue</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-bold italic mb-4">Elemen dengan prioritas lebih tinggi diproses lebih dulu, meskipun datang belakangan.</p>
                    <div className="p-3 bg-rose-500/5 border-2 border-rose-500/20 rounded-xl mb-4">
                        <p className="font-black text-rose-600 uppercase text-xs mb-1">Analogi: IGD Rumah Sakit</p>
                        <p className="text-slate-500 font-medium text-xs">Pasien kritis ditangani sebelum pasien batuk-pilek.</p>
                    </div>
                    <div className="text-[10px] font-mono bg-slate-900 p-2 rounded-xl border border-slate-700 text-slate-200">
                        <span className="text-cyan-400">import</span> heapq<br />
                        pq = []<br />
                        heapq.heappush(pq, (<span className="text-amber-300">1</span>, <span className="text-green-400">"Kritis"</span>))<br />
                        heapq.heappush(pq, (<span className="text-amber-300">3</span>, <span className="text-green-400">"Batuk"</span>))
                    </div>
                </div>
                <div className="bg-white dark:bg-surface border-4 border-blue-500/20 rounded-3xl p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-2xl text-blue-600">
                            <span className="material-symbols-outlined text-3xl font-black">swap_horiz</span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase italic">Deque (Double-Ended)</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-bold italic mb-4">Queue dua arah. Elemen bisa di-push/pop dari ujung <strong>Depan</strong> maupun <strong>Belakang</strong>.</p>
                    <div className="p-3 bg-blue-500/5 border-2 border-blue-500/20 rounded-xl mb-4">
                        <p className="font-black text-blue-600 uppercase text-xs mb-1">Kegunaan: Stealing Algorithm</p>
                        <p className="text-slate-500 font-medium text-xs">Menyeimbangkan beban kerja antar core pada prosesor modern.</p>
                    </div>
                    <div className="text-[10px] font-mono bg-slate-900 p-2 rounded-xl border border-slate-700 text-slate-200">
                        <span className="text-cyan-400">from</span> collections <span className="text-cyan-400">import</span> deque<br />
                        d = deque([<span className="text-amber-300">1, 2, 3</span>])<br />
                        d.appendleft(<span className="text-amber-300">0</span>) <span className="text-slate-400"># Masuk depan</span>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 9: Variations Demo
        <div key="s6-2" className="space-y-4 pt-4">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-2 uppercase italic">Bagian 6: Variasi Queue — Demo Animasi 🔬</h3>
            <p className="text-center text-slate-500 dark:text-slate-400 text-sm font-medium italic mb-2">
                Simulasi interaktif <span className="text-rose-400 font-bold">Priority Queue</span> & <span className="text-blue-400 font-bold">Deque</span>
            </p>
            <div className="w-full">
                <VariasiQueueVisualizer />
            </div>
        </div>,

        // Slide 8: Comparison
        <div key="s7" className="space-y-8">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-8 uppercase italic">Bagian 7: Perbandingan Implementasi 📊</h3>
            <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950/50 border-b-4 border-primary/10">
                            <th className="p-6 text-xl font-black uppercase tracking-widest text-primary">Fitur</th>
                            <th className="p-6 text-xl font-black uppercase tracking-widest text-emerald-500">Array Implementation</th>
                            <th className="p-6 text-xl font-black uppercase tracking-widest text-blue-500">Linked List Implementation</th>
                        </tr>
                    </thead>
                    <tbody className="text-lg font-bold text-slate-600 dark:text-slate-400">
                        <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                            <td className="p-6 font-black text-slate-900 dark:text-white uppercase italic">Ukuran Memory</td>
                            <td className="p-6 italic">Fixed (Statis). Boros jika jarang dipakai.</td>
                            <td className="p-6 italic">Dynamic. Sesuai jumlah data yang ada.</td>
                        </tr>
                        <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                            <td className="p-6 font-black text-slate-900 dark:text-white uppercase italic">Alokasi Memory</td>
                            <td className="p-6">Berurutan (Contiguous).</td>
                            <td className="p-6">Terpencar (Non-contiguous).</td>
                        </tr>
                        <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                            <td className="p-6 font-black text-slate-900 dark:text-white uppercase italic">Kompleksitas (Enqueue)</td>
                            <td className="p-6">O(1) - Sangat Cepat.</td>
                            <td className="p-6">O(1) - Sangat Cepat.</td>
                        </tr>
                        <tr>
                            <td className="p-6 font-black text-slate-900 dark:text-white uppercase italic">Kasus Penggunaan</td>
                            <td className="p-6 text-emerald-600 font-bold uppercase text-sm">Sistem dengan memory terbatas.</td>
                            <td className="p-6 text-blue-600 font-bold uppercase text-sm">Sistem dengan beban data fluktuatif.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>,

        // Slide 9: Quiz / Self Check
        <div key="s8" className="space-y-8 h-full flex flex-col justify-center text-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-8 uppercase italic">Bagian 8: Self-Check & Kuis 🎯</h3>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Q1 */}
                <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
                    <div>
                        <h4 className="text-lg font-black text-primary uppercase mb-4 italic tracking-widest">Uji Pemahaman #1</h4>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
                            Urutan operasi Queue: <br />
                            <code className="text-2xl font-black text-cyan-600 block mt-4">Eq(X), Eq(Y), Dq(), Eq(Z), Dq()</code>
                        </p>
                    </div>
                    <div className="bg-emerald-500/10 border-4 border-emerald-500/30 p-6 rounded-2xl text-left">
                        <p className="text-2xl font-black text-emerald-600 uppercase mb-2">Jawaban: [Z]</p>
                        <p className="text-sm text-slate-500 font-bold leading-relaxed whitespace-pre-line">
                            Tracing:
                            1. Enqueue(X) → Stack: [X]
                            2. Enqueue(Y) → Stack: [X, Y]
                            3. Dequeue() → Stack: [Y] (X keluar)
                            4. Enqueue(Z) → Stack: [Y, Z]
                            5. Dequeue() → Stack: [Z] (Y keluar)
                        </p>
                    </div>
                </div>

                {/* Q2 */}
                <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
                    <div>
                        <h4 className="text-lg font-black text-primary uppercase mb-4 italic tracking-widest">Uji Pemahaman #2</h4>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                            Apa perbedaan utama prinsip <br />
                            <strong className="text-primary italic">Queue vs Stack</strong>?
                        </p>
                    </div>
                    <div className="bg-cyan-500/10 border-4 border-cyan-500/30 p-6 rounded-2xl text-left">
                        <p className="text-lg text-slate-700 dark:text-slate-200 font-bold leading-relaxed">
                            <strong className="text-cyan-600 text-2xl font-black italic">Queue: FIFO</strong> <br />
                            (First-In-First-Out) - Pertama masuk, pertama keluar. <br /><br />
                            <strong className="text-rose-500 text-2xl font-black italic">Stack: LIFO</strong> <br />
                            (Last-In-First-Out) - Terakhir masuk, pertama keluar.
                        </p>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 10: Group Exercise
        <div key="s9" className="space-y-8 h-full flex flex-col justify-center">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-8 uppercase italic">Bagian 9: Tugas Kelompok Komprehensif 👥</h3>
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

        // Slide 11: Summary
        <div key="s10" className="space-y-8 h-full flex flex-col justify-center text-center">
            <div className="bg-linear-to-br from-cyan-500/20 to-primary/20 p-12 rounded-3xl border-4 border-cyan-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>
                <h4 className="text-5xl font-black text-slate-900 dark:text-white mb-10 uppercase italic tracking-tighter decoration-cyan-500 decoration-8 underline-offset-8">Ringkasan Materi</h4>
                <div className="grid grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {[
                        { label: "FIFO", desc: "First-In-First-Out." },
                        { label: "Front & Rear", desc: "Dua pointer penjaga." },
                        { label: "Circular", desc: "Modulo Math power." },
                        { label: "Variations", desc: "PQ & Deque." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-5 p-6 bg-white/60 dark:bg-white/10 rounded-2xl border-2 border-cyan-500/20 hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-4xl text-cyan-500 font-black">check_circle</span>
                            <div>
                                <p className="font-black text-xl text-slate-900 dark:text-white">{item.label}</p>
                                <p className="text-slate-600 dark:text-slate-400 font-bold italic">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-12 text-2xl font-black text-cyan-500 uppercase tracking-[0.3em] font-mono">Module 6 Complete</p>
            </div>
        </div>
    ];
    return (
        <div className="space-y-16 pb-12">

            {/* ─── BAGIAN 1: KONSEP QUEUE ─── */}
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
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Konsep Queue (Antrean) 🛒</span>
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
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Operasi & Pointer ⚙️</span>
                            <div className="flex gap-2">
                                <button onClick={() => openPresentation(1)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">info</span> CORE OPS
                                </button>
                                <button onClick={() => openPresentation(2)} className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-600 text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
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
`}<span className="text-cyan-400">class</span> <span className="text-blue-400">Queue</span>:{`
    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-orange-300">self</span>.items = []{`

    `}    <span className="text-slate-400"># ENQUEUE → O(1)</span>{`
    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">enqueue</span>(<span className="text-orange-300">self</span>, data):{`
    `}        <span className="text-orange-300">self</span>.items.<span className="text-blue-400">append</span>(data){`

    `}    <span className="text-slate-400"># DEQUEUE → O(1)*</span>{`
    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">dequeue</span>(<span className="text-orange-300">self</span>):{`
    `}        <span className="text-cyan-400">if len</span>(<span className="text-orange-300">self</span>.items) &gt; <span className="text-amber-300">0</span>:{`
    `}            <span className="text-cyan-400">return</span> <span className="text-orange-300">self</span>.items.<span className="text-blue-400">pop</span>(<span className="text-amber-300">0</span>){`
    `}        <span className="text-cyan-400">return</span> <span className="text-green-400">"Queue Empty!"</span>
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
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Tracing Operasi Queue 🔍</span>
                            <button onClick={() => openPresentation(3)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
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
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Circular Queue 🔄</span>
                            <button onClick={() => openPresentation(4)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">loop</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 border-2 border-primary/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>

                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4 text-left">
                                    <h4 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-rose-500">warning</span>
                                        Masalah Linear Queue
                                    </h4>
                                    <p className="text-slate-300 text-sm font-bold tracking-tight leading-tight">
                                        <span className="text-rose-500 italic">"False Overflow" (Slot Kosong tapi Penuh)</span>
                                    </p>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                                        Saat Dequeue, slot depan kosong. Namun REAR sudah di ujung array, sehingga Enqueue tetap gagal.
                                    </p>
                                    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
                                        <p className="text-xs text-amber-500 font-black uppercase mb-1 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">lightbulb</span>
                                            Solusinya:
                                        </p>
                                        <p className="text-xs text-slate-300 font-medium italic">
                                            Hubungkan ujung array kembali ke awal menggunakan operator Modulo (%)!
                                        </p>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-primary uppercase">Modulo Math</p>
                                            <p className="text-2xl font-black text-white">(REAR + 1) % SIZE</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 5: MODULO POWER ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Modulo Power ⚙️</span>
                            <div className="flex gap-2">
                                <button onClick={() => openPresentation(5)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 p-8 border-b-2 md:border-b-0 md:border-r-2 border-primary/10">
                                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase flex items-center gap-3">
                                        <span className="material-symbols-outlined text-amber-500 text-3xl">calculate</span>
                                        Sisa Bagi (Modulo)
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                        Operator Modulo (<code className="text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded">%</code>) bertugas untuk mengembalikan nilai ke titik awal (0) ketika sudah melewati batas maksimal (<code className="text-primary bg-primary/10 px-1 py-0.5 rounded">SIZE</code>). Inilah yang membuat index akan "berputar" tiada henti di dalam dimensi array.
                                    </p>

                                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                                        <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Contoh Simulasi (SIZE = 5)</p>
                                        <div className="space-y-3 font-mono text-xs">
                                            <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-2 rounded border border-slate-100 dark:border-slate-800">
                                                <span className="text-slate-500">REAR = 0</span>
                                                <span>(0 + 1) % 5 = <strong className="text-primary">1</strong></span>
                                            </div>
                                            <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-2 rounded border border-slate-100 dark:border-slate-800">
                                                <span className="text-slate-500">REAR = 3</span>
                                                <span>(3 + 1) % 5 = <strong className="text-primary">4</strong></span>
                                            </div>
                                            <div className="flex justify-between items-center bg-amber-500/10 p-2 rounded border border-amber-500/20 text-amber-700 dark:text-amber-400">
                                                <span className="font-bold flex items-center gap-2"><span className="material-symbols-outlined text-sm">cycle</span> REAR = 4 (Mentok)</span>
                                                <strong className="text-base">(4 + 1) % 5 = 0</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 bg-slate-900 p-0 flex flex-col">
                                    <div className="bg-slate-800 px-4 py-3 border-b-2 border-white/10 flex justify-between items-center">
                                        <span className="text-slate-300 font-mono text-xs font-bold">circular_queue.py</span>
                                        <span className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">Code Snippet</span>
                                    </div>
                                    <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed">
                                        <code className="text-slate-200">
                                            {`\\\n`}<span className="text-cyan-400">class</span> <span className="text-blue-400">CircularQueue</span>:{`\n    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>, size):{`\n    `}        <span className="text-orange-300">self</span>.size = size{`\n    `}        <span className="text-orange-300">self</span>.queue = [<span className="text-amber-300">None</span>] * size{`\n    `}        <span className="text-orange-300">self</span>.front = <span className="text-orange-300">self</span>.rear = <span className="text-amber-300">-1</span>{`\n\n    `}    <span className="text-slate-400"># ENQUEUE → Circular</span>{`\n    `}    <span className="text-cyan-400">def</span> <span className="text-blue-400">enqueue</span>(<span className="text-orange-300">self</span>, data):{`\n    `}        <span className="text-cyan-400">if</span> (<span className="text-orange-300">self</span>.rear + <span className="text-amber-300">1</span>) % <span className="text-orange-300">self</span>.size == <span className="text-orange-300">self</span>.front:{`\n    `}            <span className="text-blue-400">print</span>(<span className="text-green-400">"Penuh!"</span>); <span className="text-cyan-400">return</span>{`\n    `}        <span className="text-cyan-400">if</span> <span className="text-orange-300">self</span>.front == <span className="text-amber-300">-1</span>: <span className="text-orange-300">self</span>.front = <span className="text-amber-300">0</span>{`\n    `}        <span className="bg-amber-500/20 text-amber-300 px-1 rounded"><span className="text-orange-300">self</span>.rear = (<span className="text-orange-300">self</span>.rear + <span className="text-amber-300">1</span>) % <span className="text-orange-300">self</span>.size</span>{`\n    `}        <span className="text-orange-300">self</span>.queue[<span className="text-orange-300">self</span>.rear] = data
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-cyan-500 text-2xl">play_circle</span>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase">Demo Animasi: Linear vs Circular</h4>
                            <button onClick={() => openPresentation(6)} className="ml-auto bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-600 text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">slideshow</span> SLIDE DEMO
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                            Jalankan simulasi step-by-step di bawah ini untuk melihat perbedaan nyata antara Linear Queue yang mengalami <span className="text-rose-500 font-bold">False Overflow</span> dan Circular Queue yang berhasil berputar menggunakan <span className="text-cyan-500 font-bold">Modulo Power</span>.
                        </p>
                        <CircularQueueVisualizer />
                    </div>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 6: VARIASI QUEUE (PRIORITY & DEQUE) ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Variasi Queue 🎭</span>
                            <button onClick={() => openPresentation(7)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
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
                                    <span className="text-cyan-400">import</span> heapq<br />
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
                                    <span className="text-cyan-400">from</span> collections <span className="text-cyan-400">import</span> deque<br />
                                    d = deque([<span className="text-amber-300">1, 2, 3</span>])<br />
                                    d.appendleft(<span className="text-amber-300">0</span>) <span className="text-slate-400"># Masuk depan</span><br />
                                    d.pop() <span className="text-slate-400"># Keluar belakang</span>
                                </div>
                            </div>
                        </FocusSection>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="space-y-4 border-t-2 border-dashed border-slate-200 dark:border-slate-800 pt-8 mt-8">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-teal-500 text-2xl">play_circle</span>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase">Demo Animasi: Variasi Queue</h4>
                            <button onClick={() => openPresentation(8)} className="ml-auto bg-teal-500/20 hover:bg-teal-500/30 text-teal-600 text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">slideshow</span> SLIDE DEMO
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                            Jalankan simulasi interaktif di bawah ini untuk menguji bagaimana kode di atas bekerja: <strong className="text-rose-500">Priority Queue</strong> yang mendahulukan prioritas tertinggi secara otomatis, dan <strong className="text-blue-500">Deque</strong> yang bisa dirombak datanya dari depan atau belakang.
                        </p>
                        <VariasiQueueVisualizer />
                    </div>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 7: IMPLEMENTASI (ARRAY VS LINKED LIST) ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 7: Perbandingan Implementasi 📊</span>
                            <button onClick={() => openPresentation(9)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">leaderboard</span> SLIDE
                            </button>
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

            {/* ─── BAGIAN 8: SELF CHECK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 8: Self-Check & Kuis</span>
                            <button onClick={() => openPresentation(10)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
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

            {/* ─── BAGIAN 9: TUGAS KELOMPOK ─── */}
            <div className="space-y-10 pt-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 9: Tugas Kelompok Komprehensif 👥</span>
                            <button onClick={() => openPresentation(11)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="max-w-4xl mx-auto">
                        <ExerciseCard
                            title={groupExercise.title}
                            description={groupExercise.description}
                            questions={groupExercise.questions}
                            isGroup={true}
                            password="psw_jawaban_Bd@"
                        />
                    </div>
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
