"use client";
export default function Page(){
return (<div style={{background:'#050400',color:'#F5D88A',minHeight:'100vh',fontFamily:'system-ui',padding:24}}>
<div style={{maxWidth:1300,margin:'0 auto'}}>
<h1 style={{fontSize:56,fontWeight:900,margin:0,background:'linear-gradient(#FFF6CC,#FFB800)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>TableNest</h1>
<div style={{fontSize:18,color:'#E9C77A'}}>Hospitality SaaS • Premium 3D • Live Dashboard</div>
<img src="/IMG-20261016-WA4857.jpg" style={{width:'100%',marginTop:20,borderRadius:20,border:'1px solid #2A2415'}}/>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:40,textAlign:'center'}}>
<div style={{background:'#0F0D08',border:'1px solid #2A2415',borderRadius:16,padding:24}}><div style={{fontWeight:800}}>Starter</div><div style={{fontSize:28,color:'#FFDF8A'}}>$29/mo</div><button style={{width:'100%',marginTop:12,background:'#FFDF8A',border:0,borderRadius:10,padding:10,fontWeight:800}}>Start 7-Day Free Trial</button></div>
<div style={{background:'#221D0F',border:'2px solid #FFD86B',borderRadius:16,padding:24}}><div style={{fontWeight:800}}>Pro - POPULAR</div><div style={{fontSize:28,color:'#FFDF8A'}}>$79/mo</div><button style={{width:'100%',marginTop:12,background:'linear-gradient(#FFDF8A,#FFB800)',border:0,borderRadius:10,padding:10,fontWeight:800}}>Start 7-Day Free Trial</button></div>
<div style={{background:'#0F0D08',border:'1px solid #2A2415',borderRadius:16,padding:24}}><div style={{fontWeight:800}}>Enterprise</div><div style={{fontSize:28,color:'#FFDF8A'}}>$199/mo</div><button style={{width:'100%',marginTop:12,background:'#FFDF8A',border:0,borderRadius:10,padding:10,fontWeight:800}}>Start 7-Day Free Trial</button></div>
</div>
<div style={{textAlign:'center',marginTop:40,color:'#4A3E28',fontSize:12}}>© 2026 TableNest • 1 Week Free Trial • Premium 3D SaaS</div>
</div>
</div>)
}
