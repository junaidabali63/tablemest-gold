"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jvvqzlxeijakbqmwnrqa.supabase.co";
const supabaseKey = "sb_publishable_6gF4V4l6t_Qa2ywG4HePAg_srLgmW4B";
const supabase = createClient(supabaseUrl, supabaseKey);

const POSITIONS = [
  {top:"18%", left:"12%"}, {top:"18%", left:"38%"}, {top:"18%", left:"65%"},
  {top:"42%", left:"12%"}, {top:"42%", left:"38%"}, {top:"42%", left:"65%"},
  {top:"68%", left:"12%"}, {top:"68%", left:"38%"}, {top:"68%", left:"65%"},
];

export default function Home() {
  const [tables, setTables] = useState([]);
  const [revenue, setRevenue] = useState(4824);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(()=>{ fetchData(); },[]);

  async function fetchData(){
    setLoading(true);
    const {data} = await supabase.from("tables").select("*").order("id");
    if(data) setTables(data);
    const {data:st} = await supabase.from("app_state").select("*").single();
    if(st) setRevenue(st.revenue);
    setLoading(false);
  }

  async function handleTableClick(t){
    setSelected(t);
    if(t.status==='Available'){
      await supabase.from("tables").update({status:'Occupied', guests:2, name:'Walk-in Guest', time:'Just now'}).eq("id",t.id);
    } else if(t.status==='Occupied'){
      const nr = revenue + 120;
      await supabase.from("tables").update({status:'Available', guests:0, name:'', time:''}).eq("id",t.id);
      await supabase.from("app_state").update({revenue:nr}).eq("id",1);
      setRevenue(nr);
    } else if(t.status==='Reserved'){
      await supabase.from("tables").update({status:'Occupied', time:'Just now'}).eq("id",t.id);
    }
    fetchData();
  }

  if(loading) return <div style={{minHeight:'100vh', background:'#0a0a0c', color:'#fbbf24', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'serif', fontSize:'24px'}}>TableNest GOLD Loading...</div>;

  const occupied = tables.filter(t=>t.status==='Occupied').length;

  return (
    <div style={{minHeight:'100vh', background:'#080a0f', color:'white', fontFamily:'Inter, sans-serif', padding:'0', margin:'0'}}>
      {/* HEADER - Luxury */}
      <div style={{background:'linear-gradient(90deg, #10121a 0%, #1a1d2a 100%)', borderBottom:'1px solid #232635', padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:10}}>
        <div>
          <h1 style={{margin:0, fontSize:'26px', fontWeight:'900', letterSpacing:'-0.5px'}}>TABLENEST <span style={{background:'linear-gradient(90deg, #fbbf24, #f59e0b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', fontWeight:'900'}}>GOLD</span></h1>
          <p style={{margin:'2px 0 0 0', fontSize:'11px', color:'#6b7280', letterSpacing:'1px'}}>LUXURY • ISOMETRIC • LIVE SUPABASE</p>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
          <div style={{background:'#161a26', border:'1px solid #2a2e40', borderRadius:'12px', padding:'8px 14px', textAlign:'center'}}>
            <p style={{margin:0, fontSize:'9px', color:'#8b8fa3', letterSpacing:'1px'}}>OCCUPIED</p>
            <p style={{margin:0, fontSize:'16px', fontWeight:'bold', color:'#fbbf24'}}>{occupied}/9</p>
          </div>
          <div style={{background:'linear-gradient(135deg, #1a2e1a, #1f3a1f)', border:'1px solid #2a5a2a', borderRadius:'12px', padding:'8px 14px', textAlign:'center'}}>
            <p style={{margin:0, fontSize:'9px', color:'#8fbf8f', letterSpacing:'1px'}}>REVENUE</p>
            <p style={{margin:0, fontSize:'16px', fontWeight:'bold', color:'#4ade80'}}>${revenue}</p>
          </div>
        </div>
      </div>

      {/* FLOOR PLAN - Real Restaurant */}
      <div style={{padding:'14px'}}>
        <div style={{position:'relative', width:'100%', height:'680px', background:'radial-gradient(ellipse at top, #1e2235 0%, #12141f 60%)', borderRadius:'24px', border:'1px solid #232635', overflow:'hidden', boxShadow:'inset 0 0 100px rgba(0,0,0,0.5)'}}>
          
          {/* Grid + Zones */}
          <div style={{position:'absolute', inset:0, opacity:0.06, backgroundImage:'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize:'48px 48px'}}></div>
          
          <div style={{position:'absolute', top:'10px', left:'12px', background:'#1a1d2a', border:'1px solid #2a2e40', padding:'5px 10px', borderRadius:'8px', fontSize:'10px', color:'#8b8fa3'}}>▭ ENTRANCE</div>
          <div style={{position:'absolute', top:'10px', right:'12px', background:'#2a1f0f', border:'1px solid #4a3410', padding:'5px 10px', borderRadius:'8px', fontSize:'10px', color:'#fbbf24'}}>☕ BAR</div>
          <div style={{position:'absolute', bottom:'10px', right:'12px', background:'#1a1f2a', border:'1px solid #2a3440', padding:'5px 10px', borderRadius:'8px', fontSize:'10px', color:'#8b8fa3'}}>🍳 KITCHEN</div>

          {/* Tables - Isometric Luxury */}
          {tables.map((t,i)=>{
            const pos = POSITIONS[i] || POSITIONS[0];
            const isAv = t.status==='Available';
            const isOc = t.status==='Occupied';
            return (
              <div key={t.id} onClick={()=>handleTableClick(t)}
                style={{position:'absolute', top:pos.top, left:pos.left, width:'92px', height:'92px', cursor:'pointer', transition:'all 0.3s ease'}}>
                {/* Table Shadow */}
                <div style={{position:'absolute', top:'8px', left:'4px', width:'92px', height:'92px', background:'rgba(0,0,0,0.6)', borderRadius:'50%', filter:'blur(8px)'}}></div>
                {/* Table Body */}
                <div style={{position:'relative', width:'92px', height:'92px', borderRadius:'50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', border:'2.5px solid', 
                  background: isAv ? 'linear-gradient(145deg, #2a2e40, #1e2130)' : isOc ? 'linear-gradient(145deg, #ff8c2a, #e05a00)' : 'linear-gradient(145deg, #a855f7, #7e22ce)',
                  borderColor: isAv ? '#3a3e55' : '#ffcc66',
                  boxShadow: isAv ? 'inset 0 2px 6px rgba(255,255,255,0.1)' : '0 6px 20px rgba(255,140,0,0.4), inset 0 2px 6px rgba(255,255,255,0.3)',
                  transform: selected?.id===t.id ? 'scale(1.1)' : 'scale(1)'}}>
                  <span style={{fontSize:'10px', opacity:0.7, letterSpacing:'1px'}}>TABLE</span>
                  <span style={{fontSize:'22px', fontWeight:'900', lineHeight:'1'}}>{t.id}</span>
                  <span style={{fontSize:'8px', marginTop:'3px', background: isAv ? '#1a1d2a' : 'rgba(0,0,0,0.3)', padding:'2px 6px', borderRadius:'10px'}}>{t.status.toUpperCase()}</span>
                </div>
                {/* Chairs */}
                <div style={{position:'absolute', top:'-6px', left:'36px', width:'20px', height:'8px', background:'#2a2e40', borderRadius:'4px', border:'1px solid #3a3e55'}}></div>
                <div style={{position:'absolute', bottom:'-6px', left:'36px', width:'20px', height:'8px', background:'#2a2e40', borderRadius:'4px', border:'1px solid #3a3e55'}}></div>
                {/* Guest Count */}
                {t.guests>0 && <div style={{position:'absolute', top:'-8px', right:'-8px', background:'#22c55e', color:'white', fontSize:'10px', fontWeight:'bold', width:'20px', height:'20px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #080a0f'}}>{t.guests}</div>}
              </div>
            )
          })}
        </div>

        {/* Legend & Info */}
        <div style={{marginTop:'14px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', gap:'12px', fontSize:'11px', color:'#8b8fa3'}}>
            <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{width:'10px', height:'10px', background:'#2a2e40', borderRadius:'50%', border:'1px solid #3a3e55', display:'inline-block'}}></span> Free</span>
            <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{width:'10px', height:'10px', background:'#ff8c2a', borderRadius:'50%', display:'inline-block'}}></span> Busy</span>
            <span style={{display:'flex', alignItems:'center', gap:'5px'}}><span style={{width:'10px', height:'10px', background:'#a855f7', borderRadius:'50%', display:'inline-block'}}></span> Reserved</span>
          </div>
          <p style={{margin:0, fontSize:'10px', color:'#5a5f7a'}}>● LIVE SYNC</p>
        </div>

        {selected && (
          <div style={{marginTop:'14px', background:'#161a26', border:'1px solid #2a2e40', borderRadius:'16px', padding:'14px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <p style={{margin:0, fontSize:'13px', fontWeight:'bold'}}>Table {selected.id} • {selected.status}</p>
              <p style={{margin:'2px 0 0 0', fontSize:'11px', color:'#8b8fa3'}}>{selected.name || 'No guest'} {selected.time ? `• ${selected.time}` : ''}</p>
            </div>
            <div style={{fontSize:'11px', color:'#fbbf24'}}>Tap again to change →</div>
          </div>
        )}
      </div>
    </div>
  );
}
