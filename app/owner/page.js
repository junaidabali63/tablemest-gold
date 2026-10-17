'use client';
import React, { useState } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState('floor'); // 'floor', 'order', 'kitchen', 'settings'
  const [password, setPassword] = useState('admin123');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');

  const [tables, setTables] = useState([
    { id: 'T1', top: '48%', left: '33%', status: 'Occupied', orderState: 'Served', payment: 'Paid', guests: 2, name: 'John Doe' },
    { id: 'T2', top: '56%', left: '42%', status: 'Available', orderState: 'None', payment: 'Unpaid' },
    { id: 'T3', top: '43%', left: '67%', status: 'Occupied', orderState: 'Cooking', payment: 'Unpaid', guests: 4, name: 'Alexander' },
    { id: 'T4', top: '58%', left: '61%', status: 'Occupied', orderState: 'Ready to Serve', payment: 'Paid', guests: 4, name: 'Sarah K.' },
    { id: 'T5', top: '65%', left: '52%', status: 'Occupied', orderState: 'Ordering', payment: 'Unpaid', guests: 2, name: 'Michael' },
    { id: 'T6', top: '48%', left: '77%', status: 'Reserved', orderState: 'None', payment: 'Unpaid', time: '8:00 PM', name: 'David L.' },
    { id: 'T7', top: '56%', left: '86%', status: 'Reserved', orderState: 'None', payment: 'Unpaid', time: '8:30 PM', name: 'Emma W.' },
  ]);

  const [selectedTableId, setSelectedTableId] = useState('T3');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', guests: '2', time: '8:00 PM', tableId: 'T2' });

  const selectedTable = tables.find(t => t.id === selectedTableId) || tables[0];

  const handleStatusChange = (status, orderState, payment) => {
    setTables(tables.map(t => t.id === selectedTableId ? { ...t, status, orderState, payment } : t));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setTables(tables.map(t => t.id === bookingData.tableId ? { ...t, status: 'Reserved', guests: bookingData.guests, time: bookingData.time, name: bookingData.name, orderState: 'None' } : t));
    setIsModalOpen(false);
    setBookingData({ name: '', guests: '2', time: '8:00 PM', tableId: 'T2' });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setPassMsg('Password must be at least 4 characters.');
      return;
    }
    setPassword(newPassword);
    setNewPassword('');
    setPassMsg('Password updated successfully!');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#F3E5AB', fontFamily: 'sans-serif', padding: '16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* TOP NAVIGATION BAR */}
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #222', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', fontWeight: 'bold', fontSize: '18px' }}>
            💎
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', color: '#F3E5AB', fontWeight: 'bold' }}>TableNest</h1>
            <p style={{ margin: 0, fontSize: '9px', color: '#888', letterSpacing: '1px' }}>PREMIUM HOSPITALITY SaaS • OWNER DASHBOARD</p>
          </div>
        </div>

        {/* TOP MENU SWITCH BUTTONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('floor')} style={{ padding: '6px 14px', background: activeTab === 'floor' ? '#D4AF37' : '#141414', color: activeTab === 'floor' ? '#000' : '#F3E5AB', border: '1px solid #D4AF37', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
            LIVE 3D OPS
          </button>
          <button onClick={() => setActiveTab('order')} style={{ padding: '6px 14px', background: activeTab === 'order' ? '#D4AF37' : '#141414', color: activeTab === 'order' ? '#000' : '#F3E5AB', border: '1px solid #D4AF37', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
            ORDERS
          </button>
          <button onClick={() => setActiveTab('kitchen')} style={{ padding: '6px 14px', background: activeTab === 'kitchen' ? '#D4AF37' : '#141414', color: activeTab === 'kitchen' ? '#000' : '#F3E5AB', border: '1px solid #D4AF37', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
            KITCHEN
          </button>
          <button onClick={() => setActiveTab('settings')} style={{ padding: '6px 14px', background: activeTab === 'settings' ? '#D4AF37' : '#141414', color: activeTab === 'settings' ? '#000' : '#F3E5AB', border: '1px solid #D4AF37', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
            ⚙️ SETTINGS
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#2ecc71', background: '#141414', padding: '6px 12px', borderRadius: '20px', border: '1px solid #2a2a2a' }}>
            <span style={{ width: '7px', height: '7px', backgroundColor: '#2ecc71', borderRadius: '50%', display: 'inline-block' }}></span>
            <span>LIVE</span>
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDERING BASED ON ACTIVE TAB */}
      {activeTab === 'settings' ? (
        /* OWNER SETTINGS PANEL */
        <div style={{ width: '100%', maxWidth: '600px', background: '#111', border: '1px solid #D4AF37', borderRadius: '14px', padding: '24px', marginTop: '20px', boxShadow: '0 0 25px rgba(212,175,55,0.2)' }}>
          <h2 style={{ color: '#F3E5AB', fontSize: '18px', marginTop: 0, marginBottom: '8px' }}>Owner Security & Settings</h2>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>Manage your dashboard password and restaurant security preferences.</p>
          
          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Current Password</label>
              <input type="password" disabled value={password} style={{ width: '100%', padding: '10px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#888', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '6px' }}>New Admin Password</label>
              <input 
                type="password" 
                required 
                placeholder="Enter new password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #D4AF37', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} 
              />
            </div>
            <button type="submit" style={{ padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', marginTop: '6px' }}>
              Update Password
            </button>
            {passMsg && <p style={{ fontSize: '12px', color: passMsg.includes('success') ? '#2ecc71' : '#e74c3c', margin: '4px 0 0 0' }}>{passMsg}</p>}
          </form>
        </div>
      ) : activeTab === 'order' ? (
        /* ORDERS MANAGEMENT TAB */
        <div style={{ width: '100%', maxWidth: '1200px', background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '20px' }}>
          <h2 style={{ color: '#F3E5AB', fontSize: '18px', marginTop: 0 }}>Active Orders & Payment Tracking</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '16px' }}>
            {tables.filter(t => t.status === 'Occupied').map(t => (
              <div key={t.id} style={{ background: '#161618', border: '1px solid #333', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <b style={{ color: '#D4AF37', fontSize: '15px' }}>Table {t.id} ({t.name || 'Guest'})</b>
                  <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '10px', background: t.payment === 'Paid' ? 'rgba(46,204,113,0.2)' : 'rgba(231,76,60,0.2)', color: t.payment === 'Paid' ? '#2ecc71' : '#e74c3c' }}>{t.payment}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#ccc', margin: '4px 0' }}>Order State: <b style={{ color: '#F3E5AB' }}>{t.orderState}</b></p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  <button onClick={() => setTables(tables.map(item => item.id === t.id ? { ...item, orderState: 'Served', payment: 'Paid' } : item))} style={{ flex: 1, padding: '6px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Mark Paid & Served
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'kitchen' ? (
        /* KITCHEN KOT VIEW */
        <div style={{ width: '100%', maxWidth: '1200px', background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '20px' }}>
          <h2 style={{ color: '#F3E5AB', fontSize: '18px', marginTop: 0 }}>Kitchen Orders (KOT Live)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '16px' }}>
            {tables.filter(t => t.orderState === 'Cooking' || t.orderState === 'Ordering').map(t => (
              <div key={t.id} style={{ background: '#1a140b', border: '1px solid #D4AF37', borderRadius: '10px', padding: '14px' }}>
                <b style={{ color: '#F3E5AB', fontSize: '15px' }}>Table {t.id} — Status: {t.orderState}</b>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '6px 0' }}>Items: Premium Steak, Truffle Pasta, Gold Wine</p>
                <button onClick={() => setTables(tables.map(item => item.id === t.id ? { ...item, orderState: 'Ready to Serve' } : item))} style={{ width: '100%', marginTop: '8px', padding: '8px', background: '#2ecc71', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>
                  Mark Ready to Serve 🚀
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* MAIN OWNER 3D DESKTOP & MOBILE DASHBOARD (REFERENCE MATCH) */
        <div style={{ width: '100%', maxWidth: '1200px', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
          
          {/* LEFT REALTIME ANALYTICS PANEL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#111', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', padding: '18px', boxSizing: 'border-box' }}>
            
            <div>
              <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>OCCUPANCY</span>
              <h2 style={{ margin: 0, fontSize: '32px', color: '#F3E5AB', fontWeight: '800' }}>62%</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#888' }}>12 / 19 seats filled</p>
            </div>

            <div style={{ borderTop: '1px solid #222', paddingTop: '12px' }}>
              <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>REVENUE TODAY</span>
              <h2 style={{ margin: 0, fontSize: '28px', color: '#F3E5AB', fontWeight: '800' }}>$4,820</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#2ecc71' }}>+12.4% vs yesterday ↑</p>
            </div>

            <div style={{ borderTop: '1px solid #222', paddingTop: '12px' }}>
              <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>AVG TURN TIME</span>
              <h2 style={{ margin: 0, fontSize: '26px', color: '#F3E5AB', fontWeight: '800' }}>48 min</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#2ecc71' }}>Target: &lt;60min ✓</p>
            </div>

            <div style={{ borderTop: '1px solid #222', paddingTop: '12px' }}>
              <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>TABLE STATUS</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#ccc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟡 Occupied</span> <b>5</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🔵 Reserved</span> <b>2</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟢 Available</span> <b>1</b></div>
              </div>
            </div>

            <button onClick={() => setIsModalOpen(true)} style={{ width: '100%', padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', marginTop: '4px' }}>
              + NEW RESERVATION
            </button>

            {/* SELECTED TABLE LIVE DETAIL & CONTROLS */}
            <div style={{ background: '#16130b', border: '1px solid #D4AF37', borderRadius: '10px', padding: '12px', marginTop: '4px' }}>
              <span style={{ fontSize: '9px', color: '#D4AF37', letterSpacing: '1px', display: 'block' }}>SELECTED TABLE: {selectedTable.id}</span>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#F3E5AB', margin: '4px 0' }}>{selectedTable.status} {selectedTable.name ? `• ${selectedTable.name}` : ''}</div>
              <div style={{ fontSize: '11px', color: '#bbb' }}>Order: <span style={{ color: '#D4AF37' }}>{selectedTable.orderState}</span> | Payment: <span style={{ color: selectedTable.payment === 'Paid' ? '#2ecc71' : '#e74c3c' }}>{selectedTable.payment}</span></div>
              
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                <button onClick={() => handleStatusChange('Occupied', 'Ordering', 'Unpaid')} style={{ flex: 1, padding: '6px', background: 'rgba(212,175,55,0.2)', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', fontSize: '9px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Occupied
                </button>
                <button onClick={() => handleStatusChange('Occupied', 'Served', 'Paid')} style={{ flex: 1, padding: '6px', background: 'rgba(46,204,113,0.2)', border: '1px solid #2ecc71', color: '#2ecc71', borderRadius: '6px', fontSize: '9px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Serve & Paid
                </button>
                <button onClick={() => handleStatusChange('Available', 'None', 'Unpaid')} style={{ flex: 1, padding: '6px', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#34d399', borderRadius: '6px', fontSize: '9px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Clear
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT 3D FLOOR PLAN CONTAINER WITH SCROLL FOR MOBILE */}
          <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', background: '#0d0d0d', border: '1px solid #222', borderRadius: '14px', padding: '14px', boxSizing: 'border-box' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#F3E5AB' }}>RESTAURANT OPS • 3D FLOOR</span>
              <span style={{ fontSize: '10px', color: '#888' }}>Swipe left/right on mobile</span>
            </div>

            <div style={{ position: 'relative', minWidth: '650px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
              <img 
                src="/hero-ultra.webp" 
                alt="TableNest 3D View" 
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
                      padding: '5px 10px',
                      borderRadius: '16px',
                      background: isSelected ? statusColor : 'rgba(0, 0, 0, 0.88)',
                      color: isSelected ? '#000' : '#F3E5AB',
                      border: `1px solid ${statusColor}`,
                      fontSize: '9px',
                      fontWeight: 'bold',
                      boxShadow: isSelected ? `0 0 15px ${statusColor}` : '0 3px 8px rgba(0,0,0,0.9)',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      transition: 'all 0.2s'
                    }}
                  >
                    {t.id} • {t.status} {t.orderState !== 'None' ? `[${t.orderState}]` : ''}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* NEW RESERVATION MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: '#121214', border: '1px solid #D4AF37', borderRadius: '14px', width: '100%', maxWidth: '400px', padding: '20px', boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#F3E5AB', fontSize: '16px' }}>New Table Reservation</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>

            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Guest Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. John Doe" 
                  value={bookingData.name} 
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Guests</label>
                  <input 
                    type="number" 
                    min="1" max="10" 
                    value={bookingData.guests} 
                    onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Table</label>
                  <select 
                    value={bookingData.tableId} 
                    onChange={(e) => setBookingData({ ...bookingData, tableId: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                  >
                    {tables.map(t => <option key={t.id} value={t.id}>Table {t.id} ({t.status})</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Reservation Time</label>
                <input 
                  type="text" 
                  value={bookingData.time} 
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                />
              </div>

              <button type="submit" style={{ marginTop: '8px', padding: '10px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                Confirm Reservation
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
