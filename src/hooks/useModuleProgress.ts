"use client";

import { useState, useEffect } from "react";

export function useModuleProgress() {
    const [completedModules, setCompletedModules] = useState<number[]>([]);

    // Load progress from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("module_progress");
        if (saved) {
            try {
                setCompletedModules(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse module progress", e);
            }
        }
    }, []);

    const toggleModuleCompletion = (id: number) => {
        // Compute the new state outside of the setter to avoid side effects in updater
        const saved = localStorage.getItem("module_progress");
        let current: number[] = [];
        if (saved) {
            try {
                current = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse module progress", e);
            }
        }

        const isCompletedNow = current.includes(id);
        const next = isCompletedNow
            ? current.filter((mid) => mid !== id)
            : [...current, id];

        // Save to localStorage
        localStorage.setItem("module_progress", JSON.stringify(next));

        // Update local state
        setCompletedModules(next);

        // Dispatch custom event for cross-component sync
        window.dispatchEvent(new Event("moduleProgressChanged"));
    };

    const isCompleted = (id: number) => completedModules.includes(id);

    // Listen for changes from other components
    useEffect(() => {
        const handleSync = () => {
            const saved = localStorage.getItem("module_progress");
            if (saved) {
                setCompletedModules(JSON.parse(saved));
            }
        };

        window.addEventListener("moduleProgressChanged", handleSync);
        return () => window.removeEventListener("moduleProgressChanged", handleSync);
    }, []);

    return { completedModules, toggleModuleCompletion, isCompleted };
}
