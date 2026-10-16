'use client';
import React, { useState } from 'react';

export default function Page() {
  const [selectedTable, setSelectedTable] = useState('T3');

  // Interactive Table Hotspots placed over the 3D Image
  const tables = [
    { id: 'T1', top: '48%', left: '33%', status: 'Occupied', guests: 2 },
    { id: 'T2', top: '56%', left: '42%', status: 'Available', seats: 4 },
    { id: 'T3', top: '43%', left: '67%', status: 'Occupied', guests: 4, time: '52m' },
    { id: 'T4', top: '58%', left: '61%', status: 'Occupied', guests: 4 },
    { id: 'T5', top: '65%', left: '52%', status: 'Occupied', guests: 2 },
    { id: 'T6', top: '48%', left: '77%', status: 'Reserved', time: '8:00 PM' },
    { id: 'T7', top: '56%', left: '86%', status: 'Reserved', time: '8:30 PM' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', padding: '10px' }}>
      
      {/* MAIN CONTAINER OVERLAYING 3D IMAGE */}
      <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 30px rgba(212,175,55,0.15)' }}>
        
        {/* BACKGROUND 3D RENDER IMAGE */}
        <img 
          src="/hero-ultra.webp" 
          alt="3D Restaurant Floor Plan" 
          style={{ width: '100%', height: 'auto', display: 'block', minHeight: '500px', objectFit: 'cover' }}
        />

        {/* INTERACTIVE CLICKABLE TABLE OVERLAYS */}
        {tables.map((t) => (
          <div
            key={t.id}
            onClick={() => setSelectedTable(t.id)}
            style={{
              position: 'absolute',
              top: t.top,
              left: t.left,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              padding: '6px 10px',
              borderRadius: '20px',
              background: selectedTable === t.id ? 'rgba(212, 175, 55, 0.9)' : 'rgba(0, 0, 0, 0.75)',
              color: selectedTable === t.id ? '#000' : '#F3E5AB',
              border: selectedTable === t.id ? '2px solid #fff' : '1px solid #D4AF37',
              fontSize: '10px',
              fontWeight: 'bold',
              boxShadow: selectedTable === t.id ? '0 0 15px #D4AF37' : '0 2px 8px rgba(0,0,0,0.8)',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
          >
            {t.id} • {t.status}
          </div>
        ))}

      </div>

    </div>
  );
}
