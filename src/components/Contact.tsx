import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";
import { img, profiles, srcset } from "../lib/data";
import { Eyebrow, Logo } from "./ui";

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", bill: "", type: "Residencial" });

  const field =
    "w-full border-b border-white/25 bg-transparent py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-sun";
  const label = "text-[10px] uppercase tracking-[0.18em] text-white/55";

  return (
    <section id="contato" className="relative m-2 overflow-hidden rounded-[28px]">
      <img
        src={img.hero}
        srcSet={srcset.hero}
        sizes="100vw"
        alt="Usina solar ao amanhecer"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-night/95 via-night/85 to-azure-deep/75" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 size-[420px] rounded-full bg-sun/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-[1450px] gap-14 px-6 pb-24 pt-24 text-white md:grid-cols-2 md:px-12 md:pb-32 md:pt-32">
        <div>
          <Eyebrow light>Comece hoje</Eyebrow>
          <h2 className="max-w-xl text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Pronto para gerar
            <br />
            <span className="text-sun">sua própria energia?</span>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-6 text-white/65">
            Envie seus dados e receba em até 24 horas uma proposta técnica completa: geração estimada mês a mês,
            investimento, retorno e prazo de instalação.
          </p>
          <a
            href="tel:+551140028922"
            className="mt-10 inline-flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
          >
            <span className="grid size-9 place-items-center rounded-full bg-sun text-ink">
              <Phone size={14} />
            </span>
            (11) 4002-8922 · atendimento em todo o Brasil
          </a>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm md:p-10">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full min-h-[340px] flex-col items-center justify-center text-center"
            >
              <CheckCircle2 size={40} className="text-sun" />
              <h3 className="mt-6 text-2xl font-light tracking-[-0.03em]">Proposta a caminho!</h3>
              <p className="mt-3 max-w-xs text-sm text-white/65">
                Obrigado, {form.name.split(" ")[0] || "tudo certo"}. Um engenheiro da Solvia entra em contato em até 24
                horas úteis.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="f-name" className={label}>
                  Nome completo
                </label>
                <input
                  id="f-name"
                  required
                  className={field}
                  placeholder="Como podemos te chamar?"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-phone" className={label}>
                    WhatsApp
                  </label>
                  <input
                    id="f-phone"
                    required
                    type="tel"
                    inputMode="numeric"
                    className={field}
                    placeholder="(00) 00000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })}
                  />
                </div>
                <div>
                  <label htmlFor="f-city" className={label}>
                    Cidade / UF
                  </label>
                  <input
                    id="f-city"
                    required
                    className={field}
                    placeholder="São Paulo / SP"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="f-bill" className={label}>
                  Valor médio da conta de luz
                </label>
                <input
                  id="f-bill"
                  required
                  className={field}
                  placeholder="R$ 850"
                  value={form.bill}
                  onChange={(e) => setForm({ ...form, bill: e.target.value })}
                />
              </div>
              <div>
                <p className={`mb-3 ${label}`}>Tipo de imóvel</p>
                <div className="flex flex-wrap gap-2">
                  {profiles.map((p) => (
                    <button
                      type="button"
                      key={p.name}
                      onClick={() => setForm({ ...form, type: p.name })}
                      className={`rounded-full px-4 py-2.5 text-[11px] transition-colors ${
                        form.type === p.name ? "bg-white text-ink" : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-white py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-white/85"
              >
                Receber proposta gratuita
              </button>
              <p className="text-[10px] leading-4 text-white/55">
                Ao enviar, você concorda em receber contato da Solvia Energia Solar. Nenhum dado é compartilhado com
                terceiros.
              </p>
            </form>
          )}
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/15 px-6 py-8 text-[11px] text-white/60 md:px-12">
        <div className="mx-auto flex max-w-[1450px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Logo className="text-white" />
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            <a href="#solucoes" className="hover:text-sun">Soluções</a>
            <a href="#processo" className="hover:text-sun">Como funciona</a>
            <a href="#simulador" className="hover:text-sun">Simulador</a>
            <a href="#depoimentos" className="hover:text-sun">Depoimentos</a>
          </nav>
          <span>© 2026 Solvia Energia Solar · CNPJ 41.882.004/0001-70</span>
        </div>
      </footer>
    </section>
  );
}
