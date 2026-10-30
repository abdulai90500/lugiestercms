'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState('2026');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SITE HEADER                                                              */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="LUNGICEST home">
            <img className="brand-mark" src="/images/LOGO.png" alt="LUNGICEST Logo" />
            <span className="brand-copy">
              <strong>LUNGICEST</strong>
              <span>
                Lungi College of Education
                <br />
                Science &amp; Technology
              </span>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav
            className={`navigation ${menuOpen ? 'is-open' : ''}`}
            id="primary-navigation"
            aria-label="Main navigation"
          >
            <a className="nav-link active" href="#home" onClick={closeMenu}>
              Home
            </a>
            <a className="nav-link" href="#about" onClick={closeMenu}>
              About
            </a>
            <a className="nav-link" href="#academics" onClick={closeMenu}>
              Academics
            </a>
            <a className="nav-link" href="#community" onClick={closeMenu}>
              Community
            </a>
            <a className="nav-link" href="#media" onClick={closeMenu}>
              Gallery
            </a>
            <a className="nav-link" href="#contact" onClick={closeMenu}>
              Contact
            </a>
            <Link className="nav-link" href="/admissions" onClick={closeMenu}>
              Admissions
            </Link>
            <Link className="nav-link" href="/apply/track" onClick={closeMenu}>
              Track Application
            </Link>
            <Link
              className="button button-small button-gold nav-cta"
              href="/apply"
              onClick={closeMenu}
            >
              Apply now ↗
            </Link>
            <Link
              className="button button-small button-navy"
              href="/login"
              onClick={closeMenu}
              style={{ paddingInline: '14px' }}
            >
              Portal Login
            </Link>
          </nav>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* MAIN CONTENT                                                             */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <main id="main-content">
        {/* HERO SECTION */}
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-image" aria-hidden="true"></div>
          <div className="hero-shade" aria-hidden="true"></div>
          <div className="container hero-content">
            <p className="eyebrow eyebrow-light">
              <span></span> Lungi, Sierra Leone
            </p>
            <h1 id="hero-title">
              Education that transforms <em>communities.</em>
            </h1>
            <p className="hero-intro">
              Building skills, developing talent and creating opportunities for the people of Kaffu
              Bullom and Sierra Leone.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/apply">
                Apply online now <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button-outline-light" href="/apply/track">
                Track application ↗
              </Link>
              <Link className="button button-outline-light" href="/admissions">
                Admissions guide
              </Link>
            </div>
            <div className="hero-note">
              <span className="hero-note-line"></span>
              <span>Learning with purpose. Growing together.</span>
            </div>
          </div>
          <a className="scroll-cue" href="#gateway" aria-label="Scroll to learn about LUNGICEST">
            <span></span>
          </a>
        </section>

        {/* UNIVERSITY GATEWAY SECTION (Replicating luct-sl.vercel.app gateway) */}
        <section id="gateway" className="py-8 bg-slate-100 border-b border-slate-200" aria-label="Quick university access">
          <div className="container">
            <div className="flex items-center justify-between pb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>The university gateway</span>
              <span className="text-[#142b46]">Find your next step &rarr;</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/apply"
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#142b46] shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-fuchsia-700 uppercase tracking-widest block mb-1">
                    Prospective students
                  </span>
                  <h2 className="text-lg font-black text-slate-900 group-hover:text-fuchsia-700 transition">
                    Become a student
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Explore admissions, access codes and start your online application form.
                  </p>
                </div>
                <div className="pt-4 text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>Start application</span>
                  <span className="text-fuchsia-700 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>

              <Link
                href="/apply/track"
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#142b46] shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">
                    Current applicants
                  </span>
                  <h2 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition">
                    Track an application
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Follow your real-time review, WAEC verification and admission letter with your reference.
                  </p>
                </div>
                <div className="pt-4 text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>Track progress</span>
                  <span className="text-amber-700 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>

              <Link
                href="/admissions"
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#142b46] shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-widest block mb-1">
                    Admissions process
                  </span>
                  <h2 className="text-lg font-black text-slate-900 group-hover:text-sky-700 transition">
                    Admissions guide
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Learn about entry requirements, banking payment details and intake timelines.
                  </p>
                </div>
                <div className="pt-4 text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>Read guide</span>
                  <span className="text-sky-700 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* INTRO / ABOUT SECTION */}
        <section className="intro-section section-pad" id="about">
          <div className="container intro-grid">
            <div className="intro-heading">
              <p className="eyebrow">
                <span></span> Welcome to LUNGICEST
              </p>
              <h2>
                A college rooted in community. <em>Focused on the future.</em>
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                Lungi College of Education Science &amp; Technology is committed to making relevant
                learning and practical skills part of a brighter future for local communities.
              </p>
              <p>
                We believe education can open doors—to further study, meaningful work and community
                progress. Our ambition is to help every learner discover what they can contribute.
              </p>
              <a className="text-link" href="#mission">
                Our purpose <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="container recognition-strip" aria-label="Affiliation and accreditation">
            <div>
              <span className="recognition-label">Academic affiliation</span>
              <strong>Affiliated with Milton Margai Technical University (MMTU)</strong>
              <span className="recognition-detail">Milton Margai Technical University</span>
            </div>
            <span className="recognition-divider" aria-hidden="true"></span>
            <div>
              <span className="recognition-label">Accreditation</span>
              <strong>Accredited by TEC &amp; NCTVA</strong>
              <span className="recognition-detail">
                Tertiary Education Commission · National Council for Technical, Vocational and Other
                Academic Awards
              </span>
            </div>
          </div>
        </section>

        {/* PURPOSE (VISION & MISSION) SECTION */}
        <section className="purpose-section section-pad" id="mission">
          <div className="container">
            <div className="purpose-heading">
              <p className="eyebrow">
                <span></span> Our purpose
              </p>
              <h2>
                Guided by a vision.
                <br />
                <em>Grounded in a mission.</em>
              </h2>
            </div>
            <div className="purpose-grid">
              <article className="purpose-card">
                <span className="purpose-kicker">Our vision</span>
                <span className="purpose-mark" aria-hidden="true">
                  01
                </span>
                <p>
                  LUNGICEST is a synergist to engage partners in bringing creative and innovative
                  educational solutions to individuals, employers, and communities to transform
                  challenges into opportunities.
                </p>
              </article>
              <article className="purpose-card purpose-card-highlight">
                <span className="purpose-kicker">Our mission</span>
                <span className="purpose-mark" aria-hidden="true">
                  02
                </span>
                <p>
                  Our mission is to provide relevant mainstream, technical, vocational education and
                  training to support students’ goals, a skilled work force and the economic
                  dynamics of our communities.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="values-section section-pad" id="why-lungicest">
          <div className="container">
            <div className="section-heading section-heading-centered">
              <p className="eyebrow eyebrow-light">
                <span></span> The LUNGICEST difference
              </p>
              <h2>
                Learning with a <em>lasting impact.</em>
              </h2>
              <p className="section-subtitle">
                A welcoming vision for education that responds to people, place and possibility.
              </p>
            </div>
            <div className="values-grid">
              <article className="value-card">
                <span className="value-number">01</span>
                <span className="value-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 27s-10-6.2-10-14a5.4 5.4 0 0 1 10-2.8A5.4 5.4 0 0 1 26 13c0 7.8-10 14-10 14Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M10 18h4l2-5 2 8 2-4h2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3>Community at heart</h3>
                <p>Learning shaped by local needs, shared ambition and the strength of community.</p>
              </article>

              <article className="value-card">
                <span className="value-number">02</span>
                <span className="value-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none">
                    <path
                      d="M5 12.5 16 6l11 6.5L16 19 5 12.5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 15v6c4.5 4 9.5 4 14 0v-6M27 13v8"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h3>Opportunity to learn</h3>
                <p>
                  Encouraging accessible education and continued growth for learners at every stage.
                </p>
              </article>

              <article className="value-card">
                <span className="value-number">03</span>
                <span className="value-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none">
                    <path
                      d="M7 26V9l9-4 9 4v17M11 26v-8h8v8M11 12h3m4 0h3m-10 4h3m4 0h3M4 26h24"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3>Skills for the future</h3>
                <p>Connecting learning with practical skills, career development and further study.</p>
              </article>

              <article className="value-card">
                <span className="value-number">04</span>
                <span className="value-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none">
                    <path
                      d="M25 7C14 7 8 12 8 19c0 3.3 2.5 5.5 5.5 5.5C21 24.5 25 17 25 7Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 27c3-7 8-11 15-15"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h3>A greener tomorrow</h3>
                <p>
                  Promoting care for the environment through the Clean and Green Environment (CAGE)
                  project.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ACADEMICS & TRAINING SECTION (ACCORDIONS AS IN NETLIFY SITE - NO FEES AMOUNT) */}
        <section className="academics-section section-pad" id="academics">
          <div className="container">
            <div className="catalogue-heading">
              <p className="eyebrow">
                <span></span> Academics &amp; training
              </p>
              <h2>
                Explore pathways to <em>what’s next.</em>
              </h2>
            </div>

            <div className="course-groups">
              {/* 01 Bachelor's degree */}
              <details className="course-group" open>
                <summary>
                  <span>
                    <span className="course-index">01</span>
                    <span className="course-title">Bachelor’s degree programmes</span>
                  </span>
                  <span className="course-toggle" aria-hidden="true"></span>
                </summary>
                <div className="course-content">
                  <div className="course-category">
                    <h3>Bachelor of Education (B.Ed.)</h3>
                    <ul>
                      <li>Early Childhood Education</li>
                      <li>Educational Administration and Management</li>
                      <li>Educational Guidance and Counselling</li>
                      <li>English</li>
                      <li>French</li>
                      <li>Measurement and Evaluation</li>
                      <li>Performing Arts</li>
                      <li>Physical Health Education</li>
                      <li>Religious Studies</li>
                      <li>Business Studies</li>
                      <li>Visual Arts (Fine and Applied Arts)</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Bachelor of Technology (B.Tech.)</h3>
                    <ul>
                      <li>Automobile Engineering</li>
                      <li>Building and Civil Engineering</li>
                      <li>Electrical and Electronics Engineering</li>
                      <li>Information Technology</li>
                      <li>Mechanical Engineering</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Bachelor of Science (B.Sc.) — science, computing and agriculture</h3>
                    <ul>
                      <li>Agricultural Education</li>
                      <li>Agricultural Science (General)</li>
                      <li>Biology</li>
                      <li>Chemistry</li>
                      <li>Community Development Studies/Agricultural Science</li>
                      <li>Community Development Studies/Home Science</li>
                      <li>Computer Science</li>
                      <li>Home Science</li>
                      <li>Laboratory Technology</li>
                      <li>Mathematics</li>
                      <li>Nutrition and Dietetics</li>
                      <li>Physics</li>
                      <li>Public Health</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Bachelor of Science (B.Sc.) — business and finance</h3>
                    <ul>
                      <li>Accounting and Finance</li>
                      <li>Banking and Finance</li>
                      <li>Business Administration — Human Resource Management</li>
                      <li>Business Administration — Marketing</li>
                      <li>Business Administration — Procurement and Logistics</li>
                      <li>Business Administration — Transportation Economics</li>
                      <li>Insurance</li>
                      <li>Secretarial Studies</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Hospitality and tourism</h3>
                    <ul>
                      <li>Hotel and Tourism</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Bachelor of Arts (B.A.)</h3>
                    <ul>
                      <li>International Relations</li>
                      <li>Public Administration</li>
                      <li>Peace and Conflict Studies</li>
                      <li>Population and Family Life Education</li>
                    </ul>
                  </div>
                </div>
              </details>

              {/* 02 National Diploma & Higher Diploma */}
              <details className="course-group">
                <summary>
                  <span>
                    <span className="course-index">02</span>
                    <span className="course-title">National Diploma &amp; Higher Diploma</span>
                  </span>
                  <span className="course-toggle" aria-hidden="true"></span>
                </summary>
                <div className="course-content">
                  <div className="course-category">
                    <h3>Business, finance and administration</h3>
                    <ul>
                      <li>Accounting and Finance</li>
                      <li>Banking and Finance</li>
                      <li>Business Administration</li>
                      <li>Co-operative and Rural Development Studies</li>
                      <li>Human Resource Management</li>
                      <li>Insurance</li>
                      <li>Marketing</li>
                      <li>Procurement and Logistics</li>
                      <li>Secretarial Studies</li>
                      <li>Transportation Economics</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Engineering, construction and surveying</h3>
                    <ul>
                      <li>Architectural Technology</li>
                      <li>Automobile Engineering</li>
                      <li>Building and Civil Engineering</li>
                      <li>Building Engineering</li>
                      <li>Electrical and Electronics Engineering</li>
                      <li>Mechanical Engineering</li>
                      <li>Marine Engineering</li>
                      <li>Mining Engineering</li>
                      <li>Petroleum Engineering</li>
                      <li>Photographic Engineering</li>
                      <li>Quantity Surveying</li>
                      <li>Surveying</li>
                      <li>Geographical Information System (GIS)</li>
                      <li>General Photography</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Education, humanities and social sciences</h3>
                    <ul>
                      <li>Civic Education</li>
                      <li>Cultural Studies</li>
                      <li>Education</li>
                      <li>French</li>
                      <li>Performing Arts (Music and Theatre Arts)</li>
                      <li>Religious Studies</li>
                      <li>RH/HIV/AIDS Counselling</li>
                      <li>Sports Coaching and Management</li>
                      <li>Visual Arts (Fine and Applied Arts)</li>
                      <li>International Relations</li>
                      <li>Peace and Conflict Studies</li>
                      <li>Population and Family Life Education</li>
                      <li>Social Work</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Agriculture, health and applied sciences</h3>
                    <ul>
                      <li>Agricultural/Fish Farming</li>
                      <li>Animal Production and Health</li>
                      <li>Community Development Studies/Agricultural Science</li>
                      <li>Community Development Studies/Health</li>
                      <li>Diagnostic Laboratory Technology</li>
                      <li>Interior Decoration and Designing</li>
                      <li>Laboratory Technology</li>
                      <li>National Diploma in Computer Science</li>
                      <li>Public Health</li>
                      <li>Veterinary Technology</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Hospitality and tourism</h3>
                    <ul>
                      <li>Food and Beverage Production Services</li>
                      <li>Front Office and Housekeeping</li>
                      <li>Hospitality Innovation/Hotel Management</li>
                      <li>Hotel and Catering Management</li>
                      <li>Tourism Management</li>
                    </ul>
                  </div>
                  <p className="course-footnote">
                    MMTU uses “Higher Diploma” and “Higher National Diploma” inconsistently across
                    programme information. Confirm the exact award title before applying.
                  </p>
                </div>
              </details>

              {/* 03 Certificates & NTC */}
              <details className="course-group">
                <summary>
                  <span>
                    <span className="course-index">03</span>
                    <span className="course-title">
                      Certificates, National Technician Certificates &amp; vocational courses
                    </span>
                  </span>
                  <span className="course-toggle" aria-hidden="true"></span>
                </summary>
                <div className="course-content">
                  <div className="course-category">
                    <h3>Business</h3>
                    <ul>
                      <li>Business Studies</li>
                      <li>Co-operative and Rural Development Studies</li>
                      <li>Secretarial Studies</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Arts and humanities</h3>
                    <ul>
                      <li>Arts and Crafts</li>
                      <li>French</li>
                      <li>Performing Arts</li>
                      <li>Religious Studies</li>
                      <li>Visual Arts</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Education</h3>
                    <ul>
                      <li>Early Childhood Education</li>
                      <li>Teacher Certificate French</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Technical trades</h3>
                    <ul>
                      <li>Electrical Installation</li>
                      <li>Masonry</li>
                      <li>Metal Work and Welding</li>
                      <li>Plumbing</li>
                      <li>Refrigeration and Air Conditioning</li>
                      <li>Solar Electrification</li>
                      <li>Tiling</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Computing, geography and engineering</h3>
                    <ul>
                      <li>Geographical Information System (GIS)</li>
                      <li>Petroleum Engineering</li>
                    </ul>
                  </div>

                  <div className="course-category">
                    <h3>Health, agriculture and other professional areas</h3>
                    <ul>
                      <li>Animal Production and Health</li>
                      <li>Public Health</li>
                      <li>Veterinary Technology</li>
                      <li>Statistics</li>
                      <li>Tailoring and Dressmaking</li>
                      <li>Population and Family Life Education</li>
                      <li>Sports Coaching and Management</li>
                      <li>RH/HIV/AIDS Counselling</li>
                    </ul>
                  </div>
                </div>
              </details>

              {/* 04 Teacher Training: HTC & TC */}
              <details className="course-group">
                <summary>
                  <span>
                    <span className="course-index">04</span>
                    <span className="course-title">Teacher training: HTC &amp; TC</span>
                  </span>
                  <span className="course-toggle" aria-hidden="true"></span>
                </summary>
                <div className="course-content">
                  <div className="course-category course-category-wide">
                    <h3>Higher Teachers Certificate (HTC) subject combinations</h3>
                    <ul>
                      <li>Business and Management Studies</li>
                      <li>Secretarial Studies</li>
                      <li>Early Childhood Education</li>
                      <li>English/Indigenous Language</li>
                      <li>English/French</li>
                      <li>English/Religious and Moral Education</li>
                      <li>French/Arabic</li>
                      <li>French/English</li>
                      <li>French/Indigenous Language</li>
                      <li>French/Religious and Moral Education</li>
                      <li>Performing Arts</li>
                      <li>Physical Health Education</li>
                      <li>Religious and Moral Education/French</li>
                      <li>Religious and Moral Education/Arabic</li>
                      <li>Visual Arts (Fine and Applied Arts)</li>
                      <li>Technical Studies</li>
                      <li>Agricultural Science</li>
                      <li>Home Science</li>
                      <li>Integrated Science</li>
                      <li>Mathematics and Computer Science</li>
                      <li>Social Studies — Economics</li>
                      <li>Social Studies — Geography</li>
                      <li>Social Studies — Government</li>
                      <li>Social Studies — History</li>
                    </ul>
                  </div>
                  <div className="course-category">
                    <h3>Teachers Certificate (TC)</h3>
                    <p>
                      Published options include French, Performing Arts, Sports Coaching and
                      Management, and Tailoring and Dressmaking.
                    </p>
                  </div>
                  <p className="course-footnote">
                    Check the official programme information for the qualification attached to each
                    course and available study mode.
                  </p>
                </div>
              </details>

              {/* 05 Short Vocational Initiatives */}
              <details className="course-group">
                <summary>
                  <span>
                    <span className="course-index">05</span>
                    <span className="course-title">
                      Short vocational &amp; skills-training initiatives
                    </span>
                  </span>
                  <span className="course-toggle" aria-hidden="true"></span>
                </summary>
                <div className="course-content">
                  <div className="course-category course-category-wide">
                    <h3>Training areas reported in a youth empowerment initiative</h3>
                    <ul>
                      <li>Cybersecurity and coding</li>
                      <li>Plumbing and carpentry</li>
                      <li>Agriculture and animal husbandry</li>
                      <li>Automobile engineering</li>
                      <li>Hairdressing</li>
                      <li>Cooling and refrigeration systems</li>
                      <li>Soap making</li>
                      <li>Baking and confectionery</li>
                      <li>Climate change adaptation</li>
                    </ul>
                    <p>
                      These areas were reported as part of an initiative with Sierra Leone’s
                      Ministry of Youth Affairs. They are not necessarily regular MMTU programmes or
                      currently open courses.
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* COMMUNITY SECTION */}
        <section className="community-section" id="community">
          <div
            className="community-image"
            role="img"
            aria-label="LUNGICEST graduates gathered at an outdoor ceremony"
          ></div>
          <div className="community-copy">
            <p className="eyebrow eyebrow-light">
              <span></span> Rooted in our community
            </p>
            <h2>
              Better futures grow <em>together.</em>
            </h2>
            <p>
              Education is strongest when everyone can take part. LUNGICEST aspires to champion
              inclusion, encourage women's participation and build partnerships that help
              communities thrive.
            </p>
            <a className="button button-outline-light" href="#contact">
              Connect with us <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* MEDIA / PICTURES & VIDEOS SECTION */}
        <section className="media-section section-pad" id="media">
          <div className="container">
            <div className="media-heading">
              <p className="eyebrow">
                <span></span> LUNGICEST in pictures
              </p>
              <h2>
                Our college. <em>Our community.</em>
              </h2>
              <p>Moments from LUNGICEST events, gatherings and graduation celebrations.</p>
            </div>

            <div className="photo-grid">
              <figure className="photo-card photo-card-featured">
                <img
                  src="/images/IMG-20261026-WA0017.jpg"
                  alt="LUNGICEST graduates and guests gathered at an outdoor ceremony"
                  loading="lazy"
                />
                <figcaption>Graduation celebration</figcaption>
              </figure>

              <figure className="photo-card">
                <img
                  src="/images/IMG-20261026-WA0005.jpg"
                  alt="Community members seated together at a LUNGICEST event"
                  loading="lazy"
                />
                <figcaption>Community gathering</figcaption>
              </figure>

              <figure className="photo-card">
                <img
                  src="/images/IMG-20261026-WA0013.jpg"
                  alt="Graduates and attendees at a college ceremony"
                  loading="lazy"
                />
                <figcaption>College ceremony</figcaption>
              </figure>

              <figure className="photo-card">
                <img
                  src="/images/IMG-20261026-WA0016.jpg"
                  alt="College attendees seated together along a campus building"
                  loading="lazy"
                />
                <figcaption>College gathering</figcaption>
              </figure>
            </div>

            <div className="video-heading">
              <p className="eyebrow">
                <span></span> Watch
              </p>
              <h3>LUNGICEST on video</h3>
            </div>

            <div className="video-grid">
              <article className="video-card">
                <video controls preload="none" playsInline poster="/images/IMG-20261026-WA0017.jpg">
                  <source src="/video/VID-20261026-WA0011.mp4" type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
                <h4>College video 1</h4>
              </article>

              <article className="video-card">
                <video controls preload="none" playsInline poster="/images/IMG-20261026-WA0013.jpg">
                  <source src="/video/VID-20261026-WA0019.mp4" type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
                <h4>College video 2</h4>
              </article>
            </div>
          </div>
        </section>

        {/* ADMISSIONS & CONTACT SECTION */}
        <section className="admissions-section section-pad" id="contact">
          <div className="container contact-panel">
            <div className="contact-copy">
              <p className="eyebrow">
                <span></span> Admissions &amp; registration
              </p>
              <h2>
                Start your <em>learning journey.</em>
              </h2>
              <p>
                Contact LUNGICEST on WhatsApp for registration information and admissions enquiries.
              </p>
            </div>

            <a
              className="whatsapp-icon-link"
              href="https://wa.me/23277528393?text=Hello%20LUNGICEST%2C%20I%20would%20like%20to%20enquire%20about%20registration."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register or contact LUNGICEST on WhatsApp at 077528393"
              title="Contact LUNGICEST on WhatsApp"
            >
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <path d="M16.04 3C8.88 3 3.05 8.82 3.05 15.98c0 2.29.6 4.53 1.75 6.51L3 29l6.68-1.75a12.94 12.94 0 0 0 6.35 1.66h.01c7.15 0 12.98-5.82 12.98-12.98A12.9 12.9 0 0 0 25.2 6.75 12.9 12.9 0 0 0 16.04 3Zm0 23.7h-.01a10.74 10.74 0 0 1-5.47-1.5l-.39-.23-3.96 1.04 1.06-3.86-.25-.4a10.7 10.7 0 0 1-1.64-5.77c0-5.9 4.8-10.7 10.7-10.7 2.86 0 5.55 1.12 7.57 3.14a10.63 10.63 0 0 1 3.13 7.57c0 5.9-4.8 10.7-10.69 10.7Zm5.87-8.01c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.22-.38.24-.7.08-.33-.16-1.38-.51-2.63-1.63-.97-.86-1.63-1.92-1.82-2.25-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.22-.33.32-.54.1-.22.05-.41-.02-.57-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.54-.73-.55h-.62c-.22 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.68 0 1.59 1.16 3.12 1.32 3.34.16.22 2.28 3.48 5.52 4.88.77.33 1.38.53 1.85.68.78.25 1.49.22 2.05.13.63-.1 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.62-.38Z" />
              </svg>
            </a>
          </div>

          {/* ONLINE REGISTRY APPLICATION ACCESS STRIP */}
          <div
            className="container"
            style={{
              marginTop: '48px',
              padding: '24px 28px',
              border: '1px solid #e5e9ed',
              borderRadius: '6px',
              background: '#f4f6f8',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              <strong
                style={{
                  display: 'block',
                  color: '#142b46',
                  fontSize: '14px',
                  fontWeight: 700,
                  fontFamily: 'var(--display)'
                }}
              >
                Online Admissions &amp; Student Registry Gateway
              </strong>
              <span style={{ fontSize: '12px', color: '#667383' }}>
                Complete your application form, validate payment voucher codes, and access academic
                records.
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <Link
                href="/student/apply"
                className="button button-small button-gold"
                style={{ minHeight: '38px', paddingInline: '16px' }}
              >
                Apply Online
              </Link>
              <Link
                href="/student/tracking"
                className="button button-small"
                style={{
                  minHeight: '38px',
                  paddingInline: '16px',
                  borderColor: '#142b46',
                  color: '#142b46'
                }}
              >
                Track Status
              </Link>
              <Link
                href="/login"
                className="button button-small button-navy"
                style={{ minHeight: '38px', paddingInline: '16px' }}
              >
                Staff / Student Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SITE FOOTER                                                              */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand brand-footer" href="#home" aria-label="LUNGICEST home">
            <img className="brand-mark" src="/images/LOGO.png" alt="LUNGICEST Logo" />
            <span className="brand-copy">
              <strong>LUNGICEST</strong>
              <span>
                Lungi College of Education
                <br />
                Science &amp; Technology
              </span>
            </span>
          </a>
          <p>Empowering communities through education, science &amp; technology.</p>
          <a className="footer-top" href="#home">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
        <div className="container footer-bottom">
          <span>© {currentYear} LUNGICEST</span>
          <span>Learning with purpose. Growing together.</span>
        </div>
      </footer>
    </>
  );
}
