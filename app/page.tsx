import Image from "next/image";
import { Controls, Mark } from "@/components/Controls";
import { Motion } from "@/components/Motion";
import { education, experience, profile, projects, skills } from "@/lib/content";
import { t } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  const skillNames: Record<string, string> = t.skills.names;
  const categories = [...new Set(skills.map((s) => s.category))] as (keyof typeof t.skills.categories)[];
  const stack = ["Flutter", "Laravel", "Next.js", "React", "PHP", "MySQL", "Firebase", "Python", "ASP.NET Core", "Figma"];
  const studies = [
    { title: t.education.diploma, org: education[0].org },
  ];

  return (
    <>
      <Motion />

      <div className="intro" data-intro-el aria-hidden="true">
        <div className="intro__log mono" data-intro-log>
          <p>&gt; boot wasem.khalifa</p>
          <p>&gt; load flutter · laravel · next</p>
          <p>&gt; connect sensors · firebase</p>
          <p>&gt; render portfolio_</p>
        </div>
        <p className="intro__name" data-intro-name>
          {profile.name}
        </p>
        <div className="intro__foot mono">
          <span>{t.ui.skip}</span>
          <span className="intro__count">
            <span data-intro-count>000</span>%
          </span>
        </div>
        <div className="intro__bar" data-intro-bar />
      </div>

      <div className="progress" data-progress aria-hidden="true" />
      <div className="cursor" data-cursor aria-hidden="true" />

      <Controls />

      <main>
        {/* HERO */}
        <section id="top" className="hero" data-hero data-stack>
          <div className="hero__meta mono">
            <span className="dot-live">{t.ui.available}</span>
            <span>{profile.location}</span>
          </div>

          <h1 className="hero__name" data-hero-name>
            <span className="hero__line" data-split>
              {profile.firstName}
            </span>
            <span className="hero__line hero__line--indent" data-split>
              {profile.name.split(" ")[1]}
            </span>
          </h1>

          <figure className="hero__photo" data-hero-photo>
            <Image src={profile.photoUrl} alt={profile.name} fill priority sizes="(max-width: 768px) 60vw, 22rem" />
          </figure>

          <div className="hero__bottom">
            <div className="hero__copy" data-hero-copy>
              <p className="label">{t.hero.title}</p>
              <p className="hero__headline">{t.hero.headline}</p>
              <div className="hero__cta">
                <a className="btn btn--solid" href="#projects" data-magnetic>
                  {t.hero.viewProjects}
                  <Arrow />
                </a>
                <a
                  className="btn"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.hero.emailMe}
                </a>
              </div>
            </div>
            <a href="#about" className="hero__scroll mono" data-hero-scroll>
              <span className="hero__scroll-line" />
              {t.ui.scroll}
            </a>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about" data-section data-reveal data-stack>
          <div className="marquee" aria-hidden="true">
            <div className="marquee__track" data-marquee>
              {[0, 1].map((k) => (
                <div key={k} className="marquee__group">
                  {stack.map((s) => (
                    <span key={s}>
                      {s} <Mark className="marquee__mark" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="wrap">
            <header className="section__head">
              <span className="label">01 — {t.about.eyebrow}</span>
              <h2 className="h2" data-split>
                {t.about.heading}
              </h2>
            </header>
            <p className="about__text" data-words>
              {t.about.description}
            </p>
            <div className="about__langs">
              <span className="label">{t.about.languages}</span>
              <ul>
                {profile.languages.map((l, i) => (
                  <li key={l.name} data-fade>
                    <strong>{t.ui.languageNames[i]}</strong>
                    <span>{t.about.languageLevels[i]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS: pinned horizontal scroll */}
        <section id="projects" className="projects" data-section data-projects>
          <div className="projects__head wrap">
            <div>
              <span className="label">02 — {t.projects.eyebrow}</span>
              <h2 className="h2" data-split>
                {t.projects.heading}
              </h2>
            </div>
            <div className="projects__status mono">
              <span>
                <span data-project-index>01</span> / {pad(projects.length)}
              </span>
              <span className="projects__bar">
                <span data-project-bar />
              </span>
              <span className="projects__hint">{t.ui.dragHint} →</span>
            </div>
          </div>

          <div className="projects__track" data-track>
            {projects.map((p, i) => (
              <article key={p.id} className="project" data-project style={{ "--p-glow": p.glowColor } as React.CSSProperties}>
                <div className="project__visual" data-project-visual>
                  <span className="project__num">{pad(i + 1)}</span>
                  {p.image ? (
                    <div className="project__showcase">
                      <div className="project__showcase-glow" />
                      <div className="project__showcase-card">
                        <Image
                          src={p.image}
                          alt={p.title}
                          width={180}
                          height={180}
                          className="project__showcase-img"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  ) : (
                    <Glyph id={p.id} />
                  )}
                </div>
                <div className="project__body">
                  <div className="project__title-group">
                    {p.logo && (
                      <div className="project__logo-badge">
                        <Image
                          src={p.logo}
                          alt=""
                          width={44}
                          height={44}
                          className="project__logo-img"
                        />
                      </div>
                    )}
                    <h3 className="project__title">{p.title}</h3>
                  </div>
                  <p className="project__desc">
                    {t.projects.descriptions[p.title as keyof typeof t.projects.descriptions] ?? p.description}
                  </p>
                  <ul className="tags">
                    {p.techStack.split(",").map((s) => (
                      <li key={s}>{s.trim()}</li>
                    ))}
                  </ul>
                  <div className="project__links">
                    {p.liveUrl && (
                      <a className="btn btn--sm btn--solid" href={p.liveUrl} target="_blank" rel="noreferrer">
                        {t.projects.openSite}
                      </a>
                    )}
                    {p.githubUrls && p.githubUrls.length > 0 ? (
                      p.githubUrls.map((repo) => (
                        <a key={repo.url} className="btn btn--sm" href={repo.url} target="_blank" rel="noreferrer">
                          {repo.label}
                        </a>
                      ))
                    ) : p.githubUrl ? (
                      <a className="btn btn--sm" href={p.githubUrl} target="_blank" rel="noreferrer">
                        {t.projects.viewCode}
                      </a>
                    ) : (
                      <a className="btn btn--sm" href={`mailto:${profile.email}?subject=${encodeURIComponent(p.title)}`}>
                        {t.projects.askAbout}
                        <Arrow />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section skills" data-section data-reveal data-stack>
          <div className="wrap">
            <header className="section__head">
              <span className="label">03 — {t.skills.eyebrow}</span>
              <h2 className="h2" data-split>
                {t.skills.heading}
              </h2>
            </header>
            <div className="skills__list">
              {categories.map((c, i) => (
                <div key={c} className="skills__row" data-skill-row>
                  <span className="skills__idx mono">{pad(i + 1)}</span>
                  <h3 className="skills__cat">{t.skills.categories[c]}</h3>
                  <ul className="skills__items">
                    {skills
                      .filter((s) => s.category === c)
                      .map((s) => (
                        <li key={s.id}>{skillNames[s.name] ?? s.name}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section experience" data-section data-reveal data-stack>
          <div className="wrap">
            <header className="section__head">
              <span className="label">04 — {t.experience.eyebrow}</span>
              <h2 className="h2" data-split>
                {t.experience.heading}
              </h2>
            </header>
            <ol className="timeline" data-timeline>
              <span className="timeline__line" data-timeline-line />
              {experience.map((e) => (
                <li key={e.role} className="timeline__item" data-fade>
                  <span className="mono timeline__period">{t.experience.period}</span>
                  <h3>{t.experience.role}</h3>
                  <p className="timeline__org">
                    {t.experience.organization} · {t.experience.location}
                  </p>
                  <ul className="timeline__points">
                    {t.experience.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="section education" data-section data-reveal data-stack>
          <div className="wrap">
            <header className="section__head">
              <span className="label">05 — {t.education.eyebrow}</span>
              <h2 className="h2" data-split>
                {t.education.heading}
              </h2>
            </header>

            <div className="education__grid">
              <div className="education__info">
                <ol className="timeline" data-timeline>
                  <span className="timeline__line" data-timeline-line />
                  {studies.map((s, i) => (
                    <li key={s.title} className="timeline__item" data-fade>
                      <span className="mono timeline__period">{t.education.periods[i]}</span>
                      <h3>{s.title}</h3>
                      <p className="timeline__org">
                        {s.org} · {t.education.locations[i]}
                      </p>
                      <div className="education__tags">
                        <span className="education__tag">{t.education.tagDtc}</span>
                        <span className="education__tag">{t.education.institute}</span>
                        <span className="education__tag education__tag--grade">{t.education.grade}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="education__cert" data-fade>
                <div className="education__cert-glow" aria-hidden="true" />
                <a
                  href="/cis-diploma.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="education__cert-card"
                  aria-label="View official CIS Diploma Certificate"
                >
                  <div className="education__cert-badge">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                    <span>{t.education.officialDiploma}</span>
                  </div>
                  <div className="education__cert-media">
                    <Image
                      src="/cis-diploma.jpg"
                      alt="Diploma in Computer Information Systems (CIS) - Wasim Mohammad Kheir Khalifa"
                      width={900}
                      height={636}
                      className="education__cert-img"
                    />
                    <div className="education__cert-overlay">
                      <span className="education__cert-btn">
                        <span>{t.education.viewCertificate}</span>
                        <Arrow />
                      </span>
                    </div>
                  </div>
                  <div className="education__cert-footer">
                    <span className="education__cert-title">{t.education.diploma}</span>
                    <span className="education__cert-org mono">{t.education.tagDtc} · {t.education.locations[0]}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact" data-section data-reveal>
          <div className="wrap">
            <span className="label">06 — {t.contact.eyebrow}</span>
            <h2 className="contact__heading" data-split>
              {t.contact.heading}
            </h2>
            <p className="contact__desc">{t.contact.description}</p>
            <a
              className="contact__email"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
            >
              <span>{profile.email}</span>
              <Arrow />
            </a>
            <dl className="contact__grid">
              <div data-fade>
                <dt className="label">{t.contact.phone}</dt>
                <dd>
                  <a href={`tel:${profile.phone}`}>
                    {profile.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div data-fade>
                <dt className="label">{t.contact.location}</dt>
                <dd>{profile.location}</dd>
              </div>
              <div data-fade>
                <dt className="label">Social</dt>
                <dd className="contact__social">
                  <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                </dd>
              </div>
              <div data-fade>
                <dt className="label">CV</dt>
                <dd>
                  <a href={profile.cvUrl} download>
                    {t.downloadCv} ↓
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <p className="footer__big" aria-hidden="true">
            {profile.firstName}
          </p>
          <div className="footer__row mono">
            <span>© {new Date().getFullYear()} — {t.footer}</span>
            <a href="#top">{t.ui.backToTop} ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Abstract line art per project until real screenshots exist (set `image` in content.ts).
function Glyph({ id }: { id: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const };
  return (
    <svg className="glyph" viewBox="0 0 200 200" aria-hidden="true" data-glyph>
      {id === "edu-bridge" && (
        <g {...common}>
          <path d="M10 140h180M30 140c20-70 120-70 140 0" />
          {[50, 75, 100, 125, 150].map((x) => (
            <path key={x} d={`M${x} 140V${140 - Math.sin(((x - 30) / 140) * Math.PI) * 52}`} />
          ))}
          <circle cx="100" cy="60" r="6" className="glyph__accent" />
        </g>
      )}
      {id === "smart-tank" && (
        <g {...common}>
          <rect x="55" y="30" width="90" height="140" rx="14" />
          <path className="glyph__wave" d="M55 100q11-8 22 0t23 0 22 0 23 0" />
          <path d="M160 60h20M160 90h12M160 120h20" />
          <circle cx="170" cy="40" r="5" className="glyph__accent" />
        </g>
      )}
      {id === "solarmate" && (
        <g {...common}>
          <circle cx="100" cy="80" r="26" className="glyph__accent" />
          <g className="glyph__rays">
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} d="M100 38V24" transform={`rotate(${i * 30} 100 80)`} />
            ))}
          </g>
          <path d="M40 170l20-45h80l20 45zM70 125l-6 45M100 125v45M130 125l6 45M50 148h100" />
        </g>
      )}
      {id === "warehouse-management" && (
        <g {...common}>
          {[
            [40, 120], [90, 120], [140, 120], [65, 70], [115, 70], [90, 20],
          ].map(([x, y], i) => (
            <rect key={i} x={x - 20} y={y} width="44" height="44" rx="4" className={i === 5 ? "glyph__accent" : undefined} />
          ))}
          <path d="M10 170h180" />
        </g>
      )}
    </svg>
  );
}
