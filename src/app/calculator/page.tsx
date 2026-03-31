"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

/* ── Animation helpers ─────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, ease: "easeOut" as const, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Calculator device ─────────────────────────────────────────────── */

function Calculator({
  bodyFrom = "#2d2d31",
  bodyVia = "#232327",
  bodyTo = "#1c1c1f",
  showGlow = true,
}: {
  bodyFrom?: string;
  bodyVia?: string;
  bodyTo?: string;
  showGlow?: boolean;
}) {
  const buttons: { label: string; variant: "dark" | "light" | "teal" | "accent" }[][] = [
    [
      { label: "GINI", variant: "teal" },
      { label: "PVTY", variant: "teal" },
      { label: "REV", variant: "teal" },
      { label: "COST", variant: "teal" },
    ],
    [
      { label: "7", variant: "dark" },
      { label: "8", variant: "dark" },
      { label: "9", variant: "dark" },
      { label: "UBI", variant: "accent" },
    ],
    [
      { label: "4", variant: "dark" },
      { label: "5", variant: "dark" },
      { label: "6", variant: "dark" },
      { label: "CTC", variant: "accent" },
    ],
    [
      { label: "1", variant: "dark" },
      { label: "2", variant: "dark" },
      { label: "3", variant: "dark" },
      { label: "EITC", variant: "accent" },
    ],
    [
      { label: "0", variant: "dark" },
      { label: ".", variant: "dark" },
      { label: "REFORM", variant: "light" },
      { label: "SIM", variant: "accent" },
    ],
  ];

  const btnStyles = {
    dark: {
      className: "border-black/45 text-white/90",
      bg: "linear-gradient(180deg, #3b4149, #2a2f35)",
    },
    light: {
      className: "border-[#7b8188] text-[#121519]",
      bg: "linear-gradient(180deg, #c9ced6, #a8afb8)",
    },
    teal: {
      className: "border-[#254a4b] text-[#eefdfd]",
      bg: "linear-gradient(180deg, #4f8f91, #2f6566)",
    },
    accent: {
      className: "border-[#8d5f1e] text-[#fff4d4]",
      bg: "linear-gradient(180deg, #d3a347, #a56e22)",
    },
  };

  return (
    <div className="relative">
      {showGlow && (
        <div
          className="absolute -inset-20 rounded-full blur-[90px] opacity-[0.12]"
          style={{ background: "rgba(165, 188, 104, 0.55)" }}
          aria-hidden
        />
      )}

      {/* Device body — brushed metal texture */}
      <div
        className="relative w-[330px] overflow-hidden px-4 pb-5 pt-5 shadow-[0_55px_120px_rgba(0,0,0,0.62),0_8px_20px_rgba(0,0,0,0.35)]"
        style={{
          borderRadius: "40px 40px 34px 34px",
          backgroundImage: `linear-gradient(180deg, ${bodyFrom}, ${bodyVia} 48%, ${bodyTo}), radial-gradient(circle at 18% 10%, rgba(255,255,255,0.18), transparent 28%), repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0 10px, rgba(0,0,0,0.018) 10px 20px)`,
        }}
      >
        {/* Inner light + shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "40px 40px 34px 34px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -16px 24px rgba(0,0,0,0.24)",
          }}
        />
        <div className="absolute inset-[1px] pointer-events-none border border-black/28" style={{ borderRadius: "39px 39px 33px 33px" }} />
        {/* Top shadow */}
        <div className="absolute left-10 right-10 top-3 h-[9px] rounded-full bg-black/18 blur-[3px] pointer-events-none" />

        {/* Inner bezel */}
        <div className="relative rounded-[28px] border border-black/35 bg-[linear-gradient(180deg,rgba(103,108,118,0.26),rgba(35,37,41,0.18))] px-4 pb-4 pt-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-14px_20px_rgba(0,0,0,0.18)]">
          {/* Branding + solar panel */}
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pe-logo-white.svg" alt="PolicyEngine" className="h-[11px] opacity-55" />
              <p className="mt-1.5 text-[24px] font-black leading-none tracking-[0.14em] text-white/92">PE-84</p>
              <p className="mt-0.5 text-[7px] uppercase tracking-[0.3em] text-white/35">graphing microsimulator</p>
            </div>
            <div className="w-[80px] shrink-0">
              <p className="text-right text-[6px] font-semibold uppercase tracking-[0.28em] text-white/30">Solar</p>
              <div
                className="mt-1.5 h-[22px] rounded-[4px] border border-black/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                style={{
                  backgroundImage: "linear-gradient(180deg, #1e242a, #0d1115), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 12px)",
                }}
              />
            </div>
          </div>

          {/* Screen housing */}
          <div className="mt-3 rounded-[20px] border border-black/40 bg-[#212429] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-14px_16px_rgba(0,0,0,0.28)]">
            {/* LCD panel — green with gradient */}
            <div className="rounded-[14px] border border-[#7b8b50] bg-[linear-gradient(180deg,#dbe4a8,#bdcb75_42%,#9caa5d)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-3px_10px_rgba(61,80,22,0.28)]">
              {/* Mode indicators */}
              <div className="flex items-center justify-between text-[6px] font-black uppercase tracking-[0.22em] text-[#263313]/60 px-1">
                <span>Run</span>
                <span>Float</span>
                <span>Rad</span>
                <span>Sim</span>
              </div>
              {/* Pixel display */}
              <div className="mt-1.5 overflow-hidden rounded-[10px] border border-[#6d7c45] bg-[#afbd67] shadow-[inset_0_1px_2px_rgba(29,42,11,0.24)]">
                <div className="relative">
                  {/* Glass sheen */}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_24%,rgba(36,49,14,0.05)_54%,transparent_78%)] pointer-events-none z-10" />
                  {/* Pixel grid */}
                  <div className="absolute inset-0 opacity-[0.1] pointer-events-none [background-image:linear-gradient(rgba(32,45,14,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(32,45,14,0.35)_1px,transparent_1px)] [background-size:10px_10px]" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ti84-deciles.png"
                    alt="Income change by decile"
                    className="h-[110px] w-full object-cover opacity-[0.9]"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Keypad — clean 4-column grid */}
          <div className="mt-4 space-y-[7px]">
            {buttons.map((row, ri) => (
              <div key={ri} className="grid grid-cols-4 gap-[7px]">
                {row.map((key) => {
                  const s = btnStyles[key.variant];
                  return (
                    <button
                      key={key.label}
                      type="button"
                      className={`h-[44px] rounded-[14px] border text-[11px] font-semibold tracking-[0.06em] shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.14)] active:translate-y-[1px] transition-transform ${s.className}`}
                      style={{ backgroundImage: s.bg }}
                    >
                      {key.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Bottom bar — speaker + model + port */}
          <div className="mt-4 flex items-center justify-between rounded-full border border-white/[0.06] bg-black/15 px-4 py-1.5">
            <div className="flex gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[3px] w-[3px] rounded-full bg-white/[0.12]" />
              ))}
            </div>
            <p className="text-[7px] font-semibold uppercase tracking-[0.3em] text-white/25">PE-84 Pro</p>
            <div className="h-[9px] w-[30px] rounded-full border border-white/[0.08] bg-[#111214]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Device swatch ─────────────────────────────────────────────────── */

function DeviceSwatch({
  from,
  via,
  to,
  name,
  limited,
}: {
  from: string;
  via: string;
  to: string;
  name: string;
  limited?: boolean;
}) {
  return (
    <div className="text-center">
      <div style={{ perspective: 800 }}>
        <div
          className="relative mx-auto h-[236px] w-[146px] overflow-hidden px-2.5 pb-4 pt-3 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_0.5px_rgba(255,255,255,0.06)]"
          style={{
            borderRadius: "26px 26px 22px 22px",
            backgroundImage: `linear-gradient(180deg, ${from}, ${via} 46%, ${to}), radial-gradient(circle at 20% 10%, rgba(255,255,255,0.16), transparent 28%), repeating-linear-gradient(135deg, rgba(255,255,255,0.016) 0 8px, rgba(0,0,0,0.016) 8px 16px)`,
            transform: "rotateY(-8deg) rotateX(4deg)",
          }}
        >
          <div
            className="absolute inset-0 border border-white/[0.06] pointer-events-none"
            style={{ borderRadius: "26px 26px 22px 22px" }}
          />
          <div className="absolute left-4 right-4 top-2 h-[5px] rounded-full bg-black/20 blur-[2px]" />

          <div className="relative rounded-[18px] border border-black/30 bg-black/10 px-2.5 pb-3 pt-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[5px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  PolicyEngine
                </p>
                <p className="mt-1 text-[11px] font-black tracking-[0.18em] text-white/90">
                  CALC
                </p>
              </div>
              <div
                className="mt-1 h-[12px] w-[34px] rounded-[3px] border border-black/35"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #1e242a, #0d1115), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 10px)",
                }}
              />
            </div>

            <div className="mt-2 rounded-[12px] border border-[#71824a] bg-[linear-gradient(180deg,#dce6af,#becb77_45%,#9caa5d)] p-1.5">
              <div className="h-[34px] rounded-[8px] border border-[#657442] bg-[#adbb67]" />
            </div>

            <div className="mt-2 grid grid-cols-5 gap-[4px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-[6px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ${
                    i === 0
                      ? "border-[#8d5f1e] bg-[linear-gradient(180deg,#d3a347,#a56e22)]"
                      : i === 1 || i === 4 || i === 9
                        ? "border-[#254a4b] bg-[linear-gradient(180deg,#4f8f91,#2f6566)]"
                        : "border-black/35 bg-[linear-gradient(180deg,#434951,#2e3339)]"
                  } h-[10px]`}
                />
              ))}
            </div>

            <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-[4px]">
              <div className="grid grid-cols-2 gap-[4px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[10px] rounded-[6px] border border-black/35 bg-[linear-gradient(180deg,#434951,#2e3339)]"
                  />
                ))}
              </div>
              <div className="rounded-[12px] border border-black/35 bg-[linear-gradient(180deg,#30353b,#23272c)] p-[4px]">
                <div className="grid grid-cols-3 gap-[3px]">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        i === 4
                          ? "rounded-full bg-white/25"
                          : "rounded-[5px] border border-black/35 bg-[linear-gradient(180deg,#444a52,#2f343a)]"
                      } h-[10px] w-[10px]`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[4px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[10px] rounded-[6px] border border-black/35 bg-[linear-gradient(180deg,#434951,#2e3339)]"
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 grid grid-cols-5 gap-[4px]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-[11px] rounded-[6px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${
                    i % 5 === 4
                      ? "border-[#254a4b] bg-[linear-gradient(180deg,#4f8f91,#2f6566)]"
                      : "border-black/35 bg-[linear-gradient(180deg,#3b4149,#2a2f35)]"
                  }`}
                />
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between rounded-full border border-white/[0.06] bg-black/15 px-2 py-1">
              <div className="flex gap-[2px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[2px] w-[2px] rounded-full bg-white/[0.12]"
                  />
                ))}
              </div>
              <div className="h-[4px] w-[16px] rounded-full border border-white/[0.08]" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm mt-5">{name}</p>
      {limited && (
        <p className="text-[10px] text-teal-500 mt-1">Limited edition</p>
      )}
    </div>
  );
}

/* ── Sticky product showcase ───────────────────────────────────────── */

function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const ry = useTransform(scrollYProgress, [0, 1], [5, -30]);
  const rx = useTransform(scrollYProgress, [0, 0.3, 1], [12, 5, 2]);
  const s = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [0.82, 1.05, 1.05, 0.9],
  );

  const c1 = useTransform(
    scrollYProgress,
    [0.06, 0.16, 0.36, 0.46],
    [0, 1, 1, 0],
  );
  const c2 = useTransform(
    scrollYProgress,
    [0.36, 0.46, 0.66, 0.76],
    [0, 1, 1, 0],
  );
  const c3 = useTransform(
    scrollYProgress,
    [0.66, 0.76, 0.92, 1],
    [0, 1, 1, 0],
  );

  return (
    <section ref={ref} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative">
          <motion.div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[250px] h-[40px] rounded-full bg-teal-500/[0.04] blur-2xl"
            style={{
              scaleX: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
            }}
          />

          <div style={{ perspective: 1200 }}>
            <motion.div style={{ rotateY: ry, rotateX: rx, scale: s }}>
              <Calculator />
            </motion.div>
          </div>

          {/* Callout: material */}
          <motion.div
            style={{ opacity: c1 }}
            className="absolute right-[calc(100%+3rem)] top-[30%] text-right max-w-[200px] hidden lg:block"
          >
            <div className="flex items-center justify-end gap-3">
              <div>
                <p className="text-sm font-semibold">Molded composite shell</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Textured matte housing with a deep lip to protect the LCD
                </p>
              </div>
              <div className="w-10 h-px bg-white/20 shrink-0" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
            </div>
          </motion.div>

          {/* Callout: display */}
          <motion.div
            style={{ opacity: c2 }}
            className="absolute left-[calc(100%+3rem)] top-[20%] max-w-[200px] hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
              <div className="w-10 h-px bg-white/20 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Sunken monochrome LCD</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tilted viewing bay with an anti-glare lens and thick bezel
                </p>
              </div>
            </div>
          </motion.div>

          {/* Callout: weight */}
          <motion.div
            style={{ opacity: c3 }}
            className="absolute left-[calc(100%+3rem)] top-[65%] max-w-[200px] hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
              <div className="w-10 h-px bg-white/20 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Raised key deck</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Thumb-shaped navigation cluster and sculpted number pad
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function CalculatorPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-black text-[#f5f5f7] min-h-screen selection:bg-teal-500/30">
      {/* ─── Nav ─────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.08]"
        style={{ background: "rgba(0,0,0,0.8)" }}
      >
        <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pe-logo-white.svg"
                alt="PolicyEngine"
                className="h-[18px]"
              />
            </a>
            <span className="text-xs text-muted-foreground hidden md:inline">
              PE-84
            </span>
          </div>
          <a
            href="#preorder"
            className="text-xs text-teal-500 hover:underline"
          >
            Pre-order &rarr;
          </a>
        </div>
      </nav>

      {/* ─── Hero (device visible above fold) ────────────────────── */}
      <section className="min-h-[calc(100vh-48px)] flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left space-y-4"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm text-muted-foreground tracking-wide"
            >
              Introducing
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tight leading-[0.9]"
            >
              PE-84
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-muted-foreground"
            >
              The graphing microsimulator.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-3 pt-2"
            >
              <p className="text-lg text-muted-foreground">From $1,299</p>
              <a
                href="#preorder"
                className="text-lg text-teal-500 hover:underline"
              >
                Pre-order &rarr;
              </a>
            </motion.div>
          </motion.div>

          {/* Device */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" as const }}
            className="shrink-0"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="transform scale-[0.82] md:scale-[0.88] lg:scale-100 origin-center">
                <Calculator />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Sticky product showcase ─────────────────────────────── */}
      <ProductShowcase />

      {/* ─── P1 Micro ────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <Reveal>
              <p className="text-sm text-muted-foreground tracking-wide mb-4">
                Performance
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                P1 Micro.
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-md">
                The most powerful policy chip. Period.
              </p>
            </Reveal>

            <div className="grid grid-cols-3 gap-8 mt-14">
              {(
                [
                  ["10M", "households/sec"],
                  ["50K", "parameters"],
                  ["2.7\u00d7", "faster than a PhD"],
                ] as const
              ).map(([num, label], i) => (
                <Reveal key={label} delay={0.1 * (i + 1)}>
                  <p className="text-3xl md:text-4xl font-bold text-teal-500">
                    {num}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2} className="shrink-0 hidden lg:block">
            <div style={{ perspective: 1000 }}>
              <div style={{ transform: "rotateY(20deg) rotateX(5deg)" }}>
                <Calculator showGlow={false} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Display ─────────────────────────────────────────────── */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-32 text-center bg-[#0a0a0a]">
        <Reveal>
          <p className="text-sm text-muted-foreground tracking-wide mb-4">
            Display
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Retina Policy Display.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-xl mx-auto">
            See inequality. In stunning clarity.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-16 w-full max-w-[600px]">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(49,151,149,0.06),inset_0_2px_12px_rgba(0,0,0,0.3)] bg-teal-50">
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.15] via-transparent to-transparent pointer-events-none rounded-3xl z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ti84-lorenz.png"
              alt="Lorenz curve — baseline vs reform"
              className="w-full"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-10">
          <p className="text-muted-foreground max-w-md mx-auto">
            Every Lorenz curve. Every marginal rate. Every decile.
            Pixel-perfect on a 3.5-inch 4K HDR display.
          </p>
        </Reveal>
      </section>

      {/* ─── Battery ─────────────────────────────────────────────── */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-32 text-center overflow-hidden">
        <Reveal>
          <p className="text-sm text-muted-foreground tracking-wide mb-4">
            Battery
          </p>
        </Reveal>
        <Reveal>
          <p className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-bold leading-none tracking-tighter bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
            20
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl text-muted-foreground -mt-4 md:-mt-8">
            hours of continuous tax reform analysis.
          </p>
          <p className="text-lg text-muted-foreground/60 mt-4 italic">
            Think outside the Overton window.
          </p>
        </Reveal>
      </section>

      {/* ─── PolicyOS ────────────────────────────────────────────── */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-32 text-center bg-[#0a0a0a]">
        <Reveal>
          <p className="text-sm text-muted-foreground tracking-wide mb-4">
            Software
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            PolicyOS.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-xl mx-auto">
            Built from the ground up for fiscal policy.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-2xl text-left">
          {(
            [
              [
                "Real-time CBO scoring",
                "Every keystroke updates the ten-year budget window.",
              ],
              [
                "Benefit cliff alerts",
                "A gentle vibration when your reform creates a marginal rate above 100%.",
              ],
              [
                "Lorenz Curve Live View\u2122",
                "Watch inequality reshape in real time as you adjust parameters.",
              ],
              [
                "Over-the-air tax updates",
                "New tax laws download automatically. No PhD required.",
              ],
            ] as const
          ).map(([title, desc], i) => (
            <Reveal key={title} delay={0.1 * i}>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Colors ──────────────────────────────────────────────── */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-32 text-center">
        <Reveal>
          <p className="text-sm text-muted-foreground tracking-wide mb-4">
            Finishes
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Four finishes.
          </h2>
          <p className="text-xl text-muted-foreground mt-4">
            Each one a policy statement.
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-10 md:gap-14 mt-16">
          {(
            [
              {
                name: "Midnight Policy",
                from: "#1e1e32",
                via: "#161628",
                to: "#0e0e1c",
              },
              {
                name: "Starlight Revenue",
                from: "#3e3a34",
                via: "#34302a",
                to: "#2a2620",
              },
              {
                name: "Space Budget",
                from: "#2d2d31",
                via: "#232327",
                to: "#1c1c1f",
              },
              {
                name: "Surplus Teal",
                from: "#1e3232",
                via: "#182a2a",
                to: "#101e1e",
                limited: true,
              },
            ] as const
          ).map((c, i) => (
            <Reveal key={c.name} delay={0.08 * i}>
              <DeviceSwatch
                from={c.from}
                via={c.via}
                to={c.to}
                name={c.name}
                limited={"limited" in c && c.limited}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Tech specs ──────────────────────────────────────────── */}
      <section className="px-6 py-32 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">
              Tech specs
            </h2>
          </Reveal>

          <div className="divide-y divide-white/[0.06]">
            {(
              [
                [
                  "Chip",
                  "P1 Micro with 16-core Policy Engine\n4 efficiency cores, 12 simulation cores",
                ],
                [
                  "Display",
                  '3.5" Retina Policy Display\n4K HDR, 120Hz ProMotion\nAlways-On Lorenz curve',
                ],
                [
                  "Storage",
                  "50,000 tax parameters\n10,000 benefit rules\n256GB reform history",
                ],
                [
                  "Battery",
                  "Up to 20 hours tax reform analysis\nUp to 14 hours continuous microsimulation\nUSB-C charging",
                ],
                [
                  "Connectivity",
                  "Wi-Fi 7\nBluetooth 5.4\nUSB-C 3.2\nNFC (for contactless policy transfer)",
                ],
                ["Dimensions", "168 \u00d7 89 \u00d7 12 mm"],
                ["Weight", "186g (lighter than most policy briefs)"],
                [
                  "Materials",
                  "100% recycled aluminum\nCeramic Shield front\nSustainably sourced policy",
                ],
                [
                  "In the box",
                  "PolicyEngine Calculator\nUSB-C cable\n47-page Quick Start Tax Guide\nProgressivity sticker pack",
                ],
              ] as const
            ).map(([label, value], i) => (
              <Reveal key={label} delay={0.02 * i}>
                <div className="grid grid-cols-3 py-4 gap-4">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-sm col-span-2 whitespace-pre-line">
                    {value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pre-order CTA ───────────────────────────────────────── */}
      <section
        id="preorder"
        className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-32 text-center"
      >
        <Reveal>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
            The future of policy analysis is in your hands.
          </h2>
          <p className="text-xl text-muted-foreground mt-6">
            Available April 1, 2026.
          </p>

          {/* Email signup */}
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-full bg-white/[0.08] border border-white/[0.15] text-white placeholder:text-white/30 focus:outline-none focus:border-teal-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors text-sm whitespace-nowrap"
              >
                Notify me
              </button>
            </form>
          ) : (
            <p className="mt-10 text-teal-500 text-lg">
              You&apos;re on the list! We&apos;ll let you know when it
              ships.
            </p>
          )}

          <p className="text-sm text-muted-foreground mt-6">
            From $1,299. Trade in your TI-84 and save.
          </p>
        </Reveal>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] px-6 py-12">
        <div className="max-w-[980px] mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            The PE-84 is a fictional product. Happy April
            Fools&apos; Day!
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            &copy; 2026 PolicyEngine. No actual calculators were harmed in
            the making of this page.
          </p>
        </div>
      </footer>
    </div>
  );
}
