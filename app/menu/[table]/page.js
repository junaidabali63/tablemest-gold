'use client';
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const MENU = [
  { id: 1, name: 'Zinger Burger', price: 8, img: '🍔', cat: 'Burgers' },
  { id: 2, name: 'Chicken Pizza', price: 12, img: '🍕', cat: 'Pizza' },
  { id: 3, name: 'Chicken Biryani', price: 10, img: '🍛', cat: 'Desi' },
  { id: 4, name: 'Fries', price: 4, img: '🍟', cat: 'Sides' },
  { id: 5, name: 'Cold Drink', price: 3, img: '🥤', cat: 'Drinks' },
  { id: 6, name: 'Club Sandwich', price: 9, img: '🥪', cat: 'Burgers' },
];

export default function MenuPage({ params }) {
  const tableId = params.tableId || 'T1';
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [placed, setPlaced] = useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const f = prev.find(p => p.id === item.id);
      if (f) return prev.map(p => p.id === item.id ? {...p, qty: p.qty+1} : p);
      return [...prev, {...item, qty: 1}];
    });
  };
  
  const decQty = (id) => {
    setCart(prev => {
      return prev.map(p => p.id === id ? {...p, qty: p.qty-1} : p).filter(p => p.qty > 0);
    });
  };

  const removeItem = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = async () => {
    if (!name || cart.length === 0) return alert('Name likho aur item select karo');
    await supabase.from('orders').insert([{ table_id: tableId, items: cart, total, status: 'New', customer_name: name }]);
    await supabase.from('tables').update({ status: 'Occupied', name: name, guests: 2 }).eq('id', tableId);
    setPlaced(true);
    setCart([]);
  };

  if (placed) {
    return (
      <div style={{ minHeight: '100vh', background: '#070707', color: '#F3E5AB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px' }}>✅</div>
        <h1 style={{ color: '#D4AF37' }}>Order Placed!</h1>
        <p>Table {tableId} - Chef is cooking 👨‍🍳</p>
        <button onClick={()=>setPlaced(false)} style={{ marginTop: '20px', padding: '10px 20px', background: '#D4AF37', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Order More</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070707', color: '#F3E5AB', padding: '16px 16px 120px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ border: '1px solid #D4AF37', borderRadius: '12px', padding: '14px', marginBottom: '16px', background: '#111' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>Table {tableId} 🍽️</h2>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#888' }}>Scan QR - Order Food - Kitchen LIVE</p>
          <input placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} style={{ width: '100%', marginTop: '10px', padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff' }} />
        </div>

        {MENU.map(item => {
          const inCart = cart.find(c => c.id === item.id);
          return (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', border: '1px solid #222', borderRadius: '10px', padding: '12px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>{item.img}</span>
                <div><div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div><div style={{ fontSize: '11px', color: '#888' }}>{item.cat} • ${item.price}</div></div>
              </div>
              {inCart ? (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button onClick={()=>decQty(item.id)} style={{ width: '28px', height: '28px', background: '#333', color: '#fff', border: 'none', borderRadius: '50%', fontWeight: 'bold' }}>-</button>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{inCart.qty}</span>
                  <button onClick={()=>addToCart(item)} style={{ width: '28px', height: '28px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '50%', fontWeight: 'bold' }}>+</button>
                  <button onClick={()=>removeItem(item.id)} style={{ marginLeft: '4px', fontSize: '10px', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 6px' }}>X</button>
                </div>
              ) : (
                <button onClick={()=>addToCart(item)} style={{ padding: '6px 14px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', border: 'none', borderRadius: '20px', fontWeight: 'bold' }}>+ Add</button>
              )}
            </div>
          );
        })}

        {cart.length > 0 && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', borderTop: '1px solid #D4AF37', padding: '14px', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
              <span>{cart.reduce((a,b)=>a+b.qty,0)} items - ${total}</span>
              <button onClick={()=>setCart([])} style={{ fontSize: '11px', background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '4px', padding: '2px 8px' }}>Clear All</button>
            </div>
            <button onClick={placeOrder} style={{ width: '100%', padding: '12px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>Place Order - ${total} 🍽️</button>
          </div>
        )}
      </div>
    </div>
  );
}
