import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, Route, Switch, useLocation, useRoute } from "wouter";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, animate } from "motion/react";
import { ArrowUpRight, ArrowLeft, Download, Mail, Phone, MapPin, Menu, X, Check, ScanEye, Workflow, BrainCircuit, Activity, Bot } from "lucide-react";
import ahsanWhiteImage from "./ahsan white.png";
import { Split, Reveal, Scramble, Roll, Magnetic, CountUp, Marquee, Cursor, useLenis, goTo, spot, ease } from "@/lib";
import { projects, services, skills, steps, cats, flows, story, type Cat } from "@/data";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrpbnqpr";

const links: [string, string][] = [["Services", "#services"], ["Skills", "#skills"], ["Projects", "#projects"], ["Contact", "#contact"]];
const icons = [ScanEye, Workflow, BrainCircuit, Activity, Bot];
const Eyebrow = ({ children }: { children: string }) => (
  <motion.p className="eyebrow mono" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.9, ease }}><span className="dot" />{children}</motion.p>
);

function Preloader({ done }: { done: () => void }) {
  const num = useRef<HTMLSpanElement>(null), [w, setW] = useState(0);
  const words = ["AUTOMATION", "VISION", "AGENTS", "ML"];
  useEffect(() => {
    const a = animate(0, 100, { duration: 2.3, ease: [0.65, 0.05, 0.36, 1], onUpdate: (v) => { if (num.current) num.current.textContent = String(Math.round(v)).padStart(3, "0"); }, onComplete: () => { setTimeout(done, 180); } });
    const i = setInterval(() => setW((x) => (x + 1) % words.length), 460);
    return () => { a.stop(); clearInterval(i); };
  }, []);
  const out = { duration: 0.95, ease: [0.76, 0, 0.24, 1] as const };
  return (
    <motion.div className="pre" initial="i" animate="a" exit="e" variants={{ e: { transition: { staggerChildren: 0.07 } } }} aria-label="Loading">
      <div className="pre-cols">{Array.from({ length: 6 }).map((_, k) => <motion.div key={k} className={"pre-col " + (k > 3 ? "max-md:hidden" : "")} variants={{ e: { y: "-100%", transition: out } }} />)}</div>
      <motion.div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10" variants={{ i: { opacity: 0 }, a: { opacity: 1, transition: { duration: 0.6 } }, e: { opacity: 0, y: -60, transition: { duration: 0.45 } } }}>
        <div className="flex justify-between"><span className="display text-xl">AHSAN<span className="text-brand">.REHMAN</span></span><span className="mono text-ink-soft max-sm:hidden">Portfolio ©2026</span></div>
        <div className="display flex items-center gap-3 text-[clamp(2.2rem,8vw,6rem)]"><span className="text-brand">/</span><span className="relative inline-flex overflow-hidden"><AnimatePresence mode="popLayout" initial={false}><motion.span key={w} initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ duration: 0.4, ease }}>{words[w]}</motion.span></AnimatePresence></span></div>
        <div className="flex items-end justify-between"><span className="mono text-ink-soft">Loading</span><span ref={num} className="display text-5xl text-brand md:text-7xl">000</span></div>
      </motion.div>
    </motion.div>
  );
}

function Nav() {
  const [hide, setHide] = useState(false), [open, setOpen] = useState(false), [act, setAct] = useState("");
  const { scrollY, scrollYProgress } = useScroll(), prog = useSpring(scrollYProgress);
  useMotionValueEvent(scrollY, "change", (y) => setHide(y > (scrollY.getPrevious() ?? 0) && y > 200 && !open));
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setAct("#" + e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(([, h]) => { const el = document.querySelector(h); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const go = (h: string) => { setOpen(false); setTimeout(() => goTo(h), 50); };
  return (<>
    <motion.div className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-brand" style={{ scaleX: prog }} />
    <motion.header animate={{ y: hide ? -110 : 0 }} transition={{ duration: 0.5, ease }} className="fixed inset-x-0 top-4 z-50 px-4" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <nav className="nav-bar mx-auto flex max-w-5xl items-center justify-between rounded-full border border-line bg-white/70 py-2 pl-5 pr-2 shadow-[0_10px_40px_-18px_rgb(37_99_235/.35)] backdrop-blur-xl" aria-label="Main">
        <button onClick={() => go("#top")} className="display text-lg" aria-label="Back to top">A<span className="text-brand">R</span></button>
        <ul className="hidden items-center gap-1 md:flex">{links.map(([l, h]) => <li key={h}><button onClick={() => go(h)} className="relative rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink">{act === h && <motion.span layoutId="nav-u" className="absolute inset-0 -z-10 rounded-full bg-sky-100" />}{l}</button></li>)}</ul>
        <div className="flex items-center gap-2">
          <a href="/Ahsan_Rehman.pdf" download className="btn btn-p !min-h-11 !px-5 text-sm max-sm:hidden"><Download className="size-4" />Download Resume</a>
          <button className="grid size-11 place-items-center rounded-full bg-sky-50 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </nav>
    </motion.header>
    <AnimatePresence>{open && <motion.div className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-bg/95 px-8 backdrop-blur-xl md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      {links.map(([l, h], i) => <motion.button key={h} onClick={() => go(h)} className="display py-2 text-left text-5xl" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 * i, ease, duration: 0.7 }}>{l}</motion.button>)}
      <a href="/Ahsan_Rehman.pdf" download className="btn btn-p mt-6 w-full justify-center sm:w-fit"><Download className="size-4" />Download Resume</a>
    </motion.div>}</AnimatePresence>
  </>);
}

function Stage() {
  const cfg = { stiffness: 120, damping: 18 }, rx = useSpring(0, cfg), ry = useSpring(0, cfg);
  return (
    <motion.div aria-hidden className="stage-wrap relative mx-auto w-full [perspective:1100px]" style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => { if (e.pointerType !== "mouse") return; const b = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - b.left) / b.width - 0.5) * 14); rx.set(-((e.clientY - b.top) / b.height - 0.5) * 14); }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}>
      <div className="absolute inset-4 rounded-full bg-sky-200/60 blur-3xl" />
      <div className="card absolute inset-0 overflow-hidden !bg-white/75 backdrop-blur-xl">
        <div className="relative m-4 h-[calc(100%-1.5rem)] overflow-hidden rounded-2xl border border-line bg-sky-50/70">
          <img src={ahsanWhiteImage} alt="Ahsan Rehman" width={520} height={442} className="absolute inset-0 h-full w-full object-cover object-top" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/10 via-sky-50/0 to-white/10" />
        </div>
      </div>
    </motion.div>
  );
}

function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null), rm = useReducedMotion(), [vid, setVid] = useState(false);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(p, [0, 1], ["0%", "-6%"]), y2 = useTransform(p, [0, 1], ["4%", "-8%"]);
  useEffect(() => { if (rm) return; fetch("/media/hero-loop.mp4", { method: "HEAD" }).then((r) => setVid(r.ok && (r.headers.get("content-type") ?? "").startsWith("video"))).catch(() => {}); }, [rm]);
  return (
    <section id="top" ref={ref} className="hero-section relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-sky-50" aria-hidden />
      <div className="aurora absolute inset-0" aria-hidden><i /><i /><i /></div>
      {vid && <><video className="absolute inset-0 size-full object-cover opacity-35" muted loop playsInline autoPlay preload="metadata" poster="/media/hero-poster.jpg" src="/media/hero-loop.mp4" aria-hidden /><div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" /></>}
      <div className="grid-bg" aria-hidden />
      <div className="wrap relative hero-grid grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div style={{ y: y1 }}>
          <p className="mono text-brand-deep"><Scramble text="AI AUTOMATION · VISION · AGENTS" play={ready} /></p>
          <h1 className="display h1 mt-6"><span className="block"><Split text="Ahsan" play={ready} /></span><span className="glow block"><Split text="Rehman" delay={0.15} play={ready} /></span></h1>
          <Reveal delay={0.4} play={ready}><p className="display mt-6 text-2xl text-ink md:text-3xl">Artificial Intelligence Engineer</p></Reveal>
          <Reveal delay={0.55} play={ready}><p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">I specialize in AI-driven automation, workflow orchestration, and applied machine learning. I build automation pipelines that connect AI models and business systems to eliminate manual work, alongside end-to-end computer vision solutions and AI agents, and deploy practical, production-style solutions.</p></Reveal>
          <Reveal delay={0.7} play={ready} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic><button onClick={() => goTo("#contact")} className="btn btn-p group"><Roll text="Book a Project" /><ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" /></button></Magnetic>
            <Magnetic><a href="/Ahsan_Rehman.pdf" download className="btn btn-g group"><Roll text="Download Resume" /><Download className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" /></a></Magnetic>
          </Reveal>
          <Reveal delay={0.85} play={ready}><a href="https://www.linkedin.com/in/ahsan-rehman-4a5026331/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep underline-offset-4 hover:underline">Connect on LinkedIn <ArrowUpRight className="size-4" /></a></Reveal>
        </motion.div>
        <motion.div style={{ y: y2 }}><Stage /></motion.div>
      </div>
      <div className="mono absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-soft max-md:hidden" aria-hidden>Scroll<span className="relative h-10 w-px overflow-hidden bg-line"><motion.span className="absolute inset-x-0 h-4 bg-brand" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} /></span></div>
    </section>
  );
}

const Bands = () => (
  <section aria-hidden className="overflow-hidden py-6">
    <div className="band-o"><Marquee v={1.6}>COMPUTER VISION ✦ YOLOv8 ✦ BYTETRACK ✦ AUTOMATION ✦</Marquee></div>
    <div className="band-s mt-2 -rotate-1"><Marquee v={-2.2}>AI AGENTS ✦ RAG ✦ LANGCHAIN ✦ PYTHON ✦</Marquee></div>
  </section>
);

function Services() {
  const span = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"];
  return (
    <section id="services" className="section-pad"><div className="wrap">
      <Eyebrow>What I do</Eyebrow>
      <h2 className="display h2 mt-5 max-w-4xl"><Split text="Practical AI systems for real-world work." /></h2>
      <div className="mt-14 grid gap-5 md:grid-cols-6">
        {services.map((s, i) => { const I = icons[i]; return (
          <Reveal key={s.t} delay={i * 0.08} className={span[i]}>
            <article className="card spot flex h-full flex-col p-7" onPointerMove={spot}>
              <div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-sky-100 text-brand"><I className="size-6" /></span><span className="mono text-ink-soft">0{i + 1}</span></div>
              <h3 className="display mt-8 text-2xl leading-tight tracking-tight">{s.t}</h3>
              <p className="mt-3 text-ink-soft">{s.d}</p>
              <div className="mt-auto pt-6"><p className="mono mb-3 text-brand-deep">e.g.</p><div className="flex flex-wrap gap-2">{s.e.map((x) => <span key={x} className="chip">{x}</span>)}</div></div>
            </article>
          </Reveal>); })}
      </div>
    </div></section>
  );
}

function Projects() {
  const [c, setC] = useState<"All" | Cat>("All"), list = projects.filter((x) => c === "All" || x.cat === c);
  return (
    <section id="projects" className="bg-gradient-to-b from-transparent via-sky-50 to-transparent section-pad"><div className="wrap">
      <Eyebrow>Projects</Eyebrow>
      <h2 className="display h2 mt-5"><Split text="Selected work" /></h2>
      <div className="mt-10 flex flex-wrap gap-2" role="tablist">{(["All", ...cats] as const).map((t) => <button key={t} role="tab" aria-selected={c === t} onClick={() => setC(t)} className={"relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors " + (c === t ? "border-brand text-white" : "border-line bg-white text-ink-soft hover:text-ink")}>{c === t && <motion.span layoutId="tab" className="absolute inset-0 -z-0 rounded-full bg-brand" transition={{ duration: 0.45, ease }} />}<span className="relative">{t}</span></button>)}</div>
      <motion.ul layout className="mt-10 grid gap-5 responsive-grid-3">
        <AnimatePresence mode="popLayout">{list.map((x, i) => (
          <motion.li layout key={x.slug} initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }} transition={{ duration: 0.55, ease, delay: i * 0.04 }}>
            <Link href={`/projects/${x.slug}`} data-cursor="VIEW" onPointerMove={spot} className="card spot group flex h-full flex-col p-7">
              <div className="flex items-center justify-between"><span className="mono text-brand-deep">{x.cat} · {x.featured ? "Featured" : "Concept / Lab"}</span><ArrowUpRight className="size-5 text-ink-soft transition-all duration-500 group-hover:rotate-45 group-hover:text-brand" /></div>
              <h3 className="display mt-6 text-xl leading-snug tracking-tight">{x.title}</h3>
              <p className="mt-3 text-ink-soft">{x.summary}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">{x.tags.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </Link>
          </motion.li>))}</AnimatePresence>
      </motion.ul>
    </div></section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-pad"><div className="wrap">
      <Eyebrow>Technical skills</Eyebrow>
      <h2 className="display h2 mt-5"><Split text="Tools I work with." /></h2>
      <div className="mt-14 grid gap-5 responsive-grid-3">
        {skills.map(([g, items], i) => (
          <Reveal key={g} delay={i * 0.07}><div className="card spot h-full p-7" onPointerMove={spot}>
            <h3 className="mono text-brand-deep">{g}</h3>
            <motion.div className="mt-5 flex flex-wrap gap-2" initial="h" whileInView="s" viewport={{ once: true }} variants={{ s: { transition: { staggerChildren: 0.08 } } }}>
              {items.map((t) => <motion.span key={t} className="chip !text-base" variants={{ h: { opacity: 0, scale: 0.8 }, s: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 320, damping: 18 } } }}>{t}</motion.span>)}
            </motion.div></div></Reveal>))}
        <div className="grid grid-cols-3 gap-3 md:col-span-2 lg:col-span-1">{[[6, "Featured projects"], [5, "Services"], [5, "Skill groups"]].map(([n, l]) => <div key={l} className="card flex flex-col justify-center p-5"><CountUp to={n as number} className="display text-5xl text-brand" /><span className="mono mt-2 text-[.62rem] text-ink-soft">{l}</span></div>)}</div>
      </div>
    </div></section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 55%"] }), fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  return (
    <section className="section-pad-sm"><div className="wrap grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
      <div className="self-start lg:sticky lg:top-28"><Eyebrow>How I work</Eyebrow><h2 className="display h2 mt-5"><Split text="From workflow" /><br /><span className="glow"><Split text="to production." delay={0.1} /></span></h2></div>
      <div ref={ref} className="relative pl-10"><div className="tl-track" aria-hidden><motion.div className="tl-fill" style={{ scaleY: fill }} /></div>
        <ol className="space-y-8">{steps.map((s, i) => (
          <motion.li key={s} className="card relative p-7" initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1, ease }}>
            <motion.span className="absolute -left-[39px] top-9 size-6 rounded-full border-4 border-bg bg-brand" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 320, damping: 16 }} />
            <span className="mono text-brand-deep">0{i + 1}</span><h3 className="display mt-2 text-2xl tracking-tight">{s}</h3></motion.li>))}</ol></div>
    </div></section>
  );
}

type FormStatus = "idle" | "submitting" | "success" | "error";

function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const details = String(f.get("details") ?? "").trim();
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
    if (details.length < 10) errors.details = "Please provide at least 10 characters about your project.";

    setFieldErrors(errors);
    setSubmitError("");

    if (Object.keys(errors).length) {
      // Focus the first invalid field
      if (errors.name) nameRef.current?.focus();
      else if (errors.email) emailRef.current?.focus();
      else if (errors.details) detailsRef.current?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: f,
      });

      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        setTimeout(() => {
          setStatus("idle");
        }, 6000);
      } else {
        let msg = "";
        try {
          const data = await res.json();
          if (data.errors && Array.isArray(data.errors)) {
            msg = data.errors.map((err: { message?: string }) => err.message).filter(Boolean).join(" ");
          }
        } catch {
          // JSON parse failed, use fallback
        }
        setSubmitError(msg || "");
        setStatus("error");
      }
    } catch {
      setSubmitError("network");
      setStatus("error");
    }
  }

  const info = [[Mail, "ahsanfsd99@gmail.com", "mailto:ahsanfsd99@gmail.com"], [Phone, "+92-315-7544153", "tel:+923157544153"], [MapPin, "Faisalabad, Pakistan", ""]] as const;
  return (
    <section id="contact" className="section-pad"><div className="wrap contact-grid grid gap-14 lg:grid-cols-2">
      <div><Eyebrow>Contact and Book a Project</Eyebrow><h2 className="display h2 mt-5"><Split text="Have a workflow worth improving?" /></h2>
        <Reveal delay={0.1}><p className="mt-7 max-w-md text-lg text-ink-soft">Share what you are working on. I can help shape a practical automation, machine learning, or computer vision solution.</p></Reveal>
        <ul className="mt-9 space-y-3 contact-info">{info.map(([I, t, h]) => <li key={t}>{h ? <a href={h} className="inline-flex items-center gap-3 font-medium hover:text-brand"><I className="size-5 text-brand" />{t}</a> : <span className="inline-flex items-center gap-3 font-medium"><I className="size-5 text-brand" />{t}</span>}</li>)}
          <li><a href="https://www.linkedin.com/in/ahsan-rehman-4a5026331/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-medium hover:text-brand"><ArrowUpRight className="size-5 text-brand" />LinkedIn profile</a></li></ul></div>
      <Reveal delay={0.15}>
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="card space-y-4 p-7 md:p-9">
          <h3 className="display text-2xl tracking-tight">Start a conversation</h3>

          {/* Formspree hidden fields */}
          <input type="hidden" name="_subject" value="New project inquiry from portfolio" />
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
            style={{ position: "absolute", left: "-9999px", height: 0, width: 0, overflow: "hidden" }}
          />

          {/* Name field */}
          <div className="fld">
            <input
              ref={nameRef}
              id="name"
              name="name"
              type="text"
              placeholder=" "
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            <label htmlFor="name">Name</label>
            {fieldErrors.name && <p id="name-error" className="form-error" role="alert">{fieldErrors.name}</p>}
          </div>

          {/* Email field */}
          <div className="fld">
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              placeholder=" "
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            <label htmlFor="email">Email</label>
            {fieldErrors.email && <p id="email-error" className="form-error" role="alert">{fieldErrors.email}</p>}
          </div>

          {/* Details field */}
          <div className="fld">
            <textarea
              ref={detailsRef}
              id="details"
              name="details"
              rows={5}
              placeholder=" "
              aria-invalid={!!fieldErrors.details}
              aria-describedby={fieldErrors.details ? "details-error" : undefined}
            />
            <label htmlFor="details">Project details</label>
            {fieldErrors.details && <p id="details-error" className="form-error" role="alert">{fieldErrors.details}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-p group w-full justify-center"
            disabled={status === "submitting"}
          >
            {status === "success" ? (
              <><Check className="size-5" />Message sent, thank you!</>
            ) : status === "submitting" ? (
              <><span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />Sending…</>
            ) : (
              <><Roll text="Book a Project" /><ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" /></>
            )}
          </button>

          {status === "success" && (
            <p className="form-success" role="status" aria-live="polite">
              Your message has been sent successfully! I'll get back to you soon.
            </p>
          )}

          {status === "error" && (
            <p className="form-error" role="alert">
              {submitError === "network" ? (
                <>Unable to reach the server. Please check your connection or email me directly at{" "}
                  <a href="mailto:ahsanfsd99@gmail.com" className="underline underline-offset-2 hover:text-brand-deep">ahsanfsd99@gmail.com</a>.</>
              ) : submitError ? (
                submitError
              ) : (
                <>Something went wrong. Please email me directly at{" "}
                  <a href="mailto:ahsanfsd99@gmail.com" className="underline underline-offset-2 hover:text-brand-deep">ahsanfsd99@gmail.com</a>.</>
              )}
            </p>
          )}
        </form>
      </Reveal>
    </div></section>
  );
}

const Footer = () => (
  <footer className="footer-section border-t border-line bg-white py-16"><div className="wrap">
    <p className="display h2 text-ink"><Split text="Let's automate." /></p>
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-soft"><span>Ahsan Rehman © 2026 Ahsan Rehman</span>
      <button onClick={() => goTo("#top")} className="btn btn-g !min-h-11 text-sm">Back to top <ArrowUpRight className="size-4 -rotate-45" /></button></div>
  </div></footer>
);

function ProjectPage() {
  const [, m] = useRoute("/projects/:slug"), pr = projects.find((x) => x.slug === m?.slug);
  if (!pr) return <NotFound />;
  const [pb, ap, oc] = story[pr.cat];
  return (
    <main className="wrap pb-28 pt-32"><Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand-deep"><ArrowLeft className="size-4" />All projects</Link>
      <p className="eyebrow mono mt-10"><span className="dot" />{pr.cat} · {pr.featured ? "Featured" : "Concept / Lab"}</p>
      <h1 className="display h2 mt-5 max-w-4xl"><Split text={pr.title} play /></h1>
      <Reveal delay={0.2}><p className="mt-6 max-w-2xl text-xl text-ink-soft">{pr.summary}</p></Reveal>
      <div className="card mt-14 p-7 md:p-10"><p className="mono text-brand-deep">Pipeline</p>
        <ol className="mt-8 grid gap-4 pipeline-grid">{flows[pr.cat].map((s, i) => <motion.li key={s} className="relative rounded-2xl bg-sky-50 p-5" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease }}>
          <span className="mono text-ink-soft">0{i + 1}</span><p className="display mt-2 text-lg leading-tight">{s}</p>
          {i < 4 && <motion.span className="absolute -right-4 top-1/2 hidden h-px w-4 origin-left bg-brand md:block" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6 + i * 0.12 }} />}</motion.li>)}</ol></div>
      <div className="mt-5 grid gap-5 responsive-grid-3">{[["Problem", pb], ["Approach", ap], ["Outcome", oc]].map(([h, t], i) => <Reveal key={h} delay={i * 0.08}><div className="card h-full p-7"><p className="mono text-brand-deep">{h}</p><p className="mt-4 text-ink-soft">{t}</p></div></Reveal>)}</div>
      <div className="mt-10"><p className="mono text-brand-deep">Stack</p><div className="mt-4 flex flex-wrap gap-2">{pr.tags.map((t) => <span key={t} className="chip !text-base">{t}</span>)}</div></div>
      <div className="mt-14"><Link href="/" className="btn btn-p">Discuss a similar project <ArrowUpRight className="size-4" /></Link></div>
    </main>
  );
}
const NotFound = () => <main className="wrap grid min-h-[80svh] place-content-center text-center"><p className="mono text-brand-deep">404</p><h1 className="display h2 mt-4">Page not found.</h1><div className="mt-8"><Link href="/" className="btn btn-p">Back home</Link></div></main>;

export default function App() {
  useLenis();
  const rm = useReducedMotion(), [loc] = useLocation();
  const [ready, setReady] = useState(() => rm === true || sessionStorage.getItem("pre") === "1");
  useEffect(() => { window.scrollTo(0, 0); }, [loc]);
  useEffect(() => { if (rm) setReady(true); }, [rm]);
  return (<>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
    <AnimatePresence>{!ready && <Preloader done={() => { sessionStorage.setItem("pre", "1"); setReady(true); }} />}</AnimatePresence>
    <Cursor />
    <Switch>
      <Route path="/"><Nav /><div id="main"><Hero ready={ready} /><Bands /><Services /><Projects /><Skills /><Process /><Contact /></div><Footer /></Route>
      <Route path="/projects/:slug"><ProjectPage /><Footer /></Route>
      <Route><NotFound /></Route>
    </Switch>
  </>);
}
