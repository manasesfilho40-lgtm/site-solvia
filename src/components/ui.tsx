import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sun } from "lucide-react";

type Variant = "dark" | "light" | "sun" | "sky" | "outline" | "link" | "linkLight";

export function Btn({
  children = "Saiba mais",
  href = "#simulador",
  variant = "dark",
  className = "",
}: {
  children?: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    dark: "gap-5 rounded-full bg-ink px-6 py-3.5 text-white hover:bg-azure-deep",
    light: "gap-5 rounded-full bg-white px-6 py-3.5 text-ink hover:bg-white/85",
    sun: "gap-5 rounded-full bg-white px-6 py-3.5 text-ink hover:bg-white/85",
    sky: "gap-5 rounded-full bg-azure-deep px-6 py-3.5 text-white hover:bg-ink",
    outline: "gap-5 rounded-full border border-white/60 px-6 py-3.5 text-white hover:border-white hover:bg-white/10",
    link: "-my-3.5 gap-2 py-3.5 text-[12px] text-ink underline-offset-4 hover:text-azure-deep hover:underline",
    linkLight: "-my-3.5 gap-2 py-3.5 text-[12px] text-white/85 underline-offset-4 hover:text-sun",
  };

  return (
    <a
      href={href}
      className={`group inline-flex items-center text-[11px] font-medium transition-colors ${styles[variant]} ${className}`}
    >
      {children}
      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

export function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] ${
        light ? "text-white/70" : "text-ink/55"
      } ${className}`}
    >
      <span className="inline-block size-1.5 bg-sun" aria-hidden />
      {children}
    </p>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`-my-2 inline-flex items-center gap-2 py-2 text-lg font-semibold tracking-[-0.04em] ${className}`}>
      <span className="grid size-5 place-items-center rounded-full bg-sun text-ink">
        <Sun size={11} strokeWidth={2.4} />
      </span>
      Solvia
    </a>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const num = (v: number, digits = 0) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
