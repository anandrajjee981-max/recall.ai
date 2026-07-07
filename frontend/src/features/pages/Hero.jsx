import '../../style/hero.css';
import React, { useState, useEffect } from 'react';
import useQuery from './hooks/usequery';
import { Terminal, Zap, BrainCircuit, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Hero() {
  const { handleSendQuery } = useQuery();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState(100); // Default stable state is 100%

  // Simulated progressive loader effect for neural indexing
  useEffect(() => {
    let intervalId;
    if (loading) {
      intervalId = setInterval(() => {
        setBuffer((prev) => {
          if (prev >= 90) {
            clearInterval(intervalId); // Hold onto 90% until backend intercepts
            return 90;
          }
          // Increment speed configuration
          const increment = Math.floor(Math.random() * 12) + 4;
          return Math.min(prev + increment, 90);
        });
      }, 150);
    }
    return () => clearInterval(intervalId);
  }, [loading]);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    try {
      setLoading(true);
      setBuffer(0); // Trigger system drop to zero to initialize matrix simulation
      
      // Await backend response
      await handleSendQuery(query);
      
      // Quick fast-forward cascade to full completion upon successful resolve
      setBuffer(100);
    } catch (err) {
      console.error("System query fault:", err);
      setBuffer(0); // Reset crash on structural breaks
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-dashboard">
      <div className="hero-query-container">
        
        {/* Dynamic Single-Container Query Input */}
        <section className="search-box-wrapper">
          <form onSubmit={handleQuerySubmit} className="search-box-inner">
            <Terminal className="search-icon-left" size={20} />
            <input 
              type="text" 
              className="query-input" 
              placeholder={loading ? "COMPUTING NEURAL INDEX..." : "Neural Search..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit" 
              className={`btn-submit-query ${loading ? 'engine-processing' : ''}`} 
              aria-label="Submit Engine Query"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={16} className="spinning-sync-icon" />
              ) : (
                <Zap size={16} fill="currentColor" />
              )}
            </button>
          </form>
        </section>

        {/* Scalable Real-time Diagnostics Matrix */}
        <div className="metrics-row">
          <div className="metric-item">
            <span className={`status-dot ${loading ? 'status-dot-processing' : 'status-dot-active'}`}></span>
            <span className="metric-label">NEURAL LINK:</span>
            <span className={loading ? "text-processing" : "text-active"}>
              {loading ? "COMPUTING" : "ACTIVE"}
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">BUFFER:</span>
            <span className={loading ? "text-processing-cyan" : "text-buffer"}>
              {buffer}%
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-label">
              STATUS: {loading ? "STREAM_BUSY_" : "SYST_READY_"}
            </span>
          </div>
        </div>

        {/* Context Node Library Tags */}
        <section className="libraries-box">
          <span className="libraries-label">Active Libraries</span>
          <div className="tags-holder">
            <div className="tag-node"><span className="node-dot dot-p"></span> #Web3</div>
            <div className="tag-node"><span className="node-dot dot-t"></span> #Amazon</div>
            <div className="tag-node"><span className="node-dot dot-l"></span> #LateNight</div>
            <div className="tag-node"><span className="node-dot dot-g"></span> #Research_09</div>
          </div>
        </section>

        {/* Central Display Prompt Overlay */}
        <main className="central-prompt-display">
          <div className={`brain-card-wrapper ${loading ? 'brain-pulsing-node' : ''}`}>
            <BrainCircuit className="brain-icon-svg" size={44} />
          </div>
          <h2 className="heading-main">
            {loading ? "Retrieving Memory Strains..." : "What should the AI recall?"}
          </h2>
          <p className="desc-text">
            {loading 
              ? "Scanning sub-space clusters and parsing vector embeddings from encrypted nodes." 
              : "Initiate neural query to access your synchronized memories and active data nodes."}
          </p>
        </main>

        <Navbar />
      </div>
    </div>
  );
}