"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import BubbleSortVisualizer from "./BubbleSortVisualizer";
import SelectionSortVisualizer from "./SelectionSortVisualizer";
import PresentationMode from "@/components/PresentationMode";

export default function Module3Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

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

    const SortingIntroSteps = [
        { icon: "search", title: "Binary Search", desc: "Hanya bekerja pada data terurut.", color: "text-blue-500", colorWeb: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
        { icon: "database", title: "DB Query", desc: "Sangat krusial untuk index & report.", color: "text-emerald-500", colorWeb: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
        { icon: "display_settings", title: "UI Rendering", desc: "Feed, Leaderboard, Kontak teman.", color: "text-violet-500", colorWeb: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10 border-violet-500/30" },
    ];

    const BubbleSortSteps = [
        "Bandingkan dua elemen berdampingan",
        "Jika kiri > kanan, tukar (SWAP) posisinya",
        "Elemen terbesar akan 'menggelembung' ke akhir array",
        "Ulangi terus hingga seluruhnya terurut"
    ];

    const SelectionSortSteps = [
        "Scan seluruh array untuk mencari nilai minimal",
        "Tukar nilai minimal ke bagian paling depan",
        "Persempit jangkauan scan ke kanan",
        "Ulangi sampai sisa array habis"
    ];

    const ExerciseData = [
        {
            question: "Diberikan array [5, 4, 3, 2, 1]. Berapa jumlah swap yang dilakukan oleh Bubble Sort hingga terurut?",
            answer: "10 Swap",
            explanation: "Bubble Sort membandingkan setiap pasangan. Pass 1: 4 swap, Pass 2: 3 swap, Pass 3: 2 swap, Pass 4: 1 swap. Total: 4+3+2+1 = 10.",
            color: "blue"
        },
        {
            question: "Manakah yang lebih efisien untuk data yang sudah 'hampir terurut': Bubble Sort (dengan flag) atau Selection Sort?",
            answer: "Bubble Sort",
            explanation: "Dengan flag 'swapped', Bubble Sort bisa berhenti dalam satu pass jika tidak ada swap (Best Case O(n)). Selection Sort selalu O(n²) karena tetap mencari nilai minimum di setiap iterasi.",
            color: "amber"
        },
        {
            question: "Mengapa Selection Sort dikatakan 'Unstable'?",
            answer: "Karena swap jarak jauh",
            explanation: "Selection Sort dapat menukar elemen yang nilainya sama melewati elemen lain, sehingga mengubah urutan relatif elemen tersebut. Contoh: [2a, 2b, 1] → 1 ditukar dengan 2a menjadi [1, 2b, 2a].",
            color: "violet"
        }
    ];

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

    const BubbleSortCode = () => (
        <code>
            <span className="text-purple-400">def</span> <span className="text-blue-400">bubble_sort</span>(arr):<br />
            &nbsp;&nbsp;n = <span className="text-blue-400">len</span>(arr)<br />
            &nbsp;&nbsp;<span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(n):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;swapped = <span className="text-amber-300">False</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">for</span> j <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-amber-300">0</span>, n-i-<span className="text-amber-300">1</span>):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> arr[j] &gt; arr[j+<span className="text-amber-300">1</span>]:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j], arr[j+<span className="text-amber-300">1</span>] = arr[j+<span className="text-amber-300">1</span>], arr[j]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swapped = <span className="text-amber-300">True</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if not</span> swapped:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">break</span>
        </code>
    );

    const SelectionSortCode = () => (
        <code>
            <span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">len</span>(arr)):<br />
            &nbsp;&nbsp;min_idx = i<br />
            &nbsp;&nbsp;<span className="text-purple-400">for</span> j <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(i+<span className="text-amber-300">1</span>, <span className="text-blue-400">len</span>(arr)):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> arr[j] &lt; arr[min_idx]:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_idx = j<br />
            &nbsp;&nbsp;arr[i], arr[min_idx] = arr[min_idx], arr[i]
        </code>
    );

    const slides = [
        // Slide 1: Introduction to Sorting
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-primary/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-primary/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-primary">sort</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Sorting Algorithms</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                "Mengapa kita perlu mengurutkan data?"
            </p>
            <div className="bg-white dark:bg-surface p-10 rounded-4xl border-4 border-primary/20 shadow-2xl mt-10">
                <p className="text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-bold">
                    Bayangkan mencari nama di buku telepon yang isinya <strong className="text-red-500">tidak terurut</strong>.
                    Sorting memungkinkan pencarian <strong className="text-emerald-500">10.000× lebih cepat</strong>.
                </p>
            </div>
        </div>,

        // Slide 2: Importance of Sorting
        <div key="s2" className="space-y-10">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-8">Penerapan Sorting Fundamental</h3>
            <div className="grid grid-cols-3 gap-6">
                {SortingIntroSteps.map((item, i) => (
                    <div key={i} className={`p-8 rounded-3xl border-4 ${item.bg} flex flex-col items-center text-center shadow-xl`}>
                        <span className={`material-symbols-outlined text-5xl ${item.color} mb-4`}>{item.icon}</span>
                        <h4 className={`font-black text-xl mb-3 ${item.color}`}>{item.title}</h4>
                        <p className="text-lg text-slate-700 dark:text-slate-200 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>,

        // Slide 3: Bubble Sort Concept
        <div key="s3_concept" className="space-y-8">
            <div className="bg-blue-500/10 p-10 border-4 border-blue-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-blue-500 text-white font-black px-4 py-2 rounded-xl shadow-lg">METHOD 1</span>
                    <h4 className="text-5xl font-black text-blue-600 italic">Bubble Sort</h4>
                </div>
                <h5 className="font-black text-3xl text-slate-900 dark:text-white mb-6 uppercase">"Gelembung Naik"</h5>
                <div className="space-y-4">
                    {BubbleSortSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-2xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
            </div>
        </div>,

        // Slide 4: Bubble Sort Code
        <div key="s4_code" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Implementasi Bubble Sort (Python)</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-blue-500/20 shadow-2xl">
                <div className="bg-slate-800 px-6 py-3 flex justify-between border-b-2 border-white/10">
                    <span className="text-lg text-slate-300 font-mono font-bold">bubble_sort.py</span>
                    <span className="text-lg text-blue-400 font-bold uppercase tracking-widest">Code Snippet</span>
                </div>
                <pre className="p-8 text-xl font-mono overflow-x-auto leading-relaxed max-h-[60vh]">
                    <code className="text-slate-200">
                        <BubbleSortCode />
                    </code>
                </pre>
            </div>
        </div>,

        // Slide 5: Bubble Sort Visualizer
        <div key="s5_visualizer" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase italic">Bubble Sort Visualizer</h3>
            <div className="w-full max-w-4xl bg-white dark:bg-slate-950 p-8 rounded-3xl border-4 border-blue-500/20 shadow-2xl">
                <BubbleSortVisualizer />
            </div>
        </div>,

        // Slide 6: Bubble Sort Table
        <div key="s6_table" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6">Tracing Table Bubble Sort</h3>
            <div className="bg-white dark:bg-surface border-4 border-blue-500/20 rounded-3xl shadow-2xl overflow-hidden">
                <table className="w-full text-lg text-left">
                    <thead className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 uppercase font-black">
                        <tr>
                            <th className="px-6 py-4">Pass</th>
                            <th className="px-6 py-4">Swap Action</th>
                            <th className="px-6 py-4 text-center">Jml Swap</th>
                            <th className="px-6 py-4 text-blue-600">Result</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-4 divide-primary/5 font-bold">
                        {bubbleTraceData.map((row, i) => (
                            <tr key={i} className={row.swapCount === 0 ? "bg-emerald-500/5 text-emerald-600" : ""}>
                                <td className="px-6 py-4">{row.pass}</td>
                                <td className="px-6 py-4 text-slate-600">{row.swap}</td>
                                <td className="px-6 py-4 text-center">{row.swapCount}</td>
                                <td className="px-6 py-4 font-mono">{row.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,

        // Slide 7: Selection Sort Concept
        <div key="s7_concept" className="space-y-8">
            <div className="bg-amber-500/10 p-10 border-4 border-amber-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-amber-500 text-white font-black px-4 py-2 rounded-xl shadow-lg">METHOD 2</span>
                    <h4 className="text-5xl font-black text-amber-600 italic">Selection Sort</h4>
                </div>
                <h5 className="font-black text-3xl text-slate-900 dark:text-white mb-6 uppercase">"Pilih yang Terkecil"</h5>
                <div className="space-y-4">
                    {SelectionSortSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-2xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        // Slide 8: Selection Sort Code
        <div key="s8_code" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Implementasi Selection Sort (Python)</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-amber-500/20 shadow-2xl">
                <div className="bg-slate-800 px-6 py-3 flex justify-between border-b-2 border-white/10">
                    <span className="text-lg text-slate-300 font-mono font-bold">selection_sort.py</span>
                    <span className="text-lg text-amber-400 font-bold uppercase tracking-widest">Code Snippet</span>
                </div>
                <pre className="p-8 text-xl font-mono overflow-x-auto leading-relaxed max-h-[60vh]">
                    <code className="text-slate-200">
                        <SelectionSortCode />
                    </code>
                </pre>
            </div>
        </div>,

        // Slide 9: Selection Sort Visualizer
        <div key="s9_visualizer" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase italic">Selection Sort Visualizer</h3>
            <div className="w-full max-w-4xl bg-white dark:bg-slate-950 p-8 rounded-3xl border-4 border-amber-500/20 shadow-2xl">
                <SelectionSortVisualizer />
            </div>
        </div>,

        // Slide 10: Selection Sort Table
        <div key="s10_table" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6">Tracing Table Selection Sort</h3>
            <div className="bg-white dark:bg-surface border-4 border-amber-500/20 rounded-3xl shadow-2xl overflow-hidden">
                <table className="w-full text-lg text-left">
                    <thead className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 uppercase font-black">
                        <tr>
                            <th className="px-6 py-4">Pass</th>
                            <th className="px-6 py-4">Find Min</th>
                            <th className="px-6 py-4">Swap Action</th>
                            <th className="px-6 py-4 text-amber-600">Result</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-4 divide-primary/5 font-bold">
                        {selectionTraceData.map((row, i) => (
                            <tr key={i}>
                                <td className="px-6 py-4">{row.pass}</td>
                                <td className="px-6 py-4 text-slate-600">{row.findMin}</td>
                                <td className="px-6 py-4">{row.swapWith}</td>
                                <td className="px-6 py-4 font-mono">{row.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,

        // Slide 11: Comparison Head-to-Head
        <div key="s11_compare" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-2 uppercase italic">Bubble vs Selection</h3>
            <div className="overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl bg-slate-900 text-white mb-4">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/10 font-black border-b border-white/10">
                        <tr>
                            <th className="px-5 py-3">Aspek</th>
                            <th className="px-5 py-3 text-blue-400">Bubble Sort</th>
                            <th className="px-5 py-3 text-amber-400">Selection Sort</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-bold">
                        {[
                            { aspect: "Best Case", b: "O(n) - Flag", s: "O(n²) - Selalu" },
                            { aspect: "Jumlah Swap", b: "Sangat Banyak", s: "Minim (N-1)" },
                            { aspect: "Stability", b: "✅ Stable", s: "❌ Unstable" },
                            { aspect: "Worst Case", b: "O(n²)", s: "O(n²)" }
                        ].map((row, i) => (
                            <tr key={i}>
                                <td className="px-5 py-3 text-slate-400">{row.aspect}</td>
                                <td className="px-5 py-3 text-blue-300 font-mono italic">{row.b}</td>
                                <td className="px-5 py-3 text-amber-300 font-mono italic">{row.s}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-500 text-lg shrink-0">timer</span>
                    <div>
                        <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 mb-1">Best Case</h4>
                        <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-tight">Bubble pintar berhenti jika data sudah terurut. Selection memaksa cek semua.</p>
                    </div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl flex items-start gap-2">
                    <span className="material-symbols-outlined text-purple-500 text-lg shrink-0">swap_horiz</span>
                    <div>
                        <h4 className="text-xs font-black text-purple-600 dark:text-purple-400 mb-1">Swap</h4>
                        <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-tight">Bubble menukar banyak data bersebelahan. Selection irit, max (N-1) kali.</p>
                    </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl flex items-start gap-2">
                    <span className="material-symbols-outlined text-blue-500 text-lg shrink-0">balance</span>
                    <div>
                        <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 mb-1">Stability</h4>
                        <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-tight">Bubble aman (Stable). Selection rawan merusak data identik (Unstable).</p>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 11b: Kapan Menggunakan
        <div key="s11_choose" className="space-y-8 h-full flex flex-col justify-center">
            <h3 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-8 uppercase italic">Kapan Menggunakannya?</h3>
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-blue-500/10 border-4 border-blue-500/20 p-8 rounded-3xl shadow-xl flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-3xl font-black text-blue-600">Bubble Sort</h4>
                        <span className="material-symbols-outlined text-4xl text-blue-500">water_drop</span>
                    </div>
                    <ul className="space-y-4 text-xl text-slate-700 dark:text-slate-200 font-bold">
                        <li className="flex gap-3"><span className="text-blue-500">✔</span> Data hampir terurut (Kecepatan O(n))</li>
                        <li className="flex gap-3"><span className="text-blue-500">✔</span> Butuh stabilitas (pengurutan ganda tidak rusak)</li>
                    </ul>
                </div>
                <div className="bg-amber-500/10 border-4 border-amber-500/20 p-8 rounded-3xl shadow-xl flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-3xl font-black text-amber-600">Selection Sort</h4>
                        <span className="material-symbols-outlined text-4xl text-amber-500">ads_click</span>
                    </div>
                    <ul className="space-y-4 text-xl text-slate-700 dark:text-slate-200 font-bold">
                        <li className="flex gap-3"><span className="text-amber-500">✔</span> Membatasi operasi SWAP (Disk/Write terbatas)</li>
                        <li className="flex gap-3"><span className="text-amber-500">✔</span> Maksimal hanya butuh (N-1) kali Swap</li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 bg-rose-500/10 border-2 border-rose-500/20 p-6 rounded-2xl shadow-sm">
                <p className="text-lg font-bold text-rose-600 italic text-center">
                    "Salah pilih algoritma bisa berakibat pemborosan resource O(n²) atau merusak urutan asli data (Unstable)."
                </p>
            </div>
        </div>,

        // Slide 12: Uji Pemahaman
        <div key="s11_quiz" className="space-y-8 text-center max-w-5xl mx-auto overflow-y-auto max-h-[80vh] p-4">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase italic">Uji Pemahaman 🧠</h3>
            <div className="grid grid-cols-1 gap-4">
                {ExerciseData.map((item, i) => (
                    <ExerciseCard key={i} item={item} isPresentation={true} />
                ))}
            </div>
        </div>,

        // Slide 13: Group Project challenge
        <div key="s12_project" className="space-y-6 text-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase italic">Tantangan Kelompok 👥</h3>
            <ExerciseCard
                item={{
                    question: "Studi Kasus: Sistem Monitoring Log dengan Bubble Sort.\n\nDiberikan 1.000 data log yang 'hampir terurut'. Jika sistem Anda memiliki keterbatasan memori (tidak boleh membuat array baru) dan harus berhenti secepat mungkin, buktikan dengan tracing (5 data contoh) bahwa Bubble Sort dengan Optimization Flag adalah pilihan yang tepat. Analisis juga Time Complexity-nya!",
                    answer: "Bubble Sort Optimized",
                    explanation: "1. KONSEP: Memenuhi syarat In-place (O(1) extra space).\n2. TRACING: Contoh [1, 2, 4, 3, 5]. Pass 1: [1, 2, 3, 4, 5], Swapped = True. Pass 2: No swap, Swapped = False -> BREAK.\n3. COMPLEXITY: Best Case O(n) berkat flag, jauh lebih baik daripada Selection Sort yang tetap O(n²) meskipun data sudah terurut.",
                    color: "blue"
                }}
                isPresentation={true}
                password="psw_jawaban_Bd@"
            />
        </div>,

        // Slide 14: Summary
        <div key="s12_summary" className="space-y-8 text-center">
            <div className="bg-emerald-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-emerald-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-emerald-500">task_alt</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase italic">Materi Selesai!</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-bold italic">"Algoritma yang baik bukan hanya yang paling cepat, tapi yang paling tepat untuk masalahnya."</p>
            <button
                onClick={() => setIsPresentationOpen(false)}
                className="mt-10 px-10 py-5 bg-slate-900 text-white rounded-3xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
                EXIT PRESENTATION
            </button>
        </div>
    ];

    return (
        <div className="space-y-16 pb-12">
            {/* Presentation Mode Header */}
            <div className="flex justify-center mb-12">
                <button
                    onClick={() => openPresentation(0)}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group border-b-4 border-primary-dark"
                >
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform text-2xl">present_to_all</span>
                    MULAI MODE PRESENTASI
                </button>
            </div>

            {/* ─── BAGIAN 1: PENGANTAR SORTING ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 1: Apa itu Sorting?</span>
                                <button
                                    onClick={() => openPresentation(0)}
                                    className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button onClick={() => openPresentation(0)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-primary z-10"><span className="material-symbols-outlined text-sm">slideshow</span></button>
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
                                    {SortingIntroSteps.map((item, i) => (
                                        <div key={i} className={`p-4 rounded-xl border-2 ${item.bg}`}>
                                            <span className={`material-symbols-outlined text-2xl ${item.colorWeb} mb-2 block`}>{item.icon}</span>
                                            <h4 className={`font-black text-sm mb-1 ${item.colorWeb}`}>{item.title}</h4>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 2: BUBBLE SORT ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 2: Bubble Sort</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openPresentation(2)}
                                        className="p-1 px-3 text-[10px) font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                    >
                                        <span className="material-symbols-outlined text-xs">info</span> KONSEP
                                    </button>
                                    <button
                                        onClick={() => openPresentation(3)}
                                        className="p-1 px-3 text-[10px) font-black bg-blue-500/10 text-blue-500 rounded-full hover:bg-blue-500/20 transition-colors flex items-center gap-1 border border-blue-500/20"
                                    >
                                        <span className="material-symbols-outlined text-xs">code</span> CODE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2 z-10">
                                <button onClick={() => openPresentation(2)} className="p-2 text-primary"><span className="material-symbols-outlined text-sm">info</span></button>
                                <button onClick={() => openPresentation(3)} className="p-2 text-blue-500"><span className="material-symbols-outlined text-sm">code</span></button>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-blue-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-blue-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">METODE 1</span>
                                        <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400 italic">Bubble Sort</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Seperti gelembung udara di dalam air — elemen terbesar akan terus "naik" ke posisi teratas.
                                    </p>
                                    <div className="space-y-2">
                                        {BubbleSortSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-blue-500/20 text-blue-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200">
                                        <BubbleSortCode />
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
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 3: Tracing Bubble Sort</span>
                                <button
                                    onClick={() => openPresentation(4)}
                                    className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button onClick={() => openPresentation(4)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-primary z-10"><span className="material-symbols-outlined text-sm">slideshow</span></button>
                            <BubbleSortVisualizer />
                            <div className="mt-8 bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing Table — Bubble Sort</div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left font-bold">
                                        <thead className="bg-slate-100 dark:bg-slate-900 border-b-2 border-primary/10">
                                            <tr>
                                                <th className="px-4 py-3">Pass</th>
                                                <th className="px-4 py-3">Swap Action</th>
                                                <th className="px-4 py-3 text-center">Count</th>
                                                <th className="px-4 py-3 text-blue-600">Result</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-primary/5">
                                            {bubbleTraceData.map((row, i) => (
                                                <tr key={i} className={row.swapCount === 0 ? "bg-emerald-500/10" : ""}>
                                                    <td className="px-4 py-3">{row.pass}</td>
                                                    <td className="px-4 py-3 text-slate-500">{row.swap}</td>
                                                    <td className="px-4 py-3 text-center">{row.swapCount}</td>
                                                    <td className="px-4 py-3 font-mono">{row.result}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 4: SELECTION SORT ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 4: Selection Sort</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openPresentation(6)}
                                        className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                    >
                                        <span className="material-symbols-outlined text-xs">info</span> KONSEP
                                    </button>
                                    <button
                                        onClick={() => openPresentation(7)}
                                        className="p-1 px-3 text-[10px] font-black bg-amber-500/10 text-amber-500 rounded-full hover:bg-amber-500/20 transition-colors flex items-center gap-1 border border-amber-500/20"
                                    >
                                        <span className="material-symbols-outlined text-xs">code</span> CODE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-2 z-10">
                                <button onClick={() => openPresentation(6)} className="p-2 text-primary"><span className="material-symbols-outlined text-sm">info</span></button>
                                <button onClick={() => openPresentation(7)} className="p-2 text-amber-500"><span className="material-symbols-outlined text-sm">code</span></button>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-amber-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-amber-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-lg">METODE 2</span>
                                        <h4 className="text-2xl font-black text-amber-600 dark:text-amber-400 italic">Selection Sort</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Pilih nilai terkecil dari sisa array, lalu pindahkan ke bagian depan.
                                    </p>
                                    <div className="space-y-2">
                                        {SelectionSortSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-amber-500/20 text-amber-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm text-slate-200 overflow-x-auto">
                                    <SelectionSortCode />
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
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 5: Tracing Selection Sort</span>
                                <button
                                    onClick={() => openPresentation(8)}
                                    className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group">
                            <button onClick={() => openPresentation(8)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-primary z-10"><span className="material-symbols-outlined text-sm">slideshow</span></button>
                            <SelectionSortVisualizer />
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
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 6: Komparasi Performa</span>
                                <button
                                    onClick={() => openPresentation(10)}
                                    className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="relative group bg-slate-900 rounded-3xl p-8 border border-white/10 text-white">
                            <button onClick={() => openPresentation(10)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-primary z-10"><span className="material-symbols-outlined text-sm">slideshow</span></button>
                            <h4 className="text-xl font-black mb-6">Head-to-Head Perbandingan</h4>
                            <div className="overflow-x-auto rounded-xl border border-white/10">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 font-black border-b border-white/10">
                                        <tr>
                                            <th className="px-5 py-3">Aspek</th>
                                            <th className="px-5 py-3 text-blue-400">Bubble Sort</th>
                                            <th className="px-5 py-3 text-amber-400">Selection Sort</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10 font-bold italic">
                                        {[
                                            { aspect: "Best Case", bubble: "O(n) — Flag", selection: "O(n²) — Selalu" },
                                            { aspect: "Jumlah Swap", bubble: "Sangat Banyak", selection: "Minim (N-1)" },
                                            { aspect: "Stability", bubble: "✅ Stable", selection: "❌ Unstable" },
                                            { aspect: "Worst Case", bubble: "O(n²)", selection: "O(n²)" }
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td className="px-5 py-3 text-slate-300">{row.aspect}</td>
                                                <td className="px-5 py-3 text-blue-300">{row.bubble}</td>
                                                <td className="px-5 py-3 text-amber-300">{row.selection}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Penjelasan Tambahan */}
                            <div className="mt-8 space-y-6">
                                <div>
                                    <h5 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined">insights</span>
                                        Implikasi & Maksud Komparasi
                                    </h5>
                                    <ul className="space-y-4 text-sm text-slate-300">
                                        <li className="flex items-start gap-4">
                                            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-xl">timer</span>
                                            </div>
                                            <div>
                                                <strong className="text-white block mb-1 text-base">Adaptasi Kasus Terbaik (Best Case)</strong>
                                                <em>Bubble Sort</em> (dengan <i>flag</i> optimasi) cerdas mengenali array yang sudah hampir terurut dan bisa langsung berhenti dalam hitungan <code className="text-emerald-400 font-mono">O(n)</code>. Sebaliknya, <em>Selection Sort</em> tetap "kaku" dan memaksa memindai (scan) penuh seluruh sisa array meskipun data dijamin sudah terurut sehingga bebannya tetap <code className="text-rose-400 font-mono bg-rose-400/10 px-1 rounded">O(n²)</code>. Salah pilih di sini berakibat pemborosan resource CPU yang drastis.
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400 shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-xl">swap_horiz</span>
                                            </div>
                                            <div>
                                                <strong className="text-white block mb-1 text-base">Jumlah Operasi Penulisan / Swap</strong>
                                                Aksi Write (swap memori) merupakan operasi yang cukup membebani resource. <em>Bubble Sort</em> mengalirkan data dengan melakukan iterasi pertukaran hingga puluhan-ratusan kali. Sementara <em>Selection Sort</em> membatasi aksi Write maksimal hanya <code className="text-white font-mono break-all">(N - 1)</code> kali saja seburuk apapun data berantakan (hanya ada Write saat pindah indeks target).
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-xl">balance</span>
                                            </div>
                                            <div>
                                                <strong className="text-white block mb-1 text-base">Stabilitas Urutan (Stability)</strong>
                                                Algoritma <em>Stable</em> menjamin dua identitas berbeda tapi bernilai komparasi sama tidak akan bertukar urutan aslinya. <em>Bubble Sort</em> sangat aman untuk ini karena pertukarannya murni bersebelahan perlahan-lahan. Sebaliknya, lompatan panjang pertukaran ala <em>Selection Sort</em> dapat merusak susunan data duplikat yang sebelumnya terbentuk (<em>Unstable</em>).
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-6 pt-6 border-t border-white/10 mt-6">
                                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl relative overflow-hidden">
                                        <div className="absolute -bottom-4 right-0 p-4 opacity-10 pointer-events-none"><span className="material-symbols-outlined text-8xl text-blue-400">water_drop</span></div>
                                        <h6 className="font-black text-blue-400 mb-4 flex items-center gap-2 relative z-10">
                                            <span className="material-symbols-outlined">thumb_up</span> Kapan Bubble Sort Ideal?
                                        </h6>
                                        <ul className="list-disc list-inside space-y-3 text-sm text-blue-100/80 relative z-10">
                                            <li>Data masukan diyakini mayoritas <strong>hampir terurut</strong> (Memaksimalkan efisiensi *O(n)* best-case).</li>
                                            <li><strong>Kestabilan ganda</strong> (Stability/Multi-Level Sort) mutlak dibutuhkan dalam pemrosesan data (Contoh sorting prioritas yang ditumpuk).</li>
                                        </ul>
                                    </div>
                                    <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl relative overflow-hidden">
                                        <div className="absolute -bottom-4 right-0 p-4 opacity-10 pointer-events-none"><span className="material-symbols-outlined text-8xl text-amber-400">touch_app</span></div>
                                        <h6 className="font-black text-amber-400 mb-4 flex items-center gap-2 relative z-10">
                                            <span className="material-symbols-outlined">thumb_up</span> Kapan Selection Sort Ideal?
                                        </h6>
                                        <ul className="list-disc list-inside space-y-3 text-sm text-amber-100/80 relative z-10">
                                            <li>Tindakan/Aksi tulis (*Write/Swap*) ke database/disk <strong>sangat memakan waktu lama & dibatasi</strong>.</li>
                                            <li>Pengoperasian dalam EEPROM mikro/Sistem tertanam (*Embedded Systems*) yang rawan <em>wear & tear</em> karena aksi tulis memori (*Write Endurance Limit*).</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 7: UJI PEMAHAMAN ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 7: Uji Pemahaman</span>
                                <button
                                    onClick={() => openPresentation(11)}
                                    className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="grid md:grid-cols-2 gap-6">
                            {ExerciseData.map((item, i) => (
                                <ExerciseCard key={i} item={item} />
                            ))}
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 8: PROJEK KELOMPOK ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 8: Projek Kelompok</span>
                                <button
                                    onClick={() => openPresentation(12)}
                                    className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <div className="max-w-4xl mx-auto">
                            <ExerciseCard
                                item={{
                                    question: "Implementasi & Analisis Algoritma Berkelompok:\n\nSebuah bank memiliki daftar 10.000 transaksi harian yang hampir terurut (hanya beberapa transaksi terbaru yang berantakan). Bank memerlukan sistem pengurutan yang:\n1. Tidak memakan memori tambahan (In-place).\n2. Sangat cepat jika data hampir terurut.\n\nTUGAS:\na) Tentukan algoritma yang paling cocok.\nb) Lakukan Tracing manual untuk array berikut: [2, 5, 8, 12, 10]\nc) Jelaskan perbandingan Time Complexity (Best/Average/Worst Case) antara pilihan Anda dengan Selection Sort.",
                                    answer: "Bubble Sort dengan Optimization Flag",
                                    explanation: "A) ALGORITMA: Bubble Sort + Flag (swapped).\n\nB) TRACING [2, 5, 8, 12, 10]:\n- Pass 1: Bandingkan (2,5), (5,8), (8,12), (12,10) -> SWAP (12,10). Hasil: [2, 5, 8, 10, 12]. Swapped = True.\n- Pass 2: Bandingkan semua, tidak ada swap. Swapped = False -> BREAK.\nTotal: 2 Pass (Sangat Efisien).\n\nC) COMPLEXITY:\n- Bubble Sort Optimized: O(n) Best Case, O(n²) Worst Case.\n- Selection Sort: Selalu O(n²) dalam kondisi apapun karena tetap mencari nilai minimum di sisa array.",
                                    color: "blue"
                                }}
                                password="psw_jawaban_Bd@"
                            />
                        </div>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* Presentation Mode Component */}
            <PresentationMode
                slides={slides}
                isOpen={isPresentationOpen}
                initialSlide={startSlideIndex}
                onExit={() => setIsPresentationOpen(false)}
            />
        </div>
    );
}
