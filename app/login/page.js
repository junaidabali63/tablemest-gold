'use client';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if(email && password) {
      localStorage.setItem('gold_auth', 'true');
      window.location.href = '/';
    } else {
      alert('Email Password bharo!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#070707', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#111', border: '1px solid #D4AF37', borderRadius: '14px', padding: '30px', width: '100%', maxWidth: '380px', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
        <h1 style={{ color: '#D4AF37', fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px', margin: 0, textAlign: 'center' }}>TableNest GOLD</h1>
        <p style={{ color: '#666', fontSize: '11px', textAlign: 'center', marginTop: '6px', letterSpacing: '1px' }}>PREMIUM ACCESS</p>
        
        <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
          <button onClick={handleLogin} style={{ padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>LOGIN TO GOLD</button>
        </div>
      </div>
    </div>
  );
}
