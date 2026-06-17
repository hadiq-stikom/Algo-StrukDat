"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import MergeSortVisualizer from "./MergeSortVisualizer";
import QuickSortVisualizer from "./QuickSortVisualizer";
import PresentationMode from "@/components/PresentationMode";

export default function Module10Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const mergeTraceData = [
        { step: "Divide", action: "[38,27,43,3,9,82,10] → kiri [38,27,43] | kanan [3,9,82,10]", result: "Pecah menjadi 2 sub-array" },
        { step: "Divide", action: "[38,27,43] → [38] | [27,43]", result: "Rekursif ke kiri" },
        { step: "Merge", action: "Gabung [27] + [43] → [27,43]", result: "[27,43]" },
        { step: "Merge", action: "Gabung [38] + [27,43] → [27,38,43]", result: "[27,38,43]" },
        { step: "Merge", action: "Gabung [3,9,10,82] + [27,38,43]", result: "[3,9,10,27,38,43,82] ✓" },
    ];

    const quickTraceData = [
        { step: "Pivot=90", action: "Partition [64,34,25,12,22,11,90]", result: "Kiri <90: [64,34,25,12,22,11] | Pivot di idx 6" },
        { step: "Pivot=11", action: "Partition sub-array kiri, pivot=11 (idx 5)", result: "[11] | [34,25,12,22,64]" },
        { step: "Pivot=64", action: "Partition kanan pivot, pivot=64 (idx 4)", result: "[34,25,12,22] | [64]" },
        { step: "Pivot=22", action: "Partition [34,25,12,22], pivot=22", result: "[12] | [22] | [34,25]" },
        { step: "Done", action: "Rekursif selesai di semua sub-array", result: "[11,12,22,25,34,64,90] ✓" },
    ];

    const DivideConquerSteps = [
        { icon: "call_split", title: "Divide", desc: "Pecah masalah besar menjadi sub-masalah yang lebih kecil.", color: "text-cyan-500", bg: "bg-cyan-500/10 border-cyan-500/30" },
        { icon: "sync", title: "Conquer", desc: "Selesaikan sub-masalah secara rekursif (base case = elemen tunggal).", color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/30" },
        { icon: "merge", title: "Combine", desc: "Gabungkan solusi sub-masalah menjadi solusi masalah asli.", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" },
    ];

    const MergeSortSteps = [
        "Pecah array menjadi dua bagian (kiri & kanan) secara rekursif",
        "Terus bagi hingga setiap sub-array hanya berisi 1 elemen (base case)",
        "Gabungkan (merge) dua sub-array terurut menjadi satu array terurut",
        "Ulangi merge dari bawah ke atas hingga seluruh array terurut",
    ];

    const QuickSortSteps = [
        "Pilih elemen pivot (biasanya elemen terakhir)",
        "Partition: elemen < pivot ke kiri, elemen > pivot ke kanan",
        "Pivot sudah berada di posisi final yang benar",
        "Rekursif sort sub-array kiri dan kanan dari pivot",
    ];

    const ExerciseData = [
        {
            question: "Array [1, 2, 3, 4, 5] sudah terurut. Apa Time Complexity Merge Sort dan Quick Sort (pivot=last)?",
            answer: "Merge: O(n log n), Quick: O(n²)",
            explanation: "Merge Sort selalu O(n log n) karena tetap melakukan divide & merge penuh. Quick Sort dengan pivot terakhir pada array terurut menghasilkan partisi tidak seimbang (0 elemen vs n-1), sehingga degradasi ke O(n²).",
            color: "cyan",
        },
        {
            question: "Mengapa Merge Sort membutuhkan O(n) ruang tambahan sedangkan Quick Sort in-place?",
            answer: "Merge Sort butuh array temp saat merge",
            explanation: "Saat fase merge, Merge Sort membutuhkan array sementara (temp) untuk menggabungkan dua sub-array. Quick Sort hanya menukar elemen di array asli (in-place), sehingga space complexity O(log n) untuk call stack rekursif.",
            color: "rose",
        },
        {
            question: "Algoritma mana yang STABLE dan cocok untuk data besar di disk eksternal?",
            answer: "Merge Sort",
            explanation: "Merge Sort stabil (elemen sama tidak bertukar urutan) dan performa konsisten O(n log n). Cocok untuk external sorting karena merge sequential access pattern. Quick Sort tidak stabil dan worst case O(n²).",
            color: "purple",
        },
    ];

    const ExerciseCard = ({ item, isPresentation = false, password = "" }: { item: { question: string; answer: string; explanation: string; color: string }; isPresentation?: boolean; password?: string }) => {
        const [showAnswer, setShowAnswer] = useState(false);
        const [inputPassword, setInputPassword] = useState("");
        const [error, setError] = useState(false);
        const colorClass = item.color === "cyan" ? "cyan" : item.color === "rose" ? "rose" : "purple";

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
                <div className={`p-6 bg-${colorClass}-500/10 border-2 border-${colorClass}-500/30 rounded-2xl shadow-lg`}>
                    <p className="text-lg font-bold italic text-slate-700 dark:text-slate-200 mb-4">&ldquo;{item.question}&rdquo;</p>
                    {showAnswer ? (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className={`text-xl font-black text-${colorClass}-600 mb-2 uppercase flex items-center gap-2`}>
                                <span className="material-symbols-outlined">check_circle</span>
                                {item.answer}
                            </div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed border-t border-black/5 pt-2 italic whitespace-pre-line">
                                {item.explanation}
                            </p>
                            <button onClick={() => setShowAnswer(false)} className="mt-4 text-xs font-black text-slate-400 hover:text-slate-600 uppercase">
                                Tutup Jawaban
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {password && (
                                <input
                                    type="password"
                                    placeholder="Masukkan Password Dosen..."
                                    className={`w-full p-3 bg-white dark:bg-slate-900 border-2 ${error ? "border-red-500" : "border-primary/20"} rounded-xl text-center text-sm font-bold`}
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                />
                            )}
                            <button
                                onClick={handleReveal}
                                className={`w-full py-4 border-2 border-dashed border-${colorClass}-500/40 rounded-xl text-${colorClass}-600 font-black hover:bg-${colorClass}-500/5 transition-all flex items-center justify-center gap-2`}
                            >
                                <span className="material-symbols-outlined">{password ? "lock_open" : "visibility"}</span>
                                {password ? "BUKA KUNCI JAWABAN" : "LIHAT JAWABAN"}
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className={`group bg-white dark:bg-surface border-2 ${showAnswer ? `border-${colorClass}-500/50 shadow-md` : "border-primary/20 shadow-sm"} rounded-2xl p-6 transition-all`}>
                <div className="flex items-start gap-4 mb-4">
                    <div className={`p-2 rounded-lg bg-${colorClass}-500/10 text-${colorClass}-500`}>
                        <span className="material-symbols-outlined font-black text-xl">{password ? "groups" : "quiz"}</span>
                    </div>
                    <div>
                        {password && <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 block">Tugas Kelompok</span>}
                        <p className="font-bold text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line">{item.question}</p>
                    </div>
                </div>
                <div className="pl-12 text-left">
                    {showAnswer ? (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className={`text-lg font-black text-${colorClass}-600 dark:text-${colorClass}-400 mb-2 uppercase italic underline decoration-wavy underline-offset-4`}>
                                Jawaban: {item.answer}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-white/5 italic whitespace-pre-line">
                                {item.explanation}
                            </p>
                            <button
                                onClick={() => { setShowAnswer(false); setInputPassword(""); }}
                                className="mt-3 text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest flex items-center gap-1"
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
                                    className={`p-2 bg-slate-50 dark:bg-slate-900/50 border-2 ${error ? "border-red-500" : "border-primary/10"} rounded-xl text-xs font-bold w-full sm:w-40`}
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleReveal()}
                                />
                            )}
                            <button
                                onClick={handleReveal}
                                className={`px-6 py-2 bg-${colorClass}-500/10 text-${colorClass}-600 text-xs font-black rounded-xl hover:bg-${colorClass}-500/20 transition-all flex items-center gap-2 border border-${colorClass}-500/20 whitespace-nowrap`}
                            >
                                <span className="material-symbols-outlined text-sm">{password ? "lock_open" : "visibility"}</span>
                                {password ? "Buka Solusi" : "Buka Jawaban"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const MergeSortCode = () => (
        <code>
            <span className="text-cyan-400">def</span> <span className="text-blue-400">merge_sort</span>(arr):<br />
            &nbsp;&nbsp;<span className="text-cyan-400">if</span> <span className="text-blue-400">len</span>(arr) &lt;= <span className="text-amber-300">1</span>:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">return</span> arr<br />
            &nbsp;&nbsp;mid = <span className="text-blue-400">len</span>(arr) // <span className="text-amber-300">2</span><br />
            &nbsp;&nbsp;left = merge_sort(arr[:mid])<br />
            &nbsp;&nbsp;right = merge_sort(arr[mid:])<br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> merge(left, right)<br />
            <br />
            <span className="text-cyan-400">def</span> <span className="text-blue-400">merge</span>(left, right):<br />
            &nbsp;&nbsp;result, i, j = [], <span className="text-amber-300">0</span>, <span className="text-amber-300">0</span><br />
            &nbsp;&nbsp;<span className="text-cyan-400">while</span> i &lt; <span className="text-blue-400">len</span>(left) <span className="text-cyan-400">and</span> j &lt; <span className="text-blue-400">len</span>(right):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> left[i] &lt;= right[j]:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result.append(left[i]); i += <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">else</span>:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result.append(right[j]); j += <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> result + left[i:] + right[j:]
        </code>
    );

    const QuickSortCode = () => (
        <code>
            <span className="text-cyan-400">def</span> <span className="text-blue-400">quick_sort</span>(arr, low, high):<br />
            &nbsp;&nbsp;<span className="text-cyan-400">if</span> low &lt; high:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;pi = partition(arr, low, high)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;quick_sort(arr, low, pi - <span className="text-amber-300">1</span>)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;quick_sort(arr, pi + <span className="text-amber-300">1</span>, high)<br />
            <br />
            <span className="text-cyan-400">def</span> <span className="text-blue-400">partition</span>(arr, low, high):<br />
            &nbsp;&nbsp;pivot = arr[high]<br />
            &nbsp;&nbsp;i = low - <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;<span className="text-cyan-400">for</span> j <span className="text-cyan-400">in</span> <span className="text-blue-400">range</span>(low, high):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> arr[j] &lt; pivot:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i += <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[i], arr[j] = arr[j], arr[i]<br />
            &nbsp;&nbsp;arr[i+<span className="text-amber-300">1</span>], arr[high] = arr[high], arr[i+<span className="text-amber-300">1</span>]<br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> i + <span className="text-amber-300">1</span>
        </code>
    );

    const slides = [
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-cyan-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-cyan-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-cyan-500">auto_awesome_motion</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Advanced Sorting</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                &ldquo;Dari O(n²) ke O(n log n) — revolusi efisiensi sorting&rdquo;
            </p>
            <div className="bg-white dark:bg-surface p-10 rounded-4xl border-4 border-cyan-500/20 shadow-2xl mt-10">
                <p className="text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-bold">
                    Bubble & Selection Sort <strong className="text-red-500">O(n²)</strong> terlalu lambat untuk jutaan data.
                    Merge Sort & Quick Sort mencapai <strong className="text-emerald-500">O(n log n)</strong>.
                </p>
            </div>
        </div>,

        <div key="s2" className="space-y-10">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-8">Paradigma Divide & Conquer</h3>
            <div className="grid grid-cols-3 gap-6">
                {DivideConquerSteps.map((item, i) => (
                    <div key={i} className={`p-8 rounded-3xl border-4 ${item.bg} flex flex-col items-center text-center shadow-xl`}>
                        <span className={`material-symbols-outlined text-5xl ${item.color} mb-4`}>{item.icon}</span>
                        <h4 className={`font-black text-xl mb-3 ${item.color}`}>{item.title}</h4>
                        <p className="text-lg text-slate-700 dark:text-slate-200 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>,

        <div key="s3" className="space-y-8">
            <div className="bg-cyan-500/10 p-10 border-4 border-cyan-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-cyan-500 text-white font-black px-4 py-2 rounded-xl shadow-lg">METHOD 1</span>
                    <h4 className="text-5xl font-black text-cyan-600 italic">Merge Sort</h4>
                </div>
                <div className="space-y-4">
                    {MergeSortSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-2xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-cyan-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
            </div>
        </div>,

        <div key="s4" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Implementasi Merge Sort (Python)</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-cyan-500/20 shadow-2xl">
                <div className="bg-slate-800 px-6 py-3 flex justify-between border-b-2 border-white/10">
                    <span className="text-lg text-slate-300 font-mono font-bold">merge_sort.py</span>
                    <span className="text-lg text-cyan-400 font-bold uppercase tracking-widest">Code Snippet</span>
                </div>
                <pre className="p-8 text-xl font-mono overflow-x-auto leading-relaxed max-h-[60vh]">
                    <code className="text-slate-200"><MergeSortCode /></code>
                </pre>
            </div>
        </div>,

        <div key="s5" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase italic">Merge Sort Visualizer</h3>
            <div className="w-full max-w-4xl bg-white dark:bg-slate-950 p-8 rounded-3xl border-4 border-cyan-500/20 shadow-2xl">
                <MergeSortVisualizer />
            </div>
        </div>,

        <div key="s6" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6">Tracing Merge Sort</h3>
            <div className="bg-white dark:bg-surface border-4 border-cyan-500/20 rounded-3xl shadow-2xl overflow-hidden">
                <table className="w-full text-lg text-left">
                    <thead className="bg-slate-200 dark:bg-slate-800 font-black uppercase">
                        <tr>
                            <th className="px-6 py-4">Fase</th>
                            <th className="px-6 py-4">Aksi</th>
                            <th className="px-6 py-4 text-cyan-600">Hasil</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-4 divide-primary/5 font-bold">
                        {mergeTraceData.map((row, i) => (
                            <tr key={i}>
                                <td className="px-6 py-4">{row.step}</td>
                                <td className="px-6 py-4 text-slate-600">{row.action}</td>
                                <td className="px-6 py-4 font-mono">{row.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,

        <div key="s7" className="space-y-8">
            <div className="bg-rose-500/10 p-10 border-4 border-rose-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-rose-500 text-white font-black px-4 py-2 rounded-xl shadow-lg">METHOD 2</span>
                    <h4 className="text-5xl font-black text-rose-600 italic">Quick Sort</h4>
                </div>
                <div className="space-y-4">
                    {QuickSortSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-2xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
            </div>
        </div>,

        <div key="s8" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6 uppercase italic">Implementasi Quick Sort (Python)</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-rose-500/20 shadow-2xl">
                <div className="bg-slate-800 px-6 py-3 flex justify-between border-b-2 border-white/10">
                    <span className="text-lg text-slate-300 font-mono font-bold">quick_sort.py</span>
                    <span className="text-lg text-rose-400 font-bold uppercase tracking-widest">Code Snippet</span>
                </div>
                <pre className="p-8 text-xl font-mono overflow-x-auto leading-relaxed max-h-[60vh]">
                    <code className="text-slate-200"><QuickSortCode /></code>
                </pre>
            </div>
        </div>,

        <div key="s9" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase italic">Quick Sort Visualizer</h3>
            <div className="w-full max-w-4xl bg-white dark:bg-slate-950 p-8 rounded-3xl border-4 border-rose-500/20 shadow-2xl">
                <QuickSortVisualizer />
            </div>
        </div>,

        <div key="s10" className="space-y-6">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-6">Tracing Quick Sort</h3>
            <div className="bg-white dark:bg-surface border-4 border-rose-500/20 rounded-3xl shadow-2xl overflow-hidden">
                <table className="w-full text-lg text-left">
                    <thead className="bg-slate-200 dark:bg-slate-800 font-black uppercase">
                        <tr>
                            <th className="px-6 py-4">Langkah</th>
                            <th className="px-6 py-4">Partition</th>
                            <th className="px-6 py-4 text-rose-600">Hasil</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-4 divide-primary/5 font-bold">
                        {quickTraceData.map((row, i) => (
                            <tr key={i}>
                                <td className="px-6 py-4">{row.step}</td>
                                <td className="px-6 py-4 text-slate-600">{row.action}</td>
                                <td className="px-6 py-4 font-mono">{row.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,

        <div key="s11" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-2 uppercase italic">Merge vs Quick Sort</h3>
            <div className="overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl bg-slate-900 text-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/10 font-black border-b border-white/10">
                        <tr>
                            <th className="px-5 py-3">Aspek</th>
                            <th className="px-5 py-3 text-cyan-400">Merge Sort</th>
                            <th className="px-5 py-3 text-rose-400">Quick Sort</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-bold">
                        {[
                            { aspect: "Best/Avg Case", m: "O(n log n)", q: "O(n log n)" },
                            { aspect: "Worst Case", m: "O(n log n)", q: "O(n²) — pivot buruk" },
                            { aspect: "Space", m: "O(n) — butuh temp", q: "O(log n) — in-place" },
                            { aspect: "Stability", m: "✅ Stable", q: "❌ Unstable" },
                            { aspect: "Use Case", m: "Data besar, eksternal", q: "In-memory, cache-friendly" },
                        ].map((row, i) => (
                            <tr key={i}>
                                <td className="px-5 py-3 text-slate-400">{row.aspect}</td>
                                <td className="px-5 py-3 text-cyan-300 font-mono italic">{row.m}</td>
                                <td className="px-5 py-3 text-rose-300 font-mono italic">{row.q}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,

        <div key="s12" className="space-y-8 text-center max-w-5xl mx-auto overflow-y-auto max-h-[80vh] p-4">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase italic">Uji Pemahaman 🧠</h3>
            <div className="grid grid-cols-1 gap-4">
                {ExerciseData.map((item, i) => (
                    <ExerciseCard key={i} item={item} isPresentation={true} />
                ))}
            </div>
        </div>,

        <div key="s13" className="space-y-6 text-center">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase italic">Tantangan Kelompok 👥</h3>
            <ExerciseCard
                item={{
                    question: "Studi Kasus: E-commerce dengan 500.000 produk perlu di-sort berdasarkan harga setiap detik.\n\nSyarat: Stabilitas wajib (produk harga sama harus tetap urutan asli), worst case harus predictable.\n\nTUGAS: Pilih algoritma, implementasi Python, dan analisis Big O!",
                    answer: "Merge Sort",
                    explanation: "1. ALGORITMA: Merge Sort — stable, worst case O(n log n) predictable.\n2. QUICK SORT TIDAK COCOK: Unstable, worst case O(n²) jika pivot buruk.\n3. IMPLEMENTASI: merge_sort() + merge() seperti materi.\n4. ANALISIS: Time O(n log n) all cases, Space O(n) untuk temp array.",
                    color: "cyan",
                }}
                isPresentation={true}
                password="psw_jawaban_Adv@"
            />
        </div>,

        <div key="s14" className="space-y-8 text-center">
            <div className="bg-emerald-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-emerald-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-emerald-500">task_alt</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase italic">Materi Selesai!</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-bold italic">
                &ldquo;Divide & Conquer — pecah masalah besar, selesaikan dengan elegan.&rdquo;
            </p>
            <button
                onClick={() => setIsPresentationOpen(false)}
                className="mt-10 px-10 py-5 bg-slate-900 text-white rounded-3xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
                EXIT PRESENTATION
            </button>
        </div>,
    ];

    const SectionDivider = ({ title, slideIndex }: { title: string; slideIndex?: number }) => (
        <ScrollReveal>
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t-2 border-primary/40"></div>
                </div>
                <div className="relative flex justify-center">
                    <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                        <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">{title}</span>
                        {slideIndex !== undefined && (
                            <button
                                onClick={() => openPresentation(slideIndex)}
                                className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                            >
                                <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );

    return (
        <div className="space-y-16 pb-12">
            <div className="flex justify-center mb-12">
                <button
                    onClick={() => openPresentation(0)}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group border-b-4 border-primary-dark"
                >
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform text-2xl">present_to_all</span>
                    MULAI MODE PRESENTASI
                </button>
            </div>

            {/* BAGIAN 1: PENGANTAR */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 1: Mengapa Advanced Sorting?" slideIndex={0} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-cyan-500/30 p-2 rounded-lg text-cyan-500">
                                    <span className="material-symbols-outlined text-xl">speed</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Batasan Algoritma O(n²)</h3>
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                Bubble Sort dan Selection Sort memiliki kompleksitas <strong className="text-red-500">O(n²)</strong>.
                                Untuk n = 1.000.000 elemen, itu berarti ~1 triliun operasi perbandingan!
                                Advanced sorting menggunakan paradigma <strong className="text-cyan-600">Divide & Conquer</strong> untuk mencapai{" "}
                                <strong className="text-emerald-600">O(n log n)</strong> — hanya ~20 juta operasi untuk data yang sama.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                {DivideConquerSteps.map((item, i) => (
                                    <div key={i} className={`p-4 rounded-xl border-2 ${item.bg}`}>
                                        <span className={`material-symbols-outlined text-2xl ${item.color} mb-2 block`}>{item.icon}</span>
                                        <h4 className={`font-black text-sm mb-1 ${item.color}`}>{item.title}</h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 2: MERGE SORT */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 2: Merge Sort" slideIndex={2} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-cyan-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-cyan-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-cyan-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">METODE 1</span>
                                        <h4 className="text-2xl font-black text-cyan-600 italic">Merge Sort</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Pecah array menjadi dua, sort masing-masing, lalu gabungkan kembali secara terurut.
                                    </p>
                                    <div className="space-y-2">
                                        {MergeSortSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-cyan-500/20 text-cyan-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                                        <p className="text-xs font-bold text-cyan-700 dark:text-cyan-300">
                                            Time: O(n log n) | Space: O(n) | Stable: ✅
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><MergeSortCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 3: MERGE SORT VISUALIZER */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 3: Animasi Merge Sort" slideIndex={4} />
                <ScrollReveal>
                    <FocusSection>
                        <MergeSortVisualizer />
                        <div className="mt-8 bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing Table — Merge Sort [38,27,43,3,9,82,10]</div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left font-bold">
                                    <thead className="bg-slate-100 dark:bg-slate-900 border-b-2">
                                        <tr>
                                            <th className="px-4 py-3">Fase</th>
                                            <th className="px-4 py-3">Aksi</th>
                                            <th className="px-4 py-3 text-cyan-600">Hasil</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-2 divide-primary/5">
                                        {mergeTraceData.map((row, i) => (
                                            <tr key={i}>
                                                <td className="px-4 py-3">{row.step}</td>
                                                <td className="px-4 py-3 text-slate-500">{row.action}</td>
                                                <td className="px-4 py-3 font-mono">{row.result}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 4: QUICK SORT */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 4: Quick Sort" slideIndex={6} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-rose-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-rose-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">METODE 2</span>
                                        <h4 className="text-2xl font-black text-rose-600 italic">Quick Sort</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Pilih pivot, partisi array (kiri &lt; pivot, kanan &gt; pivot), rekursif sort kedua sisi.
                                    </p>
                                    <div className="space-y-2">
                                        {QuickSortSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-rose-500/20 text-rose-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-rose-500/5 rounded-xl border border-rose-500/20">
                                        <p className="text-xs font-bold text-rose-700 dark:text-rose-300">
                                            Time: O(n log n) avg, O(n²) worst | Space: O(log n) | Stable: ❌
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><QuickSortCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 5: QUICK SORT VISUALIZER */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 5: Animasi Quick Sort" slideIndex={8} />
                <ScrollReveal>
                    <FocusSection>
                        <QuickSortVisualizer />
                        <div className="mt-8 bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing Table — Quick Sort [64,34,25,12,22,11,90]</div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left font-bold">
                                    <thead className="bg-slate-100 dark:bg-slate-900 border-b-2">
                                        <tr>
                                            <th className="px-4 py-3">Langkah</th>
                                            <th className="px-4 py-3">Partition</th>
                                            <th className="px-4 py-3 text-rose-600">Hasil</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-2 divide-primary/5">
                                        {quickTraceData.map((row, i) => (
                                            <tr key={i}>
                                                <td className="px-4 py-3">{row.step}</td>
                                                <td className="px-4 py-3 text-slate-500">{row.action}</td>
                                                <td className="px-4 py-3 font-mono">{row.result}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 6: KOMPARASI */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 6: Komparasi Performa" slideIndex={10} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 text-white">
                            <h4 className="text-xl font-black mb-6">Merge Sort vs Quick Sort</h4>
                            <div className="overflow-x-auto rounded-xl border border-white/10 mb-8">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 font-black border-b border-white/10">
                                        <tr>
                                            <th className="px-5 py-3">Aspek</th>
                                            <th className="px-5 py-3 text-cyan-400">Merge Sort</th>
                                            <th className="px-5 py-3 text-rose-400">Quick Sort</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10 font-bold italic">
                                        {[
                                            { aspect: "Best/Average Case", merge: "O(n log n)", quick: "O(n log n)" },
                                            { aspect: "Worst Case", merge: "O(n log n) — konsisten", quick: "O(n²) — pivot buruk" },
                                            { aspect: "Space Complexity", merge: "O(n) — butuh temp array", quick: "O(log n) — in-place" },
                                            { aspect: "Stability", merge: "✅ Stable", quick: "❌ Unstable" },
                                            { aspect: "Ideal Use Case", merge: "Linked list, external sort, stability", quick: "In-memory, cache-friendly, avg fast" },
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td className="px-5 py-3 text-slate-300">{row.aspect}</td>
                                                <td className="px-5 py-3 text-cyan-300">{row.merge}</td>
                                                <td className="px-5 py-3 text-rose-300">{row.quick}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-6">
                                <div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-2xl">
                                    <h6 className="font-black text-cyan-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined">thumb_up</span> Pilih Merge Sort jika...
                                    </h6>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-cyan-100/80">
                                        <li>Stabilitas urutan wajib (multi-key sort)</li>
                                        <li>Worst case harus predictable O(n log n)</li>
                                        <li>Sorting data besar di disk (external sort)</li>
                                    </ul>
                                </div>
                                <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl">
                                    <h6 className="font-black text-rose-400 mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined">thumb_up</span> Pilih Quick Sort jika...
                                    </h6>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-rose-100/80">
                                        <li>Memori terbatas (in-place sorting)</li>
                                        <li>Data acak, average case lebih penting</li>
                                        <li>Implementasi built-in Python <code className="text-rose-300">sorted()</code> menggunakan Timsort (hybrid)</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 7: UJI PEMAHAMAN */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 7: Uji Pemahaman" slideIndex={11} />
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

            {/* BAGIAN 8: PROJEK KELOMPOK */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 8: Projek Kelompok" slideIndex={12} />
                <ScrollReveal>
                    <FocusSection>
                        <div className="max-w-4xl mx-auto">
                            <ExerciseCard
                                item={{
                                    question: "Implementasi & Benchmark Kelompok:\n\nPlatform streaming musik perlu mengurutkan 100.000 lagu berdasarkan:\n1. Rating (primary)\n2. Tanggal rilis (secondary, urutan asli harus dipertahankan jika rating sama)\n\nTUGAS:\na) Pilih algoritma yang tepat dan jelaskan alasannya.\nb) Implementasi lengkap dalam Python.\nc) Analisis Time & Space Complexity.\nd) Bandingkan dengan Bubble Sort untuk n=1000 (estimasi operasi).",
                                    answer: "Merge Sort — karena Stable",
                                    explanation: "A) MERGE SORT: Stable — lagu dengan rating sama tetap urutan rilis asli.\n\nB) IMPLEMENTASI: Gunakan merge_sort() dengan key function atau sort berdasarkan tuple (rating, index).\n\nC) COMPLEXITY: Time O(n log n), Space O(n).\n\nD) PERBANDINGAN n=1000:\n- Merge Sort: ~10.000 operasi (n log n ≈ 1000 × 10)\n- Bubble Sort: ~1.000.000 operasi (n²)\nMerge Sort ~100× lebih efisien!",
                                    color: "cyan",
                                }}
                                password="psw_jawaban_Adv@"
                            />
                        </div>
                    </FocusSection>
                </ScrollReveal>
            </div>

            <PresentationMode
                slides={slides}
                isOpen={isPresentationOpen}
                initialSlide={startSlideIndex}
                onExit={() => setIsPresentationOpen(false)}
            />
        </div>
    );
}
