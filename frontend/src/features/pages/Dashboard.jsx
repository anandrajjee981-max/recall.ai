import React from 'react';
 import '../../style/dashboard.css';

const Dashboard = () => {
  return (
    <div className="recall-dashboard">
      {/* Fixed Header */}
      <header className="header">
        <div className="logo-area">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
            <polyline points="14 2 14 8 20 8" />
            <path d="m3 15 2 2 4-4" />
          </svg>
          <h1>RECALL.AI</h1>
        </div>
        <div className="profile-area">
          <div className="avatar"></div>
        </div>
      </header>

      {/* Scrollable Main Content Area */}
      <main className="main-content">
        {/* Search Bar Area */}
        <div className="search-section">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="QUERY LIBRARIES..." className="search-input" />
          </div>
          <button className="filter-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </button>
        </div>

        {/* Main Grid Content */}
        <div className="grid-container">
          {/* Card 1: Web3 */}
          <div className="card">
            <div className="card-header">
              <div className="icon-box web3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </div>
              <span className="badge active">ACTIVE</span>
            </div>
            <div className="card-body">
              <h2>Web3 Dev Tools</h2>
              <p>Curated smart contract snippets and dApp architecture patterns.</p>
            </div>
            <div className="card-footer">
              <div className="stat">
                <span className="stat-label">ITEMS</span>
                <span className="stat-value">1,248</span>
              </div>
              <div className="stat text-right">
                <span className="stat-label">SYNCED</span>
                <span className="stat-value">2m ago</span>
              </div>
            </div>
          </div>

          {/* Card 2: Summer Fits */}
          <div className="card">
            <div className="card-header">
              <div className="icon-box summer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.38 3.46L16 2a8.5 8.5 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
                </svg>
              </div>
            </div>
            <div className="card-body">
              <h2>Summer Fits</h2>
              <p>Aesthetic visual moodboards for minimalist street fashion.</p>
            </div>
            <div className="card-footer">
              <div className="stat">
                <span className="stat-label">ITEMS</span>
                <span className="stat-value">342</span>
              </div>
              <div className="stat text-right">
                <span className="stat-label">SYNCED</span>
                <span className="stat-value">14h ago</span>
              </div>
            </div>
          </div>

          {/* Card 3: AI Research (Large Span) */}
          <div className="card large-card">
            <div className="large-card-content">
              <div className="icon-box ai">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 3H15M10 9H14M12 3V13M7 21L10.67 13.66C10.88 13.25 11 12.78 11 12.3V3M17 21L13.33 13.66C13.12 13.25 13 12.78 13 12.3V3"></path>
                  <path d="M7 21C6.27 21 5.76 20.26 6.07 19.6L7 18M17 21C17.73 21 18.24 20.26 17.93 19.6L17 18"></path>
                  <path d="M4 21H20"></path>
                </svg>
              </div>
              <div className="card-body">
                <h2>AI Research</h2>
                <p>Deep-learning paper summaries, LLM benchmark tracking, and neural architecture diagrams collected from global repositories.</p>
              </div>
            </div>
            <div className="card-footer large-footer">
              <div className="stat">
                <span className="stat-label">TOTAL ENTRIES</span>
                <span className="stat-value large-value">4,892</span>
              </div>
              <div className="stat">
                <span className="stat-label">LATEST SYNC</span>
                <span className="stat-value large-value">05:12 AM</span>
              </div>
            </div>
            {/* Faint background chip icon */}
            <div className="bg-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
          </div>

          {/* Card 4: Workout Inspo */}
          <div className="card">
            <div className="card-header">
              <div className="icon-box workout">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6.5 6.5l11 11M3 3l3.5 3.5M21 21l-3.5-3.5M4 14l6 6M14 4l6 6M7 17l-3-3M17 7l3 3M10 20l-3-3M20 10l-3-3"></path>
                </svg>
              </div>
            </div>
            <div className="card-body">
              <h2>Workout Inspo</h2>
              <p>High-intensity interval training routines and metabolic health data.</p>
            </div>
            <div className="card-footer">
              <div className="stat">
                <span className="stat-label">ITEMS</span>
                <span className="stat-value">156</span>
              </div>
              <div className="stat text-right">
                <span className="stat-label">SYNCED</span>
                <span className="stat-value">Yesterday</span>
              </div>
            </div>
          </div>

          {/* Card 5: Add New */}
          <div className="card add-new-card">
            <div className="add-content">
              <div className="plus-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <span>INITIATE NEW LIBRARY</span>
            </div>
          </div>
          
          {/* Duplicate cards added here to demonstrate scrolling behavior */}
          <div className="card">
            <div className="card-header">
              <div className="icon-box web3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </div>
            </div>
            <div className="card-body">
              <h2>Extra Library 1</h2>
              <p>Scroll down to see more content added to the grid.</p>
            </div>
            <div className="card-footer">
              <div className="stat">
                <span className="stat-label">ITEMS</span>
                <span className="stat-value">42</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div className="icon-box summer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.38 3.46L16 2a8.5 8.5 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
                </svg>
              </div>
            </div>
            <div className="card-body">
              <h2>Extra Library 2</h2>
              <p>This demonstrates the vertical scrolling capability.</p>
            </div>
            <div className="card-footer">
              <div className="stat">
                <span className="stat-label">ITEMS</span>
                <span className="stat-value">8</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      {/* <nav className="bottom-nav">
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </button>
        <button className="nav-item active">
          <svg viewBox="0 0 24 24" fill="currentColor">
             <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        <button className="nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </nav> */}
    </div>
  );
};

export default Dashboard;