"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { utsQuestions } from "@/data/utsQuestions";

interface ExamResult {
    name: string;
    nim: string;
    answers: (string | number | null)[];
    score: number;
    totalPoints: number;
    timestamp: string;
}

export default function AdminUTSValidator() {
    const [tokenInput, setTokenInput] = useState("");
    const [result, setResult] = useState<ExamResult | null>(null);
    const [error, setError] = useState("");

    const handleValidate = () => {
        try {
            setError("");
            const decodedString = decodeURIComponent(escape(atob(tokenInput.trim())));
            const parsed = JSON.parse(decodedString) as ExamResult;
            
            if (!parsed.name || !parsed.nim || !Array.isArray(parsed.answers)) {
                throw new Error("Format token tidak valid");
            }
            
            setResult(parsed);
        } catch (e) {
            setError("Token tidak valid atau rusak. Pastikan Anda menyalin seluruh kode token.");
            setResult(null);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-12 pb-32">
            <header className="text-center space-y-4">
                <div className="inline-flex p-4 bg-primary/10 rounded-2xl text-primary mb-2">
                    <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">UTS Result Validator</h1>
                <p className="text-slate-500 font-medium">Tempelkan token mahasiswa di bawah ini untuk melihat hasil ujian.</p>
            </header>

            <div className="bg-white dark:bg-surface border-2 border-amber-500/20 rounded-3xl p-8 shadow-2xl space-y-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                        <span className="material-symbols-outlined text-2xl">settings_remote</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">UTS Control Center</h2>
                        <p className="text-slate-500 text-sm font-medium">Buka atau tutup akses ujian untuk seluruh mahasiswa.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-2">Admin Password</label>
                        <input 
                            type="password"
                            id="admin-pass"
                            placeholder="Masukkan password admin..."
                            className="w-full bg-slate-100 dark:bg-slate-900 border-2 border-primary/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-end gap-3">
                        <button 
                            onClick={async () => {
                                const pass = (document.getElementById('admin-pass') as HTMLInputElement).value;
                                const res = await fetch('/api/uts/config', {
                                    method: 'POST',
                                    body: JSON.stringify({ action: 'START', password: pass })
                                });
                                if (res.ok) alert("UTS BERHASIL DIBUKA!");
                                else alert("Password Salah atau Gagal!");
                            }}
                            className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black shadow-lg hover:bg-green-700 transition-all"
                        >
                            BUKA UTS
                        </button>
                        <button 
                            onClick={async () => {
                                const pass = (document.getElementById('admin-pass') as HTMLInputElement).value;
                                if (!confirm("PERINGATAN: Ini akan mereset ID Ujian. Mahasiswa yang sudah selesai akan bisa login lagi. Lanjutkan?")) return;
                                const res = await fetch('/api/uts/config', {
                                    method: 'POST',
                                    body: JSON.stringify({ action: 'RESET', password: pass })
                                });
                                if (res.ok) alert("SESI UTS BERHASIL DI-RESET!");
                                else alert("Password Salah atau Gagal!");
                            }}
                            className="flex-1 py-4 bg-slate-600 text-white rounded-2xl font-black shadow-lg hover:bg-slate-700 transition-all"
                        >
                            RESET SESI
                        </button>
                        <button 
                            onClick={async () => {
                                const pass = (document.getElementById('admin-pass') as HTMLInputElement).value;
                                const res = await fetch('/api/uts/config', {
                                    method: 'POST',
                                    body: JSON.stringify({ action: 'STOP', password: pass })
                                });
                                if (res.ok) alert("UTS BERHASIL DITUTUP!");
                                else alert("Password Salah atau Gagal!");
                            }}
                            className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg hover:bg-red-700 transition-all"
                        >
                            TUTUP UTS
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-8 shadow-2xl space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-widest text-primary ml-2">Token Mahasiswa (Validator)</label>
                    <textarea 
                        value={tokenInput}
                        onChange={(e) => setTokenInput(e.target.value)}
                        placeholder="Paste token di sini..."
                        className="w-full h-32 bg-slate-100 dark:bg-slate-900 border-2 border-primary/10 rounded-2xl px-6 py-4 text-xs font-mono text-slate-600 dark:text-slate-400 focus:border-primary outline-none transition-all resize-none"
                    />
                </div>
                <button 
                    onClick={handleValidate}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    VALIDASI HASIL <span className="material-symbols-outlined">verified</span>
                </button>
                {error && <p className="text-red-500 text-sm font-bold text-center italic">{error}</p>}
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Summary Card */}
                        <div className="bg-linear-to-br from-primary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-8 md:p-10 shadow-xl grid md:grid-cols-3 gap-8">
                            <div className="space-y-1">
                                <p className="text-xs font-black text-slate-400 uppercase">Mahasiswa</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{result.name}</p>
                                <p className="text-lg font-bold text-primary">{result.nim}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black text-slate-400 uppercase">Skor Akhir</p>
                                <p className="text-5xl font-black text-primary">{result.score}<span className="text-lg text-slate-400"> / {result.totalPoints}</span></p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black text-slate-400 uppercase">Waktu Selesai</p>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                    {new Date(result.timestamp).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
                                </p>
                            </div>
                        </div>

                        {/* Detail Table */}
                        <div className="bg-white dark:bg-surface border-2 border-primary/10 rounded-3xl overflow-hidden shadow-xl">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-100 dark:bg-slate-900/50 border-b-2 border-primary/10">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">No</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Kategori</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Jawaban MHS</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Kunci</th>
                                        <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {utsQuestions.map((q, idx) => {
                                        const mhsAnswer = result.answers[idx];
                                        const isEssay = q.type === "essay";
                                        const isCorrect = !isEssay && mhsAnswer === q.correctAnswer;
                                        
                                        return (
                                            <tr key={idx} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                                <td className="px-6 py-4 font-black text-slate-400">{idx + 1}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-bold px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300 uppercase">
                                                        {q.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 max-w-xs">
                                                    {isEssay ? (
                                                        <div className="text-sm font-medium whitespace-pre-wrap leading-relaxed italic bg-primary/5 p-3 rounded-xl border border-primary/10">
                                                            {mhsAnswer || "(Tidak ada jawaban)"}
                                                        </div>
                                                    ) : (
                                                        mhsAnswer !== null ? String.fromCharCode(65 + (mhsAnswer as number)) : "-"
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-bold text-green-600 text-sm">
                                                    {isEssay ? (
                                                        <span className="text-slate-400 italic font-medium">Cek Manual (Eksplanasi: {q.explanation})</span>
                                                    ) : (
                                                        String.fromCharCode(65 + (q.correctAnswer as number))
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {isEssay ? (
                                                        <span className="flex items-center gap-1 text-amber-500 font-black text-xs">
                                                            <span className="material-symbols-outlined text-sm">edit_note</span> ESSAY
                                                        </span>
                                                    ) : isCorrect ? (
                                                        <span className="flex items-center gap-1 text-green-500 font-black text-xs">
                                                            <span className="material-symbols-outlined text-sm">check_circle</span> BENAR
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-red-500 font-black text-xs">
                                                            <span className="material-symbols-outlined text-sm">cancel</span> SALAH
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
