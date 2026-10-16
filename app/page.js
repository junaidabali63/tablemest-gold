'use client';

import React, { useState } from 'react';

export default function Page() {
  const [selectedTable, setSelectedTable] = useState({ id: 'T3', status: 'Occupied', guests: 4, time: '52m' });

  const tables = [
    { id: 'T1', x: '15%', y: '30%', status: 'Available', seats: 2 },
    { id: 'T2', x: '32%', y: '25%', status: 'Occupied', guests: 4, time: '45m' },
    { id: 'T3', x: '50%', y: '35%', status: 'Occupied', guests: 4, time: '52m' },
    { id: 'T4', x: '70%', y: '28%', status: 'Reserved', time: '8:00 PM' },
    { id: 'T5', x: '20%', y: '60%', status: 'Occupied', guests: 2, time: '20m' },
    { id: 'T6', x: '45%', y: '65%', status: 'Available', seats: 4 },
    { id: 'T7', x: '72%', y: '60%', status: 'Reserved', time: '8:30 PM' },
  ];

  return (
    <main className="min-h-screen bg-[#070707] text-[#D4AF37] font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {/* TOP HEADER */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#222] bg-[#0c0c0c]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-[#D4AF37] flex items-center justify-center font-bold text-sm bg-[#D4AF37]/10 text-[#D4AF37]">
            💎
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-widest text-[#F3E5AB]">RESTAURANT OPS</h1>
            <p className="text-[10px] text-neutral-400 tracking-wider">FLOOR PLAN • LIVE</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs bg-[#141414] px-3 py-1.5 rounded-full border border-[#2a2a2a]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-medium">LIVE</span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-300">UPDATED 2 MIN AGO</span>
          </div>
          <div className="text-xs text-neutral-400 hidden lg:block">
            Fri, Oct 16, 2026 • 10:12 PM PKT
          </div>
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-sm shadow-lg shadow-[#D4AF37]/20">
            JD
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        
        {/* LEFT SIDEBAR - ANALYTICS & STATUS */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* OCCUPANCY CARD */}
          <div className="bg-[#111111] border border-[#262626] rounded-xl p-5 shadow-xl relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none"></div>
            <p className="text-xs text-neutral-400 tracking-wider font-semibold mb-1">OCCUPANCY</p>
            <h2 className="text-4xl font-extrabold text-[#F3E5AB] mb-1">62%</h2>
            <p className="text-xs text-neutral-400">12 / 19 seats filled</p>
            <div className="w-full bg-[#222] h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] h-full w-[62%] rounded-full"></div>
            </div>
          </div>

          {/* REVENUE TODAY */}
          <div className="bg-[#111111] border border-[#262626] rounded-xl p-5 shadow-xl hover:border-[#D4AF37]/50 transition-all">
            <p className="text-xs text-neutral-400 tracking-wider font-semibold mb-1">REVENUE TODAY</p>
            <h2 className="text-3xl font-extrabold text-[#F3E5AB] mb-1">$4,820</h2>
            <p className="text-xs text-emerald-400 font-medium">+12.4% vs yesterday ↑</p>
          </div>

          {/* AVG TURN TIME */}
          <div className="bg-[#111111] border border-[#262626] rounded-xl p-5 shadow-xl hover:border-[#D4AF37]/50 transition-all">
            <p className="text-xs text-neutral-400 tracking-wider font-semibold mb-1">AVG TURN TIME</p>
            <h2 className="text-3xl font-extrabold text-[#F3E5AB] mb-1">48 min</h2>
            <p className="text-xs text-emerald-400 font-medium">Target: &lt;60min ✓</p>
          </div>

          {/* TABLE STATUS */}
          <div className="bg-[#111111] border border-[#262626] rounded-xl p-5 shadow-xl">
            <p className="text-xs text-neutral-400 tracking-wider font-semibold mb-3">TABLE STATUS</p>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-neutral-300"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Occupied</span>
                <span className="font-bold text-white">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-neutral-300"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Reserved</span>
                <span className="font-bold text-white">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-neutral-300"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Available</span>
                <span className="font-bold text-white">1</span>
              </div>
            </div>
          </div>

          {/* NEW RESERVATION BUTTON */}
          <button className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-bold rounded-xl shadow-lg hover:opacity-90 transition-all text-sm tracking-wide">
            + NEW RESERVATION
          </button>

        </div>

        {/* CENTER / RIGHT - 3D FLOOR PLAN VIEW */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          
          <div className="relative bg-[#0d0d0d] border border-[#222] rounded-2xl h-[550px] overflow-hidden shadow-2xl flex items-center justify-center p-4">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60"></div>
            
            {/* Ambient Gold Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#AA771C]/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* ISOMETRIC ROOM CONTAINER */}
            <div className="relative w-full h-full max-w-4xl max-h-[500px] border border-[#333] rounded-xl bg-[#090909]/90 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
              
              {/* Bar Counter Area (Top) */}
              <div className="self-end w-2/3 h-20 border border-[#D4AF37]/40 bg-gradient-to-r from-[#1a150b] to-[#111] rounded-xl flex items-center justify-between px-6 shadow-lg shadow-[#D4AF37]/5">
                <div className="text-xs font-bold text-[#F3E5AB] tracking-widest flex items-center gap-2">
                  <span>🍸</span> PREMIUM BAR & LOUNGE COUNTER
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-[#222] text-[10px] rounded border border-[#333] text-neutral-300">Bottles Stock: 98%</span>
                  <span className="px-2 py-1 bg-[#D4AF37]/20 text-[10px] rounded border border-[#D4AF37]/40 text-[#F3E5AB]">Active Bartender</span>
                </div>
              </div>

              {/* Interactive Tables Placed on Floor */}
              <div className="absolute inset-0 pointer-events-none">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    style={{ top: table.y, left: table.x }}
                    className={`absolute pointer-events-auto cursor-pointer p-4 rounded-xl border transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 shadow-xl backdrop-blur-md flex flex-col items-center gap-1 ${
                      selectedTable.id === table.id
                        ? 'border-[#F3E5AB] bg-[#1a150b] shadow-[#D4AF37]/30 scale-110'
                        : table.status === 'Occupied'
                        ? 'border-[#D4AF37]/50 bg-[#12110c] hover:border-[#D4AF37]'
                        : table.status === 'Reserved'
                        ? 'border-blue-500/50 bg-[#0c1014] hover:border-blue-400'
                        : 'border-emerald-500/50 bg-[#0c1410] hover:border-emerald-400'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/40 flex items-center justify-center font-bold text-xs text-[#F3E5AB]">
                      {table.id}
                    </div>
                    <div className="text-[10px] font-semibold tracking-wider text-neutral-300 uppercase">
                      {table.status}
                    </div>
                    {table.guests && (
                      <div className="text-[9px] text-[#D4AF37]">
                        👥 {table.guests} Guests ({table.time})
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Entrance Gate (Bottom Left) */}
              <div className="self-start px-4 py-2 border border-[#444] bg-[#141414] rounded-lg text-[10px] tracking-widest text-neutral-400 font-bold">
                🚪 MAIN ENTRANCE
              </div>

            </div>

          </div>

          {/* BOTTOM FOOTER STATUS BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111111] border border-[#262626] rounded-xl p-4 text-xs">
            <div>
              <span className="text-neutral-500 block">ACTIVE STAFF</span>
              <span className="font-bold text-[#F3E5AB]">5 Members Online</span>
            </div>
            <div>
              <span className="text-neutral-500 block">HOST STATUS</span>
              <span className="font-bold text-emerald-400">Online & Ready</span>
            </div>
            <div>
              <span className="text-neutral-500 block">KITCHEN PACE</span>
              <span className="font-bold text-emerald-400">On Track (Optimal)</span>
            </div>
            <div>
              <span className="text-neutral-500 block">AMBIENT TEMP</span>
              <span className="font-bold text-[#F3E5AB]">72°F Climate Control</span>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
