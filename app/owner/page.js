"use client";
import { useState, useEffect } from "react";

export default function OwnerDashboard(){
const [auth,setAuth]=useState(false);
const [pass,setPass]=useState("");
const [selTable,setSelTable]=useState(null);
const [filter,setFilter]=useState("All");

useEffect(()=>{ if(localStorage.getItem("owner_auth")==="true") setAuth(true); },[]);
const getPassword=()=> localStorage.getItem("owner_custom_pass") || "owner123";
const login=()=>{ if(pass===getPassword()){localStorage.setItem("owner_auth","true");setAuth(true)}else alert("Wrong Password!") };

const tables=[
{id:'T1',x:15,y:15,status:'Cooking',payment:'Unpaid',guests:2,order:'Zinger x2',total:16},
{id:'T2',x:45,y:10,status:'Available',payment:'-',guests:0,order:'-',total:0},
{id:'T3',x:75,y:15,status:'Ready',payment:'Unpaid',guests:4,order:'Biryani x4',total:40},
{id:'T4',x:15,y:35,status:'Served',payment:'Paid',guests:2,order:'Pizza',total:18},
{id:'T5',x:45,y:35,status:'Occupied',payment:'Unpaid',guests:2,order:'Waiting Order',total:0},
{id:'T6',x:75,y:38,status:'Reserved',payment:'-',guests:0,order:'Reserved 8pm',total:0},
{id:'T7',x:15,y:62,status:'Cooking',payment:'Unpaid',guests:3,order:'Burger+ Fries',total:22},
{id:'T8',x:45,y:65,status:'Available',payment:'-',guests:0,order:'-',total:0},
{id:'T9',x:75,y:65,status:'Paid',payment:'Paid',guests:2,order:'Served & Paid',total:25},
{id:'T10',x:15,y:85,status:'Occupied',payment:'Unpaid',guests:1,order:'Coffee',total:4},
];

const filtered = filter==="All"?tables:tables.filter(t=>t.status===filter);

const getColor = (s)=>{
if(s==='Available') return '#3A3A3A';
if(s==='Occupied') return '#FFD86B';
if(s==='Cooking') return '#FF6B00';
if(s==='Ready') return '#00FF88';
if(s==='Served') return '#4A90E2';
if(s==='Paid') return '#888';
if(s==='Reserved') return '#8A5CFF';
return '#333';
};

if(!auth){
return(<div style={{background:'#050400',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui'}}><div style={{background:'#0C0A05',border:'1px solid #FFD86B',borderRadius:20,padding:24,width:340,textAlign:'center'}}><h2 style={{color:'#FFDF8A'}}>Owner Login</h2><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password: owner123" style={{width:'100%',marginTop:16,padding:12,borderRadius:10,background:'#1A160A',border:'1px solid #2A2415',color:'#FFF'}}/><button onClick={login} style={{width:'100%',marginTop:10,background:'#FFD86B',padding:12,borderRadius:10,fontWeight:800,border:'none'}}>Login</button></div></div>)
}

return(<div style={{background:'#020100',minHeight:'100vh',fontFamily:'system-ui',color:'#FFF'}}>
{/* HEADER */}
<div style={{padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'#0A0800',borderBottom:'1px solid #1A160A',position:'sticky',top:0,zIndex:20}}>
<h1 style={{fontSize:14,fontWeight:900,color:'#FFDF8A'}}>TableNest • OWNER 3D</h1>
<div style={{display:'flex',gap:6}}><a href="/menu/T1" style={{fontSize:10,background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'6px 10px',borderRadius:8,textDecoration:'none'}}>ORDER</a><a href="/kitchen" style={{fontSize:10,background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'6px 10px',borderRadius:8,textDecoration:'none'}}>KITCHEN</a><button onClick={()=>{localStorage.removeItem("owner_auth");setAuth(false)}} style={{fontSize:10,background:'#FFF',color:'#000',padding:'6px 10px',borderRadius:8,border:'none'}}>Logout</button></div>
</div>

{/* FILTERS */}
<div style={{padding:'10px 16px',display:'flex',gap:6,overflowX:'auto',whiteSpace:'nowrap',background:'#050400',borderBottom:'1px solid #1A160A'}}>
{['All','Available','Occupied','Cooking','Ready','Served','Paid','Reserved'].map(f=>(
<button key={f} onClick={()=>setFilter(f)} style={{fontSize:10,padding:'6px 12px',borderRadius:20,border:filter===f?'1px solid #FFD86B':'1px solid #2A2415',background:filter===f?'#FFD86B':'#1A160A',color:filter===f?'#000':'#8A7A55',fontWeight:700}}>{f}</button>
))}
</div>

{/* STATS - horizontal scroll on mobile */}
<div style={{display:'flex',gap:8,padding:'12px 16px',overflowX:'auto'}}>
<div style={{minWidth:110,background:'#0C0A05',border:'1px solid #FFD86B',borderRadius:12,padding:10}}><div style={{fontSize:8,color:'#8A7A55'}}>OCCUPANCY</div><div style={{fontSize:20,fontWeight:900,color:'#FFDF8A'}}>62%</div><div style={{fontSize:8,color:'#5A4A20'}}>12/19 filled</div></div>
<div style={{minWidth:110,background:'#0C0A05',border:'1px solid #1A160A',borderRadius:12,padding:10}}><div style={{fontSize:8,color:'#8A7A55'}}>REVENUE TODAY</div>
