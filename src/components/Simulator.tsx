import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, PanelsTopLeft, PiggyBank, TrendingUp, Zap } from "lucide-react";
import { profiles, regions } from "../lib/data";
import { Eyebrow, brl, num } from "./ui";

export default function Simulator() {
  const [bill, setBill] = useState(850);
  const [profileIdx, setProfileIdx] = useState(0);
  const [regionIdx, setRegionIdx] = useState(3);

  const r = useMemo(() => {
    const profile = profiles[profileIdx];
    const hsp = regions[regionIdx].hsp;

    const monthlyKwh = Math.max(bill / profile.tariff - 50, 30);
    const kwp = monthlyKwh / (hsp * 30 * 0.78);
    const modules = Math.max(Math.ceil(kwp / 0.575), 4);
    const investment = kwp * profile.pricePerKwp;
    const monthlySaving = bill * 0.9 - 45;
    const payback = investment / (monthlySaving * 12);
    const yearlyKwh = monthlyKwh * 12;
    // soma de 25 anos com reajuste tarifário de 8% a.a.
    const total25 = monthlySaving * 12 * ((Math.pow(1.08, 25) - 1) / 0.08);
    const co2 = (yearlyKwh * 25 * 0.0817) / 1000;
    const trees = (co2 * 1000) / 22;

    return { monthlyKwh, kwp, modules, investment, monthlySaving, payback, total25, co2, trees, roofArea: modules * 2.6 };
  }, [bill, profileIdx, regionIdx]);

  const cards = [
    { icon: PiggyBank, label: "Economia por mês", value: brl(r.monthlySaving), sub: "até 90% da sua fatura" },
    { icon: Zap, label: "Sistema indicado", value: `${num(r.kwp, 1)} kWp`, sub: `${r.modules} módulos · ~${num(r.roofArea)} m² de telhado` },
    { icon: TrendingUp, label: "Retorno estimado", value: `${num(r.payback, 1)} anos`, sub: "depois disso, energia quase grátis" },
    { icon: PanelsTopLeft, label: "Investimento", value: brl(r.investment), sub: "em até 120x ou à vista com desconto" },
  ];

  const pill = (active: boolean) =>
    `rounded-full px-4 py-2.5 text-[11px] transition-colors ${
      active ? "bg-sun text-ink" : "bg-white/10 text-white/70 hover:bg-white/20"
    }`;

  const whatsapp = `https://wa.me/551140028922?text=${encodeURIComponent(
    `Olá! Simulei um sistema de ${num(r.kwp, 1)} kWp com economia de ${brl(r.monthlySaving)}/mês. Gostaria de uma proposta.`
  )}`;

  return (
    <section id="simulador" className="relative overflow-hidden bg-night px-6 py-16 text-white md:px-12 md:py-24">
      {/* brilhos decorativos: sol e céu */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-sun/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-52 -left-32 size-[520px] rounded-full bg-azure/25 blur-3xl" />

      <div className="relative mx-auto max-w-[1450px]">
        <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow light>Simulador</Eyebrow>
            <h2 className="text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Descubra quanto
              <br />
              você pode <span className="text-sun">economizar</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/60">
            Ajuste os campos abaixo e veja em tempo real o tamanho do sistema, o investimento e o retorno estimado
            para o seu perfil de consumo.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Controles */}
          <div className="rounded-3xl bg-night-2 p-6 ring-1 ring-white/10 md:p-8 lg:col-span-5">
            <label htmlFor="bill-range" className="text-[10px] uppercase tracking-[0.2em] text-white/55">
              Sua conta de luz por mês
            </label>
            <div className="mt-4">
              <span className="text-4xl font-light tracking-[-0.04em] text-sun md:text-6xl">{brl(bill)}</span>
            </div>
            <input
              id="bill-range"
              type="range"
              min={150}
              max={20000}
              step={50}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="mt-6 w-full"
              aria-label="Valor da conta de luz"
            />
            <div className="flex justify-between text-[10px] text-white/45">
              <span>R$ 150</span>
              <span>R$ 20.000</span>
            </div>

            {/* resposta em tempo real: não deixa dúvida de que é um simulador */}
            <div className="mt-7 flex items-end justify-between gap-4 rounded-2xl bg-sun/10 px-4 py-4 ring-1 ring-sun/30">
              <span className="text-[10px] uppercase leading-4 tracking-[0.18em] text-sun/80">
                Economia estimada
                <br />
                por mês
              </span>
              <motion.span
                key={Math.round(r.monthlySaving)}
                initial={{ opacity: 0.4, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="text-3xl font-light tracking-[-0.03em] text-sun"
              >
                {brl(r.monthlySaving)}
              </motion.span>
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-white/55">Tipo de imóvel</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profiles.map((p, i) => (
                <button key={p.name} onClick={() => setProfileIdx(i)} className={pill(i === profileIdx)}>
                  {p.name}
                </button>
              ))}
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-white/55">Região</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {regions.map((reg, i) => (
                <button key={reg.name} onClick={() => setRegionIdx(i)} className={pill(i === regionIdx)}>
                  {reg.name}
                </button>
              ))}
            </div>

            <p className="mt-8 text-[10px] leading-5 text-white/50">
              Estimativa baseada em {num(regions[regionIdx].hsp, 1)} horas de sol pleno por dia, tarifa média de R${" "}
              {num(profiles[profileIdx].tariff, 2)}/kWh e consumo de {num(r.monthlyKwh)} kWh por mês. Valores finais
              definidos após visita técnica.
            </p>
          </div>

          {/* Resultados */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:col-span-7">
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="flex flex-col justify-between rounded-2xl bg-paper p-5 text-ink md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink/55">{c.label}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-azure-soft text-azure-deep">
                    <c.icon size={15} />
                  </span>
                </div>
                <div className="mt-6 md:mt-10">
                  <p className="text-2xl font-light tracking-[-0.045em] md:text-4xl">{c.value}</p>
                  <p className="mt-2 text-[11px] text-ink/55">{c.sub}</p>
                </div>
              </motion.div>
            ))}

            <div className="col-span-2 rounded-3xl bg-sun p-7 text-ink">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink/60">Economia acumulada em 25 anos</p>
                  <p className="mt-3 text-4xl font-light tracking-[-0.05em] md:text-5xl">{brl(r.total25)}</p>
                  <p className="mt-2 flex items-center gap-2 text-[11px] text-ink/70">
                    <Leaf size={12} className="text-leaf" /> {num(r.co2, 1)} t de CO₂ evitadas · equivalente a{" "}
                    {num(r.trees)} árvores
                  </p>
                </div>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-5 rounded-full bg-ink px-5 py-3 text-[11px] font-medium text-white transition-colors hover:bg-azure-deep"
                >
                  Pedir proposta no WhatsApp
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
