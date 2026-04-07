"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StackItem {
    id: number;
    value: string | number;
}

export default function StackVisualizer() {
    const [stack, setStack] = useState<StackItem[]>([
        { id: 1, value: 10 },
        { id: 2, value: 20 }
    ]);
    const [stepInfo, setStepInfo] = useState("Klik tombol untuk mencoba operasi Stack.");
    const [isExecuting, setIsExecuting] = useState(false);
    const [newItemValue, setNewItemValue] = useState<string>("");
    const [mode, setMode] = useState<"standard" | "postfix" | "prefix" | "infix">("standard");
    const [expressions, setExpressions] = useState({
        postfix: "3 4 + 2 *",
        prefix: "* + 3 4 2",
        infix: "( 3 + 4 ) * 2"
    });
    const [operatorStack, setOperatorStack] = useState<StackItem[]>([]);
    const [activeToken, setActiveToken] = useState<number>(-1);
    const [isManualMode, setIsManualMode] = useState(false);
    const [waitingForNext, setWaitingForNext] = useState(false);
    const resolveNextStep = React.useRef<(() => void) | null>(null);
    const idCounter = React.useRef(100);
    
    const getNextId = () => {
        idCounter.current += 1;
        return idCounter.current;
    };

    const waitForNext = async (ms = 800) => {
        if (!isManualMode) {
            await new Promise(r => setTimeout(r, ms));
            return;
        }
        setWaitingForNext(true);
        await new Promise<void>(r => {
            resolveNextStep.current = r;
        });
        setWaitingForNext(false);
    };

    const handleNext = () => {
        if (resolveNextStep.current) {
            resolveNextStep.current();
            resolveNextStep.current = null;
        }
    };

    const reset = () => {
        setStack([
            { id: 1, value: 10 },
            { id: 2, value: 20 }
        ]);
        setOperatorStack([]);
        setStepInfo("Simulator direset.");
        setIsExecuting(false);
        setActiveToken(-1);
        setWaitingForNext(false);
        idCounter.current = 100;
        if (resolveNextStep.current) {
            resolveNextStep.current();
            resolveNextStep.current = null;
        }
    };

    const push = async (val: string | number) => {
        if (val === "") return;
        setIsExecuting(true);
        setStepInfo(`1. Menyiapkan data ${val} untuk di-PUSH.`);
        await new Promise(r => setTimeout(r, 600));

        setStepInfo(`2. Menempatkan ${val} di atas stack (Top). Selesai (O(1))!`);
        setStack(prev => [...prev, { id: getNextId(), value: val }]);
        setNewItemValue("");
        await new Promise(r => setTimeout(r, 600));
        setIsExecuting(false);
    };

    const pop = async () => {
        if (stack.length === 0) return;
        setIsExecuting(true);
        setStepInfo("1. Mengambil elemen teratas (Top) dari stack.");
        await new Promise(r => setTimeout(r, 600));

        setStepInfo(`2. Elemen ${stack[stack.length - 1].value} dikeluarkan. Selesai (O(1))!`);
        setStack(prev => prev.slice(0, -1));
        await new Promise(r => setTimeout(r, 600));
        setIsExecuting(false);
    };

    const peek = async () => {
        if (stack.length === 0) return;
        setIsExecuting(true);
        setStepInfo(`Melihat elemen teratas: ${stack[stack.length - 1].value} (Tanpa menghapus).`);
        await new Promise(r => setTimeout(r, 1000));
        setIsExecuting(false);
    };

    const runPostfixEval = async () => {
        setIsExecuting(true);
        setMode("postfix");
        setStack([]);
        let localStack: StackItem[] = [];
        const tokens = expressions.postfix.split(" ").filter(t => t !== "");

        for (let i = 0; i < tokens.length; i++) {
            setActiveToken(i);
            const token = tokens[i];

            if (!isNaN(parseFloat(token))) {
                setStepInfo(`Baca: ${token} (Angka). Operasi: PUSH ke Stack.`);
                const newItem = { id: getNextId(), value: token };
                localStack.push(newItem);
                setStack([...localStack]);
                await waitForNext();
            } else {
                setStepInfo(`Baca: ${token} (Operator). Operasi: POP 2 elemen.`);
                await waitForNext(1000);

                const bItem = localStack.pop();
                setStack([...localStack]);
                setStepInfo(`POP pertama (B): ${bItem?.value || '?'}.`);
                await waitForNext();

                const aItem = localStack.pop();
                setStack([...localStack]);
                setStepInfo(`POP kedua (A): ${aItem?.value || '?'}.`);
                await waitForNext();

                const a = parseFloat(aItem?.value as string || "0");
                const b = parseFloat(bItem?.value as string || "0");
                let res = 0;
                if (token === "+") res = a + b;
                else if (token === "-") res = a - b;
                else if (token === "*") res = a * b;
                else if (token === "/") res = a / b;

                setStepInfo(`Hitung: ${a} ${token} ${b} = ${res}. PUSH hasil ke Stack.`);
                const resultItem = { id: getNextId(), value: res };
                localStack.push(resultItem);
                setStack([...localStack]);
                await waitForNext();
            }
        }

        setStepInfo(`Evaluasi Selesai! Hasil akhir: ${localStack[0]?.value ?? "Selesai"}`);
        setActiveToken(-1);
        setIsExecuting(false);
    };

    const runPrefixEval = async () => {
        setIsExecuting(true);
        setMode("prefix");
        setStack([]);
        let localStack: StackItem[] = [];
        const tokens = expressions.prefix.split(" ").filter(t => t !== "");

        // Prefix is evaluated Right-to-Left
        for (let i = tokens.length - 1; i >= 0; i--) {
            setActiveToken(i);
            const token = tokens[i];

            if (!isNaN(parseFloat(token))) {
                setStepInfo(`(RTL) Baca: ${token} (Angka). Operasi: PUSH ke Stack.`);
                const newItem = { id: getNextId(), value: token };
                localStack.push(newItem);
                setStack([...localStack]);
                await waitForNext();
            } else {
                setStepInfo(`(RTL) Baca: ${token} (Operator). Operasi: POP 2 elemen.`);
                await waitForNext(1000);

                const aItem = localStack.pop();
                setStack([...localStack]);
                setStepInfo(`POP pertama (A): ${aItem?.value || '?'}.`);
                await waitForNext();

                const bItem = localStack.pop();
                setStack([...localStack]);
                setStepInfo(`POP kedua (B): ${bItem?.value || '?'}.`);
                await waitForNext();

                const a = parseFloat(aItem?.value as string || "0");
                const b = parseFloat(bItem?.value as string || "0");
                let res = 0;
                if (token === "+") res = a + b;
                else if (token === "-") res = a - b;
                else if (token === "*") res = a * b;
                else if (token === "/") res = a / b;

                setStepInfo(`Hitung: ${a} ${token} ${b} = ${res}. PUSH hasil ke Stack.`);
                const resultItem = { id: getNextId(), value: res };
                localStack.push(resultItem);
                setStack([...localStack]);
                await waitForNext();
            }
        }

        setStepInfo(`Evaluasi Selesai! Hasil akhir: ${localStack[0]?.value ?? "Selesai"}`);
        setActiveToken(-1);
        setIsExecuting(false);
    };

    const infixToPostfix = (infix: string): string => {
        const priority: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
        const stack: string[] = [];
        const result: string[] = [];
        const tokens = infix.split(" ").filter(t => t !== "");

        tokens.forEach(token => {
            if (!isNaN(parseFloat(token))) {
                result.push(token);
            } else if (token === "(") {
                stack.push(token);
            } else if (token === ")") {
                while (stack.length > 0 && stack[stack.length - 1] !== "(") {
                    result.push(stack.pop()!);
                }
                stack.pop(); // pop "("
            } else {
                while (stack.length > 0 && stack[stack.length - 1] !== "(" && priority[stack[stack.length - 1]] >= priority[token]) {
                    result.push(stack.pop()!);
                }
                stack.push(token);
            }
        });

        while (stack.length > 0) {
            result.push(stack.pop()!);
        }

        return result.join(" ");
    };

    const infixToPrefix = (infix: string): string => {
        const tokens = infix.split(" ").filter(t => t !== "").reverse();
        const mappedTokens = tokens.map(t => {
            if (t === "(") return ")";
            if (t === ")") return "(";
            return t;
        });

        const postfix = infixToPostfix(mappedTokens.join(" "));
        return postfix.split(" ").reverse().join(" ");
    };

    const handleConvert = (type: 'postfix' | 'prefix') => {
        const infix = expressions.infix;
        const result = type === 'postfix' ? infixToPostfix(infix) : infixToPrefix(infix);
        setExpressions(prev => ({ ...prev, [type]: result }));
        setStepInfo(`Konversi Berhasil! Ekspresi ${type.toUpperCase()} diperbarui.`);
        setTimeout(() => setStepInfo(`Hasil konversi: ${result}`), 1000);
    };

    const runInfixEval = async () => {
        setIsExecuting(true);
        setStack([]);
        setOperatorStack([]);
        let localOperandStack: StackItem[] = [];
        let localOperatorStack: StackItem[] = [];
        const tokens = expressions.infix.split(" ").filter(t => t !== "");
        const precedence: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2 };

        const applyOp = async (op: string) => {
            setStepInfo(`Operator ${op} diproses. POP 2 angka.`);
            await waitForNext();
            
            const bItem = localOperandStack.pop();
            setStack([...localOperandStack]);
            await waitForNext();

            const aItem = localOperandStack.pop();
            setStack([...localOperandStack]);
            await waitForNext();
            
            const a = parseFloat(aItem?.value as string || "0");
            const b = parseFloat(bItem?.value as string || "0");
            let res = 0;
            if (op === "+") res = a + b;
            else if (op === "-") res = a - b;
            else if (op === "*") res = a * b;
            else if (op === "/") res = a / b;
            
            setStepInfo(`Hitung: ${a} ${op} ${b} = ${res}. PUSH hasil.`);
            const resultItem: StackItem = { id: getNextId(), value: res };
            localOperandStack.push(resultItem);
            setStack([...localOperandStack]);
            await waitForNext();
        };

        for (let i = 0; i < tokens.length; i++) {
            setActiveToken(i);
            const token = tokens[i];

            if (!isNaN(parseFloat(token))) {
                setStepInfo(`Baca: ${token} (Angka). PUSH ke Operand Stack.`);
                const newItem: StackItem = { id: getNextId(), value: token };
                localOperandStack.push(newItem);
                setStack([...localOperandStack]);
            } else if (token === "(") {
                setStepInfo(`Baca: ( . PUSH ke Operator Stack.`);
                const parenItem: StackItem = { id: getNextId() + 7000, value: "(" };
                localOperatorStack.push(parenItem);
                setOperatorStack([...localOperatorStack]);
            } else if (token === ")") {
                setStepInfo(`Baca: ) . Proses operator sampai ketemu ( .`);
                while (localOperatorStack.length > 0 && localOperatorStack[localOperatorStack.length - 1].value !== "(") {
                    const opItem = localOperatorStack.pop();
                    setOperatorStack([...localOperatorStack]);
                    await applyOp(opItem?.value as string);
                }
                localOperatorStack.pop(); // pop '('
                setOperatorStack([...localOperatorStack]);
            } else {
                // Operator
                while (localOperatorStack.length > 0 && 
                       localOperatorStack[localOperatorStack.length - 1].value !== "(" && 
                       precedence[localOperatorStack[localOperatorStack.length - 1].value as string] >= precedence[token]) {
                    const opItem = localOperatorStack.pop();
                    setOperatorStack([...localOperatorStack]);
                    await applyOp(opItem?.value as string);
                }
                setStepInfo(`PUSH ${token} ke Operator Stack.`);
                const opItem: StackItem = { id: getNextId() + 7000, value: token };
                localOperatorStack.push(opItem);
                setOperatorStack([...localOperatorStack]);
            }
            await waitForNext(1000);
        }

        while (localOperatorStack.length > 0) {
            const opItem = localOperatorStack.pop();
            setOperatorStack([...localOperatorStack]);
            await applyOp(opItem?.value as string);
            await waitForNext();
        }

        setStepInfo(`Evaluasi Selesai! Hasil akhir: ${localOperandStack[0]?.value ?? "Selesai"}`);
        setActiveToken(-1);
        setIsExecuting(false);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto"
        >
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 min-w-0">
                {/* Left: Stack Visualization */}
                <div className="flex-1 min-w-0 flex flex-col items-center">
                        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 italic">
                                <span className="material-symbols-outlined text-primary text-base not-italic">layers</span>
                                Stack Visualizer
                            </h4>
                            {/* Manual/Auto Toggle - Stay in header as it's a global playback setting */}
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-end sm:self-auto">
                                <button
                                    onClick={() => setIsManualMode(false)}
                                    className={`px-2 py-1 rounded-lg text-[9px] font-black transition-all ${!isManualMode ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 opacity-50"}`}
                                >
                                    AUTO
                                </button>
                                <button
                                    onClick={() => setIsManualMode(true)}
                                    className={`px-2 py-1 rounded-lg text-[9px] font-black transition-all ${isManualMode ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 opacity-50"}`}
                                >
                                    MANUAL
                                </button>
                            </div>
                        </div>

                    {/* Step Description */}
                    <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-primary/10 mb-8 min-h-[70px]">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-base">info</span>
                            {stepInfo}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {/* Main Stack (Operand) */}
                        <div className="flex flex-col items-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                                {mode === "standard" ? "Stack" : "Operand Stack"}
                            </p>
                            <div className="relative w-32 md:w-36 h-64 border-x-4 border-b-4 border-slate-300 dark:border-slate-700 rounded-b-2xl flex flex-col items-center justify-end p-2 gap-2 bg-slate-50/50 dark:bg-slate-900/20 shadow-inner">
                                <AnimatePresence mode="popLayout">
                                    {stack.slice().reverse().map((item, idx) => {
                                        const actualIdx = stack.length - 1 - idx;
                                        const isTop = actualIdx === stack.length - 1;
                                        return (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ y: -50, opacity: 0, scale: 0.5, rotate: -5 }}
                                                animate={{ 
                                                    y: 0, 
                                                    opacity: 1, 
                                                    scale: 1, 
                                                    rotate: 0,
                                                    borderColor: isTop ? "var(--color-primary, #f43f5e)" : "rgba(var(--color-primary-rgb), 0.2)"
                                                }}
                                                exit={{ 
                                                    y: -150, 
                                                    opacity: 0, 
                                                    scale: 0.5, 
                                                    rotate: idx % 2 === 0 ? 15 : -15 
                                                }}
                                                transition={{ 
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 22,
                                                    mass: 0.8
                                                }}
                                                whileHover={{ scale: 1.1, rotate: 2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`w-full py-4 rounded-xl border-2 flex items-center justify-center font-black shadow-xl text-xs relative overflow-hidden group ${isTop
                                                        ? "bg-primary text-white border-primary shadow-primary/50 ring-4 ring-primary/20"
                                                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                                    }`}
                                            >
                                                {isTop && (
                                                    <motion.div 
                                                        animate={{ 
                                                            opacity: [0.1, 0.4, 0.1],
                                                            scale: [1, 1.05, 1]
                                                        }}
                                                        transition={{ repeat: Infinity, duration: 2 }}
                                                        className="absolute inset-0 bg-white/30 pointer-events-none"
                                                    />
                                                )}
                                                <span className="relative z-10">{item.value}</span>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                                {stack.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700 font-black italic uppercase tracking-widest text-[10px] pointer-events-none">
                                        Empty
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Operator Stack (Infix only) */}
                        {mode === "infix" && (
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] font-black text-primary uppercase mb-2">Operator Stack</p>
                                <div className="relative w-28 md:w-32 h-64 border-x-4 border-b-4 border-primary/20 dark:border-primary/40 rounded-b-2xl flex flex-col items-center justify-end p-2 gap-2 bg-primary/5 shadow-inner">
                                    <AnimatePresence mode="popLayout">
                                        {operatorStack.slice().reverse().map((item, idx) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ x: 50, opacity: 0, scale: 0.5 }}
                                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                                exit={{ x: 50, opacity: 0, scale: 0.5 }}
                                                transition={{ 
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 25
                                                }}
                                                className={`w-full py-2 rounded-xl border-2 flex items-center justify-center font-black shadow-sm text-xs bg-white dark:bg-slate-800 border-primary/30 text-primary`}
                                            >
                                                {item.value}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {operatorStack.length === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-black italic uppercase tracking-widest text-[10px] pointer-events-none">
                                            Empty
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-full flex justify-center gap-8 mt-2">
                        <div className="w-24 h-1 bg-slate-400 dark:bg-slate-600 rounded-full opacity-30 shadow-2xl"></div>
                        {mode === "infix" && <div className="w-24 h-1 bg-primary/40 rounded-full opacity-30 shadow-2xl"></div>}
                    </div>
                </div>

                {/* Right: Controls */}
                <div className="w-full lg:w-64 flex flex-col gap-6 shrink-0">
                    {/* Mode Selector - Moved here to prevent header crowding */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Simulator Mode</label>
                        <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                            {["standard", "infix", "postfix", "prefix"].map((m) => (
                                <button
                                    key={m}
                                    onClick={() => { setMode(m as any); reset(); }}
                                    disabled={isExecuting}
                                    className={`px-2 py-1.5 rounded-lg text-[9px] font-black transition-all uppercase hover:scale-105 active:scale-95 ${mode === m ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 opacity-50"}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    {mode === "standard" ? (
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Push Item</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={newItemValue}
                                        onChange={(e) => setNewItemValue(e.target.value)}
                                        disabled={isExecuting}
                                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black outline-none focus:border-primary/50 disabled:opacity-50"
                                    />
                                    <button
                                        onClick={() => push(newItemValue)}
                                        disabled={isExecuting || !newItemValue}
                                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50"
                                    >
                                        PUSH
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={pop}
                                    disabled={isExecuting || stack.length === 0}
                                    className="px-4 py-2 border-2 border-red-500/30 text-red-500 hover:bg-red-500/5 hover:scale-105 active:scale-95 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    POP
                                </button>
                                <button
                                    onClick={peek}
                                    disabled={isExecuting || stack.length === 0}
                                    className="px-4 py-2 border-2 border-amber-500/30 text-amber-500 hover:bg-amber-500/5 hover:scale-105 active:scale-95 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    PEEK
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)} Expression
                                </label>
                                <input
                                    type="text"
                                    value={(expressions as any)[mode]}
                                    onChange={(e) => setExpressions({ ...expressions, [mode]: e.target.value })}
                                    disabled={isExecuting}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-xs font-black outline-none focus:border-primary/50 disabled:opacity-50"
                                />
                                
                                {mode === "infix" && (
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleConvert('postfix')}
                                            disabled={isExecuting}
                                            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 text-slate-500 hover:text-primary py-1.5 rounded-lg text-[8px] font-black uppercase transition-all flex items-center justify-center gap-1 border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95"
                                        >
                                            <span className="material-symbols-outlined text-[10px]">alt_route</span>
                                            To Postfix
                                        </button>
                                        <button
                                            onClick={() => handleConvert('prefix')}
                                            disabled={isExecuting}
                                            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 text-slate-500 hover:text-primary py-1.5 rounded-lg text-[8px] font-black uppercase transition-all flex items-center justify-center gap-1 border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95"
                                        >
                                            <span className="material-symbols-outlined text-[10px]">alt_route</span>
                                            To Prefix
                                        </button>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-1 mt-1">
                                    {(expressions as any)[mode].split(" ").map((token: string, i: number) => (
                                        <motion.span
                                            key={i}
                                            animate={{ 
                                                scale: activeToken === i ? 1.2 : 1,
                                                backgroundColor: activeToken === i ? "var(--color-primary, #f43f5e)" : "transparent"
                                            }}
                                            className={`px-2 py-1 rounded text-[10px] font-bold ${activeToken === i ? "text-white shadow-lg z-10" : "bg-slate-100 dark:bg-slate-800 text-slate-500 border border-transparent"} transition-all`}
                                        >
                                            {token}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={mode === "postfix" ? runPostfixEval : mode === "prefix" ? runPrefixEval : runInfixEval}
                                    disabled={isExecuting || !(expressions as any)[mode]}
                                    className={`w-full ${waitingForNext ? 'opacity-50' : ''} bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-50 flex items-center justify-center gap-2`}
                                >
                                    <span className="material-symbols-outlined text-sm">{isExecuting ? 'sync' : 'play_arrow'}</span>
                                    {isExecuting ? 'Running...' : 'Run Evaluator'}
                                </button>
                                
                                <button
                                    onClick={handleNext}
                                    disabled={!waitingForNext}
                                    className={`w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-2 ${waitingForNext ? 'animate-pulse' : ''}`}
                                >
                                    <span className="material-symbols-outlined text-sm">navigate_next</span>
                                    Next Step
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={reset}
                        disabled={isExecuting}
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-sm">restart_alt</span>
                        Reset Simulator
                    </button>

                    <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">LIFO Properties</h5>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-primary mt-0.5">●</span>
                                <div>O(1) untuk PUSH & POP</div>
                            </li>
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-primary mt-0.5">●</span>
                                <div>Hanya akses di satu ujung (TOP)</div>
                            </li>
                            <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <span className="text-primary mt-0.5">●</span>
                                <div>Digunakan untuk undo/stack-call</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
