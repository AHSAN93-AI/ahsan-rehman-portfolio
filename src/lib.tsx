import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useVelocity, useTransform, useMotionValue, animate, useAnimationFrame } from "motion/react";
import Lenis from "lenis";

export const ease = [0.22, 1, 0.36, 1] as const;
let lenis: Lenis | null = null;
export function useLenis() {
  const rm = useReducedMotion();
  useEffect(() => {
    if (rm) return;
    const l = new Lenis({ lerp: 0.085, smoothWheel: true, touchMultiplier: 1.4 });
    lenis = l;
    let id = requestAnimationFrame(function f(t) { l.raf(t); id = requestAnimationFrame(f); });
    return () => { cancelAnimationFrame(id); l.destroy(); lenis = null; };
  }, [rm]);
}
export const goTo = (h: string) => {
  const el = document.querySelector<HTMLElement>(h);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -80 }); else el.scrollIntoView({ behavior: "smooth" });
};
export const spot = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const ch = { hidden: { y: "118%", rotate: 10 }, show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease } } };
export function Split({ text, className = "", delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const rm = useReducedMotion();
  if (rm) return <span className={className}>{text}</span>;
  const mode = play === undefined ? { whileInView: "show", viewport: { once: true, amount: 0.4 } } : { animate: play ? "show" : "hidden" };
  return (
    <motion.span className={"inline-block " + className} initial="hidden" {...mode}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: delay } } }}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i, a) => (
        <span key={i} aria-hidden>
          <span className="inline-block overflow-hidden align-bottom pb-[.14em] -mb-[.14em]">
            {Array.from(w).map((c, j) => <motion.span key={j} className="inline-block origin-bottom-left" variants={ch}>{c}</motion.span>)}
          </span>{i < a.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}

export function Reveal({ children, delay = 0, y = 36, play, className }: { children: ReactNode; delay?: number; y?: number; play?: boolean; className?: string }) {
  const rm = useReducedMotion();
  const from = { opacity: 0, y: rm ? 0 : y, filter: rm ? "none" : "blur(10px)" }, to = { opacity: 1, y: 0, filter: "blur(0px)" };
  const mode = play === undefined ? { whileInView: to, viewport: { once: true, amount: 0.3 } } : { animate: play ? to : from };
  return <motion.div className={className} initial={from} {...mode} transition={{ duration: rm ? 0.3 : 1.1, ease, delay }}>{children}</motion.div>;
}

const G = "!<>-_\\/[]{}=+*^?#01ABCDEFXYZ";
export function Scramble({ text, className, delay = 0, play = true }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const r = useRef<HTMLSpanElement>(null), rm = useReducedMotion();
  const iv = useInView(r, { once: true, amount: 0.6 });
  const [s, setS] = useState<string | null>(null);
  useEffect(() => {
    if (!iv || !play || rm) return;
    let raf = 0, t0 = 0;
    const to = setTimeout(() => {
      const f = (t: number) => {
        t0 ||= t;
        const b = Math.min(1, (t - t0) / 1100), c = Math.floor(b * text.length);
        let o = "";
        for (let i = 0; i < text.length; i++) o += text[i] === " " || i < c ? text[i] : G[(Math.random() * G.length) | 0];
        setS(o);
        if (b < 1) raf = requestAnimationFrame(f);
      };
      raf = requestAnimationFrame(f);
    }, delay * 1000);
    return () => { clearTimeout(to); cancelAnimationFrame(raf); };
  }, [iv, play, rm, text, delay]);
  return <span ref={r} className={className}><span className="sr-only">{text}</span><span aria-hidden style={{ opacity: s === null && !rm ? 0 : 1 }}>{s ?? text}</span></span>;
}

export function Roll({ text }: { text: string }) {
  return (
    <span className="roll"><span className="sr-only">{text}</span>
      <span className="roll-i" aria-hidden>
        {Array.from(text).map((c, i) => { const v = c === " " ? "\u00A0" : c; return <span key={i} className="rc" style={{ transitionDelay: `${i * 16}ms` }}><span>{v}</span><span>{v}</span></span>; })}
      </span>
    </span>
  );
}

export function Magnetic({ children, s = 0.3 }: { children: ReactNode; s?: number }) {
  const r = useRef<HTMLDivElement>(null);
  const cfg = { stiffness: 220, damping: 15, mass: 0.35 };
  const x = useSpring(0, cfg), y = useSpring(0, cfg);
  return (
    <motion.div ref={r} style={{ x, y }} className="inline-block"
      onPointerMove={(e) => { if (e.pointerType !== "mouse" || !r.current) return; const b = r.current.getBoundingClientRect(); x.set((e.clientX - (b.left + b.width / 2)) * s); y.set((e.clientY - (b.top + b.height / 2)) * s); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>
  );
}

export function CountUp({ to, className }: { to: number; className?: string }) {
  const r = useRef<HTMLSpanElement>(null), iv = useInView(r, { once: true, amount: 0.6 });
  useEffect(() => { if (!iv) return; const a = animate(0, to, { duration: 2, ease, onUpdate: (v) => { if (r.current) r.current.textContent = String(Math.round(v)); } }); return () => a.stop(); }, [iv, to]);
  return <span ref={r} className={className}>{to}</span>;
}

const wrap = (a: number, b: number, v: number) => { const d = b - a; return ((((v - a) % d) + d) % d) + a; };
export function Marquee({ children, v = -2, className }: { children: ReactNode; v?: number; className?: string }) {
  const base = useMotionValue(0), { scrollY } = useScroll(), dir = useRef(1);
  const sm = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const f = useTransform(sm, [0, 1000], [0, 4], { clamp: false }), skewX = useTransform(sm, [-2500, 2500], [10, -10]);
  const x = useTransform(base, (p) => `${wrap(-50, -25, p)}%`);
  useAnimationFrame((_, d) => {
    let m = dir.current * v * (d / 1000); const fv = f.get();
    if (fv < 0) dir.current = -1; else if (fv > 0) dir.current = 1;
    base.set(base.get() + m + dir.current * m * fv);
  });
  return <div className={"overflow-hidden whitespace-nowrap " + (className ?? "")}><motion.div className="flex w-max flex-nowrap" style={{ x, skewX }}>{[0, 1, 2, 3].map((i) => <span key={i} className="block pr-[.4em]" aria-hidden>{children}</span>)}</motion.div></div>;
}

export function Cursor() {
  const mx = useMotionValue(-100), my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 500, damping: 40 }), y = useSpring(my, { stiffness: 500, damping: 40 });
  const [lab, setLab] = useState(""), [on, setOn] = useState(false);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    const m = (e: globalThis.PointerEvent) => { mx.set(e.clientX); my.set(e.clientY); setLab((e.target as Element).closest?.("[data-cursor]")?.getAttribute("data-cursor") ?? ""); };
    addEventListener("pointermove", m); return () => removeEventListener("pointermove", m);
  }, [mx, my]);
  if (!on) return null;
  return (<>
    <motion.div aria-hidden style={{ x: mx, y: my }} className="pointer-events-none fixed left-0 top-0 z-[90]"><div className="-ml-[3px] -mt-[3px] size-[6px] rounded-full bg-brand" /></motion.div>
    <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[89]"><div className={"cur " + (lab ? "cur-big" : "")}>{lab}</div></motion.div>
  </>);
}
