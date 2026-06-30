"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import PresentationMode from "@/components/PresentationMode";
import GraphTraversalVisualizer from "./GraphTraversalVisualizer";

export default function Module14Content() {
    const [isPresentationOpen, setIsPresentationOpen] = useState(false);
    const [startSlideIndex, setStartSlideIndex] = useState(0);

    const openPresentation = (index: number = 0) => {
        setStartSlideIndex(index);
        setIsPresentationOpen(true);
    };

    const bfsTraceData = [
        { step: "Init", action: "Enqueue A, visited = {A}", result: "Queue = [A]" },
        { step: "Iter 1", action: "Dequeue A. Cek B, D (unvisited) \u2192 enqueue", result: "Queue = [B, D], visited = {A, B, D}" },
        { step: "Iter 2", action: "Dequeue B. Cek A(v), E(unv) \u2192 enqueue", result: "Queue = [D, E], visited = {A, B, D, E}" },
        { step: "Iter 3", action: "Dequeue D. Cek A(v), E(v), F(unv) \u2192 enqueue", result: "Queue = [E, F], visited = {A, B, D, E, F}" },
        { step: "Iter 4", action: "Dequeue E. Semua visited", result: "Queue = [F], visited = {A, B, D, E, F}" },
        { step: "Iter 5", action: "Dequeue F. Semua visited", result: "Queue = [], visited = {A, B, D, E, F, C}" },
    ];

    const dfsTraceData = [
        { step: "Init", action: "Push A ke stack", result: "Stack = [A]" },
        { step: "Iter 1", action: "Pop A, visited = {A}. Push B, D", result: "Stack = [B, D], visited = {A}" },
        { step: "Iter 2", action: "Pop D, visited = {A, D}. Push E, F", result: "Stack = [B, E, F], visited = {A, D}" },
        { step: "Iter 3", action: "Pop F, visited = {A, D, F}. Push C", result: "Stack = [B, E, C], visited = {A, D, F}" },
        { step: "Iter 4", action: "Pop C, visited = {A, D, F, C}. Backtrack", result: "Stack = [B, E], visited = {A, D, F, C}" },
        { step: "Iter 5", action: "Pop E, visited = {A, D, F, C, E}. Backtrack", result: "Stack = [B], visited = {A, D, F, C, E}" },
        { step: "Iter 6", action: "Pop B, visited = {A, D, F, C, E, B}. Selesai", result: "Stack = [], visited = semua" },
    ];

    const dijkstraTraceData = [
        { step: "Init", action: "dist[A]=0, lainnya=\u221e", result: "Pilih A (jarak terkecil)" },
        { step: "Proses A", action: "Update B=4, D=2, E=7", result: "Pilih D (jarak=2)" },
        { step: "Proses D", action: "Update E=8 (via D, 2+6=8 > 7, skip)", result: "Pilih B (jarak=4)" },
        { step: "Proses B", action: "Update E=5 (4+1=5 < 7), C=7 (4+3=7)", result: "Pilih E (jarak=5)" },
        { step: "Proses E", action: "Update F=7 (5+2=7), C=7 (5+3=8 > 7, skip)", result: "Pilih C (jarak=7) atau F (7)" },
        { step: "Proses C", action: "Update F=12 (7+5=12 > 7, skip)", result: "Selesai. Jarak A\u2192F=7 via A\u2192B\u2192E\u2192F" },
    ];

    const graphIntroSteps = [
        { icon: "explore", title: "Graph Traversal", desc: "Mengunjungi semua node dalam graph secara sistematis.", color: "text-red-500", bg: "bg-red-500/10 border-red-500/30" },
        { icon: "route", title: "Shortest Path", desc: "Menemukan jalur dengan biaya minimum antar node.", color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/30" },
        { icon: "network_check", title: "Graph Analysis", desc: "Connected components, bipartite check, topological sort.", color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30" },
    ];

    const bfsSteps = [
        "Gunakan Queue (FIFO) — First In, First Out",
        "Mulai dari node start, enqueue, tandai visited",
        "Dequeue node, kunjungi semua tetangga yang belum visited",
        "Enqueue tetangga yang belum visited",
        "Ulangi hingga queue kosong",
    ];

    const dfsSteps = [
        "Gunakan Stack (LIFO) — Last In, First Out (atau rekursi)",
        "Mulai dari node start, push ke stack",
        "Pop node, tandai visited, push tetangga yang belum visited",
        "Jika tidak ada tetangga baru \u2192 backtrack (pop berikutnya)",
        "Ulangi hingga stack kosong",
    ];

    const dijkstraSteps = [
        "Inisialisasi: dist[start]=0, dist[node lain]=\u221e",
        "Pilih node dengan jarak terkecil yang belum visited",
        "Update jarak tetangga: dist[nb] = min(dist[nb], dist[cur] + weight(cur, nb))",
        "Tandai node sebagai visited",
        "Ulangi hingga semua node visited atau target tercapai",
    ];

    const ExerciseData = [
        {
            question: "Graph: A-B-C, A-D-E, B-E, D-E-F (undirected, unweighted).\n\nMulai BFS dari A. Urutkan node berdasarkan urutan kunjungan!",
            answer: "A, B, D, C, E, F (atau A, B, D, E, C, F tergantung urutan tetangga)",
            explanation: "BFS level-order:\nLevel 0: A\nLevel 1: B, D (tetangga A)\nLevel 2: C (dari B), E (dari B/D)\nLevel 3: F (dari E)\n\nJadi BFS = A \u2192 B \u2192 D \u2192 C \u2192 E \u2192 F\nUrutan B dan D bisa tertukar tergantung adjacency list.",
            color: "red",
        },
        {
            question: "Apa perbedaan utama BFS dan DFS? Kapan masing-masing lebih cocok digunakan?",
            answer: "BFS pakai Queue (level-order), DFS pakai Stack/recursion (deep-first)",
            explanation: "BFS: cari jalur terpendek di unweighted graph, level-order traversal, cocok untuk social network (6 degrees), web crawler.\nDFS: deteksi cycle, topological sort, backtracking problems (maze, sudoku), cocok untuk decision tree.\n\nSpace: BFS O(V) queue, DFS O(h) stack (h = kedalaman).\nUntuk graph sangat dalam \u2192 BFS lebih aman (tidak overflow stack).",
            color: "rose",
        },
        {
            question: "Dijkstra: Graph A\u2194B(4), A\u2194D(2), B\u2194E(1), D\u2194E(6), E\u2194F(2), B\u2194C(3), C\u2194F(5).\nHitung shortest path dari A ke F!",
            answer: "A\u2192B\u2192E\u2192F, total jarak = 7",
            explanation: "Langkah Dijkstra:\n1) A=0, B=4, D=2, E=7( via A), lainnya=\u221e. Pilih A.\n2) Pilih D(2). E via D=8 > 7 (skip).\n3) Pilih B(4). E via B=5 < 7, update E=5. C via B=7.\n4) Pilih E(5). F via E=7. C via E=8 > 7 (skip).\n5) Pilih C(7) atau F(7).\n6) Selesai. A\u2192F = 7 via A\u2192B\u2192E\u2192F.\n\nPath: A \u2192 B (4) \u2192 E (1) \u2192 F (2) = total 7.",
            color: "orange",
        },
    ];

    const ExerciseCard = ({ item, isPresentation = false, password = "" }: { item: { question: string; answer: string; explanation: string; color: string }; isPresentation?: boolean; password?: string }) => {
        const [showAnswer, setShowAnswer] = useState(false);
        const [inputPassword, setInputPassword] = useState("");
        const [error, setError] = useState(false);
        const colorClass = item.color === "red" ? "red" : item.color === "rose" ? "rose" : "orange";

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

    const BFSCode = () => (
        <code>
            <span className="text-cyan-400">from</span> collections <span className="text-cyan-400">import</span> deque<br />
            <br />
            <span className="text-cyan-400">def</span> <span className="text-blue-400">bfs</span>(graph, start):<br />
            &nbsp;&nbsp;visited = <span className="text-blue-400">set</span>()<br />
            &nbsp;&nbsp;queue = deque([start])<br />
            &nbsp;&nbsp;visited.<span className="text-blue-400">add</span>(start)<br />
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400">while</span> queue:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;node = queue.<span className="text-blue-400">popleft</span>()<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">print</span>(node, end=<span className="text-lime-400">" "</span>)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">for</span> neighbor <span className="text-cyan-400">in</span> graph[node]:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> neighbor <span className="text-cyan-400">not in</span> visited:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited.<span className="text-blue-400">add</span>(neighbor)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue.<span className="text-blue-400">append</span>(neighbor)
        </code>
    );

    const DFSCode = () => (
        <code>
            <span className="text-cyan-400">def</span> <span className="text-blue-400">dfs</span>(graph, node, visited=<span className="text-cyan-400">None</span>):<br />
            &nbsp;&nbsp;<span className="text-cyan-400">if</span> visited <span className="text-cyan-400">is</span> <span className="text-cyan-400">None</span>:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;visited = <span className="text-blue-400">set</span>()<br />
            &nbsp;&nbsp;visited.<span className="text-blue-400">add</span>(node)<br />
            &nbsp;&nbsp;<span className="text-blue-400">print</span>(node, end=<span className="text-lime-400">" "</span>)<br />
            &nbsp;&nbsp;<span className="text-cyan-400">for</span> neighbor <span className="text-cyan-400">in</span> graph[node]:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> neighbor <span className="text-cyan-400">not in</span> visited:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">dfs</span>(graph, neighbor, visited)<br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> visited
        </code>
    );

    const DijkstraCode = () => (
        <code>
            <span className="text-cyan-400">import</span> heapq<br />
            <br />
            <span className="text-cyan-400">def</span> <span className="text-blue-400">dijkstra</span>(graph, start):<br />
            &nbsp;&nbsp;pq = [(<span className="text-amber-300">0</span>, start)]<br />
            &nbsp;&nbsp;dist = &#123;node: <span className="text-blue-400">float</span>(<span className="text-lime-400">'inf'</span>) <span className="text-cyan-400">for</span> node <span className="text-cyan-400">in</span> graph&#125;<br />
            &nbsp;&nbsp;dist[start] = <span className="text-amber-300">0</span><br />
            &nbsp;&nbsp;visited = <span className="text-blue-400">set</span>()<br />
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400">while</span> pq:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;d, node = heapq.<span className="text-blue-400">heappop</span>(pq)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> node <span className="text-cyan-400">in</span> visited:<span className="text-cyan-400"> continue</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;visited.<span className="text-blue-400">add</span>(node)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">for</span> neighbor, weight <span className="text-cyan-400">in</span> graph[node]:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new_dist = d + weight<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">if</span> new_dist &lt; dist[neighbor]:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[neighbor] = new_dist<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heapq.<span className="text-blue-400">heappush</span>(pq, (new_dist, neighbor))<br />
            &nbsp;&nbsp;<span className="text-cyan-400">return</span> dist
        </code>
    );

    const slides = [
        <div key="s1" className="space-y-8 text-center">
            <div className="bg-red-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-red-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-red-500">route</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Advanced Graph</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto italic">
                &ldquo;Traversal, Search, dan Shortest Path \u2014 algoritma esensial di dunia nyata&rdquo;
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
            <div className="bg-red-500/10 p-10 border-4 border-red-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-red-500 text-white font-black px-4 py-2 rounded-xl">ALG 1</span>
                    <h4 className="text-5xl font-black text-red-600 italic">Breadth-First Search</h4>
                </div>
                <div className="space-y-4">
                    {bfsSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-2xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-xl font-bold text-red-700">Time: O(V + E) | Space: O(V) | Queue-based level-order traversal</p>
            </div>
        </div>,

        <div key="s3" className="space-y-6">
            <h3 className="text-3xl font-black text-center uppercase italic">BFS \u2014 Python</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-red-500/20 shadow-2xl">
                <pre className="p-8 text-xl font-mono overflow-x-auto"><code className="text-slate-200"><BFSCode /></code></pre>
            </div>
        </div>,

        <div key="s4" className="space-y-8">
            <div className="bg-rose-500/10 p-10 border-4 border-rose-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-rose-500 text-white font-black px-4 py-2 rounded-xl">ALG 2</span>
                    <h4 className="text-5xl font-black text-rose-600 italic">Depth-First Search</h4>
                </div>
                <div className="space-y-3">
                    {dfsSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-xl font-bold text-rose-700">Time: O(V + E) | Space: O(h) recursion | Stack-based deep traversal</p>
            </div>
        </div>,

        <div key="s5" className="space-y-6">
            <h3 className="text-3xl font-black text-center uppercase italic">DFS \u2014 Python (Recursive)</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-rose-500/20 shadow-2xl">
                <pre className="p-8 text-xl font-mono overflow-x-auto"><code className="text-slate-200"><DFSCode /></code></pre>
            </div>
        </div>,

        <div key="s6" className="space-y-8">
            <div className="bg-orange-500/10 p-10 border-4 border-orange-500/30 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="bg-orange-500 text-white font-black px-4 py-2 rounded-xl">ALG 3</span>
                    <h4 className="text-5xl font-black text-orange-600 italic">Dijkstra&apos;s Algorithm</h4>
                </div>
                <div className="space-y-3">
                    {dijkstraSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 text-xl text-slate-700 dark:text-slate-200 font-bold">
                            <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm">{i + 1}</span>
                            {step}
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-xl font-bold text-orange-700">Time: O((V+E) log V) | Priority Queue | Weighted shortest path</p>
            </div>
        </div>,

        <div key="s7" className="space-y-6">
            <h3 className="text-3xl font-black text-center uppercase italic">Dijkstra \u2014 Python</h3>
            <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-orange-500/20 shadow-2xl">
                <pre className="p-8 text-xl font-mono overflow-x-auto"><code className="text-slate-200"><DijkstraCode /></code></pre>
            </div>
        </div>,

        <div key="s8" className="space-y-6 h-full flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black uppercase italic">Graph Traversal Visualizer</h3>
            <div className="w-full max-w-5xl p-8 rounded-3xl border-4 border-red-500/20 shadow-2xl bg-white dark:bg-slate-950">
                <GraphTraversalVisualizer />
            </div>
        </div>,

        <div key="s9" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center uppercase italic">Perbandingan Algoritma</h3>
            <div className="overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl bg-slate-900 text-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/10 font-black">
                        <tr>
                            <th className="px-5 py-3">Aspek</th>
                            <th className="px-5 py-3 text-red-400">BFS</th>
                            <th className="px-5 py-3 text-rose-400">DFS</th>
                            <th className="px-5 py-3 text-orange-400">Dijkstra</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-bold">
                        {[
                            { a: "Struktur data", b: "Queue (FIFO)", d: "Stack (LIFO)", dj: "Priority Queue" },
                            { a: "Time Complexity", b: "O(V + E)", d: "O(V + E)", dj: "O((V+E) log V)" },
                            { a: "Space", b: "O(V) queue", d: "O(h) stack", dj: "O(V) dist" },
                            { a: "Weighted?", b: "\u2717 Unweighted", d: "\u2717 Unweighted", dj: "\u2713 Weighted" },
                            { a: "Shortest path", b: "\u2713 Level-order", d: "\u2717 Tidak", dj: "\u2713 Minimal weight" },
                            { a: "Complete?", b: "\u2713 Ya", d: "\u2713 Ya", dj: "\u2713 Non-negatif" },
                        ].map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-5 py-3 text-slate-400">{row.a}</td>
                                <td className="px-5 py-3 text-red-300">{row.b}</td>
                                <td className="px-5 py-3 text-rose-300">{row.d}</td>
                                <td className="px-5 py-3 text-orange-300">{row.dj}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>,

        <div key="s10" className="space-y-4 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-black text-center uppercase italic">Aplikasi Algorithm</h3>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                    <h6 className="font-black text-red-400 mb-3 uppercase text-lg">BFS</h6>
                    <ul className="text-xs text-red-100/80 space-y-2 list-disc list-inside">
                        <li>Shortest path (unweighted)</li>
                        <li>Web crawler (level-order)</li>
                        <li>Social network (degrees)</li>
                        <li>GPS navigasi dasar</li>
                        <li>Bipartite graph check</li>
                    </ul>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-2xl">
                    <h6 className="font-black text-rose-400 mb-3 uppercase text-lg">DFS</h6>
                    <ul className="text-xs text-rose-100/80 space-y-2 list-disc list-inside">
                        <li>Deteksi cycle</li>
                        <li>Topological sort</li>
                        <li>Maze / puzzle solver</li>
                        <li>Connected components</li>
                        <li>Path finding (backtracking)</li>
                    </ul>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl">
                    <h6 className="font-black text-orange-400 mb-3 uppercase text-lg">Dijkstra</h6>
                    <ul className="text-xs text-orange-100/80 space-y-2 list-disc list-inside">
                        <li>GPS shortest route</li>
                        <li>Network routing (OSPF)</li>
                        <li>Map directions</li>
                        <li>Logistics optimization</li>
                        <li>Game AI pathfinding</li>
                    </ul>
                </div>
            </div>
        </div>,

        <div key="s11" className="space-y-8 text-center max-w-5xl mx-auto overflow-y-auto max-h-[80vh] p-4">
            <h3 className="text-4xl font-black uppercase italic">Uji Pemahaman</h3>
            <div className="flex justify-center items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-3xl text-red-500">psychology</span>
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
                    question: "Sistem pengiriman barang di kota dengan 12 titik (A-L) dan 20 jalan berarah (directed) dengan bobot jarak.\n\nTUGAS:\na) Representasikan sebagai weighted directed graph.\nb) Implementasi Dijkstra untuk shortest path dari gudang (A) ke tujuan (L).\nc) Tunjukkan langkah-langkah Dijkstra (setiap update distance).\nd) Berapa jarak terpendek A ke L?\ne) Bandingkan dengan BFS \u2014 apakah BFS bisa dipakai di sini? Mengapa?",
                    answer: "Dijkstra untuk shortest path weighted graph",
                    explanation: "A) Directed weighted graph dengan adjacency list.\nB) IMPLEMENTASI: pakai heapq, inisialisasi dist[A]=0, lainnya=\u221e.\nC) Langkah: pilih node dgn jarak terkecil \u2192 update tetangga \u2192 tandai visited \u2192 ulangi.\nD) Hasil: shortest path A\u2192L.\nE) BFS TIDAK bisa karena graph berbobot. BFS hanya memberikan jalur dengan edge tersedikit, bukan jalur dengan total bobot terkecil.\n\nEXTENSION: Untuk graph dengan bobot negatif, gunakan Bellman-Ford!",
                    color: "red",
                }}
                isPresentation={true}
                password="psw_jawaban_Src@"
            />
        </div>,

        <div key="s13" className="space-y-8 text-center">
            <div className="bg-emerald-500/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-emerald-500/20 shadow-2xl">
                <span className="material-symbols-outlined text-5xl text-emerald-500">task_alt</span>
            </div>
            <h2 className="text-5xl font-black uppercase italic">Seluruh Materi Selesai!</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 font-bold italic">
                &ldquo;BFS = level-order (queue), DFS = deep-first (stack), Dijkstra = shortest path (priority queue). Pilih algoritma sesuai masalah!&rdquo;
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
                <SectionDivider title="Bagian 1: Apa itu Graph Traversal?" slideIndex={0} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-red-500/30 p-2 rounded-lg text-red-500">
                                    <span className="material-symbols-outlined text-xl">route</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Menjelajahi Graph</h3>
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                Graph traversal adalah proses <strong>mengunjungi setiap node</strong> dalam graph secara sistematis.
                                Tidak seperti Tree (yang memiliki root dan parent-child), Graph bisa memiliki <strong>cycle</strong> dan <strong>banyak koneksi</strong>,
                                sehingga kita perlu melacak node yang sudah dikunjungi untuk menghindari infinite loop.
                                Tiga algoritma utama: <strong>BFS</strong> (level-order), <strong>DFS</strong> (deep-first), dan <strong>Dijkstra</strong> (shortest path).
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
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 2: BFS */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 2: Breadth-First Search (BFS)" slideIndex={1} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-red-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-red-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-lg">ALGORITMA 1</span>
                                        <h4 className="text-2xl font-black text-red-600 italic">BFS</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Breadth-First Search menjelajahi graph level-per-level menggunakan Queue.
                                        Semua node di level yang sama dikunjungi sebelum pindah ke level berikutnya.
                                    </p>
                                    <div className="space-y-2">
                                        {bfsSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-red-500/20 text-red-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-red-500/5 rounded-xl border border-red-500/20">
                                        <p className="text-xs font-bold text-red-700 dark:text-red-300">Time: O(V + E) | Space: O(V) | Queue (FIFO)</p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><BFSCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 3: BFS TRACE */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 3: Tracing BFS" slideIndex={2} />
                <ScrollReveal>
                    <FocusSection>
                        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing BFS dari node A (unweighted, undirected)</div>
                            <table className="w-full text-sm font-bold">
                                <thead className="bg-slate-100 dark:bg-slate-900 border-b-2">
                                    <tr>
                                        <th className="px-4 py-3">Step</th>
                                        <th className="px-4 py-3">Aksi</th>
                                        <th className="px-4 py-3 text-red-600">State</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-primary/5">
                                    {bfsTraceData.map((row, i) => (
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

            {/* BAGIAN 4: DFS */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 4: Depth-First Search (DFS)" slideIndex={3} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-rose-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-rose-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-lg">ALGORITMA 2</span>
                                        <h4 className="text-2xl font-black text-rose-600 italic">DFS</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Depth-First Search menjelajahi graph dengan cara rekursif — pergi sedalam mungkin sebelum backtrack.
                                    </p>
                                    <div className="space-y-2">
                                        {dfsSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-rose-500/20 text-rose-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-amber-500/10 rounded-xl border border-amber-500/30">
                                        <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                                            &#9888;&#65039; DFS bisa diimplementasi dengan rekursi (call stack) atau Stack eksplisit!
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><DFSCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 5: DFS TRACE */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 5: Tracing DFS" slideIndex={4} />
                <ScrollReveal>
                    <FocusSection>
                        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing DFS dari node A (unweighted, undirected)</div>
                            <table className="w-full text-sm font-bold">
                                <thead className="bg-slate-100 dark:bg-slate-900 border-b-2">
                                    <tr>
                                        <th className="px-4 py-3">Step</th>
                                        <th className="px-4 py-3">Aksi</th>
                                        <th className="px-4 py-3 text-rose-600">State</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-primary/5">
                                    {dfsTraceData.map((row, i) => (
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

            {/* BAGIAN 6: DIJKSTRA */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 6: Dijkstra's Algorithm" slideIndex={5} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-orange-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-orange-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-lg">ALGORITMA 3</span>
                                        <h4 className="text-2xl font-black text-orange-600 italic">Dijkstra</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-4">
                                        Dijkstra menemukan jarak terpendek dari satu node ke semua node lain dalam weighted graph (non-negatif).
                                    </p>
                                    <div className="space-y-2">
                                        {dijkstraSteps.map((step, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                <span className="bg-orange-500/20 text-orange-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-black">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-orange-500/5 rounded-xl border border-orange-500/20">
                                        <p className="text-xs font-bold text-orange-700 dark:text-orange-300">Time: O((V+E) log V) dengan priority queue | Weighted non-negatif</p>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 bg-slate-900 font-mono text-sm overflow-x-auto">
                                    <pre className="text-slate-200"><DijkstraCode /></pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 7: DIJKSTRA TRACE */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 7: Tracing Dijkstra" slideIndex={6} />
                <ScrollReveal>
                    <FocusSection>
                        <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-4 border-b-2 bg-primary/5 font-black text-sm">Tracing Dijkstra — Shortest Path dari A ke semua node</div>
                            <table className="w-full text-sm font-bold">
                                <thead className="bg-slate-100 dark:bg-slate-900 border-b-2">
                                    <tr>
                                        <th className="px-4 py-3">Step</th>
                                        <th className="px-4 py-3">Aksi</th>
                                        <th className="px-4 py-3 text-orange-600">Distance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-primary/5">
                                    {dijkstraTraceData.map((row, i) => (
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

            {/* BAGIAN 8: VISUALIZER */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 8: Simulasi Interaktif" slideIndex={7} />
                <ScrollReveal>
                    <FocusSection>
                        <GraphTraversalVisualizer />
                        <p className="text-center text-[10px] text-slate-500 font-bold italic mt-4">
                            Coba ganti algoritma (BFS / DFS / Dijkstra) dan start node. Perhatikan perbedaan queue vs stack vs priority queue!
                        </p>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 9: KOMPARASI */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 9: Komparasi & Aplikasi" slideIndex={8} />
                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 text-white">
                            <h4 className="text-xl font-black mb-6">BFS vs DFS vs Dijkstra</h4>
                            <div className="overflow-hidden rounded-2xl border border-white/10 mb-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 font-black border-b border-white/10">
                                        <tr>
                                            <th className="px-5 py-3">Aspek</th>
                                            <th className="px-5 py-3 text-red-400">BFS</th>
                                            <th className="px-5 py-3 text-rose-400">DFS</th>
                                            <th className="px-5 py-3 text-orange-400">Dijkstra</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10 font-bold italic">
                                        {[
                                            { a: "Data Structure", b: "Queue (FIFO)", d: "Stack (LIFO) / Recursion", dj: "Priority Queue (Min-Heap)" },
                                            { a: "Complete", b: "\u2713 Ya", d: "\u2713 Ya", dj: "\u2713 Non-negatif" },
                                            { a: "Weighted", b: "\u2717 Unweighted", d: "\u2717 Unweighted", dj: "\u2713 Weighted" },
                                            { a: "Shortest Path", b: "\u2713 Level-order (edge count)", d: "\u2717 Tidak", dj: "\u2713 Minimal bobot" },
                                            { a: "Time Complexity", b: "O(V + E)", d: "O(V + E)", dj: "O((V+E) log V)" },
                                            { a: "Space", b: "O(V)", d: "O(h) kedalaman", dj: "O(V)" },
                                        ].map((row, i) => (
                                            <tr key={i}>
                                                <td className="px-5 py-3 text-slate-300">{row.a}</td>
                                                <td className="px-5 py-3 text-red-300">{row.b}</td>
                                                <td className="px-5 py-3 text-rose-300">{row.d}</td>
                                                <td className="px-5 py-3 text-orange-300">{row.dj}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="grid lg:grid-cols-3 gap-4">
                                <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-red-400 mb-2">BFS Digunakan Saat</h6>
                                    <ul className="text-xs text-red-100/80 space-y-1 list-disc list-inside">
                                        <li>Shortest path di unweighted graph</li>
                                        <li>Level-order traversal</li>
                                        <li>Graph tidak terlalu dalam</li>
                                    </ul>
                                </div>
                                <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-rose-400 mb-2">DFS Digunakan Saat</h6>
                                    <ul className="text-xs text-rose-100/80 space-y-1 list-disc list-inside">
                                        <li>Mencari jalur (path existence)</li>
                                        <li>Deteksi cycle</li>
                                        <li>Graph sangat dalam & lebar</li>
                                    </ul>
                                </div>
                                <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-2xl">
                                    <h6 className="font-black text-orange-400 mb-2">Dijkstra Digunakan Saat</h6>
                                    <ul className="text-xs text-orange-100/80 space-y-1 list-disc list-inside">
                                        <li>Graph berbobot non-negatif</li>
                                        <li>Butuh shortest path optimal</li>
                                        <li>GPS, routing, logistik</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* BAGIAN 10: UJI PEMAHAMAN */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 10: Uji Pemahaman" slideIndex={10} />
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

            {/* BAGIAN 11: PROJEK */}
            <div className="space-y-10">
                <SectionDivider title="Bagian 11: Projek Kelompok" slideIndex={11} />
                <ScrollReveal>
                    <FocusSection>
                        <div className="max-w-4xl mx-auto">
                            <ExerciseCard
                                item={{
                                    question: "Tentukan rute pengiriman barang antar 10 kota di Jawa (A-J) dengan jarak sebagai bobot.\n\na) Buat weighted undirected graph dengan 10 node dan minimal 15 edge.\nb) Implementasi Dijkstra untuk shortest path dari Jakarta (A) ke Surabaya (J).\nc) Tampilkan path dan total jarak.\nd) Apa yang terjadi jika ada edge dengan bobot negatif?\ne) Kapan kita pakai BFS vs Dijkstra dalam konteks ini?",
                                    answer: "Dijkstra untuk weighted graph, BFS untuk unweighted",
                                    explanation: "A) Graph: A-B(50), B-C(70), C-D(80), D-E(100), E-F(60), F-G(50), G-H(40), H-I(30), I-J(20), plus jalan alternatif.\nB) IMPLEMENTASI: Dijkstra dengan heapq.\nC) Path: A\u2192B\u2192C\u2192D\u2192E\u2192F\u2192G\u2192H\u2192I\u2192J atau alternatif yang lebih pendek.\nD) BOBOT NEGATIF: Dijkstra GAGAL (asumsi non-negatif). Gunakan Bellman-Ford.\nE) BFS: jika semua jalan jaraknya sama (unweighted). Dijkstra: jika jarak berbeda-beda (realistis).",
                                    color: "red",
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
