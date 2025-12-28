'use client';
import { useState } from 'react';

export default function Redeem() {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const redeem = async () => {
    setMsg(null);
    const token = localStorage.getItem('token') || '';
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setMsg(`Points added: ${data.pointsAdded}`);
    } catch (e: any) { setMsg(e.message); }
  };
  return (
    <div className="max-w-sm">
      <h1 className="text-xl font-semibold mb-4">Redeem Code</h1>
      <input className="border p-2 mb-2 w-full" placeholder="Enter code" value={code} onChange={(e)=>setCode(e.target.value)}/>
      <button onClick={redeem} className="bg-green-600 text-white px-4 py-2 rounded">Redeem</button>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}