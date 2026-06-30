"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface GraphNode {
    id: string;
    label: string;
    x: number;
    y: number;
}

interface GraphEdge {
    from: string;
    to: string;
    weight: number;
}

const NODES: GraphNode[] = [
    { id: "A", label: "A", x: 120, y: 60 },
    { id: "B", label: "B", x: 340, y: 60 },
    { id: "C", label: "C", x: 560, y: 60 },
    { id: "D", label: "D", x: 120, y: 220 },
    { id: "E", label: "E", x: 340, y: 220 },
    { id: "F", label: "F", x: 560, y: 220 },
];

const EDGES: GraphEdge[] = [
    { from: "A", to: "B", weight: 4 },
    { from: "B", to: "C", weight: 3 },
    { from: "A", to: "D", weight: 2 },
    { from: "B", to: "E", weight: 1 },
    { from: "C", to: "F", weight: 5 },
    { from: "D", to: "E", weight: 6 },
    { from: "E", to: "F", weight: 2 },
    { from: "A", to: "E", weight: 7 },
];

type Algorithm = "bfs" | "dfs" | "dijkstra";

interface Step {
    visited: string[];
    current: string | null;
    frontier: string[];
    distances: Record<string, number>;
    predecessors: Record<string, string | null>;
    message: string;
    done: boolean;
}

function getNeighbors(nodeId: string): string[] {
    const neighbors: string[] = [];
    for (const e of EDGES) {
        if (e.from === nodeId) neighbors.push(e.to);
        if (e.to === nodeId) neighbors.push(e.from);
    }
    return neighbors;
}

function getEdgeWeight(from: string, to: string): number {
    for (const e of EDGES) {
        if ((e.from === from && e.to === to) || (e.from === to && e.to === from)) {
            return e.weight;
        }
    }
    return Infinity;
}

function generateBFSSteps(start: string): Step[] {
    const steps: Step[] = [];
    const visited = new Set<string>();
    const queue: string[] = [start];
    visited.add(start);

    steps.push({
        visited: [start],
        current: null,
        frontier: [start],
        distances: {},
        predecessors: {},
        message: `Mulai BFS dari node ${start}. Enqueue ${start}.`,
        done: false,
    });

    while (queue.length > 0) {
        const node = queue.shift()!;

        steps.push({
            visited: Array.from(visited),
            current: node,
            frontier: [...queue],
            distances: {},
            predecessors: {},
            message: `Dequeue ${node}. Periksa tetangga yang belum dikunjungi.`,
            done: false,
        });

        const neighbors = getNeighbors(node);
        let foundNew = false;
        for (const nb of neighbors) {
            if (!visited.has(nb)) {
                visited.add(nb);
                queue.push(nb);
                foundNew = true;
                steps.push({
                    visited: Array.from(visited),
                    current: node,
                    frontier: [...queue],
                    distances: {},
                    predecessors: {},
                    message: `Enqueue ${nb} (tetangga ${node}). visited = {${Array.from(visited).join(", ")}}, queue = [${queue.join(", ")}]`,
                    done: false,
                });
            }
        }

        if (!foundNew) {
            steps.push({
                visited: Array.from(visited),
                current: node,
                frontier: [...queue],
                distances: {},
                predecessors: {},
                message: `Node ${node} selesai diproses (semua tetangga sudah dikunjungi).`,
                done: false,
            });
        }
    }

    steps.push({
        visited: Array.from(visited),
        current: null,
        frontier: [],
        distances: {},
        predecessors: {},
        message: `BFS selesai! Semua node yang reachable dari ${start} telah dikunjungi (${visited.size} node).`,
        done: true,
    });

    return steps;
}

function generateDFSSteps(start: string): Step[] {
    const steps: Step[] = [];
    const visited = new Set<string>();
    const stack: string[] = [start];

    steps.push({
        visited: [],
        current: null,
        frontier: [start],
        distances: {},
        predecessors: {},
        message: `Mulai DFS dari node ${start}. Push ${start} ke stack.`,
        done: false,
    });

    while (stack.length > 0) {
        const node = stack.pop()!;

        if (visited.has(node)) continue;
        visited.add(node);

        steps.push({
            visited: Array.from(visited),
            current: node,
            frontier: [...stack],
            distances: {},
            predecessors: {},
            message: `Pop ${node} dari stack. Tandai visited. Tetangga: ${getNeighbors(node).join(", ")}`,
            done: false,
        });

        const neighbors = getNeighbors(node);
        const unvisited = neighbors.filter((nb) => !visited.has(nb) && !stack.includes(nb));

        if (unvisited.length > 0) {
            for (const nb of unvisited) {
                stack.push(nb);
            }
            steps.push({
                visited: Array.from(visited),
                current: node,
                frontier: [...stack],
                distances: {},
                predecessors: {},
                message: `Push ${unvisited.join(", ")} ke stack. Stack = [${stack.join(", ")}]`,
                done: false,
            });
        } else {
            steps.push({
                visited: Array.from(visited),
                current: node,
                frontier: [...stack],
                distances: {},
                predecessors: {},
                message: `Node ${node}: semua tetangga sudah visited. Backtrack.`,
                done: false,
            });
        }
    }

    steps.push({
        visited: Array.from(visited),
        current: null,
        frontier: [],
        distances: {},
        predecessors: {},
        message: `DFS selesai! Semua node reachable dari ${start} telah dikunjungi (${visited.size} node).`,
        done: true,
    });

    return steps;
}

function generateDijkstraSteps(start: string): Step[] {
    const steps: Step[] = [];
    const visited = new Set<string>();
    const dist: Record<string, number> = {};
    const pred: Record<string, string | null> = {};
    const unvisited: string[] = [];

    for (const n of NODES) {
        dist[n.id] = n.id === start ? 0 : Infinity;
        pred[n.id] = null;
        unvisited.push(n.id);
    }

    steps.push({
        visited: [],
        current: null,
        frontier: [start],
        distances: { ...dist },
        predecessors: { ...pred },
        message: `Mulai Dijkstra dari ${start}. Jarak ${start} = 0, semua node lain = \u221e`,
        done: false,
    });

    while (unvisited.length > 0) {
        unvisited.sort((a, b) => dist[a] - dist[b]);
        const current = unvisited.shift()!;
        if (dist[current] === Infinity) break;

        visited.add(current);

        steps.push({
            visited: Array.from(visited),
            current,
            frontier: [...unvisited],
            distances: { ...dist },
            predecessors: { ...pred },
            message: `Pilih node dengan jarak terkecil: ${current} (jarak=${dist[current]}). Tandai visited.`,
            done: false,
        });

        const neighbors = getNeighbors(current);
        for (const nb of neighbors) {
            if (!visited.has(nb)) {
                const newDist = dist[current] + getEdgeWeight(current, nb);
                if (newDist < dist[nb]) {
                    dist[nb] = newDist;
                    pred[nb] = current;
                    steps.push({
                        visited: Array.from(visited),
                        current,
                        frontier: [...unvisited],
                        distances: { ...dist },
                        predecessors: { ...pred },
                        message: `Update jarak ${nb} = ${dist[current]} + ${getEdgeWeight(current, nb)} = ${newDist} (via ${current})`,
                        done: false,
                    });
                }
            }
        }
    }

    steps.push({
        visited: Array.from(visited),
        current: null,
        frontier: [],
        distances: { ...dist },
        predecessors: { ...pred },
        message: `Dijkstra selesai! Jarak terpendek dari ${start} ke semua node telah ditemukan.`,
        done: true,
    });

    return steps;
}

export default function GraphTraversalVisualizer() {
    const [algorithm, setAlgorithm] = useState<Algorithm>("bfs");
    const [startNode, setStartNode] = useState("A");
    const steps = useMemo(() => {
        switch (algorithm) {
            case "bfs": return generateBFSSteps(startNode);
            case "dfs": return generateDFSSteps(startNode);
            case "dijkstra": return generateDijkstraSteps(startNode);
        }
    }, [algorithm, startNode]);

    const [stepIndex, setStepIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1200);

    const current = stepIndex >= 0 ? steps[stepIndex] : null;
    const done = stepIndex >= steps.length - 1;

    const reset = () => {
        setStepIndex(-1);
        setIsPlaying(false);
    };

    const nextStep = () => {
        if (stepIndex < steps.length - 1) setStepIndex((s) => s + 1);
    };

    useEffect(() => {
        reset();
    }, [algorithm, startNode]);

    useEffect(() => {
        if (!isPlaying || done) return;
        const timer = setTimeout(nextStep, speed);
        return () => clearTimeout(timer);
    }, [isPlaying, stepIndex, speed, done]);

    const getNodeState = (nodeId: string) => {
        if (!current) return "unvisited";
        if (current.current === nodeId) return "current";
        if (current.visited.includes(nodeId)) return "visited";
        if (current.frontier.includes(nodeId)) return "frontier";
        return "unvisited";
    };

    const algLabel = algorithm === "bfs" ? "BFS" : algorithm === "dfs" ? "DFS" : "Dijkstra";

    return (
        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Controls + Info */}
                <div className="lg:w-80 space-y-4">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500 text-base">route</span>
                        {algLabel} Traversal
                    </h4>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-primary/10 min-h-[70px]">
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                            {current?.message ?? `Pilih algoritma & mulai untuk melihat proses ${algLabel}.`}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Algoritma</p>
                        <div className="flex gap-2">
                            {(["bfs", "dfs", "dijkstra"] as Algorithm[]).map((alg) => (
                                <button
                                    key={alg}
                                    onClick={() => setAlgorithm(alg)}
                                    className={`flex-1 py-2 px-2 rounded-xl font-black text-xs transition-all border-2 ${
                                        algorithm === alg
                                            ? "bg-red-500 border-red-500 text-white"
                                            : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                                    }`}
                                >
                                    {alg === "bfs" ? "BFS" : alg === "dfs" ? "DFS" : "Dijkstra"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start:</label>
                        <select
                            value={startNode}
                            onChange={(e) => setStartNode(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-xl border-2 border-red-500/30 bg-red-500/5 text-sm font-black text-red-700 dark:text-red-300"
                        >
                            {NODES.map((n) => (
                                <option key={n.id} value={n.id}>{n.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            disabled={done}
                            className={`flex-1 px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                                isPlaying
                                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                    : "bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 disabled:opacity-50"
                            }`}
                        >
                            <span className="material-symbols-outlined text-sm">{isPlaying ? "pause" : "play_arrow"}</span>
                            {isPlaying ? "Jeda" : "Mulai"}
                        </button>
                        <button
                            onClick={nextStep}
                            disabled={isPlaying || done}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-black border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all disabled:opacity-50"
                        >
                            Langkah
                        </button>
                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-black border-2 border-slate-200 dark:border-slate-700 hover:border-red-500/50 transition-all"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Kecepatan:</span>
                        <input
                            type="range"
                            min="400"
                            max="2500"
                            step="100"
                            value={2600 - speed}
                            onChange={(e) => setSpeed(2600 - parseInt(e.target.value))}
                            className="w-24 accent-primary"
                        />
                    </div>

                    <div className="text-center text-xs font-bold text-slate-400">
                        Langkah {Math.max(0, stepIndex + 1)} / {steps.length}
                    </div>

                    {/* Frontier display */}
                    {current && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-white/10">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                                {algorithm === "bfs" ? "Queue (FIFO)" : algorithm === "dfs" ? "Stack (LIFO)" : "Unvisited Nodes"}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {current.frontier.length === 0 ? (
                                    <span className="text-xs text-slate-600 italic">(empty)</span>
                                ) : (
                                    current.frontier.map((nid) => (
                                        <span key={nid} className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-md text-xs font-black">
                                            {nid}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Distance table for Dijkstra */}
                    {algorithm === "dijkstra" && current && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-white/10">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Distance Table</p>
                            <div className="font-mono text-xs space-y-0.5">
                                {NODES.map((n) => (
                                    <div key={n.id} className="flex justify-between text-slate-300">
                                        <span className="text-slate-500">{n.id}</span>
                                        <span className={current.distances[n.id] === Infinity ? "text-slate-600" : "text-emerald-400"}>
                                            {current.distances[n.id] === Infinity ? "\u221e" : current.distances[n.id]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Color legend */}
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-500/30"></div>
                            <span className="text-[10px] font-bold text-slate-500">Current</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="text-[10px] font-bold text-slate-500">Visited</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <span className="text-[10px] font-bold text-slate-500">Frontier</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                            <span className="text-[10px] font-bold text-slate-500">Unvisited</span>
                        </div>
                    </div>
                </div>

                {/* Right: Graph visualization */}
                <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-primary/5 min-h-[320px] flex items-center justify-center p-4 overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 680 280" className="w-full max-h-[280px]">
                        {/* Edges */}
                        {EDGES.map((edge, idx) => {
                            const from = NODES.find((n) => n.id === edge.from)!;
                            const to = NODES.find((n) => n.id === edge.to)!;
                            const isActive = current?.current === edge.from || current?.current === edge.to;
                            return (
                                <g key={idx}>
                                    <line
                                        x1={from.x}
                                        y1={from.y}
                                        x2={to.x}
                                        y2={to.y}
                                        stroke={isActive ? "currentColor" : "currentColor"}
                                        strokeWidth={isActive ? "3" : "1.5"}
                                        className={isActive ? "text-red-400" : "text-slate-300 dark:text-slate-700"}
                                    />
                                    <text
                                        x={(from.x + to.x) / 2}
                                        y={(from.y + to.y) / 2 - 8}
                                        textAnchor="middle"
                                        className="text-xs fill-slate-400 dark:fill-slate-500 font-black"
                                    >
                                        {edge.weight}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Nodes */}
                        {NODES.map((n) => {
                            const state = getNodeState(n.id);
                            const fillClass = state === "current"
                                ? "fill-red-500 stroke-red-600"
                                : state === "visited"
                                    ? "fill-emerald-500 stroke-emerald-600"
                                    : state === "frontier"
                                        ? "fill-amber-400 stroke-amber-500"
                                        : "fill-slate-200 dark:fill-slate-700 stroke-slate-300 dark:stroke-slate-600";
                            const textClass = state === "unvisited"
                                ? "fill-slate-500 dark:fill-slate-400"
                                : "fill-white";
                            return (
                                <g key={n.id}>
                                    <motion.circle
                                        cx={n.x}
                                        cy={n.y}
                                        r="24"
                                        className={fillClass}
                                        strokeWidth="3"
                                        animate={{
                                            scale: state === "current" ? 1.15 : 1,
                                            transition: { duration: 0.3 },
                                        }}
                                    />
                                    <text
                                        x={n.x}
                                        y={n.y}
                                        dy=".35em"
                                        textAnchor="middle"
                                        className={`text-sm font-black pointer-events-none ${textClass}`}
                                    >
                                        {n.label}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
}
