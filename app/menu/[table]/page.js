'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

const MENU = [
  { id: 1, name: 'Zinger Burger', price: 8, cat: 'Burgers', image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400' },
  { id: 2, name: 'Chicken Pizza', price: 12, cat: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { id: 3, name: 'Chicken Biryani', price: 10, cat: 'Desi', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400' },
  { id: 4, name: 'Loaded Fries', price: 4, cat: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400' },
  { id: 5, name: 'Cold Drink', price: 3, cat: 'Drinks', image: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=400' },
  { id: 6, name: 'Club Sandwich', price: 9, cat: 'Burgers', image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=400' },
];

export default function MenuPage() {
  const params = useParams();
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
  const decQty = (id) => setCart(prev => prev.map(p => p.id===id ? {...p, qty: p.qty-1} : p).filter(p=>p.qty>0));
  const removeItem = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  const placeOrder = async () => {
    if (!name) return alert('Name likho bhai');
    if (cart.length===0) return alert('Kuch select karo');
    try {
      const { error } = await supabase.from('orders').insert([{ table_id: tableId, items: cart, total, status: 'New', customer_name: name }]);
      if(error) throw error;
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
        <div style={{ border: '1px solid #D4AF37', borderRadius: '16px', padding: '14px', marginBottom: '16px', background: 'linear-gradient(to right, #111, #1a1a1a)' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Table {tableId} 🍽️</h2>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#888' }}>Scan QR - Order Real Food - Kitchen LIVE</p>
          <input placeholder="Your Name likho..." value={name} onChange={e=>setName(e.target.value)} style={{ width: '100%', marginTop: '12px', padding: '10px 14px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }} />
        </div>

        {MENU.map(item => {
          const inCart = cart.find(c => c.id === item.id);
          return (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', border: '1px solid #222', borderRadius: '14px', padding: '10px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '58px', height: '58px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #333' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: '#888' }}>{item.cat} • <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>${item.price}</span></div>
                </div>
              </div>
              {inCart ? (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button onClick={()=>decQty(item.id)} style={{ width: '30px', height: '30px', background: '#333', color: '#fff', border: 'none', borderRadius: '50%', fontWeight: 'bold' }}>-</button>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{inCart.qty}</span>
                  <button onClick={()=>addToCart(item)} style={{ width: '30px', height: '30px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '50%', fontWeight: 'bold' }}>+</button>
                  <button onClick={()=>removeItem(item.id)} style={{ marginLeft: '2px', fontSize: '10px', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 7px' }}>X</button>
                </div>
              ) : (
                <button onClick={()=>addToCart(item)} style={{ padding: '8px 16px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', border: 'none', borderRadius: '20px', fontWeight: 'bold', color: '#000' }}>+ Add</button>
              )}
            </div>
          );
        })}

        {cart.length>0 && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', borderTop: '2px solid #D4AF37', padding: '14px', maxWidth: '500px', margin: '0 auto', borderRadius: '16px 16px 0 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
              <span>{cart.reduce((a,b)=>a+b.qty,0)} items • <b style={{ color: '#D4AF37' }}>${total}</b></span>
              <button onClick={()=>setCart([])} style={{ fontSize: '11px', background: 'transparent', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '6px', padding: '3px 10px' }}>Clear All</button>
            </div>
            <button onClick={placeOrder} style={{ width: '100%', padding: '14px', background: 'linear-gradient(to right, #D4AF37, #AA771C)', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px' }}>Place Order - ${total} 🍽️</button>
          </div>
        )}
      </div>
    </div>
  );
}
