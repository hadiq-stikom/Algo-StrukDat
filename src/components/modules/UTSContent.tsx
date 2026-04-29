"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question, utsQuestions } from "@/data/utsQuestions";
import { students } from "@/data/students";
import ScrollReveal from "@/components/ScrollReveal";

interface ExamResult {
    name: string;
    nim: string;
    answers: (string | number | null)[];
    score: number;
    totalPoints: number;
    timestamp: string;
}

export default function UTSContent() {
    const [step, setStep] = useState<"welcome" | "waiting" | "exam" | "finish" | "already-completed">("welcome");
    const [studentInfo, setStudentInfo] = useState({ name: "", nim: "" });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(string | number | null)[]>(new Array(utsQuestions.length).fill(null));
    const [token, setToken] = useState("");
    const [finalScore, setFinalScore] = useState(0);
    const [error, setError] = useState("");
    
    // Global Exam Config
    const [config, setConfig] = useState<{ isActive: boolean; startTime: number | null; durationMinutes: number; examId: string }>({
        isActive: false,
        startTime: null,
        durationMinutes: 75,
        examId: "initial"
    });
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isDosen, setIsDosen] = useState(false);
    const [cheatWarnings, setCheatWarnings] = useState(0);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [lastExamId, setLastExamId] = useState<string | null>(null);

    // Polling Exam Config
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch("/api/uts/config");
                const data = await res.json();
                setConfig(data);
            } catch (e) {
                console.error("Failed to fetch exam config");
            }
        };

        fetchConfig();
        const interval = setInterval(fetchConfig, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    // Sync lastExamId
    useEffect(() => {
        if (config.examId !== "initial" && lastExamId === null) {
            setLastExamId(config.examId);
        }
    }, [config.examId, lastExamId]);

    // Auto-populate name from NIM
    useEffect(() => {
        const cleanNim = studentInfo.nim.replace(/\D/g, "");
        if (cleanNim.length >= 8) { 
            const student = students.find(s => s.nim.replace(/\D/g, "") === cleanNim);
            if (student) {
                setStudentInfo(prev => ({ ...prev, name: student.name }));
                setError("");
            } else if (cleanNim === "1111111111") {
                setStudentInfo(prev => ({ ...prev, name: "DOSEN" }));
                setError("");
            } else {
                setStudentInfo(prev => ({ ...prev, name: "" }));
            }
        } else {
            setStudentInfo(prev => ({ ...prev, name: "" }));
        }
    }, [studentInfo.nim]);

    // Global Timer Logic
    useEffect(() => {
        if (!config.isActive || !config.startTime || step === "finish" || isDosen) {
            setTimeLeft(null);
            return;
        }

        const tick = () => {
            const now = Date.now();
            const elapsed = now - config.startTime!;
            const totalDuration = config.durationMinutes * 60 * 1000;
            const remaining = Math.max(0, totalDuration - elapsed);
            
            setTimeLeft(Math.floor(remaining / 1000));

            if (remaining <= 0 && step === "exam") {
                handleFinish();
            }
        };

        tick();
        const timerId = setInterval(tick, 1000);
        return () => clearInterval(timerId);
    }, [config, step, isDosen]);

    // Admin Force Close / Reset Logic
    useEffect(() => {
        if (isDosen) return;

        // 1. Handle RESET (examId changed)
        if (config.examId !== "initial" && lastExamId !== null && config.examId !== lastExamId) {
            setStep("welcome");
            setError("Ujian telah ditutup atau di-reset oleh dosen.");
            setLastExamId(config.examId);
            return;
        }

        // 2. Handle STOP (isActive false but startTime exists)
        if (!config.isActive && config.startTime !== null) {
            if (step === "exam") {
                handleFinish();
            } else if (step === "waiting") {
                setStep("welcome");
                setError("Ujian telah ditutup atau di-reset oleh dosen.");
            }
        }
    }, [config, step, isDosen, lastExamId]);

    // Persistence logic
    useEffect(() => {
        // Only run when config (examId) is loaded
        if (config.examId === "initial") return;

        const isCompleted = localStorage.getItem(`uts_completed_${config.examId}`);
        if (isCompleted && !isDosen) {
            setStep("already-completed");
        }
    }, [isDosen, config.examId]);

    // Anti-Cheat Listeners
    useEffect(() => {
        if (step !== "exam" || isDosen) return;

        const handleCheatAttempt = () => {
            setCheatWarnings(prev => prev + 1);
            setIsWarningOpen(true);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleCheatAttempt();
            }
        };

        const handleBlur = () => {
            handleCheatAttempt();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Block F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+J
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
                (e.ctrlKey && (e.key === "u" || e.key === "s" || e.key === "p" || e.key === "c" || e.key === "v"))
            ) {
                e.preventDefault();
                return false;
            }
        };

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        window.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("contextmenu", handleContextMenu);

        return () => {
            window.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [step, isDosen]);

    const handleStart = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const rawNim = formData.get("nim")?.toString() || "";
        const rawName = formData.get("name")?.toString() || "";

        const inputNim = rawNim.replace(/\D/g, ""); // Ambil hanya angka untuk NIM
        const inputName = rawName.trim().toLowerCase();

        console.log("Attempting Login:", { inputNim, inputName });

        // Check if Exam is CLOSED (Not active but has a start time)
        if (!config.isActive && config.startTime !== null && inputNim !== "1111111111") {
            setError("Ujian telah ditutup atau di-reset oleh dosen.");
            return;
        }

        // Check for Dosen God Mode
        if (inputNim === "1111111111" && inputName === "dosen") {
            setIsDosen(true);
            setStep("exam");
            return;
        }

        // Whitelist Validation - Super Lenient
        const student = students.find(s => {
            const cleanTargetNim = s.nim.toString().replace(/\D/g, "");
            return cleanTargetNim === inputNim;
        });
        
        if (!student) {
            setError(`NIM "${rawNim}" tidak terdaftar. Pastikan hanya memasukkan angka.`);
            return;
        }

        const normalizedStudentName = student.name.trim().toLowerCase();
        const nameMatch = normalizedStudentName.includes(inputName) || 
                          inputName.includes(normalizedStudentName);
        
        if (!nameMatch) {
            setError(`Nama tidak sesuai dengan NIM ${rawNim}. Gunakan nama sesuai KRS.`);
            return;
        }

        // Update state after validation
        setStudentInfo({ name: rawName, nim: rawNim });
        setStep("waiting");
    };

    const handleAnswer = (answer: string | number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answer;
        setAnswers(newAnswers);
    };

    const calculateScore = () => {
        let score = 0;
        utsQuestions.forEach((q, idx) => {
            if (q.type === "essay") return; // Essay is manual grading
            if (answers[idx] === q.correctAnswer) {
                score += q.points;
            }
        });
        return score;
    };

    const handleFinish = () => {
        const score = calculateScore();
        const totalPoints = utsQuestions.reduce((acc, q) => acc + q.points, 0);
        const result: ExamResult = {
            ...studentInfo,
            answers,
            score,
            totalPoints,
            timestamp: new Date().toISOString()
        };

        // Obfuscate result into a token
        const resultString = JSON.stringify(result);
        const encodedToken = btoa(unescape(encodeURIComponent(resultString)));
        
        setFinalScore(score);
        setToken(encodedToken);
        setStep("finish");
        
        // Lock the exam for this user in this session
        localStorage.setItem(`uts_completed_${config.examId}`, "true");
        localStorage.removeItem("uts_progress");
    };

    const currentQuestion = utsQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / utsQuestions.length) * 100;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
            <AnimatePresence mode="wait">
                {step === "waiting" && (
                    <motion.div
                        key="waiting"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8"
                    >
                        <div className="relative inline-flex mb-4">
                            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                        <div className="relative p-8 bg-primary/10 rounded-full text-primary">
                                {config.isActive ? (
                                    <span className="material-symbols-outlined text-7xl animate-bounce text-green-500">task_alt</span>
                                ) : (
                                    <span className="material-symbols-outlined text-7xl animate-pulse">hourglass_empty</span>
                                )}
                            </div>
                        </div>

                        {config.isActive ? (
                            <h2 className="text-4xl font-black text-green-600 dark:text-green-400 uppercase tracking-tight">
                                Ujian Sudah Tersedia!
                            </h2>
                        ) : (
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                Menunggu Dosen
                            </h2>
                        )}

                        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium max-w-md mx-auto">
                            {config.isActive 
                                ? 'Dosen telah mengaktifkan ujian. Silakan klik tombol di bawah untuk mulai mengerjakan.' 
                                : 'Identitas Anda telah terverifikasi. Harap tunggu instruksi dosen untuk memulai ujian secara serentak.'}
                        </p>

                        {isDosen && (
                            <div className="p-4 bg-amber-500/10 border-2 border-amber-500/20 rounded-2xl">
                                <p className="text-amber-600 font-bold text-sm mb-2">Akses Dosen Terdeteksi</p>
                                <button 
                                    onClick={() => setStep("exam")}
                                    className="px-6 py-2 bg-amber-500 text-white rounded-xl font-black text-xs"
                                >
                                    PAKSA MASUK KE SOAL (BYPASS)
                                </button>
                            </div>
                        )}
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-primary/10">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Status Ujian</p>
                            <p className={`text-xl font-black ${config.isActive ? 'text-green-500' : 'text-amber-500 animate-pulse'}`}>
                                {config.isActive ? 'UJIAN TELAH DIBUKA!' : 'BELUM DIMULAI'}
                            </p>
                        </div>
                        {config.isActive && (
                            <button 
                                onClick={() => setStep("exam")}
                                className="w-full px-10 py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:scale-105 transition-all animate-bounce"
                            >
                                MULAI MENGERJAKAN SEKARANG
                            </button>
                        )}
                        <p className="text-slate-400 text-xs italic">Halaman ini akan otomatis diperbarui saat dosen membuka ujian.</p>
                    </motion.div>
                )}

                {step === "already-completed" && (
                    <motion.div
                        key="already-completed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-surface border-2 border-amber-500/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8"
                    >
                        <div className="inline-flex p-8 bg-amber-500/10 rounded-full text-amber-500 mb-4">
                            <span className="material-symbols-outlined text-7xl">history_edu</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Ujian Selesai</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium max-w-md mx-auto">
                            Sistem mendeteksi bahwa Anda sudah menyelesaikan ujian ini sebelumnya di perangkat ini.
                        </p>
                        <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-2xl border border-amber-500/20 text-amber-700 dark:text-amber-400 font-bold italic text-sm">
                            Jika Anda belum sempat menyalin token hasil ujian, silakan hubungi dosen pengampu untuk instruksi lebih lanjut.
                        </div>
                        <button 
                            onClick={() => window.location.href = "/"}
                            className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                        >
                            KEMBALI KE BERANDA
                        </button>
                    </motion.div>
                )}

                {step === "welcome" && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8"
                    >
                        <div className="inline-flex p-6 bg-primary/10 rounded-full text-primary mb-4">
                            <span className="material-symbols-outlined text-6xl">school</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                            Ujian Tengah Semester
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto font-medium">
                            Selamat datang di portal UTS Algoritma & Struktur Data. Silakan isi identitas Anda untuk memulai ujian.
                        </p>
                        
                        <form onSubmit={handleStart} className="max-w-md mx-auto space-y-6 text-left">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-sm font-bold flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-lg">error</span>
                                    {error}
                                </motion.div>
                            )}
                            <div className="space-y-2 group">
                                <label className="text-sm font-black uppercase tracking-widest text-primary ml-2 flex items-center gap-2">
                                    NIM 
                                    {studentInfo.nim.replace(/\D/g, "").length >= 8 && students.some(s => s.nim.replace(/\D/g, "") === studentInfo.nim.replace(/\D/g, "")) && (
                                        <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full animate-bounce">Terverifikasi</span>
                                    )}
                                </label>
                                <input 
                                    required
                                    name="nim"
                                    type="text" 
                                    placeholder="Masukkan NIM Anda"
                                    value={studentInfo.nim}
                                    onChange={(e) => setStudentInfo({...studentInfo, nim: e.target.value})}
                                    className="w-full bg-slate-100 dark:bg-slate-900 border-2 border-primary/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase tracking-widest text-primary ml-2">Nama Lengkap</label>
                                <input 
                                    required
                                    name="name"
                                    type="text" 
                                    placeholder="Nama akan muncul otomatis"
                                    value={studentInfo.name}
                                    onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
                                    className={`w-full bg-slate-100 dark:bg-slate-900 border-2 border-primary/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-bold focus:border-primary outline-none transition-all ${studentInfo.name ? 'border-green-500/30' : ''}`}
                                />
                                {studentInfo.name && (
                                    <p className="text-[10px] text-slate-400 italic ml-2">* Nama muncul otomatis berdasarkan database KRS.</p>
                                )}
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                MULAI UJIAN <span className="material-symbols-outlined">rocket_launch</span>
                            </button>
                        </form>
                        
                        <div className="pt-8 border-t border-primary/10 flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                                <span className="material-symbols-outlined text-sm">warning</span>
                                <span>Peringatan: Jawaban tidak dapat diubah setelah ujian selesai.</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === "exam" && (
                    <motion.div
                        key="exam"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8 select-none"
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {/* Progress Header */}
                        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-lg flex items-center justify-between gap-6 sticky top-4 z-50">
                            <div className="flex flex-col gap-1 flex-1">
                                <div className="flex justify-between text-sm font-black uppercase tracking-tighter text-slate-500 mb-1">
                                    <span>PROGRESS</span>
                                    <span>{currentQuestionIndex + 1} / {utsQuestions.length}</span>
                                </div>
                                <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                            
                            {/* Global Timer UI */}
                            <div className={`px-6 py-3 rounded-xl border-2 flex items-center gap-3 transition-all ${
                                (timeLeft ?? 0) < 300 ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse' : 'bg-primary/5 border-primary/20 text-primary'
                            }`}>
                                <span className="material-symbols-outlined font-black">timer</span>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase leading-none opacity-60">Sisa Waktu</p>
                                    <p className="text-xl font-black font-mono leading-tight">
                                        {isDosen ? "∞" : timeLeft !== null ? `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}` : "--:--"}
                                    </p>
                                </div>
                            </div>

                            <div className="hidden lg:block text-right border-l-2 border-slate-100 dark:border-slate-800 pl-6">
                                <p className="text-xs font-black text-slate-400 uppercase">Peserta</p>
                                <p className="text-sm font-bold text-primary truncate max-w-[150px]">{studentInfo.name}</p>
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="bg-white dark:bg-surface border-2 border-primary/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <span className="material-symbols-outlined text-9xl">quiz</span>
                            </div>

                            <div className="space-y-8 relative">
                                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                                    {currentQuestion.category}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight whitespace-pre-wrap">
                                    {currentQuestion.question}
                                </h2>

                                <div className="mt-12">
                                    {currentQuestion.type === "essay" ? (
                                        <div className="space-y-4">
                                            <textarea
                                                value={(answers[currentQuestionIndex] as string) || ""}
                                                onChange={(e) => handleAnswer(e.target.value)}
                                                placeholder="Ketik jawaban Anda di sini secara mendalam..."
                                                className="w-full min-h-[200px] p-6 bg-slate-50 dark:bg-slate-900/50 border-2 border-primary/20 rounded-2xl text-slate-700 dark:text-slate-300 focus:border-primary outline-none transition-all resize-none font-medium leading-relaxed"
                                            />
                                            <p className="text-xs text-slate-400 italic">
                                                * Jawaban essay akan dinilai secara manual oleh dosen. Pastikan penjelasan Anda lengkap dan jelas.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {currentQuestion.options?.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswer(idx)}
                                                    className={`group text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                                                        answers[currentQuestionIndex] === idx
                                                            ? "bg-primary text-white border-primary shadow-lg scale-[1.02]"
                                                            : "bg-slate-50 dark:bg-slate-900/50 border-primary/10 hover:border-primary/40 text-slate-700 dark:text-slate-300"
                                                    }`}
                                                >
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg transition-colors ${
                                                        answers[currentQuestionIndex] === idx
                                                            ? "bg-white/20 text-white"
                                                            : "bg-primary/10 text-primary group-hover:bg-primary/20"
                                                    }`}>
                                                        {String.fromCharCode(65 + idx)}
                                                    </div>
                                                    <span className="text-lg font-medium">{option}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                disabled={currentQuestionIndex === 0}
                                onClick={() => setCurrentQuestionIndex(v => v - 1)}
                                className="flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-all"
                            >
                                <span className="material-symbols-outlined">arrow_back</span> SEBELUMNYA
                            </button>

                            {currentQuestionIndex === utsQuestions.length - 1 ? (
                                <button
                                    onClick={handleFinish}
                                    className="flex items-center gap-2 px-10 py-4 bg-green-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-600/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    SELESAI & KIRIM <span className="material-symbols-outlined">send</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestionIndex(v => v + 1)}
                                    className="flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    BERIKUTNYA <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}

                {step === "finish" && (
                    <motion.div
                        key="finish"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-10"
                    >
                        <div className="bg-white dark:bg-surface border-2 border-green-500/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8">
                            <div className="inline-flex p-8 bg-green-500/10 rounded-full text-green-500 mb-4 animate-bounce">
                                <span className="material-symbols-outlined text-7xl">verified</span>
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Ujian Berhasil Dikirim!</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                                Luar biasa, <strong className="text-primary">{studentInfo.name}</strong>! Anda telah menyelesaikan UTS.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 text-left">
                                <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-2xl border-2 border-primary/5">
                                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Skor Anda</p>
                                    <p className="text-5xl font-black text-primary">{finalScore}<span className="text-lg text-slate-400 font-bold ml-2">/ 100</span></p>
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-2xl border-2 border-primary/5">
                                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Status</p>
                                    <p className="text-3xl font-black text-green-600 uppercase tracking-tighter">TERVERIFIKASI</p>
                                </div>
                            </div>
                        </div>

                        {/* Submission Token Section */}
                        <div className="bg-primary/5 border-4 border-dashed border-primary/30 rounded-3xl p-8 md:p-12 space-y-6">
                            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                                <div className="space-y-2 text-center md:text-left">
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Token Pengumpulan</h3>
                                    <p className="text-slate-500 font-medium">Salin kode di bawah ini dan kumpulkan di Google Classroom / LMS Anda.</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(token);
                                        alert("Token berhasil disalin!");
                                    }}
                                    className="px-8 py-4 bg-primary text-white rounded-xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                                >
                                    <span className="material-symbols-outlined">content_copy</span> SALIN TOKEN
                                </button>
                            </div>
                            
                            <div className="bg-slate-900 p-6 rounded-xl border border-white/10 overflow-hidden">
                                <code className="text-primary text-xs break-all opacity-70 font-mono">
                                    {token}
                                </code>
                            </div>
                        </div>

                        <div className="text-center">
                            <button 
                                onClick={() => window.location.href = "/"}
                                className="text-slate-500 font-black uppercase text-sm hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto"
                            >
                                <span className="material-symbols-outlined text-sm">home</span> KEMBALI KE HOME
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Anti-Cheat Warning Modal */}
            <AnimatePresence>
                {isWarningOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white dark:bg-surface border-4 border-red-500 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl"
                        >
                            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                                <span className="material-symbols-outlined text-6xl animate-pulse">warning</span>
                            </div>
                            
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase italic">Aktivitas Mencurigakan!</h2>
                            <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
                                Sistem mendeteksi Anda mencoba meninggalkan halaman ujian atau melakukan tindakan yang dilarang.
                                Aktivitas ini telah dicatat oleh sistem.
                            </p>

                            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border-2 border-red-500/20 mb-8">
                                <p className="text-sm font-black text-red-500 uppercase tracking-widest mb-1">Jumlah Pelanggaran</p>
                                <p className="text-4xl font-black text-red-600">{cheatWarnings}</p>
                            </div>

                            <button
                                onClick={() => setIsWarningOpen(false)}
                                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-lg hover:bg-red-700 transition-colors shadow-xl shadow-red-600/20"
                            >
                                SAYA MENGERTI & KEMBALI BEKERJA
                            </button>
                            
                            <p className="mt-4 text-xs text-slate-400 italic">
                                Tetaplah berada di halaman ini hingga ujian selesai.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
