'use client';
import React, { useState } from 'react';

export default function TableNestPinPOS() {
  const [currentView, setCurrentView] = useState('pin_gateway');
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [hotelInfo, setHotelInfo] = useState({
    hotelName: 'The Grand Palace Hotel',
    ownerName: 'Master Admin',
    email: 'admin@tablenest.com',
    username: 'owner_admin',
    plan: 'Gold Monthly ($299)'
  });

  const [ownerPassword, setOwnerPassword] = useState('admin123');
  const [staffPins, setStaffPins] = useState({
    owner: '1234',
    waiter: '2222',
    kitchen: '3333'
  });

  const [signupForm, setSignupForm] = useState({ hotelName: '', ownerName: '', email: '', username: '', password: '', plan: '1 Week Free Trial' });

  const [tables, setTables] = useState([
    { id: 'T1', top: '48%', left: '33%', status: 'Occupied', type: 'Dine-In', guest: 'John Doe', items: [{ name: 'Wagyu Ribeye Steak', price: 85 }, { name: 'Vintage Gold Wine', price: 150 }], orderState: 'Served', payment: 'Paid' },
    { id: 'T2', top: '56%', left: '42%', status: 'Available', type: 'Dine-In', guest: '', items: [], orderState: 'None', payment: 'Unpaid' },
    { id: 'T3', top: '43%', left: '67%', status: 'Occupied', type: 'Dine-In', guest: 'Alexander', items: [{ name: 'Truffle Lobster Pasta', price: 75 }], orderState: 'Cooking', payment: 'Unpaid' },
    { id: 'T4', top: '58%', left: '61%', status: 'Occupied', type: 'Parcel', guest: 'Sarah K.', items: [{ name: 'Black Caviar Starter', price: 110 }], orderState: 'Ready to Serve', payment: 'Paid' },
    { id: 'T5', top: '65%', left: '52%', status: 'Occupied', type: 'Dine-In', guest: 'Michael', items: [{ name: 'Chef Signature Combo', price: 130 }], orderState: 'Ordering', payment: 'Unpaid' },
    { id: 'T6', top: '48%', left: '77%', status: 'Reserved', type: 'Dine-In', guest: 'David L.', items: [], orderState: 'None', payment: 'Unpaid', time: '8:00 PM' },
    { id: 'T7', top: '56%', left: '86%', status: 'Reserved', type: 'Dine-In', guest: 'Emma W.', items: [], orderState: 'None', payment: 'Unpaid', time: '8:30 PM' },
  ]);

  const [orderForm, setOrderForm] = useState({ tableId: 'T2', guestName: '', orderType: 'Dine-In', itemName: 'Wagyu Ribeye Steak', itemPrice: 85 });
  const [settingsForm, setSettingsForm] = useState({ hotelName: hotelInfo.hotelName, ownerName: hotelInfo.ownerName, email: hotelInfo.email, oldPass: '', newPass: '', confirmPass: '', newWaiterPin: staffPins.waiter, newKitchenPin: staffPins.kitchen });
  const [settingsMsg, setSettingsMsg] = useState('');

  const handlePinSubmit = (e) => {
    e.preventDefault();
    setPinError('');
    if (enteredPin === staffPins.owner) {
      setCurrentView('owner_dashboard');
      setEnteredPin('');
    } else if (enteredPin === staffPins.waiter) {
      setCurrentView('waiter_portal');
      setEnteredPin('');
    } else if (enteredPin === staffPins.kitchen) {
      setCurrentView('kitchen_portal');
      setEnteredPin('');
    } else {
      setPinError('❌ Invalid Staff PIN Code! Try 1234, 2222, or 3333');
    }
  };

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
    alert(`Order dispatched to kitchen for Table ${orderForm.tableId}! 🔔`);
    setOrderForm({ tableId: 'T2', guestName: '', orderType: 'Dine-In', itemName: 'Wagyu Ribeye Steak', itemPrice: 85 });
  };

  const changeTableStatus = (tableId, newStatus) => {
    setTables(tables.map(t => t.id === tableId ? { ...t, status: newStatus } : t));
  };

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    setSettingsMsg('');
    if (settingsForm.newPass) {
      if (settingsForm.oldPass !== ownerPassword) {
        setSettingsMsg('❌ Incorrect current password.');
        return;
      }
      if (settingsForm.newPass.length < 4) {
        setSettingsMsg('❌ Password must be at least 4 characters.');
        return;
      }
      if (settingsForm.newPass !== settingsForm.confirmPass) {
        setSettingsMsg('❌ Passwords do not match.');
        return;
      }
      setOwnerPassword(settingsForm.newPass);
    }

    setHotelInfo({ ...hotelInfo, hotelName: settingsForm.hotelName, ownerName: settingsForm.ownerName, email: settingsForm.email });
    setStaffPins({ ...staffPins, waiter: settingsForm.newWaiterPin, kitchen: settingsForm.newKitchenPin });
    setSettingsMsg('✓ Hotel settings & staff PINs updated successfully!');
  };

  const totalOccupiedBill = tables.reduce((sum, t) => sum + t.items.reduce((iSum, i) => iSum + i.price, 0), 0);
  const totalRevenue = 5480 + totalOccupiedBill;
  const netProfit = Math.round(totalRevenue * 0.42);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#F3E5AB', fontFamily: 'sans-serif', padding: '16px', boxSizing: 'border-box' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto 16px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setCurrentView('pin_gateway')}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(0,0,0,0.8))', color: '#D4AF37', fontSize: '20px', boxShadow: '0 0 15px rgba(212,175,55,0.3)' }}>
            💎
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', color: '#F3E5AB', fontWeight: 'bold' }}>{hotelInfo.hotelName}</h1>
            <p style={{ margin: 0, fontSize: '9px', color: '#888', letterSpacing: '1px' }}>POS PIN-GATEWAY SYSTEM</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {currentView !== 'pin_gateway' && (
            <button onClick={() => setCurrentView('pin_gateway')} style={{ padding: '6px 14px', background: '#1c1c1e', border: '1px solid #333', color: '#aaa', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
              🔒 Lock Terminal / Enter PIN
            </button>
          )}
          <button onClick={() => setCurrentView('landing')} style={{ padding: '6px 14px', background: '#141414', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
            🌐 SaaS Landing
          </button>
        </div>
      </div>

      {currentView === 'pin_gateway' && (
        <div style={{ maxWidth: '380px', margin: '60px auto', background: '#111', border: '1px solid #D4AF37', borderRadius: '16px', padding: '24px', boxShadow: '0 0 40px rgba(212,175,55,0.25)', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔐</div>
          <h2 style={{ color: '#F3E5AB', fontSize: '20px', margin: '0 0 6px 0' }}>Enter Staff or Owner PIN</h2>
          <p style={{ fontSize: '11px', color: '#888', marginBottom: '20px' }}>Enter your 4-digit POS PIN to instantly access your authorized terminal.</p>

          <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="password" 
              maxLength="4"
              required 
              autoFocus
              placeholder="••••" 
              value={enteredPin} 
              onChange={(e) => setEnteredPin(e.target.value)}
              style={{ width: '100%', padding: '14px', background: '#000', border: '1px solid #333', borderRadius: '10px', color: '#D4AF37', fontSize: '24px', textAlign: 'center', letterSpacing: '8px', boxSizing: 'border-box' }}
            />

            {pinError && <p style={{ fontSize: '11px', color: '#e74c3c', margin: 0 }}>{pinError}</p>}

            <button type="submit" style={{ padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
              Unlock Terminal 🔓
            </button>
          </form>

          <div style={{ marginTop: '20px', borderTop: '1px solid #222', paddingTop: '12px', fontSize: '10px', color: '#666', textAlign: 'left' }}>
            <b>Default Demo PINs:</b><br />
            • Owner PIN: <code style={{ color: '#D4AF37' }}>1234</code><br />
            • Waiter PIN: <code style={{ color: '#60a5fa' }}>2222</code><br />
            • Kitchen PIN: <code style={{ color: '#f39c12' }}>3333</code>
          </div>
        </div>
      )}

      {currentView === 'landing' && (
        <div style={{ maxWidth: '1100px', margin: '30px auto', textAlign: 'center' }}>
          <span style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid #D4AF37', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', color: '#D4AF37', fontWeight: 'bold' }}>
            ENTERPRISE RESTAURANT POS & SaaS
          </span>
          <h2 style={{ fontSize: '38px', color: '#F3E5AB', margin: '20px 0 10px 0' }}>Immersive 3D Hospitality Management</h2>
          <p style={{ fontSize: '13px', color: '#aaa', maxWidth: '720px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
            TableNest utilizes rapid PIN authentication to separate owner revenue analytics from waiter terminals and kitchen displays.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '40px' }}>
            <button onClick={() => setCurrentView('pin_gateway')} style={{ padding: '12px 24px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}>
              Launch POS Terminal (PIN Gate) 🔑
            </button>
            <button onClick={() => {
              const pass = prompt('Enter SaaS Admin Password (default: saas2026):');
              if (pass === 'saas2026') setCurrentView('saas_admin');
              else if (pass) alert('Incorrect SaaS Password!');
            }} style={{ padding: '12px 24px', background: '#1c1c1e', border: '1px solid #444', color: '#fff', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}>
              SaaS Super-Admin 👑
            </button>
          </div>
        </div>
      )}

      {currentView === 'saas_admin' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto' }}>
          <div style={{ background: '#111', border: '1px solid #D4AF37', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
            <h2 style={{ color: '#F3E5AB', fontSize: '20px', marginTop: 0 }}>👑 SaaS Provider Master Dashboard</h2>
            <p style={{ fontSize: '11px', color: '#888' }}>Platform-wide active subscriptions and MRR overview.</p>
          </div>
        </div>
      )}

      {currentView === 'owner_dashboard' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', background: '#111', padding: '10px', borderRadius: '12px', border: '1px solid #222' }}>
            <span style={{ padding: '8px 14px', background: 'rgba(212,175,55,0.2)', color: '#D4AF37', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>
              👑 OWNER MODE ACTIVE
            </span>
            <button onClick={() => setCurrentView('waiter_portal')} style={{ padding: '8px 14px', background: '#1c1c1e', color: '#60a5fa', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              Switch to Waiter View 📱
            </button>
            <button onClick={() => setCurrentView('kitchen_portal')} style={{ padding: '8px 14px', background: '#1c1c1e', color: '#f39c12', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              Switch to Kitchen View 🍳
            </button>
            <button onClick={() => setCurrentView('owner_settings')} style={{ padding: '8px 14px', background: '#1c1c1e', color: '#2ecc71', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              ⚙️ Hotel Settings & Staff PINs
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#111', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', padding: '18px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>TOTAL REVENUE TODAY</span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '30px', color: '#F3E5AB', fontWeight: '800' }}>${totalRevenue.toLocaleString()}</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#2ecc71' }}>Estimated Net Profit: <b>${netProfit.toLocaleString()} (42%)</b></p>
              </div>

              <div style={{ borderTop: '1px solid #222', paddingTop: '10px' }}>
                <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>OWNER & PLAN</span>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#D4AF37', marginTop: '2px' }}>{hotelInfo.ownerName} • {hotelInfo.plan}</div>
              </div>
            </div>

            <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', background: '#0d0d0d', border: '1px solid #222', borderRadius: '14px', padding: '14px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#F3E5AB' }}>{hotelInfo.hotelName} • LIVE 3D FLOOR</span>
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
        </div>
      )}

      {currentView === 'owner_settings' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#111', border: '1px solid #2ecc71', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ color: '#2ecc71', fontSize: '18px', margin: 0 }}>⚙️ Hotel Settings & Staff PINs</h2>
            <button onClick={() => setCurrentView('owner_dashboard')} style={{ padding: '6px 12px', background: '#222', color: '#aaa', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Back to Dashboard</button>
          </div>

          <form onSubmit={handleSettingsUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Hotel Name</label>
              <input type="text" required value={settingsForm.hotelName} onChange={(e) => setSettingsForm({...settingsForm, hotelName: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <button type="submit" style={{ marginTop: '10px', padding: '12px', background: '#2ecc71', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
              Save Hotel Settings & PINs
            </button>
            {settingsMsg && <p style={{ fontSize: '12px', color: '#2ecc71', margin: '4px 0 0 0' }}>{settingsMsg}</p>}
          </form>
        </div>
      )}

      {currentView === 'waiter_portal' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#111', border: '1px solid #3b82f6', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{ color: '#60a5fa', fontSize: '18px', margin: 0 }}>📱 Waiter Terminal (PIN: 2222)</h2>
              <button onClick={() => setCurrentView('pin_gateway')} style={{ padding: '6px 12px', background: '#1c1c1e', color: '#aaa', border: '1px solid #333', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Lock Terminal 🔒</button>
            </div>
            
            <form onSubmit={handleWaiterPlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              <select value={orderForm.tableId} onChange={(e) => setOrderForm({ ...orderForm, tableId: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }}>
                {tables.map(t => <option key={t.id} value={t.id}>Table {t.id} ({t.status})</option>)}
              </select>
              
              <div style={{ display: 'flex', gap: '6px' }}>
                <button type="button" onClick={() => changeTableStatus(orderForm.tableId, 'Available')} style={{ flex: 1, padding: '6px', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#34d399', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Mark Available</button>
                <button type="button" onClick={() => changeTableStatus(orderForm.tableId, 'Occupied')} style={{ flex: 1, padding: '6px', background: 'rgba(212,175,55,0.2)', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Mark Occupied</button>
              </div>

              <button type="submit" style={{ padding: '12px', background: '#3b82f6', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                Dispatch Order to Kitchen 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {currentView === 'kitchen_portal' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ background: '#111', border: '1px solid #e67e22', borderRadius: '14px', padding: '20px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#f39c12', fontSize: '20px', margin: 0 }}>🍳 Kitchen KOT Screen (PIN: 3333)</h2>
            <button onClick={() => setCurrentView('pin_gateway')} style={{ padding: '8px 12px', background: '#222', color: '#aaa', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Lock Terminal 🔒</button>
          </div>
        </div>
      )}

    </div>
  );
}
