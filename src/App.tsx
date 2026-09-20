import { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ArrowDown, ArrowRight, BadgeCheck, Menu, ShieldCheck, Star, Sun, X } from "lucide-react";
import { features, img, segments, srcset, stats, testimonials } from "./lib/data";
import { Btn, Eyebrow, Logo, Reveal } from "./components/ui";
import Simulator from "./components/Simulator";
import Steps from "./components/Steps";
import Faq from "./components/Faq";
import Contact from "./components/Contact";

const nav = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Simulador", href: "#simulador" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-paper/92 text-ink shadow-[0_1px_0_rgba(20,32,43,0.08)] backdrop-blur-md" : "text-white"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-10">
        <nav className="hidden items-center gap-8 text-[11px] md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-opacity hover:opacity-55">
              {n.label}
            </a>
          ))}
        </nav>

        <Logo className="md:absolute md:left-1/2 md:-translate-x-1/2" />

        <a href="#simulador" className="hidden items-center gap-3 text-[11px] md:flex">
          Simule sua economia
          <span className="grid size-6 place-items-center rounded-full bg-sun text-ink">
            <ArrowRight size={12} />
          </span>
        </a>

        <button className="-m-2.5 p-2.5 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-5 bg-paper px-6 pb-8 pt-2 text-sm text-ink md:hidden">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href="#simulador" onClick={() => setOpen(false)} className="font-medium text-azure-deep">
            Simule sua economia →
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden md:m-2 md:min-h-[97vh] md:rounded-[28px]">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        src={img.hero}
        srcSet={srcset.hero}
        sizes="100vw"
        fetchPriority="high"
        alt="Usina de energia solar ao amanhecer"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* overlay escurecido para contraste do texto no mobile + brilho de sol */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/55 to-night/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(249,201,60,0.38),transparent_42%)]" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-14 text-center text-white md:min-h-[97vh] md:pb-0">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-ink"
        >
          <Sun size={12} strokeWidth={2.2} /> Energia solar fotovoltaica desde 2012
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl text-[clamp(3.4rem,12vw,9rem)] font-light leading-[0.86] tracking-[-0.065em]"
        >
          Energia
          <br />
          <span className="font-serif italic text-sun">Solar</span> para sempre
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-9 flex flex-col items-center"
        >
          <Btn href="#simulador" variant="sun" className="px-6 py-4 text-[12px] uppercase tracking-[0.14em]">
            Simule sua economia
          </Btn>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-9 hidden max-w-md px-4 text-xs leading-relaxed text-white/85 md:block"
        >
          Projeto, instalação e homologação de sistemas fotovoltaicos para residências, empresas e agronegócio — com
          até 95% de economia na conta de luz.
        </motion.p>

        <a
          href="#solucoes"
          className="absolute bottom-8 right-8 hidden size-10 place-items-center rounded-full border border-white/40 transition-colors hover:border-sun hover:bg-sun hover:text-ink md:grid"
          aria-label="Rolar para baixo"
        >
          <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="solucoes" className="mx-auto max-w-[1450px] px-6 py-16 md:px-12 md:py-28">
      <div className="grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Eyebrow>Sobre a Solvia</Eyebrow>
          <h2 className="text-5xl font-light leading-[0.98] tracking-[-0.05em] md:text-7xl">
            Feito para{" "}
            <Sun className="inline-block size-[0.75em] fill-sun text-sun" strokeWidth={1.2} /> Energia
            <br />
            <span className="text-azure-deep">Limpa</span>
          </h2>
          <p className="mt-14 max-w-sm text-sm leading-6 text-ink/60">
            Somos uma integradora com engenharia própria. Em 14 anos entregamos mais de 2.400 sistemas — do telhado
            residencial à usina de geração distribuída — sempre com equipe própria e responsabilidade técnica.
          </p>
          <div className="mt-10 flex gap-3">
            <img src={img.housesSm} alt="Casas com painéis solares" loading="lazy" decoding="async" className="h-28 w-32 rounded-xl object-cover" />
            <img src={img.farmAerialSm} alt="Usina solar vista de cima" loading="lazy" decoding="async" className="h-28 w-24 rounded-xl object-cover" />
            <div className="flex h-28 w-24 flex-col justify-between rounded-xl bg-sun p-3 text-ink">
              <Sun size={16} strokeWidth={2} />
              <p className="text-[10px] leading-tight">
                <span className="block text-xl font-light tracking-[-0.04em]">14</span>anos de sol
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 0.08}
              className={i === 2 ? "md:col-start-2" : i === 1 ? "md:col-span-2" : ""}
            >
              <article
                className={`group flex h-full min-h-[190px] items-center justify-between gap-5 rounded-2xl p-7 ${
                  f.accent
                    ? "bg-gradient-to-br from-azure to-azure-deep text-white"
                    : "border-t border-ink/15 bg-white"
                }`}
              >
                <div className="max-w-[280px]">
                  <h3 className="text-xl font-medium tracking-[-0.03em]">{f.title}</h3>
                  <p className={`mt-3 text-xs leading-5 ${f.accent ? "text-white/80" : "text-ink/60"}`}>{f.text}</p>
                  <div className="mt-7">
                    <Btn variant={f.accent ? "linkLight" : "link"} href="#processo">
                      Saiba mais
                    </Btn>
                  </div>
                </div>
                <img
                  src={f.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-36 w-28 shrink-0 rounded-xl object-cover transition-transform duration-700 group-hover:scale-[1.04] md:w-36"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OneSystem() {
  const specs = ["Até 610 W por módulo", "22,8% de eficiência", "N-Type TOPCon", "Wi-Fi integrado"];
  return (
    <section className="bg-azure-soft px-6 py-16 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-[1450px] items-center gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-[62vh] min-h-[420px] overflow-hidden rounded-3xl"
        >
          <img
            src={img.farmAerial}
            srcSet={srcset.farmAerial}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Usina fotovoltaica"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
          />
        </motion.div>

        <Reveal className="md:pl-14">
          <Eyebrow>A tecnologia</Eyebrow>
          <h2 className="max-w-xl text-5xl font-light leading-[0.95] tracking-[-0.055em] md:text-7xl">
            Gere, monitore e economize num só sistema
          </h2>

          <div className="mt-8 flex flex-wrap gap-2">
            {specs.map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] text-ink/75 ring-1 ring-azure/40"
              >
                <span className="size-1.5 rounded-full bg-sun" aria-hidden /> {t}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-10 border-t border-ink/10 pt-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-medium">Módulos de alta eficiência</h3>
              <p className="text-sm leading-6 text-ink/60">
                Painéis monocristalinos de 570 W a 610 W com tecnologia N-Type TOPCon, inversores com Wi-Fi integrado
                e estruturas em alumínio anodizado com garantia contra corrosão.
              </p>
              <div className="mt-8">
                <Btn href="#simulador" variant="link">
                  Ver estimativa no simulador
                </Btn>
              </div>
            </div>
            <img
              src={img.closeup}
              alt="Detalhe de painel solar"
              loading="lazy"
              decoding="async"
              className="aspect-square h-full w-full rounded-2xl object-cover"
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-8 text-[11px] text-ink/65">
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-azure-deep" /> Seguro contra granizo e furto
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-azure-deep" /> 25 anos de garantia de performance
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="relative min-h-[460px] overflow-hidden">
      <img
        src={img.farmWind}
        srcSet={srcset.farmWind}
        sizes="100vw"
        alt="Usina solar e eólica"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/60 to-azure-deep/45" />
      <div className="relative z-10 mx-auto flex min-h-[460px] max-w-[1450px] flex-col justify-center gap-10 px-6 py-16 text-white md:px-12">
        <Reveal>
          <Eyebrow light>Resultados</Eyebrow>
          <h2 className="max-w-3xl text-4xl font-light leading-[1.02] tracking-[-0.045em] md:text-6xl">
            Feito para o mundo real, em operação todos os dias
          </h2>
        </Reveal>
        <div className="grid gap-10 border-t border-white/25 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="text-4xl font-light tracking-[-0.05em] text-sun md:text-5xl">{s.value}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Segments() {
  return (
    <section id="segmentos" className="mx-auto max-w-[1450px] px-6 py-16 md:px-12 md:py-28">
      <div className="mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <Eyebrow>Segmentos</Eyebrow>
          <h2 className="text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Soluções para
            <br />
            cada telhado
          </h2>
        </Reveal>
        <p className="max-w-sm text-sm leading-6 text-ink/60">
          Projetos residenciais, comerciais, rurais e usinas de geração distribuída — com o mesmo padrão de
          engenharia e acompanhamento.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {segments.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07}>
            <figure className="group relative h-[430px] overflow-hidden rounded-3xl">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
              <span className="absolute right-5 top-5 rounded-full bg-sun px-3 py-1 text-[10px] font-medium tracking-wide text-ink">
                {s.tag}
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 p-8 text-white">
                <h3 className="text-3xl font-light tracking-[-0.04em]">{s.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">{s.text}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  return (
    <section id="depoimentos" className="bg-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1450px]">
        <Reveal>
          <Eyebrow>Clientes</Eyebrow>
          <h2 className="max-w-2xl text-4xl font-light leading-[1] tracking-[-0.05em] md:text-6xl">
            Quem já trocou a conta de luz pelo <span className="text-azure-deep">sol</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <blockquote className="flex h-full flex-col justify-between rounded-3xl bg-azure-soft p-7">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-1" aria-label="5 de 5 estrelas">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} size={13} className="fill-sun text-sun" />
                      ))}
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-leaf ring-1 ring-leaf/20">
                      <BadgeCheck size={11} strokeWidth={2.2} /> Cliente verificado
                    </span>
                  </div>
                  <p className="mt-5 text-lg font-light leading-7 tracking-[-0.02em]">“{t.quote}”</p>
                </div>
                <footer className="mt-8 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span
                    aria-hidden
                    className={`grid size-10 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-white ${t.color}`}
                  >
                    {initials(t.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{t.name}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-ink/50">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="overflow-hidden bg-paper text-ink">
        <Header />
        <Hero />
        <Features />
        <OneSystem />
        <Steps />
        <Simulator />
        <StatsBand />
        <Segments />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
    </MotionConfig>
  );
}
