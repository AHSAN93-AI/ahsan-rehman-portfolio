import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BellRing,
  Bot,
  Braces,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ScanLine,
  Workflow,
} from "lucide-react";

const services = [
  {
    title: "Computer Vision Solutions",
    description: "Real-time detection, tracking and alerting systems.",
    icon: ScanLine,
    projects: [
      "Parking Violation & Occupancy Monitoring System",
      "Car Damage Detection",
      "Weapon Alert System",
    ],
  },
  {
    title: "Workflow and Process Automation",
    description: "Automation pipelines that connect AI models and business systems.",
    icon: Workflow,
    projects: ["Inventory Tracking Automation System"],
  },
  {
    title: "Machine Learning Integration",
    description: "Python ML models integrated into automated workflows.",
    icon: Braces,
    projects: ["AI Resume Screening Tool", "Car Damage Detection"],
  },
  {
    title: "Monitoring and Alerting Systems",
    description: "Live dashboards, rule-based alerts and evidence capture.",
    icon: BellRing,
    projects: [
      "Parking Violation & Occupancy Monitoring System",
      "Weapon Alert System",
      "Inventory Tracking Automation System",
    ],
  },
  {
    title: "AI Agents",
    description:
      "LLM-powered agents and RAG pipelines that reason, retrieve knowledge and take actions.",
    icon: Bot,
    projects: ["Dental Clinic AI Agent"],
  },
];

const skills = [
  { label: "Automation", items: ["Business Process Automation", "Workflow Orchestration", "Scheduled Triggers"] },
  { label: "Languages", items: ["Python"] },
  { label: "Computer Vision", items: ["OpenCV", "YOLO (v8)", "ByteTrack"] },
  { label: "AI Agents", items: ["LangChain", "RAG"] },
  { label: "ML & Data Science", items: ["Scikit-learn", "TensorFlow", "Keras", "Pandas"] },
];

function LinkedInMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.54 20.45H7.1V9H3.54v11.45Z" />
    </svg>
  );
}

function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (openCardIndex === null) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".service-card")) {
        setOpenCardIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openCardIndex]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="portfolio-page">
      <header className="site-nav">
        <div className="site-nav__inner">
          <a className="monogram" href="#top" aria-label="Back to top">
            AR
          </a>
          <nav className="site-nav__links" aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="nav-resume" href="/Ahsan_Rehman.pdf" download>
            Download Resume
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section section-shell">
          <div className="hero-copy reveal" data-reveal>
            <p className="eyebrow">Freelance AI Engineer</p>
            <h1>
              Ahsan <span>Rehman</span>
            </h1>
            <p className="hero-title">Artificial Intelligence Engineer</p>
            <p className="hero-about">
              I specialize in AI-driven automation, workflow orchestration, and applied machine learning. I build automation pipelines that connect AI models and business systems to eliminate manual work, alongside end-to-end computer vision solutions and AI agents, and deploy practical, production-style solutions.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="/Ahsan_Rehman.pdf" download>
                Download Resume
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
              </a>
              <a className="text-button" href="#contact">
                Book a Project
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
              </a>
            </div>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/ahsan-rehman-4a5026331/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="linkedin-link__icon">
                <LinkedInMark />
              </span>
              Connect on LinkedIn
              <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.8} />
            </a>
          </div>

          <div className="hero-visual reveal" data-reveal>
            <div className="profile-frame">
              <div className="profile-photo">
                {imageLoaded ? (
                  <img
                    src="/ahsan.png"
                    alt="Portrait of Ahsan Rehman"
                    onError={() => setImageLoaded(false)}
                  />
                ) : (
                  <div className="profile-placeholder" role="img" aria-label="Ahsan Rehman placeholder profile image">
                    AR
                  </div>
                )}
              </div>

            </div>
            <div className="hero-rule" aria-hidden="true" />
          </div>
        </section>

        <section id="services" className="services-section section-shell">
          <div className="section-heading reveal" data-reveal>
            <p className="eyebrow">What I do</p>
            <h2>Practical AI systems for real-world work.</h2>
          </div>
          <div className="services-grid">
            {services.map(({ title, description, icon: Icon, projects }, index) => {
              const isOpen = openCardIndex === index;
              const hasProjects = projects.length > 0;
              return (
                <article
                  className={`service-card reveal${isOpen ? " is-dropdown-open" : ""}`}
                  data-reveal
                  key={title}
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => setOpenCardIndex(isOpen ? null : index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenCardIndex(isOpen ? null : index);
                    }
                  }}
                  style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                >
                  <div className="service-card__top">
                    <span className="service-card__icon">
                      <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
                    </span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="service-dropdown">
                    {hasProjects ? (
                      <>
                        <span className="service-dropdown__label">Eg:</span>
                        <ul className="service-dropdown__list">
                          {projects.map((project) => (
                            <li key={project}>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <ul className="service-dropdown__list">
                        <li className="service-dropdown__muted">
                          Projects coming soon
                        </li>
                      </ul>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="skills" className="skills-section section-shell">
          <div className="section-heading reveal" data-reveal>
            <p className="eyebrow">Technical skills</p>
            <h2>Tools I work with.</h2>
          </div>
          <div className="skills-grid">
            {skills.map(({ label, items }, index) => (
              <div
                className="skill-group reveal"
                data-reveal
                key={label}
                style={{ "--reveal-delay": `${index * 50}ms` } as React.CSSProperties}
              >
                <h3>{label}</h3>
                <ul className="tag-list">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </section>

        <section id="contact" className="contact-section">
          <div className="section-shell contact-layout">
            <div className="contact-intro reveal" data-reveal>
              <p className="eyebrow">Contact and Book a Project</p>
              <h2>Have a workflow worth improving?</h2>
              <p>
                Share what you are working on. I can help shape a practical automation, machine learning, or computer vision solution.
              </p>
              <div className="contact-details">
                <a href="mailto:ahsanfsd99@gmail.com">
                  <Mail aria-hidden="true" size={16} strokeWidth={1.7} />
                  ahsanfsd99@gmail.com
                </a>
                <a href="tel:+923157544153">
                  <Phone aria-hidden="true" size={16} strokeWidth={1.7} />
                  +92-315-7544153
                </a>
                <a
                  href="https://www.linkedin.com/in/ahsan-rehman-4a5026331/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInMark className="contact-linkedin-mark" />
                  LinkedIn profile
                </a>
                <span>
                  <MapPin aria-hidden="true" size={16} strokeWidth={1.7} />
                  Faisalabad, Pakistan
                </span>
              </div>
            </div>

            <form className="booking-form reveal" data-reveal onSubmit={handleSubmit}>
              <div className="form-heading">
                <span>Start a conversation</span>
                <span className="form-heading__line" aria-hidden="true" />
              </div>
              <div className="form-grid">
                <label>
                  <span>Name</span>
                  <input name="name" type="text" placeholder="Your name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" placeholder="you@company.com" required />
                </label>
              </div>
              <label>
                <span>Project details</span>
                <textarea
                  name="details"
                  placeholder="Tell me a little about the workflow or system you want to improve."
                  rows={6}
                  required
                />
              </label>
              <button className="primary-button form-submit" type="submit">
                Book a Project
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
              </button>
              {submitted && (
                <p className="form-success" role="status">
                  <CheckCircle2 aria-hidden="true" size={16} strokeWidth={1.8} />
                  Thanks — your request has been submitted.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <span>Ahsan Rehman</span>
        <span>© {new Date().getFullYear()} Ahsan Rehman</span>
      </footer>
    </div>
  );
}

export default Home;
