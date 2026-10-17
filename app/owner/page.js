"use client";
import { useState, useEffect } from "react";

export default function OwnerDashboard(){
const [auth,setAuth]=useState(false);
const [pass,setPass]=useState("");
const [showKitchen,setShowKitchen]=useState(false);

useEffect(()=>{
if(localStorage.getItem("owner_auth")=="gold123"){setAuth(true)}
},[]);

const login=()=>{
if(pass=="owner123"){localStorage.setItem("owner_auth","gold123");setAuth(true)}else{alert("Wrong Password! Only correct password works.")}
};

if(!auth){
return(<div style={{background:'#050400',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui'}}>
<div style={{background:'#0C0A05',border:'1px solid #2A2415',borderRadius:20,padding:30,width:360,textAlign:'center'}}>
<h1 style={{color:'#FFDF8A',fontWeight:900,fontSize:24}}>TableNest Owner Login</h1>
<p style={{color:'#8A7A55',fontSize:12,marginTop:6}}>Private Dashboard - Protected</p>
<input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter Owner Password" style={{width:'100%',marginTop:20,padding:12,borderRadius:10,border:'1px solid #2A2415',background:'#1A160A',color:'#FFF'}}/>
<button onClick={login} style={{width:'100%',marginTop:12,background:'linear-gradient(135deg,#FFDF8A,#FFB800)',color:'#000',padding:12,borderRadius:10,fontWeight:800,border:'none'}}>Login</button>
<div style={{marginTop:10,fontSize:10,color:'#3A2F15'}}>Demo Password: owner123</div>
</div>
</div>)
}

return(<div style={{background:'#050400',minHeight:'100vh',color:'#FFF',fontFamily:'system-ui',padding:20}}>
<div style={{maxWidth:1300,margin:'0 auto'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #1A160A',paddingBottom:16}}>
<h1 style={{fontSize:26,fontWeight:900,background:'linear-gradient(90deg,#FFF6CC,#FFB800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Owner Dashboard - TableNest 3D</h1>
<div style={{display:'flex',gap:8}}>
<a href="/menu/T1" style={{background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'8px 14px',borderRadius:10,textDecoration:'none',fontSize:12}}>Order Panel</a>
<a href="/kitchen" style={{background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'8px 14px',borderRadius:10,textDecoration:'none',fontSize:12}}>Kitchen</a>
<button onClick={()=>{localStorage.removeItem("owner_auth");setAuth(false)}} style={{background:'#FFF',color:'#000',padding:'8px 14px',borderRadius:10,fontWeight:800,fontSize:12,border:'none'}}>Logout</button>
</div>
</div>

<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginTop:20}}>
{[
{t:'Today Revenue',v:'$1,248',c:'#FFDF8A'},
{t:'Total Orders',v:'42',c:'#FFF'},
{t:'Occupancy',v:'82% (13/16)',c:'#3DD68C'},
{t:'Profit',v:'$480',c:'#FFB800'},
].map(card=>(
<div key={card.t} style={{background:'rgba(8,6,0,0.9)',border:'1px solid #2A2415',borderRadius:16,padding:16}}>
<div style={{fontSize:10,color:'#8A7A55',letterSpacing:1}}>{card.t}</div>
<div style={{fontSize:24,fontWeight:900,color:card.c,marginTop:6}}>{card.v}</div>
</div>
))}
</div>

<div style={{marginTop:20,display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:12}}>
<div style={{background:'#0C0A05',border:'1px solid #2A2415',borderRadius:16,padding:18}}>
<div style={{fontSize:12,color:'#8A7A55'}}>3D Floor Status - Live</div>
<div style={{marginTop:12,height:280,background:'radial-gradient(#1E1A0A,#050400)',borderRadius:12,border:'1px solid #1A160A',display:'flex',alignItems:'center',justifyContent:'center',color:'#5A4A20',fontSize:12}}>16 Tables - 3D View (Next Step me pura 3D ayega)</div>
</div>
<div style={{background:'#0C0A05',border:'1px solid #2A2415',borderRadius:16,padding:18}}>
<div style={{fontSize:12,color:'#8A7A55'}}>Recent Orders - Live</div>
<div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
{[
{n:'T1 - Zinger x2 - Junaid',s:'Cooking',t:'2 min ago'},
{n:'T5 - Biryani - Ali (Parcel)',s:'Ready',t:'5 min ago'},
{n:'T3 - Pizza - Ahmed',s:'Served',t:'12 min ago'},
].map(o=>(
<div key={o.n} style={{display:'flex',justifyContent:'space-between',background:'#1A160A',padding:10,borderRadius:10,fontSize:12}}>
<span>{o.n}</span><span style={{color:o.s=='Ready'?'#3DD68C':o.s=='Cooking'?'#FFD86B':'#8A7A55'}}>{o.s}</span>
</div>
))}
</div>
</div>
</div>
</div>
</div>)
}
