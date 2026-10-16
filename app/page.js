'use client';
import React, { useState } from 'react';

export default function Page() {
  const [selectedTable, setSelectedTable] = useState('T3');

  const tables = [
    { id: 'T1', top: '48%', left: '33%', status: 'Occupied' },
    { id: 'T2', top: '56%', left: '42%', status: 'Available' },
    { id: 'T3', top: '43%', left: '67%', status: 'Occupied' },
    { id: 'T4', top: '58%', left: '61%', status: 'Occupied' },
    { id: 'T5', top: '65%', left: '52%', status: 'Occupied' },
    { id: 'T6', top: '48%', left: '77%', status: 'Reserved' },
    { id: 'T7', top: '56%', left: '86%', status: 'Reserved' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif', padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 10px' }}>
        <div style={{ position: 'relative', minWidth: '650px', width: '100%', maxWidth: '1100px', margin: '0 auto', borderRadius: '12px', border: '1px solid #333', boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}>
          
          <img 
            src="/hero-ultra.webp" 
            alt="Restaurant 3D View" 
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
          />

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
                padding: '4px 8px',
                borderRadius: '15px',
                background: selectedTable === t.id ? '#D4AF37' : 'rgba(0, 0, 0, 0.85)',
                color: selectedTable === t.id ? '#000' : '#F3E5AB',
                border: '1px solid #D4AF37',
                fontSize: '9px',
                fontWeight: 'bold',
                boxShadow: '0 2px 6px rgba(0,0,0,0.9)',
                whiteSpace: 'nowrap',
                zIndex: 10
              }}
            >
              {t.id} • {t.status}
            </div>
          ))}

        </div>
      </div>

      <p style={{ fontSize: '11px', color: '#888', marginTop: '12px', textAlign: 'center' }}>
        Swipe left/right to view full floor plan
      </p>

    </div>
  );
}
