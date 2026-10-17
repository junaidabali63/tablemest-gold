'use client';
import React, { useState } from 'react';

export default function TableNestPinPOS() {
  // Global View States: 'landing', 'signup', 'login', 'pin_gateway', 'owner_dashboard', 'waiter_portal', 'kitchen_portal', 'owner_settings'
  const [currentView, setCurrentView] = useState('landing');
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [hotelInfo, setHotelInfo] = useState({
    hotelName: 'The Grand Palace Hotel',
    ownerName: 'Master Admin',
    email: 'admin@tablenest.com',
    plan: 'Gold Monthly ($299)'
  });

  const [ownerPassword, setOwnerPassword] = useState('admin123');
  const [staffPins, setStaffPins] = useState({
    owner: '1234',
    waiter: '2222',
    kitchen: '3333'
  });

  // Signup & Login Form States
  const [signupForm, setSignupForm] = useState({ hotelName: '', ownerName: '', email: '', username: '', password: '', plan: 'Gold Monthly ($299)' });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Tables State with live real-time sync
  const [tables, setTables] = useState([
    { id: 'T1', status: 'Occupied', type: 'Dine-In', seats: 4, guest: 'John Doe', items: [{ name: 'Wagyu Ribeye', price: 85 }, { name: 'Vintage Wine', price: 150 }], orderState: 'Served' },
    { id: 'T2', status: 'Available', type: 'Dine-In', seats: 4, guest: '', items: [], orderState: 'None' },
    { id: 'T3', status: 'Occupied', type: 'Dine-In', seats: 2, guest: 'Alexander', items: [{ name: 'Truffle Pasta', price: 75 }], orderState: 'Cooking' },
    { id: 'T4', status: 'Occupied', type: 'Parcel', seats: 4, guest: 'Sarah K.', items: [{ name: 'Caviar Starter', price: 110 }], orderState: 'Ready to Serve' },
    { id: 'T5', status: 'Occupied', type: 'Dine-In', seats: 2, guest: 'Michael', items: [{ name: 'Signature Combo', price: 130 }], orderState: 'Ordering' },
    { id: 'T6', status: 'Reserved', type: 'Dine-In', seats: 2, guest: 'David L.', items: [], orderState: 'None' },
    { id: 'T7', status: 'Reserved', type: 'Dine-In', seats: 4, guest: 'Emma W.', items: [], orderState: 'None' },
  ]);

  const [orderForm, setOrderForm] = useState({ tableId: 'T2', guestName: '', orderType: 'Dine-In', itemName: 'Wagyu Ribeye Steak', itemPrice: 85 });
  const [settingsForm, setSettingsForm] = useState({ hotelName: hotelInfo.hotelName, ownerName: hotelInfo.ownerName, email: hotelInfo.email, newWaiterPin: staffPins.waiter, newKitchenPin: staffPins.kitchen });
  const [settingsMsg, setSettingsMsg] = useState('');

  // Handle Signup Submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupForm.password.length < 4) {
      alert('Password must be at least 4 characters.');
      return;
    }
    setHotelInfo({
      hotelName: signupForm.hotelName,
      ownerName: signupForm.ownerName,
      email: signupForm.email,
      plan: signupForm.plan
    });
    setOwnerPassword(signupForm.password);
    alert('Account created successfully! Welcome to TableNest.');
    setCurrentView('owner_dashboard');
  };

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (loginForm.password === ownerPassword) {
      setCurrentView('owner_dashboard');
      setLoginForm({ username: '', password: '' });
    } else {
      setLoginError('Invalid Username or Password!');
    }
  };

  // PIN Gateway Handler
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
      setPinError('❌ Invalid PIN! Try 1234, 2222, or 3333');
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
          orderState: 'Cooking'
        };
      }
      return t;
    }));
    alert(`Order dispatched for Table ${orderForm.tableId}! 🔔`);
    setOrderForm({ tableId: 'T2', guestName: '', orderType: 'Dine-In', itemName: 'Wagyu Ribeye Steak', itemPrice: 85 });
  };

  const changeTableStatus = (tableId, newStatus) => {
    setTables(tables.map(t => t.id === tableId ? { ...t, status: newStatus } : t));
  };

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    setHotelInfo({ ...hotelInfo, hotelName: settingsForm.hotelName, ownerName: settingsForm.ownerName, email: settingsForm.email });
    setStaffPins({ ...staffPins, waiter: settingsForm.newWaiterPin, kitchen: settingsForm.newKitchenPin });
    setSettingsMsg('✓ Settings & PINs updated successfully!');
  };

  // Real-Time Calculations
  const totalOccupiedBill = tables.reduce((sum, t) => sum + t.items.reduce((iSum, i) => iSum + i.price, 0), 0);
  const totalRevenue = 5480 + totalOccupiedBill;
  const netProfit = Math.round(totalRevenue * 0.42);

  const totalSeats = tables.reduce((sum, t) => sum + t.seats, 0);
  const filledSeats = tables.filter(t => t.status === 'Occupied').reduce((sum, t) => sum + t.seats, 0);
  const occupancyPercentage = Math.round((filledSeats / totalSeats) * 100);

  const occupiedCount = tables.filter(t => t.status === 'Occupied').length;
  const reservedCount = tables.filter(t => t.status === 'Reserved').length;
  const availableCount = tables.filter(t => t.status === 'Available').length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#F3E5AB', fontFamily: 'sans-serif', padding: '14px', boxSizing: 'border-box' }}>
      
      {/* HEADER */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 16px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setCurrentView('landing')}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(0,0,0,0.9))', color: '#D4AF37', fontSize: '18px', boxShadow: '0 0 15px rgba(212,175,55,0.3)' }}>
            💎
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '15px', letterSpacing: '1px', color: '#F3E5AB', fontWeight: 'bold' }}>{hotelInfo.hotelName}</h1>
            <p style={{ margin: 0, fontSize: '8px', color: '#888', letterSpacing: '1px' }}>LUXURY 3D POS SYSTEM</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {currentView !== 'landing' && (
            <button onClick={() => setCurrentView('landing')} style={{ padding: '6px 14px', background: '#141414', border: '1px solid #333', color: '#aaa', borderRadius: '20px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
              🌐 Home / Landing
            </button>
          )}
          <button onClick={() => setCurrentView('pin_gateway')} style={{ padding: '6px 14px', background: 'linear-gradient(135deg, #D4AF37, #AA771C)', color: '#000', border: 'none', borderRadius: '20px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            🔑 PIN Gateway
          </button>
        </div>
      </div>

      {/* 1. LANDING & SUBSCRIPTION PAGE */}
      {currentView === 'landing' && (
        <div style={{ maxWidth: '1000px', margin: '30px auto', textAlign: 'center' }}>
          <span style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid #D4AF37', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', color: '#D4AF37', fontWeight: 'bold' }}>
            ENTERPRISE RESTAURANT SaaS & POS
          </span>
          <h2 style={{ fontSize: '36px', color: '#F3E5AB', margin: '20px 0 10px 0' }}>Immersive 3D Hospitality Management</h2>
          <p style={{ fontSize: '12px', color: '#aaa', maxWidth: '680px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
            Sign up your restaurant, manage tables in 3D, and assign fast PINs for waiters and kitchen staff.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentView('signup')} style={{ padding: '12px 24px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}>
              Get Started / Sign Up 🚀
            </button>
            <button onClick={() => setCurrentView('login')} style={{ padding: '12px 24px', background: '#111', border: '1px solid #D4AF37', color: '#D4AF37', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}>
              Owner Login 🔑
            </button>
          </div>
        </div>
      )}

      {/* 2. SIGN UP PAGE (For New Hotel Owners) */}
      {currentView === 'signup' && (
        <div style={{ maxWidth: '420px', margin: '30px auto', background: '#0d0d0d', border: '1px solid #D4AF37', borderRadius: '16px', padding: '24px', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
          <h2 style={{ color: '#F3E5AB', fontSize: '18px', marginTop: 0, marginBottom: '6px' }}>Hotel Owner Registration</h2>
          <p style={{ fontSize: '11px', color: '#888', marginBottom: '18px' }}>Create your restaurant account and start managing.</p>

          <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Hotel Name</label>
              <input type="text" required placeholder="e.g. The Royal Palace" value={signupForm.hotelName} onChange={(e) => setSignupForm({...signupForm, hotelName: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Owner Name</label>
              <input type="text" required placeholder="e.g. Executive Admin" value={signupForm.ownerName} onChange={(e) => setSignupForm({...signupForm, ownerName: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Email Address</label>
              <input type="email" required placeholder="owner@hotel.com" value={signupForm.email} onChange={(e) => setSignupForm({...signupForm, email: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Username</label>
                <input type="text" required placeholder="admin" value={signupForm.username} onChange={(e) => setSignupForm({...signupForm, username: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Password (min 4)</label>
                <input type="password" required placeholder="••••" value={signupForm.password} onChange={(e) => setSignupForm({...signupForm, password: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <button type="submit" style={{ marginTop: '8px', padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
              Complete Signup 🚀
            </button>
          </form>

          <p style={{ fontSize: '10px', color: '#888', textAlign: 'center', marginTop: '14px' }}>
            Already have an account? <span onClick={() => setCurrentView('login')} style={{ color: '#D4AF37', cursor: 'pointer', textDecoration: 'underline' }}>Login here</span>
          </p>
        </div>
      )}

      {/* 3. LOGIN PAGE */}
      {currentView === 'login' && (
        <div style={{ maxWidth: '380px', margin: '50px auto', background: '#0d0d0d', border: '1px solid #D4AF37', borderRadius: '16px', padding: '24px', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
          <h2 style={{ color: '#F3E5AB', fontSize: '18px', marginTop: 0, marginBottom: '6px' }}>Hotel Owner Login</h2>
          <p style={{ fontSize: '11px', color: '#888', marginBottom: '18px' }}>Enter your credentials to access dashboard.</p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Username</label>
              <input type="text" required placeholder="admin" value={loginForm.username} onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '3px' }}>Password</label>
              <input type="password" required placeholder="admin123" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            {loginError && <p style={{ fontSize: '11px', color: '#e74c3c', margin: 0 }}>{loginError}</p>}

            <button type="submit" style={{ marginTop: '8px', padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
              Secure Login 🔑
            </button>
          </form>

          <p style={{ fontSize: '10px', color: '#888', textAlign: 'center', marginTop: '14px' }}>
            New restaurant? <span onClick={() => setCurrentView('signup')} style={{ color: '#D4AF37', cursor: 'pointer', textDecoration: 'underline' }}>Sign up here</span>
          </p>
        </div>
      )}

      {/* 4. PIN GATEWAY */}
      {currentView === 'pin_gateway' && (
        <div style={{ maxWidth: '380px', margin: '50px auto', background: '#0d0d0d', border: '1px solid #D4AF37', borderRadius: '18px', padding: '24px', boxShadow: '0 0 40px rgba(212,175,55,0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔐</div>
          <h2 style={{ color: '#F3E5AB', fontSize: '18px', margin: '0 0 6px 0' }}>Enter POS Staff PIN</h2>
          <p style={{ fontSize: '11px', color: '#888', marginBottom: '20px' }}>Enter 4-digit PIN to access authorized screen.</p>

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
            <button type="submit" style={{ padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
              Unlock Terminal 🔓
            </button>
          </form>

          <div style={{ marginTop: '20px', borderTop: '1px solid #222', paddingTop: '12px', fontSize: '10px', color: '#666', textAlign: 'left' }}>
            <b>Demo PINs:</b><br />
            • Owner: <code style={{ color: '#D4AF37' }}>1234</code><br />
            • Waiter: <code style={{ color: '#60a5fa' }}>2222</code><br />
            • Kitchen: <code style={{ color: '#f39c12' }}>3333</code>
          </div>
        </div>
      )}

      {/* 5. OWNER DASHBOARD */}
      {currentView === 'owner_dashboard' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', background: '#0d0d0d', padding: '10px', borderRadius: '12px', border: '1px solid #222' }}>
            <span style={{ padding: '6px 12px', background: 'rgba(212,175,55,0.2)', color: '#D4AF37', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold' }}>
              👑 OWNER MODE
            </span>
            <button onClick={() => setCurrentView('waiter_portal')} style={{ padding: '6px 12px', background: '#161618', color: '#60a5fa', border: '1px solid #333', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
              Waiter View 📱
            </button>
            <button onClick={() => setCurrentView('kitchen_portal')} style={{ padding: '6px 12px', background: '#161618', color: '#f39c12', border: '1px solid #333', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
              Kitchen View 🍳
            </button>
            <button onClick={() => setCurrentView('owner_settings')} style={{ padding: '6px 12px', background: '#161618', color: '#2ecc71', border: '1px solid #333', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
              Settings & PINs ⚙️
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', alignItems: 'start' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#0d0d0d', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', padding: '18px' }}>
              <div>
                <span style={{ fontSize: '9px', color: '#888', letterSpacing: '1px', display: 'block' }}>TOTAL REVENUE TODAY</span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '28px', color: '#F3E5AB', fontWeight: '800' }}>${totalRevenue.toLocaleString()}</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#2ecc71' }}>Estimated Net Profit: <b>${netProfit.toLocaleString()} (42%)</b></p>
              </div>

              <div style={{ borderTop: '1px solid #222', paddingTop: '10px' }}>
                <span style={{ fontSize: '9px', color: '#888', letterSpacing: '1px', display: 'block' }}>RESTAURANT OCCUPANCY</span>
                <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#D4AF37', margin: '2px 0' }}>{occupancyPercentage}%</div>
                <span style={{ fontSize: '9px', color: '#888' }}>{filledSeats} of {totalSeats} seats filled</span>
              </div>

              <div style={{ borderTop: '1px solid #222', paddingTop: '10px' }}>
                <span style={{ fontSize: '9px', color: '#888', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>TABLE STATUS BREAKDOWN</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#ccc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟡 Occupied</span> <b>{occupiedCount}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🔵 Reserved</span> <b>{reservedCount}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟢 Available</span> <b>{availableCount}</b></div>
                </div>
              </div>
            </div>

            <div style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '14px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#F3E5AB' }}>🪑 3D Table Furniture Layout</span>
                <span style={{ fontSize: '9px', color: '#2ecc71' }}>● Live Sync</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                {tables.map(t => {
                  const borderCol = t.status === 'Occupied' ? '#D4AF37' : t.status === 'Reserved' ? '#3b82f6' : '#2ecc71';
                  const bgCol = t.status === 'Occupied' ? 'rgba(212,175,55,0.1)' : t.status === 'Reserved' ? 'rgba(59,130,246,0.1)' : 'rgba(46,204,113,0.1)';
                  const tableBill = t.items.reduce((s, i) => s + i.price, 0);

                  return (
                    <div key={t.id} style={{ background: bgCol, border: `1px solid ${borderCol}`, borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                      <b style={{ fontSize: '14px', color: '#F3E5AB' }}>Table {t.id}</b>
                      <span style={{ fontSize: '9px', display: 'block', color: borderCol, fontWeight: 'bold', margin: '2px 0' }}>{t.status}</span>
                      <span style={{ fontSize: '8px', color: '#888', display: 'block' }}>{t.type} ({t.seats} Seats)</span>
                      {tableBill > 0 && <span style={{ fontSize: '10px', color: '#2ecc71', fontWeight: 'bold', display: 'block', marginTop: '4px' }}>${tableBill}</span>}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 6. SETTINGS */}
      {currentView === 'owner_settings' && (
        <div style={{ maxWidth: '500px', margin: '0 auto', background: '#0d0d0d', border: '1px solid #2ecc71', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ color: '#2ecc71', fontSize: '16px', margin: 0 }}>⚙️ Hotel Settings & Staff PINs</h2>
            <button onClick={() => setCurrentView('owner_dashboard')} style={{ padding: '6px 12px', background: '#161618', color: '#aaa', border: '1px solid #333', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Back</button>
          </div>

          <form onSubmit={handleSettingsUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Hotel Name</label>
              <input type="text" required value={settingsForm.hotelName} onChange={(e) => setSettingsForm({...settingsForm, hotelName: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: '#60a5fa', display: 'block', marginBottom: '4px' }}>Waiter PIN</label>
                <input type="text" maxLength="4" required value={settingsForm.newWaiterPin} onChange={(e) => setSettingsForm({...settingsForm, newWaiterPin: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'center', fontSize: '14px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: '#f39c12', display: 'block', marginBottom: '4px' }}>Kitchen PIN</label>
                <input type="text" maxLength="4" required value={settingsForm.newKitchenPin} onChange={(e) => setSettingsForm({...settingsForm, newKitchenPin: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'center', fontSize: '14px' }} />
              </div>
            </div>

            <button type="submit" style={{ marginTop: '10px', padding: '12px', background: '#2ecc71', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
              Save Settings & PINs
            </button>
            {settingsMsg && <p style={{ fontSize: '11px', color: '#2ecc71', margin: 0 }}>{settingsMsg}</p>}
          </form>
        </div>
      )}

      {/* 7. WAITER TERMINAL */}
      {currentView === 'waiter_portal' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#0d0d0d', border: '1px solid #3b82f6', borderRadius: '14px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ color: '#60a5fa', fontSize: '18px', margin: 0 }}>📱 Waiter Order Terminal</h2>
            <button onClick={() => setCurrentView('pin_gateway')} style={{ padding: '6px 12px', background: '#161618', color: '#aaa', border: '1px solid #333', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Lock 🔒</button>
          </div>
          
          <form onSubmit={handleWaiterPlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Select Table</label>
              <select value={orderForm.tableId} onChange={(e) => setOrderForm({ ...orderForm, tableId: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }}>
                {tables.map(t => <option key={t.id} value={t.id}>Table {t.id} ({t.status})</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => changeTableStatus(orderForm.tableId, 'Available')} style={{ flex: 1, padding: '8px', background: 'rgba(46,204,113,0.2)', border: '1px solid #2ecc71', color: '#2ecc71', borderRadius: '6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Mark Available</button>
              <button type="button" onClick={() => changeTableStatus(orderForm.tableId, 'Occupied')} style={{ flex: 1, padding: '8px', background: 'rgba(212,175,55,0.2)', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Mark Occupied</button>
            </div>

            <div>
              <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Customer Name</label>
              <input type="text" placeholder="e.g. Mr. Robert" value={orderForm.guestName} onChange={(e) => setOrderForm({ ...orderForm, guestName: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 2 }}>
                <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Menu Item</label>
                <input type="text" value={orderForm.itemName} onChange={(e) => setOrderForm({ ...orderForm, itemName: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Price ($)</label>
                <input type="number" value={orderForm.itemPrice} onChange={(e) => setOrderForm({ ...orderForm, itemPrice: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
              </div>
            </div>

            <button type="submit" style={{ padding: '12px', background: '#3b82f6', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', marginTop: '6px' }}>
              Dispatch Order to Kitchen 🚀
            </button>
          </form>
        </div>
      )}

      {/* 8. KITCHEN KOT SCREEN */}
      {currentView === 'kitchen_portal' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: '#0d0d0d', border: '1px solid #e67e22', borderRadius: '14px', padding: '20px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#f39c12', fontSize: '18px', margin: 0 }}>🍳 Kitchen Order Tickets (KOT)</h2>
            <button onClick={() => setCurrentView('pin_gateway')} style={{ padding: '6px 12px', background: '#161618', color: '#aaa', border: '1px solid #333', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Lock 🔒</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {tables.filter(t => t.items.length > 0).map(t => (
              <div key={t.id} style={{ background: '#0d0d0d', border: t.orderState === 'Ready to Serve' ? '1px solid #2ecc71' : '1px solid #e67e22', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <b style={{ color: '#F3E5AB', fontSize: '16px' }}>Table {t.id} [{t.type}]</b>
                  <span style={{ fontSize: '10px', color: '#f39c12' }}>{t.guest}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#ccc', margin: '10px 0' }}>
                  <b>Items:</b>
                  <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                    {t.items.map((item, idx) => <li key={idx}>{item.name} (${item.price})</li>)}
                  </ul>
                </div>
                <button onClick={() => setTables(tables.map(item => item.id === t.id ? { ...item, orderState: 'Ready to Serve' } : item))} style={{ width: '100%', padding: '10px', background: '#2ecc71', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                  Mark Ready to Serve 🚀
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
