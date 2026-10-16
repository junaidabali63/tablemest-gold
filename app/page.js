'use client';
import React, { useState } from 'react';

export default function Page() {
  const [tables, setTables] = useState([
    { id: 'T1', top: '38%', left: '26%', status: 'Occupied', guests: 2, time: '35m', name: 'John Doe' },
    { id: 'T2', top: '50%', left: '38%', status: 'Available', seats: 4 },
    { id: 'T3', top: '30%', left: '72%', status: 'Occupied', guests: 4, time: '52m', name: 'Alexander' },
    { id: 'T4', top: '52%', left: '62%', status: 'Occupied', guests: 4, time: '20m', name: 'Sarah K.' },
    { id: 'T5', top: '62%', left: '50%', status: 'Occupied', guests: 2, time: '15m', name: 'Michael' },
    { id: 'T6', top: '38%', left: '86%', status: 'Reserved', time: '8:00 PM', name: 'David L.' },
    { id: 'T7', top: '50%', left: '96%', status: 'Reserved', time: '8:30 PM', name: 'Emma W.' },
  ]);

  const [selectedTableId, setSelectedTableId] = useState('T1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', guests: '2', time: '8:00 PM', tableId: 'T2' });

  const selectedTable = tables.find(t => t.id === selectedTableId) || tables[0];

  const handleStatusChange = (newStatus) => {
    setTables(tables.map(t => t.id === selectedTableId ? { ...t, status: newStatus } : t));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setTables(tables.map(t => t.id === bookingData.tableId ? { ...t, status: 'Reserved', guests: bookingData.guests, time: bookingData.time, name: bookingData.name } : t));
    setIsModalOpen(false);
    setBookingData({ name: '', guests: '2', time: '8:00 PM', tableId: 'T2' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#F3E5AB', fontFamily: 'sans-serif', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
      
      {/* TOP HEADER */}
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyCenter: 'center', background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', fontWeight: 'bold' }}>
            💎
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '15px', letterSpacing: '1.5px', color: '#F3E5AB', fontWeight: 'bold' }}>TableNest 3D</h1>
            <p style={{ margin: 0, fontSize: '9px', color: '#888' }}>MOBILE FLOOR PLAN</p>
          </div>
        </div>
        <div style={{ fontSize: '10px', color: '#aaa', background: '#141414', padding: '4px 10px', borderRadius: '15px', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#2ecc71', borderRadius: '50%' }}></span>
          <span>LIVE</span>
        </div>
      </div>

      {/* FULL MOBILE FIT 3D FLOOR CANVAS */}
      <div style={{ width: '100%', maxWidth: '600px', position: 'relative', borderRadius: '14px', border: '1px solid #333', overflow: 'hidden', boxShadow: '0 0 20px rgba(212,175,55,0.25)', height: '320px', background: '#000' }}>
        
        {/* CROPPED FOCUS ON 3D TABLES AREA */}
        <div style={{ position: 'absolute', top: '-15%', left: '-35%', width: '155%', height: '135%' }}>
          <img 
            src="/hero-ultra.webp" 
            alt="3D Floor Plan" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* CLICKABLE TABLE HOTSPOTS */}
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
                padding: '4px 8px',
                borderRadius: '12px',
                background: isSelected ? statusColor : 'rgba(0, 0, 0, 0.85)',
                color: isSelected ? '#000' : '#F3E5AB',
                border: `1px solid ${statusColor}`,
                fontSize: '9px',
                fontWeight: 'bold',
                boxShadow: isSelected ? `0 0 12px ${statusColor}` : '0 2px 6px rgba(0,0,0,0.8)',
                whiteSpace: 'nowrap',
                zIndex: 10,
                transition: 'all 0.15s ease'
              }}
            >
              {t.id} • {t.status}
            </div>
          );
        })}

      </div>

      {/* SELECTED TABLE CONTROLS */}
      <div style={{ width: '100%', maxWidth: '600px', background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', marginTop: '12px', boxSizing: 'border-box' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <span style={{ fontSize: '9px', color: '#888', letterSpacing: '1px', display: 'block' }}>SELECTED TABLE</span>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#F3E5AB' }}>Table {selectedTable.id}</span>
            <span style={{ fontSize: '11px', color: '#aaa', marginLeft: '8px' }}>
              (<b style={{ color: selectedTable.status === 'Occupied' ? '#D4AF37' : selectedTable.status === 'Reserved' ? '#3b82f6' : '#10b981' }}>{selectedTable.status}</b>)
            </span>
          </div>
          {selectedTable.name && (
            <span style={{ fontSize: '10px', color: '#888' }}>{selectedTable.name}</span>
          )}
        </div>

        {/* STATUS ACTION BUTTONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '10px' }}>
          <button onClick={() => handleStatusChange('Occupied')} style={{ padding: '8px 4px', background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            Occupied
          </button>
          <button onClick={() => handleStatusChange('Reserved')} style={{ padding: '8px 4px', background: 'rgba(59,130,246,0.15)', border: '1px solid #3b82f6', color: '#60a5fa', borderRadius: '6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            Reserved
          </button>
          <button onClick={() => handleStatusChange('Available')} style={{ padding: '8px 4px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#34d399', borderRadius: '6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            Available
          </button>
        </div>

        <button onClick={() => setIsModalOpen(true)} style={{ width: '100%', padding: '10px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
          + NEW RESERVATION
        </button>

      </div>

      {/* POPUP MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: '#121214', border: '1px solid #D4AF37', borderRadius: '12px', width: '100%', maxWidth: '360px', padding: '16px', boxShadow: '0 0 25px rgba(212,175,55,0.3)', margin: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#F3E5AB', fontSize: '14px' }}>New Reservation</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Guest Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. John Doe" 
                  value={bookingData.name} 
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '11px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Guests</label>
                  <input 
                    type="number" 
                    min="1" max="10" 
                    value={bookingData.guests} 
                    onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '11px', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Table</label>
                  <select 
                    value={bookingData.tableId} 
                    onChange={(e) => setBookingData({ ...bookingData, tableId: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '11px', boxSizing: 'border-box' }}
                  >
                    {tables.map(t => <option key={t.id} value={t.id}>Table {t.id}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Time</label>
                <input 
                  type="text" 
                  value={bookingData.time} 
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '11px', boxSizing: 'border-box' }}
                />
              </div>

              <button type="submit" style={{ marginTop: '6px', padding: '10px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                Confirm Reservation
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
