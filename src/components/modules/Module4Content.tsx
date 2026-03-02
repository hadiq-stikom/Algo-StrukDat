"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import FocusSection from "@/components/FocusSection";
import LinkedListVisualizer from "./LinkedListVisualizer";

export default function Module4Content() {
    return (
        <div className="space-y-16 pb-12">

            {/* ─── BAGIAN 1: PENGANTAR ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 1: Array vs Linked List</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-emerald-500/30 p-2 rounded-lg text-emerald-500">
                                    <span className="material-symbols-outlined text-xl">link</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Masalah dengan Array Statis</h3>
                            </div>
                            <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm">
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                                    Array mengharuskan kita menentukan ukuran di awal dan menempati memori yang <strong className="text-slate-900 dark:text-white">berurutan (contiguous)</strong>. Linked List hadir untuk mengatasi keterbatasan ini dengan alokasi memori yang dinamis dan fleksibel.
                                </p>

                                {/* Array vs LL visual */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="p-5 bg-red-500/10 border-2 border-red-500/30 rounded-xl">
                                        <p className="text-sm font-black text-red-600 dark:text-red-400 uppercase mb-3">Array — Memori Berurutan ❌</p>
                                        <div className="flex gap-1 mb-3">
                                            {["10", "20", "30", "??", "??"].map((v, i) => (
                                                <div key={i} className={`w-10 h-10 rounded border-2 flex items-center justify-center text-xs font-black ${i >= 3 ? "border-dashed border-slate-400 text-slate-400" : "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"}`}>{v}</div>
                                            ))}
                                        </div>
                                        <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-200 font-medium">
                                            <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Ukuran harus ditentukan di awal</li>
                                            <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Insert/Delete di tengah: O(n)</li>
                                            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Akses elemen by index: O(1)</li>
                                        </ul>
                                    </div>
                                    <div className="p-5 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl">
                                        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase mb-3">Linked List — Memori Dinamis ✅</p>
                                        <div className="flex items-center gap-1 mb-3 flex-wrap">
                                            {["10", "20", "30"].map((v, i, arr) => (
                                                <React.Fragment key={i}>
                                                    <div className="border-2 border-emerald-500 bg-emerald-500/10 rounded-lg px-2 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                                        <span>{v}</span><span className="text-slate-400 text-[10px]">|→</span>
                                                    </div>
                                                    {i === arr.length - 1 && <span className="text-xs font-bold text-slate-500">NULL</span>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-200 font-medium">
                                            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Ukuran fleksibel, tumbuh dinamis</li>
                                            <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Insert/Delete di awal: O(1)</li>
                                            <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Akses by index: O(n)</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="p-4 bg-emerald-500/10 rounded-xl border-2 border-emerald-500/20">
                                    <p className="text-sm font-medium italic text-center text-slate-800 dark:text-slate-100">
                                        "Linked List adalah kumpulan Node yang saling terhubung melalui pointer. Setiap Node menyimpan <strong>data</strong> dan <strong>referensi (next)</strong> ke Node berikutnya."
                                    </p>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 2: SINGLY LINKED LIST ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 2: Singly Linked List</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-blue-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-blue-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">TIPE 1</span>
                                        <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400 italic">Singly LL</h4>
                                    </div>
                                    <h5 className="font-black text-base text-slate-900 dark:text-white mb-3">Satu Arah → (next only)</h5>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Setiap node hanya mengetahui node <strong className="text-slate-900 dark:text-white">berikutnya</strong>. Traversal hanya bisa dari depan ke belakang (HEAD → TAIL).
                                    </p>
                                    {/* Node Visual */}
                                    <div className="mb-4">
                                        <p className="text-xs font-black text-slate-600 dark:text-slate-300 mb-2">Struktur 1 Node:</p>
                                        <div className="flex items-stretch border-2 border-blue-500 rounded-xl overflow-hidden font-mono text-xs">
                                            <div className="bg-blue-500/20 px-3 py-2 flex items-center justify-center flex-1 font-black text-slate-800 dark:text-slate-100">DATA</div>
                                            <div className="border-l-2 border-blue-500 bg-blue-500/10 px-3 py-2 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black">NEXT →</div>
                                        </div>
                                    </div>
                                    {/* Linked Node Visual */}
                                    <div>
                                        <p className="text-xs font-black text-slate-600 dark:text-slate-300 mb-2">Contoh 3 Node:</p>
                                        <div className="flex items-center gap-1 flex-wrap">
                                            <div className="text-[10px] font-black text-primary">HEAD</div>
                                            <span className="text-slate-400 text-xs">→</span>
                                            {["10", "20", "30"].map((v, i, arr) => (
                                                <React.Fragment key={i}>
                                                    <div className="border-2 border-blue-500 rounded overflow-hidden flex font-mono text-[10px]">
                                                        <span className="bg-blue-500/20 px-1.5 py-1 font-black text-slate-800 dark:text-slate-100">{v}</span>
                                                        <span className="border-l-2 border-blue-500 px-1.5 py-1 text-blue-400">{i === arr.length - 1 ? "∅" : "→"}</span>
                                                    </div>
                                                    {i < arr.length - 1 && <span className="text-slate-400 text-xs">→</span>}
                                                </React.Fragment>
                                            ))}
                                            <div className="text-[10px] font-black text-slate-500">NULL</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-white/10">
                                        <div className="text-xs font-black text-center">
                                            <span className="text-blue-400">Insert Head: O(1)</span>
                                            <span className="text-slate-500 mx-2">|</span>
                                            <span className="text-amber-400">Search: O(n)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-0 bg-slate-900">
                                    <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                        <span className="text-xs text-slate-300 font-mono font-bold">singly_linkedlist.py</span>
                                        <span className="text-xs text-blue-400 font-bold">Singly LL</span>
                                    </div>
                                    <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed">
                                        <code className="text-slate-200">
                                            {`\
`}<span className="text-slate-400"># Definisi Node</span>{`
`}<span className="text-purple-400">class</span> <span className="text-blue-400">Node</span>:{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>, data):{`
`}        <span className="text-orange-300">self</span>.data = data{`
`}        <span className="text-orange-300">self</span>.next = <span className="text-amber-300">None</span>  <span className="text-slate-400"># pointer</span>{`

`}<span className="text-purple-400">class</span> <span className="text-blue-400">SinglyLinkedList</span>:{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>):{`
`}        <span className="text-orange-300">self</span>.head = <span className="text-amber-300">None</span>  <span className="text-slate-400"># awal list</span>{`

`}    <span className="text-slate-400"># Insert di depan → O(1)</span>{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">prepend</span>(<span className="text-orange-300">self</span>, data):{`
`}        new_node = <span className="text-blue-400">Node</span>(data){`
`}        new_node.next = <span className="text-orange-300">self</span>.head{`
`}        <span className="text-orange-300">self</span>.head = new_node{`

`}    <span className="text-slate-400"># Insert di belakang → O(n)</span>{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">append</span>(<span className="text-orange-300">self</span>, data):{`
`}        new_node = <span className="text-blue-400">Node</span>(data){`
`}        <span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.head:{`
`}            <span className="text-orange-300">self</span>.head = new_node; <span className="text-purple-400">return</span>{`
`}        cur = <span className="text-orange-300">self</span>.head{`
`}        <span className="text-purple-400">while</span> cur.next: cur = cur.next{`
`}        cur.next = new_node{`

`}    <span className="text-slate-400"># Hapus node berdasarkan nilai → O(n)</span>{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">delete</span>(<span className="text-orange-300">self</span>, data):{`
`}        cur = <span className="text-orange-300">self</span>.head{`
`}        <span className="text-purple-400">if</span> cur <span className="text-purple-400">and</span> cur.data == data:{`
`}            <span className="text-orange-300">self</span>.head = cur.next; <span className="text-purple-400">return</span>{`
`}        <span className="text-purple-400">while</span> cur.next:{`
`}            <span className="text-purple-400">if</span> cur.next.data == data:{`
`}                cur.next = cur.next.next; <span className="text-purple-400">return</span>{`
`}            cur = cur.next{`

`}    <span className="text-slate-400"># Traversal → O(n)</span>{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">traverse</span>(<span className="text-orange-300">self</span>):{`
`}        cur = <span className="text-orange-300">self</span>.head{`
`}        <span className="text-purple-400">while</span> cur:{`
`}            <span className="text-blue-400">print</span>(cur.data, end=<span className="text-green-400">" → "</span>){`
`}            cur = cur.next{`
`}        <span className="text-blue-400">print</span>(<span className="text-green-400">"NULL"</span>)
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 3: OPERASI SINGLY LL — TRACING ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 3: Tracing Operasi Singly LL</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-500/30 p-2 rounded-lg text-blue-500">
                                    <span className="material-symbols-outlined text-xl">edit_square</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Visualisasi Langkah demi Langkah</h3>
                            </div>

                            <div className="space-y-6">
                                <LinkedListVisualizer initialMode="SINGLY" />
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 4: DOUBLY LINKED LIST ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 4: Doubly Linked List</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5 bg-violet-500/10 p-6 border-b-2 md:border-b-0 md:border-r-2 border-violet-500/20">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-violet-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow">TIPE 2</span>
                                        <h4 className="text-2xl font-black text-violet-600 dark:text-violet-400 italic">Doubly LL</h4>
                                    </div>
                                    <h5 className="font-black text-base text-slate-900 dark:text-white mb-3">Dua Arah ⇄ (prev & next)</h5>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-4">
                                        Setiap node menyimpan dua pointer: <strong className="text-slate-900 dark:text-white">prev</strong> (ke node sebelumnya) dan <strong className="text-slate-900 dark:text-white">next</strong> (ke node berikutnya). Traversal bisa dari HEAD maupun TAIL.
                                    </p>
                                    {/* Node Visual */}
                                    <div className="mb-4">
                                        <p className="text-xs font-black text-slate-600 dark:text-slate-300 mb-2">Struktur 1 Node:</p>
                                        <div className="flex items-stretch border-2 border-violet-500 rounded-xl overflow-hidden font-mono text-xs">
                                            <div className="bg-violet-500/10 px-2 py-2 flex items-center justify-center text-violet-600 dark:text-violet-400 font-black">←PREV</div>
                                            <div className="border-x-2 border-violet-500 bg-violet-500/20 px-3 py-2 flex items-center justify-center flex-1 font-black text-slate-800 dark:text-slate-100">DATA</div>
                                            <div className="bg-violet-500/10 px-2 py-2 flex items-center justify-center text-violet-600 dark:text-violet-400 font-black">NEXT→</div>
                                        </div>
                                    </div>
                                    {/* Linked Node Visual */}
                                    <div>
                                        <p className="text-xs font-black text-slate-600 dark:text-slate-300 mb-2">Contoh 3 Node:</p>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                                                <span className="text-primary">HEAD</span>
                                                <span>←→ 10 ←→ 20 ←→ 30 →</span>
                                                <span className="text-slate-500">NULL</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                                                <span>NULL ←</span>
                                                <span>10 ←→ 20 ←→ 30</span>
                                                <span className="text-primary">← TAIL</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-white/10">
                                        <div className="text-xs font-black text-center">
                                            <span className="text-violet-400">Insert/Delete Head & Tail: O(1)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-0 bg-slate-900">
                                    <div className="bg-slate-800 px-4 py-2 flex justify-between border-b border-white/10">
                                        <span className="text-xs text-slate-300 font-mono font-bold">doubly_linkedlist.py</span>
                                        <span className="text-xs text-violet-400 font-bold">Doubly LL</span>
                                    </div>
                                    <pre className="p-5 text-xs font-mono overflow-x-auto leading-relaxed">
                                        <code className="text-slate-200">
                                            {`\
`}<span className="text-purple-400">class</span> <span className="text-blue-400">Node</span>:{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>, data):{`
`}        <span className="text-orange-300">self</span>.data = data{`
`}        <span className="text-orange-300">self</span>.prev = <span className="text-amber-300">None</span>  <span className="text-slate-400"># ← pointer</span>{`
`}        <span className="text-orange-300">self</span>.next = <span className="text-amber-300">None</span>  <span className="text-slate-400"># → pointer</span>{`

`}<span className="text-purple-400">class</span> <span className="text-blue-400">DoublyLinkedList</span>:{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>):{`
`}        <span className="text-orange-300">self</span>.head = <span className="text-amber-300">None</span>{`
`}        <span className="text-orange-300">self</span>.tail = <span className="text-amber-300">None</span>{`

`}    <span className="text-slate-400"># Insert di belakang → O(1) karena ada TAIL</span>{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">append</span>(<span className="text-orange-300">self</span>, data):{`
`}        new_node = <span className="text-blue-400">Node</span>(data){`
`}        <span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.tail:{`
`}            <span className="text-orange-300">self</span>.head = <span className="text-orange-300">self</span>.tail = new_node{`
`}            <span className="text-purple-400">return</span>{`
`}        new_node.prev = <span className="text-orange-300">self</span>.tail{`
`}        <span className="text-orange-300">self</span>.tail.next = new_node{`
`}        <span className="text-orange-300">self</span>.tail = new_node{`

`}    <span className="text-slate-400"># Hapus node terakhir → O(1)!</span>{`
`}    <span className="text-purple-400">def</span> <span className="text-blue-400">pop</span>(<span className="text-orange-300">self</span>):{`
`}        <span className="text-purple-400">if not</span> <span className="text-orange-300">self</span>.tail: <span className="text-purple-400">return</span>{`
`}        <span className="text-orange-300">self</span>.tail = <span className="text-orange-300">self</span>.tail.prev{`
`}        <span className="text-purple-400">if</span> <span className="text-orange-300">self</span>.tail:{`
`}            <span className="text-orange-300">self</span>.tail.next = <span className="text-amber-300">None</span>{`
`}        <span className="text-purple-400">else</span>:{`
`}            <span className="text-orange-300">self</span>.head = <span className="text-amber-300">None</span> <span className="text-emerald-400"># list kosong</span>
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 5: TRACING DOUBLY LL ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 5: Tracing Doubly LL — Append</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-violet-500/30 p-2 rounded-lg text-violet-500">
                                    <span className="material-symbols-outlined text-xl">edit_square</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tracing: Append 3 Node ke Doubly LL</h3>
                            </div>

                            <LinkedListVisualizer initialMode="DOUBLY" />
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 6: KOMPARASI ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 6: Komparasi Performa</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <FocusSection>
                        <section className="bg-slate-900 rounded-3xl p-8 overflow-hidden relative border border-white/10">
                            <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                            <h4 className="text-xl font-black text-white flex items-center gap-2 mb-8">
                                <span className="material-symbols-outlined text-emerald-400">compare_arrows</span>
                                Array vs Singly LL vs Doubly LL
                            </h4>

                            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-8">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-slate-200 font-black border-b border-white/10">
                                        <tr>
                                            <th className="px-5 py-3">Operasi</th>
                                            <th className="px-5 py-3 text-slate-300">Array</th>
                                            <th className="px-5 py-3 text-blue-400">Singly LL</th>
                                            <th className="px-5 py-3 text-violet-400">Doubly LL</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { op: "Akses by Index", arr: "O(1) ✓", sll: "O(n) ✗", dll: "O(n) ✗" },
                                            { op: "Insert di Awal (Head)", arr: "O(n) ✗", sll: "O(1) ✓", dll: "O(1) ✓" },
                                            { op: "Insert di Akhir (Tail)", arr: "O(1)*", sll: "O(n) ✗", dll: "O(1) ✓" },
                                            { op: "Delete di Awal", arr: "O(n) ✗", sll: "O(1) ✓", dll: "O(1) ✓" },
                                            { op: "Delete di Akhir", arr: "O(1)*", sll: "O(n) ✗", dll: "O(1) ✓" },
                                            { op: "Delete node tertentu", arr: "O(n)", sll: "O(n)", dll: "O(n)*" },
                                            { op: "Traversal Maju", arr: "O(n)", sll: "O(n) ✓", dll: "O(n) ✓" },
                                            { op: "Traversal Mundur", arr: "O(n)", sll: "❌ Tidak bisa", dll: "O(n) ✓" },
                                            { op: "Memory per elemen", arr: "Data only", sll: "Data + 1 ptr", dll: "Data + 2 ptr" },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="px-5 py-3 font-black text-slate-200">{row.op}</td>
                                                <td className="px-5 py-3 font-mono font-medium text-slate-300">{row.arr}</td>
                                                <td className="px-5 py-3 font-mono font-medium text-blue-300">{row.sll}</td>
                                                <td className="px-5 py-3 font-mono font-medium text-violet-300">{row.dll}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                {[
                                    { title: "Gunakan Array jika...", color: "border-slate-500/30 bg-slate-500/10", titleColor: "text-slate-300", items: ["Perlu akses random by index", "Ukuran data sudah diketahui", "Cache locality penting (performa CPU)"] },
                                    { title: "Gunakan Singly LL jika...", color: "border-blue-500/30 bg-blue-500/10", titleColor: "text-blue-300", items: ["Banyak insert/delete di HEAD", "Implementasi Stack & Queue", "Memori minimal (1 pointer/node)"] },
                                    { title: "Gunakan Doubly LL jika...", color: "border-violet-500/30 bg-violet-500/10", titleColor: "text-violet-300", items: ["Perlu traversal dua arah", "Banyak delete di TAIL: O(1)", "Implementasi browser history, LRU Cache"] },
                                ].map((card, i) => (
                                    <div key={i} className={`p-4 rounded-xl border-2 ${card.color}`}>
                                        <h5 className={`text-sm font-black mb-2 ${card.titleColor}`}>{card.title}</h5>
                                        <ul className="space-y-1">
                                            {card.items.map((item, j) => (
                                                <li key={j} className="text-sm text-slate-200 font-medium flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0"></span>{item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FocusSection>
                </ScrollReveal>
            </div>

            {/* ─── BAGIAN 7: LATIHAN ─── */}
            <div className="space-y-10">
                <ScrollReveal>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t-2 border-primary/40"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-bg-base px-6 text-sm font-black uppercase tracking-[0.4em] text-primary border-x-2 border-primary/40">Bagian 7: Latihan Mandiri</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="text-center max-w-lg mx-auto mb-8">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Uji Pemahamanmu! 🧠</h4>
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                            Jawab dan trace secara manual sebelum melihat jawaban.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid gap-6">
                    {[
                        {
                            no: 1, soal: "Sebuah Singly LL berisi [1 → 2 → 3 → 4 → NULL]. Apa state list setelah memanggil prepend(0) lalu delete(3)?",
                            hint: "Lakukan operasi satu per satu. Gambar pointer-nya di kertas!",
                            jawaban: "[0 → 1 → 2 → 4 → NULL]",
                            penjelasan: "prepend(0): tambah node 0 di HEAD → [0→1→2→3→4]. delete(3): traverse sampai cur.next.data == 3, lalu bypass → cur.next = cur.next.next, sehingga node 2 langsung menunjuk ke node 4."
                        },
                        {
                            no: 2, soal: "Mengapa Doubly LL bisa delete TAIL dalam O(1) sedangkan Singly LL membutuhkan O(n)?",
                            hint: "Pikirkan apa yang harus dilakukan setelah menghapus TAIL — pointer mana yang perlu diupdate?",
                            jawaban: "Karena Doubly LL punya pointer TAIL dan pointer PREV",
                            penjelasan: "Singly LL: untuk hapus TAIL, perlu traverse dari HEAD sampai node sebelum TAIL (O(n)) karena tidak ada pointer balik. Doubly LL: langsung akses self.tail.prev (O(1)), update self.tail = self.tail.prev, lalu set tail.next = NULL — semua O(1)."
                        },
                        {
                            no: 3, soal: "Anda membangun fitur 'Undo/Redo' di teks editor. Struktur data mana yang paling tepat dan mengapa?",
                            hint: "Undo = mundur ke state sebelumnya, Redo = maju ke state berikutnya.",
                            jawaban: "Doubly Linked List",
                            penjelasan: "Doubly LL ideal karena: UNDO = traversal mundur menggunakan pointer prev (O(1)); REDO = traversal maju menggunakan pointer next (O(1)). Setiap aksi user menjadi 1 node. Browser history juga menggunakan mekanisme yang sama."
                        },
                    ].map((latihan) => (
                        <ScrollReveal key={latihan.no}>
                            <FocusSection>
                                <div className="bg-white dark:bg-surface border-2 border-primary/20 rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-primary/20 text-primary text-xs font-black px-3 py-1 rounded-lg">LATIHAN #{latihan.no}</span>
                                    </div>
                                    <p className="text-base font-bold text-slate-900 dark:text-white mb-3">{latihan.soal}</p>
                                    <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic">💡 Hint: {latihan.hint}</p>
                                    </div>
                                    <details className="group cursor-pointer">
                                        <summary className="flex items-center gap-2 text-sm font-black text-primary hover:text-primary/70 transition-colors list-none">
                                            <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                                            Lihat Jawaban
                                        </summary>
                                        <div className="mt-4 p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl animate-in slide-in-from-top-2 duration-300">
                                            <div className="text-emerald-600 dark:text-emerald-400 font-black text-base mb-2">✅ {latihan.jawaban}</div>
                                            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{latihan.penjelasan}</p>
                                        </div>
                                    </details>
                                </div>
                            </FocusSection>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Summary Card */}
                <ScrollReveal threshold={0.5}>
                    <FocusSection>
                        <div className="mt-4 bg-linear-to-r from-primary/15 to-emerald-500/15 border-2 border-primary/30 p-8 rounded-3xl">
                            <div className="max-w-2xl mx-auto text-center">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Ringkasan Capaian 🎯</h4>
                                <div className="grid sm:grid-cols-2 gap-4 text-left">
                                    {[
                                        { icon: "code", label: "Implementasi", desc: "Menulis Node class, Singly LL, dan Doubly LL dari nol dalam Python dengan operasi lengkap." },
                                        { icon: "sync_alt", label: "Manage Dinamis", desc: "Melakukan insert (prepend/append), delete, dan traverse pada struktur data dinamis." },
                                        { icon: "edit_square", label: "Tracing Pointer", desc: "Menelusuri perubahan pointer prev/next secara manual untuk setiap operasi." },
                                        { icon: "compare_arrows", label: "Komparasi", desc: "Memilih struktur data yang tepat (Array / Singly / Doubly) berdasarkan kebutuhan operasi." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-primary/20">
                                            <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                                                <span className="material-symbols-outlined text-primary text-sm">{item.icon}</span>
                                            </div>
                                            <div>
                                                <div className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1">
                                                    {item.label} <span className="text-emerald-500">✓</span>
                                                </div>
                                                <p className="text-xs text-slate-700 dark:text-slate-200 font-medium mt-0.5 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FocusSection>
                </ScrollReveal>
            </div>
        </div>
    );
}
