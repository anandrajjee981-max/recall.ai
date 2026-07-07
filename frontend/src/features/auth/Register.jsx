import React, { useState } from 'react';
import '../../style/auth.css';
import { Zap, Fingerprint, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from './hooks/useauth';

export default function Register() {
  const navigate = useNavigate();
  const { handleregister } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);

  async function submitHandler(e) {
    e.preventDefault();
    setError(null);
    const res = await handleregister(form.username, form.email, form.password);
    if (res?.success) {
      navigate('/login');
    } else {
      setError(res?.error || 'Registration failed');
    }
  }

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

        <form className="auth-form" onSubmit={submitHandler}>
          {error && <div className="auth-error">{error}</div>}
              <div className="input-group">
            <label className="input-label">Choose Recall ID</label>
            <div className="input-wrapper">
              <Fingerprint className="input-icon" size={18} />
              <input type="text" name='username' autoComplete="new-name" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="auth-input" placeholder="NEW_USER_NAME" required />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Choose Recall ID</label>
            <div className="input-wrapper">
              <Fingerprint className="input-icon" size={18} />
              <input type="email" name='email' autoComplete="new-email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="auth-input" placeholder="NEW_USER_EMAIL" required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Create Neural Key</label>
            <div className="input-wrapper">
              <KeyRound className="input-icon" size={18} />
              <input type="password" name='password' autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="auth-input" placeholder="••••••••••••" required />
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