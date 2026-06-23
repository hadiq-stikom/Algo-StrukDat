"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import LinearSearchVisualizer from "./LinearSearchVisualizer";
import BinarySearchVisualizer from "./BinarySearchVisualizer";
import InterpolationSearchVisualizer from "./InterpolationSearchVisualizer";
import PresentationMode from "@/components/PresentationMode";

export default function Module11Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const linearTraceData = [
        { step: "i=0", action: "Bandingkan arr[0]=4 dengan target 9", result: "4 ≠ 9 → lanjut" },
        { step: "i=1", action: "Bandingkan arr[1]=2 dengan target 9", result: "2 ≠ 9 → lanjut" },
        { step: "i=2", action: "Bandingkan arr[2]=7 dengan target 9", result: "7 ≠ 9 → lanjut" },
        { step: "i=3", action: "Bandingkan arr[3]=1 dengan target 9", result: "1 ≠ 9 → lanjut" },
        { step: "i=4", action: "Bandingkan arr[4]=9 dengan target 9", result: "9 = 9 → FOUND idx 4 ✓" },
    ];

    const binaryTraceFull = [
        { step: "Iter 1", action: "low=0, high=10, mid=5 → arr[5]=23", result: "23 vs target 38: 23 < 38" },
        { step: "Iter 2", action: "low=6, high=10, mid=8 → arr[8]=56", result: "56 > 38 → cari kiri" },
        { step: "Iter 3", action: "low=6, high=7, mid=6 → arr[6]=38", result: "38 = 38 → FOUND ✓" },
    ];

    const SearchIntroSteps = [
        { icon: "contact_page", title: "Database Lookup", desc: "Cari record user berdasarkan ID atau email.", color: "text-lime-500", bg: "bg-lime-500/10 border-lime-500/30" },
        { icon: "search", title: "Autocomplete", desc: "Saran pencarian saat mengetik di search bar.", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" },
        { icon: "inventory_2", title: "Inventory System", desc: "Cek ketersediaan produk di gudang.", color: "text-teal-500", bg: "bg-teal-500/10 border-teal-500/30" },
    ];

    const LinearSearchSteps = [
        "Mulai dari index 0 (elemen pertama)",
        "Bandingkan elemen saat ini dengan target",
        "Jika sama → ditemukan, return index",
        "Jika belum → pindah ke index berikutnya hingga habis",
    ];

    const BinarySearchSteps = [
        "Syarat: array HARUS sudah terurut (sorted)",
        "Tentukan low=0, high=n-1, hitung mid=(low+high)//2",
        "Bandingkan arr[mid] dengan target",
        "Jika target > arr[mid] → cari di kanan (low=mid+1)",
        "Jika target < arr[mid] → cari di kiri (high=mid-1)",
        "Ulangi hingga ditemukan atau low > high",
    ];

    const InterpolationSteps = [
        "Varian Binary Search untuk data terurut & distribusi merata",
        "Estimasi posisi: pos = low + ((target-arr[low])×(high-low))/(arr[high]-arr[low])",
        "Seperti mencari nama di buku telepon — langsung ke perkiraan halaman",
        "Best case O(1), average O(log log n), worst case O(n)",
    ];

    const ExerciseData = [
        {
            question: "Array terurut [2,5,8,12,16,23,38,45,56,72,91], cari 38. Berapa perbandingan Linear vs Binary Search?",
            answer: "Linear: 7 perbandingan, Binary: 3 perbandingan",
            explanation: "Linear Search: cek index 0..6 (2,5,8,12,16,23) baru ketemu 38 di index 6 = 7 langkah.\nBinary Search: mid=5(23)<38 → mid=8(56)>38 → mid=6(38)=38. Hanya 3 langkah!",
            color: "lime",
        },
        {
            question: "Apakah Binary Search bisa dipakai pada Linked List? Mengapa?",
            answer: "Tidak, karena tidak random access",
            explanation: "Binary Search butuh akses langsung ke elemen tengah (arr[mid]) dalam O(1). Linked List hanya bisa sequential access — mencapai node tengah butuh O(n). Gunakan Linear Search atau convert ke array dulu.",
            color: "emerald",
        },
        {
            question: "Kapan Interpolation Search lebih baik dari Binary Search?",
            answer: "Data terurut & distribusi uniform",
            explanation: "Interpolation Search memperkirakan posisi berdasarkan nilai. Cocok untuk data numerik merata (contoh: suhu harian, nilai ujian 0-100). Pada data tidak merata, performa bisa degradasi ke O(n).",
            color: "violet",
        },
    ];

    const ExerciseCard = ({ item, isPresentation = false, password = "" }: { item: { question: string; answer: string; explanation: string; color: string }; isPresentation?: boolean; password?: string }) => {
        const [showAnswer, setShowAnswer] = useState(false);
        const [inputPassword, setInputPassword] = useState("");
        const [error, setError] = useState(false);
        const colorClass = item.color === "lime" ? "lime" : item.color === "emerald" ? "emerald" : "violet";

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

    const LinearSearchCode = () => (
        <code>
            <span className="text-cyan-400">def</span> <span className="text-blue-400">linear_search</span>(arr, target):<br />
            &nbsp;&nbsp;<span className="text-cyan-400">for</span> i <span className="text-cyan-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">len</span>(arr)):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> arr[i] == target:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">return</span> i&nbsp;&nbsp;<span className="text-slate-500"># ditemukan</span><br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> -<span className="text-amber-300">1</span>&nbsp;&nbsp;<span className="text-slate-500"># tidak ditemukan</span>
        </code>
    );

    const BinarySearchCode = () => (
        <code>
            <span className="text-cyan-400">def</span> <span className="text-blue-400">binary_search</span>(arr, target):<br />
            &nbsp;&nbsp;low, high = <span className="text-amber-300">0</span>, <span className="text-blue-400">len</span>(arr) - <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;<span className="text-cyan-400">while</span> low &lt;= high:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;mid = (low + high) // <span className="text-amber-300">2</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> arr[mid] == target:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">return</span> mid<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">elif</span> arr[mid] &lt; target:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;low = mid + <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">else</span>:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;high = mid - <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> -<span className="text-amber-300">1</span>
        </code>
    );

    const InterpolationSearchCode = () => (
        <code>
            <span className="text-cyan-400">def</span> <span className="text-blue-400">interpolation_search</span>(arr, target):<br />
            &nbsp;&nbsp;low, high = <span className="text-amber-300">0</span>, <span className="text-blue-400">len</span>(arr) - <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;<span className="text-cyan-400">while</span> low &lt;= high <span className="text-cyan-400">and</span> arr[low] &lt;= target &lt;= arr[high]:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;pos = low + ((target - arr[low]) * (high - low)) // (arr[high] - arr[low])<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> arr[pos] == target: <span className="text-cyan-400">return</span> pos<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">elif</span> arr[pos] &lt; target: low = pos + <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">else</span>: high = pos - <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> -<span className="text-amber-300">1</span>
        </code>
    );

    const slides = [
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-lime-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-lime-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-lime-500">manage_search</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Searching Algorithms</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                &ldquo;Menemukan jarum di tumpukan jerami — dengan strategi yang tepat&rdquo;
            </p>
        </div>,

        <div key="s2" className="space-y-10">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-8">Penerapan Searching</h3>
            <div className="grid grid-cols-3 gap-6">
                {SearchIntroSteps.map((item, i) => (
                    <div key={i} className={`p-8 rounded-3xl border-4 ${item.bg} flex flex-col items-center text-center shadow-xl`}>
                        <span className={`material-symbols-outlined text-5xl ${item.color} mb-4`}>{item.icon}</span>
                        <h4 className={`font-black text-xl mb-3 ${item.color}`}>{item.title}</h4>
                        <p className="text-lg text-slate-700 dark:text-slate-200 font-bold">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>,

        <div key="s3" className="space-y-8">
            <div className="bg-lime-500/10 p-10 border-4 border-lime-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-lime-500 text-white font-black px-4 py-2 rounded-xl">METHOD 1</span>
                    <h4 className="text-5xl font-black text-lime-600 italic">Linear Search</h4>
                </div>
                <div className="space-y-4">
                    {LinearSearchSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-2xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-lime-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-xl font-bold text-lime-700">Time: O(n) | Space: O(1) | Syarat: tidak perlu terurut</p>
            </div>
        </div>,

        <div key="s4" className="space-y-6">
            <h3 className="text-3xl font-black text-center uppercase italic">Linear Search — Python</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-lime-500/20 shadow-2xl">
                <pre className="p-8 text-xl font-mono overflow-x-auto"><code className="text-slate-200"><LinearSearchCode /></code></pre>
            </div>
        </div>,

        <div key="s5" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black uppercase italic">Linear Search Visualizer</h3>
            <div className="w-full max-w-4xl p-8 rounded-3xl border-4 border-lime-500/20 shadow-2xl bg-white dark:bg-slate-950">
                <LinearSearchVisualizer />
            </div>
        </div>,

        <div key="s6" className="space-y-8">
            <div className="bg-emerald-500/10 p-10 border-4 border-emerald-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-emerald-500 text-white font-black px-4 py-2 rounded-xl">METHOD 2</span>
                    <h4 className="text-5xl font-black text-emerald-600 italic">Binary Search</h4>
                </div>
                <div className="space-y-3">
                    {BinarySearchSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-xl font-bold text-emerald-700">Time: O(log n) | Space: O(1) | Syarat: array TERURUT</p>
            </div>
        </div>,

        <div key="s7" className="space-y-6">
            <h3 className="text-3xl font-black text-center uppercase italic">Binary Search — Python</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-emerald-500/20 shadow-2xl">
                <pre className="p-8 text-xl font-mono overflow-x-auto"><code className="text-slate-200"><BinarySearchCode /></code></pre>
            </div>
        </div>,

        <div key="s8" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black uppercase italic">Binary Search Visualizer</h3>
            <div className="w-full max-w-4xl p-8 rounded-3xl border-4 border-emerald-500/20 shadow-2xl bg-white dark:bg-slate-950">
                <BinarySearchVisualizer />
            </div>
        </div>,

        <div key="s9" className="space-y-8">
            <div className="bg-violet-500/10 p-10 border-4 border-violet-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-violet-500 text-white font-black px-4 py-2 rounded-xl">BONUS</span>
                    <h4 className="text-4xl font-black text-violet-600 italic">Interpolation Search</h4>
                </div>
                <div className="space-y-3">
                    {InterpolationSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-violet-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
            </div>
        </div>,

        <div key="s10" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center uppercase italic">Perbandingan Algoritma</h3>
            <div className="overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl bg-slate-900 text-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/10 font-black">
                        <tr>
                            <th className="px-5 py-3">Aspek</th>
                            <th className="px-5 py-3 text-lime-400">Linear</th>
                            <th className="px-5 py-3 text-emerald-400">Binary</th>
                            <th className="px-5 py-3 text-violet-400">Interpolation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-bold">
                        {[
                            { a: "Time (avg)", l: "O(n)", b: "O(log n)", i: "O(log log n)*" },
                            { a: "Time (worst)", l: "O(n)", b: "O(log n)", i: "O(n)" },
                            { a: "Syarat", l: "Bebas", b: "Terurut", i: "Terurut + merata" },
                            { a: "Struktur data", l: "Array, LL, dll", b: "Random access", i: "Random access" },
                        ].map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-5 py-3 text-slate-400">{row.a}</td>
                                <td className="px-5 py-3 text-lime-300">{row.l}</td>
                                <td className="px-5 py-3 text-emerald-300">{row.b}</td>
                                <td className="px-5 py-3 text-violet-300">{row.i}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-sm text-slate-500 italic text-center">* untuk data uniformly distributed</p>
        </div>,

        <div key="s11" className="space-y-8 text-center max-w-5xl mx-auto overflow-y-auto max-h-[80vh] p-4">
            <h3 className="text-4xl font-black uppercase italic">Uji Pemahaman 🧠</h3>
            {ExerciseData.map((item, i) => (
                <ExerciseCard key={i} item={item} isPresentation={true} />
            ))}
        </div>,

        <div key="s12" className="space-y-6 text-center">
            <h3 className="text-4xl font-black uppercase italic">Tantangan Kelompok 👥</h3>
            <ExerciseCard
                item={{
                    question: "Perpustakaan digital punya 50.000 buku. Data awal tidak terurut, tapi setelah di-index berdasarkan ISBN (numerik), array ISBN terurut.\n\nTUGAS: Implementasi search buku by ISBN — kapan pakai Linear vs Binary? Benchmark untuk n=1000 dan n=50000.",
                    answer: "Linear untuk unsorted, Binary setelah sort",
                    explanation: "FASE 1 (data mentah): Linear Search O(n) — satu-satunya opsi.\nFASE 2 (setelah index/sort): Binary Search O(log n).\n\nBenchmark n=1000: Linear ~500 avg vs Binary ~10.\nn=50000: Linear ~25000 vs Binary ~16. Binary ~1500× lebih cepat!",
                    color: "lime",
                }}
                isPresentation={true}
                password="psw_jawaban_Src@"
            />
        </div>,

        <div key="s13" className="space-y-8 text-center">
            <div className="bg-emerald-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-emerald-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-emerald-500">task_alt</span>
            </div>
            <h2 className="text-5xl font-black uppercase italic">Materi Selesai!</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-bold italic">
                &ldquo;Pilih algoritma search sesuai struktur data dan apakah data sudah terurut.&rdquo;
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

            {/* BAGIAN 1 */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 1: Apa itu Searching?" slideIndex={0} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-lime-500/30 p-2 rounded-lg text-lime-500">
                                    <span className="material-symbols-outlined text-xl">manage_search</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Mencari Data di Koleksi</h3>
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                Searching adalah proses menemukan elemen tertentu (target) di dalam struktur data.
                                Efisiensinya sangat bergantung pada <strong>ukuran data</strong>, <strong>apakah data terurut</strong>, dan <strong>tipe struktur data</strong> (array, linked list, tree, dll).
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                {SearchIntroSteps.map((item, i) => (
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

            {/* BAGIAN 2: LINEAR SEARCH */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 2: Linear Search" slideIndex={2} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-lime-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-lime-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-lime-500 text-white text-xs font-black px-3 py-1 rounded-lg">METODE 1</span>
                                        <h4 className="text-2xl font-black text-lime-600 italic">Linear Search</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Sequential search — periksa setiap elemen dari awal hingga akhir. Paling sederhana, works on any data.
                                    </p>
                                    <div className="space-y-2">
                                        {LinearSearchSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-lime-500/20 text-lime-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-lime-500/5 rounded-xl border border-lime-500/20">
                                        <p className="text-xs font-bold text-lime-700 dark:text-lime-300">Time: O(n) | Space: O(1) | Data: tidak perlu terurut</p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><LinearSearchCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 3: LINEAR VISUALIZER */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 3: Animasi Linear Search" slideIndex={4} />
                <ScrollReveal>
                    <FocusSection>
                        <LinearSearchVisualizer />
                        <div className="mt-8 bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing — Linear Search, target=9, array [4,2,7,1,9,3,8]</div>
                            <table className="w-full text-sm font-bold">
                                <thead className="bg-slate-100 dark:bg-slate-900 border-b-2">
                                    <tr>
                                        <th className="px-4 py-3">Langkah</th>
                                        <th className="px-4 py-3">Aksi</th>
                                        <th className="px-4 py-3 text-lime-600">Hasil</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-primary/5">
                                    {linearTraceData.map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-3">{row.step}</td>
                                            <td className="px-4 py-3 text-slate-500">{row.action}</td>
                                            <td className="px-4 py-3 font-mono">{row.result}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 4: BINARY SEARCH */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 4: Binary Search" slideIndex={5} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-emerald-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-emerald-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-lg">METODE 2</span>
                                        <h4 className="text-2xl font-black text-emerald-600 italic">Binary Search</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Divide & conquer — eliminasi setengah ruang pencarian setiap iterasi. Wajib pada data terurut!
                                    </p>
                                    <div className="space-y-2">
                                        {BinarySearchSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-emerald-500/20 text-emerald-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-amber-500/10 rounded-xl border border-amber-500/30">
                                        <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                                            ⚠️ Prasyarat: data harus di-sort terlebih dahulu (Modul 3 & 10)!
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><BinarySearchCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 5: BINARY VISUALIZER */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 5: Animasi Binary Search" slideIndex={7} />
                <ScrollReveal>
                    <FocusSection>
                        <BinarySearchVisualizer />
                        <div className="mt-8 bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing — Binary Search, target=38</div>
                            <table className="w-full text-sm font-bold">
                                <thead className="bg-slate-100 dark:bg-slate-900 border-b-2">
                                    <tr>
                                        <th className="px-4 py-3">Iterasi</th>
                                        <th className="px-4 py-3">low / mid / high</th>
                                        <th className="px-4 py-3 text-emerald-600">Hasil</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-primary/5">
                                    {binaryTraceFull.map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-3">{row.step}</td>
                                            <td className="px-4 py-3 text-slate-500">{row.action}</td>
                                            <td className="px-4 py-3 font-mono">{row.result}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                                Untuk n=11 elemen: Linear Search butuh hingga 7 perbandingan, Binary Search hanya 3 — perbedaan makin besar seiring n bertambah (log₂ 1.000.000 ≈ 20).
                            </p>
                        </div>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 6: INTERPOLATION SEARCH (BONUS) */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 6: Interpolation Search (Bonus)" slideIndex={8} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm mb-8">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-violet-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-violet-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-violet-500 text-white text-xs font-black px-3 py-1 rounded-lg">BONUS</span>
                                        <h4 className="text-2xl font-black text-violet-600 italic">Interpolation Search</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Perbaikan Binary Search untuk data numerik terdistribusi merata — estimasi posisi langsung.
                                    </p>
                                    <div className="space-y-2">
                                        {InterpolationSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-violet-500/20 text-violet-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><InterpolationSearchCode /></pre>
                                </div>
                            </div>
                        </section>
                        <InterpolationSearchVisualizer />
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 7: KOMPARASI */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 7: Komparasi Algoritma" slideIndex={9} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 text-white">
                            <h4 className="text-xl font-black mb-6">Linear vs Binary vs Interpolation</h4>
                            <div className="overflow-x-auto rounded-xl border border-white/10 mb-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 font-black border-b border-white/10">
                                        <tr>
                                            <th className="px-5 py-3">Aspek</th>
                                            <th className="px-5 py-3 text-lime-400">Linear Search</th>
                                            <th className="px-5 py-3 text-emerald-400">Binary Search</th>
                                            <th className="px-5 py-3 text-violet-400">Interpolation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10 font-bold italic">
                                        {[
                                            { a: "Best Case", l: "O(1) — target di awal", b: "O(1) — target di mid", i: "O(1) — estimasi tepat" },
                                            { a: "Average Case", l: "O(n)", b: "O(log n)", i: "O(log log n)*" },
                                            { a: "Worst Case", l: "O(n)", b: "O(log n)", i: "O(n)" },
                                            { a: "Prasyarat", l: "Tidak ada", b: "Array terurut", i: "Terurut + uniform" },
                                            { a: "Linked List?", l: "✅ Ya", b: "❌ Tidak (no random access)", i: "❌ Tidak" },
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td className="px-5 py-3 text-slate-300">{row.a}</td>
                                                <td className="px-5 py-3 text-lime-300">{row.l}</td>
                                                <td className="px-5 py-3 text-emerald-300">{row.b}</td>
                                                <td className="px-5 py-3 text-violet-300">{row.i}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-slate-400 italic mb-6">* Interpolation Search optimal untuk data uniformly distributed</p>
                            <div className="grid lg:grid-cols-3 gap-4">
                                <div className="bg-lime-500/10 border border-lime-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-lime-400 mb-2">Linear Search</h6>
                                    <ul className="text-xs text-lime-100/80 space-y-1 list-disc list-inside">
                                        <li>Data kecil (n &lt; 100)</li>
                                        <li>Data tidak terurut</li>
                                        <li>Linked List / struktur sequential</li>
                                    </ul>
                                </div>
                                <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-emerald-400 mb-2">Binary Search</h6>
                                    <ul className="text-xs text-emerald-100/80 space-y-1 list-disc list-inside">
                                        <li>Data besar & terurut</li>
                                        <li>Random access (array)</li>
                                        <li>Pencarian berulang (index/cache)</li>
                                    </ul>
                                </div>
                                <div className="bg-violet-500/10 border border-violet-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-violet-400 mb-2">Interpolation Search</h6>
                                    <ul className="text-xs text-violet-100/80 space-y-1 list-disc list-inside">
                                        <li>Data numerik merata</li>
                                        <li>Contoh: suhu, IP address range</li>
                                        <li>Nilai tambah di luar kurikulum wajib</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 8: UJI PEMAHAMAN */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 8: Uji Pemahaman" slideIndex={10} />
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

            {/* BAGIAN 9: PROJEK */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 9: Projek Kelompok" slideIndex={11} />
                <ScrollReveal>
                    <FocusSection>
                        <div className="max-w-4xl mx-auto">
                            <ExerciseCard
                                item={{
                                    question: "Sistem absensi kampus menyimpan 10.000 NIM mahasiswa.\n\na) Data awal tidak terurut — algoritma apa?\nb) Setelah di-sort, cari NIM — algoritma apa?\nc) Implementasi Python untuk kedua skenario.\nd) Hitung estimasi operasi untuk n=10.000 (Linear avg vs Binary).",
                                    answer: "a) Linear, b) Binary Search",
                                    explanation: "A) LINEAR: data unsorted, satu-satunya opsi tanpa preprocessing.\nB) BINARY: setelah sort, O(log n) ≈ 14 operasi vs Linear avg 5000.\nC) IMPLEMENTASI: linear_search() + binary_search() dari materi.\nD) n=10000: Linear ~5000 avg, Binary ~14 max. Binary ~350× lebih cepat!",
                                    color: "lime",
                                }}
                                password="psw_jawaban_Src@"
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
