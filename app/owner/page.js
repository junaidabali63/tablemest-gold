"use client";
import { useState, useEffect } from "react";

export default function OwnerDashboard(){
const [auth,setAuth]=useState(false);
const [pass,setPass]=useState("");
const [showSetting,setShowSetting]=useState(false);
const [currentPassInput,setCurrentPassInput]=useState("");
const [newPass,setNewPass]=useState("");
const [confirmPass,setConfirmPass]=useState("");
const [selTable,setSelTable]=useState(null);

useEffect(()=>{
if(localStorage.getItem("owner_auth")==="true") setAuth(true);
},[]);

const getPassword=()=> localStorage.getItem("owner_custom_pass") || "owner123";
const login=()=>{ if(pass===getPassword()){localStorage.setItem("owner_auth","true");setAuth(true)}else alert("Wrong Password!") };
const changePassword=()=>{
if(currentPassInput!==getPassword()){alert("Current password galat!");return}
if(newPass.length<4){alert("Min 4 chars");return}
if(newPass!==confirmPass){alert("Confirm match nahi!");return}
localStorage.setItem("owner_custom_pass",newPass);alert("Password Changed! ✅ "+newPass);setShowSetting(false);
};

const tables=[
{id:'T1',x:18,y:58,s:'Occupied',g:2},{id:'T2',x:38,y:52,s:'Available',g:0},{id:'T3',x:58,y:46,s:'Occupied',g:4},{id:'T4',x:78,y:40,s:'Reserved',g:0},
{id:'T5',x:22,y:72,s:'Occupied',g:2},{id:'T6',x:42,y:66,s:'Reserved',g:0},{id:'T7',x:62,y:60,s:'Occupied',g:6},{id:'T8',x:82,y:54,s:'Reserved',g:0},
{id:'T9',x:28,y:84,s:'Occupied',g:2},{id:'T10',x:48,y:78,s:'Occupied',g:3},{id:'T11',x:68,y:72,s:'Available',g:0},{id:'T12',x:88,y:66,s:'Reserved',g:0},
];

if(!auth){
return(<div style={{background:'#050400',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui'}}>
<div style={{background:'#0C0A05',border:'1px solid #FFD86B',borderRadius:20,padding:30,width:360,textAlign:'center',boxShadow:'0 0 40px rgba(255,184,0,0.2)'}}>
<h1 style={{color:'#FFDF8A',fontWeight:900,fontSize:22}}>TableNest Owner</h1>
<input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:'100%',marginTop:20,padding:12,borderRadius:10,border:'1px solid #2A2415',background:'#1A160A',color:'#FFF'}}/>
<button onClick={login} style={{width:'100%',marginTop:12,background:'linear-gradient(135deg,#FFDF8A,#FFB800)',color:'#000',padding:12,borderRadius:10,fontWeight:800,border:'none'}}>Login</button>
<div style={{marginTop:8,fontSize:10,color:'#5A4A20'}}>Default: owner123</div>
</div>
</div>)
}

return(<div style={{background:'#020100',minHeight:'100vh',fontFamily:'Inter, system-ui',color:'#FFF',padding:12}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');`}</style>

<div style={{maxWidth:1400,margin:'0 auto',background:'#080600',border:'1px solid #1E1A0A',borderRadius:20,overflow:'hidden',boxShadow:'0 0 80px rgba(0,0,0,0.8)'}}>

{/* TOP BAR */}
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 18px',borderBottom:'1px solid #1A160A',background:'#0A0800'}}>
<div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:24,height:24,background:'linear-gradient(#FFDF8A,#FFB800)',borderRadius:6}}/><div><div style={{fontWeight:900,fontSize:12,letterSpacing:1}}>TableNest</div><div style={{fontSize:7,color:'#5A4A20',letterSpacing:1}}>PREMIUM HOSPITALITY SaaS • LIVE 3D</div></div></div>
<div style={{display:'flex',gap:6,alignItems:'center'}}><div style={{fontSize:8,color:'#3DD68C',border:'1px solid #1A2A1A',padding:'4px 8px',borderRadius:12}}>● LIVE</div><button onClick={()=>setShowSetting(!showSetting)} style={{background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'6px 10px',borderRadius:8,fontSize:10}}>⚙️</button><a href="/menu/T1" style={{background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'6px 10px',borderRadius:8,fontSize:10,textDecoration:'none'}}>ORDER</a><a href="/kitchen" style={{background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'6px 10px',borderRadius:8,fontSize:10,textDecoration:'none'}}>KITCHEN</a><button onClick={()=>{localStorage.removeItem("owner_auth");setAuth(false)}} style={{background:'#FFF',color:'#000',padding:'6px 10px',borderRadius:8,fontSize:10,fontWeight:800,border:'none'}}>Logout</button></div>
</div>

{showSetting&&<div style={{margin:10,background:'#0C0A05',border:'1px solid #FFD86B',borderRadius:12,padding:12,display:'flex',gap:8}}><input type="password" value={currentPassInput} onChange={e=>setCurrentPassInput(e.target.value)} placeholder="Current" style={{flex:1,padding:8,borderRadius:8,background:'#1A160A',border:'1px solid #2A2415',color:'#FFF',fontSize:11}}/><input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="New" style={{flex:1,padding:8,borderRadius:8,background:'#1A160A',border:'1px solid #2A2415',color:'#FFF',fontSize:11}}/><input type="password" value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} placeholder="Confirm" style={{flex:1,padding:8,borderRadius:8,background:'#1A160A',border:'1px solid #2A2415',color:'#FFF',fontSize:11}}/><button onClick={changePassword} style={{background:'#FFD86B',color:'#000',padding:'8px 12px',borderRadius:8,fontWeight:800,fontSize:11,border:'none'}}>Save</button></div>}

<div style={{padding:12}}>
<div style={{background:'linear-gradient(180deg,#0F0D05,#050400)',border:'1px solid #FFD86B',borderRadius:14,padding:'8px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<div style={{display:'flex',gap:10,alignItems:'center'}}><div style={{width:28,height:28,border:'1px solid #FFD86B',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12}}>⬡</div><div><div style={{fontWeight:900,fontSize:11,letterSpacing:1}}>RESTAURANT OPS</div><div style={{fontSize:7,color:'#8A7A55'}}>FLOOR PLAN • LIVE</div></div></div>
<div style={{textAlign:'right'}}><div style={{fontSize:8,color:'#3DD68C'}}>● LIVE - UPDATED 2 MIN AGO</div><div style={{fontSize:7,color:'#5A4A20',marginTop:2}}>Fri, Oct 16, 2024 • 7:42 PM EST</div></div>
</div>

<div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:12,marginTop:12}}>
{/* LEFT STATS */}
<div style={{display:'flex',flexDirection:'column',gap:10}}>
<div style={{background:'linear-gradient(180deg,#141009,#0A0800)',border:'1px solid #FFD86B',borderRadius:12,padding:12,boxShadow:'0 0 20px rgba(255,184,0,0.15)'}}>
<div style={{fontSize:8,color:'#8A7A55',letterSpacing:1}}>OCCUPANCY</div><div style={{fontSize:28,fontWeight:900,color:'#FFDF8A',marginTop:4}}>62%</div><div style={{fontSize:8,color:'#5A4A20'}}>12 / 19 seats filled</div>
<div style={{marginTop:14,borderTop:'1px solid #1A160A',paddingTop:10}}><div style={{fontSize:8,color:'#8A7A55'}}>REVENUE TODAY</div><div style={{fontSize:20,fontWeight:900,color:'#FFDF8A',marginTop:4}}>$4,820</div><div style={{fontSize:8,color:'#3DD68C'}}>+12.4% vs yesterday ↗</div></div>
<div style={{marginTop:14,borderTop:'1px solid #1A160A',paddingTop:10}}><div style={{fontSize:8,color:'#8A7A55'}}>AVG TURN TIME</div><div style={{fontSize:16,fontWeight:800,color:'#FFF',marginTop:2}}>48 min</div><div style={{fontSize:8,color:'#5A4A20'}}>Target: &lt;60min ✓</div></div>
<div style={{marginTop:14,borderTop:'1px solid #1A160A',paddingTop:10}}><div style={{fontSize:8,color:'#8A7A55'}}>TABLE STATUS</div><div style={{fontSize:8,marginTop:6,color:'#E9C77A',display:'flex',flexDirection:'column',gap:3}}><div>● Occupied - 6</div><div>● Reserved - 2</div><div>● Available - 1</div></div><button style={{width:'100%',marginTop:10,background:'linear-gradient(135deg,#FFDF8A,#FFB800)',color:'#000',padding:'8px',borderRadius:8,fontWeight:800,fontSize:9,border:'none'}}>+ NEW RESERVATION</button></div>
</div>
</div>

{/* 3D FLOOR */}
<div style={{position:'relative',background:'radial-gradient(ellipse at 50% 0%, #1A160A 0%, #0A0800 40%, #020100 100%)',border:'1px solid #1E1A0A',borderRadius:16,overflow:'hidden',height:520,boxShadow:'inset 0 0 60px rgba(255,184,0,0.08)'}}>
<div style={{position:'absolute',inset:0,transform:'rotateX(55deg) rotateZ(-35deg)',transformStyle:'preserve-3d',transformOrigin:'50% 50%'}}>
<div style={{position:'absolute',left:'50%',top:'50%',width:900,height:600,transform:'translate(-50%,-50%) translateZ(0px)',background:'#0D0B05',border:'1px solid #FFD86B',boxShadow:'0 0 60px rgba(255,184,0,0.15)'}}>
{/* BAR */}
<div style={{position:'absolute',right:'5%',top:'5%',width:'36%',height:'18%',background:'linear-gradient(135deg,#1A160A,#0A0800)',border:'1px solid #FFD86B',borderRadius:6,transform:'translateZ(30px)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:7,color:'#8A7A55'}}>BAR • LUXURY</div>

{tables.map(t=>(
<div key={t.id} onClick={()=>setSelTable(t)} style={{position:'absolute',left:`${t.x}%`,top:`${t.y}%`,transform:'translateZ(20px)',cursor:'pointer'}}>
<div style={{width:78,height:78,background:t.s=='Occupied'?'radial-gradient(#2A220A,#1A160A)':t.s=='Reserved'?'radial-gradient(#0A1A2A,#0A0A1A)':'radial-gradient(#0A0A0A,#000)',border:`1.5px solid ${t.s=='Occupied'?'#FFD86B':t.s=='Reserved'?'#4A90E2':'#2A2415'}`,borderRadius:'50%',boxShadow:t.s=='Occupied'?'0 0 18px rgba(255,184,0,0.6), inset 0 0 12px rgba(255,184,0,0.2)':'none',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
<div style={{fontSize:6,color:t.s=='Occupied'?'#FFDF8A':t.s=='Reserved'?'#8AB4FF':'#5A4A20',fontWeight:800}}>{t.id} - {t.s} {t.g>0?`(${t.g})`:''}</div>
<div style={{display:'flex',gap:2,marginTop:3}}>{Array.from({length:4}).map((_,i)=><div key={i} style={{width:12,height:12,background:'#FFD86B',borderRadius:2,border:'1px solid #000',opacity:t.g>i?1:0.2}}/>)}</div>
</div>
<div style={{position:'absolute',top:-16,left:'50%',transform:'translateX(-50%)',background:t.s=='Occupied'?'#2A220A':t.s=='Reserved'?'#0A1A2A':'#1A1A0A',border:`1px solid ${t.s=='Occupied'?'#FFD86B':t.s=='Reserved'?'#4A90E2':'#333'}`,color:t.s=='Occupied'?'#FFDF8A':t.s=='Reserved'?'#8AB4FF':'#888',fontSize:6,padding:'2px 6px',borderRadius:10,whiteSpace:'nowrap'}}>{t.id} • {t.s}{t.g>0?` • GUESTS: ${t.g}`:''}</div>
</div>
))}
</div>
</div>

{/* GLOW EDGES */}
<div style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,#FFD86B,transparent)'}}/>
<div style={{position:'absolute',top:0,left:0,bottom:0,width:2,background:'linear-gradient(180deg,transparent,#FFD86B,transparent)'}}/>

{selTable&&<div style={{position:'absolute',bottom:12,left:12,right:12,background:'rgba(10,8,0,0.95)',border:'1px solid #FFD86B',borderRadius:12,padding:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:11,fontWeight:800,color:'#FFDF8A'}}>{selTable.id} - {selTable.s}</div><div style={{fontSize:9,color:'#8A7A55'}}>Guests: {selTable.g} • Tap Order to manage</div></div><div style={{display:'flex',gap:6}}><a href="/menu/T1" style={{background:'#FFD86B',color:'#000',padding:'6px 12px',borderRadius:8,fontSize:10,fontWeight:800,textDecoration:'none'}}>Open Order</a><button onClick={()=>setSelTable(null)} style={{background:'#1A160A',color:'#FFF',padding:'6px 10px',borderRadius:8,fontSize:10,border:'1px solid #2A2415'}}>Close</button></div></div>}
</div>
</div>

<div style={{marginTop:10,background:'#0A0800',border:'1px solid #1A160A',borderRadius:10,padding:'8px 14px',display:'flex',justifyContent:'space-between',fontSize:8,color:'#5A4A20'}}>
<span>ACTIVE STAFF: 5 • HOST: ONLINE • KITCHEN: ON PACE • AMBIENT: 72°F</span><span>KITCHEN 🍳</span>
</div>
</div>
</div>
</div>)
}
