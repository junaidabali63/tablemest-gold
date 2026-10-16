"use client";
import { useEffect, useState } from "react";

export default function Page(){
const [t,setT]=useState(0);
useEffect(()=>{const i=setInterval(()=>setT(v=>v+0.5),50);return()=>clearInterval(i)},[]);
const tables=[{x:0,y:0,o:1},{x:1,y:0,o:0},{x:2,y:0,o:1},{x:0,y:1,o:1},{x:1,y:1,o:1},{x:2,y:1,o:0},{x:0,y:2,o:1},{x:1,y:2,o:0}];

return (<div style={{background:'#050400',minHeight:'100vh',overflowX:'hidden',fontFamily:'system-ui',color:'#F5D88A'}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');
@keyframes float{0%,100%{transform:translateZ(20px) translateY(0)}50%{transform:translateZ(20px) translateY(-8px)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px #FFB800}50%{box-shadow:0 0 40px #FFDF8A}}`}</style>

<div style={{maxWidth:1350,margin:'0 auto',padding:24}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><h1 style={{fontFamily:'Space Grotesk',fontSize:38,fontWeight:900,margin:0,background:'linear-gradient(90deg,#FFF6CC,#FFB800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>TableNest</h1><div style={{background:'rgba(255,216,107,0.1)',border:'1px solid #FFD86B',borderRadius:20,padding:'6px 12px',fontSize:10,color:'#FFDF8A'}}>● LIVE 3D • Fri Oct 16 • $12,480</div></div>

{/* REAL 3D FLOOR */}
<div style={{marginTop:30,perspective:'1500px',perspectiveOrigin:'50% 30%'}}>
<div style={{transform:`rotateX(55deg) rotateZ(-35deg)`,transformStyle:'preserve-3d',width:'100%',height:420,position:'relative',margin:'0 auto',maxWidth:900,background:'radial-gradient(ellipse at center,#1A160A 0%,#0A0800 70%)',borderRadius:30,border:'1px solid #2A2415',boxShadow:'0 40px 80px rgba(0,0,0,0.8), inset 0 0 60px rgba(255,184,0,0.1)'}}>

{/* Floor grid light */}
<div style={{position:'absolute',inset:20,backgroundImage:'linear-gradient(rgba(255,184,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.08) 1px, transparent 1px)',backgroundSize:'60px 60px',transform:'translateZ(1px)'}}/>

{/* 3D TABLES */}
{tables.map((tb,i)=>(
<div key={i} style={{position:'absolute',left:`${15+tb.x*28}%`,top:`${15+tb.y*26}%`,transformStyle:'preserve-3d',transform:`translateZ(${tb.o?18:4}px) rotateZ(${t*0.02}deg)`,transition:'transform 0.6s',animation:`float ${3+i*0.3}s ease-in-out infinite`}}>
{/* Table top */}
<div style={{width:72,height:72,background:tb.o?'linear-gradient(135deg,#FFDF8A,#FFB800)':'linear-gradient(135deg,#2A2415,#1A160A)',border:'1px solid #FFD86B',transform:'translateZ(10px)',boxShadow:tb.o?'0 0 20px #FFB800, inset 0 0 10px rgba(255,255,255,0.5)':'0 0 5px rgba(0,0,0,0.5)',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:900,color:tb.o?'#000':'#5A4A20'}}>T0{i+1}</div>
{/* Table legs - 3D */}
<div style={{position:'absolute',width:72,height:10,background:'#3A2F15',transform:'rotateX(-90deg) translateZ(-5px)',transformOrigin:'top',top:72,left:0}}/>
<div style={{position:'absolute',width:10,height:72,background:'#1F1805',transform:'rotateY(90deg) translateZ(-5px)',transformOrigin:'left',top:0,left:72}}/>
{/* Chairs - 4 mini 3D */}
{[0,1,2,3].map(c=><div key={c} style={{position:'absolute',width:14,height:14,background:'linear-gradient(#4A3E28,#2A2415)',border:'1px solid #5A4A20',borderRadius:2,transform:`translateZ(2px) ${c==0?'translate(-16px,20px)':c==1?'translate(74px,20px)':c==2?'translate(20px,-16px)':'translate(20px,74px)'}`}}/>)}
{/* Occupied glow person */}
{tb.o==1&&<div style={{position:'absolute',width:10,height:10,background:'#FFDF8A',borderRadius:'50%',top:28,left:28,transform:'translateZ(22px)',boxShadow:'0 0 10px #FFDF8A',animation:'glow 1.5s infinite'}}/>}
</div>
))}

{/* Bar Counter 3D */}
<div style={{position:'absolute',right:'8%',top:'10%',width:'22%',height:'18%',transformStyle:'preserve-3d',transform:'translateZ(25px)'}}>
<div style={{width:'100%',height:'100%',background:'linear-gradient(#2A1F05,#0F0D08)',border:'1px solid #FFD86B',transform:'translateZ(12px)'}}/>
<div style={{position:'absolute',width:'100%',height:12,background:'#1A160A',transform:'rotateX(-90deg)',top:'100%',transformOrigin:'top'}}/>
</div>
</div>
</div>

{/* Stats overlay - floating over 3D */}
<div style={{display:'grid',gridTemplateColumns:'1.1fr 1.9fr 1.1fr',gap:14,marginTop:-80,position:'relative',zIndex:10}}>
<div style={{background:'rgba(10,8,0,0.9)',backdropFilter:'blur(20px)',border:'1px solid #2A2415',borderRadius:16,padding:16}}><div style={{fontSize:10,color:'#8A7A55'}}>Revenue Today</div><div style={{fontSize:22,fontWeight:900,color:'#FFDF8A'}}>$12,480</div><div style={{fontSize:10,color:'#3DD68C'}}>↗ 18% vs yesterday</div><div style={{marginTop:10,fontSize:10}}>Occupancy 82%</div><div style={{height:6,background:'#1A160A',borderRadius:6,marginTop:4}}><div style={{width:'82%',height:'100%',background:'#FFB800',borderRadius:6}}/></div></div>
<div style={{display:'flex',justifyContent:'center',gap:10,alignItems:'center'}}><div style={{background:'rgba(10,8,0,0.9)',border:'1px solid #2A2415',borderRadius:20,padding:'8px 14px',fontSize:10}}>Total: 16 • Avl: 3 • Occ: 10 • Res: 3</div><div style={{background:'rgba(10,8,0,0.9)',border:'1px solid #2A2415',borderRadius:20,padding:'8px 14px',fontSize:10}}>Turnover: 2.3x</div></div>
<div style={{background:'rgba(10,8,0,0.9)',backdropFilter:'blur(20px)',border:'1px solid #2A2415',borderRadius:16,padding:16}}><div style={{fontSize:10}}>Insights</div><div style={{height:30,marginTop:8,background:'linear-gradient(90deg, transparent 0%, #FFB800 50%, transparent 100%)',opacity:0.6,borderRadius:4}}/><div style={{fontSize:10,marginTop:8}}>Guest Satisfaction 4.8★</div></div>
</div>

{/* Pricing */}
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginTop:24}}>
{[["Starter","$29/mo","20 Tables"],["Pro - POPULAR","$79/mo","100 Tables"],["Enterprise","$199/mo","Unlimited"]].map(p=><div key={p[0]} style={{background:p[0].includes('POPULAR')?'#221D0F':'#0F0D08',border:p[0].includes('POPULAR')?'2px solid #FFD86B':'1px solid #2A2415',borderRadius:16,padding:18,textAlign:'center',transform:p[0].includes('POPULAR')?'translateZ(0) scale(1.05)':'none',boxShadow:p[0].includes('POPULAR')?'0 0 30px rgba(255,184,0,0.3)':'none'}}><div style={{fontWeight:800,fontSize:14}}>{p[0]}</div><div style={{fontSize:24,color:'#FFDF8A',marginTop:6,fontWeight:900}}>{p[1]}</div><div style={{fontSize:10,color:'#8A7A55'}}>{p[2]}</div><button style={{width:'100%',marginTop:12,background:'linear-gradient(#FFDF8A,#FFB800)',border:0,borderRadius:10,padding:11,fontWeight:800,fontSize:12}}>Start 7-Day Free Trial</button></div>)}
</div>
<div style={{textAlign:'center',marginTop:20,fontSize:10,color:'#4A3E28'}}>© 2026 TableNest • Real 3D CSS • 1 Week Free Trial</div>
</div>
</div>)}
