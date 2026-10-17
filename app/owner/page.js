"use client";
import { useState, useEffect } from "react";

export default function OwnerLuxuryLive() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [sel, setSel] = useState(null);
  const [showSet, setShowSet] = useState(false);
  const [showReserve, setShowReserve] = useState(false);
  const [cur, setCur] = useState("");
  const [nPass, setNPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [now, setNow] = useState(new Date());
  const [newRes, setNewRes] = useState({ name: "", table: "T2", time: "8:00 PM", guests: 2 });

  const [tables, setTables] = useState([
    {id:'T1',x:18,y:22,status:'Occupied',pay:'Unpaid',g:2,order:'Zinger x2',total:16,time:'12 min ago'},
    {id:'T2',x:42,y:16,status:'Available',pay:'-',g:0,order:'-',total:0,time:'-'},
    {id:'T3',x:66,y:12,status:'Cooking',pay:'Unpaid',g:4,order:'Biryani x4',total:40,time:'8 min ago'},
    {id:'T4',x:86,y:10,status:'Reserved',pay:'-',g:0,order:'Reserved 8PM Ali',total:0,time:'Reserved'},
    {id:'T5',x:14,y:46,status:'Served',pay:'Paid',g:2,order:'Pizza Large',total:18,time:'Served 2m'},
    {id:'T6',x:40,y:40,status:'Ready',pay:'Unpaid',g:3,order:'Burger Combo',total:24,time:'READY!'},
    {id:'T7',x:64,y:36,status:'Cooking',pay:'Unpaid',g:6,order:'Family Platter',total:55,time:'15 min ago'},
    {id:'T8',x:86,y:34,status:'Occupied',pay:'Unpaid',g:2,order:'Waiting Order',total:0,time:'Just Sat'},
    {id:'T9',x:16,y:72,status:'Paid',pay:'Paid',g:2,order:'Paid & Done',total:30,time:'Paid'},
    {id:'T10',x:40,y:68,status:'Occupied',pay:'Unpaid',g:2,order:'Coffee x2',total:8,time:'5 min ago'},
    {id:'T11',x:64,y:62,status:'Served',pay:'Unpaid',g:2,order:'Fries + Drink',total:12,time:'Served 1m'},
    {id:'T12',x:86,y:60,status:'Available',pay:'-',g:0,order:'-',total:0,time:'-'},
  ]);

  // LIVE CLOCK + SIMULATION
  useEffect(() => {
    if (localStorage.getItem("owner_auth") === "true") setAuth(true);
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  // LIVE STATS CALCULATION - REALTIME
  const occupied = tables.filter(t=> t.status!=='Available' && t.status!=='Reserved').length;
  const totalSeats = tables.length * 4;
  const filledSeats = tables.reduce((s,t)=> s + t.g, 0);
  const occupancy = Math.round((filledSeats / totalSeats) * 100);
  const revenue = tables.reduce((s,t)=> s + (t.pay==='Paid'? t.total : 0), 0) + 4820 - 48; // base + live
  const todayRevenue = 4820 + tables.filter(t=>t.pay==='Paid').reduce((s,t)=>s+t.total,0);
  const cookingCount = tables.filter(t=>t.status==='Cooking').length;
  const readyCount = tables.filter(t=>t.status==='Ready').length;
  const reservedCount = tables.filter(t=>t.status==='Reserved').length;
  const availableCount = tables.filter(t=>t.status==='Available').length;
  const occupiedCount = tables.filter(t=>t.status==='Occupied').length + cookingCount + tables.filter(t=>t.status==='Ready').length + tables.filter(t=>t.status==='Served').length;
  const avgTurn = 42 + (occupied % 10); // live change

  const getP = () => localStorage.getItem("owner_custom_pass") || "owner123";
  const login = () => { if(pass===getP()){localStorage.setItem("owner_auth","true");setAuth(true);}else alert("Wrong Password"); };
  const changePass = () => {
    if(cur!==getP()){alert("Current galat");return;}
    if(nPass.length<4){alert("Min 4");return;}
    if(nPass!==cPass){alert("Confirm match nahi");return;}
    localStorage.setItem("owner_custom_pass",nPass); alert("Password Changed: "+nPass); setShowSet(false);
  };

  const updateStatus = (id, newStatus) => {
    setTables(tables.map(t=> t.id===id ? {...t, status:newStatus, pay: newStatus==='Paid'?'Paid':t.pay, time: new Date().toLocaleTimeString()} : t));
    setSel(null);
  };
  const markPaid = (id) => {
    setTables(tables.map(t=> t.id===id ? {...t, pay:'Paid', status:'Paid', time:'Paid Just Now'} : t));
    setSel(null);
  };
  const addReservation = () => {
    if(!newRes.name){alert("Name likho"); return;}
    setTables(tables.map(t=> t.id===newRes.table ? {...t, status:'Reserved', order:`Reserved ${newRes.time} - ${newRes.name} (${newRes.guests}g)`, g:newRes.guests, time:`Reserved ${newRes.time}`} : t));
    setShowReserve(false);
    setNewRes({ name: "", table: "T2", time: "8:00 PM", guests: 2 });
  };

  const col = (s)=>{
    if(s==='Available') return '#2A2415';
    if(s==='Occupied') return '#FFD86B';
    if(s==='Cooking') return '#FF6B00';
    if(s==='Ready') return '#00FF88';
    if(s==='Served') return '#4A90E2';
    if(s==='Paid') return '#9CA3AF';
    if(s==='Reserved') return '#A78BFA';
    return '#333';
  };
  const glow = (s)=>{
    if(s==='Cooking') return '0 0 30px rgba(255,107,0,0.7)';
    if(s==='Ready') return '0 0 30px rgba(0,255,136,0.7)';
    if(s==='Occupied') return '0 0 30px rgba(255,216,107,0.6)';
    return 'none';
  };

  if(!auth){
    return (<div style={{background:'#050400',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui'}}>
      <div style={{background:'#0C0A05',border:'2px solid #FFD86B',borderRadius:20,padding:30,width:360,textAlign:'center'}}>
        <h1 style={{color:'#FFDF8A',fontWeight:900,fontSize:22}}>TableNest</h1><p style={{color:'#8A7A55',fontSize:10,letterSpacing:2}}>LUXURY OWNER • LIVE 3D</p>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{width:'100%',marginTop:20,padding:14,borderRadius:12,background:'#1A160A',border:'1px solid #2A2415',color:'#FFF'}}/>
        <button onClick={login} style={{width:'100%',marginTop:12,background:'linear-gradient(135deg,#FFDF8A,#FFB800)',color:'#000',padding:14,borderRadius:12,fontWeight:900,border:'none'}}>LOGIN</button>
      </div>
    </div>)
  }

  return (
    <div style={{background:'#020100',minHeight:'100vh',fontFamily:'system-ui',color:'#FFF'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 20px',background:'#0A0800',borderBottom:'1px solid #1E1A0A',position:'sticky',top:0,zIndex:30}}>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div style={{width:32,height:32,background:'linear-gradient(#FFDF8A,#FFB800)',borderRadius:8}}/>
          <div><div style={{fontWeight:900,fontSize:15}}>TableNest</div><div style={{fontSize:8,color:'#5A4A20'}}>PREMIUM HOSPITALITY SaaS • LIVE 3D</div></div>
          <div style={{border:'1px solid #14332A',color:'#3DD68C',fontSize:8,padding:'4px 10px',borderRadius:20}}>● LIVE {now.toLocaleTimeString()}</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          
