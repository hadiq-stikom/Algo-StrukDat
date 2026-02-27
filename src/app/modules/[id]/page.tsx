import React from "react";
import { modules } from "@/data/modules";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Module1Content from '@/components/modules/Module1Content';
import Module2Content from '@/components/modules/Module2Content';
import Module3Content from '@/components/modules/Module3Content';
import ModuleCompletionToggle from "@/components/ModuleCompletionToggle";
import ModuleProgressHeader from "@/components/ModuleProgressHeader";

import ModuleIndex from "@/components/ModuleIndex";

export async function generateStaticParams() {
    return modules.map((module) => ({
        id: module.id.toString(),
    }));
}

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const moduleId = parseInt(id);
    const module = modules.find((m) => m.id === moduleId);

    if (!module) {
        return <div>Module not found</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-20 bg-bg-base/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-3xl mx-auto w-full p-4">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/" className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-xl font-bold truncate">{module.id}. {module.title}</h1>
                    </div>
                    <ModuleIndex currentModuleId={module.id} showLabel={false} />
                </div>
            </header>

            <main className="flex-1 px-4 py-8 max-w-3xl mx-auto w-full pb-24">
                <div className="bg-white dark:bg-surface rounded-2xl p-6 border border-primary/5 shadow-sm mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 rounded-xl bg-primary/10 text-primary`}>
                            <span className="material-symbols-outlined text-3xl">{module.icon}</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-primary uppercase tracking-wider">Module {module.id}</p>
                            <h2 className="text-2xl font-bold">{module.title}</h2>
                        </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        {module.description}. In this module, we will explore the fundamental concepts and practical applications of this topic in computer science.
                    </p>

                    <ModuleProgressHeader moduleId={module.id} />
                </div>

                {/* Dynamic Module Content Component */}
                {id === '1' && <Module1Content />}
                {id === '2' && <Module2Content />}
                {id === '3' && <Module3Content />}

                {/* Module Completion Toggle (Client Side) */}
                <ModuleCompletionToggle moduleId={module.id} />

                {id !== '1' && id !== '2' && id !== '3' && (
                    <section className="space-y-6">
                        <h3 className="text-xl font-bold px-2">Content Topics</h3>
                        <div className="grid gap-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center gap-4 p-4 bg-white dark:bg-surface rounded-xl border border-primary/5 hover:border-primary/20 transition-all cursor-pointer group">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                        {item}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold">Topic {item} for {module.title}</h4>
                                        <p className="text-xs text-slate-500">5-10 minutes reading</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
