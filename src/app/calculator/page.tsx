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
  const screenLines: {
    label: string;
    value: string;
    bright?: boolean;
    dim?: boolean;
    warn?: boolean;
  }[] = [
    { label: "REFORM ANALYSIS", value: "", bright: true },
    { label: "\u2501".repeat(22), value: "", dim: true },
    { label: "Poverty rate", value: "-45.3%" },
    { label: "Budget impact", value: "+$2.8T", warn: true },
    { label: "Gini index", value: "-0.08" },
    { label: "Households better off", value: "78%" },
  ];

  const buttons = [
    ["GINI", "PVTY", "REV", "COST"],
    ["7", "8", "9", "UBI"],
    ["4", "5", "6", "CTC"],
    ["1", "2", "3", "EITC"],
    ["0", ".", "REFORM", "SIM"],
  ];

  const isFn = (l: string) => ["GINI", "PVTY", "REV", "COST"].includes(l);
  const isAction = (l: string) =>
    ["UBI", "CTC", "EITC", "REFORM", "SIM"].includes(l);

  return (
    <div className="relative">
      {showGlow && (
        <div
          className="absolute -inset-20 rounded-full blur-[80px] bg-teal-500 opacity-[0.08]"
          aria-hidden
        />
      )}

      <div
        className="relative w-[320px] rounded-[36px] shadow-[0_60px_120px_rgba(0,0,0,0.6),0_0_0_0.5px_rgba(255,255,255,0.08)]"
        style={{
          background: `linear-gradient(to bottom, ${bodyFrom}, ${bodyVia}, ${bodyTo})`,
        }}
      >
        {/* Edge chamfer */}
        <div className="absolute inset-0 rounded-[36px] border border-white/[0.07] pointer-events-none" />
        <div className="absolute inset-[1px] rounded-[35px] border border-black/30 pointer-events-none" />
        <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

        {/* Power button */}
        <div className="absolute -right-[2.5px] top-[115px] w-[3px] h-[50px] rounded-r-[2px] bg-gradient-to-b from-[#444] via-[#333] to-[#444] shadow-[2px_0_4px_rgba(0,0,0,0.3)]" />
        {/* Volume */}
        <div className="absolute -left-[2.5px] top-[100px] w-[3px] h-[28px] rounded-l-[2px] bg-gradient-to-b from-[#444] via-[#333] to-[#444] shadow-[-2px_0_4px_rgba(0,0,0,0.3)]" />
        <div className="absolute -left-[2.5px] top-[138px] w-[3px] h-[28px] rounded-l-[2px] bg-gradient-to-b from-[#444] via-[#333] to-[#444] shadow-[-2px_0_4px_rgba(0,0,0,0.3)]" />

        <div className="p-5 pt-6 pb-5 flex flex-col">
          {/* Screen — authentic TI-84 monochrome LCD */}
          <div className="relative rounded-2xl overflow-hidden shadow-[inset_0_2px_12px_rgba(0,0,0,0.3),0_0_0_0.5px_rgba(255,255,255,0.04)]" style={{ background: "#9BAD86" }}>
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent pointer-events-none z-10 rounded-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ti84-deciles.png"
              alt="Income change by decile — TI-84 style bar chart"
              className="w-full h-[195px] object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-[7px] mt-5">
            {buttons.flat().map((label, i) => (
              <button
                key={i}
                className={`h-[46px] rounded-xl text-[11px] font-semibold flex items-center justify-center
                  shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)]
                  active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] active:translate-y-[1px]
                  transition-all
                  ${
                    isFn(label)
                      ? "bg-teal-500 text-white"
                      : isAction(label)
                        ? "text-white"
                        : "bg-[#38383c] text-white/90"
                  }`}
                style={
                  isAction(label)
                    ? { background: "var(--chart-2)" }
                    : isFn(label)
                      ? {}
                      : {
                          backgroundImage:
                            "linear-gradient(to bottom, #404045, #353539)",
                        }
                }
              >
                {label}
              </button>
            ))}
          </div>

          {/* Bottom details */}
          <div className="flex flex-col items-center gap-[6px] mt-5">
            <div className="flex gap-[4px]">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[2px] h-[2px] rounded-full bg-white/[0.07]"
                />
              ))}
            </div>
            <div className="w-[24px] h-[9px] rounded-full border border-white/[0.08] bg-[#111]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pe-logo-white.svg"
              alt=""
              className="h-[8px] opacity-[0.12] mt-[2px]"
            />
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
          className="relative w-[130px] h-[215px] mx-auto rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_0.5px_rgba(255,255,255,0.06)]"
          style={{
            background: `linear-gradient(to bottom, ${from}, ${via}, ${to})`,
            transform: "rotateY(-8deg) rotateX(4deg)",
          }}
        >
          <div className="absolute inset-0 rounded-[22px] border border-white/[0.06] pointer-events-none" />
          <div className="mx-3 mt-4 h-[75px] rounded-lg bg-black/50" />
          <div className="mx-3 mt-3 grid grid-cols-4 gap-[3px]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="h-[14px] rounded-md bg-white/[0.04]" />
            ))}
          </div>
          <div className="flex flex-col items-center mt-3 gap-1">
            <div className="flex gap-[2px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[1.5px] h-[1.5px] rounded-full bg-white/[0.06]"
                />
              ))}
            </div>
            <div className="w-[12px] h-[5px] rounded-full border border-white/[0.06]" />
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
                <p className="text-sm font-semibold">Recycled aluminum</p>
                <p className="text-xs text-muted-foreground mt-1">
                  100% recycled alloy with ceramic shield front
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
                <p className="text-sm font-semibold">
                  3.5&quot; Retina Policy Display
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  4K HDR. 120Hz ProMotion. Always-On Lorenz curve.
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
                <p className="text-sm font-semibold">Just 12mm &times; 186g</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Lighter than most policy briefs. Slips into any briefcase.
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
              Calculator
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
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.95]"
            >
              PolicyEngine
              <br />
              Calculator
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-muted-foreground"
            >
              Microsimulation. In your pocket.
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
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(49,151,149,0.06),inset_0_2px_12px_rgba(0,0,0,0.3)]" style={{ background: "#9BAD86" }}>
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
            PolicyEngine Calculator is a fictional product. Happy April
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
