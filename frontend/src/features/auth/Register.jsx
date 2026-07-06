import React from 'react';
import '../../style/auth.css';
import { Zap, Fingerprint, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate()
  return (
    <div className="auth-page">
      <div className="ticker-bar">
        INITIALIZING SECURE PROTOCOL... STATUS: AWAITING_CREATION
      </div>

      <div className="auth-card">
        <div className="brand-container">
          <Zap className="brand-icon" size={44} fill="currentColor" />
          <h1 className="brand-title">RECALL.AI</h1>
          <div className="brand-subtitle">NEURAL INTERFACE V2.4</div>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
            <label className="input-label">Choose Recall ID</label>
            <div className="input-wrapper">
              <Fingerprint className="input-icon" size={18} />
              <input type="text" name='username' autoComplete="new-name" className="auth-input" placeholder="NEW_USER_NAME" required />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Choose Recall ID</label>
            <div className="input-wrapper">
              <Fingerprint className="input-icon" size={18} />
              <input type="email"  name='email' autoComplete="new-email" className="auth-input" placeholder="NEW_USER_EMAIL" required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Create Neural Key</label>
            <div className="input-wrapper">
              <KeyRound className="input-icon" size={18} />
              <input type="password" name='password' autoComplete="new-password" className="auth-input" placeholder="••••••••••••" required />
            </div>
          </div>

          <button type="submit" className="btn-authorize">
            Initialize <Zap size={16} fill="currentColor" />
          </button>
        </form>

        <div className="toggle-mode">
          Existing Node? <span onClick={() => navigate('/login')} className="toggle-link">Authorize Access</span>
        </div>
      </div>
    </div>
  );
}