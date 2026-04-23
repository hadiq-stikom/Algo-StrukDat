"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
    id: string;
    label: string;
    n: number;
    depth: number;
    parentId?: string;
    children: string[];
    state: 'idle' | 'calling' | 'returning' | 'completed';
    returnValue?: number;
    x: number;
    y: number;
}

interface TreeLink {
    id: string;
    fromId: string;
    toId: string;
}

export default function RecursionTreeVisualizer() {
    const [nodes, setNodes] = useState<Record<string, TreeNode>>({});
    const [links, setLinks] = useState<TreeLink[]>([]);
    const [inputVal, setInputVal] = useState(4);
    const [isExecuting, setIsExecuting] = useState(false);
    const [stepInfo, setStepInfo] = useState("Visualisasi Tree Recursion (Fibonacci)");
    const [speed, setSpeed] = useState(1);
    const [isManualMode, setIsManualMode] = useState(false);
    const [waitingForStep, setWaitingForStep] = useState(false);

    const speedRef = useRef(1);
    const manualModeRef = useRef(false);
    const stepResolverRef = useRef<((value?: unknown) => void) | null>(null);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        manualModeRef.current = isManualMode;
        if (!isManualMode && waitingForStep && stepResolverRef.current) {
            handleNextStep();
        }
    }, [isManualMode, waitingForStep]);

    const handleNextStep = () => {
        if (stepResolverRef.current) {
            setWaitingForStep(false);
            stepResolverRef.current();
            stepResolverRef.current = null;
        }
    };

    const delay = async (ms: number) => {
        if (manualModeRef.current) {
            setWaitingForStep(true);
            return new Promise(resolve => {
                stepResolverRef.current = resolve;
            });
        }
        return new Promise(r => setTimeout(r, ms / speedRef.current));
    };

    const reset = () => {
        setNodes({});
        setLinks([]);
        setIsExecuting(false);
        setStepInfo("Simulator direset.");
        setWaitingForStep(false);
        if (stepResolverRef.current) {
            stepResolverRef.current();
            stepResolverRef.current = null;
        }
    };

    const calculateLayout = (n: number) => {
        const tempNodes: Record<string, TreeNode> = {};
        const tempLinks: TreeLink[] = [];
        
        const canvasWidth = 800;
        const levelHeight = 80;
        
        function buildTree(currN: number, depth: number, xStart: number, xEnd: number, parentId?: string): string {
            const id = Math.random().toString(36).substr(2, 9);
            const x = (xStart + xEnd) / 2;
            const y = depth * levelHeight + 40;
            
            tempNodes[id] = {
                id,
                label: `fib(${currN})`,
                n: currN,
                depth,
                parentId,
                children: [],
                state: 'idle',
                x,
                y
            };
            
            if (parentId) {
                tempLinks.push({ id: `${parentId}-${id}`, fromId: parentId, toId: id });
                tempNodes[parentId].children.push(id);
            }
            
            if (currN > 1) {
                const mid = (xStart + xEnd) / 2;
                buildTree(currN - 1, depth + 1, xStart, mid, id);
                buildTree(currN - 2, depth + 1, mid, xEnd, id);
            }
            
            return id;
        }
        
        buildTree(n, 0, 0, canvasWidth);
        return { nodes: tempNodes, links: tempLinks };
    };

    const runFibonacci = async (n: number) => {
        setIsExecuting(true);
        const { nodes: initialNodes, links: initialLinks } = calculateLayout(n);
        
        // We start with nodes in 'idle' but we only show them as they are called
        const visibleNodes: Record<string, TreeNode> = {};
        const visibleLinks: TreeLink[] = [];
        
        setNodes({});
        setLinks([]);

        async function fib(currN: number, targetId: string): Promise<number> {
            const node = initialNodes[targetId];
            
            // Mark as calling
            visibleNodes[targetId] = { ...node, state: 'calling' };
            setNodes({ ...visibleNodes });
            setStepInfo(`Memanggil fib(${currN})...`);
            await delay(800);

            let result: number;
            if (currN <= 1) {
                result = currN;
                setStepInfo(`Base Case: fib(${currN}) = ${result}`);
            } else {
                setStepInfo(`fib(${currN}) memanggil fib(${currN-1}) dan fib(${currN-2})`);
                await delay(600);
                
                // Add links to children before calling them
                node.children.forEach(childId => {
                    const link = initialLinks.find(l => l.toId === childId);
                    if (link) visibleLinks.push(link);
                });
                setLinks([...visibleLinks]);

                const leftVal = await fib(currN - 1, node.children[0]);
                const rightVal = await fib(currN - 2, node.children[1]);
                result = leftVal + rightVal;
            }

            // Return phase
            visibleNodes[targetId] = { ...visibleNodes[targetId], state: 'returning', returnValue: result };
            setNodes({ ...visibleNodes });
            setStepInfo(`fib(${currN}) mengembalikan ${result}`);
            await delay(800);

            visibleNodes[targetId] = { ...visibleNodes[targetId], state: 'completed' };
            setNodes({ ...visibleNodes });
            return result;
        }

        // Find root ID (the one with depth 0)
        const rootId = Object.keys(initialNodes).find(id => initialNodes[id].depth === 0);
        if (rootId) {
            await fib(n, rootId);
        }
        
        setStepInfo(`Selesai! fib(${n}) = ${Object.values(visibleNodes).find(node => node.depth === 0)?.returnValue}`);
        setIsExecuting(false);
    };

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm overflow-hidden">
            <div className="flex flex-col gap-6">
                {/* Header & Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-primary/10 pb-6">
                    <div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 italic uppercase tracking-tighter">
                            <span className="material-symbols-outlined text-primary">account_tree</span>
                            Recursion Tree Visualizer
                        </h4>
                        <p className="text-xs text-slate-500 font-bold italic mt-1">{stepInfo}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                            <label className="text-[10px] font-black text-slate-400 uppercase">Input n:</label>
                            <input 
                                type="number" 
                                min="0" 
                                max="5" 
                                value={inputVal} 
                                onChange={(e) => setInputVal(Math.min(5, Math.max(0, parseInt(e.target.value) || 0)))}
                                className="w-10 bg-transparent text-sm font-black text-primary outline-none"
                                disabled={isExecuting}
                            />
                        </div>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => runFibonacci(inputVal)}
                                disabled={isExecuting}
                                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isExecuting ? 'Running...' : 'Mulai Visualisasi'}
                            </button>
                            <button 
                                onClick={reset}
                                className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Visualization Area */}
                <div className="relative w-full aspect-video bg-slate-50 dark:bg-slate-950/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 overflow-auto flex items-center justify-center p-8">
                    <div className="relative" style={{ width: 800, height: 400 }}>
                        {/* SVG for Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-slate-300 dark:text-slate-700" />
                                </marker>
                            </defs>
                            {links.map(link => {
                                const from = nodes[link.fromId];
                                const to = nodes[link.toId];
                                if (!from || !to) return null;
                                return (
                                    <motion.line
                                        key={link.id}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        x1={from.x}
                                        y1={from.y}
                                        x2={to.x}
                                        y2={to.y}
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-slate-300 dark:text-slate-700"
                                        strokeDasharray="4 2"
                                    />
                                );
                            })}
                        </svg>

                        {/* Nodes */}
                        <AnimatePresence>
                            {Object.values(nodes).map(node => (
                                <motion.div
                                    key={node.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    style={{ 
                                        left: node.x, 
                                        top: node.y, 
                                        transform: 'translate(-50%, -50%)' 
                                    }}
                                    className={`absolute w-14 h-14 rounded-full flex flex-col items-center justify-center border-4 shadow-xl transition-colors duration-500 z-10 ${
                                        node.state === 'calling' ? 'bg-amber-500 border-amber-300 text-white animate-pulse scale-110' :
                                        node.state === 'returning' ? 'bg-primary border-primary/50 text-white scale-105' :
                                        node.state === 'completed' ? 'bg-emerald-500 border-emerald-300 text-white' :
                                        'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                                    }`}
                                >
                                    <span className="text-[10px] font-black uppercase leading-none">{node.label}</span>
                                    {node.returnValue !== undefined && (
                                        <motion.span 
                                            initial={{ y: 5, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-xs font-black mt-0.5"
                                        >
                                            {node.returnValue}
                                        </motion.span>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {Object.keys(nodes).length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 pointer-events-none">
                                <span className="material-symbols-outlined text-8xl mb-2">account_tree</span>
                                <p className="font-black uppercase tracking-[0.2em]">Tree Area</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Controls & Legend */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Kecepatan & Mode</label>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[150px] bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-1">
                                {[
                                    { label: "0.5x", val: 0.5 },
                                    { label: "1x", val: 1 },
                                    { label: "2x", val: 2 }
                                ].map(s => (
                                    <button
                                        key={s.label}
                                        onClick={() => setSpeed(s.val)}
                                        className={`flex-1 py-1.5 text-[9px] font-black rounded-lg transition-all ${speed === s.val ? "bg-white dark:bg-slate-700 text-primary shadow-sm" : "text-slate-500"}`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={() => setIsManualMode(!isManualMode)}
                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${isManualMode ? "bg-amber-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                            >
                                {isManualMode ? 'Mode Manual: ON' : 'Mode Manual: OFF'}
                            </button>
                        </div>
                        {isManualMode && (
                            <button
                                onClick={handleNextStep}
                                disabled={!waitingForStep || !isExecuting}
                                className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${waitingForStep && isExecuting ? "bg-amber-500 text-white shadow-lg animate-bounce" : "bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50"}`}
                            >
                                Lanjut Langkah <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        )}
                    </div>

                    <div className="bg-slate-900 p-4 rounded-2xl border-2 border-primary/10">
                        <h5 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">Legenda Warna:</h5>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <span>Calling (Panggil)</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                                <span>Returning (Hasil)</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span>Completed (Selesai)</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                                <div className="w-3 h-3 rounded-full bg-white border border-slate-700"></div>
                                <span>Idle (Menunggu)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
