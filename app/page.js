"use client";
export default function Page(){
return(<div style={{background:'#050400',minHeight:'100vh',fontFamily:'system-ui'}}>
<div style={{maxWidth:1350,margin:'0 auto',padding:14}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<h1 style={{fontSize:32,fontWeight:900,margin:0,background:'linear-gradient(90deg,#FFF6CC,#FFB800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>TableNest</h1>
<div style={{border:'1px solid #FFD86B',borderRadius:20,padding:'6px 12px',fontSize:10,color:'#FFDF8A'}}>● LIVE ULTRA 3D • $12,480</div>
</div>

<div style={{marginTop:16,borderRadius:24,overflow:'hidden',border:'1px solid #2A2415',boxShadow:'0 0 80px rgba(255,184,0,0.35)'}}>
<img src="/hero-ultra.webp" alt="TableNest Ultra 3D" style={{width:'100%',display:'block'}}/>
</div>

<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:18}}>
{[
{n:'Starter',p:'$29/mo',f:'20 Tables'},
{n:'Pro - POPULAR',p:'$79/mo',f:'100 Tables'},
{n:'Enterprise',p:'$199/mo',f:'Unlimited'}
].map(x=><div key={x.n} style={{background:x.n.includes('POPULAR')?'linear-gradient(135deg,#221D0F,#1A160A)':'#0F0D08',border:x.n.includes('POPULAR')?'2px solid #FFD86B':'1px solid #2A2415',borderRadius:18,padding:16,textAlign:'center',transform:x.n.includes('POPULAR')?'scale(1.05)':'none',boxShadow:x.n.includes('POPULAR')?'0 0 40px rgba(255,184,0,0.4)':'none'}}><div style={{fontSize:13,fontWeight:800,color:'#FFDF8A'}}>{x.n}</div><div style={{fontSize:22,fontWeight:900,color:'#FFDF8A',marginTop:4}}>{x.p}</div><div style={{fontSize:10,color:'#8A7A55'}}>{x.f}</div><button style={{width:'100%',marginTop:10,background:'linear-gradient(135deg,#FFDF8A,#FFB800)',border:0,borderRadius:10,padding:11,fontWeight:800,fontSize:11,color:'#000'}}>Start 7-Day Free Trial</button></div>)}
</div>
<div style={{textAlign:'center',marginTop:14,fontSize:9,color:'#4A3E28'}}>© 2026 TableNest • Ultra Premium 3D Isometric • Live on Vercel</div>
</div>
</div>)
}
