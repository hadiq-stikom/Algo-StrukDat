"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import PresentationMode from "@/components/PresentationMode";
import GraphVisualizer from "./GraphVisualizer";

export default function Module13Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const graphTraceData = [
        { step: "Awal", action: "Buat graph kosong", result: "{} (0 node, 0 edge)" },
        { step: "add_node('A')", action: "Tambah node A", result: "Nodes: {A}" },
        { step: "add_node('B')", action: "Tambah node B", result: "Nodes: {A, B}" },
        { step: "add_node('C')", action: "Tambah node C", result: "Nodes: {A, B, C}" },
        { step: "add_edge(A, B)", action: "Hubungkan A \u2192 B", result: "A: [B], B: [A]" },
        { step: "add_edge(A, C)", action: "Hubungkan A \u2192 C", result: "A: [B, C], C: [A]" },
        { step: "add_edge(B, C)", action: "Hubungkan B \u2192 C", result: "B: [A, C], C: [A, B]" },
    ];

    const graphIntroSteps = [
        { icon: "social_distance", title: "Social Network", desc: "Node = orang, Edge = pertemanan.", color: "text-sky-500", bg: "bg-sky-500/10 border-sky-500/30" },
        { icon: "directions", title: "GPS Navigation", desc: "Node = persimpangan, Edge = jalan + bobot jarak.", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" },
        { icon: "language", title: "World Wide Web", desc: "Node = halaman web, Edge = hyperlink.", color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/30" },
    ];

    const graphCoreSteps = [
        "Node/Vertex: entitas atau objek dalam graph",
        "Edge: koneksi/hubungan antar node",
        "Degree: jumlah edge yang terhubung ke node",
        "Path: urutan node dari sumber ke tujuan",
        "Cycle: path yang kembali ke node asal",
    ];

    const graphTypeSteps = [
        "Undirected: edge dua arah (contoh: pertemanan FB)",
        "Directed (Digraph): edge satu arah (contoh: follower Twitter)",
        "Weighted: edge punya bobot (contoh: jarak jalan)",
        "Unweighted: edge tanpa bobot (contoh: jaringan sosial)",
        "Cyclic: mengandung cycle (lingkaran)",
        "Acyclic: tanpa cycle — DAG (contoh: prerequisite)",
    ];

    const ExerciseData = [
        {
            question: "Sebuah graph memiliki 5 node (A, B, C, D, E) dengan edge: A-B, A-C, B-D, C-D, D-E.\n\nHitung degree setiap node dan identifikasi graph ini directed atau undirected!",
            answer: "Undirected, deg(A)=2, deg(B)=2, deg(C)=2, deg(D)=3, deg(E)=1",
            explanation: "Karena edge ditulis A-B (bukan A\u2192B), ini undirected.\nDegree A: A-B, A-C = 2\nDegree B: A-B, B-D = 2\nDegree C: A-C, C-D = 2\nDegree D: B-D, C-D, D-E = 3\nDegree E: D-E = 1\nTotal edge = 5, total degree = 10 = 2\u00d75 \u2713",
            color: "sky",
        },
        {
            question: "Kapan kita memilih Adjacency List dibanding Adjacency Matrix? Jelaskan trade-off dalam kompleksitas waktu dan ruang!",
            answer: "List untuk sparse, Matrix untuk dense graph",
            explanation: "ADJACENCY LIST: Space O(V+E), cek edge O(deg(V)), get neighbors O(1).\nCocok untuk SPARSE graph (E << V\u00b2).\n\nADJACENCY MATRIX: Space O(V\u00b2), cek edge O(1), get neighbors O(V).\nCocok untuk DENSE graph (E \u2248 V\u00b2).\n\nRule of thumb: jika graph memiliki < 20% edge dari total kemungkinan, pakai List.",
            color: "emerald",
        },
        {
            question: "Apa perbedaan Tree dengan Graph? Bisakah Graph disebut sebagai Tree?",
            answer: "Tree adalah Graph khusus (acyclic, connected)",
            explanation: "SEMUA Tree adalah Graph, tapi TIDAK semua Graph adalah Tree.\n\nPersyaratan Tree:\n1) Undirected\n2) Connected (semua node terhubung)\n3) Acyclic (tidak ada cycle)\n4) V - 1 edges (tepat)\n\nGraph bisa: disconnected, cyclic, directed, punya > V-1 edges.\n\nContoh: hirarki organisasi = Tree, jaringan jalan = Graph (bisa cycle).",
            color: "purple",
        },
    ];

    const ExerciseCard = ({ item, isPresentation = false, password = "" }: { item: { question: string; answer: string; explanation: string; color: string }; isPresentation?: boolean; password?: string }) => {
        const [showAnswer, setShowAnswer] = useState(false);
        const [inputPassword, setInputPassword] = useState("");
        const [error, setError] = useState(false);
        const colorClass = item.color === "sky" ? "sky" : item.color === "emerald" ? "emerald" : "purple";

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

    const GraphClassCode = () => (
        <code>
            <span className="text-cyan-400">class</span> <span className="text-blue-400">Graph</span>:<br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-cyan-400">self</span>):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.adj_list = &#123;&#125;&nbsp;&nbsp;<span className="text-slate-500"># &#123;node: [neighbors]&#125;</span><br />
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">add_node</span>(<span className="text-cyan-400">self</span>, node):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> node <span className="text-cyan-400">not in</span> <span className="text-cyan-400">self</span>.adj_list:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.adj_list[node] = []<br />
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">add_edge</span>(<span className="text-cyan-400">self</span>, u, v):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.adj_list[u].append(v)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.adj_list[v].append(u)&nbsp;&nbsp;<span className="text-slate-500"># undirected</span><br />
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">display</span>(<span className="text-cyan-400">self</span>):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">for</span> node, neighbors <span className="text-cyan-400">in</span> <span className="text-cyan-400">self</span>.adj_list.items():<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">print</span>(<span className="text-amber-300">f</span><span className="text-lime-400">"&#123;node&#125;: &#123;neighbors&#125;"</span>)
        </code>
    );

    const GraphMatrixCode = () => (
        <code>
            <span className="text-cyan-400">class</span> <span className="text-blue-400">GraphMatrix</span>:<br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-cyan-400">self</span>, size):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.size = size<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.matrix = [[<span className="text-amber-300">0</span>] * size <span className="text-cyan-400">for</span> _ <span className="text-cyan-400">in</span> <span className="text-blue-400">range</span>(size)]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.nodes = &#123;&#125;&nbsp;&nbsp;<span className="text-slate-500"># label &rarr; index</span><br />
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">add_node</span>(<span className="text-cyan-400">self</span>, label):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;idx = <span className="text-blue-400">len</span>(<span className="text-cyan-400">self</span>.nodes)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.nodes[label] = idx<br />
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400">def</span> <span className="text-blue-400">add_edge</span>(<span className="text-cyan-400">self</span>, u, v):<br />
            &nbsp;&nbsp;&nbsp;&nbsp;i, j = <span className="text-cyan-400">self</span>.nodes[u], <span className="text-cyan-400">self</span>.nodes[v]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.matrix[i][j] = <span className="text-amber-300">1</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">self</span>.matrix[j][i] = <span className="text-amber-300">1</span>&nbsp;&nbsp;<span className="text-slate-500"># undirected</span>
        </code>
    );

    const GraphDiagram = () => (
        <div className="mx-auto max-w-2xl">
            <div className="mb-4 text-sm font-bold text-slate-700 dark:text-slate-300 text-center">Contoh Graph sederhana: node dan koneksi antar node</div>
            <div className="relative aspect-[4/3] rounded-3xl bg-slate-950/80 border border-slate-800 overflow-hidden">
                <svg viewBox="0 0 320 240" className="w-full h-full">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                        </marker>
                    </defs>
                    <line x1="70" y1="70" x2="180" y2="70" stroke="#38bdf8" strokeWidth="4" />
                    <line x1="70" y1="70" x2="120" y2="160" stroke="#38bdf8" strokeWidth="4" />
                    <line x1="180" y1="70" x2="240" y2="130" stroke="#38bdf8" strokeWidth="4" />
                    <line x1="120" y1="160" x2="240" y2="130" stroke="#38bdf8" strokeWidth="4" />
                    <circle cx="70" cy="70" r="22" fill="#38bdf8" opacity="0.95" />
                    <circle cx="180" cy="70" r="22" fill="#f97316" opacity="0.95" />
                    <circle cx="120" cy="160" r="22" fill="#22c55e" opacity="0.95" />
                    <circle cx="240" cy="130" r="22" fill="#a855f7" opacity="0.95" />
                    <text x="70" y="76" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800">A</text>
                    <text x="180" y="76" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800">B</text>
                    <text x="120" y="166" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800">C</text>
                    <text x="240" y="136" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800">D</text>
                    <text x="100" y="40" textAnchor="middle" fill="#cbd5e1" fontSize="12">A - B</text>
                    <text x="135" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="12">A - C</text>
                    <text x="210" y="40" textAnchor="middle" fill="#cbd5e1" fontSize="12">B - D</text>
                    <text x="190" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="12">C - D</text>
                </svg>
            </div>
        </div>
    );

    const GraphMatrixExample = ({
        title,
        code,
        variant,
    }: {
        title: string;
        code: string;
        variant: "undirected" | "directed-unweighted" | "undirected-weighted" | "directed-weighted";
    }) => (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] items-start rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-xl">
            <div className="rounded-3xl bg-slate-900 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-3">{title}</div>
                <pre className="overflow-x-auto text-sm font-mono leading-relaxed">{code}</pre>
            </div>
            <GraphMatrixDiagram variant={variant} />
        </div>
    );

    const GraphMatrixDiagram = ({
        variant,
    }: {
        variant: "undirected" | "directed-unweighted" | "undirected-weighted" | "directed-weighted";
    }) => {
        const titleMap: Record<typeof variant, string> = {
            "undirected": "Undirected Unweighted",
            "directed-unweighted": "Directed Unweighted",
            "undirected-weighted": "Undirected Weighted",
            "directed-weighted": "Directed Weighted",
        };

        return (
            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-4 text-slate-100 shadow-xl">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-3">{titleMap[variant]} Diagram</div>
                <svg viewBox="0 0 220 140" className="w-full h-auto">
                    <defs>
                        <marker id="arrow-directed-unweighted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="strokeWidth" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                        </marker>
                        <marker id="arrow-directed-weighted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="strokeWidth" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                        </marker>
                    </defs>
                    {variant === "undirected" && (
                        <>
                            <line x1="45" y1="35" x2="175" y2="35" stroke="#38bdf8" strokeWidth="3" />
                            <line x1="45" y1="35" x2="45" y2="105" stroke="#38bdf8" strokeWidth="3" />
                            <line x1="175" y1="35" x2="175" y2="105" stroke="#38bdf8" strokeWidth="3" />
                            <line x1="45" y1="105" x2="175" y2="105" stroke="#38bdf8" strokeWidth="3" />
                            <circle cx="45" cy="35" r="16" fill="#38bdf8" />
                            <circle cx="175" cy="35" r="16" fill="#f97316" />
                            <circle cx="45" cy="105" r="16" fill="#22c55e" />
                            <circle cx="175" cy="105" r="16" fill="#a855f7" />
                            <text x="45" y="40" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">A</text>
                            <text x="175" y="40" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">B</text>
                            <text x="45" y="110" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">C</text>
                            <text x="175" y="110" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">D</text>
                        </>
                    )}
                    {variant === "directed-unweighted" && (
                        <>
                            <line x1="40" y1="40" x2="164" y2="40" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-directed-unweighted)" />
                            <line x1="168" y1="42" x2="114" y2="104" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-directed-unweighted)" />
                            <line x1="110" y1="104" x2="50" y2="50" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-directed-unweighted)" />
                            <circle cx="40" cy="40" r="16" fill="#38bdf8" />
                            <circle cx="180" cy="40" r="16" fill="#f97316" />
                            <circle cx="110" cy="110" r="16" fill="#22c55e" />
                            <text x="40" y="45" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">X</text>
                            <text x="180" y="45" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">Y</text>
                            <text x="110" y="115" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">Z</text>
                        </>
                    )}
                    {variant === "undirected-weighted" && (
                        <>
                            <line x1="40" y1="70" x2="100" y2="70" stroke="#38bdf8" strokeWidth="3" />
                            <line x1="100" y1="70" x2="160" y2="70" stroke="#38bdf8" strokeWidth="3" />
                            <circle cx="40" cy="70" r="16" fill="#38bdf8" />
                            <circle cx="100" cy="70" r="16" fill="#22c55e" />
                            <circle cx="160" cy="70" r="16" fill="#f97316" />
                            <text x="40" y="75" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">A</text>
                            <text x="100" y="75" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">B</text>
                            <text x="160" y="75" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">C</text>
                            <text x="70" y="60" fill="#cbd5e1" fontSize="11" textAnchor="middle">4</text>
                            <text x="130" y="60" fill="#cbd5e1" fontSize="11" textAnchor="middle">2</text>
                        </>
                    )}
                    {variant === "directed-weighted" && (
                        <>
                            <line x1="40" y1="40" x2="180" y2="40" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-directed-weighted)" />
                            <line x1="40" y1="40" x2="110" y2="110" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-directed-weighted)" />
                            <line x1="110" y1="110" x2="180" y2="40" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-directed-weighted)" />
                            <circle cx="40" cy="40" r="16" fill="#38bdf8" />
                            <circle cx="180" cy="40" r="16" fill="#f97316" />
                            <circle cx="110" cy="110" r="16" fill="#22c55e" />
                            <text x="40" y="45" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">X</text>
                            <text x="180" y="45" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">Y</text>
                            <text x="110" y="115" fill="#ffffff" fontSize="14" fontWeight="700" textAnchor="middle">Z</text>
                            <text x="110" y="28" fill="#cbd5e1" fontSize="11" textAnchor="middle">5</text>
                            <text x="80" y="80" fill="#cbd5e1" fontSize="11" textAnchor="middle">3</text>
                            <text x="160" y="80" fill="#cbd5e1" fontSize="11" textAnchor="middle">2</text>
                        </>
                    )}
                </svg>
            </div>
        );
    };

    const GraphMatrixExamples = () => {
        const examples = [
            {
                title: "Undirected Unweighted",
                variant: "undirected" as const,
                code: `matrix = [\n  [0, 1, 1, 0],\n  [1, 0, 0, 1],\n  [1, 0, 0, 1],\n  [0, 1, 1, 0],\n]`,
            },
            {
                title: "Directed Unweighted",
                variant: "directed-unweighted" as const,
                code: `matrix = [\n  [0, 1, 0],\n  [0, 0, 1],\n  [1, 0, 0],\n]`,
            },
            {
                title: "Undirected Weighted",
                variant: "undirected-weighted" as const,
                code: `matrix = [\n  [0, 4, 0],\n  [4, 0, 2],\n  [0, 2, 0],\n]`,
            },
            {
                title: "Directed Weighted",
                variant: "directed-weighted" as const,
                code: `matrix = [\n  [0, 5, 0],\n  [0, 0, 3],\n  [2, 0, 0],\n]`,
            },
        ];
        return (
            <div className="space-y-6">
                {examples.map((example) => (
                    <GraphMatrixExample
                        key={example.title}
                        title={example.title}
                        variant={example.variant}
                        code={example.code}
                    />
                ))}
            </div>
        );
    };


    const GraphLinkedListDiagram = () => (
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 text-slate-100 shadow-xl">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400 mb-3">Ilustrasi Linked List</div>
            <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-sky-500 grid place-items-center text-white font-bold">A</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-100">B</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-100">C</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-slate-500">null</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-rose-500 grid place-items-center text-white font-bold">B</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-100">A</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-100">D</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-slate-500">null</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 grid place-items-center text-white font-bold">C</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-100">A</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-100">D</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-slate-500">null</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-purple-500 grid place-items-center text-white font-bold">D</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-100">B</span>
                    <span className="text-slate-400">→</span>
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-100">C</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-slate-500">null</span>
                </div>
            </div>
        </div>
    );

    const GraphLinkedListCode = () => (
        <code>
            <span className="text-cyan-400"># Representasi Graph dengan Linked List</span><br />
            A: B -&gt; C -&gt; null<br />
            B: A -&gt; D -&gt; null<br />
            C: A -&gt; D -&gt; null<br />
            D: B -&gt; C -&gt; null<br />
            <br />
            <span className="text-cyan-400"># Jika weighted, setiap node menyimpan bobot</span><br />
            A: (B, 4) -&gt; (C, 2) -&gt; null<br />
            B: (A, 4) -&gt; (D, 1) -&gt; null<br />
        </code>
    );

    const slides = [
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-sky-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-sky-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-sky-500">hub</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Struktur Data Graph</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                &ldquo;Menghubungkan titik-titik — kekuatan representasi relasional&rdquo;
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                {graphIntroSteps.map((item, i) => (
                    <div key={i} className={`p-8 rounded-3xl border-4 ${item.bg} flex flex-col items-center text-center shadow-xl`}>
                        <span className={`material-symbols-outlined text-5xl ${item.color} mb-4`}>{item.icon}</span>
                        <h4 className={`font-black text-xl mb-3 ${item.color}`}>{item.title}</h4>
                        <p className="text-lg text-slate-700 dark:text-slate-200 font-bold">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>,

        <div key="s2" className="space-y-8">
            <div className="bg-sky-500/10 p-10 border-4 border-sky-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-sky-500 text-white font-black px-4 py-2 rounded-xl">KONSEP 1</span>
                    <h4 className="text-5xl font-black text-sky-600 italic">Komponen Graph</h4>
                </div>
                <div className="space-y-4">
                    {graphCoreSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-2xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-xl font-bold text-sky-700">Graph G = (V, E) | V = node, E = edge</p>
            </div>
        </div>,

        <div key="s3" className="space-y-8">
            <div className="bg-emerald-500/10 p-10 border-4 border-emerald-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-emerald-500 text-white font-black px-4 py-2 rounded-xl">KONSEP 2</span>
                    <h4 className="text-5xl font-black text-emerald-600 italic">Jenis-Jenis Graph</h4>
                </div>
                <div className="space-y-3">
                    {graphTypeSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
            </div>
        </div>,

        <div key="s4" className="space-y-6">
            <h3 className="text-3xl font-black text-center uppercase italic">Implementasi Graph — Python</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-sky-500/20 shadow-2xl">
                <pre className="p-8 text-xl font-mono overflow-x-auto"><code className="text-slate-200"><GraphClassCode /></code></pre>
            </div>
        </div>,

        <div key="s5" className="space-y-6">
            <h3 className="text-3xl font-black text-center uppercase italic">Adjacency Matrix — Python</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-rose-500/20 shadow-2xl">
                <pre className="p-8 text-xl font-mono overflow-x-auto"><code className="text-slate-200"><GraphMatrixCode /></code></pre>
            </div>
        </div>,

        <div key="s6" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black uppercase italic">Graph Visualizer</h3>
            <div className="w-full max-w-5xl p-8 rounded-3xl border-4 border-sky-500/20 shadow-2xl bg-white dark:bg-slate-950">
                <GraphVisualizer />
            </div>
        </div>,

        <div key="s7" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center uppercase italic">Kompleksitas Representasi Graph</h3>
            <div className="overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl bg-slate-900 text-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/10 font-black">
                        <tr>
                            <th className="px-5 py-3">Operasi</th>
                            <th className="px-5 py-3 text-sky-400">Adjacency List</th>
                            <th className="px-5 py-3 text-rose-400">Adjacency Matrix</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-bold">
                        {[
                            { a: "Space", l: "O(V + E)", m: "O(V\u00b2)" },
                            { a: "Add Vertex", l: "O(1)", m: "O(V\u00b2)" },
                            { a: "Add Edge", l: "O(1)", m: "O(1)" },
                            { a: "Remove Edge", l: "O(E)", m: "O(1)" },
                            { a: "Check Edge", l: "O(deg(V))", m: "O(1)" },
                            { a: "Get Neighbors", l: "O(1)", m: "O(V)" },
                        ].map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-5 py-3 text-slate-400">{row.a}</td>
                                <td className="px-5 py-3 text-sky-300">{row.l}</td>
                                <td className="px-5 py-3 text-rose-300">{row.m}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-sm text-slate-500 italic text-center">* Pilih representasi berdasarkan kerapatan graph (sparse vs dense)</p>
        </div>,

        <div key="s8" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center uppercase italic">Perbandingan List vs Matrix</h3>
            <div className="overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl bg-slate-900 text-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/10 font-black">
                        <tr>
                            <th className="px-5 py-3">Aspek</th>
                            <th className="px-5 py-3 text-sky-400">Adjacency List</th>
                            <th className="px-5 py-3 text-rose-400">Adjacency Matrix</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-bold">
                        {[
                            { a: "Cocok untuk", l: "Sparse graph", m: "Dense graph" },
                            { a: "Memory", l: "Irit (dynamic)", m: "Boros (fixed V\u00b2)" },
                            { a: "Cek koneksi", l: "Linear search", m: "O(1) langsung" },
                            { a: "Traverse neighbor", l: "Cepat (list)", m: "Lambat (scan V)" },
                            { a: "Tambah node", l: "Mudah", m: "Re-build matriks" },
                        ].map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-5 py-3 text-slate-400">{row.a}</td>
                                <td className="px-5 py-3 text-sky-300">{row.l}</td>
                                <td className="px-5 py-3 text-rose-300">{row.m}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,

        <div key="s9" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center uppercase italic">Graph — Struktur Data Lain</h3>
            <div className="overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl bg-slate-900 text-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/10 font-black">
                        <tr>
                            <th className="px-5 py-3">Aspek</th>
                            <th className="px-5 py-3 text-sky-400">Graph</th>
                            <th className="px-5 py-3 text-emerald-400">Tree</th>
                            <th className="px-5 py-3 text-slate-400">Linked List</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-bold">
                        {[
                            { a: "Cycle", g: "\u2713 Boleh", t: "\u2717 Tidak", l: "\u2717 Tidak" },
                            { a: "Root", g: "Tidak ada", t: "1 root", l: "1 head" },
                            { a: "Arah", g: "1 atau 2 arah", t: "1 arah (parent\u2192child)", l: "1 arah" },
                            { a: "Koneksi", g: "Banyak\u2192banyak", t: "1 parent\u2192banyak child", l: "1\u21921 berurutan" },
                        ].map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-5 py-3 text-slate-400">{row.a}</td>
                                <td className="px-5 py-3 text-sky-300">{row.g}</td>
                                <td className="px-5 py-3 text-emerald-300">{row.t}</td>
                                <td className="px-5 py-3 text-slate-300">{row.l}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,

        <div key="s10" className="space-y-8 text-center max-w-5xl mx-auto overflow-y-auto max-h-[80vh] p-4">
            <h3 className="text-4xl font-black uppercase italic">Uji Pemahaman</h3>
            <div className="flex justify-center items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-3xl text-sky-500">psychology</span>
            </div>
            {ExerciseData.map((item, i) => (
                <ExerciseCard key={i} item={item} isPresentation={true} />
            ))}
        </div>,

        <div key="s11" className="space-y-6 text-center">
            <h3 className="text-4xl font-black uppercase italic">Tantangan Kelompok</h3>
            <div className="flex justify-center items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-3xl text-primary">groups</span>
            </div>
            <ExerciseCard
                item={{
                    question: "Kota X memiliki 10 lokasi penting (A-J) yang dihubungkan oleh 15 jalan satu arah.\n\nTUGAS:\na) Representasikan sebagai directed graph.\nb) Implementasi dengan adjacency list di Python.\nc) Hitung in-degree dan out-degree setiap node.\nd) Identifikasi node dengan degree tertinggi (paling sibuk).\ne) Apakah graph ini memiliki cycle? Jika ya, sebutkan salah satu.",
                    answer: "Directed graph dengan adjacency list",
                    explanation: "A) A\u2192B, A\u2192C, B\u2192D, C\u2192D, D\u2192E, E\u2192F, F\u2192G, G\u2192H, H\u2192I, I\u2192J, B\u2192J, C\u2192F, D\u2192G, E\u2192H, J\u2192A (15 edges).\nB) IMPLEMENTASI: Graph class dengan directed = True (hapus baris adj_list[v].append(u)).\nC) Lihat hasil running program.\nD) Node dengan degree tertinggi adalah yang paling banyak terhubung.\nE) Cycle: A\u2192C\u2192F\u2192G\u2192H\u2192I\u2192J\u2192A atau A\u2192B\u2192J\u2192A.",
                    color: "sky",
                }}
                isPresentation={true}
                password="psw_jawaban_Src@"
            />
        </div>,

        <div key="s12" className="space-y-8 text-center">
            <div className="bg-emerald-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-emerald-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-emerald-500">task_alt</span>
            </div>
            <h2 className="text-5xl font-black uppercase italic">Materi Selesai!</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-bold italic">
                &ldquo;Graph = Node + Edge. Lanjut ke Module 14: Traversal Graph (BFS &amp; DFS) untuk eksplorasi!&rdquo;
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
                <SectionDivider title="Bagian 1: Apa itu Graph?" slideIndex={0} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-sky-500/30 p-2 rounded-lg text-sky-500">
                                    <span className="material-symbols-outlined text-xl">hub</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Menghubungkan Objek-Objek</h3>
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                Graph adalah struktur data <strong>non-linear</strong> yang terdiri dari <strong>node (vertex)</strong> dan <strong>edge</strong> yang menghubungkan node-node tersebut.
                                Tidak seperti Tree, Graph bisa memiliki <strong>banyak koneksi</strong> antar node, <strong>cycle</strong>, dan <strong>tidak memiliki root</strong>.
                                Ini membuat Graph menjadi struktur data paling fleksibel untuk merepresentasikan hubungan kompleks.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                {graphIntroSteps.map((item, i) => (
                                    <div key={i} className={`p-4 rounded-xl border-2 ${item.bg}`}>
                                        <span className={`material-symbols-outlined text-2xl ${item.color} mb-2 block`}>{item.icon}</span>
                                        <h4 className={`font-black text-sm mb-1 ${item.color}`}>{item.title}</h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <GraphDiagram />
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 2: KOMPONEN GRAPH */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 2: Komponen & Terminologi" slideIndex={1} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-sky-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-sky-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-sky-500 text-white text-xs font-black px-3 py-1 rounded-lg">KONSEP 1</span>
                                        <h4 className="text-2xl font-black text-sky-600 italic">Komponen Graph</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Graph didefinisikan sebagai G = (V, E) di mana V adalah himpunan node dan E adalah himpunan edge.
                                    </p>
                                    <div className="space-y-2">
                                        {graphCoreSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-sky-500/20 text-sky-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-sky-500/5 rounded-xl border border-sky-500/20">
                                        <p className="text-xs font-bold text-sky-700 dark:text-sky-300">Graph G = (V, E) | V = &#123; &#125; | E = &#123; &#125;</p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><GraphClassCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 3: JENIS GRAPH */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 3: Jenis-Jenis Graph" slideIndex={2} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-emerald-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-emerald-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-lg">KONSEP 2</span>
                                        <h4 className="text-2xl font-black text-emerald-600 italic">Klasifikasi Graph</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Graph diklasifikasikan berdasarkan arah edge, bobot, dan keberadaan cycle.
                                    </p>
                                    <div className="space-y-2">
                                        {graphTypeSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-emerald-500/20 text-emerald-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-amber-500/10 rounded-xl border border-amber-500/30">
                                        <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                                            &#9888;&#65039; DAG (Directed Acyclic Graph) sangat penting untuk scheduling &amp; dependency!
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><GraphMatrixCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 4: REPRESENTASI */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 4: Representasi Graph" slideIndex={3} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-rose-500/30 p-2 rounded-lg text-rose-500">
                                    <span className="material-symbols-outlined text-xl">grid_on</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Adjacency List vs Matrix</h3>
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                Dua cara utama merepresentasikan graph: <strong>Adjacency List</strong> menyimpan tetangga setiap node dalam list,
                                sedangkan <strong>Adjacency Matrix</strong> menggunakan matriks 2D V&times;V. Pilihan tergantung pada <strong>kerapatan (density)</strong> graph.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl">
                                    <h4 className="font-black text-sky-600 mb-2">Adjacency List</h4>
                                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside font-medium">
                                        <li>Space: O(V + E) — efisien</li>
                                        <li>Cocok untuk sparse graph</li>
                                        <li>Get neighbors: O(1)</li>
                                        <li>Check edge: O(deg(V))</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                                    <h4 className="font-black text-rose-600 mb-2">Adjacency Matrix</h4>
                                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside font-medium">
                                        <li>Space: O(V&sup2;) — boros</li>
                                        <li>Cocok untuk dense graph</li>
                                        <li>Get neighbors: O(V)</li>
                                        <li>Check edge: O(1) langsung</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="rounded-3xl border border-slate-200/10 bg-slate-950 p-5 text-slate-100 shadow-xl">
                                    <h4 className="font-black text-xl text-cyan-300 mb-4">Representasi Array (Matrix)</h4>
                                    <GraphMatrixExamples />
                                    <p className="mt-3 text-xs text-slate-400">Contoh representasi graph dalam bentuk matriks untuk graph directed, undirected, weighted, dan unweighted.</p>
                                </div>
                                <div className="rounded-3xl border border-slate-200/10 bg-slate-950 p-5 text-slate-100 shadow-xl">
                                    <h4 className="font-black text-xl text-emerald-300 mb-4">Representasi Linked List</h4>
                                    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                                        <div className="rounded-3xl bg-slate-900 p-4">
                                            <pre className="overflow-x-auto text-sm font-mono leading-relaxed"><GraphLinkedListCode /></pre>
                                        </div>
                                        <GraphLinkedListDiagram />
                                    </div>
                                    <p className="mt-3 text-xs text-slate-400">Linked list memungkinkan setiap node menyimpan daftar tetangga secara berurutan, termasuk bobot jika diperlukan.</p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 5: TRACING */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 5: Tracing Graph" slideIndex={4} />
                <ScrollReveal>
                    <FocusSection>
                        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing — Membangun Graph Step-by-Step</div>
                            <table className="w-full text-sm font-bold">
                                <thead className="bg-slate-100 dark:bg-slate-900 border-b-2">
                                    <tr>
                                        <th className="px-4 py-3">Step</th>
                                        <th className="px-4 py-3">Aksi</th>
                                        <th className="px-4 py-3 text-sky-600">State Graph</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-primary/5">
                                    {graphTraceData.map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-3">{row.step}</td>
                                            <td className="px-4 py-3 text-slate-500">{row.action}</td>
                                            <td className="px-4 py-3 font-mono">{row.result}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 italic mt-4 ml-1">Setiap edge undirected menambah 2 entries di adjacency list (u\u2192v dan v\u2192u).</p>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 6: VISUALIZER */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 6: Simulasi Interaktif" slideIndex={5} />
                <ScrollReveal>
                    <FocusSection>
                        <GraphVisualizer />
                        <p className="text-center text-[10px] text-slate-500 font-bold italic mt-4">
                            Gunakan simulator di atas untuk membangun graph sendiri. Coba toggle Directed/Weighted untuk melihat perbedaannya!
                        </p>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 7: KOMPLEKSITAS */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 7: Kompleksitas & Perbandingan" slideIndex={6} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 text-white">
                            <h4 className="text-xl font-black mb-6">Perbandingan Representasi Graph</h4>
                            <div className="overflow-x-auto rounded-xl border border-white/10 mb-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 font-black border-b border-white/10">
                                        <tr>
                                            <th className="px-5 py-3">Operasi</th>
                                            <th className="px-5 py-3 text-sky-400">Adjacency List</th>
                                            <th className="px-5 py-3 text-rose-400">Adjacency Matrix</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10 font-bold italic">
                                        {[
                                            { a: "Space", l: "O(V + E)", m: "O(V\u00b2)" },
                                            { a: "Add Vertex", l: "O(1)", m: "O(V\u00b2)*" },
                                            { a: "Add Edge", l: "O(1)", m: "O(1)" },
                                            { a: "Remove Edge", l: "O(E)", m: "O(1)" },
                                            { a: "Check Edge (u,v)", l: "O(n) linear", m: "O(1) langsung" },
                                            { a: "Get Neighbors(u)", l: "O(1) iterasi", m: "O(V) scan" },
                                            { a: "Traverse All", l: "O(V + E)", m: "O(V\u00b2)" },
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td className="px-5 py-3 text-slate-300">{row.a}</td>
                                                <td className="px-5 py-3 text-sky-300">{row.l}</td>
                                                <td className="px-5 py-3 text-rose-300">{row.m}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-slate-400 italic mb-6">* Add Vertex di Matrix butuh rebuild matriks V+1 x V+1. Praktisnya: alokasi lebih besar dari awal.</p>
                            <div className="grid lg:grid-cols-3 gap-4">
                                <div className="bg-sky-500/10 border border-sky-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-sky-400 mb-2">Gunakan Adjacency List</h6>
                                    <ul className="text-xs text-sky-100/80 space-y-1 list-disc list-inside">
                                        <li>Graph sparse (E &lt;&lt; V\u00b2)</li>
                                        <li>Dynamic (node sering ditambah)</li>
                                        <li>Butuh traverse neighbors cepat</li>
                                    </ul>
                                </div>
                                <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-rose-400 mb-2">Gunakan Adjacency Matrix</h6>
                                    <ul className="text-xs text-rose-100/80 space-y-1 list-disc list-inside">
                                        <li>Graph dense (E \u2248 V\u00b2)</li>
                                        <li>Sering cek edge existence</li>
                                        <li>Bobot edge sering diupdate</li>
                                    </ul>
                                </div>
                                <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-emerald-400 mb-2">Graph vs Tree vs List</h6>
                                    <ul className="text-xs text-emerald-100/80 space-y-1 list-disc list-inside">
                                        <li>Tree = Graph khusus (acyclic)</li>
                                        <li>List = Graph linear</li>
                                        <li>Graph = paling fleksibel</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 8: APLIKASI */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 8: Aplikasi Graph" slideIndex={8} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { icon: "social_distance", title: "Social Media", desc: "Jaringan pertemanan & rekomendasi", color: "bg-blue-500" },
                                { icon: "directions", title: "Navigation", desc: "GPS mencari rute terpendek", color: "bg-emerald-500" },
                                { icon: "language", title: "World Wide Web", desc: "Halaman terhubung via link", color: "bg-purple-500" },
                                { icon: "flight", title: "Transportasi", desc: "Jaringan penerbangan & kereta", color: "bg-orange-500" },
                                { icon: "device_hub", title: "Computer Network", desc: "Topologi jaringan komputer", color: "bg-cyan-500" },
                                { icon: "biotech", title: "Biologi", desc: "Jaringan protein & gen", color: "bg-pink-500" },
                                { icon: "school", title: "Pendidikan", desc: "Prerequisite mata kuliah (DAG)", color: "bg-amber-500" },
                                { icon: "recommend", title: "Rekomendasi", desc: "Sistem rekomendasi produk", color: "bg-rose-500" },
                            ].map((item, i) => (
                                <ScrollReveal key={i} delay={i * 50}>
                                    <div className="bg-white dark:bg-surface border-2 border-primary/10 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center group hover:scale-105 transition-transform">
                                        <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                        </div>
                                        <p className="font-black text-slate-900 dark:text-white uppercase text-sm mb-2">{item.title}</p>
                                        <p className="text-[10px] text-slate-500 font-bold italic leading-relaxed">{item.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 9: UJI PEMAHAMAN */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 9: Uji Pemahaman" slideIndex={9} />
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

            {/* BAGIAN 10: PROJEK */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 10: Projek Kelompok" slideIndex={10} />
                <ScrollReveal>
                    <FocusSection>
                        <div className="max-w-4xl mx-auto">
                            <ExerciseCard
                                item={{
                                    question: "Rancang sistem navigasi untuk kampus dengan 15 gedung.\n\na) Representasikan gedung sebagai node dan jalan sebagai edge (berbobot = jarak meter).\nb) Implementasi Graph class di Python dengan weighted edges.\nc) Tentukan jalur terpendek dari Gedung A ke Gedung O (manual reasoning).\nd) Hitung average degree dari graph yang dibuat.\ne) Apakah graph ini directed atau undirected? Mengapa?",
                                    answer: "Weighted undirected graph untuk navigasi",
                                    explanation: "A) NODE: 15 gedung (A-O). EDGE: jalan antar gedung dengan bobot jarak.\nB) IMPLEMENTASI: tambahkan parameter weight di add_edge.\nC) Jalur terpendek: bisa dengan visual inspection atau algoritma (Module 14).\nD) Average degree = 2E / V. Jika 20 jalan, average degree = 40/15 = 2.67.\nE) UNDIRECTED: jalan kampus biasanya dua arah. Kecuali ada jalan satu arah.\n\nEXTENSION: Bisa dikembangkan dengan Dijkstra (Module 14) untuk shortest path otomatis!",
                                    color: "sky",
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
