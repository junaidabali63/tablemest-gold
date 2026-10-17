'use client';
import React, { useState } from 'react';

export default function TableNestEnterpriseSaaS() {
  // Global View States: 'landing', 'signup', 'login', 'saas_admin', 'owner_dashboard', 'waiter_portal', 'kitchen_portal'
  const [currentView, setCurrentView] = useState('landing');

  // SaaS Super Admin Credentials
  const [saasAdminPass] = useState('saas2026');
  const [saasInput, setSaasInput] = useState('');
  const [saasError, setSaasError] = useState('');

  // Registered Hotels / Owners Database State
  const [hotelsDB, setHotelsDB] = useState([
    { id: 1, hotelName: 'The Grand Palace', ownerName: 'Junaid', email: 'junaid@TableNest.com', username: 'junaid_owner', password: 'admin123', plan: 'Gold Monthly ($299)', status: 'Active' },
    { id: 2, hotelName: 'Truffle & Wine Lounge', ownerName: 'Alexander', email: 'alex@truffle.com', username: 'alex', password: 'password123', plan: 'Enterprise ($2499)', status: 'Active' },
  ]);

  // Current Logged-in Hotel Owner Session
  const [currentOwner, setCurrentOwner] = useState(hotelsDB[0]);

  // Signup Form State
  const [signupForm, setSignupForm] = useState({ hotelName: '', ownerName: '', email: '', username: '', password: '', plan: '1 Week Free Trial' });

  // Login Form State
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Owner Dashboard Active Tab ('floor', 'orders', 'waiter_view', 'kitchen_view', 'settings')
  const [ownerTab, setOwnerTab] = useState('floor');

  // Settings Form State for Hotel Owner
  const [settingsForm, setSettingsForm] = useState({ hotelName: currentOwner.hotelName, ownerName: currentOwner.ownerName, email: currentOwner.email, username: currentOwner.username, oldPass: '', newPass: '', confirmPass: '' });
  const [settingsMsg, setSettingsMsg] = useState('');

  // Shared Tables & Orders State
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

  // Handle Signup Submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupForm.password.length < 4) {
      alert('Password must be at least 4 digits/characters long.');
      return;
    }
    const newHotel = { id: hotelsDB.length + 1, ...signupForm };
    setHotelsDB([...hotelsDB, newHotel]);
    setCurrentOwner(newHotel);
    setSettingsForm({ hotelName: newHotel.hotelName, ownerName: newHotel.ownerName, email: newHotel.email, username: newHotel.username, oldPass: '', newPass: '', confirmPass: '' });
    alert('Account created successfully! Welcome to TableNest.');
    setCurrentView('owner_dashboard');
  };

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const found = hotelsDB.find(h => h.username === loginForm.username && h.password === loginForm.password);
    if (found) {
      setCurrentOwner(found);
      setSettingsForm({ hotelName: found.hotelName, ownerName: found.ownerName, email: found.email, username: found.username, oldPass: '', newPass: '', confirmPass: '' });
      setCurrentView('owner_dashboard');
    } else {
      setLoginError('Invalid Username or Password!');
    }
  };

  // Handle Owner Settings Update (Hotel Name, Profile, Secure Password Change)
  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    setSettingsMsg('');

    if (settingsForm.newPass) {
      if (settingsForm.oldPass !== currentOwner.password) {
        setSettingsMsg('❌ Incorrect Old Password.');
        return;
      }
      if (settingsForm.newPass.length < 4) {
        setSettingsMsg('❌ New password must be at least 4 characters.');
        return;
      }
      if (settingsForm.newPass !== settingsForm.confirmPass) {
        setSettingsMsg('❌ New passwords do not match.');
        return;
      }
    }

    const updated = {
      ...currentOwner,
      hotelName: settingsForm.hotelName,
      ownerName: settingsForm.ownerName,
      email: settingsForm.email,
      username: settingsForm.username,
      password: settingsForm.newPass ? settingsForm.newPass : currentOwner.password
    };

    setCurrentOwner(updated);
    setHotelsDB(hotelsDB.map(h => h.id === updated.id ? updated : h));
    setSettingsMsg('✓ Settings & Security updated successfully!');
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
    alert(`Order dispatched to kitchen for Table ${orderForm.tableId}! 🔔`);
    setOrderForm({ tableId: 'T2', guestName: '', orderType: 'Dine-In', itemName: 'Wagyu Ribeye Steak', itemPrice: 85 });
  };

  // Table Status Changer for Waiters
  const changeTableStatus = (tableId, newStatus) => {
    setTables(tables.map(t => t.id === tableId ? { ...t, status: newStatus } : t));
  };

  const totalOccupiedBill = tables.reduce((sum, t) => sum + t.items.reduce((iSum, i) => iSum + i.price, 0), 0);
  const totalRevenue = 5480 + totalOccupiedBill;
  const netProfit = Math.round(totalRevenue * 0.42);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070707', color: '#F3E5AB', fontFamily: 'sans-serif', padding: '16px', boxSizing: 'border-box' }}>
      
      {/* 3D LUXURY HEADER WITH DYNAMIC HOTEL BRANDING */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 16px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setCurrentView('landing')}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(0,0,0,0.8))', color: '#D4AF37', fontSize: '20px', boxShadow: '0 0 15px rgba(212,175,55,0.3)' }}>
            💎
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '16px', letterSpacing: '2px', color: '#F3E5AB', fontWeight: 'bold' }}>
              {currentView === 'owner_dashboard' || currentView === 'waiter_portal' || currentView === 'kitchen_portal' ? currentOwner.hotelName : 'TableNest 3D'}
            </h1>
            <p style={{ margin: 0, fontSize: '9px', color: '#888', letterSpacing: '1px' }}>
              {currentView === 'owner_dashboard' ? `OWNER: ${currentOwner.ownerName}` : 'LUXURY HOSPITALITY SaaS'}
            </p>
          </div>
        </div>

        {/* Global Quick Navigation */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {currentView !== 'landing' && currentView !== 'login' && currentView !== 'signup' && (
            <button onClick={() => setCurrentView('landing')} style={{ padding: '6px 14px', background: '#1c1c1e', border: '1px solid #333', color: '#aaa', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>
              Home / Logout 🔒
            </button>
          )}
        </div>
      </div>

      {/* ================= 1. LANDING & SUBSCRIPTION PAGE ================= */}
      {currentView === 'landing' && (
        <div style={{ maxWidth: '1100px', margin: '30px auto', textAlign: 'center' }}>
          <span style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid #D4AF37', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', color: '#D4AF37', fontWeight: 'bold' }}>
            PREMIUM 3D HOSPITALITY OPERATING SYSTEM
          </span>
          <h2 style={{ fontSize: '38px', color: '#F3E5AB', margin: '20px 0 10px 0' }}>The Ultimate 3D Restaurant Management SaaS</h2>
          <p style={{ fontSize: '13px', color: '#aaa', maxWidth: '720px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
            TableNest empowers luxury hotels and restaurants with immersive 3D floor management, real-time waiter ordering, synchronized kitchen KOT dispatch, parcel tracking, and accurate revenue intelligence.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentView('signup')} style={{ padding: '12px 24px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}>
              Get Started / Sign Up 🚀
            </button>
            <button onClick={() => setCurrentView('login')} style={{ padding: '12px 24px', background: '#141414', border: '1px solid #D4AF37', color: '#D4AF37', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}>
              Hotel Owner Login 🔑
            </button>
            <button onClick={() => {
              const pass = prompt('Enter SaaS Admin Password (default: saas2026):');
              if (pass === 'saas2026') setCurrentView('saas_admin');
              else if (pass) alert('Incorrect SaaS Password!');
            }} style={{ padding: '12px 24px', background: '#1c1c1e', border: '1px solid #444', color: '#fff', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}>
              SaaS Super-Admin 👑
            </button>
          </div>

          <h3 style={{ fontSize: '24px', color: '#F3E5AB', marginBottom: '20px' }}>Choose Your Subscription Tier</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', textAlign: 'left' }}>
            
            <div style={{ background: '#111', border: '1px solid #D4AF37', borderRadius: '14px', padding: '20px' }}>
              <span style={{ fontSize: '9px', color: '#D4AF37', fontWeight: 'bold' }}>RISK FREE</span>
              <h4 style={{ fontSize: '18px', color: '#F3E5AB', margin: '6px 0' }}>1 Week Free Trial</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>$0 <span style={{ fontSize: '10px', color: '#888' }}>/7 days</span></p>
              <p style={{ fontSize: '11px', color: '#aaa', minHeight: '40px' }}>Full access to 3D floor layout, waiter terminal, and kitchen KOT.</p>
              <button onClick={() => { setSignupForm({...signupForm, plan: '1 Week Free Trial'}); setCurrentView('signup'); }} style={{ width: '100%', marginTop: '12px', padding: '10px', background: '#D4AF37', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '11px' }}>
                Start Free Trial
              </button>
            </div>

            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '20px' }}>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 'bold' }}>POPULAR</span>
              <h4 style={{ fontSize: '18px', color: '#F3E5AB', margin: '6px 0' }}>Gold Monthly</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>$299 <span style={{ fontSize: '10px', color: '#888' }}>/mo</span></p>
              <p style={{ fontSize: '11px', color: '#aaa', minHeight: '40px' }}>Multi-staff syncing, unlimited waiter tablets, priority KOT alerts.</p>
              <button onClick={() => { setSignupForm({...signupForm, plan: 'Gold Monthly ($299)'}); setCurrentView('signup'); }} style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', fontSize: '11px' }}>
                Subscribe Gold
              </button>
            </div>

            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '20px' }}>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 'bold' }}>PRO</span>
              <h4 style={{ fontSize: '18px', color: '#F3E5AB', margin: '6px 0' }}>Platinum Quarterly</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>$799 <span style={{ fontSize: '10px', color: '#888' }}>/3mo</span></p>
              <p style={{ fontSize: '11px', color: '#aaa', minHeight: '40px' }}>Advanced analytics, custom 3D floor map design, VIP support.</p>
              <button onClick={() => { setSignupForm({...signupForm, plan: 'Platinum Quarterly ($799)'}); setCurrentView('signup'); }} style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', fontSize: '11px' }}>
                Subscribe Platinum
              </button>
            </div>

            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '20px' }}>
              <span style={{ fontSize: '9px', color: '#888', fontWeight: 'bold' }}>ENTERPRISE</span>
              <h4 style={{ fontSize: '18px', color: '#F3E5AB', margin: '6px 0' }}>Annual VIP</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>$2,499 <span style={{ fontSize: '10px', color: '#888' }}>/yr</span></p>
              <p style={{ fontSize: '11px', color: '#aaa', minHeight: '40px' }}>Dedicated server infrastructure for luxury hotel chains.</p>
              <button onClick={() => { setSignupForm({...signupForm, plan: 'Annual Enterprise ($2499)'}); setCurrentView('signup'); }} style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', fontSize: '11px' }}>
                Subscribe Enterprise
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= 2. SIGN UP / ONBOARDING PAGE ================= */}
      {currentView === 'signup' && (
        <div style={{ maxWidth: '440px', margin: '40px auto', background: '#111', border: '1px solid #D4AF37', borderRadius: '16px', padding: '24px', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
          <h2 style={{ color: '#F3E5AB', fontSize: '20px', marginTop: 0, marginBottom: '6px' }}>Hotel Owner Registration</h2>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>Create your hotel account, set your secure password, and start managing.</p>

          <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Hotel Name</label>
              <input type="text" required placeholder="e.g. The Royal Plaza" value={signupForm.hotelName} onChange={(e) => setSignupForm({...signupForm, hotelName: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Owner Name</label>
              <input type="text" required placeholder="e.g. Junaid" value={signupForm.ownerName} onChange={(e) => setSignupForm({...signupForm, ownerName: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Email Address</label>
              <input type="email" required placeholder="owner@hotel.com" value={signupForm.email} onChange={(e) => setSignupForm({...signupForm, email: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Username</label>
                <input type="text" required placeholder="junaid_owner" value={signupForm.username} onChange={(e) => setSignupForm({...signupForm, username: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Password (min 4 chars)</label>
                <input type="password" required placeholder="••••" value={signupForm.password} onChange={(e) => setSignupForm({...signupForm, password: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Selected Plan</label>
              <input type="text" disabled value={signupForm.plan} style={{ width: '100%', padding: '10px', background: '#080808', border: '1px solid #222', borderRadius: '8px', color: '#D4AF37', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <button type="submit" style={{ marginTop: '10px', padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
              Complete Signup & Enter Dashboard
            </button>
          </form>

          <p style={{ fontSize: '11px', color: '#888', textAlign: 'center', marginTop: '16px' }}>
            Already have an account? <span onClick={() => setCurrentView('login')} style={{ color: '#D4AF37', cursor: 'pointer', textDecoration: 'underline' }}>Login here</span>
          </p>
        </div>
      )}

      {/* ================= 3. LOGIN PAGE ================= */}
      {currentView === 'login' && (
        <div style={{ maxWidth: '380px', margin: '50px auto', background: '#111', border: '1px solid #D4AF37', borderRadius: '16px', padding: '24px', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
          <h2 style={{ color: '#F3E5AB', fontSize: '20px', marginTop: 0, marginBottom: '6px' }}>Hotel Owner Login</h2>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>Enter your username and password to access your hotel management suite.</p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Username</label>
              <input type="text" required placeholder="junaid_owner" value={loginForm.username} onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Password</label>
              <input type="password" required placeholder="admin123" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
            </div>

            {loginError && <p style={{ fontSize: '11px', color: '#e74c3c', margin: 0 }}>{loginError}</p>}

            <button type="submit" style={{ marginTop: '10px', padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
              Secure Login 🔑
            </button>
          </form>

          <p style={{ fontSize: '11px', color: '#888', textAlign: 'center', marginTop: '16px' }}>
            New hotel? <span onClick={() => setCurrentView('signup')} style={{ color: '#D4AF37', cursor: 'pointer', textDecoration: 'underline' }}>Sign up here</span>
          </p>
        </div>
      )}

      {/* ================= 4. SAAS SUPER-ADMIN SCREEN ================= */}
      {currentView === 'saas_admin' && (
        <div style={{ maxWidth: '1100px', margin: '20px auto' }}>
          <div style={{ background: '#111', border: '1px solid #D4AF37', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
            <h2 style={{ color: '#F3E5AB', fontSize: '20px', marginTop: 0 }}>👑 SaaS Provider Master Dashboard</h2>
            <p style={{ fontSize: '11px', color: '#888' }}>Platform-wide overview of all registered hotels and subscriptions.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '16px' }}>
              <div style={{ background: '#161618', padding: '14px', borderRadius: '10px', border: '1px solid #333' }}>
                <span style={{ fontSize: '10px', color: '#888' }}>TOTAL HOTELS</span>
                <h3 style={{ fontSize: '28px', color: '#F3E5AB', margin: '4px 0 0 0' }}>{hotelsDB.length}</h3>
              </div>
              <div style={{ background: '#161618', padding: '14px', borderRadius: '10px', border: '1px solid #333' }}>
                <span style={{ fontSize: '10px', color: '#888' }}>MONTHLY RECURRING REVENUE (MRR)</span>
                <h3 style={{ fontSize: '28px', color: '#2ecc71', margin: '4px 0 0 0' }}>$8,420</h3>
              </div>
            </div>
          </div>

          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '14px', padding: '20px' }}>
            <h3 style={{ color: '#F3E5AB', fontSize: '16px', marginTop: 0, marginBottom: '12px' }}>Registered Hotels List</h3>
            <p style={{ fontSize: '11px', color: '#888', marginBottom: '14px' }}>🔒 Strict Privacy: Individual hotel daily sales and receipts are isolated from the SaaS provider.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {hotelsDB.map(h => (
                <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#161618', padding: '12px 16px', borderRadius: '8px', border: '1px solid #2a2a2a' }}>
                  <div>
                    <b style={{ color: '#F3E5AB', fontSize: '14px' }}>{h.hotelName}</b>
                    <span style={{ fontSize: '10px', color: '#888', display: 'block' }}>Owner: {h.ownerName} ({h.email})</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#D4AF37', background: 'rgba(212,175,55,0.1)', padding: '4px 10px', borderRadius: '6px' }}>{h.plan}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. HOTEL OWNER DASHBOARD (With Internal Tabs) ================= */}
      {currentView === 'owner_dashboard' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* OWNER SUB-TABS NAVIGATION BAR */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', background: '#111', padding: '10px', borderRadius: '12px', border: '1px solid #222' }}>
            <button onClick={() => setOwnerTab('floor')} style={{ padding: '8px 16px', background: ownerTab === 'floor' ? '#D4AF37' : '#1c1c1e', color: ownerTab === 'floor' ? '#000' : '#F3E5AB', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              📊 Owner 3D Dashboard & Revenue
            </button>
            <button onClick={() => setOwnerTab('waiter_view')} style={{ padding: '8px 16px', background: ownerTab === 'waiter_view' ? '#3b82f6' : '#1c1c1e', color: ownerTab === 'waiter_view' ? '#fff' : '#60a5fa', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              📱 Waiter Terminal (Embedded)
            </button>
            <button onClick={() => setOwnerTab('kitchen_view')} style={{ padding: '8px 16px', background: ownerTab === 'kitchen_view' ? '#e67e22' : '#1c1c1e', color: ownerTab === 'kitchen_view' ? '#000' : '#f39c12', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              🍳 Kitchen KOT Screen (Embedded)
            </button>
            <button onClick={() => setOwnerTab('settings')} style={{ padding: '8px 16px', background: ownerTab === 'settings' ? '#2ecc71' : '#1c1c1e', color: ownerTab === 'settings' ? '#000' : '#2ecc71', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              ⚙️ Hotel Settings & Security
            </button>
          </div>

          {/* TAB 1: OWNER 3D FLOOR & REVENUE */}
          {ownerTab === 'floor' && (
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: '#111', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', padding: '18px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>TOTAL REVENUE TODAY</span>
                  <h2 style={{ margin: '4px 0 0 0', fontSize: '30px', color: '#F3E5AB', fontWeight: '800' }}>${totalRevenue.toLocaleString()}</h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#2ecc71' }}>Estimated Net Profit: <b>${netProfit.toLocaleString()} (42%)</b></p>
                </div>

                <div style={{ borderTop: '1px solid #222', paddingTop: '10px' }}>
                  <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block' }}>HOTEL OWNER & PLAN</span>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#D4AF37', marginTop: '2px' }}>{currentOwner.ownerName} • {currentOwner.plan}</div>
                </div>

                <div style={{ borderTop: '1px solid #222', paddingTop: '10px' }}>
                  <span style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>TABLE STATUS</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#ccc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟡 Occupied</span> <b>{tables.filter(t => t.status === 'Occupied').length}</b></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🔵 Reserved</span> <b>{tables.filter(t => t.status === 'Reserved').length}</b></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>🟢 Available</span> <b>{tables.filter(t => t.status === 'Available').length}</b></div>
                  </div>
                </div>
              </div>

              {/* Responsive 3D Floor Plan with Touch Swipe Support */}
              <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', background: '#0d0d0d', border: '1px solid #222', borderRadius: '14px', padding: '14px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #222', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#F3E5AB' }}>{currentOwner.hotelName} • 3D FLOOR PLAN</span>
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

          {/* TAB 2: WAITER TERMINAL */}
          {ownerTab === 'waiter_view' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#111', border: '1px solid #3b82f6', borderRadius: '14px', padding: '20px' }}>
                <h2 style={{ color: '#60a5fa', fontSize: '18px', marginTop: 0 }}>📱 Waiter Order Terminal</h2>
                <p style={{ fontSize: '11px', color: '#888' }}>Take orders manually and dispatch directly to kitchen.</p>

                <form onSubmit={handleWaiterPlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Select Table & Manage Status</label>
                    <select value={orderForm.tableId} onChange={(e) => setOrderForm({ ...orderForm, tableId: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }}>
                      {tables.map(t => <option key={t.id} value={t.id}>Table {t.id} ({t.status})</option>)}
                    </select>
                  </div>

                  {/* Quick Status Toggles for Waiters */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button type="button" onClick={() => changeTableStatus(orderForm.tableId, 'Available')} style={{ flex: 1, padding: '6px', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#34d399', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Mark Available</button>
                    <button type="button" onClick={() => changeTableStatus(orderForm.tableId, 'Occupied')} style={{ flex: 1, padding: '6px', background: 'rgba(212,175,55,0.2)', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Mark Occupied</button>
                    <button type="button" onClick={() => changeTableStatus(orderForm.tableId, 'Reserved')} style={{ flex: 1, padding: '6px', background: 'rgba(59,130,246,0.2)', border: '1px solid #3b82f6', color: '#60a5fa', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Mark Reserved</button>
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Customer Name</label>
                    <input type="text" placeholder="e.g. Mr. Robert" value={orderForm.guestName} onChange={(e) => setOrderForm({ ...orderForm, guestName: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Dining Mode</label>
                    <select value={orderForm.orderType} onChange={(e) => setOrderForm({ ...orderForm, orderType: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }}>
                      <option value="Dine-In">🍽️ Dine-In</option>
                      <option value="Parcel">🛍️ Parcel / Takeaway</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 2 }}>
                      <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Menu Item</label>
                      <input type="text" value={orderForm.itemName} onChange={(e) => setOrderForm({ ...orderForm, itemName: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Price ($)</label>
                      <input type="number" value={orderForm.itemPrice} onChange={(e) => setOrderForm({ ...orderForm, itemPrice: e.target.value })} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                    </div>
                  </div>

                  <button type="submit" style={{ padding: '12px', background: '#3b82f6', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', marginTop: '6px' }}>
                    Dispatch Order to Kitchen 🚀
                  </button>
                </form>
              </div>

              <div style={{ background: '#111', border: '1px solid #222', borderRadius: '14px', padding: '20px' }}>
                <h3 style={{ color: '#F3E5AB', fontSize: '16px', marginTop: 0, marginBottom: '14px' }}>Live Order Status & Bills</h3>
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
                          <span>Total Bill:</span>
                          <span style={{ color: '#2ecc71' }}>${subtotal}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KITCHEN KOT SCREEN */}
          {ownerTab === 'kitchen_view' && (
            <div>
              <div style={{ background: '#111', border: '1px solid #e67e22', borderRadius: '14px', padding: '20px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ color: '#f39c12', fontSize: '20px', margin: 0 }}>🍳 Kitchen Order Tickets (KOT Screen)</h2>
                  <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0 0' }}>Live incoming orders with audio bell simulation.</p>
                </div>
                <button onClick={() => alert('🔔 KOT Order Bell Ringing!')} style={{ padding: '8px 14px', background: '#e67e22', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>
                  Test Bell 🔔
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {tables.filter(t => t.orderState === 'Cooking' || t.orderState === 'Ordering' || t.orderState === 'Ready to Serve').map(t => (
                  <div key={t.id} style={{ background: '#16130e', border: t.orderState === 'Ready to Serve' ? '1px solid #2ecc71' : '1px solid #e67e22', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <b style={{ color: '#F3E5AB', fontSize: '16px' }}>Table {t.id} [{t.type}]</b>
                      <span style={{ fontSize: '10px', background: 'rgba(230,126,34,0.2)', color: '#f39c12', padding: '3px 8px', borderRadius: '6px' }}>{t.guest}</span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#ccc', margin: '10px 0' }}>
                      <b>Items Ordered:</b>
                      <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                        {t.items.map((item, idx) => <li key={idx}>{item.name} (${item.price})</li>)}
                      </ul>
                    </div>

                    <div style={{ borderTop: '1px solid #222', paddingTop: '10px', marginTop: '10px' }}>
                      {t.orderState === 'Ready to Serve' ? (
                        <div style={{ textAlign: 'center', color: '#2ecc71', fontWeight: 'bold', fontSize: '13px' }}>
                          ✓ Marked Ready for Waiter Pickup
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

          {/* TAB 4: HOTEL SETTINGS & SECURITY */}
          {ownerTab === 'settings' && (
            <div style={{ maxWidth: '600px', background: '#111', border: '1px solid #2ecc71', borderRadius: '14px', padding: '24px' }}>
              <h2 style={{ color: '#2ecc71', fontSize: '18px', marginTop: 0, marginBottom: '6px' }}>⚙️ Hotel Settings & Security</h2>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>Update your hotel name, profile details, and secure password.</p>

              <form onSubmit={handleSettingsUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Hotel Name (Updates across all screens)</label>
                  <input type="text" required value={settingsForm.hotelName} onChange={(e) => setSettingsForm({...settingsForm, hotelName: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Owner Name</label>
                    <input type="text" required value={settingsForm.ownerName} onChange={(e) => setSettingsForm({...settingsForm, ownerName: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Email</label>
                    <input type="email" required value={settingsForm.email} onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #222', paddingTop: '14px', marginTop: '4px' }}>
                  <h4 style={{ fontSize: '14px', color: '#F3E5AB', margin: '0 0 10px 0' }}>Change Password (Optional)</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Current Password</label>
                      <input type="password" placeholder="Enter old password" value={settingsForm.oldPass} onChange={(e) => setSettingsForm({...settingsForm, oldPass: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>New Password (min 4 chars)</label>
                        <input type="password" placeholder="New password" value={settingsForm.newPass} onChange={(e) => setSettingsForm({...settingsForm, newPass: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>Confirm New Password</label>
                        <input type="password" placeholder="Confirm new password" value={settingsForm.confirmPass} onChange={(e) => setSettingsForm({...settingsForm, confirmPass: e.target.value})} style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" style={{ marginTop: '10px', padding: '12px', background: '#2ecc71', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  Save Settings & Security Changes
                </button>

                {settingsMsg && <p style={{ fontSize: '12px', color: settingsMsg.includes('✓') ? '#2ecc71' : '#e74c3c', margin: '4px 0 0 0' }}>{settingsMsg}</p>}
              </form>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
