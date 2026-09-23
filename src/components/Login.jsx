import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false); // Forgot password mode state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Successfully logged in!');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
    setLoading(false);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address first.');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password reset link sent to your email! Please check your inbox.');
    }
    setLoading(false);
  };

  return (
    <div style={{ width: '100%', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#065f46', fontSize: '22px', fontWeight: '800', margin: '0 0 5px 0' }}>🌿 স্মার্ট ঠাকুরগাঁও</h2>
        <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
          {isResetMode ? 'পাসওয়ার্ড রিকভারি (Password Reset)' : 'আপনার অ্যাকাউন্টে প্রবেশ করুন'}
        </p>
      </div>

      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '8px',
          fontSize: '12px',
          backgroundColor: message.includes('Success') || message.includes('sent') ? '#d1fae5' : '#fee2e2',
          color: message.includes('Success') || message.includes('sent') ? '#065f46' : '#991b1b',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      {isResetMode ? (
        // Reset Password Form
        <form onSubmit={handleForgotPasswordSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>আপনার রেজিস্টার্ড ইমেইল দিন</label>
            <input 
              type="email" 
              required
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: '#ffffff',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(5, 150, 105, 0.2)',
              marginBottom: '10px'
            }}
          >
            {loading ? 'প্রসেসিং হচ্ছে...' : 'রিসেট লিংক পাঠান'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <button 
              type="button"
              onClick={() => { setIsResetMode(false); setMessage(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#059669',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              লগইন পেজে ফিরে যান
            </button>
          </div>
        </form>
      ) : (
        // Normal Login Form
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>ইমেইল অ্যাড্রেস</label>
            <input 
              type="email" 
              required
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '12px', position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>পাসওয়ার্ড</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  color: '#059669',
                  fontWeight: 'bold'
                }}
              >
                {showPassword ? 'লুকান' : 'দেখুন'}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button 
              type="button"
              onClick={() => { setIsResetMode(true); setMessage(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#059669',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline'
              }}
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: '#ffffff',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(5, 150, 105, 0.2)'
            }}
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>
      )}
    </div>
  );
}