import React, { useEffect, useState } from 'react';
import '../../style/dashboard.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useQuery from './hooks/usequery';
import Navbar from '../components/Navbar';
import { Terminal, SlidersHorizontal, Folder, FolderHeart } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const folderItems = useSelector((state) => state.query.folder || []);
  const { handleReceiveFolder } = useQuery();

  useEffect(() => {
    async function loadFolders() {
      setLoading(true);
      setError(null);
      try {
        await handleReceiveFolder();
      } catch (err) {
        setError(err?.message || err?.error || 'Unable to load folders');
      } finally {
        setLoading(false);
      }
    }

    loadFolders();
  }, []);

  // Soft client-side search indexing to filter active folder lists dynamically
  const filteredFolders = folderItems.filter(folder => 
    folder?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="recall-dashboard">
      {/* Top Identity HUD Header */}
      <header className="header">
        <div className="logo-area">
          <Terminal size={22} style={{ color: 'var(--primary, #dab9ff)' }} />
          <h1>Dashboard</h1>
        </div>
        <div className="profile-area">
          <div className="avatar"></div>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="main-content">
        
        {/* Optimized Single-Line Search Query Bar */}
        <div className="search-section">
          <div className="search-input-wrapper">
            <Terminal className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="QUERY LIBRARIES..." 
              className="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="filter-button" aria-label="System Filters">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Section Heading Label */}
        <div className="section-header" style={{ paddingBottom: '16px', marginTop: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '0.85rem', fontFamily: 'monospace', letterSpacing: '2px', color: '#5c5a5e', textTransform: 'uppercase' }}>
            Library Folders
          </h2>
        </div>

        {/* Dashboard Dynamic Content Card Grid */}
        <div className="grid-container">
          {loading ? (
            <div className="card full-span-state">
              <div className="card-body">
                <h2>Loading neural nodes...</h2>
              </div>
            </div>
          ) : error ? (
            <div className="card full-span-state">
              <div className="card-body">
                <h2 style={{ color: '#ff6b6b' }}>Sync Error</h2>
                <p>{error}</p>
              </div>
            </div>
          ) : filteredFolders.length > 0 ? (
            filteredFolders.map((folder) => (
              <div
                key={folder._id}
                className="card interactive-node-card"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/Library/${folder._id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/Library/${folder._id}`);
                }}
              >
                <div className="card-header">
                  <div className="icon-box web3">
                    <Folder size={18} fill="currentColor" style={{ opacity: 0.8 }} />
                  </div>
                  <span className="badge active">#Node</span>
                </div>
                <div className="card-body">
                  <h2>{folder.title || 'Unnamed Folder'}</h2>
                  <p>{folder.description || `${folder?.saves?.length || 0} active records linked`}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="card full-span-state">
              <div className="card-body">
                <h2>No memory nodes mapped</h2>
                <p>Verify network configurations or start an engine crawl stream.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Persistent Fluid Footer HUD Deck Navigation */}
      <Navbar />
    </div>
  );
};

export default Dashboard;