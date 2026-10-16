"use client";
import { useState, useEffect, useRef } from "react";
export default function Page(){
const [rot,setRot]=useState(-38);
const [tilt,setTilt]=useState(58);
const [sel,setSel]=useState(null);
const [rev,setRev]=useState(12480);
const drag=useRef(false); const last=useRef(0);
useEffect(()=>{const i=setInterval(()=>setRev(v=>v+Math.floor(Math.random()*5)),2000);return()=>clearInterval(i)},[]);

const tables=[
{x:8,y:10,o:1,g:2,t:'sq',id:'T01'},
{x:38,y:6,o:0,g:0,t:'sq',id:'T02'},
{x:68,y:12,o:1,g:1,t:'rd',id:'T03'},
{x:8,y:36,o:1,g:4,t:'sq',id:'T04'},
{x:38,y:34,o:1,g:2,t:'sq',id:'T05'},
{x:68,y:38,o:0,g:0,t:'rd',id:'T06'},
{x:8,y:64,o:1,g:2,t:'rd',id:'T07'},
{x:38,y:66,o:0,g:0,t:'rd',id:'T08'},
{x:68,y:64,o:1,g:3,t:'sq',id:'T09'},
];

return(<div style={{background:'#040200',minHeight:'100vh',fontFamily:'system-ui',overflow:'hidden',userSelect:'none'}}
onMouseDown={e=>{drag.current=true;last.current=e.clientX}}
onMouseUp={()=>drag.current=false}
onMouseMove={e=>{if(drag.current){setRot(r=>r+(e.clientX-last.current)*0.3);last.current=e.clientX}}}
onTouchStart={e=>{drag.current=true;last.current=e.touches[0].clientX}}
onTouchEnd={()=>drag.current=false}
onTouchMove={e=>{if(drag.current){setRot(r=>r+(e.touches[0].clientX-last.current)*0.3);last.current=e.touches[0].clientX}}}
>
<style>{`@keyframes float{0%,100%{transform:translateZ(26px)}50%{transform:translateZ(36px) translateY(-3px)}} @keyframes glow{0%,100%{box-shadow:0 0 20px #FFB800,0 0 40px #FFB800}50%{box-shadow:0 0 30px #FFDF8A,0 0 60px #FFB800}} @keyframes pulse{0%,100%{transform:translateZ(22px) scale(1)}50%{transform:translateZ(28px) scale(1.2)}}`}</style>

<div style={{maxWidth:1400,margin:'0 auto',padding:14}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<h1 style={{fontSize:30,fontWeight:900,margin:0,background:'linear-gradient(90deg,#FFF6CC,#FFB800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>TableNest • REAL 3D</h1>
<div style={{display:'flex',gap:8}}><div style={{background:'#FFB800',color:'#000',borderRadius:20,padding:'6px 12px',fontSize:10,fontWeight:800}}>● LIVE • ${rev.toLocaleString()} • Drag to ROTATE</div></div>
</div>

{/* 3D VIEWPORT */}
<div style={{marginTop:18,perspective:'1800px',perspectiveOrigin:'50% 40%',cursor:'grab'}}>
<div style={{width:'100%',maxWidth:1050,height:520,margin:'0 auto',transform:`rotateX(${tilt}deg) rotateZ(${rot}deg)`,transformStyle:'preserve-3d',background:'radial-gradient(ellipse at 50% 50%, #1A160A 0%, #0E0B05 50%, #050400 100%)',borderRadius:24,border:'1px solid #2A2415',boxShadow:'0 50px 100px rgba(0,0,0,0.8), inset 0 0 100px rgba(255,184,0,0.07)',position:'relative',transition:drag.current?'none':'transform 0.2s'}}>

{/* FLOOR GRID */}
<div style={{position:'absolute',inset:0,background:`linear-gradient(rgba(255,184,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.08) 1px, transparent 1px)`,backgroundSize:'52px 52px',transform:'translateZ(1px)'}}/>

{/* BAR */}
<div style={{position:'absolute',right:'3%',top:'3%',width:'30%',height:'20%',transformStyle:'preserve-3d',transform:'translateZ(30px)'}}>
<div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#2A1F05,#1A160A)',border:'1.5px solid #FFD86B',borderRadius:8,transform:'translateZ(16px)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,color:'#FFDF8A',fontWeight:800,animation:'glow 2s infinite'}}>BAR • 6 Stools • Click</div>
</div>

{tables.map((tb,i)=>(
<div key={tb.id} onClick={()=>setSel(tb.id==sel?null:tb.id)} style={{position:'absolute',left:`${tb.x}%`,top:`${tb.y}%`,transformStyle:'preserve-3d',transform:`translateZ(${tb.o?26:8}px)`,animation:`float ${2.8+i*0.2}s ease-in-out infinite`,cursor:'pointer'}}>
<div style={{position:'absolute',width:tb.t=='rd'?68:72,height:tb.t=='rd'?68:72,background:'rgba(0,0,0,0.7)',filter:'blur(10px)',transform:'translateZ(-2px) translate(6px,6px)',borderRadius:tb.t=='rd'?'50%':10}}/>
<div style={{width:tb.t=='rd'?68:72,height:tb.t=='rd'?68:72,background:tb.o?'radial-gradient(ellipse at 30% 20%, #FFF6CC, #FFDF8A 15%, #FFB800 70%)':'linear-gradient(135deg,#1E1A0A,#0F0D08)',border:`2px solid ${tb.o?'#FFD86B': sel==tb.id?'#FFB800':'#3A2F15'}`,borderRadius:tb.t=='rd'?'50%':12,transform:`translateZ(14px) ${sel==tb.id?'scale(1.15)':''}`,boxShadow:tb.o?'0 0 25px rgba(255,184,0,0.7), inset 0 3px 0 rgba(255,255,255,0.7)':'none',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',transition:'all 0.2s'}}>
<div style={{fontSize:10,fontWeight:900,color:tb.o?'#000':'#5A4A20'}}>{tb.id}</div>
<div style={{fontSize:7,color:tb.o?'#000':'#3A2F15'}}>{tb.o?`${tb.g} Guests`:'Empty'}</div>
</div>
<div style={{position:'absolute',width:tb.t=='rd'?68:72,height:14,background:tb.o?'#C89600':'#1A160A',transform:'rotateX(-90deg)',transformOrigin:'top',top:tb.t=='rd'?68:72,borderRadius:tb.t=='rd'?'0 0 50% 50%':0}}/>
{[0,1,2,3].map(c=>{
const p=c==0?{x:-22,y:18}:c==1?{x:72,y:18}:c==2?{x:20,y:-22}:{x:20,y:72};
return(<div key={c} style={{position:'absolute',left:p.x,top:p.y,transform:'translateZ(6px)'}}><div style={{width:20,height:18,background:tb.o&&c<tb.g?'#4A3E28':'#2A2415',border:'1px solid #3A2F15',borderRadius:4,transform:'translateZ(6px)'}}/></div>)
})}
{Array.from({length:tb.g}).map((_,gi)=>{
const gx=gi==0?-12:gi==1?62:gi==2?10:40; const gy=gi==0?10:gi==1?10:gi==2?60:60;
return(<div key={gi} style={{position:'absolute',left:gx,top:gy,width:14,height:14,background:gi%2?'radial-gradient(#8AB4FF,#3A6BFF)':'radial-gradient(#FFDF8A,#FFB800)',borderRadius:'50%',transform:'translateZ(24px)',border:'1.5px solid #FFF',animation:'pulse 1s infinite',boxShadow:'0 0 10px #FFB800'}}/>)
})}
</div>
))}
</div>
</div>

<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginTop:-60,position:'relative',zIndex:10}}>
<div style={{background:'rgba(8,6,0,0.94)',backdropFilter:'blur(20px)',border:'1px solid #2A2415',borderRadius:16,padding:12}}><div style={{fontSize:9,color:'#8A7A55'}}>REVENUE TODAY • LIVE</div><div style={{fontSize:26,fontWeight:900,color:'#FFDF8A'}}>${rev.toLocaleString()}</div><div style={{fontSize:9,color:'#3DD68C'}}>↗ 18% • Occupancy 82%</div></div>
<div style={{background:'rgba(8,6,0,0.94)',border:'1px solid #2A2415',borderRadius:16,padding:12,textAlign:'center'}}><div style={{fontSize:9,color:'#8A7A55'}}>SELECTED TABLE</div><div style={{fontSize:18,fontWeight:800,color:'#FFDF8A',marginTop:4}}>{sel?sel+' • Click again to deselect':'Drag floor to rotate • Click table'}</div><div style={{fontSize:8,color:'#5A4A20',marginTop:4}}>Real 3D Engine • Float • Glow • Pulse</div></div>
<div style={{background:'rgba(8,6,0,0.94)',border:'1px solid #2A2415',borderRadius:16,padding:12}}><div style={{fontSize:9,color:'#8A7A55'}}>INSIGHTS</div><div style={{fontSize:11,color:'#FFDF8A',marginTop:6}}>Tilt: {tilt}° • Rot: {Math.round(rot)}°</div><button onClick={()=>{setTilt(58);setRot(-38)}} style={{marginTop:6,width:'100%',background:'#1A160A',border:'1px solid #2A2415',color:'#FFDF8A',borderRadius:8,padding:6,fontSize:10}}>Reset View</button></div>
</div>
</div>
</div>)
}
