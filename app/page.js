"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jvvqzlxeijakbqmwnrqa.supabase.co";
const supabaseKey = "sb_publishable_6gF4V4l6t_Qa2ywG4HePAg_srLgmW4B";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [tables, setTables] = useState([]);
  const [revenue, setRevenue] = useState(4824);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const { data } = await supabase.from("tables").select("*");
    if (data) {
      const mapped = data.map(t => ({...t, top: t.top_pos, left: t.left_pos }));
      setTables(mapped);
    }
    const { data: state } = await supabase.from("app_state").select("*").single();
    if (state) setRevenue(state.revenue);
    setLoading(false);
  }

  async function handleTableClick(table) {
    if (table.status === 'Available') {
      await supabase.from("tables").update({ status: 'Occupied', guests: 2, name: 'Walk-in Guest', time: 'Just now' }).eq("id", table.id);
    } else if (table.status === 'Occupied') {
      const newRev = revenue + 120;
      await supabase.from("tables").update({ status: 'Available', guests: 0, name: '', time: '' }).eq("id", table.id);
      await supabase.from("app_state").update({ revenue: newRev }).eq("id", 1);
      setRevenue(newRev);
    } else if (table.status === 'Reserved') {
      await supabase.from("tables").update({ status: 'Occupied', time: 'Just now' }).eq("id", table.id);
    }
    fetchData();
  }

  if (loading) return <div className="min-h-screen bg-[#0f1115] text-white flex items-center justify-center">Loading TableNest LIVE...</div>;

  return (
    <div className="min-h-screen bg-[#0f1115] text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">TableNest 🟢 LIVE</h1>
          <p className="text-gray-400 text-sm">Supabase Connected</p>
        </div>
        <div className="bg-[#1a1d24] px-6 py-3 rounded-xl border border-gray-800">
          <p className="text-xs text-gray-400">TODAY REVENUE</p>
          <p className="text-2xl font-bold text-green-400">${revenue}</p>
        </div>
      </div>

      <div className="relative w-full h-[650px] bg-[#151821] rounded-2xl border border-gray-800 overflow-hidden">
        {tables.map(t => (
          <div key={t.id}
            onClick={() => handleTableClick(t)}
            className={`absolute w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer font-bold border-2 hover:scale-110
            ${t.status === 'Available'? 'bg-[#2a2e39] border-gray-600' : t.status === 'Occupied'? 'bg-orange-500 border-orange-200' : 'bg-purple-600 border-purple-200'}`}
            style={{ top: t.top, left: t.left }}>
            <span>{t.id}</span>
            <span className="text-[10px]">{t.status}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-gray-500 text-xs">Click table to change status • Saved in Supabase LIVE</p>
    </div>
  );
}
