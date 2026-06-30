"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import HashTableVisualizer from "./HashTableVisualizer";
import PresentationMode from "@/components/PresentationMode";

export default function Module12Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const hashTraceData = [
        { step: "hash(42)", action: "42 % 10 = 2", result: "Bucket[2] kosong \u2192 INSERT 42 \u2713" },
        { step: "hash(15)", action: "15 % 10 = 5", result: "Bucket[5] kosong \u2192 INSERT 15 \u2713" },
        { step: "hash(77)", action: "77 % 10 = 7", result: "Bucket[7] kosong \u2192 INSERT 77 \u2713" },
        { step: "hash(25)", action: "25 % 10 = 5", result: "COLLISION di [5]! Probe [6] kosong \u2192 INSERT 25 \u2713" },
        { step: "hash(35)", action: "35 % 10 = 5", result: "Collision [5][6][7][8] \u2192 Probe [9] kosong \u2192 INSERT 35 \u2713" },
    ];

    const hashIntroSteps = [
        { icon: "dictionary", title: "Kamus / Dictionary", desc: "Pemetaan kata \u2192 definisi dengan akses O(1).", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30" },
        { icon: "database", title: "Database Indexing", desc: "Cari record berdasarkan key (ID) tanpa scan seluruh tabel.", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/30" },
        { icon: "cached", title: "Cache / Memoization", desc: "Simpan hasil komputasi dengan key \u2192 value lookup cepat.", color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30" },
    ];

    const hashFunctionSteps = [
        "Fungsi hash: key \u2192 integer dalam rentang tertentu",
        "Division method: hash(key) = key % table_size",
        "Hash harus deterministic (key sama \u2192 hash sama)",
        "Distribusi merata untuk minimalkan collision",
        "Table size sebaiknya bilangan prima untuk distribusi lebih baik",
    ];

    const collisionSteps = [
        "Collision: dua key berbeda menghasilkan hash index yang sama",
        "Linear Probing: cari bucket kosong berikutnya (i+1, i+2, ...)",
        "Separate Chaining: setiap bucket menyimpan linked list",
        "Quadratic Probing: probe dengan pola i+1\u00b2, i+2\u00b2, i+3\u00b2, ...",
        "Double Hashing: probe step ditentukan hash function kedua",
    ];

    const ExerciseData = [
        {
            question: "Array [null, null, 42, null, null, 15, null, 77, 88, null].\nInsert key=25. Tunjukkan langkah-langkah yang terjadi!",
            answer: "hash=5 \u2192 collision di [5] \u2192 probe [6] kosong \u2192 insert",
            explanation: "hash(25) = 25%10 = 5.\nBucket[5]=15 (collision!) \u2192 probe ke bucket[6]=null \u2192 insert 25 di [6].\nTotal: 1 collision + 1 probe = 2 langkah.",
            color: "yellow",
        },
        {
            question: "Mengapa hash table memiliki rata-rata O(1) sementara worst case O(n)?",
            answer: "Hash ideal O(1), collision berantai \u2192 O(n)",
            explanation: "RATA-RATA O(1): fungsi hash mendistribusikan key secara merata sehingga setiap bucket hanya berisi 0-1 item.\nWORST O(n): semua key collides ke satu index (misal semua key genap dengan table size genap). Maka terbentuk linear chain sepanjang n.\nSolusi: pilih hash function yang baik + load factor terjaga.",
            color: "amber",
        },
        {
            question: "Apa perbedaan Linear Probing dengan Separate Chaining? Kapan memilih masing-masing?",
            answer: "Linear Probing in-place; Chaining pakai LL",
            explanation: "LINEAR PROBING: simpan di bucket berikutnya yang kosong. Cepat untuk cache locality, tapi rawan clustering (data mengelompok).\nSEPARATE CHAINING: setiap bucket adalah linked list. Lebih tahan collision, performa lebih stabil, tapi butuh memori ekstra untuk pointer.\nPilih Linear Probing jika load factor rendah (< 0.5). Pilih Chaining jika data tidak terprediksi.",
            color: "orange",
        },
    ];

    const ExerciseCard = ({ item, isPresentation = false, password = "" }: { item: { question: string; answer: string; explanation: string; color: string }; isPresentation?: boolean; password?: string }) => {
        const [showAnswer, setShowAnswer] = useState(false);
        const [inputPassword, setInputPassword] = useState("");
        const [error, setError] = useState(false);
        const colorClass = item.color === "yellow" ? "yellow" : item.color === "amber" ? "amber" : "orange";

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

    const HashFunctionCode = () => (
        <code>
            <span className="text-cyan-400">def</span> <span className="text-blue-400">hash_function</span>(key, table_size):<br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> key % table_size&nbsp;&nbsp;<span className="text-slate-500"># Division method</span><br />
            <br />
            <span className="text-cyan-400">def</span> <span className="text-blue-400">insert</span>(table, key, value):<br />
            &nbsp;&nbsp;idx = <span className="text-blue-400">hash_function</span>(key, <span className="text-blue-400">len</span>(table))<br />
            &nbsp;&nbsp;<span className="text-cyan-400">while</span> table[idx] <span className="text-cyan-400">is not</span> <span className="text-cyan-400">None</span>:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;idx = (idx + <span className="text-amber-300">1</span>) % <span className="text-blue-400">len</span>(table)&nbsp;&nbsp;<span className="text-slate-500"># Linear probe</span><br />
            &nbsp;&nbsp;table[idx] = (key, value)<br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> table
        </code>
    );

    const ChainingCode = () => (
        <code>
            <span className="text-cyan-400">class</span> <span className="text-blue-400">HashTableChaining</span>:<br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-cyan-400">self</span>, size):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.table = [[] <span className="text-cyan-400">for</span> _ <span className="text-cyan-400">in</span> <span className="text-blue-400">range</span>(size)]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.size = size<br />
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">_hash</span>(<span className="text-cyan-400">self</span>, key):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">return</span> key % <span className="text-cyan-400">self</span>.size<br />
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">insert</span>(<span className="text-cyan-400">self</span>, key, value):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;idx = <span className="text-cyan-400">self</span>._hash(key)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.table[idx].append((key, value))
        </code>
    );

    const slides = [
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-yellow-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-yellow-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-yellow-500">grid_view</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Hash Table</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                &ldquo;Dari key ke value dalam sekejap \u2014 kekuatan hashing&rdquo;
            </p>
        </div>,

        <div key="s2" className="space-y-10">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-8">Penerapan Hash Table</h3>
            <div className="grid grid-cols-3 gap-6">
                {hashIntroSteps.map((item, i) => (
                    <div key={i} className={`p-8 rounded-3xl border-4 ${item.bg} flex flex-col items-center text-center shadow-xl`}>
                        <span className={`material-symbols-outlined text-5xl ${item.color} mb-4`}>{item.icon}</span>
                        <h4 className={`font-black text-xl mb-3 ${item.color}`}>{item.title}</h4>
                        <p className="text-lg text-slate-700 dark:text-slate-200 font-bold">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>,

        <div key="s3" className="space-y-8">
            <div className="bg-yellow-500/10 p-10 border-4 border-yellow-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-yellow-500 text-white font-black px-4 py-2 rounded-xl">KONSEP 1</span>
                    <h4 className="text-5xl font-black text-yellow-600 italic">Hash Function</h4>
                </div>
                <div className="space-y-4">
                    {hashFunctionSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-2xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-xl font-bold text-yellow-700">hash(key) = key mod table_size | Ideal: O(1) lookup</p>
            </div>
        </div>,

        <div key="s4" className="space-y-6">
            <h3 className="text-3xl font-black text-center uppercase italic">Hash Function \u2014 Python</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-yellow-500/20 shadow-2xl">
                <pre className="p-8 text-xl font-mono overflow-x-auto"><code className="text-slate-200"><HashFunctionCode /></code></pre>
            </div>
        </div>,

        <div key="s5" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black uppercase italic">Hash Table Visualizer</h3>
            <div className="w-full max-w-4xl p-8 rounded-3xl border-4 border-yellow-500/20 shadow-2xl bg-white dark:bg-slate-950">
                <HashTableVisualizer />
            </div>
        </div>,

        <div key="s6" className="space-y-8">
            <div className="bg-amber-500/10 p-10 border-4 border-amber-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-amber-500 text-white font-black px-4 py-2 rounded-xl">KONSEP 2</span>
                    <h4 className="text-5xl font-black text-amber-600 italic">Collision Resolution</h4>
                </div>
                <div className="space-y-3">
                    {collisionSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-xl font-bold text-amber-700">Collision wajar terjadi \u2014 yang penting adalah strategi resolusi!</p>
            </div>
        </div>,

        <div key="s7" className="space-y-6">
            <h3 className="text-3xl font-black text-center uppercase italic">Separate Chaining \u2014 Python</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-amber-500/20 shadow-2xl">
                <pre className="p-8 text-xl font-mono overflow-x-auto"><code className="text-slate-200"><ChainingCode /></code></pre>
            </div>
        </div>,

        <div key="s8" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center uppercase italic">Perbandingan Collision Strategy</h3>
            <div className="overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl bg-slate-900 text-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/10 font-black">
                        <tr>
                            <th className="px-5 py-3">Aspek</th>
                            <th className="px-5 py-3 text-yellow-400">Linear Probing</th>
                            <th className="px-5 py-3 text-amber-400">Separate Chaining</th>
                            <th className="px-5 py-3 text-orange-400">Quadratic Probing</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-bold">
                        {[
                            { a: "Memory", l: "In-place (array)", b: "Ekstra (pointer)", i: "In-place" },
                            { a: "Cache perf", l: "Baik (sequential)", b: "Kurang (linked)", i: "Cukup" },
                            { a: "Clustering", l: "Rawan primary", b: "Tidak ada", i: "Rawan secondary" },
                            { a: "Load factor", l: "Ideal < 0.5", b: "Bisa > 1", i: "Ideal < 0.5" },
                            { a: "Delete", l: "Rumit (tombstone)", b: "Mudah", i: "Rumit" },
                        ].map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-5 py-3 text-slate-400">{row.a}</td>
                                <td className="px-5 py-3 text-yellow-300">{row.l}</td>
                                <td className="px-5 py-3 text-amber-300">{row.b}</td>
                                <td className="px-5 py-3 text-orange-300">{row.i}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,

        <div key="s9" className="space-y-8">
            <div className="bg-orange-500/10 p-10 border-4 border-orange-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-orange-500 text-white font-black px-4 py-2 rounded-xl">KONSEP 3</span>
                    <h4 className="text-4xl font-black text-orange-600 italic">Load Factor &amp; Rehashing</h4>
                </div>
                <div className="space-y-4 text-xl text-slate-700 dark:text-slate-200 font-bold">
                    <div className="flex items-center gap-4">
                        <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">1</span>
                        Load Factor = n / m (n item, m bucket)
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">2</span>
                        Semakin tinggi load factor \u2192 semakin banyak collision
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">3</span>
                        Rehash: buat tabel baru lebih besar, insert ulang semua item
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">4</span>
                        Threshold rehash tipikal: load factor &gt; 0.75
                    </div>
                </div>
                <p className="mt-6 text-xl font-bold text-orange-700">Load factor ideal &lt; 0.75 untuk performa O(1) stabil</p>
            </div>
        </div>,

        <div key="s10" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center uppercase italic">Kompleksitas Hash Table</h3>
            <div className="overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl bg-slate-900 text-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/10 font-black">
                        <tr>
                            <th className="px-5 py-3">Operasi</th>
                            <th className="px-5 py-3 text-emerald-400">Average</th>
                            <th className="px-5 py-3 text-red-400">Worst Case</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-bold">
                        {[
                            { a: "Insert", avg: "O(1)", worst: "O(n)" },
                            { a: "Search", avg: "O(1)", worst: "O(n)" },
                            { a: "Delete", avg: "O(1)", worst: "O(n)" },
                            { a: "Space", avg: "O(n)", worst: "O(n)" },
                        ].map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-5 py-3 text-slate-400">{row.a}</td>
                                <td className="px-5 py-3 text-emerald-300">{row.avg}</td>
                                <td className="px-5 py-3 text-red-300">{row.worst}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-sm text-slate-500 italic text-center">* Hash table dengan fungsi hash baik & load factor terjaga \u2192 O(1) nyata</p>
        </div>,

        <div key="s11" className="space-y-8 text-center max-w-5xl mx-auto overflow-y-auto max-h-[80vh] p-4">
            <h3 className="text-4xl font-black uppercase italic">Uji Pemahaman</h3>
            <div className="flex justify-center items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-3xl text-yellow-500">psychology</span>
            </div>
            {ExerciseData.map((item, i) => (
                <ExerciseCard key={i} item={item} isPresentation={true} />
            ))}
        </div>,

        <div key="s12" className="space-y-6 text-center">
            <h3 className="text-4xl font-black uppercase italic">Tantangan Kelompok</h3>
            <div className="flex justify-center items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-3xl text-primary">groups</span>
            </div>
            <ExerciseCard
                item={{
                    question: "Sistem e-commerce memiliki 100.000 produk dengan kode unik (integer). Perlu fitur: \n1) Cari produk by kode dalam O(1)\n2) Update stok produk\n3) Tampilkan semua produk kategori tertentu\n\nTUGAS: Rancang hash table untuk sistem ini. Jelaskan:\na) Ukuran tabel & hash function\nb) Strategi collision\nc) Load factor & kapan rehash\nd) Implementasi search & update O(1)",
                    answer: "Implementasi hash table dengan chaining",
                    explanation: "A) TABLE SIZE: 150.000 (load factor ~0.67). Hash = key % 150.000.\nB) CHAINING: setiap bucket adalah list \u2014 lebih aman untuk load factor > 0.5.\nC) REHASH: jika load factor > 0.75 \u2192 gandakan ukuran (300.000) \u2192 rehash semua item.\nD) SEARCH: hash(key) \u2192 bucket \u2192 cari linear di chain \u2192 O(1) avg.\nUPDATE: search + modify \u2192 waktu sama dengan search.",
                    color: "yellow",
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
                &ldquo;Hash Table: struktur data paling praktis untuk lookup O(1). Kuasai hashing, kuasai pencarian!&rdquo;
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

            <div className="space-y-10">
                <SectionDivider title="Bagian 1: Apa itu Hash Table?" slideIndex={0} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-yellow-500/30 p-2 rounded-lg text-yellow-500">
                                    <span className="material-symbols-outlined text-xl">grid_view</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Memetakan Key ke Value</h3>
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                Hash Table adalah struktur data yang menyimpan data dalam <strong>pasangan key-value</strong>.
                                Setiap key dikonversi menjadi index array menggunakan <strong>fungsi hash</strong>,
                                memungkinkan akses data dalam waktu <strong>rata-rata O(1)</strong> \u2014 konstan, tidak peduli seberapa besar data!
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                {hashIntroSteps.map((item, i) => (
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

            <div className="space-y-10">
                <SectionDivider title="Bagian 2: Hash Function" slideIndex={2} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-yellow-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-yellow-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-yellow-500 text-white text-xs font-black px-3 py-1 rounded-lg">KONSEP 1</span>
                                        <h4 className="text-2xl font-black text-yellow-600 italic">Hash Function</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Fungsi yang mengubah key (apapun tipenya) menjadi integer index dalam array bucket.
                                    </p>
                                    <div className="space-y-2">
                                        {hashFunctionSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-yellow-500/20 text-yellow-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/20">
                                        <p className="text-xs font-bold text-yellow-700 dark:text-yellow-300">hash(key) = key mod size | O(1) average lookup</p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><HashFunctionCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            <div className="space-y-10">
                <SectionDivider title="Bagian 3: Animasi Hash Table" slideIndex={4} />
                <ScrollReveal>
                    <FocusSection>
                        <HashTableVisualizer />
                        <div className="mt-8 bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing \u2014 Insert dengan Collision Handling</div>
                            <table className="w-full text-sm font-bold">
                                <thead className="bg-slate-100 dark:bg-slate-900 border-b-2">
                                    <tr>
                                        <th className="px-4 py-3">Hash</th>
                                        <th className="px-4 py-3">Aksi</th>
                                        <th className="px-4 py-3 text-yellow-600">Hasil</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-primary/5">
                                    {hashTraceData.map((row, i) => (
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

            <div className="space-y-10">
                <SectionDivider title="Bagian 4: Collision Handling" slideIndex={5} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm mb-8">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-amber-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-amber-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-lg">KONSEP 2</span>
                                        <h4 className="text-2xl font-black text-amber-600 italic">Collision Resolution</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Collision terjadi saat dua key memiliki hash yang sama. Tanpa strategi resolusi, data akan hilang!
                                    </p>
                                    <div className="space-y-2">
                                        {collisionSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-amber-500/20 text-amber-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-amber-500/5 rounded-xl border border-amber-500/20">
                                        <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                                            &#9888;&#65039; Tanpa collision handling, data dengan hash sama akan overwrite!
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><ChainingCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            <div className="space-y-10">
                <SectionDivider title="Bagian 5: Load Factor & Rehashing" slideIndex={8} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-orange-500/30 p-2 rounded-lg text-orange-500">
                                    <span className="material-symbols-outlined text-xl">speed</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Menjaga Performa Hash Table</h3>
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                <strong>Load Factor</strong> = jumlah item / jumlah bucket. Semakin tinggi load factor, semakin sering collision terjadi.
                                Jika load factor melebihi threshold (biasanya 0.75), kita perlu <strong>rehashing</strong> \u2014 membuat tabel baru yang lebih besar
                                dan memasukkan ulang semua data.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                    <h4 className="font-black text-emerald-600 mb-2">Load Factor Rendah (&lt; 0.5)</h4>
                                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside font-medium">
                                        <li>Collision sangat jarang</li>
                                        <li>Performa O(1) optimal</li>
                                        <li>Boros memori (bucket banyak kosong)</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                    <h4 className="font-black text-amber-600 mb-2">Load Factor Ideal (0.5 \u2013 0.75)</h4>
                                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside font-medium">
                                        <li>Keseimbangan memori & performa</li>
                                        <li>Collision terkendali</li>
                                        <li>Standar implementasi (Java, Python)</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <h4 className="font-black text-red-600 mb-2">Load Factor Tinggi (&gt; 0.75)</h4>
                                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside font-medium">
                                        <li>Collision sering terjadi</li>
                                        <li>Performa degradasi ke O(n)</li>
                                        <li>Segera lakukan rehashing!</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            <div className="space-y-10">
                <SectionDivider title="Bagian 6: Komparasi & Kompleksitas" slideIndex={9} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 text-white">
                            <h4 className="text-xl font-black mb-6">Hash Table vs Struktur Data Lain</h4>
                            <div className="overflow-x-auto rounded-xl border border-white/10 mb-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 font-black border-b border-white/10">
                                        <tr>
                                            <th className="px-5 py-3">Operasi</th>
                                            <th className="px-5 py-3 text-yellow-400">Hash Table</th>
                                            <th className="px-5 py-3 text-sky-400">Array (sorted)</th>
                                            <th className="px-5 py-3 text-emerald-400">BST</th>
                                            <th className="px-5 py-3 text-red-400">Linked List</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10 font-bold italic">
                                        {[
                                            { a: "Search", ht: "O(1) avg", arr: "O(log n)", bst: "O(log n)", ll: "O(n)" },
                                            { a: "Insert", ht: "O(1) avg", arr: "O(n)", bst: "O(log n)", ll: "O(1)" },
                                            { a: "Delete", ht: "O(1) avg", arr: "O(n)", bst: "O(log n)", ll: "O(n)" },
                                            { a: "Ordered", ht: "Tidak", arr: "Ya", bst: "Ya", ll: "Tidak" },
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td className="px-5 py-3 text-slate-300">{row.a}</td>
                                                <td className="px-5 py-3 text-yellow-300">{row.ht}</td>
                                                <td className="px-5 py-3 text-sky-300">{row.arr}</td>
                                                <td className="px-5 py-3 text-emerald-300">{row.bst}</td>
                                                <td className="px-5 py-3 text-red-300">{row.ll}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-slate-400 italic mb-6">* Hash Table unggul untuk lookup by key \u2014 tidak ada struktur data lain yang bisa O(1) average!</p>
                            <div className="grid lg:grid-cols-3 gap-4">
                                <div className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-yellow-400 mb-2">Kapan Pakai Hash Table</h6>
                                    <ul className="text-xs text-yellow-100/80 space-y-1 list-disc list-inside">
                                        <li>Dictionary / map / cache</li>
                                        <li>Lookup by key (ID, username)</li>
                                        <li>Duplicate detection</li>
                                        <li>Counting frequencies</li>
                                    </ul>
                                </div>
                                <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-emerald-400 mb-2">Kapan Pakai BST/Array</h6>
                                    <ul className="text-xs text-emerald-100/80 space-y-1 list-disc list-inside">
                                        <li>Butuh data terurut (range query)</li>
                                        <li>Min/max operations</li>
                                        <li>Traversal inorder</li>
                                        <li>Data statis (pakai array)</li>
                                    </ul>
                                </div>
                                <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-red-400 mb-2">Kelemahan Hash Table</h6>
                                    <ul className="text-xs text-red-100/80 space-y-1 list-disc list-inside">
                                        <li>Tidak ada urutan/order</li>
                                        <li>Worst case O(n)</li>
                                        <li>Boros memori (bucket kosong)</li>
                                        <li>Hash function quality matters</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            <div className="space-y-10">
                <SectionDivider title="Bagian 7: Uji Pemahaman" slideIndex={10} />
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

            <div className="space-y-10">
                <SectionDivider title="Bagian 8: Projek Kelompok" slideIndex={11} />
                <ScrollReveal>
                    <FocusSection>
                        <div className="max-w-4xl mx-auto">
                            <ExerciseCard
                                item={{
                                    question: "Sistem inventaris toko: 50.000 item dengan kode barang (integer 6 digit).\n\na) Rancang hash table dengan ukuran dan hash function yang tepat.\nb) Implementasi insert, search, dan delete.\nc) Jelaskan dampak load factor terhadap performa.\nd) Kapan perlu rehash? Berapa kapasitas baru?",
                                    answer: "Hash table dengan linear probing + rehash",
                                    explanation: "A) SIZE: 70.000 (load factor ~0.71). Hash = kode % 70.000.\nB) INSERT: hash \u2192 linear probe jika collision.\n   SEARCH: hash \u2192 probe sampai ketemu atau null.\n   DELETE: pakai tombstone (mark deleted).\nC) Load factor 0.71 \u2192 collision ~50% saat insert, search masih O(1).\nD) REHASH saat load factor > 0.75 \u2192 gandakan ke 140.000 \u2192 rehash O(n).",
                                    color: "yellow",
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
