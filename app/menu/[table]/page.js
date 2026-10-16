'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// PREMIUM LUXURY IMAGES - 100% MATCHING
const MENU = [
  { id: 1, name: 'Zinger Burger', price: 8, cat: 'Juicy & Crispy', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600' },
  { id: 2, name: 'Chicken Pizza', price: 12, cat: 'Cheesy Delight', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600' },
  { id: 3, name: 'Chicken Biryani', price: 10, cat: 'Desi Special', image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600' },
  { id: 4, name: 'Loaded Fries', price: 4, cat: 'Golden Crunch', image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600' },
  { id: 5, name: 'Cold Drink', price: 3, cat: 'Chilled', image: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=600' },
  { id: 6, name: 'Club Sandwich', price: 9, cat: 'Premium Club', image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=600' },
];

export default function MenuPage() {
  const params = useParams();
  const tableId = params?.tableId || 'T1';
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
  const decQty = (id) => setCart(prev => prev.map(p => p.id===id ? {...p, qty: p.qty-1} : p).filter(p=>p.qty>0));
  const removeItem = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  const placeOrder = async () => {
    if (!name) return alert('Name likho bhai');
    if (cart.length===0) return alert('Kuch select karo');
    if (!supabase) { setPlaced(true); return; }
    try {
      await supabase.from('orders').insert([{ table_id: tableId, items: cart, total, status: 'New', customer_name: name }]);
      await supabase.from('tables').update({ status: 'Occupied', name: name }).eq('id', tableId);
      setPlaced(true); setCart([]);
    } catch(e){ alert('Error: '+e.message); }
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
        <div style={{ border: '1px solid #D4AF37', borderRadius: '16px', padding: '14px', marginBottom: '16px', background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)' }}>
          <h2 style={{ margin: 0, color: '#D4AF37' }}>Table {tableId} 🍽️ Premium Menu</h2>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#888' }}>Luxury Dining - Real Photos</p>
          <input placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} style={{ width: '100%', marginTop: '12px', padding: '12px 14px', background: '#000', border: '1px solid #333', borderRadius: '10px', color: '#fff' }} />
        </div>

        {MENU.map(item => {
          const inCart = cart.find(c => c.id === item.id);
          return (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #111, #161616)', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: '14px', objectFit: 'cover', border: '1px solid #D4AF37' }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#F3E5AB' }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{item.cat}</div>
                  <div style={{ fontSize: '13px', color: '#D4AF37', fontWeight: 'bold', marginTop: '2px' }}>${item.price}</div>
                </div>
              </div>
              {inCart ? (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', background: '#000', border: '1px solid #333', borderRadius: '30px', padding: '4px' }}>
                  <button onClick={()=>decQty(item.id)} style={{ width: '32px', height: '32px', background: '#222', color: '#fff', border: 'none', borderRadius: '50%', fontWeight: 'bold' }}>-</button>
                  <span style={{ fontWeight: 'bold', minWidth: '22px', textAlign: 'center', color: '#D4AF37' }}>{inCart.qty}</span>
                  <button onClick={()=>addToCart(item)} style={{ width: '32px', height: '32px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '50%', fontWeight: 'bold' }}>+</button>
                </div>
              ) : (
                <button onClick={()=>addToCart(item)} style={{ padding: '10px 18px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', border: 'none', borderRadius: '24px', fontWeight: 'bold', color: '#000', boxShadow: '0 2px 10px rgba(212,175,55,0.3)' }}>+ Add</button>
              )}
            </div>
          );
        })}

        {cart.length>0 && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', borderTop: '2px solid #D4AF37', padding: '16px', maxWidth: '500px', margin: '0 auto', borderRadius: '20px 20px 0 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px' }}>{cart.reduce((a,b)=>a+b.qty,0)} items • <b style={{ color: '#D4AF37' }}>${total}</b></span>
              <button onClick={()=>setCart([])} style={{ fontSize: '11px', background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '8px', padding: '4px 12px' }}>Clear All ✕</button>
            </div>
            <button onClick={placeOrder} style={{ width: '100%', padding: '16px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px' }}>Place Order - ${total} 🍽️</button>
          </div>
        )}
      </div>
    </div>
  );
}
