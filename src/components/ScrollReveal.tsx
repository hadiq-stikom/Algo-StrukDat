"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    animationClassName?: string;
    threshold?: number;
    once?: boolean;
    delay?: number;
}

/**
 * ScrollReveal component that triggers animations when children enter the viewport.
 * Uses Intersection Observer API for performance.
 */
export default function ScrollReveal({
    children,
    className = "",
    animationClassName = "transition-all duration-1000 ease-out",
    threshold = 0.1,
    once = true,
    delay = 0,
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            });
        }, { threshold });

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, once]);

    return (
        <div
            ref={domRef}
            style={{ transitionDelay: `${delay}ms` }}
            className={`${className} ${animationClassName} ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
                }`}
        >
            {children}
        </div>
    );
}
