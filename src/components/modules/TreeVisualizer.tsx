"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
    id: string;
    value: number;
    left?: TreeNode;
    right?: TreeNode;
    x: number;
    y: number;
    level: number;
}

type TraversalType = "PREORDER" | "INORDER" | "POSTORDER";

export default function TreeVisualizer() {
    const [root, setRoot] = useState<TreeNode | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [stepInfo, setStepInfo] = useState("Masukkan angka untuk membangun Binary Search Tree.");
    const [isExecuting, setIsExecuting] = useState(false);
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
    const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
    const [traversalResult, setTraversalResult] = useState<number[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);

    // Initial Tree
    useEffect(() => {
        const initialValues = [50, 30, 70, 20, 40, 60, 80];
        let newRoot: TreeNode | null = null;
        initialValues.forEach(val => {
            newRoot = insertNode(newRoot, val, 0);
        });
        updateCoordinates(newRoot, 0, 0, 100);
        setRoot(newRoot);
    }, []);

    // BST Insertion Logic (non-animated for setup)
    function insertNode(node: TreeNode | null, value: number, level: number): TreeNode {
        if (!node) {
            return { id: Math.random().toString(), value, level, x: 0, y: 0 };
        }
        if (value < node.value) {
            node.left = insertNode(node.left || null, value, level + 1);
        } else if (value > node.value) {
            node.right = insertNode(node.right || null, value, level + 1);
        }
        return node;
    }

    // Update coordinates for visualization
    function updateCoordinates(node: TreeNode | null, x: number, y: number, offset: number) {
        if (!node) return;
        node.x = x;
        node.y = y;
        const nextOffset = offset * 0.6;
        if (node.left) updateCoordinates(node.left, x - offset, y + 80, nextOffset);
        if (node.right) updateCoordinates(node.right, x + offset, y + 80, nextOffset);
    }

    const resetTraversal = () => {
        setActiveNodeId(null);
        setVisitedNodes([]);
        setTraversalResult([]);
    };

    const runInsert = async () => {
        const val = parseInt(inputValue);
        if (isNaN(val)) return;
        setInputValue("");
        setIsExecuting(true);
        resetTraversal();

        let current = root;
        let parent: TreeNode | null = null;
        let direction: "left" | "right" | null = null;

        if (!current) {
            const newNode = { id: Math.random().toString(), value: val, level: 0, x: 0, y: 0 };
            setRoot(newNode);
            setStepInfo(`Membuat Root baru dengan nilai ${val}.`);
        } else {
            setStepInfo(`Mencari posisi untuk ${val}...`);
            while (current) {
                setActiveNodeId(current.id);
                setVisitedNodes(prev => [...prev, current!.id]);
                
                if (val === current.value) {
                    setStepInfo(`Nilai ${val} sudah ada di Tree.`);
                    await new Promise(r => setTimeout(r, 1000));
                    break;
                }

                await new Promise(r => setTimeout(r, 800));

                if (val < current.value) {
                    setStepInfo(`${val} < ${current.value}, belok ke KIRI.`);
                    if (!current.left) {
                        current.left = { id: Math.random().toString(), value: val, level: current.level + 1, x: 0, y: 0 };
                        setStepInfo(`Menambahkan ${val} di kiri ${current.value}.`);
                        break;
                    }
                    current = current.left;
                } else {
                    setStepInfo(`${val} > ${current.value}, belok ke KANAN.`);
                    if (!current.right) {
                        current.right = { id: Math.random().toString(), value: val, level: current.level + 1, x: 0, y: 0 };
                        setStepInfo(`Menambahkan ${val} di kanan ${current.value}.`);
                        break;
                    }
                    current = current.right;
                }
            }
        }

        const newRoot = { ...root } as TreeNode;
        updateCoordinates(newRoot, 0, 0, 100);
        setRoot(newRoot);
        await new Promise(r => setTimeout(r, 1000));
        setIsExecuting(false);
        setActiveNodeId(null);
    };

    const runTraversal = async (type: TraversalType) => {
        setIsExecuting(true);
        resetTraversal();
        setStepInfo(`Memulai Traversal ${type}...`);
        
        const result: number[] = [];
        const visit = async (node: TreeNode | null) => {
            if (!node) return;

            if (type === "PREORDER") {
                setActiveNodeId(node.id);
                setVisitedNodes(prev => [...prev, node.id]);
                result.push(node.value);
                setTraversalResult([...result]);
                setStepInfo(`Kunjungi ROOT: ${node.value}`);
                await new Promise(r => setTimeout(r, 800));
            }

            setStepInfo(`Menelusuri KIRI dari ${node.value}...`);
            await visit(node.left || null);

            if (type === "INORDER") {
                setActiveNodeId(node.id);
                setVisitedNodes(prev => [...prev, node.id]);
                result.push(node.value);
                setTraversalResult([...result]);
                setStepInfo(`Kunjungi ROOT: ${node.value}`);
                await new Promise(r => setTimeout(r, 800));
            }

            setStepInfo(`Menelusuri KANAN dari ${node.value}...`);
            await visit(node.right || null);

            if (type === "POSTORDER") {
                setActiveNodeId(node.id);
                setVisitedNodes(prev => [...prev, node.id]);
                result.push(node.value);
                setTraversalResult([...result]);
                setStepInfo(`Kunjungi ROOT: ${node.value}`);
                await new Promise(r => setTimeout(r, 800));
            }
        };

        await visit(root);
        setStepInfo(`Traversal ${type} selesai!`);
        setIsExecuting(false);
        setActiveNodeId(null);
    };

    const renderNodes = (node: TreeNode | null): React.ReactNode => {
        if (!node) return null;

        const isActive = activeNodeId === node.id;
        const isVisited = visitedNodes.includes(node.id);

        return (
            <React.Fragment key={node.id}>
                {/* Connection to Left */}
                {node.left && (
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        x1={node.x}
                        y1={node.y}
                        x2={node.left.x}
                        y2={node.left.y}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-slate-300 dark:text-slate-700"
                    />
                )}
                {/* Connection to Right */}
                {node.right && (
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        x1={node.x}
                        y1={node.y}
                        x2={node.right.x}
                        y2={node.right.y}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-slate-300 dark:text-slate-700"
                    />
                )}

                {/* The Node */}
                <motion.g
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: node.x, y: node.y }}
                >
                    <circle
                        r="20"
                        className={`transition-colors duration-500 ${
                            isActive 
                                ? "fill-orange-500 stroke-orange-200 stroke-4" 
                                : isVisited 
                                    ? "fill-primary/20 stroke-primary stroke-2" 
                                    : "fill-white dark:fill-slate-900 stroke-primary/30 stroke-2"
                        }`}
                    />
                    <text
                        dy=".3em"
                        textAnchor="middle"
                        className={`text-[12px] font-black pointer-events-none transition-colors ${
                            isActive ? "fill-white" : "fill-slate-900 dark:fill-white"
                        }`}
                    >
                        {node.value}
                    </text>
                </motion.g>

                {renderNodes(node.left || null)}
                {renderNodes(node.right || null)}
            </React.Fragment>
        );
    };

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Control Panel */}
                <div className="lg:w-80 space-y-6">
                    <div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-2 uppercase italic tracking-tighter">
                            <span className="material-symbols-outlined text-orange-500">account_tree</span>
                            BST Interactive
                        </h4>
                        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-500/20">
                            <p className="text-sm text-orange-800 dark:text-orange-300 font-bold italic leading-relaxed">
                                {stepInfo}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Nilai"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isExecuting}
                                className="flex-1 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 font-black outline-none focus:border-orange-500 transition-all disabled:opacity-50"
                            />
                            <button
                                onClick={runInsert}
                                disabled={isExecuting || !inputValue}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-black shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
                            >
                                INSERT
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Run Traversal</p>
                            <div className="grid grid-cols-3 gap-1">
                                <button
                                    onClick={() => runTraversal("PREORDER")}
                                    disabled={isExecuting || !root}
                                    className="text-[9px] font-black py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all disabled:opacity-30"
                                >
                                    PRE-ORDER
                                </button>
                                <button
                                    onClick={() => runTraversal("INORDER")}
                                    disabled={isExecuting || !root}
                                    className="text-[9px] font-black py-2 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-lg hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-30"
                                >
                                    IN-ORDER
                                </button>
                                <button
                                    onClick={() => runTraversal("POSTORDER")}
                                    disabled={isExecuting || !root}
                                    className="text-[9px] font-black py-2 bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 rounded-lg hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-30"
                                >
                                    POST-ORDER
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setRoot(null);
                                resetTraversal();
                                setStepInfo("Tree dikosongkan.");
                            }}
                            disabled={isExecuting}
                            className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:border-rose-500 hover:text-rose-500 rounded-2xl font-black text-xs transition-all disabled:opacity-50"
                        >
                            CLEAR TREE
                        </button>
                    </div>

                    {/* Result Tray */}
                    <AnimatePresence>
                        {traversalResult.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-slate-900 rounded-2xl border border-white/10"
                            >
                                <p className="text-[10px] font-black text-primary uppercase mb-2">Traversal Result:</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {traversalResult.map((val, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="px-2 py-1 bg-white/10 rounded text-xs font-mono text-white font-bold"
                                        >
                                            {val}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Canvas */}
                <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-primary/5 min-h-[400px] flex items-center justify-center p-4">
                    {!root ? (
                        <div className="text-center opacity-30">
                            <span className="material-symbols-outlined text-6xl">forest</span>
                            <p className="font-black uppercase tracking-widest text-xs mt-2">Tree is Empty</p>
                        </div>
                    ) : (
                        <svg 
                            width="100%" 
                            height="100%" 
                            viewBox="-200 -20 400 350"
                            className="w-full h-full max-h-[500px]"
                        >
                            {renderNodes(root)}
                        </svg>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-6 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Active Node</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Visited</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-primary/30" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Unvisited</span>
                </div>
            </div>
        </div>
    );
}
