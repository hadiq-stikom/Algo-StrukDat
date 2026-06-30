"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GraphNode {
    id: string;
    label: string;
    x: number;
    y: number;
}

interface GraphEdge {
    from: string;
    to: string;
    weight?: number;
}

export default function GraphVisualizer() {
    const [nodes, setNodes] = useState<GraphNode[]>([]);
    const [edges, setEdges] = useState<GraphEdge[]>([]);
    const [nodeLabel, setNodeLabel] = useState("");
    const [selectedFrom, setSelectedFrom] = useState<string>("");
    const [selectedTo, setSelectedTo] = useState<string>("");
    const [edgeWeight, setEdgeWeight] = useState("");
    const [stepInfo, setStepInfo] = useState("Tambahkan node untuk memulai membuat graph.");
    const [isDirected, setIsDirected] = useState(false);
    const [isWeighted, setIsWeighted] = useState(false);

    // Initial sample graph
    useEffect(() => {
        const initialNodes: GraphNode[] = [
            { id: "A", label: "A", x: 300, y: 80 },
            { id: "B", label: "B", x: 100, y: 300 },
            { id: "C", label: "C", x: 500, y: 300 },
            { id: "D", label: "D", x: 300, y: 520 },
        ];
        const initialEdges: GraphEdge[] = [
            { from: "A", to: "B" },
            { from: "A", to: "C" },
            { from: "B", to: "D" },
            { from: "C", to: "D" },
        ];
        setNodes(initialNodes);
        setEdges(initialEdges);
        setStepInfo("Graph contoh dengan 4 node dan 4 edge.");
    }, []);

    const addNode = () => {
        if (!nodeLabel.trim()) return;
        if (nodes.find(n => n.label === nodeLabel)) {
            setStepInfo(`Node "${nodeLabel}" sudah ada!`);
            return;
        }

        const newNode: GraphNode = {
            id: nodeLabel,
            label: nodeLabel,
            x: 100 + Math.random() * 400,
            y: 80 + Math.random() * 420,
        };

        setNodes([...nodes, newNode]);
        setNodeLabel("");
        setStepInfo(`Node "${newNode.label}" ditambahkan.`);
    };

    const addEdge = () => {
        if (!selectedFrom || !selectedTo) {
            setStepInfo("Pilih dua node untuk membuat edge.");
            return;
        }
        if (selectedFrom === selectedTo) {
            setStepInfo("Tidak bisa membuat edge ke node yang sama.");
            return;
        }

        const existingEdge = edges.find(
            e => e.from === selectedFrom && e.to === selectedTo
        );
        if (existingEdge) {
            setStepInfo("Edge ini sudah ada!");
            return;
        }

        const newEdge: GraphEdge = {
            from: selectedFrom,
            to: selectedTo,
            weight: isWeighted ? parseInt(edgeWeight) || 1 : undefined,
        };

        const allNewEdges = [newEdge];

        if (!isDirected) {
            allNewEdges.push({
                from: selectedTo,
                to: selectedFrom,
                weight: isWeighted ? newEdge.weight : undefined,
            });
        }

        setEdges((prev) => [...prev, ...allNewEdges]);

        setSelectedFrom("");
        setSelectedTo("");
        setEdgeWeight("");

        if (!isDirected) {
            setStepInfo(`Edge dua arah ${selectedFrom} \u2192 ${selectedTo} (${isWeighted ? newEdge.weight : "any"}) ditambahkan.`);
        } else {
            setStepInfo(`Edge satu arah ${selectedFrom} \u2192 ${selectedTo} (${isWeighted ? newEdge.weight : "any"}) ditambahkan.`);
        }
    };

    const removeNode = (nodeId: string) => {
        setNodes(nodes.filter(n => n.id !== nodeId));
        setEdges(edges.filter(e => e.from !== nodeId && e.to !== nodeId));
        setStepInfo(`Node "${nodeId}" dihapus.`);
    };

    const removeEdge = (edgeIndex: number) => {
        const edge = edges[edgeIndex];
        setEdges((prev) => {
            const filtered = prev.filter((_, i) => i !== edgeIndex);
            if (!isDirected) {
                const reverseIndex = filtered.findIndex(
                    e => e.from === edge.to && e.to === edge.from
                );
                if (reverseIndex !== -1) {
                    return filtered.filter((_, i) => i !== reverseIndex);
                }
            }
            return filtered;
        });
        setStepInfo(`Edge ${edge.from} \u2192 ${edge.to} dihapus${!isDirected ? " (dan edge balik juga)" : ""}.`);
    };

    const clearGraph = () => {
        setNodes([]);
        setEdges([]);
        setStepInfo("Graph dikosongkan.");
    };

    const getAdjacencyList = () => {
        const adjList: Record<string, string[]> = {};
        nodes.forEach(node => {
            adjList[node.label] = [];
        });
        edges.forEach(edge => {
            adjList[edge.from].push(edge.to);
            if (!isDirected) {
                adjList[edge.to].push(edge.from);
            }
        });
        return adjList;
    };

    const adjacencyList = getAdjacencyList();

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-8">
                    {/* Control Panel */}
                <div className="lg:w-80 space-y-6">

                        {/* Graph Type Toggle */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipe Graph</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsDirected(!isDirected)}
                                    className={`flex-1 py-2 px-3 rounded-xl font-black text-xs transition-all ${isDirected ? "bg-rose-500 text-white" : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"}`}
                                >
                                    {isDirected ? "DIRECTED ✓" : "UNDIRECTED"}
                                </button>
                                <button
                                    onClick={() => setIsWeighted(!isWeighted)}
                                    className={`flex-1 py-2 px-3 rounded-xl font-black text-xs transition-all ${isWeighted ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"}`}
                                >
                                    {isWeighted ? "WEIGHTED ✓" : "UNWEIGHTED"}
                                </button>
                            </div>
                        </div>

                        {/* Add Node */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tambah Node</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Label (A-Z)"
                                    value={nodeLabel}
                                    onChange={(e) => setNodeLabel(e.target.value.toUpperCase())}
                                    maxLength={1}
                                    className="flex-1 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 font-black outline-none focus:border-sky-500 transition-all"
                                />
                                <button
                                    onClick={addNode}
                                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl font-black shadow-lg shadow-sky-500/20 transition-all"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add Edge */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tambah Edge</p>
                            <div className="flex gap-2">
                                <select
                                    value={selectedFrom}
                                    onChange={(e) => setSelectedFrom(e.target.value)}
                                    className="flex-1 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 font-black outline-none focus:border-sky-500 transition-all"
                                >
                                    <option value="">Dari</option>
                                    {nodes.map(node => (
                                        <option key={node.id} value={node.id}>{node.label}</option>
                                    ))}
                                </select>
                                <span className="text-slate-400 font-black self-center">→</span>
                                <select
                                    value={selectedTo}
                                    onChange={(e) => setSelectedTo(e.target.value)}
                                    className="flex-1 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 font-black outline-none focus:border-sky-500 transition-all"
                                >
                                    <option value="">Ke</option>
                                    {nodes.map(node => (
                                        <option key={node.id} value={node.id}>{node.label}</option>
                                    ))}
                                </select>
                            </div>
                            {isWeighted && (
                                <input
                                    type="number"
                                    placeholder="Bobot"
                                    value={edgeWeight}
                                    onChange={(e) => setEdgeWeight(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 font-black outline-none focus:border-sky-500 transition-all"
                                />
                            )}
                            <button
                                onClick={addEdge}
                                disabled={!selectedFrom || !selectedTo}
                                className="w-full py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-black shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50"
                            >
                                TAMBAH EDGE
                            </button>
                        </div>

                        {/* Clear Button */}
                        <button
                            onClick={clearGraph}
                            className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:border-rose-500 hover:text-rose-500 rounded-2xl font-black text-xs transition-all"
                        >
                            CLEAR GRAPH
                        </button>

                        {/* Adjacency List Display */}
                        <div className="p-4 bg-slate-900 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-black text-sky-400 uppercase mb-3">Adjacency List:</p>
                            <div className="space-y-1 font-mono text-xs">
                                {Object.entries(adjacencyList).map(([node, neighbors]) => (
                                    <div key={node} className="text-slate-300">
                                        <span className="text-sky-400 font-bold">{node}</span>
                                        <span className="text-slate-500">: [</span>
                                        <span className="text-slate-200">{neighbors.join(", ") || "∅"}</span>
                                        <span className="text-slate-500">]</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-primary/5 min-h-[550px] overflow-hidden">
                        {nodes.length === 0 ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center opacity-30">
                                    <span className="material-symbols-outlined text-6xl">hub</span>
                                    <p className="font-black uppercase tracking-widest text-xs mt-2">Graph is Empty</p>
                                </div>
                            </div>
                        ) : (
                            <svg
                            viewBox="0 0 600 600"
                            className="w-full h-full"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {/* Edges */}
                            {edges.map((edge, index) => {
                                const fromNode = nodes.find(n => n.id === edge.from);
                                const toNode = nodes.find(n => n.id === edge.to);
                                if (!fromNode || !toNode) return null;

                                const dx = toNode.x - fromNode.x;
                                const dy = toNode.y - fromNode.y;
                                const distance = Math.sqrt(dx * dx + dy * dy);
                                const offsetX = (dx / distance) * 25;
                                const offsetY = (dy / distance) * 25;
                                const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                                return (
                                    <g key={index}>
                                        {/* Edge Line */}
                                        <line
                                            x1={fromNode.x + offsetX}
                                            y1={fromNode.y + offsetY}
                                            x2={toNode.x - offsetX}
                                            y2={toNode.y - offsetY}
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="text-slate-400 dark:text-slate-600"
                                        />
                                        
                                        {/* Arrow for directed graph */}
                                        {isDirected && (
                                            <polygon
                                                points="-10,-5 0,0 -10,5"
                                                fill="currentColor"
                                                className="text-slate-400 dark:text-slate-600"
                                                transform={`translate(${toNode.x - offsetX}, ${toNode.y - offsetY}) rotate(${angle})`}
                                            />
                                        )}

                                        {/* Weight Label */}
                                        {isWeighted && edge.weight !== undefined && (
                                            <text
                                                x={(fromNode.x + toNode.x) / 2}
                                                y={(fromNode.y + toNode.y) / 2 - 10}
                                                textAnchor="middle"
                                                className="text-[10px] font-black fill-emerald-600"
                                            >
                                                {edge.weight}
                                            </text>
                                        )}

                                        {/* Delete Edge Button */}
                                        <foreignObject
                                            x={(fromNode.x + toNode.x) / 2 - 12}
                                            y={(fromNode.y + toNode.y) / 2 + 5}
                                            width="24"
                                            height="24"
                                        >
                                            <button
                                                onClick={() => removeEdge(index)}
                                                className="w-6 h-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-xs font-black shadow-lg"
                                            >
                                                ×
                                            </button>
                                        </foreignObject>
                                    </g>
                                );
                            })}

                            {/* Nodes */}
                            {nodes.map((node) => (
                                <g key={node.id}>
                                    {/* Node Circle */}
                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="22"
                                        className="fill-white dark:fill-slate-900 stroke-sky-500 stroke-3"
                                    />
                                    {/* Node Label */}
                                    <text
                                        x={node.x}
                                        y={node.y}
                                        dy=".3em"
                                        textAnchor="middle"
                                        className="text-sm font-black fill-slate-900 dark:fill-white pointer-events-none"
                                    >
                                        {node.label}
                                    </text>
                                    {/* Delete Node Button */}
                                    <foreignObject
                                        x={node.x - 12}
                                        y={node.y + 25}
                                        width="24"
                                        height="24"
                                    >
                                        <button
                                            onClick={() => removeNode(node.id)}
                                            className="w-6 h-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-xs font-black shadow-lg"
                                        >
                                            ×
                                        </button>
                                    </foreignObject>
                                </g>
                            ))}
                        </svg>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-6 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-sky-500 bg-white dark:bg-slate-900" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Node</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-slate-400" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Edge</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg width="8" height="8" viewBox="0 0 6 6" className="text-slate-400" aria-hidden="true">
                        <polygon points="0,0 0,6 6,3" fill="currentColor" />
                    </svg>
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Directed</span>
                </div>
            </div>
        </div>
    );
}
