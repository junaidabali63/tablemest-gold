'use client';
import React, { useState } from 'react';

export default function Page() {
  const [selectedTable, setSelectedTable] = useState({ id: 'T3', status: 'Occupied', guests: 4, time: '52m' });

  const tables = [
    { id: 'T1', top: '30%', left: '15%', status: 'Available', seats: 2 },
    { id: 'T2', top: '25%', left: '32%', status: 'Occupied', guests: 4, time: '45m' },
    { id: 'T3', top: '35%', left: '50%', status: 'Occupied', guests: 4, time: '52m' },
    { id: 'T4', top: '28%', left: '70%', status: 'Reserved', time: '8:00 PM' },
    { id: 'T5', top: '60%', left: '20%', status: 'Occupied', guests: 2, time: '20m' },
    { id: 'T6', top: '65%', left: '45%', status: 'Available', seats: 4 },
    { id: 'T7', top: '60%', left: '72%', status: 'Reserved', time: '8:30 PM' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#D4AF37', fontFamily: 'sans-serif', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* TOP HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '15px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', borderRadius: '6px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', fontWeight: 'bold' }}>
            💎
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', color: '#F3E5AB' }}>RESTAURANT OPS</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#888', letterSpacing: '1px' }}>FLOOR PLAN • LIVE</p>
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#aaa', background: '#141414', padding: '6px 12px', borderRadius: '20px', border: '1px solid #2a2a2a' }}>
          🟢 LIVE • Fri, Oct 16, 2026
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* LEFT SIDEBAR */}
        <div style={{ flex: '1', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ background: '#111', border: '1px solid #262626', borderRadius: '12px', padding: '15px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>OCCUPANCY</p>
            <h2 style={{ margin: 0, fontSize: '32px', color: '#F3E5AB' }}>62%</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#888' }}>12 / 19 seats filled</p>
          </div>

          <div style={{ background: '#111', border: '1px solid #262626', borderRadius: '12px', padding: '15px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>REVENUE TODAY</p>
            <h2 style={{ margin: 0, fontSize: '28px', color: '#F3E5AB' }}>$4,820</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#2ecc71' }}>+12.4% vs yesterday ↑</p>
          </div>

          <div style={{ background: '#111', border: '1px solid #262626', borderRadius: '12px', padding: '15px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>AVG TURN TIME</p>
            <h2 style={{ margin: 0, fontSize: '28px', color: '#F3E5AB' }}>48 min</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#2ecc71' }}>Target: &lt;60min ✓</p>
          </div>

          <div style={{ background: '#111', border: '1px solid #262626', borderRadius: '12px', padding: '15px' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>TABLE STATUS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#ccc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟡 Occupied</span> <b>5</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🔵 Reserved</span> <b>2</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟢 Available</span> <b>1</b></div>
            </div>
          </div>

          <button style={{ width: '100%', padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}>
            + NEW RESERVATION
          </button>

        </div>

        {/* RIGHT FLOOR PLAN */}
        <div style={{ flex: '3', minWidth: '300px', background: '#0d0d0d', border: '1px solid #222', borderRadius: '16px', height: '500px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
          
          {/* Bar Counter */}
          <div style={{ alignSelf: 'flex-end', width: '60%', padding: '10px 15px', border: '1px solid rgba(212, 175, 55, 0.4)', background: 'linear-gradient(to right, #1a150b, #111)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#F3E5AB' }}>🍸 PREMIUM BAR & LOUNGE</span>
            <span style={{ fontSize: '10px', color: '#D4AF37', background: 'rgba(212,175,55,0.1)', padding: '3px 8px', borderRadius: '4px' }}>Active</span>
          </div>

          {/* Tables Container */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {tables.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTable(t)}
                style={{
                  position: 'absolute',
                  top: t.top,
                  left: t.left,
                  transform: 'translate(-50%, -50%)',
                  background: selectedTable.id === t.id ? '#1a150b' : '#111',
                  border: selectedTable.id === t.id ? '2px solid #F3E5AB' : '1px solid #333',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                  pointerEvents: 'auto'
                }}
              >
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#222', border: '1px solid #D4AF37', margin: '0 auto 4px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#F3E5AB' }}>
                  {t.id}
                </div>
                <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase' }}>{t.status}</div>
                {t.guests && <div style={{ fontSize: '9px', color: '#D4AF37', marginTop: '2px' }}>👥 {t.guests} Guests</div>}
              </div>
            ))}
          </div>

          {/* Entrance */}
          <div style={{ alignSelf: 'flex-start', padding: '6px 12px', border: '1px solid #444', background: '#141414', borderRadius: '6px', fontSize: '10px', color: '#aaa', fontWeight: 'bold' }}>
            🚪 MAIN ENTRANCE
          </div>

        </div>

      </div>

    </div>
  );
}
