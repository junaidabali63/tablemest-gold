'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const MENU = [
  { id: 1, name: 'Zinger Burger', price: 8, image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400' },
  { id: 2, name: 'Chicken Pizza', price: 12, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
  { id: 3, name: 'Chicken Biryani', price: 10, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400' },
];

export default function MenuPage() {
  const params = useParams();
  const tableId = params?.tableId || 'T1';
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const f = prev.find(p => p.id === item.id);
      if (f) return prev.map(p => p.id === item.id ? {...p, qty: p.qty+1} : p);
      return [...prev, {...item, qty: 1}];
    });
  };
  const decQty = (id) => setCart(prev => prev.map(p => p.id===id ? {...p, qty: p.qty-1} : p).filter(p=>p.qty>0));

  return (
    <div style={{ minHeight: '100vh', background: '#070707', color: '#fff', padding: '20px' }}>
      <h2 style={{ color: '#D4AF37' }}>TEST - Table {tableId} 🍽️</h2>
      <p style={{ color: '#888' }}>Agar ye dikh raha hai to Supabase ka masla hai</p>
      {MENU.map(item => (
        <div key={item.id} style={{ display: 'flex', gap: '10px', background: '#111', padding: '10px', marginBottom: '10px', borderRadius: '10px', alignItems: 'center' }}>
          <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
          <span>{item.name} - ${item.price}</span>
          <button onClick={()=>addToCart(item)} style={{ marginLeft: 'auto', background: '#D4AF37', padding: '5px 10px', borderRadius: '20px' }}>Add</button>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        Cart: {cart.map(c=> `${c.name} x${c.qty}`).join(', ')}
      </div>
    </div>
  );
}
