'use client';
import React, { useState } from 'react';

export default function Page() {
  const [tables, setTables] = useState([
    { id: 'T1', top: '48%', left: '33%', status: 'Occupied', guests: 2, time: '35m', name: 'John Doe' },
    { id: 'T2', top: '56%', left: '42%', status: 'Available', seats: 4 },
    { id: 'T3', top: '43%', left: '67%', status: 'Occupied', guests: 4, time: '52m', name: 'Alexander' },
    { id: 'T4', top: '58%', left: '61%', status: 'Occupied', guests: 4, time: '20m', name: 'Sarah K.' },
    { id: 'T5', top: '65%', left: '52%', status: 'Occupied', guests: 2, time: '15m', name: 'Michael' },
    { id: 'T6', top: '48%', left: '77%', status: 'Reserved', time: '8:00 PM', name: 'David L.' },
    { id: 'T7', top: '56%', left: '86%', status: 'Reserved', time: '8:30 PM', name: 'Emma W.' },
  ]);

  const [selectedTableId, setSelectedTableId] = useState('T3'); // Default selected table

  const selectedTable = tables.find(t => t.id === selectedTableId) || tables[0];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#F3E5AB', fontFamily: 'sans-serif', padding: '16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* TOP HEADER */}
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #222', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', fontWeight: 'bold' }}>
            💎
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', color: '#F3E5AB', fontWeight: 'bold' }}>TableNest</h1>
            <p style={{ margin: 0, fontSize: '9px', color: '#888', letterSpacing: '1px' }}>PREMIUM HOSPITALITY SaaS • LIVE 3D FLOOR</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#aaa', background: '#141414', padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2a2a' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#2ecc71', borderRadius: '50%', display: 'inline-block' }}></span>
          <span>LIVE MANAGER</span>
        </div>
      </div>

      {/* MAIN LAYOUT GRID (Side-by-side on Desktop, Stacked on Mobile) */}
      <div style={{ width: '100%', maxWidth: '1200px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', alignItems: 'start' }}>
        
        {/* LEFT SIDEBAR - CURRENT METRICS & SELECTED INFO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* DAILY REVENUE METRIC */}
          <div style={{ background: '#111', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px', padding: '16px', boxSizing: 'border-box' }}>
            <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>REVENUE TODAY</span>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '32px', color: '#F3E5AB', fontWeight: '800' }}>$6,030</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#2ecc71' }}>Estimated Net Profit: <b>$2,533 (42%)</b></p>
          </div>

          {/* DYNAMIC SELECTED TABLE INFO - Click a table to update */}
          <div style={{ background: '#16130b', border: '1px solid #D4AF37', borderRadius: '12px', padding: '16px', boxSizing: 'border-box', boxShadow: '0 0 15px rgba(212,175,55,0.15)' }}>
            <span style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '1px', display: 'block' }}>SELECTED TABLE INFO</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#F3E5AB' }}>Table {selectedTable.id}</h3>
              <span style={{ fontSize: '10px', color: '#000', background: '#D4AF37', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>{selectedTable.status}</span>
            </div>
            
            {selectedTable.guests && <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#bbb' }}>Guests: {selectedTable.guests} | Time Active: {selectedTable.time}</p>}
            {selectedTable.seats && <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#bbb' }}>Seats: {selectedTable.seats} (Available)</p>}
            {selectedTable.name && <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#777' }}>Customer: {selectedTable.name}</p>}

            <button style={{ width: '100%', padding: '10px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', marginTop: '12px' }}>
              + NEW RESERVATION
            </button>
          </div>

        </div>

        {/* RIGHT SIDE - 3D FLOOR PLAN (SWIPEABLE/SCROLLABLE CONTAINER) */}
        <div style={{ position: 'relative', width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '10px', border: '1px solid #2a2a2a', borderRadius: '16px', background: '#0d0d0d' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #222', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#F3E5AB' }}>OWNER LIVE 3D OPERATIONS</span>
            <span style={{ fontSize: '10px', color: '#888' }}>Swipe left/right on mobile</span>
          </div>

          <div style={{ position: 'relative', minWidth: '700px', width: '100%', borderRadius: '12px' }}>
            <img 
              src="/hero-ultra.webp" 
              alt="TableNest 3D Floor Plan" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
            />

            {tables.map((t) => {
              const isSelected = selectedTableId === t.id;
              const statusColor = t.status === 'Occupied' ? '#D4AF37' : t.status === 'Reserved' ? '#3b82f6' : '#10b981';
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTableId(t.id)}
                  style={{
                    position: 'absolute',
                    top: t.top,
                    left: t.left,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: isSelected ? statusColor : 'rgba(0, 0, 0, 0.88)',
                    color: isSelected ? '#000' : '#F3E5AB',
                    border: `1px solid ${statusColor}`,
                    fontSize: '10px',
                    fontWeight: 'bold',
                    boxShadow: isSelected ? `0 0 15px ${statusColor}` : '0 4px 12px rgba(0,0,0,0.9)',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  {t.id} • {t.status} {t.guests ? `(${t.guests})` : ''}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
