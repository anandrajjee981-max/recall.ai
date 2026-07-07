import React from 'react';
 import '../../style/analiytics.css';

//  rishikesh
const App = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          </div>
          <span className="logo-text">RECALL.AI</span>
        </div>
        <div className="header-right">
          <span className="secure-channel">SECURE_CHANNEL_v4.2</span>
          <div className="user-avatar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="status-indicator">
          <span className="status-dot"></span> SYSTEM_STATUS: OPTIMIZED
        </div>
        <h1 className="page-title">Analytics</h1>

        {/* Top Grid Area (From previous view) */}
        <div className="metrics-grid">
          <div className="card accuracy-card">
            <div className="donut-container">
              <div className="donut-chart">
                <div className="donut-inner">
                  <span className="donut-value">95%</span>
                  <span className="donut-label">ACCURACY</span>
                </div>
              </div>
            </div>
            <div className="accuracy-details">
              <h2>Recall Accuracy</h2>
              <p>Your AI model is currently performing at peak efficiency, successfully retrieving 95% of requested context fragments across all connected nodes.</p>
              <div className="badges">
                <span className="badge badge-green">
                  <span className="dot dot-green"></span> +2.4% THIS WEEK
                </span>
                <span className="badge badge-purple">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg> REAL-TIME SYNC
                </span>
              </div>
            </div>
          </div>

          <div className="side-stats">
            <div className="card small-card">
              <div className="card-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div className="stat-label">AUTO-SORTED ITEMS</div>
              <div className="stat-value">142 Items</div>
              <div className="progress-bar-container">
                <div className="progress-bar white-bar" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="card small-card">
              <div className="card-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#90ff00" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div className="stat-label">SYNC RELIABILITY</div>
              <div className="stat-value">98% Accuracy</div>
              <div className="progress-bar-container">
                <div className="progress-bar green-bar" style={{ width: '98%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Source Distribution Card */}
        <div className="card source-card">
          <div className="source-header">
            <div>
              <h2>Source Distribution</h2>
              <div className="source-subtitle">GROWTH METRICS / 7 DAYS</div>
            </div>
            <div className="legend">
              <span className="legend-item"><span className="dot dot-purple"></span> INSTAGRAM</span>
              <span className="legend-item"><span className="dot dot-gray"></span> AMAZON</span>
              <span className="legend-item"><span className="dot dot-green"></span> TWITTER</span>
            </div>
          </div>
          
          <div className="chart-layout">
            <div className="bar-chart-container">
              {[
                { h: '35%', c: 'purple' }, { h: '25%', c: 'gray' }, { h: '45%', c: 'green' }, // MON
                { h: '30%', c: 'purple' }, { h: '25%', c: 'gray' }, { h: '40%', c: 'green' }, // TUE
                { h: '50%', c: 'purple' }, { h: '30%', c: 'gray' }, { h: '35%', c: 'green' }, // WED
                { h: '40%', c: 'purple' }, { h: '45%', c: 'gray' }, { h: '25%', c: 'green' }, // THU
                { h: '60%', c: 'purple' }, { h: '35%', c: 'gray' }, { h: '30%', c: 'green' }, // FRI
                { h: '45%', c: 'purple' }, { h: '55%', c: 'gray' }, { h: '40%', c: 'green' }, // SAT
                { h: '70%', c: 'purple' }, { h: '65%', c: 'gray' }, { h: '50%', c: 'green' }  // SUN
              ].map((bar, index) => (
                <div key={index} className={`bar bar-${bar.c}`} style={{ height: bar.h }}></div>
              ))}
            </div>
            <div className="x-axis">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Grid */}
        <div className="bottom-metrics-grid">
          {/* Latent Analysis */}
          <div className="card latent-card">
            <div className="latent-header">
              <h2>Latent Analysis</h2>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d8b4fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            </div>
            <div className="latent-list">
              <div className="latent-row">
                <span className="latent-label">Neural Hash Speed</span>
                <span className="latent-value text-green">14ms</span>
              </div>
              <div className="latent-row">
                <span className="latent-label">Context Compression</span>
                <span className="latent-value">0.4x</span>
              </div>
              <div className="latent-row">
                <span className="latent-label">Active Nodes</span>
                <span className="latent-value">1,024</span>
              </div>
            </div>
          </div>

          {/* Global Sync */}
          <div className="card sync-card">
            <div className="sync-bg-icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="18" r="3"></circle><line x1="8.12" y1="8.12" x2="9.88" y2="9.88"></line><line x1="14.12" y1="9.88" x2="15.88" y2="8.12"></line><line x1="8.12" y1="15.88" x2="9.88" y2="14.12"></line><line x1="14.12" y1="14.12" x2="15.88" y2="15.88"></line></svg>
            </div>
            <div className="sync-content">
              <div>
                <h2>Global Sync</h2>
                <div className="source-subtitle">NETWORK_TOPOLOGY</div>
              </div>
              
              <div className="sync-footer">
                <div className="overlap-circles">
                  <div className="circle circle-purple"></div>
                  <div className="circle circle-dark"></div>
                  <div className="circle circle-green"></div>
                </div>
                <span className="sync-status">8 REGIONS ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        </button>
        <button className="nav-btn active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
        </button>
        <button className="nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        </button>
        <button className="nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </nav>
    </div>
  );
};

export default App;