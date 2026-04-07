"use client";

import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import FocusSection from '@/components/FocusSection';
import BigOVisualizer from './BigOVisualizer';
import PresentationMode from '@/components/PresentationMode';

export default function Module2Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const slides = [
        // Slide 1: Urgensi & Analogi
        <div key="s1" className="space-y-8">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-amber-500/30 p-2 rounded-lg text-amber-500">
                    <span className="material-symbols-outlined text-2xl">speed</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Kenapa Efisiensi Penting?</h3>
            </div>
            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <span className="material-symbols-outlined text-8xl">local_shipping</span>
                </div>
                <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-8 font-medium italic text-center">
                    "Bayangkan mengirim 1 Terabyte data..."
                </p>
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                    <div className="p-6 bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl">
                        <h4 className="font-black text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2 text-xl">
                            <span className="material-symbols-outlined">cloud_upload</span>
                            Internet
                        </h4>
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-bold">
                            Waktu sebanding dengan N (Ukuran File).
                        </p>
                    </div>
                    <div className="p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl">
                        <h4 className="font-black text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2 text-xl">
                            <span className="material-symbols-outlined">directions_bike</span>
                            Kurir
                        </h4>
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-bold">
                            Waktu Konstan (Tetap).
                        </p>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 2: Big O Comparison Table
        <div key="s2" className="space-y-8">
            <h4 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-8">Data 1 Terabyte: Siapa Menang?</h4>
            <div className="overflow-hidden rounded-3xl border-4 border-primary/20 shadow-2xl bg-white dark:bg-surface">
                <table className="w-full text-xl text-left">
                    <thead className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 uppercase font-black tracking-tighter">
                        <tr>
                            <th className="px-8 py-6">Data (N)</th>
                            <th className="px-8 py-6">Internet O(n)</th>
                            <th className="px-8 py-6">Kurir O(1)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-4 divide-primary/5 font-bold">
                        <tr>
                            <td className="px-8 py-6 font-mono">1 Megabyte</td>
                            <td className="px-8 py-6 text-blue-600">2 Detik</td>
                            <td className="px-8 py-6 text-emerald-600">1 Jam</td>
                        </tr>
                        <tr>
                            <td className="px-8 py-6 font-mono">1 Gigabyte</td>
                            <td className="px-8 py-6 text-blue-600">30 Menit</td>
                            <td className="px-8 py-6 text-emerald-600">1 Jam</td>
                        </tr>
                        <tr className="bg-primary/10">
                            <td className="px-8 py-6 font-black text-slate-900 dark:text-white">1 Terabyte</td>
                            <td className="px-8 py-6 text-red-600 font-black">20 Hari (!)</td>
                            <td className="px-8 py-6 text-emerald-600 font-black">1 Jam ✅</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>,

        // Slide 3: Complexity Chart
        <div key="s3" className="space-y-8">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <span className="material-symbols-outlined text-2xl">show_chart</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Big O Complexity Chart</h3>
            </div>
            <div className="bg-white dark:bg-surface border-4 border-primary/20 rounded-3xl p-10 shadow-2xl">
                <div className="relative h-80 w-full border-l-4 border-b-4 border-slate-400 dark:border-slate-500 mb-8">
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                        <line x1="0" y1="90%" x2="100%" y2="90%" stroke="#10b981" strokeWidth="4" />
                        <path d="M 0 250 Q 50 200, 700 180" fill="none" stroke="#06b6d4" strokeWidth="4" />
                        <line x1="0" y1="100%" x2="100%" y2="0%" stroke="#3b82f6" strokeWidth="4" />
                        <path d="M 0 320 Q 20 200, 150 0" fill="none" stroke="#ef4444" strokeWidth="4" />
                        <text x="100%" y="85%" className="text-sm fill-emerald-500 font-black" textAnchor="end">O(1)</text>
                        <text x="100%" y="70%" className="text-sm fill-cyan-500 font-black" textAnchor="end">O(log n)</text>
                        <text x="100%" y="10%" className="text-sm fill-blue-500 font-black" textAnchor="end">O(n)</text>
                        <text x="20%" y="10%" className="text-sm fill-red-500 font-black">O(n²)</text>
                    </svg>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-slate-600 font-black uppercase tracking-widest">
                        Data (N) →
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 pt-4">
                    <div className="flex items-center justify-center gap-2 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-black text-emerald-600">O(1)</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                        <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                        <span className="text-sm font-black text-cyan-600">O(log n)</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-black text-blue-600">O(n)</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 p-3 bg-red-500/10 rounded-xl border border-red-500/30">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-black text-red-600">O(n²)</span>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 4: O(1) Constant
        <div key="s4" className="space-y-8">
            <div className="bg-emerald-500/10 p-10 border-4 border-emerald-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-emerald-500 text-white font-black px-4 py-2 rounded-xl shadow-lg">EXCELLENT</span>
                    <h4 className="text-5xl font-black text-emerald-600 italic">O(1)</h4>
                </div>
                <h5 className="font-black text-3xl text-slate-900 dark:text-white mb-6 uppercase">Constant Time</h5>
                <p className="text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-10">
                    Waktu eksekusi <strong className="text-emerald-500 underline decoration-4 underline-offset-8">TETAP</strong> berapapun jumlah datanya.
                </p>
                <div className="bg-slate-900 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                    <div className="bg-slate-800 px-6 py-4 flex justify-between border-b border-white/5">
                        <span className="text-sm text-slate-300 font-mono font-black italic">def get_item(list): return list[0]</span>
                    </div>
                    <div className="p-10 flex justify-center items-center gap-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`w-16 h-16 rounded-2xl border-4 flex items-center justify-center text-2xl font-black ${i === 1 ? 'bg-emerald-500 border-emerald-400 text-white scale-125 z-10 shadow-2xl' : 'bg-surface border-white/5 text-slate-600'}`}>
                                {i}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>,

        // Slide 5: O(log n) Logarithmic
        <div key="s5" className="space-y-8">
            <div className="bg-cyan-500/10 p-10 border-4 border-cyan-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-cyan-500 text-white font-black px-4 py-2 rounded-xl shadow-lg">GOOD</span>
                    <h4 className="text-5xl font-black text-cyan-600 italic">O(log n)</h4>
                </div>
                <h5 className="font-black text-3xl text-slate-900 dark:text-white mb-6 uppercase">Logarithmic Time</h5>
                <p className="text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-10">
                    Membuang <strong className="text-cyan-500">SETENGAH</strong> data di setiap langkah.
                </p>
                <div className="flex flex-wrap justify-center gap-4 font-mono">
                    {[1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1].map((n, i) => (
                        <div key={n} className="flex items-center gap-3">
                            <span className={`text-2xl font-black ${i === 0 ? 'text-primary' : 'text-slate-400'}`}>{n}</span>
                            {n !== 1 && <span className="material-symbols-outlined text-slate-600">arrow_forward</span>}
                        </div>
                    ))}
                </div>
                <p className="text-center mt-10 text-xl font-black text-primary italic">"Hanya 10 langkah untuk 1024 data!"</p>
            </div>
        </div>,

        // Slide 6: O(n) Linear
        <div key="s6" className="space-y-8">
            <div className="bg-blue-500/10 p-10 border-4 border-blue-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-blue-500 text-white font-black px-4 py-2 rounded-xl shadow-lg">FAIR</span>
                    <h4 className="text-5xl font-black text-blue-600 italic">O(n)</h4>
                </div>
                <h5 className="font-black text-3xl text-slate-900 dark:text-white mb-6 uppercase">Linear Time</h5>
                <p className="text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-10">
                    Waktu <strong className="text-blue-500 underline decoration-4">SEBANDING</strong> dengan jumlah data.
                </p>
                <div className="flex flex-col gap-3 font-mono">
                    <div className="h-6 bg-blue-500 w-[20%] rounded-full shadow-lg"></div>
                    <div className="h-6 bg-blue-500 w-[40%] rounded-full shadow-lg"></div>
                    <div className="h-6 bg-blue-500 w-[60%] rounded-full shadow-lg"></div>
                    <div className="h-6 bg-blue-500 w-[80%] rounded-full shadow-lg"></div>
                    <div className="h-6 bg-blue-500 w-full rounded-full shadow-lg"></div>
                </div>
            </div>
        </div>,

        // Slide 7: O(n^2) Quadratic
        <div key="s7" className="space-y-8">
            <div className="bg-red-500/10 p-10 border-4 border-red-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-red-500 text-white font-black px-4 py-2 rounded-xl shadow-lg">HORRIBLE</span>
                    <h4 className="text-5xl font-black text-red-600 italic">O(n²)</h4>
                </div>
                <h5 className="font-black text-3xl text-slate-900 dark:text-white mb-6 uppercase">Quadratic Time</h5>
                <p className="text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-10">
                    <strong className="text-red-500 uppercase tracking-widest text-3xl">Berbahaya!</strong> Data bertambah sedikit, waktu MELEDAK.
                </p>
                <div className="grid grid-cols-5 gap-2 w-48 mx-auto">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-red-500 rounded-lg shadow-lg border-2 border-red-400/30"></div>
                    ))}
                </div>
                <p className="text-center mt-10 text-2xl font-black text-red-500">N=5 → 25 Langkah!</p>
            </div>
        </div>,

        // Slide 8: Best vs Worst Case
        <div key="s8" className="space-y-8">
            <h3 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-8">Batas Performa (Scenario)</h3>
            <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-8 rounded-3xl bg-emerald-500/10 border-4 border-emerald-500/30 text-center shadow-xl">
                    <div className="text-emerald-600 font-black text-5xl mb-4 italic">Ω</div>
                    <div className="text-xl font-black text-slate-700 dark:text-slate-200 uppercase mb-4 tracking-tighter">Best Case</div>
                    <p className="text-lg text-slate-600 font-medium italic">"Beruntung"</p>
                </div>
                <div className="p-8 rounded-3xl bg-amber-500/10 border-4 border-amber-500/30 text-center shadow-xl scale-110 z-10">
                    <div className="text-amber-600 font-black text-5xl mb-4 italic">θ</div>
                    <div className="text-xl font-black text-slate-700 dark:text-slate-200 uppercase mb-4 tracking-tighter">Average Case</div>
                    <p className="text-lg text-slate-600 font-medium italic">"Dunia Nyata"</p>
                </div>
                <div className="p-8 rounded-3xl bg-red-500/10 border-4 border-red-500/30 text-center shadow-xl">
                    <div className="text-red-600 font-black text-5xl mb-4 italic">O</div>
                    <div className="text-xl font-black text-slate-700 dark:text-slate-200 uppercase mb-4 tracking-tighter">Worst Case</div>
                    <p className="text-lg text-slate-900 dark:text-white font-black italic uppercase">Batas Atas ✅</p>
                </div>
            </div>
            <p className="text-center text-xl font-black text-primary mt-10 italic">
                "Big O memberikan JAMINAN KEAMANAN bagi Engineer."
            </p>
        </div>,

        // Slide 9: Big O Visualizer
        <div key="s9" className="space-y-8 h-full flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <span className="material-symbols-outlined text-2xl">science</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Interactive Visualizer</h3>
            </div>
            <div className="w-full max-w-4xl bg-white dark:bg-slate-950 p-8 rounded-3xl border-2 border-primary/20 shadow-2xl">
                <BigOVisualizer />
            </div>
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

            {/* --- BAGIAN 1: URGENSI EFISIENSI --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 1: Urgensi &amp; Analogi</span>
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
                            <button
                                onClick={() => openPresentation(0)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20 z-10"
                                title="Presentasikan bagian ini"
                            >
                                <span className="material-symbols-outlined text-sm">slideshow</span>
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-amber-500/30 p-2 rounded-lg text-amber-500">
                                    <span className="material-symbols-outlined text-xl">speed</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Kenapa "Bisa Jalan" Saja Tidak Cukup?</h3>
                            </div>

                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <span className="material-symbols-outlined text-8xl">local_shipping</span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    Bayangkan Anda ingin mengirimkan file 1 Terabyte ke teman di seberang kota. Anda punya dua pilihan:
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 relative z-10">
                                    <div className="p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl">
                                        <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">cloud_upload</span>
                                            Opsi A: Kirim via Internet
                                        </h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Waktu pengiriman sangat bergantung pada ukuran file. Semakin besar file, semakin lama waktu yang dibutuhkan.
                                            <br /><span className="inline-block mt-2 font-bold text-slate-900 dark:text-white">(Waktu sebanding dengan N)</span>
                                        </p>
                                    </div>
                                    <div className="p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl">
                                        <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">directions_bike</span>
                                            Opsi B: Kirim via Kurir (Harddisk)
                                        </h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Waktu tempuh kurir tetap sama, mau file 1GB atau 1TB. Kurir hanya peduli jarak tempuh.
                                            <br /><span className="inline-block mt-2 font-bold text-slate-900 dark:text-white">(Waktu Konstan)</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 overflow-hidden rounded-xl border-2 border-slate-300 dark:border-slate-700">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 uppercase font-black tracking-tighter">
                                            <tr>
                                                <th className="px-4 py-3">Ukuran Data (N)</th>
                                                <th className="px-4 py-3">Opsi A (Internet - O(n))</th>
                                                <th className="px-4 py-3">Opsi B (Kurir - O(1))</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-slate-200 dark:divide-slate-700 font-bold">
                                            <tr>
                                                <td className="px-4 py-3 font-mono">1 Megabyte</td>
                                                <td className="px-4 py-3 text-blue-600">2 Detik</td>
                                                <td className="px-4 py-3 text-emerald-600">1 Jam</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-mono">1 Gigabyte</td>
                                                <td className="px-4 py-3 text-blue-600">30 Menit</td>
                                                <td className="px-4 py-3 text-emerald-600">1 Jam</td>
                                            </tr>
                                            <tr className="bg-primary/10">
                                                <td className="px-4 py-3 font-black text-slate-900 dark:text-white">1 Terabyte</td>
                                                <td className="px-4 py-3 text-red-600 font-black">20 Hari (!)</td>
                                                <td className="px-4 py-3 text-emerald-600 font-black">1 Jam (Menang!)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* --- BAGIAN 2: VISUALISASI PERTUMBUHAN --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 2: Kurva Pertumbuhan Big O</span>
                                <button
                                    onClick={() => openPresentation(2)}
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
                            <button
                                onClick={() => openPresentation(2)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-primary/10 text-primary rounded-lg transition-all hover:bg-primary/20 z-10"
                            >
                                <span className="material-symbols-outlined text-sm">slideshow</span>
                            </button>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 text-lg">
                                    <span className="material-symbols-outlined text-primary">show_chart</span>
                                    The Big O Complexity Chart
                                </h4>

                                <div className="relative h-64 w-full border-l-2 border-b-2 border-slate-400 dark:border-slate-500 mb-4">
                                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                        <line x1="0" y1="90%" x2="100%" y2="90%" stroke="#10b981" strokeWidth="3" />
                                        <path d="M 0 250 Q 50 200, 400 180" fill="none" stroke="#06b6d4" strokeWidth="3" />
                                        <line x1="0" y1="100%" x2="100%" y2="0%" stroke="#3b82f6" strokeWidth="3" />
                                        <path d="M 0 256 Q 20 200, 100 0" fill="none" stroke="#ef4444" strokeWidth="3" />
                                        <text x="100%" y="85%" className="text-[12px] fill-emerald-500 font-bold" textAnchor="end">O(1)</text>
                                        <text x="100%" y="70%" className="text-[12px] fill-cyan-500 font-bold" textAnchor="end">O(log n)</text>
                                        <text x="100%" y="10%" className="text-[12px] fill-blue-500 font-bold" textAnchor="end">O(n)</text>
                                        <text x="25%" y="10%" className="text-[12px] fill-red-500 font-bold">O(n²)</text>
                                    </svg>
                                </div>
                                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
                                    <div className="flex items-center gap-2 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                        <span className="text-xs font-black text-emerald-600 uppercase">Amazing</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
                                        <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                                        <span className="text-xs font-black text-cyan-600 uppercase">Good</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-blue-500/5 rounded-lg border border-blue-500/20">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="text-xs font-black text-blue-600 uppercase">Fair</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-red-500/5 rounded-lg border border-red-500/20">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-xs font-black text-red-600 uppercase">Horrible</span>
                                    </div>
                                </div>

                                <div className="pt-10 border-t-2 border-slate-100 dark:border-slate-800">
                                    <BigOVisualizer />
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* --- BAGIAN 3: KATALOG KOMPLEKSITAS --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 3: Katalog Kompleksitas</span>
                                <button
                                    onClick={() => openPresentation(3)}
                                    className="p-1 px-3 text-[10px] font-black bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1 border border-primary/20"
                                >
                                    <span className="material-symbols-outlined text-xs">slideshow</span> Slide
                                </button>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid gap-8">
                    {/* O(1) */}
                    <ScrollReveal>
                        <FocusSection>
                            <section className="relative group bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <button onClick={() => openPresentation(3)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-primary z-10"><span className="material-symbols-outlined text-sm">slideshow</span></button>
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-emerald-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-emerald-500/20">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-lg">EXCELLENT</span>
                                            <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 italic">O(1)</h4>
                                        </div>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Waktu eksekusi TIDAK peduli berapa banyak datanya.
                                        </p>
                                    </div>
                                    <div className="md:w-2/3 p-6 bg-slate-900 font-mono text-sm">
                                        <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                                            <span className="text-cyan-400">def</span> <span className="text-blue-400">get_first</span>(items): <span className="text-cyan-400">return</span> items[<span className="text-amber-300">0</span>]
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </FocusSection>
                    </ScrollReveal>

                    {/* O(log n) */}
                    <ScrollReveal>
                        <FocusSection>
                            <section className="relative group bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <button onClick={() => openPresentation(4)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-primary z-10"><span className="material-symbols-outlined text-sm">slideshow</span></button>
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-cyan-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-cyan-500/20">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-cyan-500 text-white text-xs font-black px-3 py-1 rounded-lg">GOOD</span>
                                            <h4 className="text-2xl font-black text-cyan-600 dark:text-cyan-400 italic">O(log n)</h4>
                                        </div>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Setiap langkah membuang SETENGAH dari sisa data.
                                        </p>
                                    </div>
                                    <div className="md:w-2/3 p-6 bg-slate-900 font-mono text-sm">
                                        <div className="flex flex-wrap gap-2 text-primary font-black">
                                            {[1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1].map((n, i) => (
                                                <span key={n} className={i > 2 ? 'opacity-40' : ''}>{n} {n > 1 ? '→' : ''}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </FocusSection>
                    </ScrollReveal>

                    {/* O(n) */}
                    <ScrollReveal>
                        <FocusSection>
                            <section className="relative group bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <button onClick={() => openPresentation(5)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-primary z-10"><span className="material-symbols-outlined text-sm">slideshow</span></button>
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-blue-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-blue-500/20">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-lg">FAIR</span>
                                            <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400 italic">O(n)</h4>
                                        </div>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Waktu eksekusi sebanding dengan jumlah data.
                                        </p>
                                    </div>
                                    <div className="md:w-2/3 p-6 bg-slate-900 font-mono text-sm leading-relaxed">
                                        <code><span className="text-cyan-400">for</span> x <span className="text-cyan-400">in</span> items: <span className="text-blue-400">print</span>(x)</code>
                                    </div>
                                </div>
                            </section>
                        </FocusSection>
                    </ScrollReveal>

                    {/* O(n^2) */}
                    <ScrollReveal>
                        <FocusSection>
                            <section className="relative group bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                                <button onClick={() => openPresentation(6)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-primary z-10"><span className="material-symbols-outlined text-sm">slideshow</span></button>
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 bg-red-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-red-500/20">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-lg">HORRIBLE</span>
                                            <h4 className="text-2xl font-black text-red-600 dark:text-red-400 italic">O(n²)</h4>
                                        </div>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                            Data bertambah sedikit, waktu meledak (Nested Loop).
                                        </p>
                                    </div>
                                    <div className="md:w-2/3 p-6 bg-slate-900 font-mono text-sm leading-relaxed">
                                        <code><span className="text-cyan-400">for</span> x <span className="text-cyan-400">in</span> d: <span className="text-cyan-400">for</span> y <span className="text-cyan-400">in</span> d: <span className="text-blue-400">print</span>(x,y)</code>
                                    </div>
                                </div>
                            </section>
                        </FocusSection>
                    </ScrollReveal>
                </div>
            </div>

            {/* --- BAGIAN 4: SCENARIO --- */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-bg-base px-6 flex items-center gap-3 border-x-2 border-primary/40">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Bagian 4: Best vs Worst Case</span>
                                <button
                                    onClick={() => openPresentation(7)}
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
                        <section className="relative group bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-8 shadow-sm">
                            <button onClick={() => openPresentation(7)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-primary z-10"><span className="material-symbols-outlined text-sm">slideshow</span></button>
                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6">Scenario Performa</h4>
                            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                <div className="p-4 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30 text-center">
                                    <div className="text-emerald-600 font-black text-xl italic mb-1">Ω Omega</div>
                                    <p className="text-xs font-bold text-slate-600 uppercase">Best Case</p>
                                </div>
                                <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/30 text-center">
                                    <div className="text-amber-600 font-black text-xl italic mb-1">θ Theta</div>
                                    <p className="text-xs font-bold text-slate-600 uppercase">Average Case</p>
                                </div>
                                <div className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/30 text-center ring-2 ring-red-500/40">
                                    <div className="text-red-600 font-black text-xl italic mb-1">O Big O</div>
                                    <p className="text-xs font-black text-red-600 uppercase italic">Worst Case ✅</p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* Presentation Overlay */}
            <PresentationMode
                slides={slides}
                initialSlide={startSlideIndex}
                onExit={() => setIsPresentationOpen(false)}
                isOpen={isPresentationOpen}
            />
        </div>
    );
}
