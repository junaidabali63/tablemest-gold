'use client';
import React, { useState, useEffect } from 'react';

export default function Page() {
  const initialTables = [
    { id: 'T1', top: '48%', left: '33%', status: 'Occupied', guests: 2, time: '35m', name: 'John Doe' },
    { id: 'T2', top: '56%', left: '42%', status: 'Available', seats: 4 },
    { id: 'T3', top: '43%', left: '67%', status: 'Occupied', guests: 4, time: '52m', name: 'Alexander' },
    { id: 'T4', top: '58%', left: '61%', status: 'Occupied', guests: 4, time: '20m', name: 'Sarah K.' },
    { id: 'T5', top: '65%', left: '52%', status: 'Occupied', guests: 2, time: '15m', name: 'Michael' },
    { id: 'T6', top: '48%', left: '77%', status: 'Reserved', time: '8:00 PM', name: 'David L.' },
    { id: 'T7', top: '56%', left: '86%', status: 'Reserved', time: '8:30 PM', name: 'Emma W.' },
  ];

  const [tables, setTables] = useState(initialTables);
  const [selectedTableId, setSelectedTableId] = useState('T3');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', guests: '2', time: '8:00 PM', tableId: 'T2' });
  const [revenue, setRevenue] = useState(4820);

  // Load from localStorage
  useEffect(()=>{
    const saved = localStorage.getItem('tablenest-tables');
    const savedRev = localStorage.getItem('tablenest-revenue');
    if(saved){ try{ setTables(JSON.parse(saved)) }catch{} }
    if(savedRev) setRevenue(Number(savedRev));
  },[]);

  // Save to localStorage
  useEffect(()=>{
    localStorage.setItem('tablenest-tables', JSON.stringify(tables));
    localStorage.setItem('tablenest-revenue', revenue.toString());
  },[tables,revenue]);

  // Auto revenue ticker
  useEffect(()=>{
    const i=setInterval(()=>{ if(tables.filter(t=>t.status==='Occupied').length>0) setRevenue(r=>r+Math.floor(Math.random()*3)) },3000);
    return()=>clearInterval(i);
  },[tables]);

  const selectedTable = tables.find(t => t.id === selectedTableId) || tables[0];

  const occupied = tables.filter(t=>t.status==='Occupied').length;
  const reserved = tables.filter(t=>t.status==='Reserved').length;
  const available = tables.filter(t=>t.status==='Available').length;
  const totalGuests = tables.reduce((s,t)=>s+(t.guests||0),0);
  const occupancyPct = Math.round((totalGuests/19)*100);

  const handleStatusChange = (newStatus) => {
    setTables(tables.map(t => t.id === selectedTableId? {...t, status: newStatus, guests: newStatus==='Available'?0:t.guests||2 } : t));
    if(newStatus==='Occupied' && selectedTable.status!=='Occupied') setRevenue(r=>r+85);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setTables(tables.map(t => t.id === bookingData.tableId? {...t, status: 'Reserved', guests: Number(bookingData.guests), time: bookingData.time, name: bookingData.name } : t));
    setIsModalOpen(false);
    setBookingData({ name: '', guests: '2', time: '8:00 PM', tableId: 'T2' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#F3E5AB', fontFamily: 'system-ui', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #222', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.1)' }}>💎</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', fontWeight: 'bold' }}>TableNest</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#888', letterSpacing: '1px' }}>PREMIUM HOSPITALITY SaaS • LIVE 3D • ${revenue.toLocaleString()}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#aaa', background: '#141414', padding: '6px 14px', borderRadius: '20px', border: '1px solid #2a2a2a' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#2ecc71', borderRadius: '50%', display: 'inline-block', boxShadow:'0 0 8px #2ecc71' }}></span>
          <span>LIVE • {occupancyPct}%</span>
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '10px' }}>
        <div style={{ position: 'relative', minWidth: '700px', width: '100%', maxWidth: '1100px', margin: '0 auto', borderRadius: '14px', border: '1px solid #333', boxShadow: '0 0 25px rgba(212,175,55,0.2)', background: '#0d0d0d', overflow:'hidden' }}>
          <img src="/hero-ultra.webp" alt="Floor" style={{ width: '100%', height: 'auto', display: 'block' }}/>

          {/* LEFT STATS OVERLAY - PREMIUM LIKE SCREENSHOT */}
          <div style={{ position: 'absolute', left: '12px', top: '12px', bottom: '12px', width: '155px', background: 'rgba(0,0,0,0.88)', backdropFilter:'blur(10px)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:'10px', padding:'10px', display:'flex', flexDirection:'column', gap:'8px', zIndex:20 }}>
            <div style={{ border:'1px solid #333', borderRadius:'8px', padding:'8px', background:'rgba(212,175,55,0.05)' }}>
              <div style={{fontSize:'8px', color:'#888', letterSpacing:'1px'}}>OCCUPANCY</div>
              <div style={{fontSize:'22px', fontWeight:900, color:'#D4AF37'}}>{occupancyPct}%</div>
              <div style={{fontSize:'8px', color:'#aaa'}}>{totalGuests} / 19 seats filled</div>
            </div>
            <div style={{ border:'1px solid #333', borderRadius:'8px', padding:'8px' }}>
              <div style={{fontSize:'8px', color:'#888'}}>REVENUE TODAY</div>
              <div style={{fontSize:'18px', fontWeight:900, color:'#D4AF37'}}>${revenue.toLocaleString()}</div>
              <div style={{fontSize:'8px', color:'#2ecc71'}}>+12.4% vs yesterday ↑</div>
            </div>
            <div style={{ border:'1px solid #333', borderRadius:'8px', padding:'8px' }}>
              <div style={{fontSize:'8px', color:'#888'}}>AVG TURN TIME</div>
              <div style={{fontSize:'16px', fontWeight:800, color:'#D4AF37'}}>48 min</div>
              <div style={{fontSize:'8px', color:'#aaa'}}>Target: &lt;60min ✓</div>
            </div>
            <div style={{ border:'1px solid #333', borderRadius:'8px', padding:'8px' }}>
              <div style={{fontSize:'8px', color:'#888', marginBottom:'4px'}}>TABLE STATUS</div>
              <div style={{fontSize:'9px', display:'flex', flexDirection:'column', gap:'2px'}}>
                <span>🟡 Occupied • {occupied}</span>
                <span>🔵 Reserved • {reserved}</span>
                <span>🟢 Available • {available}</span>
              </div>
            </div>
            <button onClick={()=>setIsModalOpen(true)} style={{ marginTop:'auto', padding:'8px', background:'linear-gradient(to right, #D4AF37, #AA771C)', color:'#000', fontWeight:'bold', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'10px' }}>+ NEW RESERVATION</button>
          </div>

          {tables.map((t) => {
            const isSelected = selectedTableId === t.id;
            const statusColor = t.status === 'Occupied'? '#D4AF37' : t.status === 'Reserved'? '#3b82f6' : '#10b981';
            return (
              <div key={t.id} onClick={() => setSelectedTableId(t.id)}
                style={{ position: 'absolute', top: t.top, left: t.left, transform: 'translate(-50%, -50%)', cursor: 'pointer', padding: '6px 12px', borderRadius: '20px', background: isSelected? statusColor : 'rgba(0, 0, 0, 0.9)', color: isSelected? '#000' : '#F3E5AB', border: `1.5px solid ${statusColor}`, fontSize: '10px', fontWeight: 'bold', boxShadow: isSelected? `0 0 18px ${statusColor}` : '0 4px 12px rgba(0,0,0,0.9)', whiteSpace: 'nowrap', zIndex: 10, transition: 'all 0.2s' }}>
                {t.id} • {t.status} {t.guests? `(${t.guests})` : ''}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '1100px', background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px 20px', marginTop: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>MANAGE SELECTED TABLE</span>
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Table {selectedTable.id}</span>
            <span style={{ fontSize: '12px', color: '#aaa', marginLeft: '10px' }}>Current: <b style={{ color: selectedTable.status === 'Occupied'? '#D4AF37' : selectedTable.status === 'Reserved'? '#3b82f6' : '#10b981' }}>{selectedTable.status}</b></span>
            {selectedTable.name && <span style={{ fontSize: '11px', color: '#888', display: 'block', marginTop: '2px' }}>Reserved for: {selectedTable.name} ({selectedTable.guests} Guests) • {selectedTable.time}</span>}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => handleStatusChange('Occupied')} style={{ padding: '8px 12px', background: 'rgba(212,175,55,0.15)', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>Mark Occupied</button>
            <button onClick={() => handleStatusChange('Reserved')} style={{ padding: '8px 12px', background: 'rgba(59,130,246,0.15)', border: '1px solid #3b82f6', color: '#60a5fa', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>Mark Reserved</button>
            <button onClick={() => handleStatusChange('Available')} style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#34d399', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>Mark Available</button>
            <button onClick={() => setIsModalOpen(true)} style={{ padding: '8px 16px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>+ NEW RESERVATION</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: '#121214', border: '1px solid #D4AF37', borderRadius: '14px', width: '100%', maxWidth: '400px', padding: '20px', boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#F3E5AB', fontSize: '16px' }}>New Table Reservation</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div><label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Guest Name</label>
              <input type="text" required placeholder="e.g. John Doe" value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}/></div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}><label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Guests</label>
                <input type="number" min="1" max="10" value={bookingData.guests} onChange={(e) => setBookingData({...bookingData, guests: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}/></div>
                <div style={{ flex: 1 }}><label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Table</label>
                <select value={bookingData.tableId} onChange={(e) => setBookingData({...bookingData, tableId: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}>
                  {tables.map(t => <option key={t.id} value={t.id}>Table {t.id} ({t.status})</option>)}</select></div>
              </div>
              <div><label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Reservation Time</label>
              <input type="text" value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}/></div>
              <button type="submit" style={{ marginTop: '8px', padding: '10px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Confirm Reservation</button>
            </form>
          </div>
        </div>
      )}
      <p style={{ fontSize: '11px', color: '#777', marginTop: '12px', textAlign: 'center' }}>Swipe left/right to view full floor plan • Tap any table to manage status • Data auto-saves</p>
    </div>
  );
}
