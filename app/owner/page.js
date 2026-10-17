"use client";
import { useState, useEffect } from "react";

export default function OwnerDashboard(){
const [auth,setAuth]=useState(false);
const [pass,setPass]=useState("");
const [newPass,setNewPass]=useState("");
const [confirmPass,setConfirmPass]=useState("");
const [showSetting,setShowSetting]=useState(false);
const [currentPassInput,setCurrentPassInput]=useState("");

useEffect(()=>{
const saved = localStorage.getItem("owner_custom_pass") || "owner123";
if(localStorage.getItem("owner_auth")==="true"){setAuth(true)}
},[]);

const getPassword=()=> localStorage.getItem("owner_custom_pass") || "owner123";

const login=()=>{
if(pass===getPassword()){localStorage.setItem("owner_auth","true");setAuth(true);setPass("")}else{alert("Wrong Password!")}
};

const changePassword=()=>{
if(currentPassInput!==getPassword()){alert("Current password galat hai!");return}
if(newPass.length<4){alert("New password kam se kam 4 characters ka ho!");return}
if(newPass!==confirmPass){alert("Confirm password match nahi kar raha!");return}
localStorage.setItem("owner_custom_pass",newPass);
alert("Password Changed Successfully! ✅ New password: "+newPass);
setNewPass("");setConfirmPass("");setCurrentPassInput("");setShowSetting(false);
};

if(!auth){
return(<div style={{background:'#050400',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'system-ui'}}>
<div style={{background:'#0C0A05',border:'1px solid #2A2415',borderRadius:20,padding:30,width:360,textAlign:'center'}}>
<h1 style={{color:'#FFDF8A',fontWeight:900,fontSize:24}}>Owner Login</h1>
<p style={{color:'#8A7A55',fontSize:12,marginTop:6}}>Private - 3D Premium</p>
<input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter Password" style={{width:'100%',marginTop:20,padding:12,borderRadius:10,border:'1px solid #2A2415',background:'#1A160A',color:'#FFF'}}/>
<button onClick={login} style={{width:'100%',marginTop:12,background:'linear-gradient(135deg,#FFDF8A,#FFB800)',color:'#000',padding:12,borderRadius:10,fontWeight:800,border:'none'}}>Login</button>
<div style={{marginTop:10,fontSize:10,color:'#3A2F15'}}>Default: owner123 (changeable)</div>
</div>
</div>)
}

return(<div style={{background:'#050400',minHeight:'100vh',color:'#FFF',fontFamily:'system-ui',padding:20}}>
<div style={{maxWidth:1300,margin:'0 auto'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #1A160A',paddingBottom:16}}>
<h1 style={{fontSize:22,fontWeight:900,background:'linear-gradient(90deg,#FFF6CC,#FFB800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Owner Dashboard</h1>
<div style={{display:'flex',gap:8}}>
<button onClick={()=>setShowSetting(!showSetting)} style={{background:'#1A160A',border:'1px solid #FFD86B',color:'#FFDF8A',padding:'8px 14px',borderRadius:10,fontSize:12}}>⚙️ Settings</button>
<a href="/menu/T1" style={{background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'8px 14px',borderRadius:10,textDecoration:'none',fontSize:12}}>Order Panel</a>
<a href="/kitchen" style={{background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'8px 14px',borderRadius:10,textDecoration:'none',fontSize:12}}>Kitchen</a>
<button onClick={()=>{localStorage.removeItem("owner_auth");setAuth(false)}} style={{background:'#FFF',color:'#000',padding:'8px 14px',borderRadius:10,fontWeight:800,fontSize:12,border:'none'}}>Logout</button>
</div>
</div>

{showSetting&&<div style={{marginTop:16,background:'#0C0A05',border:'2px solid #FFD86B',borderRadius:16,padding:18}}>
<h3 style={{color:'#FFDF8A',fontSize:14,fontWeight:800}}>Change Password</h3>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginTop:12}}>
<input type="password" value={currentPassInput} onChange={e=>setCurrentPassInput(e.target.value)} placeholder="Current Password" style={{padding:10,borderRadius:8,border:'1px solid #2A2415',background:'#1A160A',color:'#FFF',fontSize:12}}/>
<input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="New Password" style={{padding:10,borderRadius:8,border:'1px solid #2A2415',background:'#1A160A',color:'#FFF',fontSize:12}}/>
<input type="password" value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} placeholder="Confirm New" style={{padding:10,borderRadius:8,border:'1px solid #2A2415',background:'#1A160A',color:'#FFF',fontSize:12}}/>
</div>
<div style={{display:'flex',gap:8,marginTop:12}}>
<button onClick={changePassword} style={{background:'#FFD86B',color:'#000',padding:'10px 18px',borderRadius:8,fontWeight:800,border:'none',fontSize:12}}>Save New Password</button>
<button onClick={()=>setShowSetting(false)} style={{background:'#1A160A',color:'#8A7A55',padding:'10px 18px',borderRadius:8,border:'1px solid #2A2415',fontSize:12}}>Cancel</button>
</div>
</div>}

<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginTop:20}}>
{[{t:'Today Revenue',v:'$1,248',c:'#FFDF8A'},{t:'Total Orders',v:'42',c:'#FFF'},{t:'Occupancy',v:'82% (13/16)',c:'#3DD68C'},{t:'Profit',v:'$480',c:'#FFB800'}].map(card=>(
<div key={card.t} style={{background:'rgba(8,6,0,0.9)',border:'1px solid #2A2415',borderRadius:16,padding:16}}>
<div style={{fontSize:10,color:'#8A7A55'}}>{card.t}</div><div style={{fontSize:22,fontWeight:900,color:card.c,marginTop:6}}>{card.v}</div></div>))}
</div>

<div style={{marginTop:20,background:'#0C0A05',border:'1px solid #2A2415',borderRadius:16,padding:18}}>
<div style={{fontSize:12,color:'#8A7A55'}}>Recent Orders</div>
<div style={{marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
<div style={{display:'flex',justifyContent:'space-between',background:'#1A160A',padding:10,borderRadius:10,fontSize:12}}><span>T1 - Zinger x2 - Junaid</span><span style={{color:'#FFD86B'}}>Cooking</span></div>
<div style={{display:'flex',justifyContent:'space-between',background:'#1A160A',padding:10,borderRadius:10,fontSize:12}}><span>T5 - Biryani - Ali (Parcel)</span><span style={{color:'#3DD68C'}}>Ready</span></div>
</div>
</div>
</div>
</div>)
}
