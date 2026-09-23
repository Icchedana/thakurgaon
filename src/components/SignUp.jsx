import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Signup({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          address: address
        }
      }
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Registration successful! Please check your email to confirm your account.');
    }
    setLoading(false);
  };

  return (
    <div style={{ width: '100%', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h2 style={{ color: '#065f46', fontSize: '20px', fontWeight: '800', margin: '0 0 5px 0' }}>🌿 স্মার্ট ঠাকুরগাঁও</h2>
        <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>নতুন অ্যাকাউন্ট তৈরি করুন</p>
      </div>

      {message && (
        <div style={{
          padding: '8px', marginBottom: '12px', borderRadius: '8px', fontSize: '11px',
          backgroundColor: message.includes('successful') ? '#d1fae5' : '#fee2e2',
          color: message.includes('successful') ? '#065f46' : '#991b1b', textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>পূর্ণ নাম *</label>
          <input 
            type="text" required placeholder="আপনার নাম" value={fullName} onChange={(e) => setFullName(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>ইমেইল অ্যাড্রেস *</label>
          <input 
            type="email" required placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>পাসওয়ার্ড *</label>
          <input 
            type="password" required placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>মোবাইল নম্বর *</label>
          <input 
            type="tel" required placeholder="017xxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>ঠিকানা *</label>
          <input 
            type="text" required placeholder="আপনার ঠিকানা" value={address} onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" disabled={loading}
          style={{
            width: '100%', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#ffffff', padding: '10px', fontSize: '13px', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '5px'
          }}
        >
          {loading ? 'প্রসেসিং হচ্ছে...' : 'রেজিস্ট্রেশন করুন'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <button 
            type="button" onClick={onSwitchToLogin}
            style={{ background: 'none', border: 'none', color: '#059669', fontSize: '12px', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
          >
            ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন
          </button>
        </div>
      </form>
    </div>
  );
}