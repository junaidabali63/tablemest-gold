"use client";
import { useState, useEffect } from "react";

export default function Page(){
const [t,setT]=useState(0);
useEffect(()=>{const i=setInterval(()=>setT(v=>v+1),40);return()=>clearInterval(i)},[]);

const tables=[
{x:12,y:12,o:1,g:2,type:'square'},
{x:42,y:8,o:0,g:0,type:'square'},
{x:72,y:18,o:1,g:1,type:'round'},
{x:12,y:38,o:1,g:4,type:'square'},
{x:42,y:36,o:1,g:2,type:'square'},
{x:72,y:42,o:0,g:0,type:'square'},
{x:12,y:66,o:1,g:1,type:'round'},
{x:42,y:68,o:0,g:0,type:'round'},
{x:72,y:68,o:0,g:0,type:'square'},
];

return(<div style={{background:'#050400',minHeight:'100vh',fontFamily:'Inter, system-ui',color:'#FFF',overflowX:'hidden'}}>
<div style={{maxWidth:1400,margin:'0 auto',padding:'18px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:50,background:'rgba(5,4,0,0.85)',backdropFilter:'blur(20px)',borderBottom:'1px solid #1A160A'}}>
<h1 style={{fontSize:28,fontWeight:900,margin:0,background:'linear-gradient(90deg,#FFF6CC 0%,#FFD86B 40%,#FFA800 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>TableNest</h1>
<div style={{display:'flex',gap:10,alignItems:'center'}}>
<a href="#pricing" style={{background:'#FFF',color:'#000',padding:'10px 18px',borderRadius:10,textDecoration:'none',fontWeight:800,fontSize:13}}>Start 7-Day Free Trial</a>
</div>
</div>

<div style={{maxWidth:1400,margin:'0 auto',padding:'0 24px'}}>
<div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:0,marginTop:18}}>
<div style={{perspective:'2000px',perspectiveOrigin:'50% 40%'}}>
<div style={{position:'relative',width:'100%',height:560,transform:'rotateX(58deg) rotateZ(-38deg)',transformStyle:'preserve-3d',background:'radial-gradient(ellipse at 30% 20%, #1E1A0A 0%, #0D0B05 40%, #050400 100%)',borderRadius:28,border:'1px solid #2A2415',boxShadow:'0 60px 120px rgba(0,0,0,0.9), inset 0 0 80px rgba(255,184,0,0.08)',overflow:'hidden'}}>
<div style={{position:'absolute',inset:0,background:`linear-gradient(rgba(255,184,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.06) 1px, transparent 1px)`,backgroundSize:'48px 48px',transform:'translateZ(1px)'}}/>
{tables.map((tb,i)=>(
<div key={i} style={{position:'absolute',left:`${tb.x}%`,top:`${tb.y}%`,transformStyle:'preserve-3d',transform:`translateZ(${tb.o?22:6}px)`}}>
<div style={{width:tb.type=='round'?64:68,height:tb.type=='round'?64:68,background:tb.o?'radial-gradient(ellipse at 30% 20%, #FFF6CC, #FFDF8A 20%, #FFB800 70%)':'linear-gradient(135deg,#1E1A0A,#2A2415)',border:`1px solid ${tb.o?'#FFD86B':'#3A2F15'}`,borderRadius:tb.type=='round'? '50%':8,transform:'translateZ(12px)',boxShadow:tb.o?'0 0 25px rgba(255,184,0,0.6)':'none',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
<div style={{fontSize:8,fontWeight:900,color:tb.o?'#000':'#5A4A20'}}>T0{i+1}</div>
{tb.o&&<div style={{fontSize:6,color:'#000',opacity:0.7}}>{tb.g} Guests</div>}
</div>
{[0,1,2,3].map(c=>{
const pos=c==0?{x:-20,y:16}:c==1?{x:68,y:16}:c==2?{x:16,y:-20}:{x:16,y:68};
return(<div key={c} style={{position:'absolute',left:pos.x,top:pos.y,transform:'translateZ(4px)'}}><div style={{width:18,height:16,background:'#2A2415',border:'1px solid #3A2F15',borderRadius:3,transform:'translateZ(6px)'}}/></div>)
})}
{Array.from({length:tb.g}).map((_,gidx)=>{
const gx=gidx==0?-10:gidx==1?60:gidx==2?8:42; const gy=gidx==0?8:gidx==1?8:gidx==2?58:58;
return(<div key={gidx} style={{position:'absolute',left:gx,top:gy,width:12,height:12,background: gidx%2==0?'radial-gradient(#FFDF8A,#FFB800)':'radial-gradient(#8AB4FF,#3A6BFF)',borderRadius:'50%',transform:'translateZ(20px)'}}/>)
})}
</div>
))}
</div>
<div style={{marginTop:12,display:'flex',gap:12,fontSize:10,color:'#8A7A55',justifyContent:'center'}}><span>🟢 Free</span><span>🔴 Busy</span><span>🟡 Reserved</span><span style={{color:'#5A4A20'}}>3D Live Demo</span></div>
</div>

<div style={{padding:'10px 20px'}}>
<div style={{background:'rgba(255,216,107,0.12)',border:'1px solid #2A2415',display:'inline-block',padding:'6px 12px',borderRadius:20,fontSize:10,color:'#FFDF8A',fontWeight:700,letterSpacing:1}}>3D RESTAURANT OS • LIVE DEMO</div>
<h1 style={{fontSize:48,fontWeight:900,lineHeight:'0.95',margin:'18px 0',letterSpacing:-1}}>Manage Tables<br/>in Real 3D.</h1>
<p style={{color:'#8A7A55',fontSize:15,lineHeight:1.5}}>TableNest is the first 3D table management SaaS. See your full floor live, manage waiters, orders and revenue in one luxury dashboard.</p>
<div style={{marginTop:22,display:'flex',flexDirection:'column',gap:10,fontSize:13}}>
<div>✓ Real-time 3D Floor Plan</div><div>✓ Waiter & Order Sync (No Walk to Kitchen)</div><div>✓ Kitchen Bell + Ready Notification</div><div>✓ Owner Revenue & Privacy Protected</div>
</div>
<div style={{display:'flex',gap:10,marginTop:24}}>
<a href="#pricing" style={{flex:1,background:'linear-gradient(135deg,#FFDF8A,#FFB800)',color:'#000',padding:'14px',borderRadius:12,textAlign:'center',fontWeight:900,textDecoration:'none'}}>Start Free Trial</a>
<a href="#how" style={{flex:1,background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',padding:'14px',borderRadius:12,textAlign:'center',fontWeight:700,textDecoration:'none'}}>How it Works</a>
</div>
<div style={{marginTop:14,fontSize:10,color:'#5A4A20'}}>No credit card for trial • Cancel anytime</div>
</div>
</div>

<div id="about" style={{marginTop:70,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
<div style={{background:'rgba(8,6,0,0.92)',border:'1px solid #2A2415',borderRadius:20,padding:22}}>
<div style={{fontSize:11,letterSpacing:1.5,color:'#8A7A55'}}>WHAT IS TABLENEST?</div>
<h2 style={{fontSize:26,fontWeight:900,marginTop:10}}>Table + Nest = Your Restaurant's Home.</h2>
<p style={{color:'#8A7A55',fontSize:13,lineHeight:1.6,marginTop:10}}>TableNest is not just a table app. It is a complete restaurant operating system. Owners manage revenue, staff manage orders, kitchen manages cooking — all in 3D. Every hotel's data is private and protected.</p>
<ul style={{marginTop:12,fontSize:13,lineHeight:1.8,color:'#E9C77A',paddingLeft:18}}>
<li>Manages Tables, Waiters, Orders, Kitchen, Billing</li><li>Dine-in vs Parcel Mode</li><li>Real-time Status: New → Cooking → Ready → Served</li><li>Privacy First: Hotels can't see each other's data</li>
</ul>
</div>
<div style={{background:'linear-gradient(135deg,#1A160A,#0D0B05)',border:'1px solid #2A2415',borderRadius:20,padding:22}}>
<div style={{fontSize:11,letterSpacing:1.5,color:'#8A7A55'}}>HOW IT WORKS</div>
<h2 id="how" style={{fontSize:26,fontWeight:900,marginTop:10}}>From Table to Served in 4 Steps.</h2>
<div style={{marginTop:16,display:'flex',flexDirection:'column',gap:12}}>
<div style={{display:'flex',gap:12}}><div style={{width:28,height:28,background:'#FFD86B',color:'#000',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:12}}>1</div><div><div style={{fontWeight:800,fontSize:13}}>Customer → Waiter</div><div style={{fontSize:12,color:'#8A7A55',marginTop:2}}>Customer tells order manually to waiter.</div></div></div>
<div style={{display:'flex',gap:12}}><div style={{width:28,height:28,background:'#FFD86B',color:'#000',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:12}}>2</div><div><div style={{fontWeight:800,fontSize:13}}>Waiter → System</div><div style={{fontSize:12,color:'#8A7A55',marginTop:2}}>Waiter enters Table, Name, Dine/Parcel + Items. Bill auto-calculates.</div></div></div>
<div style={{display:'flex',gap:12}}><div style={{width:28,height:28,background:'#FFD86B',color:'#000',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:12}}>3</div><div><div style={{fontWeight:800,fontSize:13}}>System → Kitchen Bell</div><div style={{fontSize:12,color:'#8A7A55',marginTop:2}}>Kitchen gets instant order with bell sound. Accept → Cooking → Ready.</div></div></div>
<div style={{display:'flex',gap:12}}><div style={{width:28,height:28,background:'#FFD86B',color:'#000',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:12}}>4</div><div><div style={{fontWeight:800,fontSize:13}}>Ready → Served</div><div style={{fontSize:12,color:'#8A7A55',marginTop:2}}>Waiter gets Ready notification, picks from kitchen, marks Served.</div></div></div>
</div>
</div>
</div>

<div id="pricing" style={{marginTop:70}}>
<div style={{textAlign:'center'}}><div style={{fontSize:11,letterSpacing:2,color:'#8A7A55'}}>PRICING</div><h2 style={{fontSize:36,fontWeight:900,marginTop:8}}>Start Free. Scale Fast.</h2><p style={{color:'#8A7A55',marginTop:6}}>7-Day Free Trial on all plans. No credit card required.</p></div>
<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginTop:24}}>
<div style={{background:'#0C0A05',border:'1px solid #2A2415',borderRadius:18,padding:18,textAlign:'center'}}><div style={{fontSize:11,fontWeight:800,color:'#8A7A55'}}>TRIAL</div><div style={{fontSize:28,fontWeight:900,color:'#FFDF8A',marginTop:6}}>$0</div><div style={{fontSize:11,color:'#8A7A55'}}>7 Days Free</div><div style={{marginTop:12,textAlign:'left'}}><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ 16 Tables 3D</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Order Panel</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Kitchen Bell</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Owner Dashboard</div></div><button style={{width:'100%',marginTop:16,background:'#1A160A',color:'#FFDF8A',border:'1px solid #2A2415',borderRadius:10,padding:'12px',fontWeight:800,fontSize:12}}>Start Free Trial</button></div>
<div style={{background:'#0C0A05',border:'1px solid #2A2415',borderRadius:18,padding:18,textAlign:'center'}}><div style={{fontSize:11,fontWeight:800,color:'#8A7A55'}}>STARTER</div><div style={{fontSize:28,fontWeight:900,color:'#FFDF8A',marginTop:6}}>$29/mo</div><div style={{fontSize:11,color:'#8A7A55'}}>For small cafes</div><div style={{marginTop:12,textAlign:'left'}}><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ 30 Tables</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Unlimited Orders</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Staff Accounts</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Email Support</div></div><button style={{width:'100%',marginTop:16,background:'#1A160A',color:'#FFDF8A',border:'1px solid #2A2415',borderRadius:10,padding:'12px',fontWeight:800,fontSize:12}}>Choose Starter</button></div>
<div style={{background:'linear-gradient(135deg,#221D0F,#1A160A)',border:'2px solid #FFD86B',borderRadius:18,padding:18,textAlign:'center',transform:'scale(1.05)',boxShadow:'0 0 40px rgba(255,184,0,0.25)'}}><div style={{fontSize:11,fontWeight:800,color:'#FFDF8A'}}>PRO - POPULAR</div><div style={{fontSize:28,fontWeight:900,color:'#FFDF8A',marginTop:6}}>$79/mo</div><div style={{fontSize:11,color:'#8A7A55'}}>Most Popular</div><div style={{marginTop:12,textAlign:'left'}}><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ 100 Tables</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Revenue Analytics</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Parcel + Dine-in</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Priority Support</div></div><button style={{width:'100%',marginTop:16,background:'linear-gradient(135deg,#FFDF8A,#FFB800)',color:'#000',border:'0',borderRadius:10,padding:'12px',fontWeight:800,fontSize:12}}>Choose Pro</button></div>
<div style={{background:'#0C0A05',border:'1px solid #2A2415',borderRadius:18,padding:18,textAlign:'center'}}><div style={{fontSize:11,fontWeight:800,color:'#8A7A55'}}>ENTERPRISE</div><div style={{fontSize:28,fontWeight:900,color:'#FFDF8A',marginTop:6}}>$199/mo</div><div style={{fontSize:11,color:'#8A7A55'}}>For chains</div><div style={{marginTop:12,textAlign:'left'}}><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Unlimited Hotels</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ Super Admin Panel</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ API Access</div><div style={{fontSize:12,color:'#E9C77A',marginTop:6}}>✓ 24/7 Support</div></div><button style={{width:'100%',marginTop:16,background:'#1A160A',color:'#FFDF8A',border:'1px solid #2A2415',borderRadius:10,padding:'12px',fontWeight:800,fontSize:12}}>Choose Enterprise</button></div>
</div>
</div>

<div style={{textAlign:'center',marginTop:40,padding:'20px',borderTop:'1px solid #1A160A',fontSize:10,color:'#3A2F15'}}>© 2026 TableNest • Ultra 3D Engine • Privacy Protected</div>
</div>
</div>)
}
