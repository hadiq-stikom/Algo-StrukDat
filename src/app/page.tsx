import Header from "@/components/Header";
import ModuleCard from "@/components/ModuleCard";
import BottomNav from "@/components/BottomNav";
import { modules } from "@/data/modules";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 px-4 py-6">
        {/* Lecturer Profile Section */}
        <ScrollReveal>
          <section className="mb-8 bg-white dark:bg-surface rounded-2xl p-6 border border-primary/10 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-primary to-accent rounded-full blur opacity-25"></div>
              <img
                src="/lecturer.jpg"
                alt="Hadiq"
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-surface shadow-xl"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">Dosen Pengampu</h2>
              <p className="text-primary font-semibold text-lg mb-3">Hadiq,ST,M.Kom.</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
                Selamat datang di mata kuliah Algoritma dan Struktur Data. Mari kita eksplorasi dunia logika pemrograman bersama untuk membangun fondasi teknologi yang kuat.
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Course Catalog</h2>
            <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
              14 Modules
            </span>
          </div>
        </ScrollReveal>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
          {modules.map((module, index) => (
            <ScrollReveal key={module.id} delay={index * 50}>
              <ModuleCard module={module} />
            </ScrollReveal>
          ))}
        </div>
      </main>

      <BottomNav />
    </>
  );
}
