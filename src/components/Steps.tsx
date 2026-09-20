import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { steps } from "../lib/data";
import { Btn, Eyebrow } from "./ui";

function StepContent({ step, compact = false }: { step: (typeof steps)[number]; compact?: boolean }) {
  return (
    <>
      <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/70">
        <span className="inline-block size-1.5 bg-sun" aria-hidden />
        Etapa {step.n} <span className="opacity-50">/ 04</span>
      </p>
      <h3
        className={`mt-3 max-w-lg font-light leading-tight tracking-[-0.04em] ${
          compact ? "text-2xl" : "text-3xl md:text-5xl"
        }`}
      >
        {step.title}
      </h3>
      <p className={`mt-3 text-white/70 ${compact ? "text-[13px] leading-5" : "max-w-md text-sm leading-6"}`}>
        {step.text}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
        {step.bullets.map((b) => (
          <span key={b} className="flex items-center gap-2 text-[11px] text-white/85">
            <Check size={13} className="text-sun" /> {b}
          </span>
        ))}
      </div>
    </>
  );
}

export default function Steps() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section id="processo" className="mx-auto max-w-[1450px] py-16 md:px-12 md:py-28">
      <div className="mb-10 flex flex-col justify-between gap-8 px-6 md:flex-row md:items-end">
        <div>
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="text-4xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Da simulação
            <br />
            ao <span className="text-azure-deep">sol</span> no telhado
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-ink/60">
          Um processo estruturado em quatro etapas, conduzido por engenheiros e equipes próprias — sem terceirização
          e sem custos escondidos.
        </p>
      </div>

      {/* Mobile: carrossel horizontal com snap — economiza altura */}
      <div className="lg:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {steps.map((s) => (
            <article key={s.n} className="relative h-[440px] w-[82vw] shrink-0 snap-center overflow-hidden rounded-3xl">
              <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/40 to-night/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <StepContent step={s} compact />
                <div className="mt-6">
                  <Btn href="#simulador" variant="linkLight">
                    Simule sua economia
                  </Btn>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-3 px-6 text-[10px] uppercase tracking-[0.18em] text-ink/40">Arraste para o lado →</p>
      </div>

      {/* Desktop: lista interativa + painel de imagem */}
      <div className="hidden gap-5 px-6 md:px-0 lg:grid lg:grid-cols-12 lg:px-0">
        <div className="flex flex-col lg:col-span-4">
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.n}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`group border-t border-ink/15 py-6 text-left transition-colors ${
                  isActive ? "text-ink" : "text-ink/40 hover:text-ink/70"
                }`}
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className={`text-3xl font-light tracking-[-0.04em] transition-colors ${
                      isActive ? "text-azure-deep" : ""
                    }`}
                  >
                    {s.n}
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] opacity-60">{s.label}</p>
                    <p className="mt-1 text-xl font-light tracking-[-0.03em]">{s.title}</p>
                  </div>
                </div>
                <div
                  className={`mt-5 h-0.5 origin-left bg-sun transition-transform duration-500 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[430px] overflow-hidden rounded-3xl lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.n}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img src={step.image} alt={step.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-12">
                <StepContent step={step} />
                <div className="mt-8">
                  <Btn href="#contato" variant="outline">
                    Falar com um especialista
                  </Btn>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
