import React from 'react';
import '../../style/auth.css';
import { Zap, Fingerprint, Binary } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
  return (
    <div className="auth-page">
      <div className="ticker-bar">
        ESTABLISHING SECURE NEURAL LINK... STATUS: OPERATIONAL_V2.4
      </div>

      <div className="auth-card">
        <div className="brand-container">
          <Zap className="brand-icon" size={44} fill="currentColor" />
          <h1 className="brand-title">RECALL.AI</h1>
          <div className="brand-subtitle">NEURAL INTERFACE V2.4</div>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label className="input-label">Recall ID</label>
            <div className="input-wrapper">
              <Fingerprint className="input-icon" size={18} />
              <input type="email" name='email' autoComplete="new-email" className="auth-input" placeholder="USER_EMAIL" required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Neural Key</label>
            <div className="input-wrapper">
              <Binary className="input-icon" size={18} />
              <input type="password" name='password' autoComplete="new-password" className="auth-input" placeholder="••••••••••••" required />
            </div>
          </div>

          <div className="forgot-link">Forgot Access?</div>

          <button type="submit" className="btn-authorize">
            Authorize <Zap size={16} fill="currentColor" />
          </button>
        </form>

        <div className="toggle-mode">
          New Mind? <span onClick={() => navigate('/register')} className="toggle-link">Register Session</span>
        </div>
      </div>
    </div>
  );
}