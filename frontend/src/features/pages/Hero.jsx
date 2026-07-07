import React from 'react';
 import '../../style/hero.css';

// SVG Icons
const Icons = {
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16M4 6h16M4 18h16"/></svg>,
  Clapperboard: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 4v16H4V4h16zM4 8h16M4 12h16M4 16h16M8 4v16"/></svg>,
  Code: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Cart: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  ShoppingBag: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  Grid: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Chart: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>,
  Folder: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Settings: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
};

const App = () => {
  return (
    <div className="app-layout">
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="icon-btn"><Icons.Menu /></button>
            <h1 className="logo-text">RECALL.AI</h1>
          </div>
          <div className="avatar"></div>
        </header>

        {/* Live Feed Banner */}
        <div className="live-feed">
          <div className="feed-header">
            <span className="dot pulse"></span>
            <span className="feed-title">LIVE_ENGINE_FEED</span>
          </div>
          <div className="feed-text-container">
            <p className="feed-text">
              <span className="dim-text">Insights updated_ &nbsp;||&nbsp; Found YouTube Tutorial → Added to 'Skills'_ &nbsp;||&nbsp; Summarizing 4 Tweets → Twitter Insights updated_ &nbsp;||&nbsp; New PDF detected → AI...</span>
            </p>
          </div>
        </div>

        {/* Libraries Section */}
        <section className="section">
          <div className="section-header">
            <div>
              <h2>Your Libraries</h2>
              <p className="subtitle">AI organized knowledge</p>
            </div>
            <button className="view-all">VIEW ALL</button>
          </div>

          <div className="grid-container">
            {/* Card 1 - Full Width */}
            <div className="card full-width">
              <div className="card-top">
                <div className="icon-box"><Icons.Clapperboard /></div>
                <span className="badge badge-purple">CREATED BY AI 2M AGO</span>
              </div>
              <h3 className="card-title">Late Night Reels</h3>
              <p className="card-meta">42 items • Instagram</p>
            </div>

            {/* Card 2 - Half Width */}
            <div className="card">
              <div className="card-top">
                <div className="icon-box icon-tertiary"><Icons.Code /></div>
              </div>
              <h3 className="card-title">Coding Repos</h3>
              <p className="card-meta">12 items • Synced 5m ago</p>
            </div>

            {/* Card 3 - Half Width */}
            <div className="card">
              <div className="card-top">
                <div className="icon-box icon-cyan"><Icons.Cart /></div>
                <span className="badge badge-cyan">NEW</span>
              </div>
              <h3 className="card-title">Sneaker Drops</h3>
              <p className="card-meta">8 items • New entry</p>
            </div>

            {/* Card 4 - Full Width */}
            <div className="card full-width">
              <div className="card-top">
                <div className="icon-box icon-purple"><Icons.ShoppingBag /></div>
                <span className="badge badge-dot">
                  <span className="dot small-dot"></span> JUST CREATED
                </span>
              </div>
              <h3 className="card-title">Tech Setup</h3>
              <p className="card-meta">3 items • Amazon Marketplace</p>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="section insights-section">
          <h3 className="insights-title">PLATFORM INSIGHTS</h3>
          <div className="charts-container">
            <div className="chart-item">
              <div className="circular-chart chart-purple" style={{"--percentage": "40%"}}>
                <div className="inner-circle">40%</div>
              </div>
              <span className="chart-label">INSTAGRAM</span>
            </div>
            
            <div className="chart-item">
              <div className="circular-chart chart-cyan" style={{"--percentage": "30%"}}>
                <div className="inner-circle">30%</div>
              </div>
              <span className="chart-label">AMAZON</span>
            </div>
            
            <div className="chart-item">
              <div className="circular-chart chart-tertiary" style={{"--percentage": "30%"}}>
                <div className="inner-circle">30%</div>
              </div>
              <span className="chart-label">TWITTER</span>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-inner">
          <div className="nav-item active">
            <Icons.Grid />
            <div className="glow-effect"></div>
          </div>
          <div className="nav-item"><Icons.Chart /></div>
          <div className="nav-item"><Icons.Folder /></div>
          <div className="nav-item"><Icons.Settings /></div>
        </div>
      </nav>
    </div>
  );
};

export default App;