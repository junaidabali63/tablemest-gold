'use client';
import React, { useState } from 'react';

export default function Page() {
  const [selectedTable, setSelectedTable] = useState({ id: 'T3', status: 'Occupied', guests: 4, time: '52m' });

  const tables = [
    { id: 'T1', top: '48%', left: '33%', status: 'Occupied', guests: 2, time: '35m' },
    { id: 'T2', top: '56%', left: '42%', status: 'Available', seats: 4 },
    { id: 'T3', top: '43%', left: '67%', status: 'Occupied', guests: 4, time: '52m' },
    { id: 'T4', top: '58%', left: '61%', status: 'Occupied', guests: 4, time: '20m' },
    { id: 'T5', top: '65%', left: '52%', status: 'Occupied', guests: 2, time: '15m' },
    { id: 'T6', top: '48%', left: '77%', status: 'Reserved', time: '8:00 PM' },
    { id: 'T7', top: '56%', left: '86%', status: 'Reserved', time: '8:30 PM' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#F3E5AB', fontFamily: 'sans-serif', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* TOP HEADER */}
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #222', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', fontWeight: 'bold' }}>
            💎
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', color: '#F3E5AB', fontWeight: 'bold' }}>TableNest</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#888', letterSpacing: '1px' }}>PREMIUM HOSPITALITY SaaS • LIVE 3D</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#aaa', background: '#141414', padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2a2a' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#2ecc71', borderRadius: '50%', display: 'inline-block' }}></span>
          <span>LIVE</span>
        </div>
      </div>

      {/* MAIN FLOOR PLAN CONTAINER WITH HORIZONTAL SCROLL FOR MOBILE */}
      <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '10px' }}>
        <div style={{ position: 'relative', minWidth: '700px', width: '100%', maxWidth: '1100px', margin: '0 auto', borderRadius: '14px', border: '1px solid #333', boxShadow: '0 0 25px rgba(212,175,55,0.2)', background: '#0d0d0d' }}>
          
          <img 
            src="/hero-ultra.webp" 
            alt="TableNest 3D Floor Plan" 
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }}
          />

          {tables.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedTable(t)}
              style={{
                position: 'absolute',
                top: t.top,
                left: t.left,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: '20px',
                background: selectedTable.id === t.id ? '#D4AF37' : 'rgba(0, 0, 0, 0.85)',
                color: selectedTable.id === t.id ? '#000' : '#F3E5AB',
                border: '1px solid #D4AF37',
                fontSize: '10px',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0,0,0,0.9)',
                whiteSpace: 'nowrap',
                zIndex: 10,
                transition: 'all 0.2s'
              }}
            >
              {t.id} • {t.status} {t.guests ? `(${t.guests})` : ''}
            </div>
          ))}
        </div>
      </div>

      {/* SELECTED TABLE INFO BAR */}
      <div style={{ width: '100%', maxWidth: '1100px', background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>SELECTED TABLE INFO</span>
          <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#F3E5AB' }}>Table {selectedTable.id} — Status: {selectedTable.status}</span>
          {selectedTable.guests && <span style={{ fontSize: '12px', color: '#D4AF37', marginLeft: '10px' }}>({selectedTable.guests} Guests, Active {selectedTable.time})</span>}
        </div>
        <button style={{ padding: '10px 20px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
          + NEW RESERVATION
        </button>
      </div>

      <p style={{ fontSize: '11px', color: '#777', marginTop: '10px', textAlign: 'center' }}>
        Swipe left/right on mobile to view full floor plan • Tap any table for details
      </p>

    </div>
  );
}
