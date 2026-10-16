"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jvvqzlxeijakbqmwnrqa.supabase.co";
const supabaseKey = "sb_publishable_6gF4V4l6t_Qa2ywG4HePAg_srLgmW4B";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [tables, setTables] = useState([]);
  const [revenue, setRevenue] = useState(4824);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const { data } = await supabase.from("tables").select("*").order("id");
    if (data) {
      const mapped = data.map(t => ({...t, top: t.top_pos, left: t.left_pos }));
      setTables(mapped);
    }
    const { data: state } = await supabase.from("app_state").select("*").single();
    if (state) setRevenue(state.revenue);
    setLoading(false);
  }

  async function handleTableClick(table) {
    if (table.status === 'Available') {
      await supabase.from("tables").update({ status: 'Occupied', guests: 2, name: 'Walk-in Guest', time: 'Just now' }).eq("id", table.id);
    } else if (table.status === 'Occupied') {
      const newRev = revenue + 120;
      await supabase.from("tables").update({ status: 'Available', guests: 0, name: '', time: '' }).eq("id", table.id);
      await supabase.from("app_state").update({ revenue: newRev }).eq("id", 1);
      setRevenue(newRev);
    } else if (table.status === 'Reserved') {
      await supabase.from("tables").update({ status: 'Occupied', time: 'Just now' }).eq("id", table.id);
    }
    fetchData();
  }

  if (loading) return <div style={{minHeight:'100vh', background:'#0f1115', color:'white', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading GOLD...</div>;

  return (
    <div style={{minHeight:'100vh', background:'#0f1115', color:'white', padding:'20px', fontFamily:'sans-serif'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px', flexWrap:'wrap', gap:'10px'}}>
        <div>
          <h1 style={{fontSize:'32px', fontWeight:'bold', margin:0}}>TableNest <span style={{color:'#fbbf24'}}>GOLD</span> <span style={{fontSize:'18px', background:'#22c55e', padding:'4px 10px', borderRadius:'20px'}}>● LIVE</span></h1>
          <p style={{color:'#9ca3af', fontSize:'13px', margin:'4px 0 0 0'}}>Supabase Connected • Isometric Luxury View</p>
        </div>
        <div style={{background:'#1a1d24', padding:'12px 24px', borderRadius:'16px', border:'1px solid #2a2e39'}}>
          <p style={{fontSize:'11px', color:'#9ca3af', margin:0}}>TODAY REVENUE</p>
          <p style={{fontSize:'28px', fontWeight:'bold', color:'#4ade80', margin:0}}>${revenue}</p>
        </div>
      </div>

      <div style={{position:'relative', width:'100%', height:'700px', background:'radial-gradient(circle at 50% 0%, #1e212e 0%, #151821 100%)', borderRadius:'24px', border:'1px solid #2a2e39', overflow:'hidden', padding:'20px'}}>
        {/* Floor Pattern */}
        <div style={{position:'absolute', inset:0, opacity:0.05, backgroundImage:'linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)', backgroundSize:'40px 40px'}}></div>
        
        {tables.map(t => (
          <div key={t.id} onClick={() => handleTableClick(t)}
            style={{position:'absolute', top:t.top, left:t.left, width:'110px', height:'110px', borderRadius:'50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', fontWeight:'bold', border:'2px solid', transition:'all 0.2s', 
            background: t.status==='Available' ? '#2a2e39' : t.status==='Occupied' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'linear-gradient(135deg, #9333ea, #7e22ce)',
            borderColor: t.status==='Available' ? '#4b5563' : '#fed7aa',
            boxShadow: t.status==='Available' ? 'none' : '0 0 20px rgba(251,191,36,0.4)',
            transform:'perspective(500px) rotateX(20deg)'}}>
            <span style={{fontSize:'20px'}}>{t.id}</span>
            <span style={{fontSize:'10px', marginTop:'2px'}}>{t.status}</span>
            <span style={{fontSize:'9px', opacity:0.8}}>{t.guests>0 ? `${t.guests} Guests` : ''}</span>
          </div>
        ))}

        <div style={{position:'absolute', bottom:'20px', left:'20px', display:'flex', gap:'12px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'12px'}}><div style={{width:'12px', height:'12px', background:'#2a2e39', borderRadius:'50%'}}></div> Available</div>
          <div style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'12px'}}><div style={{width:'12px', height:'12px', background:'#f97316', borderRadius:'50%'}}></div> Occupied</div>
          <div style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'12px'}}><div style={{width:'12px', height:'12px', background:'#9333ea', borderRadius:'50%'}}></div> Reserved</div>
        </div>
      </div>

      <p style={{marginTop:'16px', textAlign:'center', color:'#6b7280', fontSize:'12px'}}>✨ Click any table to change status • Data saved in Supabase LIVE • Premium Isometric Design</p>
    </div>
  );
}
