"use client";
import { useState } from "react";

export default function TableNest() {
  const plans = [
    { name: "Starter", price: "$29", pm: "/mo", feat: ["Up to 20 Tables", "Basic Analytics", "Email Support", "1 Location"], cta: "Start 7-Day Free Trial" },
    { name: "Pro", price: "$79", pm: "/mo", feat: ["Up to 100 Tables", "Live 3D Dashboard", "Revenue Insights", "Priority Support", "5 Locations"], popular: true, cta: "Start 7-Day Free Trial" },
    { name: "Enterprise", price: "$199", pm: "/mo", feat: ["Unlimited Tables", "AI Occupancy Forecast", "Custom Integrations", "Dedicated Manager"], cta: "Start 7-Day Free Trial" },
  ];

  return (
    <div style={{ background: "#050400", color: "#F5D88A", minHeight: "100vh", fontFamily: "Inter, system-ui" }}>
      {/* TOP HERO - EXACT YOUR IMAGE DESIGN */}
      <div style={{ padding: "36px 36px 0" }}>
        <h1 style={{ fontSize: "68px", fontWeight: 900, margin: 0, lineHeight: 0.9, background: "linear-gradient(180deg,#FFF6CC 0%,#FFD76B 50%,#8A5E00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TableNest</h1>
        <div style={{ fontSize: "28px", color: "#E9C77A", marginTop: 6 }}>Hospitality SaaS</div>
        <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 13, color: "#C5A86A" }}>
          <span>Live Dashboard • Premium Hospitality SaaS</span>
          <span style={{ opacity: 0.7 }}>Fri, Oct 16 • 19:42 • LIVE</span>
        </div>
      </div>

      {/* MAIN 3D DASHBOARD - REPLICA OF YOUR IMAGE */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr 260px", gap: 18, padding: "24px 24px 0" }}>
        {/* LEFT STATS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { t: "Revenue Today", v: "$12,480", s: "↑ 18% vs yesterday" },
            { t: "Occupancy", v: "82%", s: "82%" },
            { t: "Bookings", v: "47 Today", s: "Reserved 32 • Seated 15" },
            { t: "Avg Dwell Time", v: "58 min", s: "-5 min" },
            { t: "No-Shows", v: "3", s: "↓ 12%" },
          ].map((c, i) => (
            <div key={i} style={{ background: "linear-gradient(180deg,#1A160C,#0E0C07)", border: "1px solid #3A2E18", borderRadius: 12, padding: "14px 16px", boxShadow: "0 0 20px rgba(255,216,107,0.12)" }}>
              <div style={{ fontSize: 12, color: "#8A7A55" }}>{c.t}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#FFDF8A", marginTop: 4 }}>{c.v}</div>
              <div style={{ fontSize: 12, color: "#5f8a4a", marginTop: 4 }}>{c.s}</div>
            </div>
          ))}
        </div>

        {/* CENTER 3D ISOMETRIC IMAGE */}
        <div style={{ background: "radial-gradient(100% 100% at 50% 0%, #1C180E, #050400)", border: "1px solid #2E2412", borderRadius: 20, overflow: "hidden", position: "relative" }}>
          <img src="https://raw.githubusercontent.com/junaidabali63/tablenest-gold/main/public/hero.jpg" alt="TableNest 3D" style={{ width: "100%", height: "auto", display: "block" }} 
          onError={(e:any)=>{e.target.src="https://i.ibb.co/placeholder.png"}} />
          {/* Fallback Text if image not uploaded yet */}
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.6)", fontSize: 13, color: "#6A5A35", textAlign: "center", padding: 20 }}>
            Upload your gold image as <b>public/hero.jpg</b> in GitHub to see exact 3D floor here<br/>T01 Cleaning • T03 Reserved • T05 Seated • T08 Seated
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", padding: "10px", fontSize: 11, borderTop: "1px solid #1E1608", color: "#8A7A55" }}>
            <span>Total Tables: 16</span><span>Available: 3</span><span>Occupied: 10</span><span>Reserved: 3</span>
          </div>
        </div>

        {/* RIGHT INSIGHTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "linear-gradient(180deg,#1A160C,#0E0C07)", border: "1px solid #3A2E18", borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Insights</div>
            <div style={{ fontSize: 12, marginTop: 12, color: "#8A7A55" }}>Revenue Stream</div>
            <div style={{ height: 40, marginTop: 8, background: "linear-gradient(90deg,transparent 0%, #FFD86B22 100%)", borderRadius: 6, position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#FFD86B" }}></div>
            </div>
            <div style={{ fontSize: 12, marginTop: 16 }}>Top Section <span style={{ float: "right", color: "#7AC36A" }}>+22%</span></div>
            <div style={{ fontSize: 11, color: "#8A7A55" }}>Bar Area</div>
            <div style={{ marginTop: 12, fontSize: 12 }}>Guest Satisfaction</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>4.8★</div>
            <div style={{ color: "#FFD86B", fontSize: 12 }}>★★★★★</div>
          </div>
          <div style={{ background: "#0E0C07", border: "1px solid #2E2412", borderRadius: 12, padding: 12, fontSize: 12, textAlign: "center" }}>
            Table Turnover: <b style={{ color: "#FFDF8A" }}>2.3x</b>
          </div>
        </div>
      </div>

      {/* PRICING - 1 WEEK FREE TRIAL */}
      <div style={{ padding: "80px 36px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#1A160C", border: "1px solid #FFD86B44", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#FFD86B" }}>🎁 1 WEEK FREE TRIAL ON ALL PLANS</div>
        <h2 style={{ fontSize: 42, fontWeight: 900, marginTop: 18, color: "#FFF5CC" }}>Simple Pricing, Premium Power</h2>
        <p style={{ color: "#8A7A55", marginTop: 8 }}>Start free for 7 days, cancel anytime. No credit card required for trial.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 40, maxWidth: 1100, marginInline: "auto" }}>
          {plans.map(p => (
            <div key={p.name} style={{ background: p.popular ? "linear-gradient(180deg,#221D0F,#0F0D08)" : "#0F0D08", border: p.popular ? "2px solid #FFD86B" : "1px solid #2A2415", borderRadius: 20, padding: 28, textAlign: "left", position: "relative" }}>
              {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#FFD86B", color: "#000", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>MOST POPULAR</div>}
              <div style={{ fontSize: 14, color: "#8A7A55" }}>{p.name}</div>
              <div style={{ fontSize: 36, fontWeight: 900, marginTop: 8 }}><span style={{ color: "#FFDF8A" }}>{p.price}</span><span style={{ fontSize: 14, color: "#6A5A35" }}>{p.pm}</span></div>
              <ul style={{ marginTop: 18, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {p.feat.map(f => <li key={f} style={{ fontSize: 13, color: "#C5B48A" }}>✓ {f}</li>)}
              </ul>
              <button style={{ width: "100%", marginTop: 22, background: p.popular ? "linear-gradient(180deg,#FFDF8A,#FFB800)" : "#1A160C", color: p.popular ? "#000" : "#FFDF8A", border: "1px solid #3A2E18", borderRadius: 12, padding: "12px", fontWeight: 800, cursor: "pointer" }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ borderTop: "1px solid #1A160C", padding: 24, textAlign: "center", fontSize: 11, color: "#4A3E28" }}>© 2026 TableNest • Premium 3D Hospitality SaaS • Built for Restaurant Owners • support@tablenest.app</footer>
    </div>
  );
}
