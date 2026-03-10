"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PresentationModeProps {
    slides: React.ReactNode[];
    initialSlide?: number;
    onExit: () => void;
    isOpen: boolean;
}

export default function PresentationMode({ slides, initialSlide = 0, onExit, isOpen }: PresentationModeProps) {
    const [currentSlide, setCurrentSlide] = useState(initialSlide);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Sync initial slide when opened
    useEffect(() => {
        if (isOpen) {
            setCurrentSlide(initialSlide);
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    }, [isOpen, initialSlide]);

    const enterFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch((err) => {
                console.error(`Error attempting to exit full-screen mode: ${err.message}`);
            });
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            if (!document.fullscreenElement && isOpen) {
                onExit();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [isOpen, onExit]);

    const nextSlide = useCallback(() => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    }, [currentSlide, slides.length]);

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    }, [currentSlide]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'Escape') {
                onExit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, nextSlide, prevSlide, onExit]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 bg-bg-base flex flex-col items-center justify-center overflow-hidden font-sans presentation-root">
            {/* Slide Content */}
            <div className="flex-1 w-full max-w-7xl mx-auto flex items-center justify-center p-6 md:p-8 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="w-full h-full flex flex-col justify-start overflow-y-auto slide-container custom-scrollbar pr-2"
                    >
                        <div className="min-h-full flex flex-col justify-center">
                            {slides[currentSlide]}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/10">
                <motion.div
                    className="h-full bg-primary"
                    initial={false}
                    animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
            </div>

            {/* Slide Indicator */}
            <div className="absolute top-4 right-6 text-sm font-black text-primary/40 tracking-widest font-mono">
                {currentSlide + 1} / {slides.length}
            </div>

            {/* Floating Controls - Repositioned to Bottom Right */}
            <div className="absolute bottom-6 right-8 flex items-center gap-2 bg-surface/80 backdrop-blur-md border border-primary/20 p-1.5 rounded-2xl shadow-2xl scale-90 sm:scale-95 transition-transform hover:scale-100 active:scale-95 overflow-hidden z-50">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-1.5 rounded-xl hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors group"
                    title="Previous (Left Arrow)"
                >
                    <span className="material-symbols-outlined text-sm text-primary group-active:scale-90 transition-transform">chevron_left</span>
                </button>

                <div className="px-1 font-black text-[10px] text-primary/60 min-w-8 text-center select-none font-mono">
                    {currentSlide + 1} / {slides.length}
                </div>

                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="p-1.5 rounded-xl hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors group"
                    title="Next (Right Arrow / Space)"
                >
                    <span className="material-symbols-outlined text-sm text-primary group-active:scale-110 transition-transform">chevron_right</span>
                </button>

                <div className="w-px h-4 bg-primary/20 mx-0.5"></div>

                <button
                    onClick={onExit}
                    className="p-1.5 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors group"
                    title="Exit (Esc)"
                >
                    <span className="material-symbols-outlined text-base group-hover:rotate-90 transition-transform">close</span>
                </button>
            </div>

            <style jsx global>{`
        .presentation-root {
          /* Force dark mode for presentation if needed, or stick to system */
        }
        .slide-container::-webkit-scrollbar {
          width: 4px;
        }
        .slide-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .slide-container::-webkit-scrollbar-thumb {
          background: rgba(var(--primary-rgb), 0.2);
          border-radius: 10px;
        }
        /* Style adjustments for content inside presentation mode */
        .slide-container h1, .slide-container h2, .slide-container h3, .slide-container h4 {
          margin-top: 0 !important;
          line-height: 1.1 !important;
        }
        .slide-container {
          font-size: 0.95rem; /* Slight scale down */
        }
        /* Ensure animations within slides can trigger */
      `}</style>
        </div>
    );
}
