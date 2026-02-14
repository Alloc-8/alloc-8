import { useState, useEffect, useRef } from 'react';
import './App.css';
import cyberPandaLogo from '../cyber-panda-consulting-logo.png';
import alloc8Logo from '../logo.png';

export default function App() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentSystem, setCurrentSystem] = useState('');
  const [challenges, setChallenges] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayHiding, setOverlayHiding] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const rotatingWords = ['care', 'allocation', 'precision', 'coordination', 'visibility'];
  const shapesRef = useRef<HTMLDivElement>(null);

  // Page metadata
  useEffect(() => {
    document.title = 'Alloc-8 | Clinical Placement Management Software for Universities';
  }, []);

  // Cycle through rotating words every 1s
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Parallax effect on background shapes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapesRef.current) return;
      const shapes = shapesRef.current.querySelectorAll('.shape');
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      shapes.forEach((shape, i) => {
        const factor = (i + 1) * 0.5;
        (shape as HTMLElement).style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          emailAddress: email,
          featuresMatterMost: feedback,
          currentPlacementSystem: currentSystem,
          mainChallenges: challenges,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error('Submission failed');
      }

      setShowOverlay(true);

      setTimeout(() => {
        setOverlayHiding(true);
      }, 2500);

      setTimeout(() => {
        setShowOverlay(false);
        setOverlayHiding(false);
        setEmail('');
        setFeedback('');
        setCurrentSystem('');
        setChallenges('');
      }, 3000);
    } catch {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-shapes" ref={shapesRef}>
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <div className="deco-line deco-line-v left" />
      <div className="deco-line deco-line-v right" />

      <div className="page-container">
        <header role="banner">
          <nav aria-label="Main navigation">
            <a href="/" className="logo" aria-label="Alloc-8 — Clinical Placement Management">
              <img src={alloc8Logo} alt="Alloc-8 logo — clinical placement management software for universities" className="logo-img" width="52" height="52" />
              <span className="logo-text">Alloc-8</span>
            </a>
          </nav>
          <span className="header-tag" aria-label="Launch timeline">Coming 2026</span>
        </header>

        <main role="main">
          <div className="content">
            <p className="eyebrow">Clinical Placement Management for Universities</p>

            <div className="hero-split">
              <section className="hero-left" aria-labelledby="hero-heading">
                <h1 id="hero-heading">A smart placements solution is <em>coming...</em></h1>

                <p className="subtitle">
                  A smarter way to manage clinical placements. Streamlined student allocation,
                  seamless coordination, and complete visibility — built for university healthcare education programs.
                </p>
              </section>

              <section className="hero-right" aria-label="Join waitlist">
                <div className="form-wrapper">
                  <form id="waitlist-form" onSubmit={handleSubmit} aria-label="Waitlist signup form">
                    <div className="email-row">
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your university email address"
                          required
                          autoComplete="email"
                          aria-label="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <button type="submit">Submit</button>
                    </div>

                    <div className="extra-fields expanded">
                      <div className="extra-fields-inner">
                        <div className="field-group">
                          <label htmlFor="feedback">What features would matter most to your university?</label>
                          <textarea
                            id="feedback"
                            placeholder="e.g., automated student allocation, multi-site scheduling..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div className="field-group">
                          <label htmlFor="currentSystem">What is your current placement system?</label>
                          <input
                            id="currentSystem"
                            type="text"
                            placeholder="e.g., manual spreadsheets, InPlace, existing software..."
                            value={currentSystem}
                            onChange={(e) => setCurrentSystem(e.target.value)}
                          />
                        </div>
                        <div className="field-group">
                          <label htmlFor="challenges">What are the main challenges you face?</label>
                          <textarea
                            id="challenges"
                            placeholder="e.g., managing multiple cohorts, compliance tracking, last-minute changes..."
                            value={challenges}
                            onChange={(e) => setChallenges(e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  <p className="form-note">Be the first to know when we launch. No spam, ever.</p>
                </div>
              </section>
            </div>

            <section className="features" aria-label="Key features">
              <h2 className="sr-only">Platform features for university placement management</h2>
              <div className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <span>Student Management</span>
              </div>
              <div className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <span>Smart Scheduling</span>
              </div>
              <div className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <span>Compliance Tracking</span>
              </div>
            </section>
          </div>
        </main>

        <footer role="contentinfo">
          <div className="footer-left">© 2026 Alloc-8. All rights reserved.</div>
          <div className="footer-credit">
            <span>Made with</span>
            <span className="toggle-word-wrapper">
              {rotatingWords.map((word, i) => (
                <span
                  key={word}
                  className={`toggle-word ${i === wordIndex ? 'show' : 'hide'}`}
                >
                  ❉ {word}
                </span>
              ))}
            </span>
            <span>by</span>
            <a href="https://cyber-panda.co.uk" target="_blank" rel="noopener noreferrer" className="credit-link">
              <img src={cyberPandaLogo} alt="Cyber Panda Consulting" className="credit-logo" />
              <span>Cyber Panda Consulting</span>
            </a>
          </div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </footer>
      </div>

      {showOverlay && (
        <div className={`success-overlay ${overlayHiding ? 'hiding' : ''}`}>
          <div className="success-card">
            <div className="success-checkmark">
              <svg viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="25" fill="none" />
                <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h2>Thank You!</h2>
            <p>You&apos;re on the list. We&apos;ll keep you updated on our progress.</p>
          </div>
        </div>
      )}
    </>
  );
}
