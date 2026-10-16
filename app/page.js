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
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#D4AF37', fontFamily: 'sans-serif', padding: '16px', boxSizing: 'border-box' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '12px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', fontWeight: 'bold' }}>
            💎
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '15px', letterSpacing: '2px', color: '#F3E5AB' }}>RESTAURANT OPS</h1>
            <p style={{ margin: 0, fontSize: '9px', color: '#888', letterSpacing: '1px' }}>FLOOR PLAN • LIVE</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#aaa', background: '#141414', padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2a2a' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#2ecc71', borderRadius: '50%', display: 'inline-block' }}></span>
          <span>LIVE • UPDATED 2 MIN AGO</span>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', alignItems: 'start' }}>
        
        {/* LEFT SIDEBAR ANALYTICS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ background: '#111', border: '1px solid #262626', borderRadius: '12px', padding: '14px' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: '#888', letterSpacing: '1px' }}>OCCUPANCY</p>
            <h2 style={{ margin: 0, fontSize: '30px', color: '#F3E5AB' }}>62%</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#888' }}>12 / 19 seats filled</p>
          </div>

          <div style={{ background: '#111', border: '1px solid #262626', borderRadius: '12px', padding: '14px' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: '#888', letterSpacing: '1px' }}>REVENUE TODAY</p>
            <h2 style={{ margin: 0, fontSize: '26px', color: '#F3E5AB' }}>$4,820</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#2ecc71' }}>+12.4% vs yesterday ↑</p>
          </div>

          <div style={{ background: '#111', border: '1px solid #262626', borderRadius: '12px', padding: '14px' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: '#888', letterSpacing: '1px' }}>AVG TURN TIME</p>
            <h2 style={{ margin: 0, fontSize: '26px', color: '#F3E5AB' }}>48 min</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#2ecc71' }}>Target: &lt;60min ✓</p>
          </div>

          <div style={{ background: '#111', border: '1px solid #262626', borderRadius: '12px', padding: '14px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '10px', color: '#888', letterSpacing: '1px' }}>TABLE STATUS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: '#ccc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟡 Occupied</span> <b>5</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🔵 Reserved</span> <b>2</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟢 Available</span> <b>1</b></div>
            </div>
          </div>

          {/* SELECTED TABLE DETAILS */}
          <div style={{ background: '#16130b', border: '1px solid #D4AF37', borderRadius: '12px', padding: '14px' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '10px', color: '#D4AF37', letterSpacing: '1px' }}>SELECTED TABLE</p>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#F3E5AB' }}>Table {selectedTable.id}</h3>
            <p style={{ margin: 0, fontSize: '11px', color: '#ccc' }}>Status: <b>{selectedTable.status}</b></p>
            {selectedTable.guests && <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#D4AF37' }}>Guests: {selectedTable.guests} | Time: {selectedTable.time}</p>}
          </div>

          <button style={{ width: '100%', padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '12px' }}>
            + NEW RESERVATION
          </button>

        </div>

        {/* RIGHT 3D FLOOR PLAN VIEW */}
        <div style={{ gridColumn: 'span 2', width: '100%', overflowX: 'auto', background: '#0d0d0d', border: '1px solid #222', borderRadius: '16px', padding: '16px' }}>
          <div style={{ position: 'relative', minWidth: '700px', width: '100%' }}>
            <img 
              src="/hero-ultra.webp" 
              alt="3D Restaurant Floor Plan" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.8)' }}
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
                  boxShadow: '0 4px 10px rgba(0,0,0,0.9)',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                  transition: 'all 0.2s'
                }}
              >
                {t.id} • {t.status} {t.guests ? `(${t.guests})` : ''}
              </div>
            ))}
          </div>
          <p style={{ fontSize: '10px', textAlign: 'center', marginTop: '10px', color: '#777' }}>
            Mobile par horizontal swipe karein poora floor plan dekhne ke liye • Kisi bhi table par click karein details dekhne ke liye
          </p>
        </div>

      </div>

    </div>
  );
}
