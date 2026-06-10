"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AVLNode {
    id: string;
    value: number;
    left: AVLNode | null;
    right: AVLNode | null;
    height: number;
    x: number;
    y: number;
    level: number;
    balanceFactor?: number;
    highlightState?: "active" | "visited" | "pivot" | "successor" | "none";
}

type TabType = "SIMULATION" | "ROTATIONS" | "DELETIONS";
type RotationPreset = "LL" | "RR" | "LR" | "RL";

export default function AVLVisualizer() {
    const [activeTab, setActiveTab] = useState<TabType>("SIMULATION");

    // --- TAB 1: DYNAMIC SIMULATION STATE ---
    const [root, setRoot] = useState<AVLNode | null>(null);
    const [avlMode, setAvlMode] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [simLog, setSimLog] = useState<string[]>([
        "Pilih mode (BST/AVL), lalu masukkan angka untuk membangun Tree.",
    ]);
    const [isExecuting, setIsExecuting] = useState(false);
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
    const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
    const [successorNodeId, setSuccessorNodeId] = useState<string | null>(null);

    // --- TAB 2: ROTATIONS PLAYGROUND STATE ---
    const [rotationPreset, setRotationPreset] = useState<RotationPreset>("LL");
    const [rotationStep, setRotationStep] = useState(0);
    const [rotationRoot, setRotationRoot] = useState<AVLNode | null>(null);
    const [rotationLog, setRotationLog] = useState("");

    // --- TAB 3: DELETION DEMO STATE ---
    const [deleteCasePreset, setDeleteCasePreset] = useState<"LEAF" | "ONE_CHILD" | "TWO_CHILDREN">("LEAF");
    const [deleteStep, setDeleteStep] = useState(0);
    const [deleteRoot, setDeleteRoot] = useState<AVLNode | null>(null);
    const [deleteLog, setDeleteLog] = useState("");

    // Setup Initial Trees
    useEffect(() => {
        resetSimulationTree();
        loadRotationPreset("LL");
        loadDeleteCasePreset("LEAF");
    }, []);

    // --- HELPER TREE FUNCTIONS ---
    function getHeight(node: AVLNode | null): number {
        return node ? node.height : 0;
    }

    function getBalance(node: AVLNode | null): number {
        return node ? getHeight(node.left) - getHeight(node.right) : 0;
    }

    function updateHeight(node: AVLNode): void {
        node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    // Coordinates Layout Calculator
    function updateLayout(node: AVLNode | null, x: number, y: number, level: number, offset: number) {
        if (!node) return;
        node.x = x;
        node.y = y;
        node.level = level;
        node.balanceFactor = getBalance(node);

        const nextOffset = offset * 0.55;
        if (node.left) updateLayout(node.left, x - offset, y + 70, level + 1, nextOffset);
        if (node.right) updateLayout(node.right, x + offset, y + 70, level + 1, nextOffset);
    }

    // Helper to deeply clone the tree
    function cloneTree(node: AVLNode | null): AVLNode | null {
        if (!node) return null;
        return {
            ...node,
            left: cloneTree(node.left),
            right: cloneTree(node.right),
        };
    }

    // --- ROTATION IMPLEMENTATIONS ---
    function rightRotate(y: AVLNode): AVLNode {
        const x = y.left;
        if (!x) return y;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        updateHeight(y);
        updateHeight(x);

        return x;
    }

    function leftRotate(x: AVLNode): AVLNode {
        const y = x.right;
        if (!y) return x;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        updateHeight(x);
        updateHeight(y);

        return y;
    }

    // --- SIMULATION TREE RESET ---
    const resetSimulationTree = () => {
        // Build a small default tree
        const vals = [30, 20, 40, 10, 25, 35, 50];
        let newRoot: AVLNode | null = null;
        vals.forEach((v) => {
            newRoot = rawInsert(newRoot, v);
        });
        updateLayout(newRoot, 0, 0, 0, 110);
        setRoot(newRoot);
        setSimLog(["Tree di-reset ke nilai bawaan: [30, 20, 40, 10, 25, 35, 50]"]);
        setVisitedNodes([]);
        setActiveNodeId(null);
        setSuccessorNodeId(null);
    };

    function rawInsert(node: AVLNode | null, value: number): AVLNode {
        if (!node) {
            return {
                id: Math.random().toString(),
                value,
                left: null,
                right: null,
                height: 1,
                x: 0,
                y: 0,
                level: 0,
            };
        }
        if (value < node.value) {
            node.left = rawInsert(node.left, value);
        } else if (value > node.value) {
            node.right = rawInsert(node.right, value);
        }
        updateHeight(node);
        return node;
    }

    // --- INSERTION WITH ANIMATION LOGIC ---
    const handleInsert = async () => {
        const val = parseInt(inputValue);
        if (isNaN(val) || val < 1 || val > 99) {
            setSimLog((prev) => ["Error: Masukkan angka antara 1 sampai 99.", ...prev]);
            return;
        }
        setInputValue("");
        setIsExecuting(true);
        setVisitedNodes([]);
        setSuccessorNodeId(null);

        setSimLog((prev) => [`Mulai proses memasukkan angka ${val}...`, ...prev]);

        let current = root;
        const path: string[] = [];

        // If tree is empty
        if (!current) {
            const newNode: AVLNode = {
                id: Math.random().toString(),
                value: val,
                left: null,
                right: null,
                height: 1,
                x: 0,
                y: 0,
                level: 0,
            };
            updateLayout(newNode, 0, 0, 0, 110);
            setRoot(newNode);
            setSimLog((prev) => [`Tree kosong. Membuat Root baru dengan nilai ${val}.`, ...prev]);
            setIsExecuting(false);
            return;
        }

        // Trace the insertion path
        let duplicate = false;
        while (current) {
            setActiveNodeId(current.id);
            setVisitedNodes((p) => [...p, current!.id]);
            path.push(current.id);

            if (val === current.value) {
                duplicate = true;
                setSimLog((prev) => [`Nilai ${val} sudah ada di dalam Tree. Insertion dibatalkan.`, ...prev]);
                await new Promise((r) => setTimeout(r, 1000));
                break;
            }

            await new Promise((r) => setTimeout(r, 700));

            if (val < current.value) {
                setSimLog((prev) => [
                    `${val} < ${current!.value}, bergerak ke sub-pohon KIRI.`,
                    ...prev,
                ]);
                if (!current.left) {
                    break;
                }
                current = current.left;
            } else {
                setSimLog((prev) => [
                    `${val} > ${current!.value}, bergerak ke sub-pohon KANAN.`,
                    ...prev,
                ]);
                if (!current.right) {
                    break;
                }
                current = current.right;
            }
        }

        if (!duplicate) {
            // Insertion helper
            const insertAndBalance = (node: AVLNode | null, v: number): AVLNode => {
                if (!node) {
                    return {
                        id: Math.random().toString(),
                        value: v,
                        left: null,
                        right: null,
                        height: 1,
                        x: 0,
                        y: 0,
                        level: 0,
                    };
                }
                if (v < node.value) {
                    node.left = insertAndBalance(node.left, v);
                } else {
                    node.right = insertAndBalance(node.right, v);
                }

                updateHeight(node);

                if (!avlMode) {
                    return node; // No balancing in normal BST
                }

                // Balance Factor check
                const balance = getBalance(node);

                // LL Case
                if (balance > 1 && v < (node.left?.value || 0)) {
                    setSimLog((prev) => [
                        `🔄 Deteksi Imbalance LL pada Node ${node.value} (BF: ${balance}). Melakukan Right Rotation...`,
                        ...prev,
                    ]);
                    return rightRotate(node);
                }
                // RR Case
                if (balance < -1 && v > (node.right?.value || 0)) {
                    setSimLog((prev) => [
                        `🔄 Deteksi Imbalance RR pada Node ${node.value} (BF: ${balance}). Melakukan Left Rotation...`,
                        ...prev,
                    ]);
                    return leftRotate(node);
                }
                // LR Case
                if (balance > 1 && v > (node.left?.value || 0)) {
                    setSimLog((prev) => [
                        `🔄 Deteksi Imbalance LR pada Node ${node.value} (BF: ${balance}). Melakukan Left-Right Rotation...`,
                        ...prev,
                    ]);
                    node.left = leftRotate(node.left!);
                    return rightRotate(node);
                }
                // RL Case
                if (balance < -1 && v < (node.right?.value || 0)) {
                    setSimLog((prev) => [
                        `🔄 Deteksi Imbalance RL pada Node ${node.value} (BF: ${balance}). Melakukan Right-Left Rotation...`,
                        ...prev,
                    ]);
                    node.right = rightRotate(node.right!);
                    return leftRotate(node);
                }

                return node;
            };

            const cloned = cloneTree(root);
            const finalRoot = insertAndBalance(cloned, val);
            updateLayout(finalRoot, 0, 0, 0, 110);
            setRoot(finalRoot);
            setSimLog((prev) => [`Angka ${val} sukses dimasukkan dan struktur diperbarui.`, ...prev]);
        }

        await new Promise((r) => setTimeout(r, 600));
        setActiveNodeId(null);
        setVisitedNodes([]);
        setIsExecuting(false);
    };

    // --- DELETION WITH ANIMATION LOGIC ---
    const handleDelete = async () => {
        const val = parseInt(inputValue);
        if (isNaN(val)) {
            setSimLog((prev) => ["Error: Masukkan angka untuk menghapus.", ...prev]);
            return;
        }
        setInputValue("");
        setIsExecuting(true);
        setVisitedNodes([]);
        setSuccessorNodeId(null);

        setSimLog((prev) => [`Mencari angka ${val} untuk dihapus...`, ...prev]);

        // Find the node first for visualization
        let current = root;
        let found = false;
        while (current) {
            setActiveNodeId(current.id);
            setVisitedNodes((p) => [...p, current!.id]);
            await new Promise((r) => setTimeout(r, 700));

            if (val === current.value) {
                found = true;
                break;
            } else if (val < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (!found) {
            setSimLog((prev) => [`Nilai ${val} tidak ditemukan di dalam Tree.`, ...prev]);
            await new Promise((r) => setTimeout(r, 800));
        } else {
            // Step trace log
            if (current) {
                const hasLeft = !!current.left;
                const hasRight = !!current.right;

                if (!hasLeft && !hasRight) {
                    setSimLog((prev) => [
                        `🗑️ Node ${current!.value} adalah Leaf (tidak punya anak). Hapus langsung.`,
                        ...prev,
                    ]);
                } else if (hasLeft && hasRight) {
                    setSimLog((prev) => [
                        `🗑️ Node ${current!.value} punya dua anak. Cari Inorder Successor (nilai terkecil di subtree kanan)...`,
                        ...prev,
                    ]);
                    // Let's find successor
                    let succ = current.right;
                    while (succ && succ.left) {
                        setSuccessorNodeId(succ.id);
                        await new Promise((r) => setTimeout(r, 450));
                        succ = succ.left;
                    }
                    if (succ) {
                        setSuccessorNodeId(succ.id);
                        setSimLog((prev) => [
                            `🔎 Inorder Successor ditemukan: Node ${succ!.value}. Salin nilainya ke Node target, lalu hapus Node ${succ!.value} yang kosong.`,
                            ...prev,
                        ]);
                        await new Promise((r) => setTimeout(r, 1500));
                    }
                } else {
                    const childVal = current.left ? current.left.value : current.right!.value;
                    setSimLog((prev) => [
                        `🗑️ Node ${current!.value} punya 1 anak (${childVal}). Pintaskan koneksi parent langsung ke anak tersebut.`,
                        ...prev,
                    ]);
                }
            }

            await new Promise((r) => setTimeout(r, 850));

            // Perform deletion helper
            const deleteAndBalance = (node: AVLNode | null, v: number): AVLNode | null => {
                if (!node) return null;

                if (v < node.value) {
                    node.left = deleteAndBalance(node.left, v);
                } else if (v > node.value) {
                    node.right = deleteAndBalance(node.right, v);
                } else {
                    // Node target ditemukan
                    if (!node.left && !node.right) {
                        return null; // Case 1: Leaf
                    } else if (!node.left) {
                        return node.right; // Case 2: One child (right)
                    } else if (!node.right) {
                        return node.left; // Case 2: One child (left)
                    } else {
                        // Case 3: Two children
                        // Get successor
                        let minNode = node.right;
                        while (minNode.left) {
                            minNode = minNode.left;
                        }
                        node.value = minNode.value;
                        node.right = deleteAndBalance(node.right, minNode.value);
                    }
                }

                updateHeight(node);

                if (!avlMode) return node; // No balance checks for standard BST

                const balance = getBalance(node);

                // LL Case
                if (balance > 1 && getBalance(node.left) >= 0) {
                    return rightRotate(node);
                }
                // LR Case
                if (balance > 1 && getBalance(node.left) < 0) {
                    node.left = leftRotate(node.left!);
                    return rightRotate(node);
                }
                // RR Case
                if (balance < -1 && getBalance(node.right) <= 0) {
                    return leftRotate(node);
                }
                // RL Case
                if (balance < -1 && getBalance(node.right) > 0) {
                    node.right = rightRotate(node.right!);
                    return leftRotate(node);
                }

                return node;
            };

            const cloned = cloneTree(root);
            const finalRoot = deleteAndBalance(cloned, val);
            updateLayout(finalRoot, 0, 0, 0, 110);
            setRoot(finalRoot);
            setSimLog((prev) => [`Sukses menghapus ${val} dari Tree.`, ...prev]);
        }

        setActiveNodeId(null);
        setVisitedNodes([]);
        setSuccessorNodeId(null);
        setIsExecuting(false);
    };

    // --- TAB 2: ROTATION PLAYGROUND LOGIC ---
    const loadRotationPreset = (preset: RotationPreset) => {
        setRotationPreset(preset);
        setRotationStep(0);

        let newRoot: AVLNode | null = null;

        if (preset === "LL") {
            // Left-Left imbalance (Right Rotation needed)
            // 30
            //  /
            // 20
            //  /
            // 10
            newRoot = {
                id: "30",
                value: 30,
                height: 3,
                x: 0,
                y: 0,
                level: 0,
                left: {
                    id: "20",
                    value: 20,
                    height: 2,
                    x: 0,
                    y: 0,
                    level: 1,
                    left: {
                        id: "10",
                        value: 10,
                        height: 1,
                        x: 0,
                        y: 0,
                        level: 2,
                        left: null,
                        right: null,
                    },
                    right: null,
                },
                right: null,
            };
            setRotationLog("Pohon memiliki Imbalance Kiri-Kiri (LL). Tinggi subtree kiri = 2, subtree kanan = 0. Balance Factor root (30) = +2.");
        } else if (preset === "RR") {
            // Right-Right imbalance (Left Rotation needed)
            // 10
            //  \
            // 20
            //  \
            // 30
            newRoot = {
                id: "10",
                value: 10,
                height: 3,
                x: 0,
                y: 0,
                level: 0,
                left: null,
                right: {
                    id: "20",
                    value: 20,
                    height: 2,
                    x: 0,
                    y: 0,
                    level: 1,
                    left: null,
                    right: {
                        id: "30",
                        value: 30,
                        height: 1,
                        x: 0,
                        y: 0,
                        level: 2,
                        left: null,
                        right: null,
                    },
                },
            };
            setRotationLog("Pohon memiliki Imbalance Kanan-Kanan (RR). Tinggi subtree kiri = 0, subtree kanan = 2. Balance Factor root (10) = -2.");
        } else if (preset === "LR") {
            // Left-Right imbalance (Left Rotation on child, then Right Rotation on root)
            // 30
            //  /
            // 10
            //  \
            // 20
            newRoot = {
                id: "30",
                value: 30,
                height: 3,
                x: 0,
                y: 0,
                level: 0,
                left: {
                    id: "10",
                    value: 10,
                    height: 2,
                    x: 0,
                    y: 0,
                    level: 1,
                    left: null,
                    right: {
                        id: "20",
                        value: 20,
                        height: 1,
                        x: 0,
                        y: 0,
                        level: 2,
                        left: null,
                        right: null,
                    },
                },
                right: null,
            };
            setRotationLog("Pohon memiliki Imbalance Kiri-Kanan (LR) berzig-zag. Node 10 adalah anak kiri, tetapi anak dari 10 ada di kanan (20). BF root (30) = +2.");
        } else if (preset === "RL") {
            // Right-Left imbalance (Right Rotation on child, then Left Rotation on root)
            // 10
            //  \
            // 30
            //  /
            // 20
            newRoot = {
                id: "10",
                value: 10,
                height: 3,
                x: 0,
                y: 0,
                level: 0,
                left: null,
                right: {
                    id: "30",
                    value: 30,
                    height: 2,
                    x: 0,
                    y: 0,
                    level: 1,
                    left: {
                        id: "20",
                        value: 20,
                        height: 1,
                        x: 0,
                        y: 0,
                        level: 2,
                        left: null,
                        right: null,
                    },
                    right: null,
                },
            };
            setRotationLog("Pohon memiliki Imbalance Kanan-Kiri (RL) berzig-zag. Node 30 adalah anak kanan, tetapi anak dari 30 ada di kiri (20). BF root (10) = -2.");
        }

        updateLayout(newRoot, 0, 0, 0, 100);
        setRotationRoot(newRoot);
    };

    const handleRotationStep = () => {
        if (!rotationRoot) return;

        const nextStep = rotationStep + 1;
        setRotationStep(nextStep);

        const cloned = cloneTree(rotationRoot);
        if (!cloned) return;

        if (rotationPreset === "LL") {
            if (nextStep === 1) {
                // Highlight pivot
                cloned.left!.highlightState = "pivot";
                cloned.highlightState = "active";
                setRotationLog("👉 Langkah 1: Pilih Node 20 (anak kiri) sebagai Pivot. Node 30 (root bermasalah) akan diturunkan menjadi anak kanan dari Node 20.");
                setRotationRoot(cloned);
            } else if (nextStep === 2) {
                // Execute rotation
                const balanced = rightRotate(cloned);
                updateLayout(balanced, 0, 0, 0, 100);
                setRotationLog("✅ Langkah 2 (Rotasi Selesai): Node 30 sukses berputar ke kanan. Node 20 menjadi Root baru. Seluruh pohon sekarang seimbang!");
                setRotationRoot(balanced);
            }
        } else if (rotationPreset === "RR") {
            if (nextStep === 1) {
                // Highlight pivot
                cloned.right!.highlightState = "pivot";
                cloned.highlightState = "active";
                setRotationLog("👉 Langkah 1: Pilih Node 20 (anak kanan) sebagai Pivot. Node 10 (root bermasalah) akan diturunkan menjadi anak kiri dari Node 20.");
                setRotationRoot(cloned);
            } else if (nextStep === 2) {
                // Execute rotation
                const balanced = leftRotate(cloned);
                updateLayout(balanced, 0, 0, 0, 100);
                setRotationLog("✅ Langkah 2 (Rotasi Selesai): Node 10 sukses berputar ke kiri. Node 20 menjadi Root baru. Seluruh pohon sekarang seimbang!");
                setRotationRoot(balanced);
            }
        } else if (rotationPreset === "LR") {
            if (nextStep === 1) {
                // Highlight pivot for first rotation
                cloned.left!.right!.highlightState = "pivot";
                cloned.left!.highlightState = "active";
                setRotationLog("👉 Langkah 1 (Rotasi Anak Kiri): Karena berbentuk zig-zag, kita harus meluruskan subtree terlebih dahulu. Lakukan Left Rotation pada anak kiri (10), dengan Node 20 sebagai pivot.");
                setRotationRoot(cloned);
            } else if (nextStep === 2) {
                // Perform left rotation on left child
                cloned.left = leftRotate(cloned.left!);
                updateLayout(cloned, 0, 0, 0, 100);
                cloned.left!.highlightState = "pivot"; // 20 is now left child
                cloned.highlightState = "active"; // 30 is root
                setRotationLog("👉 Langkah 2 (Meluruskan Selesai): Subtree kiri sekarang berbentuk garis lurus (30 - 20 - 10). Selanjutnya, lakukan Right Rotation utama pada root (30) dengan pivot Node 20.");
                setRotationRoot(cloned);
            } else if (nextStep === 3) {
                // Perform right rotation on root
                const balanced = rightRotate(cloned);
                updateLayout(balanced, 0, 0, 0, 100);
                setRotationLog("✅ Langkah 3 (Rotasi Selesai): Right rotation berhasil! Node 20 menjadi Root, Node 10 di kiri dan Node 30 di kanan. Tree seimbang!");
                setRotationRoot(balanced);
            }
        } else if (rotationPreset === "RL") {
            if (nextStep === 1) {
                // Highlight pivot for first rotation
                cloned.right!.left!.highlightState = "pivot";
                cloned.right!.highlightState = "active";
                setRotationLog("👉 Langkah 1 (Rotasi Anak Kanan): Karena berbentuk zig-zag, kita meluruskan subtree terlebih dahulu. Lakukan Right Rotation pada anak kanan (30), dengan Node 20 sebagai pivot.");
                setRotationRoot(cloned);
            } else if (nextStep === 2) {
                // Perform right rotation on right child
                cloned.right = rightRotate(cloned.right!);
                updateLayout(cloned, 0, 0, 0, 100);
                cloned.right!.highlightState = "pivot"; // 20 is now right child
                cloned.highlightState = "active"; // 10 is root
                setRotationLog("👉 Langkah 2 (Meluruskan Selesai): Subtree kanan sekarang lurus (10 - 20 - 30). Selanjutnya, lakukan Left Rotation utama pada root (10) dengan pivot Node 20.");
                setRotationRoot(cloned);
            } else if (nextStep === 3) {
                // Perform left rotation on root
                const balanced = leftRotate(cloned);
                updateLayout(balanced, 0, 0, 0, 100);
                setRotationLog("✅ Langkah 3 (Rotasi Selesai): Left rotation berhasil! Node 20 menjadi Root, Node 10 di kiri, Node 30 di kanan. Tree seimbang!");
                setRotationRoot(balanced);
            }
        }
    };

    // --- TAB 3: DELETION CASES PLAYGROUND LOGIC ---
    const loadDeleteCasePreset = (c: "LEAF" | "ONE_CHILD" | "TWO_CHILDREN") => {
        setDeleteCasePreset(c);
        setDeleteStep(0);
        let newRoot: AVLNode | null = null;

        if (c === "LEAF") {
            // Tree: 20 -> 10, 30
            newRoot = {
                id: "20", value: 20, height: 2, x: 0, y: 0, level: 0,
                left: { id: "10", value: 10, height: 1, x: 0, y: 0, level: 1, left: null, right: null },
                right: { id: "30", value: 30, height: 1, x: 0, y: 0, level: 1, left: null, right: null },
            };
            setDeleteLog("Kasus 1: Hapus Leaf Node. Kita akan menghapus Node 10. Node 10 tidak memiliki anak sama sekali.");
        } else if (c === "ONE_CHILD") {
            // Tree: 20 -> 10 -> 5 (left), 30
            newRoot = {
                id: "20", value: 20, height: 3, x: 0, y: 0, level: 0,
                left: {
                    id: "10", value: 10, height: 2, x: 0, y: 0, level: 1,
                    left: { id: "5", value: 5, height: 1, x: 0, y: 0, level: 2, left: null, right: null },
                    right: null,
                },
                right: { id: "30", value: 30, height: 1, x: 0, y: 0, level: 1, left: null, right: null },
            };
            setDeleteLog("Kasus 2: Hapus Node dengan 1 Anak. Kita akan menghapus Node 10. Node 10 memiliki satu anak (5).");
        } else if (c === "TWO_CHILDREN") {
            // Tree: 20 -> 10, 40 -> 30, 50
            newRoot = {
                id: "20", value: 20, height: 3, x: 0, y: 0, level: 0,
                left: { id: "10", value: 10, height: 1, x: 0, y: 0, level: 1, left: null, right: null },
                right: {
                    id: "40", value: 40, height: 2, x: 0, y: 0, level: 1,
                    left: { id: "30", value: 30, height: 1, x: 0, y: 0, level: 2, left: null, right: null },
                    right: { id: "50", value: 50, height: 1, x: 0, y: 0, level: 2, left: null, right: null },
                },
            };
            setDeleteLog("Kasus 3: Hapus Node dengan 2 Anak. Kita akan menghapus Node 40. Node 40 memiliki anak kiri (30) dan kanan (50).");
        }

        updateLayout(newRoot, 0, 0, 0, 100);
        setDeleteRoot(newRoot);
    };

    const handleDeletePresetStep = () => {
        if (!deleteRoot) return;
        const nextStep = deleteStep + 1;
        setDeleteStep(nextStep);

        const cloned = cloneTree(deleteRoot);
        if (!cloned) return;

        if (deleteCasePreset === "LEAF") {
            if (nextStep === 1) {
                // Highlight target node
                cloned.left!.highlightState = "active";
                setDeleteLog("👉 Langkah 1: Cari Node 10. Node ditemukan di sebelah kiri Root 20. Terlihat Node 10 tidak memiliki anak (Leaf).");
                setDeleteRoot(cloned);
            } else if (nextStep === 2) {
                // Delete node
                cloned.left = null;
                updateHeight(cloned);
                updateLayout(cloned, 0, 0, 0, 100);
                setDeleteLog("✅ Langkah 2 (Selesai): Hubungan dari parent (20) ke Node 10 diputus. Node 10 berhasil dihapus secara langsung.");
                setDeleteRoot(cloned);
            }
        } else if (deleteCasePreset === "ONE_CHILD") {
            if (nextStep === 1) {
                // Highlight target node and its child
                cloned.left!.highlightState = "active";
                cloned.left!.left!.highlightState = "successor";
                setDeleteLog("👉 Langkah 1: Cari Node 10. Ditemukan. Node 10 memiliki tepat satu anak, yaitu Node 5. Siapkan anak (5) untuk menggantikan posisi 10.");
                setDeleteRoot(cloned);
            } else if (nextStep === 2) {
                // Bypass parent to child
                cloned.left = cloned.left!.left;
                updateHeight(cloned);
                updateLayout(cloned, 0, 0, 0, 100);
                setDeleteLog("✅ Langkah 2 (Selesai): Parent (20) memotong koneksi ke Node 10, langsung menyambungkan ke Node 5. Node 10 terhapus.");
                setDeleteRoot(cloned);
            }
        } else if (deleteCasePreset === "TWO_CHILDREN") {
            if (nextStep === 1) {
                // Highlight target
                cloned.right!.highlightState = "active";
                setDeleteLog("👉 Langkah 1: Cari Node 40. Ditemukan. Karena Node 40 memiliki dua anak (30 dan 50), kita tidak bisa langsung menghapusnya. Kita butuh mencari Inorder Successor.");
                setDeleteRoot(cloned);
            } else if (nextStep === 2) {
                // Highlight target and successor
                cloned.right!.highlightState = "active";
                cloned.right!.left!.highlightState = "successor"; // 30 is successor
                setDeleteLog("👉 Langkah 2: Cari Inorder Successor (Nilai terkecil di subtree kanan dari 40). Kita bergerak ke anak kanan (50) lalu menyusuri ke kiri sampai habis. Kita temukan Node 30.");
                setDeleteRoot(cloned);
            } else if (nextStep === 3) {
                // Swap values
                cloned.right!.highlightState = "active";
                cloned.right!.value = 30; // value copy
                cloned.right!.left!.highlightState = "successor";
                setDeleteLog("👉 Langkah 3: Salin nilai dari Inorder Successor (30) ke Node target (40 berubah menjadi 30). Selanjutnya, hapus Node 30 yang asli di bawah.");
                setDeleteRoot(cloned);
            } else if (nextStep === 4) {
                // Delete successor node
                cloned.right!.left = null;
                updateHeight(cloned.right!);
                updateHeight(cloned);
                updateLayout(cloned, 0, 0, 0, 100);
                setDeleteLog("✅ Langkah 4 (Selesai): Hapus Node 30 di tingkat paling bawah. Karena Node 30 yang asli di bawah adalah Leaf, ia bisa langsung dihapus. Pohon kini sukses diperbarui!");
                setDeleteRoot(cloned);
            }
        }
    };

    // --- RENDER NODES UTILITY ---
    const renderNodes = (node: AVLNode | null): React.ReactNode => {
        if (!node) return null;

        let nodeColorClass = "fill-white dark:fill-slate-900 stroke-pink-500/30 stroke-2";
        let textColorClass = "fill-slate-900 dark:fill-white";

        const isNodeActive = activeNodeId === node.id || node.highlightState === "active";
        const isNodeVisited = visitedNodes.includes(node.id) || node.highlightState === "visited";
        const isPivot = node.highlightState === "pivot";
        const isSuccessor = successorNodeId === node.id || node.highlightState === "successor";

        if (isNodeActive) {
            nodeColorClass = "fill-pink-500 stroke-pink-200 stroke-4";
            textColorClass = "fill-white";
        } else if (isPivot) {
            nodeColorClass = "fill-amber-500 stroke-amber-200 stroke-4";
            textColorClass = "fill-white";
        } else if (isSuccessor) {
            nodeColorClass = "fill-emerald-500 stroke-emerald-200 stroke-4";
            textColorClass = "fill-white";
        } else if (isNodeVisited) {
            nodeColorClass = "fill-pink-500/20 stroke-pink-500 stroke-2";
        }

        const bf = node.balanceFactor ?? getBalance(node);
        const bfColor = Math.abs(bf) > 1 ? "text-rose-500 font-black" : "text-slate-400 dark:text-slate-500 font-bold";

        return (
            <React.Fragment key={node.id}>
                {/* Connector line to Left */}
                {node.left && (
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        x1={node.x}
                        y1={node.y}
                        x2={node.left.x}
                        y2={node.left.y}
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-slate-300 dark:text-slate-700"
                    />
                )}
                {/* Connector line to Right */}
                {node.right && (
                    <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        x1={node.x}
                        y1={node.y}
                        x2={node.right.x}
                        y2={node.right.y}
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-slate-300 dark:text-slate-700"
                    />
                )}

                {/* Node circle and text */}
                <motion.g
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: node.x, y: node.y }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                >
                    <circle r="22" className={`transition-colors duration-300 ${nodeColorClass}`} />
                    <text
                        dy=".3em"
                        textAnchor="middle"
                        className={`text-[13px] font-black pointer-events-none transition-colors ${textColorClass}`}
                    >
                        {node.value}
                    </text>

                    {/* Balance Factor badge above the node */}
                    <foreignObject x="-20" y="-45" width="40" height="20">
                        <div className="flex justify-center items-center h-full">
                            <span className={`text-[9px] font-mono leading-none bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded border border-black/5 ${bfColor}`}>
                                {bf > 0 ? `+${bf}` : bf}
                            </span>
                        </div>
                    </foreignObject>

                    {/* Height label on the side */}
                    <text
                        x="28"
                        y="5"
                        className="text-[8px] font-mono fill-slate-400 font-bold"
                    >
                        h={node.height}
                    </text>
                </motion.g>

                {renderNodes(node.left)}
                {renderNodes(node.right)}
            </React.Fragment>
        );
    };

    return (
        <div className="bg-white dark:bg-surface border-2 border-pink-500/15 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden">
            {/* TABS SELECTOR */}
            <div className="flex border-b-2 border-slate-100 dark:border-slate-800 pb-4 mb-6 gap-2 overflow-x-auto no-scrollbar">
                {[
                    { id: "SIMULATION", label: "Simulasi Dinamis (BST vs AVL)", icon: "terminal" },
                    { id: "ROTATIONS", label: "Playground Rotasi (LL/RR/LR/RL)", icon: "sync" },
                    { id: "DELETIONS", label: "Kasus Deletion BST", icon: "delete_sweep" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                            activeTab === tab.id
                                ? "bg-pink-500 text-white shadow-md shadow-pink-500/25"
                                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                    >
                        <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB 1: DYNAMIC SIMULATION */}
            {activeTab === "SIMULATION" && (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Controls & logs */}
                    <div className="lg:w-80 flex flex-col gap-6">
                        <div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-2 uppercase italic tracking-tighter">
                                <span className="material-symbols-outlined text-pink-500">forest</span>
                                BST vs AVL Builder
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold italic">
                                Masukkan angka secara berurutan (misal: 10, 20, 30) untuk membandingkan pembentukan tinggi pohon antara BST standar dengan AVL yang otomatis melakukan rotasi.
                            </p>
                        </div>

                        {/* MODE SELECTOR */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-2xl border border-slate-100 dark:border-slate-850 flex gap-2">
                            <button
                                onClick={() => {
                                    setAvlMode(false);
                                    setSimLog((prev) => ["Switched to Normal BST Mode. Rotations disabled.", ...prev]);
                                }}
                                disabled={isExecuting}
                                className={`flex-1 py-2 rounded-xl text-2xs font-black uppercase tracking-wider transition-all ${
                                    !avlMode
                                        ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                                        : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                BST Standar
                            </button>
                            <button
                                onClick={() => {
                                    setAvlMode(true);
                                    setSimLog((prev) => ["Switched to AVL Mode. Rotations enabled.", ...prev]);
                                }}
                                disabled={isExecuting}
                                className={`flex-1 py-2 rounded-xl text-2xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                                    avlMode
                                        ? "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 border border-pink-500/25"
                                        : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[10px]">bolt</span>
                                AVL (Auto-Balance)
                            </button>
                        </div>

                        {/* INPUT PANEL */}
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Nilai (1-99)"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={isExecuting}
                                    className="flex-1 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 font-black outline-none focus:border-pink-500 transition-all disabled:opacity-50 text-sm"
                                />
                                <div className="flex gap-1">
                                    <button
                                        onClick={handleInsert}
                                        disabled={isExecuting || !inputValue}
                                        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-xl font-black text-xs shadow-lg shadow-pink-500/20 transition-all disabled:opacity-50"
                                    >
                                        INSERT
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={isExecuting || !inputValue}
                                        className="border-2 border-rose-500/35 hover:border-rose-500 text-rose-500 px-3 py-2 rounded-xl font-black text-xs transition-all disabled:opacity-50"
                                    >
                                        DELETE
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        setRoot(null);
                                        setSimLog(["Tree dikosongkan."]);
                                        setVisitedNodes([]);
                                        setActiveNodeId(null);
                                    }}
                                    disabled={isExecuting}
                                    className="py-2.5 bg-slate-50 hover:bg-rose-500/5 hover:text-rose-500 text-slate-500 border border-slate-200 dark:border-slate-850 rounded-xl font-black text-2xs transition-all disabled:opacity-50"
                                >
                                    CLEAR TREE
                                </button>
                                <button
                                    onClick={resetSimulationTree}
                                    disabled={isExecuting}
                                    className="py-2.5 bg-slate-50 hover:bg-pink-500/5 hover:text-pink-500 text-slate-500 border border-slate-200 dark:border-slate-850 rounded-xl font-black text-2xs transition-all disabled:opacity-50"
                                >
                                    RESET DEFAULT
                                </button>
                            </div>
                        </div>

                        {/* LIVE STEPS LOG */}
                        <div className="flex-1 min-h-[140px] max-h-[220px] bg-slate-900 rounded-2xl border border-white/5 p-4 flex flex-col">
                            <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-2 flex items-center gap-1 leading-none">
                                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span>
                                Live Tracer Console:
                            </span>
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 text-3xs font-mono text-slate-400">
                                {simLog.map((log, index) => (
                                    <div
                                        key={index}
                                        className={`leading-normal border-l-2 pl-2 ${
                                            index === 0
                                                ? "text-slate-100 border-pink-500 font-bold"
                                                : log.includes("🔄")
                                                ? "text-amber-400 border-amber-500"
                                                : log.includes("🗑️")
                                                ? "text-rose-400 border-rose-500"
                                                : "border-slate-700"
                                        }`}
                                    >
                                        {log}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Tree Canvas */}
                    <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-3xl border-2 border-primary/5 min-h-[380px] flex items-center justify-center p-4">
                        <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-slate-400 text-3xs font-mono">
                            Tinggi Pohon: <strong className="text-white">{getHeight(root)}</strong>
                        </div>
                        {!root ? (
                            <div className="text-center opacity-30 select-none">
                                <span className="material-symbols-outlined text-6xl">forest</span>
                                <p className="font-black uppercase tracking-widest text-xs mt-2">Tree is Empty</p>
                            </div>
                        ) : (
                            <svg
                                width="100%"
                                height="100%"
                                viewBox="-260 -30 520 330"
                                className="w-full h-full max-h-[420px]"
                            >
                                {renderNodes(root)}
                            </svg>
                        )}
                    </div>
                </div>
            )}

            {/* TAB 2: ROTATION PLAYGROUND */}
            {activeTab === "ROTATIONS" && (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Control column */}
                    <div className="lg:w-80 flex flex-col gap-6">
                        <div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-2 uppercase italic tracking-tighter">
                                <span className="material-symbols-outlined text-pink-500">sync</span>
                                Rotasi Simulator
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold italic">
                                Pilih salah satu skenario ketidakseimbangan AVL Tree untuk melakukan penyeimbangan secara terarah (langkah demi langkah).
                            </p>
                        </div>

                        {/* CASE SELECTORS */}
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: "LL", label: "LL (Single Right)", desc: "Left-heavy line" },
                                { id: "RR", label: "RR (Single Left)", desc: "Right-heavy line" },
                                { id: "LR", label: "LR (Left-Right)", desc: "Zig-zag left" },
                                { id: "RL", label: "RL (Right-Left)", desc: "Zig-zag right" },
                            ].map((preset) => (
                                <button
                                    key={preset.id}
                                    onClick={() => loadRotationPreset(preset.id as RotationPreset)}
                                    className={`p-3 rounded-xl border text-left transition-all ${
                                        rotationPreset === preset.id
                                            ? "bg-pink-500/5 border-pink-500 text-pink-700 dark:text-pink-400"
                                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"
                                    }`}
                                >
                                    <p className="text-xs font-black">{preset.label}</p>
                                    <p className="text-[9px] text-slate-400 font-bold italic leading-none mt-1">
                                        {preset.desc}
                                    </p>
                                </button>
                            ))}
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="space-y-3">
                            <button
                                onClick={handleRotationStep}
                                disabled={
                                    (rotationPreset === "LL" && rotationStep >= 2) ||
                                    (rotationPreset === "RR" && rotationStep >= 2) ||
                                    (rotationPreset === "LR" && rotationStep >= 3) ||
                                    (rotationPreset === "RL" && rotationStep >= 3)
                                }
                                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white py-3 rounded-xl font-black text-xs shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">forward</span>
                                LANGKAH BERIKUTNYA
                            </button>
                            <button
                                onClick={() => loadRotationPreset(rotationPreset)}
                                className="w-full border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:border-pink-500 hover:text-pink-500 py-2.5 rounded-xl font-black text-2xs transition-all"
                            >
                                ULANGI DEMO (RESET)
                            </button>
                        </div>

                        {/* DESCRIPTION PANEL */}
                        <div className="bg-slate-900 rounded-2xl border border-white/5 p-4 min-h-[120px] flex flex-col justify-center">
                            <p className="text-2xs font-black text-pink-500 uppercase tracking-wider mb-2 font-mono">
                                Penjelasan Langkah ({rotationStep}):
                            </p>
                            <p className="text-3xs font-mono text-slate-300 leading-relaxed italic">
                                {rotationLog}
                            </p>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-3xl border-2 border-primary/5 min-h-[380px] flex items-center justify-center p-4">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="-160 -30 320 280"
                            className="w-full h-full max-h-[420px]"
                        >
                            {renderNodes(rotationRoot)}
                        </svg>
                    </div>
                </div>
            )}

            {/* TAB 3: DELETION DEMO */}
            {activeTab === "DELETIONS" && (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Control Panel */}
                    <div className="lg:w-80 flex flex-col gap-6">
                        <div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-2 uppercase italic tracking-tighter">
                                <span className="material-symbols-outlined text-pink-500">delete_sweep</span>
                                Deletion Kasus
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-bold italic">
                                Terdapat 3 skenario utama dalam menghapus simpul pada BST (Binary Search Tree). Pilih skenario di bawah untuk demonstrasi visual.
                            </p>
                        </div>

                        {/* CASE BUTTONS */}
                        <div className="flex flex-col gap-2">
                            {[
                                { id: "LEAF", label: "Kasus 1: Hapus Leaf Node", desc: "Hapus simpul tanpa anak" },
                                { id: "ONE_CHILD", label: "Kasus 2: Hapus Node (1 Anak)", desc: "Pintaskan koneksi ke anak" },
                                { id: "TWO_CHILDREN", label: "Kasus 3: Hapus Node (2 Anak)", desc: "Gunakan Inorder Successor" },
                            ].map((preset) => (
                                <button
                                    key={preset.id}
                                    onClick={() => loadDeleteCasePreset(preset.id as any)}
                                    className={`p-3 rounded-xl border text-left transition-all ${
                                        deleteCasePreset === preset.id
                                            ? "bg-pink-500/5 border-pink-500 text-pink-700 dark:text-pink-400"
                                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"
                                    }`}
                                >
                                    <p className="text-xs font-black">{preset.label}</p>
                                    <p className="text-[9px] text-slate-400 font-bold italic leading-none mt-1">
                                        {preset.desc}
                                    </p>
                                </button>
                            ))}
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="space-y-3">
                            <button
                                onClick={handleDeletePresetStep}
                                disabled={
                                    (deleteCasePreset === "LEAF" && deleteStep >= 2) ||
                                    (deleteCasePreset === "ONE_CHILD" && deleteStep >= 2) ||
                                    (deleteCasePreset === "TWO_CHILDREN" && deleteStep >= 4)
                                }
                                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white py-3 rounded-xl font-black text-xs shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">forward</span>
                                LANGKAH BERIKUTNYA
                            </button>
                            <button
                                onClick={() => loadDeleteCasePreset(deleteCasePreset)}
                                className="w-full border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:border-pink-500 hover:text-pink-500 py-2.5 rounded-xl font-black text-2xs transition-all"
                            >
                                ULANGI DEMO (RESET)
                            </button>
                        </div>

                        {/* DESCRIPTION PANEL */}
                        <div className="bg-slate-900 rounded-2xl border border-white/5 p-4 min-h-[120px] flex flex-col justify-center">
                            <p className="text-2xs font-black text-pink-500 uppercase tracking-wider mb-2 font-mono">
                                Langkah {deleteStep}:
                            </p>
                            <p className="text-3xs font-mono text-slate-300 leading-relaxed italic">
                                {deleteLog}
                            </p>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-3xl border-2 border-primary/5 min-h-[380px] flex items-center justify-center p-4">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="-160 -30 320 280"
                            className="w-full h-full max-h-[420px]"
                        >
                            {renderNodes(deleteRoot)}
                        </svg>
                    </div>
                </div>
            )}

            {/* LEGEND ROW */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-850 flex flex-wrap gap-5 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-pink-200" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Target / Aktif</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-505 bg-amber-500 border-2 border-amber-200" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Pivot Rotasi</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-emerald-200" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Successor (Node Pengganti)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-pink-500/20 border border-pink-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Ditelusuri</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-pink-500/35 bg-white dark:bg-slate-900" />
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Normal</span>
                </div>
            </div>
        </div>
    );
}
