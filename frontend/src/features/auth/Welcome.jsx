import React from 'react';
import '../../style/welcome.css';
import { 
  Play, 
  Layers, 
  FolderKanban, 
  Layout, 
  Globe, 
  Radio, 
  Link2, 
  ShoppingCart, 
  Fingerprint 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate()

  return (
    <div className="landing-container">
      {/* Top Navbar */}
      <header className="header">
        <div className="logo">
          <Fingerprint size={24} style={{ color: 'var(--primary)' }} /> Recall.ai
        </div>
        <button onClick={()=>{
            navigate('/login')
        }}    className="btn-login">Login</button>
      </header>

      {/* Hero Header */}
      <section className="hero">
        <div className="badge">● v2.0 Beta Now Live</div>
        <h1>Your Mind, <span>Auto-Organized.</span></h1>
        <p className="hero-subtitle">
          The AI-powered hub that builds libraries from your habits. Stop searching, start recalling. Everything you find, automatically categorized.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Join the Future</button>
          <button className="btn-secondary">
            <Play size={16} fill="currentColor" /> Watch Demo
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid">
        {/* Card 1 */}
        <div className="feature-card">
          <div>
            <Layers className="feature-icon" size={28} />
            <h3>Auto-Fetch</h3>
            <p>Seamless integration with Instagram, Amazon, and Twitter. Every like, every order, every bookmark is instantly ingested into your private vault.</p>
          </div>
          <div className="tag-row">
            <span className="tag">Instagram</span>
            <span className="tag">Amazon</span>
            <span className="tag">Twitter</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="feature-card">
          <div>
            <FolderKanban className="feature-icon" size={28} />
            <h3>Instant Libraries</h3>
            <p>Our LLMs curate your chaos. AI-created categories that adapt as your interests evolve.</p>
          </div>
          <div className="progress-container">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill"></div>
            </div>
            <div className="progress-labels">
              <span className="progress-left">CATEGORIZING HABITS...</span>
              <span className="progress-right">68% COMPLETE</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="feature-card">
          <div>
            <Layout className="feature-icon" size={28} />
            <h3>Dynamic UI</h3>
            <p>A personalized layout that prioritizes what matters most today. Morphing components for your unique workflow.</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="feature-card">
          <div>
            <Globe className="feature-icon" size={28} />
            <h3>Global Recall Mesh</h3>
            <p>Your data is synced across nodes worldwide, ensuring 5ms latency.</p>
          </div>
        </div>
      </section>

      {/* Live AI Engine Feed */}
      <section className="feed-section">
        <h2 className="feed-title">The Live AI Engine Feed</h2>
        <p className="feed-subtitle">Watch Recall process your digital footprints in real-time.</p>
        
        <div className="feed-box">
          <div className="feed-status">
            <Radio size={16} />
            ENGINE_STATUS: ACTIVE
            <span className="feed-status-dot"></span>
          </div>
          <div className="feed-logs">
            <div className="feed-item">
              <div className="feed-item-header">
                <Link2 size={16} style={{ color: 'var(--primary)' }} /> Found link from Instagram: "Minimalist Architecture Trends 2026"
              </div>
              <div className="feed-item-sub">↳ Mapping to Library: [Design & Spaces]</div>
            </div>

            <div className="feed-item">
              <div className="feed-item-header">
                <ShoppingCart size={16} style={{ color: 'var(--primary)' }} /> Detected Amazon Purchase: "Mechanical Keyboard Kit - GMMK Pro"
              </div>
              <div className="feed-item-sub">↳ Mapping to Library: [Tech Setup]</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Partners */}
      <section className="social-proof">
        <p>TRUSTED BY 10K+ EARLY ADOPTERS</p>
        <div className="logo-grid">
          <div className="proof-logo">TECH_NO</div>
          <div className="proof-logo">SYNERGY</div>
          <div className="proof-logo">QUBIT</div>
          <div className="proof-logo">VOID.</div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="cta-footer">
        <h2>Own your data.<br />Own your mind.</h2>
        <div className="input-container">
          <input type="text" placeholder="Reserve your username" className="cta-input" />
          <button className="btn-tertiary">Claim your ID</button>
        </div>
        <p className="cta-note">Limited alpha slots available. Join now.</p>
        
        <div className="footer-links">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Docs</span>
          <span>Status</span>
        </div>
      </footer>
    </div>
  );
}