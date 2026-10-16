"use client";
import { useState, useEffect } from "react";

export default function Page(){
const [t,setT]=useState(0);
useEffect(()=>{const i=setInterval(()=>setT(v=>v+1),40);return()=>clearInterval(i)},[]);

const tables=[
{x:12,y:12,o:1,g:2,type:'square'},
{x:42,y:8,o:0,g:0,type:'square'},
{x:72,y:18,o:1,g:1,type:'round'},
{x:12,y:38,o:1,g:2,type:'square'},
{x:42,y:36,o:1,g:4,type:'square'},
{x:72,y:42,o:0,g:0,type:'square'},
{x:12,y:66,o:1,g:1,type:'round'},
{x:42,y:68,o:0,g:0,type:'round'},
{x:72,y:68,o:0,g:0,type:'square'},
];

return(<div style={{background:'#030200',minHeight:'100vh',fontFamily:'system-ui',overflowX:'hidden'}}>
<style>{`@keyframes float{0%,100%{transform:translateZ(24px)}50%{transform:translateZ(32px) translateY(-4px)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}`}</style>

<div style={{maxWidth:1400,margin:'0 auto',padding:18}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<h1 style={{fontSize:32,fontWeight:900,margin:0,background:'linear-gradient(90deg,#FFF6CC 0%,#FFD86B 40%,#FFA800 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',letterSpacing:-1}}>TableNest</h1>
<div style={{display:'flex',gap:8}}><div style={{background:'rgba(255,216,107,0.12)',border:'1px solid #FFD86B',borderRadius:20,padding:'6px 12px',fontSize:9,color:'#FFDF8A',fontWeight:700}}>● LIVE 3D • Fri Oct 16 • $12,480</div></div>
</div>

{/* 3D SCENE */}
<div style={{marginTop:22,perspective:'2000px',perspectiveOrigin:'50% 40%'}}>
<div style={{position:'relative',width:'100%',maxWidth:1100,height:520,margin:'0 auto',transform:'rotateX(58deg) rotateZ(-38deg)',transformStyle:'preserve-3d',background:'radial-gradient(ellipse at 30% 20%, #1E1A0A 0%, #0D0B05 40%, #050400 100%)',borderRadius:28,border:'1px solid #2A2415',boxShadow:'0 60px 120px rgba(0,0,0,0.9), inset 0 0 80px rgba(255,184,0,0.08)',overflow:'hidden'}}>

{/* Wood floor + grid */}
<div style={{position:'absolute',inset:0,background:`linear-gradient(rgba(255,184,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.06) 1px, transparent 1px)`,backgroundSize:'48px 48px',transform:'translateZ(1px)'}}/>
<div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(60,45,15,0.15) 48px, rgba(60,45,15,0.15) 49px)',transform:'translateZ(2px)'}}/>

{/* WALLS - back */}
<div style={{position:'absolute',left:0,top:0,width:'100%',height:20,background:'linear-gradient(#1A160A,#0A0800)',transform:'rotateX(-90deg)',transformOrigin:'top',borderBottom:'1px solid #2A2415'}}/>
<div style={{position:'absolute',left:0,top:0,width:20,height:'100%',background:'linear-gradient(90deg,#1A160A,#0A0800)',transform:'rotateY(90deg)',transformOrigin:'left',borderRight:'1px solid #2A2415'}}/>

{/* Bar Counter */}
<div style={{position:'absolute',right:'2%',top:'2%',width:'28%',height:'22%',transformStyle:'preserve-3d',transform:'translateZ(28px)'}}>
<div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#2A1F05 0%, #1A160A 100%)',border:'1px solid #FFD86B',borderRadius:6,transform:'translateZ(14px)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,color:'#8A7A55',fontWeight:800}}>BAR • 6 Stools</div>
<div style={{position:'absolute',width:'100%',height:14,background:'#0F0D08',transform:'rotateX(-90deg)',transformOrigin:'top',top:'100%'}}/>
{/* Stools */}
{[0,1,2,3,4,5].map(s=><div key={s} style={{position:'absolute',width:10,height:10,background:'#3A2F15',borderRadius:'50%',left:`${8+s*15}%`,top:-12,transform:'translateZ(2px)',border:'1px solid #5A4A20'}}/>)}
</div>

{/* Plants */}
<div style={{position:'absolute',left:'4%',top:'82%',width:18,height:18,background:'radial-gradient(#3D6B35,#1A2F15)',borderRadius:'50%',transform:'translateZ(16px)',boxShadow:'0 0 15px rgba(60,107,53,0.4)'}}/>
<div style={{position:'absolute',right:'35%',bottom:'5%',width:22,height:22,background:'radial-gradient(#3D6B35,#1A2F15)',borderRadius:'50%',transform:'translateZ(16px)'}}/>

{/* TABLES ULTRA */}
{tables.map((tb,i)=>(
<div key={i} style={{position:'absolute',left:`${tb.x}%`,top:`${tb.y}%`,transformStyle:'preserve-3d',transform:`translateZ(${tb.o?22:6}px)`,animation:`float ${3.2+i*0.2}s ease-in-out infinite`,animationDelay:`${i*0.1}s`}}>

{/* Table shadow */}
<div style={{position:'absolute',width:tb.type=='round'?64:68,height:tb.type=='round'?64:68,background:'rgba(0,0,0,0.6)',filter:'blur(8px)',transform:'translateZ(-1px) translate(4px,4px)',borderRadius:tb.type=='round'? '50%':6}}/>

{/* Table top */}
<div style={{width:tb.type=='round'?64:68,height:tb.type=='round'?64:68,background:tb.o?'radial-gradient(ellipse at 30% 20%, #FFF6CC, #FFDF8A 20%, #FFB800 70%)':'linear-gradient(135deg,#1E1A0A,#2A2415)',border:`1px solid ${tb.o?'#FFD86B':'#3A2F15'}`,borderRadius:tb.type=='round'? '50%':8,transform:'translateZ(12px)',boxShadow:tb.o?'0 0 25px rgba(255,184,0,0.6), inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -4px 8px rgba(0,0,0,0.3)':'inset 0 1px 0 rgba(255,255,255,0.05)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
<div style={{fontSize:8,fontWeight:900,color:tb.o?'#000':'#5A4A20',letterSpacing:0.5}}>T0{i+1}</div>
{tb.o&&<div style={{fontSize:6,color:'#000',opacity:0.7,marginTop:1}}>{tb.g} Guests</div>}
</div>

{/* Table edge thickness */}
<div style={{position:'absolute',width:tb.type=='round'?64:68,height:12,background:tb.o?'#C89600':'#1A160A',transform:'rotateX(-90deg)',transformOrigin:'top',top:tb.type=='round'?64:68,left:0,borderRadius:tb.type=='round'?'0 0 50% 50%':0}}/>

{/* CHAIRS - 4 sides ultra */}
{[0,1,2,3].map(c=>{
const pos=c==0?{x:-20,y:16}:c==1?{x:68,y:16}:c==2?{x:16,y:-20}:{x:16,y:68};
return(<div key={c} style={{position:'absolute',left:pos.x,top:pos.y,transformStyle:'preserve-3d',transform:'translateZ(4px)'}}>
<div style={{width:18,height:16,background:`linear-gradient(135deg,${tb.o&&tb.g>c?'#4A3E28':'#2A2415'}, #1A160A)`,border:'1px solid #3A2F15',borderRadius:3,transform:'translateZ(6px)'}}/>
<div style={{position:'absolute',width:18,height:4,background:'#1A160A',transform:'rotateX(-90deg)',transformOrigin:'top',top:16}}/>
</div>)
})}

{/* GUESTS - tiny people */}
{Array.from({length:tb.g}).map((_,gidx)=>{
const gx=gidx==0?-10:gidx==1?60:gidx==2?8:42;
const gy=gidx==0?8:gidx==1?8:gidx==2?58:58;
return(<div key={gidx} style={{position:'absolute',left:gx,top:gy,width:12,height:12,background: gidx%2==0?'radial-gradient(#FFDF8A,#FFB800)':'radial-gradient(#8AB4FF,#3A6BFF)',borderRadius:'50%',transform:'translateZ(20px)',boxShadow:'0 0 8px rgba(255,216,107,0.8)',border:'1px solid rgba(255,255,255,0.8)',animation:'pulse 1.2s infinite'}}/>)
})}

{/* Plates on table if occupied */}
{tb.o&&<div style={{position:'absolute',width:8,height:8,background:'#FFF',borderRadius:'50%',left:22,top:22,transform:'translateZ(14px)',boxShadow:'0 1px 2px rgba(0,0,0,0.3)'}}/>}
{tb.o&&<div style={{position:'absolute',width:8,height:8,background:'#FFF',borderRadius:'50%',left:36,top:28,transform:'translateZ(14px)'}}/>}
</div>
))}
</div>
</div>

{/* STATS */}
<div style={{display:'grid',gridTemplateColumns:'1fr 1.2fr 1fr',gap:12,marginTop:-70,position:'relative',zIndex:10}}>
<div style={{background:'rgba(8,6,0,0.92)',backdropFilter:'blur(24px)',border:'1px solid #2A2415',borderRadius:18,padding:14,boxShadow:'0 10px 30px rgba(0,0,0,0.5)'}}><div style={{fontSize:9,color:'#8A7A55',letterSpacing:1}}>REVENUE TODAY</div><div style={{fontSize:24,fontWeight:900,color:'#FFDF8A',marginTop:2}}>$12,480</div><div style={{fontSize:9,color:'#3DD68C',marginTop:2}}>↗ 18% vs yesterday</div><div style={{marginTop:10}}><div style={{display:'flex',justifyContent:'space-between',fontSize:8,color:'#8A7A55'}}><span>Occupancy 82%</span><span>13/16</span></div><div style={{height:6,background:'#1A160A',borderRadius:6,marginTop:4,overflow:'hidden'}}><div style={{width:'82%',height:'100%',background:'linear-gradient(90deg,#FFDF8A,#FFB800)',borderRadius:6}}/></div></div></div>
<div style={{display:'flex',flexDirection:'column',gap:8,justifyContent:'center'}}><div style={{display:'flex',gap:8,justifyContent:'center'}}><div style={{background:'rgba(8,6,0,0.92)',border:'1px solid #2A2415',borderRadius:20,padding:'8px 12px',fontSize:9,color:'#E9C77A'}}>Total: 16 • Avl: 3 • Occ: 10 • Res: 3</div><div style={{background:'rgba(8,6,0,0.92)',border:'1px solid #2A2415',borderRadius:20,padding:'8px 12px',fontSize:9,color:'#E9C77A'}}>Turnover: 2.3x</div></div><div style={{textAlign:'center',fontSize:8,color:'#5A4A20',marginTop:4}}>⬡ Drag to rotate • Scroll to zoom • Real 3D Engine</div></div>
<div style={{background:'rgba(8,6,0,0.92)',backdropFilter:'blur(24px)',border:'1px solid #2A2415',borderRadius:18,padding:14}}><div style={{fontSize:9,color:'#8A7A55'}}>INSIGHTS</div><div style={{height:36,marginTop:8,background:'linear-gradient(90deg, #1A160A 0%, #FFB800 40%, #FFD86B 60%, #1A160A 100%)',borderRadius:6,opacity:0.7}}/><div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:9}}><span style={{color:'#8A7A55'}}>Guest Satisfaction</span><span style={{color:'#FFDF8A'}}>4.8 ★</span></div><div style={{fontSize:8,color:'#5A4A20',marginTop:4}}>Peak: 8:30 PM • 12 tables active</div></div>
</div>

<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:18}}>
{[{n:'Starter',p:'$29/mo',t:'20 Tables',pop:false},{n:'Pro - POPULAR',p:'$79/mo',t:'100 Tables',pop:true},{n:'Enterprise',p:'$199/mo',t:'Unlimited',pop:false}].map(pl=><div key={pl.n} style={{background:pl.pop?'linear-gradient(135deg,#221D0F,#1A160A)':'#0C0A05',border:pl.pop?'2px solid #FFD86B':'1px solid #2A2415',borderRadius:18,padding:16,textAlign:'center',transform:pl.pop?'scale(1.05)':'none',boxShadow:pl.pop?'0 0 40px rgba(255,184,0,0.35)':'none'}}><div style={{fontSize:12,fontWeight:800,color:pl.pop?'#FFDF8A':'#E9C77A'}}>{pl.n}</div><div style={{fontSize:22,fontWeight:900,color:'#FFDF8A',marginTop:6}}>{pl.p}</div><div style={{fontSize:9,color:'#8A7A55'}}>{pl.t}</div><button style={{width:'100%',marginTop:10,background:pl.pop?'linear-gradient(135deg,#FFDF8A,#FFB800)':'#1A160A',color:pl.pop?'#000':'#FFDF8A',border:pl.pop?'0':'1px solid #2A2415',borderRadius:10,padding:10,fontWeight:800,fontSize:11}}>Start 7-Day Free Trial</button></div>)}
</div>
<div style={{textAlign:'center',marginTop:16,fontSize:9,color:'#3A2F15'}}>© 2026 TableNest • Ultra 3D Isometric Engine • Built on Vercel • 1 Week Free Trial</div>
</div>
</div>)
}
