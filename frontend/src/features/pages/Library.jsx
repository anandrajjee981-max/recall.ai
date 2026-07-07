import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuery from './hooks/usequery';
import '../../style/library.css'; // Mapped directly to premium exclusive layout sheet
import { ExternalLink, ArrowLeft } from 'lucide-react'; 
import Navbar from '../components/Navbar';

export default function Library() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleReceiveSaves } = useQuery();
  const [saves, setSaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSaves() {
      try {
        setLoading(true);
        const response = await handleReceiveSaves(id);

        if (response && response.data) {
          setSaves(response.data);
        } else if (Array.isArray(response)) {
          setSaves(response);
        } else {
          setSaves([]);
        }
      } catch (err) {
        setError(err.message || 'Unable to load library');
      } finally {
        setLoading(false);
      }
    }

    if (id) loadSaves();
  }, [id, handleReceiveSaves]);

  return (
    <div className="library-view-container">
      {/* Top Core Header Navigation Row */}
      <header className="lib-header">
        <div className="lib-title-area">
          <h1>Library</h1>
        </div>
        <button className="lib-back-btn" onClick={() => navigate('/Dashboard')}>
          <ArrowLeft size={15} /> <span>Back</span>
        </button>
      </header>

      {/* Main Structural Layout Block */}
      <main className="library-content-wrapper">
        <div className="lib-section-label">
          <h2>Folder Contents</h2>
          <span className="lib-node-id">INDEX_ID: {id}</span>
        </div>

        {loading ? (
          <div className="lib-state-card">
            <h2>Loading neural nodes...</h2>
            <p>Fetching active library data streams from memory grid.</p>
          </div>
        ) : error ? (
          <div className="lib-state-card" style={{ borderColor: 'rgba(255, 107, 107, 0.3)' }}>
            <h2 style={{ color: '#ff6b6b' }}>Sync Interrupted</h2>
            <p>{error}</p>
          </div>
        ) : saves.length === 0 ? (
          <div className="lib-state-card">
            <h2>Empty Memory Node</h2>
            <p>No active documents or bookmarks have been indexed in this folder yet.</p>
          </div>
        ) : (
          <div className="lib-grid-deck">
            {saves.map((save) => (
              <div key={save._id} className="lib-node-card">
                
                {/* Meta Header Tag Mapping */}
                <div className="lib-card-header">
                  {save.tags && save.tags.length > 0 ? (
                    save.tags.map((tag, idx) => (
                      <span key={idx} className="lib-tag-badge active">#{tag}</span>
                    ))
                  ) : (
                    <span className="lib-tag-badge">#Memory_Node</span>
                  )}
                </div>

                {/* Main Content Area */}
                <div className="lib-card-body">
                  <h2>
                    {save.summary && save.summary !== "No content provided" 
                      ? save.summary 
                      : "Synchronized Document Snippet"}
                  </h2>
                  
                  {/* Persistent absolute URL Link Node */}
                  {save.url && (
                    <a 
                      href={save.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="lib-url-anchor"
                    >
                      <ExternalLink size={13} style={{ flexShrink: 0 }} />
                      <span>{save.url.substring(0, 45)}...</span>
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* Responsive Dock System */}
      <Navbar />
    </div>
  );
}