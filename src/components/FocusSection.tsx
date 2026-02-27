"use client";

import React, { useEffect, useRef, useState } from "react";

interface FocusSectionProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * FocusSection - Memberikan efek zoom/highlight pada section yang sedang
 * aktif di viewport. Berguna saat presentasi via proyektor agar bagian
 * yang sedang dibahas menjadi fokus visual utama mahasiswa.
 */
export default function FocusSection({ children, className = "" }: FocusSectionProps) {
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsFocused(entry.isIntersecting);
                });
            },
            {
                // Trigger saat section mengisi minimal 35% area viewport
                threshold: 0.35,
                rootMargin: "-5% 0px -5% 0px",
            }
        );

        const el = ref.current;
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, []);

    return (
        <div
            ref={ref}
            className={`
                transition-all duration-500 ease-out
                ${isFocused
                    ? "scale-[1.025] shadow-2xl shadow-primary/20 ring-1 ring-primary/30 rounded-2xl z-10 relative"
                    : "scale-100 opacity-80"
                }
                ${className}
            `}
        >
            {children}
        </div>
    );
}
