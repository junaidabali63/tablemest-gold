// GOLD FINAL - REALTIME LIVE - FIXED FOR top_pos/left_pos
'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

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
  const [selectedTableId, setSelectedTableId] = useState('T3');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', guests: '2', time: '8:00 PM', tableId: 'T2' });

  useEffect(() => {
    const auth = localStorage.getItem('gold_auth');
    if (!auth) { window.location.href = '/login'; }
  }, []);

  // REALTIME GOLD - 2 phones auto sync
  useEffect(() => {
    const fetchTables = async () => {
      const { data } = await supabase.from('tables').select('*');
      if (data) {
        setTables(prev => prev.map(p => {
          const f = data.find(d => d.id === p.id);
          if (!f) return p;
          return {...p, status: f.status, guests: f.guests, time: f.time, name: f.name, top: f.top_pos || p.top, left: f.left_pos || p.left, seats: f.seats || p.seats };
        }));
      }
    };
    fetchTables();

    const channel = supabase
     .channel('gold-tables-live')
     .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tables' }, (payload) => {
        const n = payload.new;
        setTables(prev => prev.map(t => t.id === n.id? {...t, status: n.status, guests: n.guests, time: n.time, name: n.name } : t));
      })
     .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const selectedTable = tables.find(t => t.id === selectedTableId) || tables[0];

  const handleStatusChange = async (newStatus) => {
    setTables(tables.map(t => t.id === selectedTableId? {...t, status: newStatus } : t));
    await supabase.from("tables").update({ status: newStatus }).eq("id", selectedTableId);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const updates = { status: 'Reserved', guests: parseInt(bookingData.guests), time: bookingData.time, name: bookingData.name };
    setTables(tables.map(t => t.id === bookingData.tableId? {...t,...updates } : t));
    await supabase.from("tables").update(updates).eq("id", bookingData.tableId);
    setIsModalOpen(false);
    setBookingData({ name: '', guests: '2', time: '8:00 PM', tableId: 'T2' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#F3E5AB', fontFamily: 'sans-serif', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #222', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,175,55,0.1)', color: '#D4AF37', fontWeight: 'bold' }}>💎</div>
          <div><h1 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', color: '#F3E5AB', fontWeight: 'bold' }}>TableNest</h1><p style={{ margin: 0, fontSize: '10px', color: '#888', letterSpacing: '1px' }}>PREMIUM HOSPITALITY SaaS • REALTIME LIVE</p></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#aaa', background: '#141414', padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2a2a' }}><span style={{ width: '8px', height: '8px', backgroundColor: '#2ecc71', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px #2ecc71', animation: 'pulse 1.5s infinite' }}></span><span>LIVE • REALTIME</span></div>
          <button onClick={() => { localStorage.removeItem('gold_auth'); window.location.href = '/login'; }} style={{ padding: '6px 12px', background: 'rgba(255,0,0,0.1)', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '20px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>LOGOUT</button>
        </div>
      </div>
      <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '10px' }}>
        <div style={{ position: 'relative', minWidth: '700px', width: '100%', maxWidth: '1100px', margin: '0 auto', borderRadius: '14px', border: '1px solid #333', boxShadow: '0 0 25px rgba(212,175,55,0.2)', background: '#0d0d0d' }}>
          <img src="/hero-ultra.webp" alt="TableNest 3D Floor Plan" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} />
          {tables.map((t) => {
            const isSelected = selectedTableId === t.id;
            const statusColor = t.status === 'Occupied'? '#D4AF37' : t.status === 'Reserved'? '#3b82f6' : '#10b981';
            return (<div key={t.id} onClick={() => setSelectedTableId(t.id)} style={{ position: 'absolute', top: t.top, left: t.left, transform: 'translate(-50%, -50%)', cursor: 'pointer', padding: '6px 12px', borderRadius: '20px', background: isSelected? statusColor : 'rgba(0,0,0,0.85)', color: isSelected? '#000' : '#F3E5AB', border: `1px solid ${statusColor}`, fontSize: '10px', fontWeight: 'bold', boxShadow: isSelected? `0 0 15px ${statusColor}` : '0 4px 12px rgba(0,0,0,0.9)', whiteSpace: 'nowrap', zIndex: 10 }}>{t.id} • {t.status} {t.guests? `(${t.guests})` : ''}</div>);
          })}
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: '1100px', background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px 20px', marginTop: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div><span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>MANAGE SELECTED TABLE</span><span style={{ fontSize: '16px', fontWeight: 'bold', color: '#F3E5AB' }}>Table {selectedTable.id}</span><span style={{ fontSize: '12px', color: '#aaa', marginLeft: '10px' }}>Current: <b style={{ color: selectedTable.status === 'Occupied'? '#D4AF37' : selectedTable.status === 'Reserved'? '#3b82f6' : '#10b981' }}>{selectedTable.status}</b></span></div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => handleStatusChange('Occupied')} style={{ padding: '8px 12px', background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>Mark Occupied</button>
            <button onClick={() => handleStatusChange('Reserved')} style={{ padding: '8px 12px', background: 'rgba(59,130,246,0.15)', border: '1px solid #3b82f6', color: '#60a5fa', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>Mark Reserved</button>
            <button onClick={() => handleStatusChange('Available')} style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#34d399', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>Mark Available</button>
            <button onClick={() => setIsModalOpen(true)} style={{ padding: '8px 16px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>+ NEW RESERVATION</button>
          </div>
        </div>
      </div>
      {isModalOpen && (<div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}><div style={{ background: '#121214', border: '1px solid #D4AF37', borderRadius: '14px', width: '100%', maxWidth: '400px', padding: '20px' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}><h3 style={{ margin: 0, color: '#F3E5AB', fontSize: '16px' }}>New Table Reservation</h3><button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}>✕</button></div><form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}><input type="text" required placeholder="Guest Name" value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px' }} /><div style={{ display: 'flex', gap: '10px' }}><input type="number" min="1" max="10" value={bookingData.guests} onChange={(e) => setBookingData({...bookingData, guests: e.target.value})} style={{ flex: 1, padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px' }} /><select value={bookingData.tableId} onChange={(e) => setBookingData({...bookingData, tableId: e.target.value})} style={{ flex: 1, padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px' }}>{tables.map(t => <option key={t.id} value={t.id}>Table {t.id} ({t.status})</option>)}</select></div><input type="text" value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})} style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px' }} /><button type="submit" style={{ marginTop: '8px', padding: '10px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Confirm Reservation</button></form></div></div>)}
    </div>
  );
}
