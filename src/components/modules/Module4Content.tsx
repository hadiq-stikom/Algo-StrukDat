"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import LinkedListVisualizer from "./LinkedListVisualizer";
import PresentationMode from "@/components/PresentationMode";

export default function Module4Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const ExerciseCard = ({ item, isPresentation = false, password = "" }: { item: any, isPresentation?: boolean, password?: string }) => {
        const [showAnswer, setShowAnswer] = useState(false);
        const [inputPassword, setInputPassword] = useState("");
        const [error, setError] = useState(false);
        const colorClass = item.color === 'blue' ? 'blue' : item.color === 'amber' ? 'amber' : 'violet';

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

        if (isPresentation) {
            return (
                <div className={`p-6 bg-${colorClass}-500/10 border-2 border-${colorClass}-500/30 rounded-2xl shadow-lg transition-all`}>
                    <p className="text-lg font-bold italic text-slate-700 dark:text-slate-200 mb-4">"{item.question}"</p>
                    {showAnswer ? (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className={`text-xl font-black text-${colorClass}-600 mb-2 uppercase flex items-center gap-2`}>
                                <span className="material-symbols-outlined">check_circle</span>
                                {item.answer}
                            </div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed border-t border-black/5 pt-2 italic">
                                {item.explanation}
                            </p>
                            <button
                                onClick={() => setShowAnswer(false)}
                                className="mt-4 text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-tighter"
                            >
                                Tutup Jawaban
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {password && (
                                <input
                                    type="password"
                                    placeholder="Masukkan Password Dosen..."
                                    className={`w-full p-3 bg-white dark:bg-slate-900 border-2 ${error ? 'border-red-500 animate-shake' : 'border-primary/20'} rounded-xl text-center text-sm font-bold`}
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                />
                            )}
                            <button
                                onClick={handleReveal}
                                className={`w-full py-4 border-2 border-dashed border-${colorClass}-500/40 rounded-xl text-${colorClass}-600 font-black hover:bg-${colorClass}-500/5 transition-all flex items-center justify-center gap-2 group`}
                            >
                                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">{password ? 'lock_open' : 'visibility'}</span>
                                {password ? 'BUKA KUNCI JAWABAN' : 'LIHAT JAWABAN'}
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className={`group bg-white dark:bg-surface border-2 ${showAnswer ? `border-${colorClass}-500/50 shadow-md` : 'border-primary/20 shadow-sm'} rounded-2xl p-6 transition-all`}>
                <div className="flex items-start gap-4 mb-4">
                    <div className={`p-2 rounded-lg bg-${colorClass}-500/10 text-${colorClass}-500`}>
                        <span className="material-symbols-outlined font-black text-xl">{password ? 'groups' : 'quiz'}</span>
                    </div>
                    <div>
                        {password && <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 block">Tugas Kelompok</span>}
                        <p className="font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                            {item.question}
                        </p>
                    </div>
                </div>
                <div className="pl-12 text-left">
                    {showAnswer ? (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className={`text-lg font-black text-${colorClass}-600 dark:text-${colorClass}-400 mb-2 uppercase italic underline decoration-wavy underline-offset-4`}>
                                Jawaban: {item.answer}
                            </div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">psychology</span> Penjelasan Logis
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-white/5 shadow-inner italic whitespace-pre-line">
                                {item.explanation}
                            </p>
                            <button
                                onClick={() => { setShowAnswer(false); setInputPassword(""); }}
                                className="mt-3 text-[10px] font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 uppercase tracking-widest flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-xs">lock</span> Kunci Kembali
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            {password && (
                                <input
                                    type="password"
                                    placeholder="Password Jawaban..."
                                    className={`p-2 bg-slate-50 dark:bg-slate-900/50 border-2 ${error ? 'border-red-500' : 'border-primary/10'} rounded-xl text-xs font-bold w-full sm:w-40`}
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleReveal()}
                                />
                            )}
                            <button
                                onClick={handleReveal}
                                className={`px-6 py-2 bg-${colorClass}-500/10 text-${colorClass}-600 text-xs font-black rounded-xl hover:bg-${colorClass}-500/20 transition-all flex items-center gap-2 group border border-${colorClass}-500/20 whitespace-nowrap`}
                            >
                                <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">{password ? 'lock_open' : 'visibility'}</span>
                                {password ? 'Buka Solusi' : 'Buka Jawaban'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const SinglyLLCode = () => (
        <code>
            <span className="text-slate-400"># Definisi Node</span><br />
            <span className="text-purple-400">class</span> <span className="text-blue-400">Node</span>:<br />
            &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>, data):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.data = data<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.next = <span className="text-amber-300">None</span><br /><br />
            <span className="text-purple-400">class</span> <span className="text-blue-400">SinglyLinkedList</span>:<br />
            &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">prepend</span>(<span className="text-orange-300">self</span>, data): <span className="text-slate-400"># O(1)</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;new_node = <span className="text-blue-400">Node</span>(data)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;new_node.next = <span className="text-orange-300">self</span>.head<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.head = new_node<br /><br />
            &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">append</span>(<span className="text-orange-300">self</span>, data): <span className="text-slate-400"># O(n)</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;new_node = <span className="text-blue-400">Node</span>(data)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.head:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.head = new_node; <span className="text-purple-400">return</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;cur = <span className="text-orange-300">self</span>.head<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">while</span> cur.next: cur = cur.next<br />
            &nbsp;&nbsp;&nbsp;&nbsp;cur.next = new_node
        </code>
    );

    const DoublyLLCode = () => (
        <code>
            <span className="text-purple-400">class</span> <span className="text-blue-400">Node</span>:<br />
            &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>, data):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.data = data<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.prev = <span className="text-amber-300">None</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.next = <span className="text-amber-300">None</span><br /><br />
            <span className="text-purple-400">class</span> <span className="text-blue-400">DoublyLinkedList</span>:<br />
            &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">append</span>(<span className="text-orange-300">self</span>, data): <span className="text-slate-400"># O(1) with TAIL</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;new_node = <span className="text-blue-400">Node</span>(data)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.tail:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.head = <span className="text-orange-300">self</span>.tail = new_node; <span className="text-purple-400">return</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;new_node.prev = <span className="text-orange-300">self</span>.tail<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.tail.next = new_node<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.tail = new_node<br /><br />
            &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-blue-400">pop</span>(<span className="text-orange-300">self</span>): <span className="text-slate-400"># O(1) delete TAIL</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.tail: <span className="text-purple-400">return</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">self</span>.tail = <span className="text-orange-300">self</span>.tail.prev<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> <span className="text-orange-300">self</span>.tail: <span className="text-orange-300">self</span>.tail.next = <span className="text-amber-300">None</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">else</span>: <span className="text-orange-300">self</span>.head = <span className="text-amber-300">None</span>
        </code>
    );

    const ExerciseData = [
        {
            question: "Sebuah Singly LL berisi [1 → 2 → 3 → 4 → NULL]. Apa state list setelah memanggil prepend(0) lalu delete(3)?",
            answer: "[0 → 1 → 2 → 4 → NULL]",
            explanation: "1. prepend(0): Node 0 diletakkan di HEAD. List: [0→1→2→3→4].\n2. delete(3): Pointer dari node 2 dialihkan langsung ke node 4, melewati node 3. List: [0→1→2→4].",
            color: "blue"
        },
        {
            question: "Mengapa Doubly LL bisa delete TAIL dalam O(1) sedangkan Singly LL membutuhkan O(n)?",
            answer: "Karena pointer PREV",
            explanation: "Singly LL harus traverse dari HEAD ke node sebelum TAIL (O(n)). Doubly LL langsung akses self.tail.prev (O(1)) untuk memutus rantai.",
            color: "violet"
        },
        {
            question: "Anda membangun fitur 'Undo/Redo' di teks editor. Struktur data mana yang paling tepat dan mengapa?",
            answer: "Doubly Linked List",
            explanation: "Undo butuh PREV, Redo butuh NEXT. Doubly LL mendukung akses dua arah ini secara instan (O(1)).",
            color: "amber"
        }
    ];

    const GroupExerciseData = {
        question: "Skenario: Playlist Lagu Modern (Doubly Linked List)\nImplementasikan sistem playlist lagu dengan urutan operasi berikut:\n1. Append('Lagu A')\n2. Append('Lagu B')\n3. Prepend('Lagu C')\n4. Delete('Lagu B')\n\nInstruksi Kelompok:\n- Lakukan tracing manual (gambar node & pointer).\n- Sebutkan status HEAD dan TAIL setelah langkah ke-4.\n- Jelaskan Time Complexity total untuk seluruh urutan operasi di atas.\n- Mengapa Doubly LL lebih efisien untuk fitur 'Previous' daripada Singly LL?",
        answer: "HEAD: Lagu C, TAIL: Lagu A, Total O(n)",
        explanation: "Tracing:\n1. [A]\n2. [A ↔ B]\n3. [C ↔ A ↔ B]\n4. [C ↔ A].\nHEAD menunjuk ke C, TAIL menunjuk ke A.\nTime Complexity: Append O(1)*, Prepend O(1), Delete O(n). Total didominasi oleh Delete O(n).\nEfisiensi: Doubly LL punya pointer 'prev', sehingga pindah ke lagu sebelumnya (Previous) adalah O(1). Singly LL harus traverse ulang dari HEAD (O(n)).",
        color: "violet"
    };

    const slides = [
        // Slide 1: Array vs Linked List
        <div key="s1" className="space-y-6">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Array vs Linked List</h3>
            <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-8 shadow-2xl">
                <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-8 font-bold text-center">
                    Array mengharuskan kita menentukan ukuran di awal dan menempati memori yang <strong className="text-slate-900 dark:text-white underline decoration-primary/40 text-2xl font-black">berurutan (contiguous)</strong>.
                </p>

                {/* VISUAL MEMORY - Ported from Web View for consistency */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="p-6 bg-red-500/10 border-4 border-red-500/30 rounded-3xl shadow-xl">
                        <p className="text-xl font-black text-red-600 dark:text-red-400 uppercase mb-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-3xl">view_module</span> Array — Memori Berurutan ❌
                        </p>
                        <div className="flex gap-2 mb-6 justify-center">
                            {["10", "20", "30", "??", "??"].map((v, i) => (
                                <div key={i} className={`w-14 h-14 rounded-xl border-4 flex items-center justify-center text-xl font-black ${i >= 3 ? "border-dashed border-slate-400 text-slate-400" : "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 animate-pulse"}`}>{v}</div>
                            ))}
                        </div>
                        <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-200 font-bold">
                            <li className="flex items-center gap-3"><span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✗</span> Ukuran fix di awal</li>
                            <li className="flex items-center gap-3"><span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✗</span> Insert/Delete tengah: O(n)</li>
                            <li className="flex items-center gap-3"><span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✓</span> Akses by index: O(1)</li>
                        </ul>
                    </div>
                    <div className="p-6 bg-emerald-500/10 border-4 border-emerald-500/30 rounded-3xl shadow-xl">
                        <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 uppercase mb-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-3xl">link</span> Linked List — Memori Dinamis ✅
                        </p>
                        <div className="flex items-center gap-2 mb-6 flex-wrap justify-center">
                            {["10", "20", "30"].map((v, i, arr) => (
                                <React.Fragment key={i}>
                                    <div className="border-4 border-emerald-500 bg-emerald-500/10 rounded-2xl px-4 py-2 text-lg font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2 shadow-sm">
                                        <span>{v}</span><span className="text-slate-400 text-sm font-black italic">|→</span>
                                    </div>
                                    {i === arr.length - 1 && <span className="text-xl font-black text-slate-500">NULL</span>}
                                </React.Fragment>
                            ))}
                        </div>
                        <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-200 font-bold">
                            <li className="flex items-center gap-3"><span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✓</span> Ukuran fleksibel & dinamis</li>
                            <li className="flex items-center gap-3"><span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✓</span> Insert/Delete awal: O(1)</li>
                            <li className="flex items-center gap-3"><span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">✗</span> Akses by index: O(n)</li>
                        </ul>
                    </div>
                </div>

                <div className="p-6 bg-emerald-500/10 rounded-2xl border-4 border-emerald-500/20 max-w-3xl mx-auto shadow-inner">
                    <p className="text-xl font-black italic text-center text-slate-800 dark:text-slate-100 leading-relaxed underline decoration-emerald-500/20">
                        "Linked List adalah kumpulan Node yang saling terhubung melalui pointer. Setiap Node menyimpan <span className="text-emerald-600">data</span> dan <span className="text-emerald-600">referensi (next)</span> ke Node berikutnya."
                    </p>
                </div>
            </div>
        </div>,

        // Slide 2: Singly Linked List Concept
        <div key="s2" className="space-y-8">
            <div className="bg-blue-500/10 p-10 border-4 border-blue-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-6 mb-8">
                    <span className="bg-blue-500 text-white font-black px-6 py-2 rounded-xl shadow-lg text-2xl uppercase tracking-wider">TIPE 1</span>
                    <h4 className="text-5xl font-black text-blue-600 italic tracking-tight">Singly Linked List</h4>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-2xl border-2 border-blue-500/20 mb-8">
                    <h5 className="font-black text-3xl text-slate-900 dark:text-white mb-4 uppercase flex items-center gap-3">
                        <span className="material-symbols-outlined text-4xl">trending_flat</span> "Satu Arah → (next only)"
                    </h5>
                    <p className="text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-bold">
                        Setiap node hanya mengetahui node <strong className="text-blue-500 underline decoration-blue-500/30">berikutnya</strong>.
                        Traversal hanya bisa dari depan ke belakang (<span className="text-primary font-black uppercase tracking-widest text-3xl italic">HEAD → TAIL</span>).
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Node Structure Visual */}
                    <div className="space-y-6">
                        <p className="text-2xl font-black text-slate-600 dark:text-slate-300 flex items-center gap-2">
                            <span className="material-symbols-outlined">account_tree</span> Struktur Node:
                        </p>
                        <div className="flex items-stretch border-4 border-blue-500 rounded-3xl overflow-hidden font-mono text-2xl shadow-2xl">
                            <div className="bg-blue-500/20 px-8 py-6 flex items-center justify-center flex-1 font-black text-slate-800 dark:text-slate-100 italic">DATA</div>
                            <div className="border-l-4 border-blue-500 bg-blue-500/10 px-8 py-6 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black">NEXT →</div>
                        </div>

                        {/* Linked Nodes Visual - Ported from Web */}
                        <div className="mt-8 p-6 bg-white dark:bg-slate-900/40 rounded-2xl border-2 border-slate-200 dark:border-white/5">
                            <p className="text-lg font-black text-slate-500 mb-4">Contoh 3 Node:</p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="text-xs font-black text-primary uppercase">HEAD</div>
                                <span className="text-slate-400 text-xl font-black">→</span>
                                {["10", "20", "30"].map((v, i, arr) => (
                                    <React.Fragment key={i}>
                                        <div className="border-4 border-blue-500 rounded-2xl overflow-hidden flex font-mono text-lg shadow-sm bg-bg-base">
                                            <span className="bg-blue-500/10 px-3 py-2 font-black text-slate-800 dark:text-slate-100">{v}</span>
                                            <span className="border-l-2 border-blue-500 px-3 py-2 text-blue-400 font-black italic">{i === arr.length - 1 ? "∅" : "→"}</span>
                                        </div>
                                        {i < arr.length - 1 && <span className="text-slate-400 text-xl font-black">→</span>}
                                    </React.Fragment>
                                ))}
                                <div className="text-xs font-black text-slate-400 uppercase">NULL</div>
                            </div>
                        </div>
                    </div>

                    {/* Complexity Card */}
                    <div className="bg-slate-900 p-8 rounded-3xl border-4 border-blue-500/30 shadow-2xl space-y-6">
                        <h6 className="text-blue-400 font-black text-xl uppercase tracking-widest border-b border-white/10 pb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">speed</span> Performa Sinkron
                        </h6>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                                <span className="text-slate-200 font-bold text-xl">Insert Head</span>
                                <span className="bg-blue-500 text-white px-4 py-1 rounded-lg font-black text-2xl shadow-sm">O(1)</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                                <span className="text-slate-200 font-bold text-xl">Search Data</span>
                                <span className="bg-amber-500 text-white px-4 py-1 rounded-lg font-black text-2xl shadow-sm">O(n)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 3: Singly Linked List Implementation
        <div key="s3" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Implementasi Singly LL (Python)</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-blue-500/20 shadow-2xl">
                <div className="bg-slate-800 px-6 py-3 flex justify-between border-b-2 border-white/10">
                    <span className="text-lg text-slate-300 font-mono font-bold">singly_linkedlist.py</span>
                    <span className="text-lg text-blue-400 font-bold uppercase tracking-widest">Code Snippet</span>
                </div>
                <div className="p-8 text-xl font-mono overflow-x-auto leading-relaxed max-h-[60vh] text-slate-200">
                    <SinglyLLCode />
                </div>
            </div>
        </div>,

        // Slide 4: Tracing Singly LL
        <div key="s4" className="space-y-8 h-full flex flex-col items-center justify-center text-slate-900 dark:text-white">
            <h3 className="text-4xl font-black mb-8 uppercase italic text-center">Tracing Operasi Singly LL</h3>
            <div className="w-full max-w-5xl bg-white dark:bg-slate-950 p-10 rounded-xl border-4 border-blue-500/30 shadow-[0_35px_60px_-15px_rgba(59,130,246,0.3)]">
                <LinkedListVisualizer initialMode="SINGLY" />
            </div>
        </div>,

        // Slide 5: Doubly Linked List Concept
        <div key="s5" className="space-y-8">
            <div className="bg-violet-500/10 p-10 border-4 border-violet-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-6 mb-8">
                    <span className="bg-violet-500 text-white font-black px-6 py-2 rounded-xl shadow-lg text-2xl uppercase tracking-wider">TIPE 2</span>
                    <h4 className="text-5xl font-black text-violet-600 italic tracking-tight">Doubly Linked List</h4>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-2xl border-2 border-violet-500/20 mb-8">
                    <h5 className="font-black text-3xl text-slate-900 dark:text-white mb-4 uppercase flex items-center gap-3">
                        <span className="material-symbols-outlined text-4xl">swap_horiz</span> "Dua Arah ⇄ (prev & next)"
                    </h5>
                    <p className="text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-bold">
                        Setiap node menyimpan dua pointer: <strong className="text-violet-500 underline decoration-violet-500/30">prev</strong> (sebelumnya) dan <strong className="text-violet-500 underline decoration-violet-500/30">next</strong> (berikutnya).
                        Traversal bisa dilakukan dua arah (<span className="text-primary font-black uppercase tracking-widest text-3xl italic">HEAD ⇄ TAIL</span>).
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Node Structure Visual */}
                    <div className="space-y-6">
                        <p className="text-2xl font-black text-slate-600 dark:text-slate-300 flex items-center gap-2">
                            <span className="material-symbols-outlined">account_tree</span> Struktur Node:
                        </p>
                        <div className="flex items-stretch border-4 border-violet-500 rounded-3xl overflow-hidden font-mono text-2xl shadow-2xl">
                            <div className="bg-violet-500/10 px-6 py-6 flex items-center justify-center text-violet-600 font-black">←PREV</div>
                            <div className="border-x-4 border-violet-500 bg-violet-500/20 px-8 py-6 flex items-center justify-center flex-1 font-black text-slate-800 dark:text-slate-100 italic">DATA</div>
                            <div className="bg-violet-500/10 px-6 py-6 flex items-center justify-center text-violet-600 font-black">NEXT→</div>
                        </div>

                        {/* Linked Nodes Visual - Ported from Web */}
                        <div className="mt-8 p-6 bg-white dark:bg-slate-900/40 rounded-2xl border-2 border-slate-200 dark:border-white/5">
                            <p className="text-lg font-black text-slate-500 mb-4">Contoh 3 Node:</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                    <span className="text-primary uppercase font-black">HEAD</span>
                                    <span className="font-mono text-lg">←→ 10 ←→ 20 ←→ 30 →</span>
                                    <span className="text-slate-400">NULL</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                    <span className="text-slate-400">NULL ←</span>
                                    <span className="font-mono text-lg">10 ←→ 20 ←→ 30</span>
                                    <span className="text-primary uppercase font-black">← TAIL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Complexity Card */}
                    <div className="bg-slate-900 p-8 rounded-3xl border-4 border-violet-500/30 shadow-2xl space-y-6">
                        <h6 className="text-violet-400 font-black text-xl uppercase tracking-widest border-b border-white/10 pb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">speed</span> Performa Sinkron
                        </h6>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                                <span className="text-slate-200 font-bold text-xl">Insert/Delete Head</span>
                                <span className="bg-violet-500 text-white px-4 py-1 rounded-lg font-black text-2xl shadow-sm">O(1)</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                                <span className="text-slate-200 font-bold text-xl">Insert/Delete Tail</span>
                                <span className="bg-violet-500 text-white px-4 py-1 rounded-lg font-black text-2xl shadow-sm">O(1)</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <span className="text-slate-200 font-bold text-xl">Search Data</span>
                                <span className="bg-amber-500 text-white px-4 py-1 rounded-lg font-black text-2xl shadow-sm">O(n)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 6: Doubly Linked List Implementation
        <div key="s6" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Implementasi Doubly LL (Python)</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-violet-500/20 shadow-2xl">
                <div className="bg-slate-800 px-6 py-3 flex justify-between border-b-2 border-white/10">
                    <span className="text-lg text-slate-300 font-mono font-bold">doubly_linkedlist.py</span>
                    <span className="text-lg text-violet-400 font-bold uppercase tracking-widest">Code Snippet</span>
                </div>
                <div className="p-8 text-xl font-mono overflow-x-auto leading-relaxed max-h-[60vh] text-slate-200">
                    <DoublyLLCode />
                </div>
            </div>
        </div>,

        // Slide 7: Tracing Doubly LL
        <div key="s7" className="space-y-8 h-full flex flex-col items-center justify-center text-slate-900 dark:text-white">
            <h3 className="text-4xl font-black mb-8 uppercase italic text-center">Tracing Operasi Doubly LL</h3>
            <div className="w-full max-w-5xl bg-white dark:bg-slate-950 p-10 rounded-xl border-4 border-violet-500/30 shadow-[0_35px_60px_-15px_rgba(139,92,246,0.3)]">
                <LinkedListVisualizer initialMode="DOUBLY" />
            </div>
        </div>,

        // Slide 8: Comparison
        <div key="s8" className="space-y-6 overflow-y-auto max-h-full py-4 text-slate-900 dark:text-white">
            <h3 className="text-3xl font-black mb-6 uppercase italic text-center">Komparasi Performa</h3>
            <div className="bg-slate-900 rounded-3xl border-4 border-primary/30 p-8 shadow-2xl overflow-hidden mb-8">
                <table className="w-full text-lg text-left">
                    <thead className="bg-white/10 text-slate-100 font-black border-b-2 border-white/20">
                        <tr>
                            <th className="px-6 py-4">Operasi</th>
                            <th className="px-6 py-4 text-slate-400">Array</th>
                            <th className="px-6 py-4 text-blue-400">Singly LL</th>
                            <th className="px-6 py-4 text-violet-400">Doubly LL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-white font-bold">
                        {[
                            { op: "Akses Index", arr: "O(1) ✓", sll: "O(n) ✗", dll: "O(n) ✗" },
                            { op: "Insert Head", arr: "O(n) ✗", sll: "O(1) ✓", dll: "O(1) ✓" },
                            { op: "Insert Tail", arr: "O(1)*", sll: "O(n) ✗", dll: "O(1) ✓" },
                            { op: "Delete Tail", arr: "O(1)*", sll: "O(n) ✗", dll: "O(1) ✓" },
                            { op: "Traversal Maju", arr: "O(n)", sll: "O(n) ✓", dll: "O(n) ✓" },
                            { op: "Traversal Mundur", arr: "O(n)", sll: "❌ Tidak bisa", dll: "O(n) ✓" },
                            { op: "Memory / node", arr: "Min", sll: "Data + 1Ptr", dll: "Data + 2Ptr" },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-black">{row.op}</td>
                                <td className="px-6 py-4 font-mono text-slate-400">{row.arr}</td>
                                <td className="px-6 py-4 font-mono text-blue-300">{row.sll}</td>
                                <td className="px-6 py-4 font-mono text-violet-300">{row.dll}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Guide Cards - Ported from Web */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto pb-8">
                {[
                    { title: "Gunakan Array", color: "border-slate-500/30 bg-slate-500/10", titleColor: "text-slate-300", items: ["Akses random by index", "Ukuran data tetap", "Cache locality"] },
                    { title: "Gunakan Singly LL", color: "border-blue-500/30 bg-blue-500/10", titleColor: "text-blue-300", items: ["Insert/Delete di HEAD", "Stack & Queue", "Memori minimal"] },
                    { title: "Gunakan Doubly LL", color: "border-violet-500/30 bg-violet-500/10", titleColor: "text-violet-300", items: ["Traversal dua arah", "Delete di TAIL: O(1)", "Browser History"] },
                ].map((card, i) => (
                    <div key={i} className={`p-6 rounded-2xl border-4 ${card.color} shadow-lg`}>
                        <h5 className={`text-xl font-black mb-3 ${card.titleColor}`}>{card.title}</h5>
                        <ul className="space-y-2">
                            {card.items.map((item, j) => (
                                <li key={j} className="text-lg text-slate-200 font-bold flex items-start gap-2">
                                    <span className="w-2 h-2 rounded-full bg-current mt-2 shrink-0"></span>{item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 9: Exercise
        <div key="s9" className="space-y-6 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 uppercase italic text-center">Uji Pemahaman 🧠</h3>
            <div className="max-w-4xl mx-auto w-full grid gap-4">
                {ExerciseData.map((item, i) => (
                    <ExerciseCard key={i} item={item} isPresentation={true} />
                ))}
            </div>
        </div>,

        // Slide 10: Summary
        <div key="s10" className="space-y-8 h-full flex flex-col justify-center text-center">
            <div className="bg-linear-to-br from-primary/20 to-emerald-500/20 p-12 rounded-3xl border-4 border-primary/30 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                <h4 className="text-4xl font-black text-slate-900 dark:text-white mb-10 uppercase italic tracking-tighter decoration-primary decoration-8 underline-offset-8">Ringkasan Materi</h4>
                <div className="grid grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {[
                        { label: "Alokasi Dinamis", desc: "No fixed size limit!" },
                        { label: "Node & Pointer", desc: "Dasar rantai penyusun LL." },
                        { label: "Singly vs Doubly", desc: "Akses 1-arah vs 2-arah." },
                        { label: "O(1) Operations", desc: "Keunggulan utama vs Array." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-5 p-6 bg-white/60 dark:bg-white/10 rounded-2xl border-2 border-primary/20 hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-4xl text-primary font-black">check_circle</span>
                            <div>
                                <p className="font-black text-xl text-slate-900 dark:text-white">{item.label}</p>
                                <p className="text-slate-600 dark:text-slate-400 font-bold italic">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-12 text-2xl font-black text-primary/80 uppercase tracking-[0.3em] font-mono">Module 4 Complete</p>
            </div>
        </div>,

        // Slide 11: Group Exercise
        <div key="s11" className="space-y-6 h-full flex flex-col justify-center">
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="bg-violet-500/20 p-3 rounded-2xl text-violet-500 shadow-inner">
                    <span className="material-symbols-outlined text-3xl font-black">groups</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">Tugas Kelompok Final</h3>
            </div>
            <div className="max-w-5xl mx-auto w-full">
                <ExerciseCard item={GroupExerciseData} isPresentation={true} password="psw_jawaban_Bd@" />
            </div>
            <p className="text-center text-slate-400 font-bold italic text-sm mt-4">
                *Gunakan password dosen untuk membuka kunci solusi setelah diskusi kelompok selesai.
            </p>
        </div>
    ];
    return (
        <div className="space-y-16 pb-12">

            {/* ─── BAGIAN 1: PENGANTAR ─── */}
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
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Array vs Linked List</span>
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
                                <div className="bg-emerald-500/30 p-2 rounded-lg text-emerald-500">
                                    <span className="material-symbols-outlined text-xl">link</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Masalah dengan Array Statis</h3>
                            </div>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    Array mengharuskan kita menentukan ukuran di awal dan menempati memori yang <strong className="text-slate-900 dark:text-white">berurutan (contiguous)</strong>. Linked List hadir untuk mengatasi keterbatasan ini dengan alokasi memori yang dinamis dan fleksibel.
                                </p>

                                {/* Array vs LL visual */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="p-5 bg-red-500/10 border-2 border-red-500/30 rounded-xl">
                                        <p className="text-sm font-black text-red-600 dark:text-red-400 uppercase mb-3">Array — Memori Berurutan ❌</p>
                                        <div className="flex gap-1 mb-3">
                                            {["10", "20", "30", "??", "??"].map((v, i) => (
                                                <div key={i} className={`w-10 h-10 rounded border-2 flex items-center justify-center text-xs font-black ${i >= 3 ? "border-dashed border-slate-400 text-slate-400" : "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"}`}>{v}</div>
                                            ))}
                                        </div>
                                        <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-200 font-medium">
                                            <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Ukuran harus ditentukan di awal</li>
                                            <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Insert/Delete di tengah: O(n)</li>
                                            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Akses elemen by index: O(1)</li>
                                        </ul>
                                    </div>
                                    <div className="p-5 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl">
                                        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase mb-3">Linked List — Memori Dinamis ✅</p>
                                        <div className="flex items-center gap-1 mb-3 flex-wrap">
                                            {["10", "20", "30"].map((v, i, arr) => (
                                                <React.Fragment key={i}>
                                                    <div className="border-2 border-emerald-500 bg-emerald-500/10 rounded-lg px-2 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                                        <span>{v}</span><span className="text-slate-400 text-[10px]">|→</span>
                                                    </div>
                                                    {i === arr.length - 1 && <span className="text-xs font-bold text-slate-500">NULL</span>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-200 font-medium">
                                            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Ukuran fleksibel, tumbuh dinamis</li>
                                            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Insert/Delete di awal: O(1)</li>
                                            <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Akses by index: O(n)</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="p-4 bg-emerald-500/10 rounded-xl border-2 border-emerald-500/20">
                                    <p className="text-sm font-medium italic text-center text-slate-800 dark:text-slate-100">
                                        "Linked List adalah kumpulan Node yang saling terhubung melalui pointer. Setiap Node menyimpan <strong>data</strong> dan <strong>referensi (next)</strong> ke Node berikutnya."
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 2: SINGLY LINKED LIST ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Singly Linked List</span>
                            <div className="flex gap-2">
                                <button onClick={() => openPresentation(1)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">info</span> KONSEP
                                </button>
                                <button onClick={() => openPresentation(2)} className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
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
                                <div className="md:w-2/5 bg-blue-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-blue-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">TIPE 1</span>
                                        <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400 italic">Singly LL</h4>
                                    </div>
                                    <h5 className="font-black text-base text-slate-900 dark:text-white mb-3">Satu Arah → (next only)</h5>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Setiap node hanya mengetahui node <strong className="text-slate-900 dark:text-white">berikutnya</strong>. Traversal hanya bisa dari depan ke belakang (HEAD → TAIL).
                                    </p>
                                    {/* Node Visual */}
                                    <div className="mb-4">
                                        <p className="text-xs font-black text-slate-600 dark:text-slate-300 mb-2">Struktur 1 Node:</p>
                                        <div className="flex items-stretch border-2 border-blue-500 rounded-xl overflow-hidden font-mono text-xs">
                                            <div className="bg-blue-500/20 px-3 py-2 flex items-center justify-center flex-1 font-black text-slate-800 dark:text-slate-100">DATA</div>
                                            <div className="border-l-2 border-blue-500 bg-blue-500/10 px-3 py-2 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black">NEXT →</div>
                                        </div>
                                    </div>
                                    {/* Linked Node Visual */}
                                    <div>
                                        <p className="text-xs font-black text-slate-600 dark:text-slate-300 mb-2">Contoh 3 Node:</p>
                                        <div className="flex items-center gap-1 flex-wrap">
                                            <div className="text-[10px] font-black text-primary">HEAD</div>
                                            <span className="text-slate-400 text-xs">→</span>
                                            {["10", "20", "30"].map((v, i, arr) => (
                                                <React.Fragment key={i}>
                                                    <div className="border-2 border-blue-500 rounded overflow-hidden flex font-mono text-[10px]">
                                                        <span className="bg-blue-500/20 px-1.5 py-1 font-black text-slate-800 dark:text-slate-100">{v}</span>
                                                        <span className="border-l-2 border-blue-500 px-1.5 py-1 text-blue-400">{i === arr.length - 1 ? "∅" : "→"}</span>
                                                    </div>
                                                    {i < arr.length - 1 && <span className="text-slate-400 text-xs">→</span>}
                                                </React.Fragment>
                                            ))}
                                            <div className="text-[10px] font-black text-slate-500">NULL</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-white/10">
                                        <div className="text-xs font-black text-center">
                                            <span className="text-blue-400">Insert Head: O(1)</span>
                                            <span className="text-slate-500 mx-2">|</span>
                                            <span className="text-amber-400">Search: O(n)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-0 bg-slate-900">
                                    <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                        <span className="text-xs text-slate-300 font-mono font-bold">singly_linkedlist.py</span>
                                        <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">Code Snippet</span>
                                    </div>
                                    <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200">
                                        <SinglyLLCode />
                                    </pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>


            {/* ─── BAGIAN 3: TRACING SINGLY LL ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Tracing Singly LL — Prepend</span>
                            <button onClick={() => openPresentation(3)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
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
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tracing: Prepend 3 Node ke Singly LL</h3>
                            </div>

                            <LinkedListVisualizer initialMode="SINGLY" />
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 4: DOUBLY LINKED LIST ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Doubly Linked List</span>
                            <div className="flex gap-2">
                                <button onClick={() => openPresentation(4)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">info</span> KONSEP
                                </button>
                                <button onClick={() => openPresentation(5)} className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-500 text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
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
                                <div className="md:w-2/5 bg-violet-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-violet-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-violet-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">TIPE 2</span>
                                        <h4 className="text-2xl font-black text-violet-600 dark:text-violet-400 italic">Doubly LL</h4>
                                    </div>
                                    <h5 className="font-black text-base text-slate-900 dark:text-white mb-3">Dua Arah ⇄ (prev & next)</h5>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Setiap node menyimpan dua pointer: <strong className="text-slate-900 dark:text-white">prev</strong> (ke node sebelumnya) dan <strong className="text-slate-900 dark:text-white">next</strong> (ke node berikutnya). Traversal bisa dari HEAD maupun TAIL.
                                    </p>
                                    {/* Node Visual */}
                                    <div className="mb-4">
                                        <p className="text-xs font-black text-slate-600 dark:text-slate-300 mb-2">Struktur 1 Node:</p>
                                        <div className="flex items-stretch border-2 border-violet-500 rounded-xl overflow-hidden font-mono text-xs">
                                            <div className="bg-violet-500/10 px-2 py-2 flex items-center justify-center text-violet-600 dark:text-violet-400 font-black">←PREV</div>
                                            <div className="border-x-2 border-violet-500 bg-violet-500/20 px-3 py-2 flex items-center justify-center flex-1 font-black text-slate-800 dark:text-slate-100">DATA</div>
                                            <div className="bg-violet-500/10 px-2 py-2 flex items-center justify-center text-violet-600 dark:text-violet-400 font-black">NEXT→</div>
                                        </div>
                                    </div>
                                    {/* Linked Node Visual */}
                                    <div>
                                        <p className="text-xs font-black text-slate-600 dark:text-slate-300 mb-2">Contoh 3 Node:</p>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                                                <span className="text-primary">HEAD</span>
                                                <span>←→ 10 ←→ 20 ←→ 30 →</span>
                                                <span className="text-slate-500">NULL</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                                                <span>NULL ←</span>
                                                <span>10 ←→ 20 ←→ 30</span>
                                                <span className="text-primary">← TAIL</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-white/10">
                                        <div className="text-xs font-black text-center">
                                            <span className="text-violet-400">Insert/Delete Head & Tail: O(1)</span>
                                            <span className="text-slate-500 mx-2">|</span>
                                            <span className="text-amber-400">Search: O(n)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-0 bg-slate-900">
                                    <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                        <span className="text-xs text-slate-300 font-mono font-bold">doubly_linkedlist.py</span>
                                        <span className="text-xs text-violet-400 font-bold uppercase tracking-widest">Code Snippet</span>
                                    </div>
                                    <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200">
                                        <DoublyLLCode />
                                    </pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 5: TRACING DOUBLY LL ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Tracing Doubly LL — Append</span>
                            <button onClick={() => openPresentation(6)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-violet-500/30 p-2 rounded-lg text-violet-500">
                                    <span className="material-symbols-outlined text-xl">edit_square</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tracing: Append 3 Node ke Doubly LL</h3>
                            </div>

                            <LinkedListVisualizer initialMode="DOUBLY" />
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 6: KOMPARASI ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Komparasi Performa</span>
                            <button onClick={() => openPresentation(7)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 rounded-3xl p-8 overflow-hidden relative border border-white/10">
                            <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                            <h4 className="text-xl font-black text-white flex items-center gap-2 mb-8">
                                <span className="material-symbols-outlined text-emerald-400">compare_arrows</span>
                                Array vs Singly LL vs Doubly LL
                            </h4>

                            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-8">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-slate-200 font-black border-b border-white/10">
                                        <tr>
                                            <th className="px-5 py-3">Operasi</th>
                                            <th className="px-5 py-3 text-slate-300">Array</th>
                                            <th className="px-5 py-3 text-blue-400">Singly LL</th>
                                            <th className="px-5 py-3 text-violet-400">Doubly LL</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { op: "Akses by Index", arr: "O(1) ✓", sll: "O(n) ✗", dll: "O(n) ✗" },
                                            { op: "Insert di Awal (Head)", arr: "O(n) ✗", sll: "O(1) ✓", dll: "O(1) ✓" },
                                            { op: "Insert di Akhir (Tail)", arr: "O(1)*", sll: "O(n) ✗", dll: "O(1) ✓" },
                                            { op: "Delete di Awal", arr: "O(n) ✗", sll: "O(1) ✓", dll: "O(1) ✓" },
                                            { op: "Delete di Akhir", arr: "O(1)*", sll: "O(n) ✗", dll: "O(1) ✓" },
                                            { op: "Delete node tertentu", arr: "O(n)", sll: "O(n)", dll: "O(n)*" },
                                            { op: "Traversal Maju", arr: "O(n)", sll: "O(n) ✓", dll: "O(n) ✓" },
                                            { op: "Traversal Mundur", arr: "O(n)", sll: "❌ Tidak bisa", dll: "O(n) ✓" },
                                            { op: "Memory per elemen", arr: "Data only", sll: "Data + 1 ptr", dll: "Data + 2 ptr" },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="px-5 py-3 font-black text-slate-200">{row.op}</td>
                                                <td className="px-5 py-3 font-mono font-medium text-slate-300">{row.arr}</td>
                                                <td className="px-5 py-3 font-mono font-medium text-blue-300">{row.sll}</td>
                                                <td className="px-5 py-3 font-mono font-medium text-violet-300">{row.dll}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                {[
                                    { title: "Gunakan Array jika...", color: "border-slate-500/30 bg-slate-500/10", titleColor: "text-slate-300", items: ["Perlu akses random by index", "Ukuran data sudah diketahui", "Cache locality penting (performa CPU)"] },
                                    { title: "Gunakan Singly LL jika...", color: "border-blue-500/30 bg-blue-500/10", titleColor: "text-blue-300", items: ["Banyak insert/delete di HEAD", "Implementasi Stack & Queue", "Memori minimal (1 pointer/node)"] },
                                    { title: "Gunakan Doubly LL jika...", color: "border-violet-500/30 bg-violet-500/10", titleColor: "text-violet-300", items: ["Perlu traversal dua arah", "Banyak delete di TAIL: O(1)", "Implementasi browser history, LRU Cache"] },
                                ].map((card, i) => (
                                    <div key={i} className={`p-4 rounded-xl border-2 ${card.color}`}>
                                        <h5 className={`text-sm font-black mb-2 ${card.titleColor}`}>{card.title}</h5>
                                        <ul className="space-y-1">
                                            {card.items.map((item, j) => (
                                                <li key={j} className="text-sm text-slate-200 font-medium flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0"></span>{item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 7: LATIHAN ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 7: Latihan Mandiri</span>
                            <button onClick={() => openPresentation(8)} className="bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="text-center max-w-lg mx-auto mb-8">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Uji Pemahamanmu! 🧠</h4>
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                            Jawab dan trace secara manual sebelum melihat jawaban.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid gap-6">
                    {ExerciseData.map((item, i) => (
                        <ScrollReveal key={i}>
                            <FocusSection>
                                <ExerciseCard item={item} />
                            </FocusSection>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ─── BAGIAN 8: TUGAS KELOMPOK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-violet-500/40"></div>
                        </div>
                        <div className="relative flex justify-center gap-4">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-violet-500 border-x-2 border-violet-500/40">Bagian 8: Tugas Kelompok Komprehensif</span>
                            <button onClick={() => openPresentation(10)} className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-500 text-[10px] font-black px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">play_arrow</span> SLIDE
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="max-w-4xl mx-auto">
                        <FocusSection>
                            <div className="relative overflow-hidden group">
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] group-hover:bg-violet-500/10 transition-colors"></div>
                                <ExerciseCard item={GroupExerciseData} password="psw_jawaban_Bd@" />
                            </div>
                        </FocusSection>
                    </div>
                </ScrollReveal>

                {/* Summary Card */}
                <ScrollReveal threshold={0.5}>
                    <FocusSection>
                        <div className="mt-4 bg-linear-to-r from-primary/15 to-emerald-500/15 border-2 border-primary/30 p-8 rounded-3xl">
                            <div className="max-w-2xl mx-auto text-center">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Ringkasan Capaian 🎯</h4>
                                <div className="grid sm:grid-cols-2 gap-4 text-left">
                                    {[
                                        { icon: "code", label: "Implementasi", desc: "Menulis Node class, Singly LL, dan Doubly LL dari nol dalam Python dengan operasi lengkap." },
                                        { icon: "sync_alt", label: "Manage Dinamis", desc: "Melakukan insert (prepend/append), delete, dan traverse pada struktur data dinamis." },
                                        { icon: "edit_square", label: "Tracing Pointer", desc: "Menelusuri perubahan pointer prev/next secara manual untuk setiap operasi." },
                                        { icon: "compare_arrows", label: "Komparasi", desc: "Memilih struktur data yang tepat (Array / Singly / Doubly) berdasarkan kebutuhan operasi." },
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

            <PresentationMode
                isOpen={isPresentationOpen}
                onExit={() => setIsPresentationOpen(false)}
                slides={slides}
                initialSlide={startSlideIndex}
            />
        </div>
    );
}
