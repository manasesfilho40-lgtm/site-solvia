import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleDollarSign, Plus, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { faq } from "../lib/data";
import { Eyebrow } from "./ui";

const cats: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "instalacao", label: "Instalação", icon: Wrench },
  { id: "financeiro", label: "Financeiro", icon: CircleDollarSign },
  { id: "manutencao", label: "Manutenção", icon: ShieldCheck },
];

export default function Faq() {
  const [cat, setCat] = useState("instalacao");
  const [open, setOpen] = useState(0);

  const items = faq.filter((f) => f.cat === cat);

  return (
    <section id="faq" className="bg-white px-6 py-16 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-[1450px] gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <h2 className="text-4xl font-light leading-[0.95] tracking-[-0.05em] md:text-6xl">
            Tudo o que você
            <br />
            precisa saber
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-6 text-black/50">
            Não encontrou sua pergunta? Fale com um dos nossos engenheiros pelo WhatsApp — respondemos em minutos.
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => {
              const activeCat = c.id === cat;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setCat(c.id);
                    setOpen(0);
                  }}
                  aria-pressed={activeCat}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-medium transition-colors ${
                    activeCat
                      ? "bg-night text-white"
                      : "bg-azure-soft text-ink/60 hover:bg-azure-soft/70 hover:text-ink"
                  }`}
                >
                  <c.icon size={14} className={activeCat ? "text-sun" : "text-azure-deep"} />
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {items.map((item, i) => (
                  <div key={item.q} className="border-t border-black/12">
                    <button
                      onClick={() => setOpen(open === i ? -1 : i)}
                      aria-expanded={open === i}
                      aria-controls={`faq-panel-${cat}-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={`text-lg font-light tracking-[-0.02em] transition-colors md:text-2xl ${
                          open === i ? "text-azure-deep" : ""
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors ${
                          open === i ? "bg-white text-ink" : "bg-azure-soft text-azure-deep"
                        }`}
                      >
                        <Plus size={16} className={`transition-transform duration-400 ${open === i ? "rotate-45" : ""}`} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open === i && (
                        <motion.div
                          id={`faq-panel-${cat}-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 text-sm leading-7 text-black/55">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
