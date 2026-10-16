"use client";
export default function Page(){
const IMG="https://raw.githubusercontent.com/junaidabali63/tablemest-gold/main/IMG-20261016-WA4857.jpg";
return (<div style={{background:'#050400',color:'#F5D88A',minHeight:'100vh',fontFamily:'system-ui'}}>
<div style={{maxWidth:1300,margin:'0 auto',padding:24}}>
<h1 style={{fontSize:56,fontWeight:900,margin:0,background:'linear-gradient(90deg,#FFF6CC,#FFB800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>TableNest</h1>
<div style={{color:'#E9C77A',marginTop:4}}>Hospitality SaaS • Premium 3D • Live Dashboard</div>
<img src={IMG} alt="TableNest Gold" style={{width:'100%',marginTop:20,borderRadius:20,border:'1px solid #2A2415',boxShadow:'0 0 50px rgba(255,184,0,0.2)'}}/>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:32}}>
{[["Starter","$29/mo","20 Tables"],["Pro - POPULAR","$79/mo","100 Tables"],["Enterprise","$199/mo","Unlimited"]].map(p=><div key={p[0]} style={{background:p[0].includes('POPULAR')?'#221D0F':'#0F0D08',border:p[0].includes('POPULAR')?'2px solid #FFD86B':'1px solid #2A2415',borderRadius:16,padding:20,textAlign:'center'}}><div style={{fontWeight:800}}>{p[0]}</div><div style={{fontSize:26,color:'#FFDF8A',marginTop:8}}>{p[1]}</div><div style={{fontSize:12,color:'#8A7A55'}}>{p[2]}</div><button style={{width:'100%',marginTop:12,background:'linear-gradient(#FFDF8A,#FFB800)',border:0,borderRadius:10,padding:12,fontWeight:800}}>Start 7-Day Free Trial</button></div>)}
</div>
<div style={{textAlign:'center',marginTop:30,fontSize:11,color:'#4A3E28'}}>© 2026 TableNest • 1 Week Free Trial • 3D Premium SaaS</div>
</div>
</div>)}
