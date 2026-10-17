'use client';
import React, { useState } from 'react';

export default function TableNestSaaS() {
  // Navigation & Access States
  const [currentRole, setCurrentRole] = useState('landing'); // 'landing', 'saas_admin', 'owner', 'waiter', 'kitchen'
  
  // Passwords
  const [saasAdminPass, setSaasAdminPass] = useState('saas2026');
  const [hotelOwnerPass, setHotelOwnerPass] = useState('admin123');
  
  // Auth Modal State
  const [authModal, setAuthModal] = useState(null); // 'saas_admin' or 'owner'
  const [passInput, setPassInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Subscription Active Status
  const [subscription, setSubscription] = useState({ plan: 'Free Trial', active: true });

  // SaaS Super Admin Data (Platform Level)
  const [hotelsList] = useState([
    { id: 1, name: 'The Grand Palace Hotel', plan: 'Gold Monthly ($299)', status: 'Active', joined: '2026-10-10' },
    { id: 2, name: 'Truffle & Wine Lounge', plan: 'Enterprise Annual ($2499)', status: 'Active', joined: '2026-09-15' },
    { id: 3, name: 'Skyline Bistro', plan: '1 Week Free Trial', status: 'Trial', joined: '2026-10-16' },
    { id: 4, name: 'Aroma Fine Dining', plan: 'Platinum Quarterly ($799)', status: 'Active', joined: '2026-08-01' },
  ]);

  // Shared Hotel Operations State (Tables, Orders, Bills, KOT)
  const [tables, setTables] = useState([
    { id: 'T1', top: '48%', left: '33%', status: 'Occupied', type: 'Dine-In', guest: 'John Doe', items: [{ name: 'Wagyu Ribeye Steak', price: 85 }, { name: 'Vintage Gold Wine', price: 150 }], orderState: 'Served', payment: 'Paid' },
    { id: 'T2', top: '56%', left: '42%', status: 'Available', type: 'Dine-In', guest: '', items: [], orderState: 'None', payment: 'Unpaid' },
    { id: 'T3', top: '43%', left: '67%', status: 'Occupied', type: 'Dine-In', guest: 'Alexander', items: [{ name: 'Truffle Lobster Pasta', price: 75 }], orderState: 'Cooking', payment: 'Unpaid' },
    { id: 'T4', top: '58%', left: '61%', status: 'Occupied', type: 'Parcel', guest: 'Sarah K.', items: [{ name: 'Black Caviar Starter', price: 110 }], orderState: 'Ready to Serve', payment: 'Paid' },
    { id: 'T5', top: '65%', left: '52%', status: 'Occupied', type: 'Dine-In', guest: 'Michael', items: [{ name: 'Chef Signature Combo', price: 130 }], orderState: 'Ordering', payment: 'Unpaid' },
    { id: 'T6', top: '48%', left: '77%', status: 'Reserved', type: 'Dine-In', guest: 'David L.', items: [], orderState: 'None', payment: 'Unpaid', time: '8:00 PM' },
    { id: 'T7', top: '56%', left: '86%', status: 'Reserved', type: 'Dine-In', guest: 'Emma W.', items: [], orderState: 'None', payment: 'Unpaid', time: '8:30 PM' },
  ]);

  // Waiter Order Form
  const [orderForm, setOrderForm] = useState({ tableId: 'T2', guestName: '', orderType: 'Dine-In', itemName: 'Wagyu Ribeye Steak', itemPrice: 85 });

  // Settings State
  const [newOwnerPassInput, setNewOwnerPassInput] = useState('');
  const [settingsMsg, setSettingsMsg] = useState('');

  // Handle Protected Login
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    if (authModal === 'saas_admin') {
      if (passInput === saasAdminPass) {
        setCurrentRole('saas_admin');
        setAuthModal(null);
        setPassInput('');
      } else {
        setAuthError('Invalid SaaS Super-Admin Password!');
      }
    } else if (authModal === 'owner') {
      if (passInput === hotelOwnerPass) {
        setCurrentRole('owner');
        setAuthModal(null);
        setPassInput('');
      } else {
        setAuthError('Invalid Hotel Owner Password!');
      }
    }
  };

  // Waiter Order Placement Handler
  const handleWaiterPlaceOrder = (e) => {
    e.preventDefault();
    setTables(tables.map(t => {
      if (t.id === orderForm.tableId) {
        const newItem = { name: orderForm.itemName, price: Number(orderForm.itemPrice) };
        return {
          ...t,
          status: 'Occupied',
          type: orderForm.orderType,
          guest: orderForm.guestName || 'Walk-in Guest',
          items: [...t.items, newItem],
          orderState: 'Cooking',
          payment: 'Unpaid'
        };
      }
      return t;
    }));
    alert(`Order successfully sent to Kitchen for ${orderForm.tableId}! 🔔`);
    setOrderForm({ tableId: 'T2', guestName: '', orderType: 'Dine-In', itemName: 'Wagyu Ribeye Steak', itemPrice: 85 });
  };

  // Password Update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newOwnerPassInput.length < 4) {
      setSettingsMsg('Password must be at least 4 characters long.');
      return;
    }
    setHotelOwnerPass(newOwnerPassInput);
    setNewOwnerPassInput('');
    setSettingsMsg('Owner Password successfully updated!');
  };

  // Calculation Helpers
  const totalOccupiedBill = tables.reduce((sum, t) => sum + t.items.reduce((iSum, i) => iSum + i.price, 0), 0);
  const totalRevenue = 5480 + totalOccupiedBill;
  const netProfit = Math.round(totalRevenue * 0.42); // 42% Profit

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#F3E5AB', fontFamily: 'sans-serif', padding: '16px', boxSizing: 'border-box' }}>
      
      {/* GLOBAL BRAND HEADER & ROLE ACCESS SWITCHER */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 16px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setCurrentRole('landing')}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', fontWeight: 'bold', fontSize: '18px' }}>💎</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', color: '#F3E5AB', fontWeight: 'bold' }}>TableNest</h1>
            <p style={{ margin: 0, fontSize: '9px', color: '#888', letterSpacing: '1px' }}>LUXURY 3D HOSPITALITY SaaS</p>
          </div>
        </div>

        {/* Portal Access Quick Selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {currentRole !== 'landing' && (
            <button onClick={() => setCurrentRole('landing')} style={{ padding: '6px 12px', background: '#181818', border: '1px solid #333', color: '#aaa', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>
              🏠 Landing Page
            </button>
          )}

          {/* Role Badges & Buttons */}
          {currentRole === 'owner' && (
            <>
              <button onClick={() => setCurrentRole('waiter')} style={{ padding: '6px 12px', background: 'rgba(59,130,246,0.15)', border: '1px solid #3b82f6', color: '#60a5fa', borderRadius: '6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Open Waiter Portal 📱
              </button>
              <button onClick={() => setCurrentRole('kitchen')} style={{ padding: '6px 12px', background: 'rgba(230,126,34,0.15)', border: '1px solid #e67e22', color: '#f39c12', borderRadius: '6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                Open Kitchen KOT 🍳
              </button>
            </>
          )}

          {currentRole === 'landing' ? (
            <>
              <button onClick={() => setAuthModal('owner')} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
                Hotel Owner Login 🔑
              </button>
              <button onClick={() => setAuthModal('saas_admin')} style={{ padding: '6px 14px', background: '#D4AF37', border: 'none', color: '#000', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
                SaaS Super-Admin 👑
              </button>
            </>
          ) : (
            <button onClick={() => setCurrentRole('landing')} style={{ padding: '6px 14px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
              Logout 🔒
            </button>
          )}
        </div>
      </div>

      {/* ================= 1. LANDING & SUBSCRIPTION PAGE ================= */}
      {currentRole === 'landing' && (
        <div style={{ maxWidth: '1100px', margin: '30px auto', textAlign: 'center' }}>
          <span style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid #D4AF37', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', color: '#D4AF37', fontWeight: 'bold' }}>
            NEXT-GEN HOSPITALITY OPERATING SYSTEM
          </span>
          <h2 style={{ fontSize: '36px', color: '#F3E5AB', margin: '20px 0 10px 0' }}>The Ultimate 3D Restaurant Operations Platform</h2>
          <p style={{ fontSize: '13px', color: '#aaa', maxWidth: '720px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
            TableNest empowers modern hotel and restaurant owners with real-time 3D floor management, instant waiter ordering, synchronized kitchen KOT dispatch, parcel tracking, and accurate revenue intelligence.
          </p>

          {/* Direct Demo Portal Jump Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <button onClick={() => setAuthModal('owner')} style={{ padding: '10px 20px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
              Owner Portal (Password Protected)
            </button>
            <button onClick={() => setCurrentRole('waiter')} style={{ padding: '10px 20px', background: '#161618', border: '1px solid #3b82f6', color: '#60a5fa', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
              Waiter Portal (Direct Access)
            </button>
            <button onClick={() => setCurrentRole('kitchen')} style={{ padding: '10px 20px', background: '#161618', border: '1px solid #e67e22', color: '#f39c12', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
              Kitchen KOT Portal (Direct Access)
            </button>
          </div>

          {/* Pricing Plans */}
          <h3 style={{ fontSize: '22px', color: '#F3E5AB', marginBottom: '20px' }}>Subscription Pricing Tiers</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', textAlign: 'left' }}>
            <div style={{ background: '#111', border: '1px solid #D4AF37', borderRadius: '12px', padding: '20px' }}>
              <span style={{ fontSize: '9px', color: '#D4AF37', fontWeight: 'bold' }}>STARTER</span>
              <h4 style={{ fontSize: '18px', color: '#F3E5AB', margin: '6px 0' }}>1 Week Free Trial</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>$0 <span style={{ fontSize: '10px', color: '#888' }}>/7 days</span></p>
              <p style={{ fontSize: '11px', color: '#aaa', minHeight: '40px' }}>Full access to 3D floor map, waiter screen, and kitchen alerts.</p>
              <button onClick={() => { setSubscription({ plan: 'Free Trial', active: true }); setAuthModal('owner'); }} style={{ width: '100%', marginTop: '12px', padding: '10px', background: '#D4AF37', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                Activate 7-Day Trial
              </button>
            </div>

            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '20px' }}>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 'bold' }}>POPULAR</span>
              <h4 style={{ fontSize: '18px', color: '#F3E5AB', margin: '6px 0' }}>Gold Monthly</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>$299 <span style={{ fontSize: '10px', color: '#888' }}>/month</span></p>
              <p style={{ fontSize: '11px', color: '#aaa', minHeight: '40px' }}>Multi-staff syncing, unlimited waiter laptops, priority KOT alerts.</p>
              <button onClick={() => { setSubscription({ plan: 'Gold Monthly', active: true }); setAuthModal('owner'); }} style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                Subscribe Gold
              </button>
            </div>

            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '20px' }}>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 'bold' }}>PRO</span>
              <h4 style={{ fontSize: '18px', color: '#F3E5AB', margin: '6px 0' }}>Platinum Quarterly</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>$799 <span style={{ fontSize: '10px', color: '#888' }}>/3 months</span></p>
              <p style={{ fontSize: '11px', color: '#aaa', minHeight: '40px' }}>Custom 3D floor map design, revenue forecasting, VIP support.</p>
              <button onClick={() => { setSubscription({ plan: 'Platinum Quarterly', active: true }); setAuthModal('owner'); }} style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                Subscribe Platinum
              </button>
            </div>

            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '20px' }}>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 'bold' }}>VIP ENTERPRISE</span>
              <h4 style={{ fontSize: '18px', color: '#F3E5AB', margin: '6px 0' }}>Annual Enterprise</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>$2,499 <span style={{ fontSize: '10px', color: '#888' }}>/year</span></p>
              <p style={{ fontSize: '11px', color: '#aaa', minHeight: '40px' }}>Dedicated cloud server, multi-branch hotel chain support.</p>
              <button onClick={() => { setSubscription({ plan: 'Annual Enterprise', active: true }); setAuthModal('owner'); }} style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                Subscribe Enterprise
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. SAAS SUPER-ADMIN SCREEN (Platform Owner) ================= */}
      {currentRole === 'saas_admin' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto' }}>
          <div style={{ background: '#111', border: '1px solid #D4AF37', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
            <h2 style={{ color: '#F3E5AB', fontSize: '20px', marginTop: 0 }}>👑 SaaS Provider Master Dashboard</h2>
            <p style={{ fontSize: '11px', color: '#888' }}>Overview of all platform subscriptions, active hotel clients, and monthly SaaS revenue (MRR).</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '16px' }}>
              <div style={{ background: '#161618', padding: '14px', borderRadius: '10px', border: '1px solid #333' }}>
                <span style={{ fontSize: '10px', color: '#888' }}>TOTAL SUBSCRIBED HOTELS</span>
                <h3 style={{ fontSize: '28px', color: '#F3E5AB', margin: '4px 0 0 0' }}>{hotelsList.length}</h3>
              </div>
              <div style={{ background: '#161618', padding: '14px', borderRadius: '10px', border: '1px solid #333' }}>
                <span style={{ fontSize: '10px', color: '#888' }}>MONTHLY RECURRING REVENUE (MRR)</span>
                <h3 style={{ fontSize: '28px', color: '#2ecc71', margin: '4px 0 0 0' }}>$8,420</h3>
              </div>
              <div style={{ background: '#161618', padding: '14px', borderRadius: '10px', border: '1px solid #333' }}>
                <span style={{ fontSize: '10px', color: '#888' }}>ACTIVE TRIALS</span>
                <h3 style={{ fontSize: '28px', color: '#60a5fa', margin: '4px 0 0 0' }}>{hotelsList.filter(h => h.status === 'Trial').length}</h3>
              </div>
            </div>
          </div>

          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '14px', padding: '20px' }}>
            <h3 style={{ color: '#F3E5AB', fontSize: '16px', marginTop: 0, marginBottom: '12px' }}>Active Hotel Accounts Directory</h3>
            <p style={{ fontSize: '11px', color: '#888', marginBottom: '14px' }}>🔒 Strict Privacy Enforcement: Hotel daily sales and customer receipts are isolated and remain invisible to the SaaS provider.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {hotelsList.map(h => (
                <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#161618', padding: '12px 16px', borderRadius: '8px', border: '1px solid #2a2a2a' }}>
                  <div>
                    <b style={{ color: '#F3E5AB', fontSize: '14px' }}>{h.name}</b>
                    <span style={{ fontSize: '10px', color: '#888', display: 'block' }}>Subscribed Date: {h.joined}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#D4AF37', background: 'rgba(212,175,55,0.1)', padding: '4px 10px', borderRadius: '6px' }}>{h.plan}</span>
                    <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', background: h.status === 'Active' ? 'rgba(46,204,113,0.2)' : 'rgba(59,130,246,0.2)', color: h.status === 'Active' ? '#2ecc71' : '#60a5fa' }}>{h.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. HOTEL OWNER SCREEN ================= */}
      {currentRole === 'owner' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
          
          {/* Left Revenue & Operations Control */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#111', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', padding: '18px' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>TOTAL REVENUE TODAY</span>
              <h2 style={{ margin: '4px 0 0 0', fontSize: '32px', color: '#F3E5AB', fontWeight: '800' }}>${totalRevenue.toLocaleString()}</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#2ecc71' }}>Estimated Net Profit: <b>${netProfit.toLocaleString()} (42%)</b></p>
            </div>

            <div style={{ borderTop: '1px solid #222', paddingTop: '10px' }}>
              <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>ACTIVE PLAN</span>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#D4AF37', marginTop: '2px' }}>{subscription.plan}</div>
            </div>

            <div style={{ borderTop: '1px solid #222', paddingTop: '10px' }}>
              <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>REALTIME TABLE STATUS</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#ccc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟡 Occupied</span> <b>{tables.filter(t => t.status === 'Occupied').length}</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🔵 Reserved</span> <b>{tables.filter(t => t.status === 'Reserved').length}</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟢 Available</span> <b>{tables.filter(t => t.status === 'Available').length}</b></div>
              </div>
            </div>

            {/* Change Owner Password Settings */}
            <div style={{ borderTop: '1px solid #222', paddingTop: '12px' }}>
              <span style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>⚙️ CHANGE OWNER PASSWORD</span>
              <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  type="password" 
                  required 
                  placeholder="Enter New Password" 
                  value={newOwnerPassInput} 
                  onChange={(e) => setNewOwnerPassInput(e.target.value)}
                  style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '11px', boxSizing: 'border-box' }}
                />
                <button type="submit" style={{ padding: '8px', background: '#D4AF37', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                  Update Security Password
                </button>
                {settingsMsg && <p style={{ fontSize: '10px', color: settingsMsg.includes('success') ? '#2ecc71' : '#e74c3c', margin: 0 }}>{settingsMsg}</p>}
              </form>
            </div>
          </div>

          {/* Right 3D Luxury Floor View */}
          <div style={{ width: '100%', overflowX: 'auto', background: '#0d0d0d', border: '1px solid #222', borderRadius: '14px', padding: '14px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#F3E5AB' }}>OWNER LIVE 3D FLOOR OPERATIONS</span>
              <span style={{ fontSize: '10px', color: '#888' }}>Swipe left/right on mobile</span>
            </div>

            <div style={{ position: 'relative', minWidth: '700px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
              <img src="/hero-ultra.webp" alt="3D Floor Plan" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />

              {tables.map(t => {
                const statusColor = t.status === 'Occupied' ? '#D4AF37' : t.status === 'Reserved' ? '#3b82f6' : '#10b981';
                const bill = t.items.reduce((s, i) => s + i.price, 0);
                return (
                  <div key={t.id} style={{ position: 'absolute', top: t.top, left: t.left, transform: 'translate(-50%, -50%)', padding: '6px 10px', borderRadius: '16px', background: 'rgba(0,0,0,0.9)', color: '#F3E5AB', border: `1px solid ${statusColor}`, fontSize: '9px', fontWeight: 'bold', boxShadow: `0 0 10px ${statusColor}`, whiteSpace: 'nowrap' }}>
                    {t.id} • {t.status} [{t.type}]
                    <div style={{ fontSize: '8px', color: '#aaa', marginTop: '2px' }}>
                      Status: {t.orderState} {bill > 0 ? `| Bill: $${bill}` : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ================= 4. WAITER / ORDER TAKER SCREEN ================= */}
      {currentRole === 'waiter' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          {/* Waiter Laptop Order Placement Form */}
          <div style={{ background: '#111', border: '1px solid #3b82f6', borderRadius: '14px', padding: '20px' }}>
            <h2 style={{ color: '#60a5fa', fontSize: '18px', marginTop: 0 }}>📱 Waiter Order Terminal</h2>
            <p style={{ fontSize: '11px', color: '#888' }}>Take orders manually from customers and dispatch instantly to Kitchen KOT.</p>

            <form onSubmit={handleWaiterPlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Select Table Number</label>
                <select value={orderForm.tableId} onChange={(e) => setOrderForm({ ...orderForm, tableId: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}>
                  {tables.map(t => <option key={t.id} value={t.id}>Table {t.id} ({t.status})</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Customer / Guest Name</label>
                <input type="text" placeholder="e.g. Mr. Robert" value={orderForm.guestName} onChange={(e) => setOrderForm({ ...orderForm, guestName: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Dining Option</label>
                <select value={orderForm.orderType} onChange={(e) => setOrderForm({ ...orderForm, orderType: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}>
                  <option value="Dine-In">🍽️ Dine-In Table</option>
                  <option value="Parcel">🛍️ Parcel / Takeaway</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Menu Item</label>
                  <input type="text" value={orderForm.itemName} onChange={(e) => setOrderForm({ ...orderForm, itemName: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Price ($)</label>
                  <input type="number" value={orderForm.itemPrice} onChange={(e) => setOrderForm({ ...orderForm, itemPrice: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <button type="submit" style={{ padding: '12px', background: '#3b82f6', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', marginTop: '6px' }}>
                Place Order & Dispatch to Kitchen 🚀
              </button>
            </form>
          </div>

          {/* Active Tables & Live Bill Tracking */}
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '14px', padding: '20px' }}>
            <h3 style={{ color: '#F3E5AB', fontSize: '16px', marginTop: 0, marginBottom: '14px' }}>Live Order Status & Total Bill</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tables.filter(t => t.status === 'Occupied').map(t => {
                const subtotal = t.items.reduce((s, i) => s + i.price, 0);
                return (
                  <div key={t.id} style={{ background: '#161618', border: '1px solid #333', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <b style={{ color: '#D4AF37', fontSize: '14px' }}>Table {t.id} ({t.guest})</b>
                      <span style={{ fontSize: '10px', background: 'rgba(212,175,55,0.1)', color: '#D4AF37', padding: '3px 8px', borderRadius: '6px' }}>{t.type}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#aaa', margin: '6px 0' }}>
                      Kitchen Status: <b style={{ color: t.orderState === 'Ready to Serve' ? '#2ecc71' : '#f39c12' }}>{t.orderState}</b>
                    </div>
                    <div style={{ fontSize: '12px', color: '#fff', fontWeight: 'bold', borderTop: '1px dashed #333', paddingTop: '6px', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Calculated Bill Total:</span>
                      <span style={{ color: '#2ecc71' }}>${subtotal}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ================= 5. KITCHEN KOT SCREEN ================= */}
      {currentRole === 'kitchen' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ background: '#111', border: '1px solid #e67e22', borderRadius: '14px', padding: '20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ color: '#f39c12', fontSize: '20px', margin: 0 }}>🍳 Kitchen Order Tickets (KOT Screen)</h2>
                <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0 0' }}>Live incoming orders with audio bell notifications.</p>
              </div>
              <button onClick={() => alert('🔔 Simulated KOT Order Bell Sound Ringing!')} style={{ padding: '8px 14px', background: '#e67e22', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                Test Bell Sound 🔔
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {tables.filter(t => t.orderState === 'Cooking' || t.orderState === 'Ordering' || t.orderState === 'Ready to Serve').map(t => (
              <div key={t.id} style={{ background: '#16130e', border: t.orderState === 'Ready to Serve' ? '1px solid #2ecc71' : '1px solid #e67e22', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <b style={{ color: '#F3E5AB', fontSize: '16px' }}>Table {t.id} [{t.type}]</b>
                  <span style={{ fontSize: '10px', background: 'rgba(230,126,34,0.2)', color: '#f39c12', padding: '3px 8px', borderRadius: '6px' }}>{t.guest}</span>
                </div>

                <div style={{ fontSize: '12px', color: '#ccc', margin: '10px 0' }}>
                  <b>Ordered Items:</b>
                  <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                    {t.items.map((item, idx) => <li key={idx}>{item.name} (${item.price})</li>)}
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid #222', paddingTop: '10px', marginTop: '10px' }}>
                  {t.orderState === 'Ready to Serve' ? (
                    <div style={{ textAlign: 'center', color: '#2ecc71', fontWeight: 'bold', fontSize: '13px' }}>
                      ✓ Order Ready for Waiter Pickup
                    </div>
                  ) : (
                    <button onClick={() => setTables(tables.map(item => item.id === t.id ? { ...item, orderState: 'Ready to Serve' } : item))} style={{ width: '100%', padding: '10px', background: '#2ecc71', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                      Mark Ready to Serve 🚀
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= PASSWORD AUTH POPUP MODAL ================= */}
      {authModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '16px' }}>
          <div style={{ background: '#121214', border: '1px solid #D4AF37', borderRadius: '14px', width: '100%', maxWidth: '360px', padding: '22px', boxShadow: '0 0 35px rgba(212,175,55,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, color: '#F3E5AB', fontSize: '16px' }}>
                {authModal === 'saas_admin' ? 'SaaS Super-Admin Portal' : 'Hotel Owner Dashboard'}
              </h3>
              <button onClick={() => { setAuthModal(null); setAuthError(''); }} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Enter Password</label>
                <input 
                  type="password" 
                  required 
                  placeholder={authModal === 'saas_admin' ? 'Default: saas2026' : 'Default: admin123'} 
                  value={passInput} 
                  onChange={(e) => setPassInput(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                />
              </div>

              {authError && <p style={{ fontSize: '11px', color: '#e74c3c', margin: 0 }}>{authError}</p>}

              <button type="submit" style={{ padding: '10px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                Verify & Enter Portal
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
